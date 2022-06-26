define(['jquery', 'model/mapModel'], function($,MapModel){
    test( "MapModel Defaults", function() {
        var model = new MapModel();
        var result = model.get('center');
        equal( typeof result, 'object', "map.center is an object" );
    });
});