define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var moodleView = require('extensions/adapt-moodle/js/adapt-moodleView');

    Adapt.on("pageView:ready", function() {
        removeElements();
        createElements();
        loopBlocksInPage(Adapt.contentObjects._byAdaptID[Adapt.location._currentId]);
    });

    Adapt.on("menuView:ready", function() {
        removeElements();
    });

    function loopBlocksInPage(currentPage) {
        var articles = currentPage[0].attributes._children;
        for (var i = 0; i < articles.length; i++) { // loop through all the articles in the page
            var blocks = articles.models[i].attributes._children;
            for (var v = 0; v < blocks.models.length; v++) {
                var block = blocks.models[v];
                checkForMoodleAttr(block);
            }
        }
    }

    function checkForMoodleAttr(blockModel) {
        var context = this;
        if (typeof blockModel.attributes._moodle != "undefined") {
            if (blockModel.attributes._moodle._isEnabled != false) {
                new moodleView(blockModel);
            }
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
