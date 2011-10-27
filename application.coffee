$(document).ready ->
  fixframe = ->
    oFrame = document.getElementById 'frame'
    if window.innerHeight
      win_height = window.innerHeight
    else if document.body.clientHeight
      win_height = document.body.clientHeight
    frm_height = win_height - oFrame.offsetTop - 15
    oFrame.style.height = frm_height + "px"
  redraw = ->
    $('#frame').attr 'src', 'https://notesolution.com/documents/'+data[current]
    fixframe()
  current = 0
  redraw()
  $("#prev").click ->
    if current > 0
      current -= 0
    redraw()
  $("#next").click ->
    if current < (data.length - 1)
      current += 1
    redraw()
  $("#current").click ->
    $.getJSON "/"+data[current]
