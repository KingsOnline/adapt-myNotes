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

      $(document).on('click', '.moodle-post-button', function() {
        console.log('pressed');
        $('#myNotesIframe').contents().find('#id_submitbutton').trigger("click");
      });

      console.log('finished');
    },

    launchButton: function(event) {
      console.log($('.moodle-iframe').hasClass('hidden'));
      if ($('.moodle-view').hasClass('open') && $('.moodle-iframe').hasClass('hidden')) {
        this.closeNotesManager(event); // close
      } else {
        this.openNotesManager(event);
      }
      $('.myNotes-iframe').removeClass('hidden');
      $('.myNotes-iframe').siblings().addClass('hidden');
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
