define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');
  var myNotesView = require('extensions/adapt-myNotes/js/adapt-myNotesView');
  // var copyNotes = require('extensions/adapt-myNotes/js/copyToNotes');

  Adapt.once('sideView:loaded', function() {
    createNotesManager();
    createPostNote();
  });

  Adapt.on('sideView:pageReady sideView:menuReady', function() {
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
    $('.sideview-iframe-holder').append("<div class='notesManager hidden'><iframe name='notesManager-iframe' id='notesManager-iframe' class='notesManager-iframe'></iframe><button class='newNote-button'>Create new Note</button></div>");
  }

  function createPostNote() {
    $('.sideview-iframe-holder').append("<div class='newNote hidden'><iframe name='newNote-iframe' id='newNote-iframe' class='newNote-iframe'></iframe><button class='postNote-button'>Post Note</button></div>");
  }
});
