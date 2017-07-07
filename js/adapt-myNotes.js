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

  Adapt.once("sideView:appendRun", function(routeAdress, number) {
    if (Adapt.course.get('_myNotes')._isEnabled) {
      Adapt.course.get('_myNotes')._notesManager = routeAdress + Adapt.course.get('_myNotes')._notesManager + '_' + number;
      Adapt.course.get('_myNotes')._newNote = routeAdress + Adapt.course.get('_myNotes')._newNote + '_' + number;
      console.log(Adapt.course.get('_myNotes')._newNote);
    }
  });

  Adapt.on('sideView:pageReady sideView:menuReady', function() {
    if (Adapt.course.get('_myNotes')._isEnabled) {
      new myNotesView({
        model: new Backbone.Model()
      });
    }
  });

  function createCopyBox() {
    var template = Handlebars.templates.myNotesCopy;
    $('#wrapper').append(template(Adapt.course.attributes._myNotes._copyNotes));
  }

  function createNotesManager() {
    var template = Handlebars.templates.myNotesManager;
    $('.sideview-iframe-holder').append(template());
  }

  function createPostNote() {
    var template = Handlebars.templates.myNotesNew;
    $('.sideview-iframe-holder').append(template());
  }
});
