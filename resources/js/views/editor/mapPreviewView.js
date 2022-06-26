/*global define, google*/
'use strict';
define([
  'jquery',
  'underscore',
  'backbone',
  'async!//maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places!callback'
], function($, _, Backbone){
    var mapPreviewView = Backbone.View.extend({

        mapEvents: {
                zoom_changed: 'zoomChanged',
                center_changed: 'centerChanged',
                maptypeid_changed: 'maptypeidChanged'
        },
        initialize: function(){
            this.listenTo(this.model.get('markers'), 'add', this.addMarker);
            this.listenTo(this.model.get('markers'), 'remove', this.removeMarker);
            this.listenTo(this.model.get('markers'), 'change', this.updateMarkerPosition);

            this.listenTo(this.model, 'change:kmlurl', this.loadKML);
            this.listenTo(this.model, 'change:center', this.setCenter);
            this.listenTo(this.model, 'change:zoom', this.setZoom);
            this.render();
        },
        render: function(){
            _.bindAll(this, 'renderMap');
            this.renderMap();
            this.addMarkersFromModel(this.model.get('markers'));
            this.loadKML(this.model);
            this.autocomplete();
            return this;
        },
        autocomplete: function(){
            var input = $('#d-qcenter', this.$el)[0],
            autocomplete = new window.google.maps.places.Autocomplete(input);
            var that = this;
            window.google.maps.event.addListener(autocomplete, 'place_changed', function(){
                var place = this.getPlace();
                if (place.geometry) {
                    that.model.set({
                        center: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
                        zoom: 15
                    });
                }
            });
            //stop the form submitting when the enter key is used to select the location
            window.google.maps.event.addDomListener(input, 'keydown', function(e){
                if (e.keyCode == 13) {
                    if (e.preventDefault) {
                        e.preventDefault();
                    } else {
                        e.cancelBubble = true;
                        e.returnValue = false;
                    }
                }
            });

        },
        renderMap: function(){
            //render the map either using the existing model params or if it's a new model. Set some defaults
            var options = {
                    center: new window.google.maps.LatLng(this.model.get('center').lat, this.model.get('center').lng),
                    zoom: parseInt(this.model.get('zoom'), 10),
                    mapTypeId: window.google.maps.MapTypeId[this.model.get('maptype')]
                };
            this.map = new window.google.maps.Map($('#map', this.$el)[0], options);

            _(this.mapEvents).each(function(value, key){
                _.bindAll(this, value);
                window.google.maps.event.addListener(this.map, key, this[value]);
            }, this);

        },
        zoomChanged: function(){
            this.model.set('zoom', this.map.getZoom());
        },
        setZoom: function(){
            this.map.setZoom(parseInt(this.model.get('zoom'), 10));
        },
        centerChanged: function(){
            var center = this.map.getCenter();
            this.model.set('center', {lat: center.lat(), lng: center.lng()});
        },
        setCenter: function(){
            this.map.setCenter(
                new window.google.maps.LatLng(
                    this.model.get('center').lat,
                    this.model.get('center').lng
                )
            );
        },
        maptypeidChanged: function(){
            this.model.set('maptype', this.map.getMapTypeId().toUpperCase());
        },
        addMarkersFromModel: function(markers){
            _(markers.models).each(function(value, key, list){
                this.addMarker(value);
            }, this);
        },
        addMarker: function(markerModel){
            markerModel.mapMarker = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(markerModel.get('lat'), markerModel.get('lng')),
                draggable:true
            });
            var boundFunction = _.bind(function(position){
                this.set({
                    lat: position.latLng.lat(),
                    lng: position.latLng.lng()
                });
            }, markerModel);
            window.google.maps.event.addListener(markerModel.mapMarker, 'dragend', boundFunction);
        },
        removeMarker: function(markerModel){
            markerModel.mapMarker.setMap(null);
        },
        updateMarkerPosition: function(markerModel){
            markerModel.mapMarker.setPosition(new google.maps.LatLng(markerModel.get('lat'), markerModel.get('lng')));
        },
        /* load a KML file such as http://gmaps-utility-library-dev.googlecode.com/svn/trunk/geometrycontrols/examples/data/example.xml */
        loadKML: function(mapModel){
            new google.maps.KmlLayer(mapModel.get('kmlurl')).setMap(this.map);
        },
    });

    return mapPreviewView;

});