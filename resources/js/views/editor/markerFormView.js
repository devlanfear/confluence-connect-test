/*global, define*/
'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'text!template/editor/markerFormTemplate.html',
    'model/markerModel',
    'async!//maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places!callback',
    'epoxy'
], function($, _, Backbone, MarkerFormTemplate, Marker){
    var makerFormView = Backbone.Epoxy.View.extend({
        events: {
            "blur #d-geocode": "updateGeoLocation",
            "click .submit": "formSubmit",

        },
        bindings: {
            "#d-title": "value:title,events:['keyup']",
            "#d-content": "value:content,events:['keyup']",
            "#d-geocode": "value:location,events:['keyup','change']",
        },
        template: _.template(MarkerFormTemplate),
        render: function(){
            this.$el.html(this.template(this.model.attributes));
            this.autocomplete();
            this.applyBindings();
            return this;
        },
        /* prevent marker form submission */
        formSubmit: function(e){
            e.preventDefault();
        },
        autocomplete: function(){
            var input = $('#d-geocode', this.$el)[0],
            autocomplete = new window.google.maps.places.Autocomplete(input),
            that = this;
            window.google.maps.event.addListener(autocomplete, 'place_changed', function(){
                var place = this.getPlace();
                if (place.geometry) {
                    that.model.set({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        location: place.formatted_address
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
        }

    });

    return makerFormView;
});