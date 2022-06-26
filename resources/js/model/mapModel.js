/*global define*/
'use strict';
define([
  'backbone',
  'collection/markerCollection'
], function(Backbone, MarkerCollection){

    var Map = Backbone.Model.extend({
        initialize: function(){
            //this saves to an array in JSON. I need to turn it back into a collection
            this.attributes.markers = new MarkerCollection(this.attributes.markers);

        },
        defaults: {
            width: 400,
            height: 500,
            zoom: 2,
            maptype: 'HYBRID',
            kmlurl: '',
            markers: undefined,
            center: {lat: 0, lng: 0}
        },
        sync: function(){}
    });

    return Map;
});