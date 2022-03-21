$(document).ready(function(){

  let files = 0;
  let onButton = 1;
  let hoverButton = 0;
  let shakerInventions;
  
  for (let i = 1; i < 13; i++) {
    let num = i < 10 ? '0' + i : i;
    $.ajax({
      type: 'GET',
      url: 'img/invention_catalog/icon-' + num + '.svg',
      dataType: 'text',
      success: function(data) {
        $('#icon-' + num + '-container').append(data);
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
      $('#icon-backs-01').find('circle').css('fill', activeColor);
      $('#clicked-stroke-01').children().css('stroke', activeColor);
      $("#icon-01-container").find('circle').css('stroke', activeColor);
      
      $('.icon-container').children().css('pointer-events', 'none');
      
      for (let i = 0; i < 12; i++) {
        $('<img src="img/invention_catalog/img_' + i + '.jpg"/>');
      }

      onButton = '01';
      setSidebar('01', true);
      setSource();
    }
  }
  
  function setSidebar(villageId, setActive) {
    if(setActive) {
      setSidebarContent(villageId);
      $('#sidebar').animate({opacity: 1}, 150, 'linear');
      $('#img_source').animate({opacity: 1}, 150, 'linear');
    } else {
      $('#sidebar').animate({opacity: 0.25}, 100, 'linear', setSidebarContent(villageId));
      $('#img_source').animate({opacity: 0.25}, 100, 'linear');
    }
  }

  function setSidebarContent(inventionId) {
    let num = parseInt(inventionId);
    $('#invention-img').attr('src', 'img/invention_catalog/img_' + inventionId + '.jpg');
    $('#invention-img').attr('alt', shakerInventions[num][5]);
    $('#invention-name').html(shakerInventions[num][0]);
    $('#invention-metadata').html(shakerInventions[num][3] + ' | ' + shakerInventions[num][2] + ' | ' + shakerInventions[num][1]);
    $('#invention-description').html(shakerInventions[num][4]);
    $('#img_source').html('SOURCE: ' + shakerInventions[num][6]);
  }

  $('.icon-container').on('mouseover', function(event) {
    let buttonId = $(this).attr('id').substring(5,7);

    if (buttonId != onButton && buttonId != hoverButton) {
      $(this).find('circle').css('stroke', hoverColor);
      $('#icon-backs-' + buttonId).find('circle').css('fill', hoverColor);
      $('#clicked-stroke-' + buttonId).children().css('stroke', hoverColor);
      $('#unclicked-' + buttonId).addClass('hidden');
      $('#clicked-' + buttonId).removeClass('hidden');
      
      hoverButton = buttonId;
      setSidebar(buttonId, false);
    }
  });

  $('.icon-container').on('mouseout', function(event) {
    let buttonId = $(this).attr('id').substring(5,7);
    if (buttonId != onButton) {
      $('#icon-backs-' + buttonId).find('circle').css('fill', offBlack);
      $('#unclicked-' + buttonId).removeClass('hidden');
      $('#clicked-' + buttonId).addClass('hidden');
      $(this).find('circle').css('stroke', offWhite);
      setSidebar(onButton, true);
      hoverButton = 0;
    }
  });

  $('.icon-container').on('mousedown', function(event) {
    let buttonId = $(this).attr('id').substring(5,7);
    if (buttonId != onButton) {
      $('#icon-backs-' + onButton).find('circle').css('fill', offBlack);
      $('#icon-' + onButton + '-container').find('circle').css('stroke', offWhite);
      $('#unclicked-' + onButton).removeClass('hidden');
      $('#clicked-' + onButton).addClass('hidden');

      $('#icon-backs-' + buttonId).find('circle').css('fill', activeColor);
      $('#clicked-stroke-' + buttonId).children().css('stroke', activeColor);
      $(this).find('circle').css('stroke', activeColor);

      onButton = buttonId;
      setSidebar(buttonId, true);
    }
  });

  $('.icon-container').on('mouseup', function(event) {
    let buttonId = $(this).attr('id').substring(5,7);
    if (buttonId != onButton) {
      $('#icon-backs-' + buttonId).find('circle').css('fill', hoverColor);
      $('#clicked-stroke-' + buttonId).children().css('stroke', hoverColor);
      $(this).find('circle').css('stroke', hoverColor);
    }
  });

  function setSource() {
    $('#img_source').css('left', window.innerWidth/2 + remToPx(23.75, 'small'));
    $('#img_source').css('top', remToPx(2.1, 'small'));
  }

  $( window ).resize(function() {
    setSource();
  });
});
