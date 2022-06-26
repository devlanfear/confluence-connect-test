define(['jquery','views/editor/mapPreviewView', 'model/mapModel'], function($, mapPreviewView, MapModel){

    module("Map Preview View");

    var mapTestDOM = '<div><input id="d-qcenter" /><div id="map" /></div>';

    test('rendering the view returns an instance of the view', function(){
        var view = new mapPreviewView({
            el:$(mapTestDOM),
            model: new MapModel()
        });
        equal(view.cid, view.render().cid, 'the view should return an instance of itself');
    });

    test('redering the view shows a google map', function(){
        var model = new MapModel(),
        view = new mapPreviewView({
            el:$(mapTestDOM),
            model: model
        }).render();

        equal(typeof view.map['gm_accessors_'], 'object', 'view.map is a google map object');

    });

    test('changing the map zoom level updates the model', function(){
        var model = new MapModel(),
        view = new mapPreviewView({
            el:$(mapTestDOM),
            model: model
        }).render();

        view.map.setZoom(8);
        equal(model.get('zoom'), 8, 'map.zoom is 8');

        view.map.setZoom(11);
        equal(model.get('zoom'), 11, 'map.zoom has changed to 11');

    });

    test('moving the position updates the model', function(){
        var model = new MapModel(),
        view = new mapPreviewView({
            el:$(mapTestDOM),
            model: model
        }).render(),
        lat = -25.363882,
        lng = 131.044922;

        view.map.setCenter(new google.maps.LatLng(lat,lng));
        equal(model.get('center').lat, view.map.getCenter().lat(), 'the latitude has updated');
        equal(model.get('center').lng, view.map.getCenter().lng(), 'the latitude has updated');
    });

    test('changing the map type updates the model', function(){
        var model = new MapModel(),
        view = new mapPreviewView({
            el:$(mapTestDOM),
            model: model
        }).render();

        view.map.setMapTypeId(window.google.maps.MapTypeId.ROADMAP);
        equal(model.get('maptype'), 'ROADMAP', 'type is set to roadmap');

        view.map.setMapTypeId(window.google.maps.MapTypeId.TERRAIN);
        equal(model.get('maptype'), 'TERRAIN', 'type is updated to terrain');

    });


});