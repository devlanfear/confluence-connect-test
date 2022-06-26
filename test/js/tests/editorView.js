define(['jquery','views/editor/editorView', 'model/mapModel'], function($,editorView, MapModel){

    module("Editor View", {
        setup: function() {
            $('<div id="testarea"></div>').appendTo('body');
        },
        teardown: function() {
            $('#testarea').remove();
        }
    });

    test( "editorView renders the map subview", function() {
        var view = new editorView({
            el: $('#testarea'),
            model: new MapModel()
        }).render();
        equal(view.$el.find('#map').length, 1, 'map view has been loaded');
    });

    test('google maps loads', function(){
        var view = new editorView({
            el: $('#testarea'),
            model: new MapModel()
        }).render();
        equal(typeof google.maps, 'object', 'maps javascript loaded');
    });


    test('ediorview renders the form subview', function(){
        var view = new editorView({
            el: $('#testarea'),
            model: new MapModel()
        }).render();
        equal(view.$el.find('#form').length, 1, 'form view has been loaded');
    });


});