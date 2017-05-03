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
      console.log('finished');
    },

    launchButton: function(event) {
      $('.myNotes-iframe').css('display', 'block');
      //$('.myNotes-iframe').siblings().css('display', 'none');
      if ($('.moodle-view').hasClass('open')) {
        this.closeLightbox(event); // close
      } else {
        this.openLightbox(event);
      }
    },

    openLightbox: function(event) {
      $('body').addClass('moodle-open').removeClass('moodle-close');
      $('.moodle-view').removeClass('close').addClass('open');
      $('.moodle-close-button').text('Close My Notes');
      var context = this;
      $(".moodle-close-button").on("click", function() {
        context.closeLightbox();
      });
    },

    closeLightbox: function(event) {
      $('.moodle-view').removeClass('open').addClass('close');
      $('body').removeClass('moodle-open').addClass('moodle-close');
      $('.moodle-launch-button.open').removeClass('open');
    }
  });

  return myNotesView;
});
