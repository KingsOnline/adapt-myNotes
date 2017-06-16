define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');
  var currentSelected;

  var copyToNotes = Backbone.View.extend({

    initialize: function(blockModel) {
      this.listenTo(Adapt, 'remove', this.remove);
      var context = this;
      $('body').on('mouseup', '#wrapper', function(e) {
        setTimeout(function() {
          var selectedText = window.getSelection().toString();
          console.log(selectedText);
          if (selectedText != '' && currentSelected != selectedText) {
            console.log('window.selection');
            currentSelected = selectedText;
            context.showBox(e.pageX, e.pageY);
          } else {
            console.log('hide box');
            $('.copy-box-button').hide();
            selectedText = '';
          }
        }, 100);
      });

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
        frameContents.find('#id_messageeditable').append(currentSelected);
      } else {
        frameContents.find('#id_messageeditable').append("<br><br>" + currentSelected);
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
