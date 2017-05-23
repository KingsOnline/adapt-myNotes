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

      var context = this;

      $(document).on('click', '.postNote-button', function() {
        context.postNewNote();
      });

      $(document).on('click', '.newNote-button', function() {
        context.openNewNote();
      });
    },

    launchButton: function(event) {
      console.log($('.moodle-iframe').hasClass('hidden'));
      if ($('.moodle-view').hasClass('open') && $('.moodle-iframe').hasClass('hidden')) {
        this.closeNotesManager(event); // close
      } else {
        this.openNotesManager(event);
      }
      $('.notesManager').removeClass('hidden');
      $('.notesManager').siblings().addClass('hidden');
    },

    openNewNote: function(event) {
      $('.newNote').removeClass('hidden');
      $('.newNote').siblings().addClass('hidden');
    },

    postNewNote: function(event) {
      $('#myNotesIframe').contents().find('#id_submitbutton').trigger("click");
    },

    openNotesManager: function(event) {
      $('body').addClass('moodle-open').removeClass('moodle-close');
      $('.moodle-view').removeClass('close').addClass('open');
      $('.moodle-close-button').text('Close My Notes');
      var context = this;
      $(".moodle-close-button").on("click", function() {
        context.closeNotesManager();
      });
    },

    closeNotesManager: function(event) {
      $('.moodle-view').removeClass('open').addClass('close');
      $('body').removeClass('moodle-open').addClass('moodle-close');
      $('.moodle-launch-button.open').removeClass('open');
    }
  });

  return myNotesView;
});
