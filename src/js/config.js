/**
 * Created by user on 2014-10-12.
 */
require.config({
    baseUrl : 'js',
    paths : {
        'jquery' : 'lib/jquery-1.11.1',
        'jquery-ui' : 'lib/jquery-ui.min',
        'underscore' : 'lib/underscore',
        'backbone' : 'lib/backbone',
        'text' : 'lib/text',
        'imagesLoaded' : "lib/imagesloaded.pkgd.min"
    },
    shim : {
        'jquery-ui' : {
            deps : ['jquery']
        }
    }
});