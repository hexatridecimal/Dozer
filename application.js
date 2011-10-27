$(document).ready(function() {
  var current, fixframe, redraw;
  fixframe = function() {
    var frm_height, oFrame, win_height;
    oFrame = document.getElementById('frame');
    if (window.innerHeight) {
      win_height = window.innerHeight;
    } else if (document.body.clientHeight) {
      win_height = document.body.clientHeight;
    }
    frm_height = win_height - oFrame.offsetTop - 15;
    return oFrame.style.height = frm_height + "px";
  };
  redraw = function() {
    $('#frame').attr('src', 'https://notesolution.com/documents/' + data[current]);
    return fixframe();
  };
  current = 0;
  redraw();
  $("#prev").click(function() {
    if (current > 0) {
      current -= 0;
    }
    return redraw();
  });
  $("#next").click(function() {
    if (current < (data.length - 1)) {
      current += 1;
    }
    return redraw();
  });
  return $("#current").click(function() {
    return $.getJSON("/" + data[current]);
  });
});