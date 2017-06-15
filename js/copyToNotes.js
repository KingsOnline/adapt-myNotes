define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');
  var selected;

  var copyToNotes = Backbone.View.extend({

    initialize: function(blockModel) {
      this.listenTo(Adapt, 'remove', this.remove);
      var context = this;
      $('.component').bind('mouseup', function(e) {
        var selection;
        if (window.getSelection) {
          selection = window.getSelection();
          context.copyPrompt(e, selection);
        } else if (document.selection) {
          selection = document.selection.createRange();
          // copyPrompt(e, selection);
        }
      });
      var context = this;
      $('body').on('click', '.copy-box-button', function() {
        context.copyAcross();
        Adapt.trigger('sideView:open');
        context.showNewNote();
      });
    },

    showNewNote: function(event) {
      $('.newNote').removeClass('hidden');
      $('.newNote').siblings().addClass('hidden');
      $('.sideview-controls-title').text('New note');
    },

    copyAcross: function(event) {
      var frameContents = $(".notesManager-iframe").contents();
      if (frameContents.find('#id_messageeditable').text() == '') {
        frameContents.find('#id_messageeditable').append(selected);
      } else {
        frameContents.find('#id_messageeditable').append("<br><br>" + selected);
      }
    },

    copyPrompt: function(e, selection) {
      if (selection.toString() == '') {
        $('.copy-box-button').hide();
      } else {
        selected = selection.toString();
        var $element = $(e.toElement);
        var $selected = $('.component:contains("' + selection.toString() + '")').css('background-color', 'red');
        var position = $element.position();
        this.showBox(e.pageX, e.pageY);
      }
    },

    showBox: function(x, y) {
      console.log('show box');
      $('.copy-box-button').show();
      $('.copy-box-button').css({
        "left": x,
        "top": y + 10
      })
    }
  });

  return copyToNotes;
});
