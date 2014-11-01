({
    baseUrl : '../src/js',
    paths : {
        'jquery' : 'lib/jquery-1.11.1',
        'underscore' : 'lib/underscore',
        'backbone' : 'lib/backbone'
    },
    sim : {
        'jquery' : {
            exports : 'jQuery'
        },
        'backbone' : {
            exports : 'Backbone'
        },
        'underscore' : {
            exports : '_'
        }
    },
    name : "app/base",
    out : "../output/bypass/hacking/js/app/base.js"
})