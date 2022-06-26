/*global define*/
'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'text!template/editor/formTemplate.html',
    'views/editor/markerFormView',
    'model/markerModel',
    'views/editor/markerListView',
    'epoxy',
    'async!//maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&libraries=places!callback',
], function($, _, Backbone, formTemplate, MarkerFormView, Marker, MarkerListView){

    var formView = Backbone.Epoxy.View.extend({
        events: {
            "click #addmarker": "addMarkerView",
            "click .cancel": "cancelForm",
            "click .submit": "saveMarker",
            "click .add-kml": "toggleKML",
        },
        bindings: {
            "#d-width": "value:width",
            "#d-height": "value:height",
            "#d-kmlimport": "value:kmlurl"
        },
        template: _.template(formTemplate),
        initialize: function(options){
            Backbone.Notifications.on('map.marker.form', this.addMarkerView);
            this.render();
        },
        render: function(){
            this.$el.html(this.template(this.model.attributes));
            this.applyBindings();

            //sub template for listing of markers
            new MarkerListView({
                el: $('#marker-list-container', this.$el),
                model: this.model
            }).render();

            return this;
        },
        saveMarker: function(){
            if(typeof this.markerForm == "object"){
                this.model.get('markers').create(this.markerForm.model);
            }
            this.cancelForm();
        },
        addMarkerView: function(){
            var marker = new Marker();

            if(arguments[0]){
                if(arguments[0].attributes){
                    marker = arguments[0];
                } else {
                    arguments[0].preventDefault();
                }
            }
            this.markerForm = new MarkerFormView({
                el: $('#marker-form-container', this.$el),
                model: marker
            }).render();

        },
        cancelForm: function(){
            $('#marker-form-container', this.$el).empty();
        },
        toggleKML: function(e){
            e.preventDefault();
            $('.kml-import-fields').toggleClass('hidden');
        }
    });

    return formView;
});