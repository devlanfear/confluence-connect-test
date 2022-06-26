define([
    'jquery',
    'underscore',
    'backbone',
    'text!template/display/MapTemplate.html',
    'async!//maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places!callback'
], function($, _, Backbone, mapTemplate){

    var mapView = Backbone.View.extend({
        createMap: function(){
            var mapOptions = {
              center: new google.maps.LatLng(this.model.get('center').lat, this.model.get('center').lng),
              zoom: parseInt(this.model.get('zoom'), 10),
              mapTypeId: google.maps.MapTypeId[this.model.get('maptype')]
            };
            this.map = new google.maps.Map($('#map')[0], mapOptions);
            if(this.model.get('kmlurl').length > 3){
                this.loadKML(this.model.get('kmlurl'));
            }
        },
        render: function(){
            this.$el.html(mapTemplate);
            this.resize(this.model.get('width'), this.model.get('height'));
            this.createMap();
            this.addMarkersFromModel(this.model.get('markers'));
        },
        resize: function(width, height){
            var params = {width: width, height: height};
            $('#map', this.$el).css(params);
            AP.resize(width, height);
        },
        addMarkersFromModel: function(markers){
            _.bindAll(this, 'addMarker');
            markers.each(this.addMarker);
        },
        addMarker: function(model){
            var marker = new google.maps.Marker({
                map: this.map,
                position: new google.maps.LatLng(model.get('lat'), model.get('lng')),
                clickable: true,
                info: new google.maps.InfoWindow({
                    content: '<h2>' + $('<div>').text(model.get('title')).html() + '</h2>' + $('<div>').text(model.get('content')).html()
                })
            });
            var that = this;
            google.maps.event.addListener(marker, 'click', function() {
              marker.info.open(that.map, marker);
            });
        },
        loadKML: function(value){
            new google.maps.KmlLayer(value).setMap(this.map);
        },
    });

    return mapView;
});