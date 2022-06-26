define([
    'jquery',
    'views/editor/markerListView',
    'model/mapModel',
    'model/markerModel'
    ], function($, markerListView, MapModel, MarkerModel){

    module("Marker List View");

    test('rendering the view returns an instance of the view', function(){
        var view = new markerListView({
            el:$('<div />'),
            model: new MapModel()
        });
        equal(view.cid, view.render().cid, 'the view should return an instance of itself');
    });

    test('a blank list renders no items', function(){
        var model = new MapModel(),
        view = new markerListView({
            el:$('<div />'),
            model: model
        }).render();
        equal(view.$el.find('tbody tr').length, 0, 'an empty marker collection has no entries');

    });

    test('the view renders a marker if in the model', function(){
        var markerModel = new MarkerModel(),
        model = new MapModel(),
        view = new markerListView({
            el:$('<div />'),
            model: model
        }).render();
        markerModel.set('title', 'dummy title');
        model.get('markers').create(markerModel);

        equal(view.$el.find('tbody tr').length, 1, '1 item is present in the list');
        ok(view.$el.find('tbody tr').text().indexOf('dummy title') != -1, 'the title is displayed');

    });

    test('the marker is removed when remove is run', function(){

        var markerModel = new MarkerModel(),
        model = new MapModel(),
        view = new markerListView({
            el:$('<div />'),
            model: model
        }).render();

        equal(view.$el.find('tbody tr').length, 0, 'there are 0 items by default');

        markerModel.set('title', 'dummy title');
        model.get('markers').create(markerModel);

        equal(view.$el.find('tbody tr').length, 1, '1 item is present in the list');
        view.$el.find('tbody tr .remove:first').click();
        equal(view.$el.find('tbody tr').length, 0, 'item has been removed from the list');

    });

});