define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var myNotesView = require('extensions/adapt-myNotes/js/adapt-myNotesView');

    Adapt.on("pageView:ready", function() {
        loadMyNotes();
    });

    Adapt.on("menuView:ready", function() {
        removeElements();
    });

    function loadMyNotes() {
        console.log(Adapt.course);
        if (Adapt.course.attributes._myNotes._isEnabled === true) {
          new myNotesView({
              model: new Backbone.Model()
          });
        }
    }

    function createElements() {
        $('html').append("<div class='moodle-view close'><button class='moodle-close-button'></button><div class='moodle-iframe-holder'></div></div>");
        $('body').addClass('moodle-close');
    }

    function removeElements() {
        $('.moodle-view').remove();
        $('body').removeClass('moodle-close moodle-open');
    }
});
