/*global define, AP, pubsub */
'use strict';
define([
  'jquery',
  'underscore',
  'backbone',
  'text!template/editor/editorTemplate.html',
  'views/editor/formView',
  'views/editor/mapPreviewView',
  'collection/markerCollection',
  'model/mapModel',
  'epoxy'
], function($, _, Backbone, editorTemplate, FormView, MapPreviewView, MarkerCollection, MapModel){

    var editorView = Backbone.Epoxy.View.extend({
        holder: null,
        initialize: function(options){
            if(_.isObject(this.model.attributes.markers) === false){
                this.model.set('markers', new MarkerCollection());
            }
        },
        render: function(){
            //template
            this.$el.html(editorTemplate);
            //render form view
            this.formView = new FormView({
                el: $('#form', this.$el),
                model: this.model
            });
            //render the map view
            this.mapPreviewView = new MapPreviewView({
                el: $('.macro-preview', this.$el),
                model: this.model,
            });

            return this;
        }
    });

    return editorView;
});