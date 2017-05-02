define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');
  var myNotesView = require('extensions/adapt-myNotes/js/adapt-myNotesView');

  Adapt.once('pageView:ready', function() {
    if (!Adapt.iframe) {
      // removeIframeHolder();
      createIframeHolder();
    }
    createMyNotes();
    loadMyNotes();
  });

  Adapt.on("menuView:ready", function() {
  });

  function loadMyNotes() {
    console.log(Adapt.course);
    if (Adapt.course.attributes._myNotes._isEnabled === true) {
      new myNotesView({
        model: new Backbone.Model()
      });
    }
  }

  function createMyNotes() {
    console.log('createnotes');
    $('.moodle-iframe-holder').append("<iframe name='myNotesIframe' id='myNotesIframe' class=myNotes-iframe src='" + Adapt.course.attributes._myNotes._link + "'></iframe>");
  }


  function createIframeHolder() {
    console.log('created iframe holder');
    $('html').append("<div class='moodle-view close'><button class='moodle-close-button'></button><div class='moodle-iframe-holder'></div></div>");
    $('body').addClass('moodle-close');
    applyCSSFile();
    Adapt.iframe = true;
  }

  function applyCSSFile() {
    $('.moodle-iframe-holder').addClass('loading-iframe');
    $('.myNotes-iframe').on('load', function() {
      var adaptCSS = location.protocol + '//' + location.host + location.pathname;
      adaptCSS = adaptCSS.substring(0, adaptCSS.lastIndexOf('/'));
      adaptCSS += "/assets/adapt-myNotes.css"
      console.log('APPENDING TO HEAD ' + adaptCSS);
      $('.myNotes-iframe').contents().find("head").append($("<link/>", {
        rel: "stylesheet",
        href: adaptCSS,
        type: "text/css"
      }));

      document.getElementById('moodleIframe').contentWindow.window.onbeforeunload = null; // prevents error message when leaving moodle page when you haven't submitted.

      setTimeout(function() {
        $('.moodle-iframe-holder').removeClass('loading-iframe');
      }, 100);
    });
  }

  function removeIframeHolder() {
    $('.moodle-view').remove();
    $('body').removeClass('moodle-close moodle-open');
  }

});
