define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');

  var myNotesView = Backbone.View.extend({

    className: "myNotes",

    initialize: function(blockModel) {
      this.listenTo(Adapt, 'remove', this.remove);
      var data = this.model.toJSON();
      var template = Handlebars.templates.myNotes;
      this.setElement(template(data)).$el.appendTo($(".navigation-inner"));
      this.listenTo(Adapt, {
        "navigation:openMyNotes": this.launchButton
      });

      this.reloadIframes();

      var context = this;

      $(document).on('click', '.postNote-button', function() {
        context.postNewNote();
      });

      $(document).on('click', '.newNote-button', function() {
        context.showNewNote();
      });
    },

    launchButton: function(event) {
      if ($('.sideview').hasClass('open') && !$('.notesManager').hasClass('hidden')) {
        Adapt.trigger('sideView:close');
      } else {
        Adapt.trigger('sideView:open');
      }
      this.showNotesManager();
    },

    showNewNote: function(event) {
      $('.newNote').removeClass('hidden');
      $('.newNote').siblings().addClass('hidden');
      $('.sideview-controls-title').text('New note');
    },

    showNotesManager: function(event) {
      $('.notesManager').removeClass('hidden');
      $('.notesManager').siblings().addClass('hidden');
      $('.sideview-controls-title').text('My notes');
    },

    reloadIframes: function(event) {
      Adapt.trigger('sideView:loadIframe','notesManager', 'notesManager', Adapt.course.attributes._myNotes._notesManager);
      Adapt.trigger('sideView:loadIframe','newNote', 'newNote', Adapt.course.attributes._myNotes._newNote);
      Adapt.trigger('sideView:removeLoading');
    },

    postNewNote: function(event) {
      $('.newNote-iframe').contents().find('#id_submitbutton').trigger("click");
      var context = this;
      setTimeout(function() {
        context.showNotesManager();
        context.reloadIframes();
      }, 300);
    }
  });

  return myNotesView;
});
