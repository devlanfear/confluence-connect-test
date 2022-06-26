define(['jquery','views/editor/formView', 'model/mapModel'], function($, formView, MapModel){

    module("Form View");
    var FIELD_WIDTH = "#d-width",
    FIELD_HEIGHT = "#d-height",
    FIELD_KMLIMPORT = "#d-kmlimport",
    BUTTON_ADDMARKER = "button#addmarker",
    BUTTON_CANCELMARKER = "button.cancel",
    MARKER_FORM = '#marker-form-container';

    test('rendering the view returns an instance of the view', function(){
        var view = new formView({
            el:$('<div />'),
            model: new MapModel()
        });
        equal(view.cid, view.render().cid, 'the view should return an instance of itself');
    });

    test('clicking the "add marker" button creates a sub form', function(){
        var view = new formView({
            el: $('<div />'),
            model: new MapModel()
        }).render();
        view.$el.find(BUTTON_ADDMARKER).click();
        equal(view.$el.find(MARKER_FORM + ' input:first').length, 1, 'the form renders');
    });

    test("Cancel button clears the form", function() {
        var view = new formView({
            el: $('<div />'),
            model: new MapModel()
        }).render();
        view.$el.find(BUTTON_ADDMARKER).click();
        view.$el.find(BUTTON_CANCELMARKER).click();
        equal(view.$el.find(MARKER_FORM + ' input').length, 0, 'the form is removed after the cancel button is clicked');
    });

    test('sensible form fields are displayed in the form', function(){
        var view = new formView({
            el: $('<div />'),
            model: new MapModel()
        }).render();
        equal(view.$el.find(FIELD_WIDTH).attr('type'), 'text', 'width field is text');
        equal(view.$el.find(FIELD_HEIGHT).attr('type'), 'text', 'height field is text');
        equal(view.$el.find(FIELD_KMLIMPORT).attr('type'), 'text', 'kmlimport field is text');
        equal(view.$el.find(BUTTON_ADDMARKER).length, 1, 'add marker button is present');
    });

    test('sensible defaults values display in the form', function(){
        var model = new MapModel(),
        view = new formView({
            el: $('<div />'),
            model: model
        }).render();

        equal(
            parseInt(view.$el.find(FIELD_WIDTH).val(), 10),
            model.get('width'),
            'model width is the same as the form'
        );
        equal(
            parseInt(view.$el.find(FIELD_HEIGHT).val(), 10),
            model.get('height'),
            'model height is the same as the form'
        );
    });

    test('the width and height fields should update when the model fields are modified', function(){
        var model = new MapModel(),
            view = new formView({
                el: $('<div />'),
                model: model
            }).render(),
            randomWidth = Math.floor(Math.random() * 1000) + 100,
            randomHeight = Math.floor(Math.random() * 1000) + 100;

            model.set('width', randomWidth);
            equal(view.$el.find(FIELD_WIDTH).val(), randomWidth, 'width field updated to new model value');

            model.set('height', randomHeight);
            equal(view.$el.find(FIELD_HEIGHT).val(), randomHeight, 'height field updated to new model value');

    });

    test('the model should update when width and height fields are changed by the user', function(){
        var model = new MapModel(),
            view = new formView({
                el: $('<div />'),
                model: model
            }).render(),
            randomWidth = Math.floor(Math.random() * 1000) + 100,
            randomHeight = Math.floor(Math.random() * 1000) + 100;
            view.$el.find(FIELD_WIDTH).val(randomWidth).change();
            equal(randomWidth, model.get('width'), 'width field updated to the value in the form');
            view.$el.find(FIELD_HEIGHT).val(randomHeight).change();
            equal(randomHeight, model.get('height'), 'height field updated to the value in the form');

    });

});