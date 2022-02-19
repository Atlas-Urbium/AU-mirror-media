let files = 0;

$(document).ready(function(){

  // for the 2 intervals running on text and animation
  let textInterval;
  let textTime = 0;
  let dotInterval;
  let dotTime = 0;

  // for the timeout ids used to set the order of animations
  let timeouts = [];

  // default time interval
  let timeInterval = 25;

  //
  let paths = [];
  let offsets = [];
  let totalLengths = [];
  let shakers = [];

  let allShakers = [];
  let dancingShakers = [];
  let seatedShakers = [];
  let spectators = [];

  let stopTime = 0;

  let currFloor = 1;
  let labelsShown = true;

  let planSvg;

  $('#floor-1-button').addClass('on');
  $('#floor-1-button').find('h4').css('color', activeColor);
  $('#floor-1-button').find('p').css('color', activeColor);


  $.ajax({
    type: 'GET',
    url: 'img/meetinghouse.svg',
    dataType: 'text',
    success: function(data) {
      setUp(data);
    }
  });

  function setUp(data) {
    files++;
    if (files == 1) { // if all files have been processed
      let element = document.getElementById('meetinghouse');
      element.innerHTML += data;

      $('#line-dance').addClass('transparent');
      $('#circle-dance').addClass('transparent');
      $('#service').addClass('transparent');
      $('#procession').addClass('transparent');
      $('#second-floor-paths').addClass('hidden transparent');
      $('#third-floor-paths').addClass('hidden transparent');
      $('#floor-3').addClass('hidden');
      $('#floor-2').addClass('hidden');
      $('#floor-3-lights').css('opacity', 0);
      $('#floor-2-lights').css('opacity', 0);
      $('#benches-away').addClass('transparent');

      planSvg = document.getElementById('meetinghouse');

      for (let i = 1; i < 17; i++) {
        let maleDot =  document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        maleDot.setAttribute('id', 'm' + i);
        maleDot.setAttribute('class', 'man dot transparent');
        planSvg.appendChild(maleDot);
        allShakers.push('m' + i);
        if (i > 14) {
          seatedShakers.push('m' + i);
          $('#s-m' + i).addClass('dot man transparent');
        } else {
          dancingShakers.push('m' + i);
        }
      }

      for (let i = 1; i < 19; i++) {
        let femaleDot =  document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        femaleDot.setAttribute('id', 'f' + i);
        femaleDot.setAttribute('class', 'woman dot transparent');
        planSvg.appendChild(femaleDot);
        allShakers.push('f' + i);
        if (i > 15) {
          seatedShakers.push('f' + i);
          $('#s-f' + i).addClass('dot woman transparent');
        } else {
          dancingShakers.push('f' + i);
        }
      }

      for (let i = 1; i < 10; i++) {
        spectators.push('s' + i);
        $('#s-s' + i).addClass('dot spectator transparent');
      }
    }

    let label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttributeNS(null, 'id', 'labelText');
    label.setAttributeNS(null, 'class', 'transparent');
    label.setAttributeNS(null, 'x', '32.5%');
    label.setAttributeNS(null, 'y', '28%');
    planSvg.appendChild(label);

    runGroundFloorAnimations();

  }

  function runGroundFloorAnimations() {
    timeouts.push(setTimeout(addDots, 1000));
    addPaths(1);
    setBenches('out');
    timeouts.push(setTimeout(setLabelText, 100, 'A procession begins the service'));
    timeouts.push(setTimeout(procession, 4000));
    timeouts.push(setTimeout(service1, 29000));
    timeouts.push(setTimeout(setLabelText, 32600, 'The female elder speaks'));
    timeouts.push(setTimeout(service2, 36100));
    timeouts.push(setTimeout(service3, 40100));
    timeouts.push(setTimeout(setLabelText, 43700, 'The male elder speaks'));
    timeouts.push(setTimeout(service4, 47600));
    timeouts.push(setTimeout(hideDots, 51700));
    timeouts.push(setTimeout(setLabelText, 52000, 'Dance 1.'));
    timeouts.push(setTimeout(lineDance, 56200));
    timeouts.push(setTimeout(setBenches, 56200, 'aside'));
    timeouts.push(setTimeout(hideDots, 64000));
    timeouts.push(setTimeout(setLabelText, 66000, 'Dance 2.'));
    timeouts.push(setTimeout(setBenches, 70200, 'aside'));
    timeouts.push(setTimeout(circleDance, 70200));
    timeouts.push(setTimeout(hideDots, 78200));
    timeouts.push(setTimeout(showPaths, 80200, '1'));
    timeouts.push(setTimeout(hidePaths, 86200, '1'));
    timeouts.push(setTimeout(resetGroundFloorAnimations, 88200));

  }

  function resetGroundFloorAnimations() {
    stopAnimations();
    runGroundFloorAnimations();
  }

  function runSecondFloorAnimations() {
    addPaths(2);
    timeouts.push(setTimeout(addDots, 1000));
    timeouts.push(setTimeout(toSittingRoom, 1050));
    timeouts.push(setTimeout(toBed, 14000));
    timeouts.push(setTimeout(hideDots, 22000));
    timeouts.push(setTimeout(showPaths, 24000, '2'));
  }

  function resetSecondFloorAnimations() {
    stopAnimations();
    runSecondFloorAnimations();
  }

  function runThirdFloorAnimations() {
    timeouts.push(setTimeout(addDots, 1000));
    addPaths(3);
    timeouts.push(setTimeout(toDesk, 1000));
    timeouts.push(setTimeout(hideDots, 10000));
    timeouts.push(setTimeout(showPaths, 12000, '3'));
  }

  function resetThirdFloorAnimations() {
    stopAnimations();
    runThirdFloorAnimations();
  }

  function stopAnimations() {
    clearAnimations();
    for (timeout of timeouts) {
      clearTimeout(timeout);
    }
    timeouts = [];
    clearInterval(dotInterval);
    clearInterval(textInterval);
  }

  // SET PLAN

  function setPlan(floor) {
    $('#floor-' + currFloor).addClass('hidden');
    $('#floor-' + floor).removeClass('hidden');
    $('#floor-' + currFloor + '-lights').animate({opacity: 0}, 250, function(){
      $('#floor-' + floor + '-lights').animate({opacity: 1}, 250);
    });
    if (floor == 1) {
      $('#plan-title').find('h5').html('GROUND FLOOR PLAN');
      resetGroundFloorAnimations();
    } else if (floor == 2) {
      $('#plan-title').find('h5').html('SECOND FLOOR PLAN');
      resetSecondFloorAnimations();
    } else if (floor == 3) {
      $('#plan-title').find('h5').html('THIRD FLOOR PLAN');
      resetThirdFloorAnimations();
    }
    currFloor = floor;
  }

  // FIRST FLOOR ANIMATIONS

  function procession() {
    showSpectators();

    let movementOffsets = [-40];
    for (let i = 0; i < 15; i++) { movementOffsets.push(-40 * i); }
    movementOffsets.push(0);
    for (let i = 0; i < 17; i++) { movementOffsets.push(-40 * i); }

    setUpAnimation(allShakers, movementOffsets, 'p');
    dotInterval = setInterval(animateDots, timeInterval);
  }

  function service1() {
    showSpectators();
    setUpAnimation(['f1'], [0], 's1');
    dotInterval = setInterval(animateDots, timeInterval);
  }

  function service2() {
    showSpectators();
    setUpAnimation(['f1'], [0], 's2');
    dotInterval = setInterval(animateDots, timeInterval);
  }

  function service3() {
    showSpectators();
    setUpAnimation(['m1'], [0], 's3');
    dotInterval = setInterval(animateDots, timeInterval);
  }

  function service4() {
    showSpectators();
    setUpAnimation(['m1'], [0], 's4');
    dotInterval = setInterval(animateDots, timeInterval);
  }

  function lineDance() {
    showSpectators();
    movementOffsets = [];
    for (let i = 0; i < dancingShakers.length; i++) {
      movementOffsets.push(0);
      if ($('#' + dancingShakers[i]).hasClass('transparent')) {
        $('#' + dancingShakers[i]).removeClass('transparent');
      }
    }
    setUpAnimation(dancingShakers, movementOffsets, 'l');
    stopTime = arrayMax(totalLengths)*15;
    dotInterval = setInterval(animateLineDance, timeInterval);
  }

  function circleDance() {
    showSpectators();
    setUpLoopingAnimation(dancingShakers, 'c', 0.25);
    dotInterval = setInterval(animateCircleDance, timeInterval);
  }

  // SECOND-FLOOR ANIMATIONS

  function toSittingRoom() {
    setUpAnimation(['f1', 'f2', 'm1', 'm2'], [0, -40, -90, -130], '_2');
    dotInterval = setInterval(animateDots, timeInterval);
  }

  function toBed() {
    setUpAnimation(['f1', 'f2', 'm1', 'm2'], [0, -20, 3, -25], '_22');
    dotInterval = setInterval(animateDots, timeInterval);
  }

  // THIRD FLOOR ANIMATIONS

  function toDesk() {
    setUpAnimation(['f1', 'f2', 'm1', 'm2'], [0, -40, -100, -140], '_3');
    dotInterval = setInterval(animateDots, timeInterval);
  }

  // ANIMATION SETUP FUNCTIONS

  function setUpAnimation(movingShakers, movementOffsets, pathName) {
    paths = [];
    totalLengths = [];
    shakers = movingShakers;
    offsets = movementOffsets;
    dotTime = 0;

    for (shaker of movingShakers) {
      let shakerPath = document.querySelector('#' + pathName + '-' + shaker);
      paths.push(shakerPath);
      totalLengths.push(shakerPath.getTotalLength());
      let coordinate = shakerPath.getPointAtLength(0);
      $('#' + shaker).attr('cx', toRatio(coordinate.x, 'x') + '%');
      $('#' + shaker).attr('cy', toRatio(coordinate.y, 'y') + '%');
    }

    let totalTimes = [];
    for(let i = 0; i < totalLengths.length; i++) {
      totalTimes.push(totalLengths[i] - offsets[i]);
    }
    stopTime = arrayMax(totalTimes);
  }

  function setUpLoopingAnimation(movingShakers, pathName, numLoops) {
    paths = [];
    shakers = movingShakers;
    offsets = []
    dotTime = 0;
    let shakerPathMen = document.querySelector('#' + pathName + '-m');
    let shakerPathWomen = document.querySelector('#' + pathName + '-f');
    paths.push(shakerPathMen);
    paths.push(shakerPathWomen);
    totalLengths = [shakerPathMen.getTotalLength(), shakerPathWomen.getTotalLength()];
    for (let i = 0; i < shakers.length; i++) {
      let gender = shakers[i].substring(0,1);
      let numShakers = gender == 'm' ? 14 : 15;
      let offsetNum = gender == 'm' ? i : i - 14;
      let totalLength = gender == 'm' ? totalLengths[0] : totalLengths[1];
      let shakerPath = gender == 'm' ? shakerPathMen : shakerPathWomen;
      offsets.push(totalLength/numShakers * offsetNum);
      let coordinate = shakerPath.getPointAtLength(offsets[i]);
      $('#' + shakers[i]).attr('cx', toRatio(coordinate.x, 'x') + '%');
      $('#' + shakers[i]).attr('cy', toRatio(coordinate.y, 'y') + '%');
      if ($('#' + shakers[i]).hasClass('transparent')) {
        $('#' + shakers[i]).removeClass('transparent');
      }
    }

    stopTime = arrayMax(totalLengths)*numLoops*3;
  }

  // ANIMATION FUNCTIONS

  function animateDots() {
    if (dotTime > stopTime) {
      clearInterval(dotInterval);
    };
    for (let i = 0; i < shakers.length; i++) {
      let length = offsets[i] + dotTime;
      if (length >= 0 && length < totalLengths[i]) {
        if ($('#' + shakers[i]).hasClass('transparent')) {
          $('#' + shakers[i]).removeClass('transparent');
        }
        let coordinate = paths[i].getPointAtLength(length);
        $('#' + shakers[i]).attr('cx', toRatio(coordinate.x, 'x') + '%');
        $('#' + shakers[i]).attr('cy', toRatio(coordinate.y, 'y') + '%');
      }
    }
    dotTime++;
  }

  function animateLineDance() {
    if (dotTime > stopTime) {
      clearInterval(dotInterval);
    }
    for (let i = 0; i < shakers.length; i++) {
      let length = (1 - Math.cos(dotTime/40)) * totalLengths[i]/2;
      let coordinate = paths[i].getPointAtLength(length);
      $('#' + shakers[i]).attr('cx', toRatio(coordinate.x, 'x') + '%');
      $('#' + shakers[i]).attr('cy', toRatio(coordinate.y, 'y') + '%');
    }
    dotTime++;
  }

  function animateCircleDance() {
    if (dotTime > stopTime) {
      clearInterval(dotInterval);
    };
    for (let i = 0; i < shakers.length; i++) {
      let gender = shakers[i].substring(0,1) == 'm' ? 0 : 1;
      let length = (offsets[i] + dotTime/3) % totalLengths[gender];
      let coordinate = paths[gender].getPointAtLength(length);
      $('#' + shakers[i]).attr('cx', toRatio(coordinate.x, 'x') + '%');
      $('#' + shakers[i]).attr('cy', toRatio(coordinate.y, 'y') + '%');
    }
    dotTime++;
  }

  function clearAnimations() {
    clearDots();
    clearLabelText();
    clearPaths(currFloor);
  }

  // SHOW/HIDE SPECTATORS ON FIRST FLOOR

  function showSpectators() {
    for (spectator of spectators) {
      if ($('#s-' + spectator).hasClass('transparent')) {
        $('#s-' + spectator).removeClass('transparent');
      }
    }
  }

  function hideSpectators() {
    for (spectator of spectators) {
      if (!$('#s-' + spectator).hasClass('transparent')) {
        $('#s-' + spectator).addClass('transparent');
      }
    }
  }

  // MOVE BENCHES ON FIRST FLOOR

  function setBenches(options) {
    switch (options) {
      case 'out':
        if ($('#benches').hasClass('transparent')) {
          $('#benches').removeClass('transparent');
        }
        if (!$('#benches-away').hasClass('transparent')) {
          $('#benches-away').addClass('transparent');
        }
        for (seatedShaker of seatedShakers) {
          if (!$('#s-' + seatedShaker).hasClass('transparent')) {
            $('#s-' + seatedShaker).addClass('transparent');
          }
        }
        break;
      case 'aside':
        if ($('#benches-away').hasClass('transparent')) {
          $('#benches-away').removeClass('transparent');
        }
        if (!$('#benches').hasClass('transparent')) {
          $('#benches').addClass('transparent');
        }
        for (seatedShaker of seatedShakers) {
          if ($('#s-' + seatedShaker).hasClass('transparent')) {
            $('#s-' + seatedShaker).removeClass('transparent');
          }
        }
        break;
      default:
        console.log('out or aside are the only valid values');
    }
  }

  // SHOW/HIDE PATHS

  function showPaths(floor) {
    if (floor == 1) {
      if ($('#line-dance').hasClass('transparent')) {
        $('#line-dance').removeClass('transparent');
      }
      if ($('#circle-dance').hasClass('transparent')) {
        $('#circle-dance').removeClass('transparent');
      }
      if ($('#service').hasClass('transparent')) {
        $('#service').removeClass('transparent');
      }
      if ($('#procession').hasClass('transparent')) {
        $('#procession').removeClass('transparent');
      }
    } else if (floor == 2) {
      if ($('#second-floor-paths').hasClass('transparent')) {
        $('#second-floor-paths').removeClass('transparent');
      }
    } else if (floor == 3) {
      if ($('#third-floor-paths').hasClass('transparent')) {
        $('#third-floor-paths').removeClass('transparent');
      }
    }
  }

  function hidePaths(floor) {
    if (floor == 1) {
      if (!$('#line-dance').hasClass('transparent')) {
        $('#line-dance').addClass('transparent');
      }
      if (!$('#circle-dance').hasClass('transparent')) {
        $('#circle-dance').addClass('transparent');
      }
      if (!$('#service').hasClass('transparent')) {
        $('#service').addClass('transparent');
      }
      if (!$('#procession').hasClass('transparent')) {
        $('#procession').addClass('transparent');
      }
    } else if (floor == 2) {
      if (!$('#second-floor-paths').hasClass('transparent')) {
        $('#second-floor-paths').addClass('transparent');
      }
    } else if (floor == 3) {
      if (!$('#third-floor-paths').hasClass('transparent')) {
        $('#third-floor-paths').addClass('transparent');
      }
    }
  }

  function clearPaths(floor) {
    if (floor == 1) {
      if (!$('#line-dance').hasClass('hidden')) {
        $('#line-dance').addClass('hidden');
      }
      if (!$('#circle-dance').hasClass('hidden')) {
        $('#circle-dance').addClass('hidden');
      }
      if (!$('#service').hasClass('hidden')) {
        $('#service').addClass('hidden');
      }
      if (!$('#procession').hasClass('hidden')) {
        $('#procession').addClass('hidden');
      }
    } else if (floor == 2) {
      if (!$('#second-floor-paths').hasClass('hidden')) {
        $('#second-floor-paths').addClass('hidden');
      }
    } else if (floor == 3) {
      if (!$('#third-floor-paths').hasClass('hidden')) {
        $('#third-floor-paths').addClass('hidden');
      }
    }
    hidePaths(floor);
  }

  function addPaths(floor) {
    if (floor == 1) {
      if ($('#line-dance').hasClass('hidden')) {
        $('#line-dance').removeClass('hidden');
      }
      if ($('#circle-dance').hasClass('hidden')) {
        $('#circle-dance').removeClass('hidden');
      }
      if ($('#service').hasClass('hidden')) {
        $('#service').removeClass('hidden');
      }
      if ($('#procession').hasClass('hidden')) {
        $('#procession').removeClass('hidden');
      }
    } else if (floor == 2) {
      if ($('#second-floor-paths').hasClass('hidden')) {
        $('#second-floor-paths').removeClass('hidden');
      }
    } else if (floor == 3) {
      if ($('#third-floor-paths').hasClass('hidden')) {
        $('#third-floor-paths').removeClass('hidden');
      }
    }
  }

  // SHOW/HIDE DOTS

  function hideDots() {
    for (shaker of allShakers) {
      if (!$('#' + shaker).hasClass('transparent')) {
        $('#' + shaker).addClass('transparent');
      }
    }
    for (spectator of spectators) {
      if (!$('#s-' + spectator).hasClass('transparent')) {
        $('#s-' + spectator).addClass('transparent');
      }
    }
    for (seatedShaker of seatedShakers) {
      if (!$('#s-' + seatedShaker).hasClass('transparent')) {
        $('#s-' + seatedShaker).addClass('transparent');
      }
    }
  }

  function clearDots() {
    for (shaker of allShakers) {
      if (!$('#' + shaker).hasClass('hidden')) {
        $('#' + shaker).addClass('hidden');
      }
    }
    hideDots();
  }

  function addDots() {
    for (shaker of allShakers) {
      if ($('#' + shaker).hasClass('hidden')) {
        $('#' + shaker).removeClass('hidden');
      }
    }
  }

  // LABEL SETTING

  function setLabelText(text) {
    if ($('#labelText').hasClass('hidden')) {
      $('#labelText').removeClass('hidden');
    }
    $('#labelText').html(text);
    textTime = 0;
    textInterval = setInterval(textTimer, 500);
  }

  function textTimer() {
    textTime++;
    if (textTime == 1) {
      showLabelText();
    } else if (textTime == 6) {
      hideLabelText();
      clearInterval(textInterval);
    }
  }

  function showLabelText() {
    if ($('#labelText').hasClass('transparent')) {
      $('#labelText').removeClass('transparent');
    }
  }

  function hideLabelText() {
    if (!$('#labelText').hasClass('transparent')) {
      $('#labelText').addClass('transparent');
    }
  }

  function clearLabelText() {
    if (!$('#labelText').hasClass('hidden')) {
      $('#labelText').addClass('hidden');
    }
    hideLabelText();
  }

  // HELPER FUNCTIONS

  function arrayMax(arr) {
    let len = arr.length, max = -Infinity;
    while (len--) {
      if (arr[len] > max) {
        max = arr[len];
      }
    }
    return max;
  };

  // returns x and y for the meetinghouse svg as a percent
  function toRatio(px, dim) {
    let width = remToPx(46);
    let height = remToPx(62);
    let r = (dim == 'x') ? 100 * px / width : 100 * px / height;
    return r;
  }

  document.addEventListener('visibilitychange', function() {
    if(document.hidden) {
        stopAnimations();
    } else {
      if (3 == currFloor) {
        setPlan('3');
      } else if (2 == currFloor) {
        setPlan('2');
      } else if (1 == currFloor) {
        setPlan('1');
      }
    }
});

  $('.text-button').on('mousedown', function(event) {
    let buttonId = $(this).attr('id');
    if (buttonId == 'floor-3-button') {
      if (3 != currFloor) {
        setPlan('3');
      }
    } else if (buttonId == 'floor-2-button') {
      if (2 != currFloor) {
        setPlan('2');
      }
    } else if (buttonId == 'floor-1-button') {
      if (1 != currFloor) {
        setPlan('1');
      }
    }
  });
});
