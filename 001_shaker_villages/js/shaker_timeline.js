const populationFile = 'population_data.csv';
const locationFile = 'timeline_village_locations.csv';
const eventsFile = 'shaker_events.csv';
const dateOffset = 1760;
const maxDate = 2000;
const timeInterval = 400;
let timer;

$(document).ready(function(){

  let populations;
  let villages;
  let dates;
  let files = 0;
  let mapSvg;
  let timelineSvg;
  let currDate;
  let playing = false;

  function setUp(csv, csvName) {
    if (csvName == populationFile) {
      populations = $.csv.toArrays(csv);
    } else if (csvName == locationFile) {
      villages = $.csv.toObjects(csv);
    } else if (csvName == eventsFile) {
      dates = $.csv.toObjects(csv);
    }

    files++;
    if (files == 3) { // if all files have been processed
      // set up cities
      mapSvg = document.getElementById('state-maps');

      for (let village of villages) { // place population dots behind on the DOM
        let populationDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        populationDot.setAttribute('class', 'cityPop');
        populationDot.setAttribute('id', village.id + 'Pop');
        populationDot.setAttribute('cx', village.x + '%');
        populationDot.setAttribute('cy', village.y + '%');
        populationDot.setAttribute('r', 0);
        mapSvg.appendChild(populationDot);
      }
      for (let village of villages) {
        let cityDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        cityDot.setAttribute('class', 'city');
        cityDot.setAttribute('id', village.id);
        cityDot.setAttribute('cx', village.x + '%');
        cityDot.setAttribute('cy', village.y + '%');
        cityDot.setAttribute('r', 0);
        mapSvg.appendChild(cityDot);
      };

      // set up timeline
      timelineSvg = document.getElementById('timeline');

      let height = 1;

      for (let date of dates) {
        let dateLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        dateLabel.setAttributeNS(null, 'id', date.date + "Date");
        if (parseInt(date.date) % 10 == 0) {
          dateLabel.setAttributeNS(null, 'class', "timeline-date");
        } else {
          dateLabel.setAttributeNS(null, 'class', "timeline-date small");
        }
        dateLabel.setAttributeNS(null, 'x', '3.25rem');
        dateLabel.setAttributeNS(null, 'y', (height + 0.1) + 'rem');
        let textNode = document.createTextNode(date.date);
        dateLabel.appendChild(textNode);
        timelineSvg.appendChild(dateLabel);

        let dateTick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        dateTick.setAttribute('id', date.date + "DateTick");
        dateTick.setAttribute('class', "timeline-date-tick");
        dateTick.setAttribute('x1', '3.75rem');
        dateTick.setAttribute('y1', height + 'rem');
        dateTick.setAttribute('x2', '4.25rem');
        dateTick.setAttribute('y2', height + 'rem');
        timelineSvg.appendChild(dateTick);

        if (date.event) {
          let dateEvent = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          dateEvent.setAttributeNS(null, 'id', date.date + "Event");
          dateEvent.setAttributeNS(null, 'class', "timeline-event");
          dateEvent.setAttributeNS(null, 'x', '4.75rem');
          dateEvent.setAttributeNS(null, 'y', (height + 0.1) + 'rem');
          textNode = document.createTextNode(date.event);
          dateEvent.appendChild(textNode);
          timelineSvg.appendChild(dateEvent);
        }

        height += 2;
      }

      $('#timeline').css('height', height + 'rem');

      currDate = dateOffset;
      setDate(currDate, true);
    }
  }

  function setPop(villageId, population, animate) {
    let radius = pxToRem(Math.sqrt(population)) + 'rem';
    if (population == 0 && $('#' + villageId).css('r') != 0 ) {
      if (animate) {
        $('#' + villageId).animate({r: 0}, timeInterval);
      } else {
        $('#' + villageId).css('r', 0);
      }
    } else if (population != 0 & $('#' + villageId).css('r') != 0 ) {
      if (animate) {
        $('#' + villageId).animate({r: '0.25rem'}, timeInterval);
      } else {
        $('#' + villageId).css('r', '0.25rem');
      }
    }
    if (animate) {
      $('#' + villageId + 'Pop').animate({r: radius}, timeInterval);
      $('#' + villageId + 'Pop').css('r', radius);
    } else {
      $('#' + villageId + 'Pop').css('r', radius);
    }
  }

  function setTimeline(date) {
    // $('.timeline-date').removeClass('selected');
    $('.timeline-date-tick').removeClass('selected');
    // $('#' + date + 'Date').addClass('selected');
    $('#' + date + 'DateTick').addClass('selected');
  }

  function setDate(setScroll) {
    for (let id = 1; id <= villages.length; id++) {
      let index = currDate - dateOffset;
      setPop(id, populations[index][id], playing);
    }
    $('#date-ticker').html(currDate);
    setTimeline(currDate);
    if (setScroll) { // set scroll
      $('#sidebar-timeline').animate({ scrollTop: (remToPx(2*(currDate - dateOffset)))}, timeInterval, 'linear');
    }
  }

  function setPlay() {
    playing = true;
    $('#sidebar-timeline').removeClass('scrollable');
    $('#play-button').find('text').html('PAUSE');
    timer = setInterval(incrementDate, timeInterval);
  }

  function setPause() {
    clearInterval(timer);
    $('#sidebar-timeline').addClass('scrollable');
    $('#play-button').find('text').html('PLAY');
    setTimeout(() => {playing = false;}, timeInterval); // prevents date from going backward due to scroll transition
  }

  function setReplay() {
    playing = false;
    clearInterval(timer);
    $('#sidebar-timeline').addClass('scrollable');
    $('#play-button').find('text').html('REPLAY');
    currDate = dateOffset - 1;
  }

  // when click the button
  $('.button-container').on('mousedown', 'svg', function(event) {
    if (playing) { // pause if playing
      setPause();
    } else { // play if paused
      setPlay();
    }
  });

  // increment date
  function incrementDate() {
    if (playing) {
      if (currDate == maxDate) {
        setReplay();
      } else {
        currDate++;
        setDate(true);
      }
    }
  }

  // when paused, scroll sets date
  $('#sidebar-timeline').scroll(function() {
    if (!playing) {
      currDate = Math.round(pxToRem($('#sidebar-timeline').scrollTop())/2 + dateOffset);
      if (currDate > maxDate) {
        currDate = maxDate;
      }
      setDate(false);
      if (currDate == maxDate) { // if date maxed out, button says replay
        setReplay();
      } else {
        $('#play-button').find('text').html('PLAY');
      }
    }
  });

  // ajax requests for data setup

  $.ajax({
    type: 'GET',
    url: 'data/' + populationFile,
    dataType: 'text',
    success: function(data) {
      setUp(data, populationFile);
    }
  });

  $.ajax({
    type: 'GET',
    url: 'data/' + locationFile,
    dataType: 'text',
    success: function(data) {
      setUp(data, locationFile);
    }
  });

  $.ajax({
    type: 'GET',
    url: 'data/' + eventsFile,
    dataType: 'text',
    success: function(data) {
      setUp(data, eventsFile);
    }
  });
});
