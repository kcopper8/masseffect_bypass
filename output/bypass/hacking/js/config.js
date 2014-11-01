/**
 * Created by user on 2014-10-12.
 */
require.config({
    baseUrl : 'js',
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
    }
});