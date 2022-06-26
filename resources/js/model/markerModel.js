/*global define*/
'use strict';
define([
  'backbone',
  'epoxy'
], function(Backbone){

    var Marker = Backbone.Epoxy.Model.extend({
        defaults: {
            "lat": '',
            "lng": '',
            "title": '',
            "content": "",
            "loc": ""
        },
        computeds: {
            location: {
                get: function() {
                    return this.get("loc");
                },
                set: function( value ) {
                    var match = value.match(/([-+]?\d{1,2}[.]\d+)[, /]\s*([-+]?\d{1,3}[.]\d+)/);
                    if(match !== null){
                        this.set({lat: match[1], lng: match[2]});
                    }
                    this.set('loc', value);
                }
            }
        },
        sync: function(){}
    });

    return Marker;
});