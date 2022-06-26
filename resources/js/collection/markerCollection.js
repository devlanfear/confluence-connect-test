/*global define*/
'use strict';
define([
  'backbone',
  'model/markerModel'
], function(Backbone, Marker){

    var MarkerCollection = Backbone.Collection.extend({
        model: Marker
    });

    return MarkerCollection;
});
