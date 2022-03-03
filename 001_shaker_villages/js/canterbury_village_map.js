let files = 0;
let dateArray = [];
let currDate = 1789;
let currIndex = 0;
let animInterval;
let playing = false;

$(document).ready(function(){

  $.ajax({
    type: 'GET',
    url: 'img/canterbury_plan.svg',
    dataType: 'text',
    success: function(data) {
      let element = document.getElementById('svg-container');
      element.innerHTML += data;
      setUp(data);
    }
  });

  $.ajax({
    type: 'GET',
    url: 'data/canterbury_buildings.csv',
    dataType: 'text',
    success: function(data) {
      dateArray = $.csv.toArrays(data);
      setUp();
    }
  });



  function setUp() {
    files++;
    if (files == 2) { // if all files have been processed
      $( '.building' ).on( "mouseover", function( event ) {
        let buildingId = $( this ).attr("id");
        if (buildingId.substring(2) < currIndex || (currIndex == 0 && playing == false)) {
          $( '#' + buildingId + '-label').removeClass('transparent');
        }
      });

      $( '.building' ).on( "mouseout", function( event ) {
        let buildingId = $( this ).attr("id");
        $( '#' + buildingId + '-label').addClass('transparent');
      });

      // play/pause putton behavior
      $('#play-button-circle').on('mousedown', function(event) {
        $(this).siblings('circle').css('stroke', activeColor);
        $(this).siblings('text').css('fill', activeColor);
        if (playing) { // pause if playing
          pause();
        } else { // play if paused
          play();
        }
      });

      $('#play-button-circle').on('mouseover', function(event) {
        $(this).siblings('circle').css('stroke', hoverColor);
        $(this).siblings('text').css('fill', hoverColor);
      });

      $('#play-button-circle').on('mouseout', function(event) {
        $(this).siblings('circle').css('stroke', offBlack);
        $(this).siblings('text').css('fill', offBlack);
      });

      $('#play-button-circle').on('mouseup', function(event) {
        $(this).siblings('circle').css('stroke', hoverColor);
        $(this).siblings('text').css('fill', hoverColor);
      });
    }
  }

  function play() {
    playing = true;
    $('.cls-8').removeClass('text-flash');
    if (currDate == 1789) {
      $('.building-mask').addClass('transparent');

    }
    $('#play-button-g').find('text').html('PAUSE');
    animInterval = setInterval(runTimeline, 250);
  }

  function runTimeline() {
    currDate++;
    $('#date-label').html(currDate);
    while(currIndex < dateArray.length && dateArray[currIndex][0] == currDate) {
      let id = currIndex + 1;
      $( '#m-' + id).removeClass('transparent');
      //$( '#b-' + id + '-label').addClass('text-flash');
      currIndex++;
    }
    if (currDate == 1925) {
      replay();
    }
  }

  function pause() {
    playing = false;
    clearInterval(animInterval);
    $('#play-button-g').find('text').html('PLAY');
  }

  function replay() {
    playing = false;
    clearInterval(animInterval);
    $('#play-button-g').find('text').html('PLAY');
    currDate = 1789;
    currIndex = 0;
  }

});
