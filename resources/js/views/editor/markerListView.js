/*global, define*/
/* need to finish marker list view */
'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'text!template/editor/markerListTemplate.html',
], function($, _, Backbone, MarkerListTemplate){
    var makerListView = Backbone.View.extend({
        events: {
            'click .remove' : 'removeMarker',
            'click .edit': 'show'
        },
        template: _.template(MarkerListTemplate),
        initialize: function(){
            this.listenTo(this.model.attributes.markers, 'add remove change', this.render);
        },
        _getButton: function(dom){
            if(dom.nodeName !== 'BUTTON'){
                dom = $(dom).parents('button');
            }
            return $(dom);
        },
        show: function(e){
            var marker = this.model.get('markers').get(this._getButton(e.target).data('marker'));
            Backbone.Notifications.trigger('map.marker.form', marker);
        },
        removeMarker: function(e){
            this.model.get('markers').get(
                $(this._getButton(e.target)).data('marker')
            ).destroy();
        },
        render: function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        }
    });
    return makerListView;
});