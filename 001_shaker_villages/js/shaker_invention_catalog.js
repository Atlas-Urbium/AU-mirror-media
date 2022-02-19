$(document).ready(function(){

  let files = 0;
  let imagePath = './img/invention_catalog/'
  let shakerInventions;

  for (let i = 1; i < 3; i++) {
    $.ajax({
      type: 'GET',
      url: 'img/invention_catalog/icon-' + i + '.svg',
      dataType: 'text',
      success: function(data) {
        $('#icon-' + i + '-container').append(data);
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
    if (files == 3) { // if all files have been processed
      setSidebar(1);
      for (let i = 3; i < 17; i++) {
        $('#icon-' + i + '-container').append('<h5>' + i + '</h5>');
      }
    }
  }

  function setSidebar(inventionId) {
    $('#invention-image').attr('src', imagePath + shakerInventions[inventionId][5]);
    $('#invention-image').attr('alt', imagePath + shakerInventions[inventionId][6]);
    $('#invention-name').html(shakerInventions[inventionId][0]);
    $('#invention-category').html(shakerInventions[inventionId][4]);
    $('#invention-metadata').html(shakerInventions[inventionId][1] + ' | ' +
                                  shakerInventions[inventionId][2]);
    $('#invention-description').html(shakerInventions[inventionId][3]);
  }

  $('.icon-container').on('mouseover', function(event) {
    let buttonId = $(this).attr('id').substring(5,6);
    if (!$(this).hasClass('on')) {
        $(this).find('.cls-1').css('fill', hoverColor);
        $(this).find('.cls-3').css('stroke', hoverColor);
    }
  });

  $('.icon-container').on('mouseout', function(event) {
    let buttonId = $(this).attr('id').substring(5,6);
    if (!$(this).hasClass('on')) {
        $(this).find('.cls-1').css('fill', offBlack);
        $(this).find('.cls-3').css('stroke', offBlack);
    }
  });

  $('.icon-container').on('mousedown', function(event) {
    let buttonId = $(this).attr('id').substring(5,6);
    if (!$(this).hasClass('on')) {
      setSidebar(buttonId);
      $('#sidebar').animate({scrollTop: 0}, 300, 'swing');
      $('.icon-container').removeClass('on');
      $('.icon-container').find('.cls-1').css('fill', offBlack);
      $('.icon-container').find('.cls-3').css('stroke', offBlack);
      $(this).addClass('on');
      $(this).find('.cls-1').css('fill', activeColor);
      $(this).find('.cls-3').css('stroke', activeColor);

    }
  });

  $('.icon-container').on('mouseup', function(event) {
    let buttonId = $(this).attr('id').substring(5,6);
    if (!$(this).hasClass('on')) {
      $(this).find('.cls-1').css('fill', hoverColor);
      $(this).find('.cls-3').css('stroke', hoverColor);
    }
  });
});
