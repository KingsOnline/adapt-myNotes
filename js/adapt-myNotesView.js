define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var moodleView = Backbone.View.extend({

        className: "myNotes",

        initialize: function(blockModel) {
            console.log('init');
            this.listenTo(Adapt, 'remove', this.remove);
            var data = this.model.toJSON();
            var template = Handlebars.templates.myNotes;
            this.setElement(template(data)).$el.appendTo($(".navigation-inner"));
            this.listenTo(Adapt, {
                "navigation:openMyNotes": this.helloWorld
            });
        },

        events: {
            'click button.navigation-myNotes': 'helloWorld'
        },

        helloWorld: function(event) {
          console.log('hello world');
        },

        launchButton: function(event) {
            if ($(event.target).hasClass('open')) {
                this.closeLightbox(event); // close
            } else {
                this.openLightbox(event);
            }
        },

        openLightbox: function(event) {
            $('.moodle-launch-button.open').removeClass('open'); // closes other instances
            $(event.target).addClass('open');
            $('body').addClass('moodle-open').removeClass('moodle-close');
            $('.moodle-view').removeClass('close').addClass('open');

            var linkToBlock = location.protocol + '//' + location.host + location.pathname + '#/id/' + this.attributes._id;
            if ($('.moodle-iframe').attr('src') != this.attributes._moodle._link) {
                $('.moodle-iframe-holder').children().remove();
                this.renderIframe(this.attributes._moodle._type, linkToBlock);
            }

            this.scrollToBlock();
            this.setupCloseButton();

        },

        scrollToBlock: function() {
            var $firstChild = '.' + this.attributes._children.models[0].attributes._id;
            Adapt.scrollTo($($firstChild), {
                duration: 700
            });
        },

        setupCloseButton: function() {
            $('.moodle-close-button').html("Close " + this.attributes._moodle.buttonLabel);
            var context = this;
            $(".moodle-close-button").on("click", function() {
                context.closeLightbox();
            });
        },

        renderIframe: function(type, linkToBlock) {
            $('.moodle-iframe-holder').addClass('loading-iframe');
            $('.moodle-iframe-holder').append("<iframe name='moodleIframe' id='moodleIframe' class='moodle-iframe'></iframe>");
            $('.moodle-iframe').attr('src', this.attributes._moodle._link);

            $('.moodle-iframe').on('load', function() {
                var adaptCSS = location.protocol + '//' + location.host + location.pathname;
                adaptCSS = adaptCSS.substring(0, adaptCSS.lastIndexOf('/'));
                adaptCSS += "/assets/adapt-moodle-iframe-" + type + ".css"
                console.log('APPENDING TO HEAD ' + adaptCSS);
                $('.moodle-iframe').contents().find("head").append($("<link/>", {
                    rel: "stylesheet",
                    href: adaptCSS,
                    type: "text/css"
                }));

                document.getElementById('moodleIframe').contentWindow.window.onbeforeunload = null; // prevents error message when leaving moodle page when you haven't submitted.

                setTimeout(function() {
                    $('.moodle-iframe-holder').removeClass('loading-iframe');
                }, 100);
            });
        },

        closeLightbox: function(event) {
            console.log('close')
            if (event && event.preventDefault) event.preventDefault();
            $('.moodle-view').removeClass('open').addClass('close');
            $('.moodle-launch-button.open').removeClass('open');
            $('body').removeClass('moodle-open').addClass('moodle-close');
        },

        setButtonName: function() {
          if(this.attributes._moodle.buttonLabel == undefined || this.attributes._moodle.buttonLabel == "") {
            this.attributes._moodle.buttonLabel = this.attributes._moodle._type;
          }
        },

        render: function(blockModel) {
            // // Convert model data into JSON
            this.setButtonName();
            var data = blockModel.toJSON();
            data = data._moodle;
            var template = Handlebars.templates["moodle"];
            var $selector = $('.' + blockModel.attributes._id + '>:first');
            this.$el.html(template(data)).appendTo($selector);
            return this;
        }
    });

    // Return moodleView so it can be required
    return moodleView;
});
