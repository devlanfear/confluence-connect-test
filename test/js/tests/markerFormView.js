define(['jquery','views/editor/markerFormView', 'model/markerModel'], function($, markerFormView, MarkerModel){

    module("Marker Form View");
    var FIELD_LOCATION = "#d-geocode",
    FIELD_TITLE = "#d-title",
    FIELD_CONTENT = "#d-content",
    BUTTON_SUBMIT = "button.submit",
    BUTTON_CANCELMARKER = "button.cancel";

    test('rendering the view returns an instance of the view', function(){
        var view = new markerFormView({
            el:$('<div />'),
            model: new MarkerModel()
        });
        equal(view.cid, view.render().cid, 'the view should return an instance of itself');
    });

     test('sensible form fields are displayed in the form', function(){
        var view = new markerFormView({
            el: $('<div />'),
            model: new MarkerModel()
        }).render();
        equal(view.$el.find(FIELD_LOCATION).attr('type'), 'text', 'location field is text');
        equal(view.$el.find(FIELD_TITLE).attr('type'), 'text', 'title field is text');
        equal(view.$el.find(FIELD_CONTENT)[0].nodeName, 'TEXTAREA', 'content field is a textarea');
    });

    test('sensible defaults values display in the form', function(){
         var view = new markerFormView({
            el: $('<div />'),
            model: new MarkerModel()
        }).render();

        equal(
            view.$el.find(FIELD_LOCATION).val(),
            '',
            'location field should be blank'
        );
        equal(
            view.$el.find(FIELD_TITLE).val(),
            '',
            'title should be blank'
        );
        equal(
            view.$el.find(FIELD_CONTENT).val(),
            '',
            'content should be blank'
        );
    });

    test('the model should update when the title, content or location fields are modified', function(){
        var model = new MarkerModel(),
        view = new markerFormView({
            el: $('<div />'),
            model: model
        }).render(),
        location = 'george street, sydney, NSW 2000',
        title = 'atlassian sydney',
        content = 'marker body content';

        view.$el.find(FIELD_LOCATION).val(location).trigger('change');
        equal(
            view.$el.find(FIELD_LOCATION).val(),
            model.get('location'),
            'model location property updates when the input field is modified'
        );

        view.$el.find(FIELD_TITLE).val(title).change();
        equal(
            view.$el.find(FIELD_TITLE).val(),
            model.get('title'),
            'model title property updates when the input field is modified'
        );

        view.$el.find(FIELD_CONTENT).val(content).change();
        equal(
            view.$el.find(FIELD_CONTENT).val(),
            model.get('content'),
            'model content property updates when the textarea is modified'
        );


    });



});