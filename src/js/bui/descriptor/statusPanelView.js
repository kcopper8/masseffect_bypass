/**
 * Created by user on 2014-11-03.
 */
define(['jquery', 'underscore', 'backbone', 'text!bui/descriptor/statusPanelViewTemplate.html'], function ($, _, Backbone, statusPanelViewTemplate) {
    var StatusPanel = Backbone.View.extend({
        className : "bp_status_panel",
        events : {
            "click BUTTON.bp_button" : "onClickStartHack"

        },
        initialize : function () {
            this.$el.html(statusPanelViewTemplate);

            this.$foundCodeViews = this.$el.find(".bp_found_codes .img_container");
            this.$foundCodeViewCovers = this.$el.find(".bp_found_codes .bp_cover");
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "change:stage", this.onStageChange);
            this.render();
        },

        _setCodePath : function (path, idx) {
            if (!!path) {
                this.$foundCodeViews[idx].innerHTML = "<IMG src='" + path + "'>";
            } else {
                this.$foundCodeViews[idx].innerHTML = '';
            }
        },

        onStageChange : function () {
            if (this.model.isStartStage()) {
                this._startGlowStartButton();
            } else {
                this._stopGlowStartButton();
            }

            if (this.model.isHackingSuccessed()) {
                this.hackingSuccessed();
            }
        },

        _startGlowStartButton : function () {
            if (!this._glowIntervalKey) {
                this._glowIntervalKey = setInterval(_.bind(function () {
                    this.$("BUTTON.bp_button").toggleClass("bp_glow_on");
                }, this), 400);
            }
        },

        _stopGlowStartButton : function () {
            if (!!this._glowIntervalKey) {
                clearInterval(this._glowIntervalKey);
                delete this._glowIntervalKey;
            }
        },

        render : function () {
            this.$el.toggleClass("bp_start_stage", this.model.get('stage') == 'start');

            this._setCodePath(this.model.getHackedCodePath(0), 0);
            this._setCodePath(this.model.getHackedCodePath(1), 1);
            this._setCodePath(this.model.getHackedCodePath(2), 2);
        },

        _setCodeAccepted : function (idx) {
            $(this.$foundCodeViewCovers[idx]).addClass('bp_accepted');
        },

        hackingSuccessed : function () {
            function doHighlight(el) {
                var $el = $(el);
                var cover = $el.find(".bp_cover");

                return $.Deferred(function (deferred) {
                    cover.show({
                        effect: "puff",
                        easing: "easeInBack",
                        duration: 700,
                        complete: function () {
                            deferred.resolve();
                        }
                    });

                }).promise();
            }

            var divs = this.$el.find(".bp_found_codes > DIV");
            doHighlight(divs[0])
                .then(function () {
                    return doHighlight(divs[1]);
                })
                .then(function () {
                    return doHighlight(divs[2]);
                })
                .done(_.bind(function () {
                    this.$el.addClass("bp_completed");

                    _.delay(function (model) {
                        model.trigger("firewallRemoved");
                    }, 500, this.model);
                }, this));
        },

        onClickStartHack : function () {
           this.model.trigger("startGame");
        }
    });

    StatusPanel.create = function (model) {
        return new StatusPanel({
            model : model
        });
    };

    return StatusPanel;
});