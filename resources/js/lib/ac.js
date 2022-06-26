/*global define*/
AC = {};

AC.getBaseUrl = function(){
    return this.getUrlParam('xdm_e', true) + this.getUrlParam('cp', true) + '/atlassian-connect';
};

AC.loadJS = function(url, options){
    var script = document.createElement("script");
    script.src = url;
    if(options){
        script.setAttribute('data-options', options);
    }
    document.getElementsByTagName("head")[0].appendChild(script);
};

AC.getUrlParam = function(param, escape){
    try{
        var regex = new RegExp(param + '=([^&]+)'),
        data = regex.exec(window.location.search)[1];
        // decode URI with plus sign fix.
        return (escape) ? window.decodeURIComponent(data.replace(/\+/g, '%20')) : data;
    } catch (e){
        return undefined;
    }
};


AC.loadCSS = function(url){
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
};

AC.init = function(){
    this.loadJS(this.getBaseUrl() + '/all.js', 'resize:false;margin:false');
    this.loadCSS(this.getBaseUrl() + '/all.css');
};

AC.removeMargin = function(){
    $(function(){
        $("head").append($('<style type="text/css">body {margin: 0 !important;}</style>'));
    });
};
//if not inside the iframe, load it from the test runner
if ( window.self === window.top ) {
    AC.loadJS('/test/js/all.js');
} else {
    if(AC.getUrlParam('xdm_e', true).search('https') < 0 && window.location.href.search('https') >= 0){
        if(console){
            console.log('redirecting to http from https');
        }
        window.location = window.location.toString().replace('https', 'http');
    }
    AC.init();
}
