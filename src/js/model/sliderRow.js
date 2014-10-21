/**
 * Created by user on 2014-10-18.
 */
define(['backbone', 'model/cardSet'], function (Backbone, CardSet) {
    var SliderRow = Backbone.Collection.extend({
        model : CardSet
    });
    return SliderRow;
});