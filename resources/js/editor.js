/*global require, _,AP, AC*/
'use strict';
require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        epoxy: {
            deps: [
                'backbone'
            ]
        }
    },
    paths: {
        ac: 'lib/ac',
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
        backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min',
        underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.2/underscore-min',
        text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text.min',
        async: 'lib/async',
        epoxy: 'lib/backbone.epoxy'
    }
});

require([
    'jquery',
    'backbone',
    'ac',
    'views/editor/editorView',
    'model/mapModel'
], function($, Backbone, ACjs, EditorView, MapModel){
    //create a pubsub event system for global notifications
    Backbone.Notifications = {};
    _.extend(Backbone.Notifications, Backbone.Events);

    var map,
    data = AC.getUrlParam('data', true);

    if(data){
        data = JSON.parse(data);
    } else {
        data = {};
    }

    window.mapModel = new MapModel(data);

    var view = new EditorView({
        el: $('#container'),
        model: window.mapModel
    }).render();

});

window.AP.require(["confluence", "dialog"], function (confluence, dialog) {
    dialog.getButton("submit").bind(function() {
      confluence.saveMacro({data: JSON.stringify(window.mapModel)});
      return true;
    });
});