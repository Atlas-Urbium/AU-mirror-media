$(document).ready(function(){
  let files = 0;
  let dayNightAngle = 0;
  let currHour = 0;
  let currMinute = 0;
  let dayNightInterval;
  let currFloor = {f: 'exterior', m:'exterior'};


  $.ajax({
    type: 'GET',
    url: 'img/animations/clock.svg',
    dataType: 'text',
    success: function(data) {
      setUp(data, 'clock');
    }
  });

  $.ajax({
    type: 'GET',
    url: 'img/animations/dwelling_house_axon.svg',
    dataType: 'text',
    success: function(data) {
      setUp(data, 'axon');
    }
  });

  function setUp(data, id) {
    files++;
    let element = document.getElementById(id);
    element.innerHTML += data;

    if (files == 2) {
      setInterval(runClock, 50);
    }
  }

  function runClock() {
    currMinute += 0.2;
    if (currMinute < 60.1 && currMinute > 59.9) {
      currMinute = 0;
      currHour++;
      currHour = currHour % 12;
      flipDayNight();
    }
    setClock(currHour, currMinute);
  }

  function setClock(hour, minute) {
    let realHour = (hour == 0) ? 12 : hour;
    let integerMinute = Math.floor(minute);
    let formattedTime = (realHour < 10) ? '0' + realHour + ':' : realHour + ":";
    formattedTime += (integerMinute < 10) ? '0' + integerMinute : integerMinute;
    $('#time').html(formattedTime);
    let hourRotate = Math.round((30 * hour + 0.5 * minute)*10)/10;
    let minuteRotate = 6 * minute;
    $("#hour-hand").attr("transform", "rotate("+hourRotate+" 100.1 42.9)");
    $("#minute-hand").attr("transform", "rotate("+minuteRotate+" 100.1 42.9)");
  }

  function flipDayNight() {
    dayNightInterval = setInterval(rotateDayNight, 15);
  }

  function rotateDayNight() {
    dayNightAngle += 4;
    let rotate = "rotate(" + dayNightAngle + "deg)";
    $("#day-night").css({
      "-webkit-transform" : rotate,
      "transform" : rotate,
      "transform-box": 'fill-box',
      "-webkit-transform-origin" : '50% 50%',
      "transform-origin" : '50% 50%'
    });
    if (dayNightAngle == 360) {
      dayNightAngle = 0;
      clearInterval(dayNightInterval);
    } else if (dayNightAngle == 180) {
      clearInterval(dayNightInterval);
    }
  }

  function setFloor(floor, gender) {
    if (currFloor[gender] != floor) {
      $('#' + currFloor[gender] + '-' + gender).addClass('hidden');
      $('#' + floor + '-' + gender).removeClass('hidden');
      currFloor[gender] = floor;
    }
  }

  function setFocus(floor, gender, room) {
    setFloor(floor, gender);
    let color = (gender == 'f') ? purpleLight : blueLight;
    $('#cut-' + floor + '-' + gender + '-' + room).css({'stroke-width': '.8px', 'stroke': color});
  }

  function clearFocus(floor, gender, room) {
    $('#cut-' + floor + '-' + gender + '-' + room).css({'stroke-width': '.35px', 'stroke': offWhite});
  }

  let currFrame = 0;
  let animInterval;
  let animTimer;
  let currFrames = [];
  let walkerIds = [];

  function rise() {
    setFocus('floor-3', 'm', 'male-bedroom');
    setFocus('floor-3', 'f', 'female-bedroom');
    currFrame = -1;
    animInterval = setInterval(runAnimation, 150, 'waking,8,8');
  }

  function prayer() {
    setFocus('floor-3', 'm', 'male-bedroom');
    setFocus('floor-3', 'f', 'female-bedroom');
    $('#praying').removeClass('hidden');
  }

  function doingStuff() {
    setFloor('exterior', 'm');
    setFocus('floor-3', 'f', 'male-bedroom');
    currFrame = -1;
    animInterval = setInterval(runAnimation, 250, 'doing-stuff-f,9,24');
  }

  function exterior() {
    setFloor('exterior', 'm');
    setFloor('exterior', 'f');
  }

  function baking() {
    setFloor('exterior', 'm');
    setFocus('floor-0', 'f', 'bakery');
    currFrame = -1;
    animInterval = setInterval(runAnimation, 250, 'baking-f,9,24');
    animTimer = setTimeout(function() {
      clearFocus('floor-0', 'f', 'bakery');
      clearInterval(animInterval);
      $('#baking-f').children().addClass('hidden');
      clearTimeout(animTimer);
    }, 5000);
  }

  function dining() {
    setFocus('floor-0', 'f', 'dining');
    setFocus('floor-0', 'm', 'dining');
    $('#eating').removeClass('hidden');
    animTimer = setTimeout(function() {
      clearFocus('floor-0', 'f', 'dining');
      clearFocus('floor-0', 'm', 'dining');
      $('#eating').addClass('hidden');
      clearTimeout(animTimer);
    }, 10000);
  }

  function meeting() {
    setFocus('floor-2', 'f', 'meeting');
    setFocus('floor-2', 'm', 'meeting');
    $('#sitting').removeClass('hidden');
    currFrame = 0;
    animInterval = setInterval(runAnimation, 250, 'talking,8,24');
    animTimer = setTimeout(function() {
      clearFocus('floor-2', 'f', 'meeting');
      clearFocus('floor-2', 'm', 'meeting');
      clearInterval(animInterval);
      $('#talking').children().addClass('hidden');
      $('#sitting').addClass('hidden');
      clearTimeout(animTimer);
    }, 5000);
  }

  function sleep() {
    setFocus('floor-3', 'm', 'male-bedroom');
    setFocus('floor-3', 'f', 'female-bedroom');
    currFrame = -1;
    animInterval = setInterval(runAnimationReverse, 150, 'waking,8,8');
    animTimer = setTimeout(function() {
      clearFocus('floor-3', 'm', 'male-bedroom');
      clearFocus('floor-3', 'f', 'female-bedroom');
      clearInterval(animInterval);
      $('#waking-0').addClass('hidden');
      clearTimeout(animTimer);
    }, 10000);
  }

  function ringBell() {
    setFloor('exterior', 'm');
    setFloor('exterior', 'f');
    $('#bell-rings').removeClass('hidden');
    $('.bell-ring').addClass('ringing');
    animTimer = setTimeout(function() {
      $('#bell-rings').addClass('hidden');
      $('.bell-ring').removeClass('ringing');
      clearTimeout(animTimer);
    }, 5000);
  }

  function transition1() {
    setFloor('exterior', 'm');
    setFocus('floor-3', 'f', 'hallway');
    $('#walking-forward-right-f-container').attr('mask', 'url(#mask-floor-3-hallway)');
    setWalkers('m', 'forward', 'right', 1040, 420);
    setWalkers('f', 'forward', 'right', 215, 165);
    animInterval = setInterval(runWalkingAnimations, 250);
    animTimer = setTimeout(function() {
      clearInterval(animInterval);
      $('.walker').children().addClass('hidden');
      clearFocus('floor-3', 'f', 'hallway');
      clearTimeout(animTimer);
    }, 5000);
  }

  function transition2() {
    setFloor('exterior', 'm');
    setFocus('floor-2', 'f', 'hallway');
    $('#walking-forward-left-f-container').attr('mask', 'url(#mask-floor-2-hallway)');
    setWalkers('f', 'forward', 'left', 280, 213);
    animInterval = setInterval(runWalkingAnimations, 250);
    animTimer = setTimeout(function() {
      clearInterval(animInterval);
      $('.walker').children().addClass('hidden');
      clearFocus('floor-2', 'f', 'hallway');
      clearTimeout(animTimer);
    }, 5000);
  }

  // vars is [animation name],[animation frames],[total frames]
  function runAnimation(vars) {
    let parsedVars = vars.split(',');
    let animation = parsedVars[0];
    let animationFrames = parseInt(parsedVars[1]);
    let totalFrames = parseInt(parsedVars[2]);
    $('#' + animation + '-' + currFrame%animationFrames).addClass('hidden');
    currFrame++;
    $('#' + animation + '-' + currFrame%animationFrames).removeClass('hidden');
    if (currFrame + 1 == totalFrames) {
      clearInterval(animInterval);
    }
  }

  function runAnimationReverse(vars) {
    let parsedVars = vars.split(',');
    let animation = parsedVars[0];
    let animationFrames = parseInt(parsedVars[1]);
    let totalFrames = parseInt(parsedVars[2]);
    $('#' + animation + '-' + Math.abs(animationFrames - 1 - (currFrame%animationFrames))).addClass('hidden');
    currFrame++;
    $('#' + animation + '-' + Math.abs(animationFrames - 1 - (currFrame%animationFrames))).removeClass('hidden');
    if (currFrame + 1 == totalFrames) {
      clearInterval(animInterval);
    }
  }

  // vars is [animation name],[animation frames],[total frames]
  function runWalkingAnimations() {
    for (let i = 0; i < walkerIds.length; i++) {
      $('#' + walkerIds[i] + '-' + currFrames[i]).addClass('hidden');
      currFrames[i]++;
      if (currFrames[i] > 7) {
        currFrames[i] = 0;
      }
      $('#' + walkerIds[i] + '-' + currFrames[i]).removeClass('hidden');
    }
  }

  $(document).keypress(function(event) {
    if(event.which == 49) {
      transition1();
    } else if (event.which == 50) {
      transition2();
    } else if (event.which == 51) {
      baking();
    } else if (event.which == 52) {
      dining();
    } else if (event.which == 53) {
      meeting();
    } else if (event.which == 54) {
      sleep();
    }
  });

  /// walking direction, startX, startY
  function setWalkers(gender, fb, lr, startX, startY) {
    for (let i = 1; i < 5; i++) {
      let walkerId = 'walking-' + fb + '-' + lr + '-' + gender + i;
      currFrames.push(Math.floor(Math.random() * 8));
      walkerIds.push(walkerId);
      let tX = (lr == 'left') ? -17.32 : 17.32;
      let tY = (fb == 'back') ? -10 : 10;
      $('#' + walkerId).attr('transform', 'translate(' + (i*tX + 14*Math.random()) + ' ' + (i*tY + 5*Math.random()) + ')');
    }
    let animation = $('#animate-walking-' + fb + '-' + lr + '-' + gender);
    let toX = (lr == 'left') ? startX - 25.98 : startX + 25.98;
    let toY = (fb == 'back') ? startY - 15 : startY + 15;
    animation.attr('from', startX + ' ' + startY);
    animation.attr('to', toX + ' ' + toY);
    animation.attr('dur', '5s');
    animation[0].beginElement();
  }
});
