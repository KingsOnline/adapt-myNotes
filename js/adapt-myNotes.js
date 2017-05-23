define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');
  var myNotesView = require('extensions/adapt-myNotes/js/adapt-myNotesView');
  // var copyNotes = require('extensions/adapt-myNotes/js/copyToNotes');

  Adapt.once('app:dataReady', function() {
    console.log('app ready notes');
    if (!Adapt.iframe)
      createIframeHolder();
  });

  Adapt.once('adapt:start', function() {
    console.log('adapt:start');
    createNotesManager();
    createPostNote();
    applyCSSFile();
  });

  Adapt.on('pageView:postRender', function() {
    console.log('pageview:preRender');
    loadMyNotes();
  });

  Adapt.on('menuView:postRender', function() {
    console.log('menuView:preRender');
    loadMyNotes();
  });

  function loadMyNotes() {
    console.log('create');
    if (Adapt.course.attributes._myNotes._isEnabled === true) {
      new myNotesView({
        model: new Backbone.Model()
      });
    }
  }

  function createNotesManager() {
    $('.moodle-iframe-holder').append("<div class='notesManger'><button class='moodle-newNote-button'>Create new Note</button><iframe name='myNotesIframe' id='myNotesIframe' class='myNotes-iframe' src='" + Adapt.course.attributes._myNotes._notesManager + "'></iframe></div>");
  }

  function createPostNote() {
    $('.moodle-iframe-holder').append("<div class='newNote hidden'><button class='moodle-postNote-button'>Post Note</button><iframe name='newNoteIframe' id='newNoteIframe' class='newNote-iframe' src='" + Adapt.course.attributes._myNotes._newNote + "'></iframe></div>");
  }

  // function postMessage() {
  //   console.log('postMessage');
  //   window.load(function() {
  //     $('#myNotesIframe').contents().find('#id_submitbutton').trigger("click");
  //   });
  // }

  function createIframeHolder() {
    console.log('created iframe holder');
    $('html').append("<div class='moodle-view close'><button class='moodle-close-button'></button><div class='moodle-iframe-holder'></div></div>");
    $('body').addClass('moodle-close');
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

      document.getElementById('myNotesIframe').contentWindow.window.onbeforeunload = null; // prevents error message when leaving moodle page when you haven't submitted.

      setTimeout(function() {
        $('.moodle-iframe-holder').removeClass('loading-iframe');
      }, 100);
    });
  }
});
