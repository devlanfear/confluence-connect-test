/*global QUnit, require*/
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
        },
    },
    baseUrl: '/base/resources/js',
    paths: {
        ac: 'lib/ac',
        jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min',
        backbone: 'lib/backbone',
        underscore: 'lib/underscore',
        text: 'lib/text',
        async: 'lib/async',
        epoxy: 'lib/backbone.epoxy',
        'tests/mapModel': '/base/test/js/tests/mapModel',
        'tests/markerModel': '/base/test/js/tests/markerModel',
        'tests/editorView': '/base/test/js/tests/editorView',
        'tests/formView': '/base/test/js/tests/formView',
        'tests/markerFormView': '/base/test/js/tests/markerFormView',
        'tests/mapPreviewView': '/base/test/js/tests/mapPreviewView',
        'tests/markerListView': '/base/test/js/tests/markerListView',
    },
});
require([
    "backbone",
    "underscore",
    "tests/mapModel",
    "tests/markerModel",
    "tests/editorView",
    'tests/formView',
    'tests/markerFormView',
    'tests/mapPreviewView',
    'tests/markerListView',
], function(Backbone, _) {
    Backbone.Notifications = {};
    _.extend(Backbone.Notifications, Backbone.Events);
    window.__karma__.start();
    //window.__karma__.complete();
});
