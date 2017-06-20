define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');
  var myNotesView = require('extensions/adapt-myNotes/js/adapt-myNotesView');
  var copyNotes = require('extensions/adapt-myNotes/js/copyToNotes');

  Adapt.once('sideView:loaded', function() {

    if (Adapt.course.attributes._myNotes._isEnabled === true) {
      createNotesManager();
      createPostNote();
      if (Adapt.course.attributes._myNotes._copyNotes._isEnabled) {
        createCopyBox();
        new copyNotes({});
      }
    }
  });

  Adapt.on('sideView:pageReady sideView:menuReady', function() {
    if (Adapt.course.attributes._myNotes._isEnabled === true) {
      new myNotesView({
        model: new Backbone.Model()
      });
    }
  });

  function createCopyBox() {
    $('#wrapper').append("<button class='copy-box-button'><div class='copy-box-button-text'>" + Adapt.course.attributes._myNotes._copyNotes.buttonText + "</div></button>");
  }

  function createNotesManager() {
    $('.sideview-iframe-holder').append("<div class='notesManager hidden'><iframe name='notesManager-iframe' id='notesManager-iframe' class='notesManager-iframe'></iframe><button class='newNote-button'>Create new Note</button></div>");
  }

  function createPostNote() {
    $('.sideview-iframe-holder').append("<div class='newNote hidden'><iframe name='newNote-iframe' id='newNote-iframe' class='newNote-iframe'></iframe><button class='postNote-button'>Post Note</button></div>");
  }
});
