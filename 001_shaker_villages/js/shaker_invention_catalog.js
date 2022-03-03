$(document).ready(function(){

  let files = 0;
  let onButton = 1;
  let shakerInventions;

  for (let i = 1; i < 13; i++) {
    let num = i < 10 ? '0' + i : i;
    $.ajax({
      type: 'GET',
      url: 'img/invention_catalog/icon-' + num + '.svg',
      dataType: 'text',
      success: function(data) {
        $('#icon-' + num + '-container').append(data);
        console.log(num);
        setUp();
      }
    });
  }

  $.ajax({
    type: 'GET',
    url: 'data/shaker_inventions.csv',
    dataType: 'text',
    success: function(data) {
      shakerInventions = $.csv.toArrays(data);
      setUp();
    }
  });

  function setUp() {
    files++;
    if (files == 13) { // if all files have been processed
      setSidebar('01');
    }
  }

  function setSidebar(inventionId) {
    let num = parseInt(inventionId);
    $('#invention-image').attr('src', 'img/invention_catalog/img_' + inventionId + '.jpg');
    // $('#invention-image').attr('alt', imagePath + shakerInventions[inventionId][6]);
    $('#invention-name').html(shakerInventions[num][0]);
    $('#invention-metadata').html(shakerInventions[num][1] + ' | ' + shakerInventions[inventionId][2]);
    $('#invention-description').html(shakerInventions[num][5]);
  }

  $('.icon-container').on('mouseover', function(event) {
    let buttonId = $(this).attr('id').substring(5,7);

    if (buttonId != onButton) {
        $(this).find('circle').css('stroke', hoverColor);
        $('#icon-backs-' + buttonId).find('circle').css('fill', hoverColor);
        $('#unclicked-stroke' + buttonId).css('stroke', hoverColor);
        $('#unclicked-' + buttonId).addClass('hidden');
        $('#clicked-' + buttonId).removeClass('hidden');
    }
  });

  $('.icon-container').on('mouseout', function(event) {
    let buttonId = $(this).attr('id').substring(5,7);
    if (buttonId != onButton) {
      $('#icon-backs-' + buttonId).find('circle').css('fill', offBlack);
      $('#unclicked-' + buttonId).removeClass('hidden');
      $('#clicked-' + buttonId).addClass('hidden');
      $(this).find('circle').css('stroke', offWhite);
    }
  });

  $('.icon-container').on('mousedown', function(event) {
    let buttonId = $(this).attr('id').substring(5,7);
    if (buttonId != onButton) {
      $('#icon-backs-' + onButton).find('circle').css('fill', offBlack);
      $('#clicked-stroke' + onButton).css('stroke', offWhite);
      $('#icon-' + onButton + '-container').find('circle').css('stroke', offWhite);
      $('#unclicked-' + onButton).removeClass('hidden');
      $('#clicked-' + onButton).addClass('hidden');

      $('#icon-backs-' + buttonId).find('circle').css('fill', activeColor);
      $('#clicked-stroke' + buttonId).css('stroke', activeColor);
      $(this).find('circle').css('stroke', activeColor);

      onButton = buttonId;
      setSidebar(buttonId);
      $('#sidebar').animate({scrollTop: 0}, 300, 'swing');
    }
  });

  $('.icon-container').on('mouseup', function(event) {
    let buttonId = $(this).attr('id').substring(5,7);
    if (buttonId != onButton) {
      $('#icon-backs-' + buttonId).find('circle').css('fill', hoverColor);
      $('#clicked-stroke' + buttonId).css('stroke', hoverColor);
      $(this).find('circle').css('stroke', hoverColor);
    }
  });
});
