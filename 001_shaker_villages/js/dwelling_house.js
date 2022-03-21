$(document).ready(function(){
  let files = 0;
  
  let events = [];
  
  let dayNightAngle = 0;
  let currHour = 0;
  let currMinute = 0;
  
  let minuteIncrement = .2; // increment in 10s of a minute
  let nextHour = 1;
  let nextMinute = 1;
  
  let currIndex = 0;
  
  let dayNightInterval;
  let currFloor = {f: 'exterior', m:'exterior'};
  
  // for regular animations
  let currFrame = 0;
  let animIntervals = [null, null, null, null, null, null, null];
  
  // for walking animations
  let currFrames = [];
  let walkInterval = null;
  let walkerIds = [];


  $.ajax({
    type: 'GET',
    url: 'img/animations/clock.svg',
    dataType: 'text',
    success: function(data) {
      let element = document.getElementById('clock');
      element.innerHTML += data;
      setUp();
    }
  });

  $.ajax({
    type: 'GET',
    url: 'img/animations/dwelling_house_axon.svg',
    dataType: 'text',
    success: function(data) {
      let element = document.getElementById('axon');
      element.innerHTML += data;
      setUp();
    }
  });
  
  $.ajax({
    type: 'GET',
    url: 'data/axon_daily_schedule.csv',
    dataType: 'text',
    success: function(csv) {
      events = $.csv.toArrays(csv);
      setUp();
    }
  });

  function setUp() {
    files++;

    if (files == 3) {
      
      // preloading images
      $('<img src="img/animations/exterior-f"/>');
      $('<img src="img/animations/exterior-m"/>');
      for (let i = 1; i < 4; i++) {
        $('<img src="img/animations/floor-' + i + '-f"/>');
        $('<img src="img/animations/floor-' + i + '-m"/>');
      }
      
      setClockVariables();
      setInterval(runClock, 50);
    }
  }
  
  function setClockVariables() {
    currIndex++;
    if (currIndex >= events.length) {
      currIndex = 1;
    }
    let nextIndex = currIndex + 1;
    if (nextIndex >= events.length) {
      console.log(events[currIndex]);
      nextIndex = 1;
      nextHour = 24;
      nextMinute = 0;
    } else {
      nextHour = parseInt(events[nextIndex][0]);
      nextMinute = parseInt(events[nextIndex][1]);
    }
    let minuteDifference = (nextHour - currHour) * 60 + (nextMinute - currMinute);
    minuteIncrement = minuteDifference/80;
    $('#female-event-label').html(events[currIndex][2]);
    $('#male-event-label').html(events[currIndex][3]);
    let prevIndex = currIndex == 1 ? events.length - 1 : currIndex - 1;
    setAnimation(events[prevIndex][4], events[currIndex][4]);
  }
  
  function setAnimation(prevAnimation, animation) {
    switch(prevAnimation) {
      case 'bellRing':
        clearRingBell();
        break;
      case 'rise':
        clearRise();
        break;
      case 'prayer':
        clearPrayer();
        break;
      case 'doingStuff':
        clearDoingStuff();
        break;
      case 'baking':
        clearBaking();
        break;
      case 'dining':
        clearDining();
        break;
      case 'meeting':
        clearMeeting();
        break;
      case 'sleep':
        clearSleep();
        break;
      case 'transition1':
        clearTransition1();
        break;
      case 'transition2':
        clearTransition2();
        break;
      case 'transition3':
        clearTransition3();
        break;
      case 'transition4':
        clearTransition4();
        break;
      case 'transition5':
        clearTransition5();
        break;
      case 'transition6':
        clearTransition6();
        break;
      case 'transition7':
        clearTransition7();
        break;
      default:
        break;
    }
    switch (animation) {
      case 'bellRing':
        ringBell();
        break;
      case 'rise':
        rise();
        break;
      case 'prayer':
        prayer();
        break;
      case 'doingStuff':
        doingStuff();
        break;
      case 'baking':
        baking();
        break;
      case 'dining':
        dining();
        break;
      case 'exterior':
        exterior();
        break;
      case 'meeting':
        meeting();
        break;
      case 'sleep':
        sleep();
        break;
      case 'transition1':
        transition1();
        break;
      case 'transition2':
        transition2();
        break;
      case 'transition3':
        transition3();
        break;
      case 'transition4':
        transition4();
        break;
      case 'transition5':
        transition5();
        break;
      case 'transition6':
        transition6();
        break;
      case 'transition7':
        transition7();
        break;
      default:
        break;
    }
  }

  function runClock() {
    currMinute = Math.round((currMinute + minuteIncrement) * 100)/100;
    if (currMinute >= 60) {
      currMinute = currMinute % 60;
      currHour = (currHour + 1);
    }
    if (currHour >= nextHour && currMinute >= nextMinute) {
      if (currHour == 24) {
        currHour = 0;
        currMinute = 0;
      } else {
        currHour = nextHour;
        currMinute = nextMinute;
      }
      setClockVariables();
    }
    setClock(currHour, currMinute);
  }

  function setClock(hour, minute) {
    let realHour = hour % 12;
    realHour = (realHour == 0) ? 12 : realHour;
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
      $('#axon-' + gender).find('img').attr('src', './img/animations/' + floor + '-' + gender + '.png');
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
  
  // animation functions

  function rise() {
    setFocus('floor-3', 'm', 'male-bedroom');
    setFocus('floor-3', 'f', 'female-bedroom');
    flipDayNight();
    currFrame = -1;
    animIntervals[0] = setInterval(runAnimation, 150, 'waking,8,8,0');
  }
  
  function clearRise() {
    clearFocus('floor-3', 'm', 'male-bedroom');
    clearFocus('floor-3', 'f', 'female-bedroom');
    $('#waking').children().addClass('hidden');
    clearInterval(animIntervals[0]);
  }
  
  function prayer() {
    setFocus('floor-3', 'm', 'male-bedroom');
    setFocus('floor-3', 'f', 'female-bedroom');
    $('#praying').removeClass('hidden');
  }
  
  function clearPrayer() {
    clearFocus('floor-3', 'm', 'male-bedroom');
    clearFocus('floor-3', 'f', 'female-bedroom');
    $('#praying').addClass('hidden');
  }

  function doingStuff() {
    setFloor('exterior', 'm');
    setFocus('floor-3', 'f', 'male-bedroom');
    currFrame = -1;
    animIntervals[1] = setInterval(runAnimation, 250, 'doing-stuff-f,9,24,1');
  }
  
  function clearDoingStuff() {
    clearFocus('floor-3', 'f', 'male-bedroom');
    $('#doing-stuff-f').children().addClass('hidden');
    clearInterval(animIntervals[1]);
  }

  function exterior() {
    setFloor('exterior', 'm');
    setFloor('exterior', 'f');
  }

  function baking() {
    setFloor('exterior', 'm');
    setFocus('floor-0', 'f', 'bakery');
    currFrame = -1;
    animIntervals[2] = setInterval(runAnimation, 250, 'baking-f,9,24,2');
  }
  
  function clearBaking() {
    clearFocus('floor-0', 'f', 'bakery');
    $('#baking-f').children().addClass('hidden');
    clearInterval(animIntervals[2]);
  }

  function dining() {
    setFocus('floor-0', 'f', 'dining');
    setFocus('floor-0', 'm', 'dining');
    $('#eating').removeClass('hidden');
  }
  
  function clearDining() {
    clearFocus('floor-0', 'f', 'dining');
    clearFocus('floor-0', 'm', 'dining');
    $('#eating').addClass('hidden');
  }

  function meeting() {
    setFocus('floor-2', 'f', 'meeting');
    setFocus('floor-2', 'm', 'meeting');
    $('#sitting').removeClass('hidden');
    currFrame = 0;
    animIntervals[3] = setInterval(runAnimation, 250, 'talking,8,24,3');
  }
  
  function clearMeeting() {
    clearFocus('floor-2', 'f', 'meeting');
    clearFocus('floor-2', 'm', 'meeting');
    clearInterval(animIntervals[3]);
    $('#talking').children().addClass('hidden');
    $('#sitting').addClass('hidden');
  }

  function sleep() {
    setFocus('floor-3', 'm', 'male-bedroom');
    setFocus('floor-3', 'f', 'female-bedroom');
    flipDayNight();
    currFrame = -1;
    animIntervals[4] = setInterval(runAnimationReverse, 150, 'waking,8,8,4');
  }
  
  function clearSleep() {
    clearFocus('floor-3', 'm', 'male-bedroom');
    clearFocus('floor-3', 'f', 'female-bedroom');
    clearInterval(animIntervals[4]);
    $('#waking-0').addClass('hidden');
  }

  function ringBell() {
    setFloor('exterior', 'm');
    setFloor('exterior', 'f');
    $('#bell-rings').removeClass('hidden');
    $('.bell-ring').addClass('ringing');
  }
  
  function clearRingBell() {
    $('#bell-rings').addClass('hidden');
    $('.bell-ring').removeClass('ringing');
  }

  function transition1() {
    setFocus('floor-1', 'm', 'hallway');
    setFocus('floor-3', 'f', 'hallway');
    currFrame = -1;
    $('#walking-forward-right-f-container').attr('mask', 'url(#mask-floor-3-hallway)');
    $('#walking-forward-right-m-container').attr('mask', 'url(#mask-floor-1-hallway)');
    setWalkers('m', 'forward', 'right', 800, 250);
    setWalkers('f', 'forward', 'right', 215, 165);
    walkInterval = setInterval(runWalkingAnimations, 250);
    animIntervals[6] = setInterval(runAnimation, 250, 'elder-wave-m,8,16,6');
  }
  
  function clearTransition1() {
    clearInterval(walkInterval);
    clearInterval(animIntervals[6]);
    currFrames = [];
    walkerIds = [];
    $('#elder-wave-m').children().addClass('hidden');
    $('.walker').children().addClass('hidden');
    clearFocus('floor-3', 'f', 'hallway');
  }

  function transition2() {
    setFloor('exterior', 'm');
    setFocus('floor-2', 'f', 'hallway');
    $('#walking-forward-left-f-container').attr('mask', 'url(#mask-floor-2-hallway)');
    setWalkers('f', 'forward', 'left', 280, 213);
    walkInterval = setInterval(runWalkingAnimations, 250);
  }
  
  function clearTransition2() {
    clearInterval(walkInterval);
    currFrames = [];
    walkerIds = [];
    $('.walker').children().addClass('hidden');
    clearFocus('floor-2', 'f', 'hallway');
  }

  function transition3() {
    setFocus('floor-1', 'm', 'hallway');
    setFocus('floor-0', 'f', 'hallway');
    currFrame = -1;
    $('#walking-back-right-f-container').attr('mask', 'url(#mask-floor-0-hallway)');
    $('#walking-back-left-m-container').attr('mask', 'url(#mask-floor-1-hallway)');
    setWalkers('m', 'back', 'left', 900, 310);
    setWalkers('f', 'back', 'right', 240, 310);
    walkInterval = setInterval(runWalkingAnimations, 250);
    animIntervals[6] = setInterval(runAnimation, 250, 'elder-wave-m,8,16,6');
  }
  
  function clearTransition3() {
    clearInterval(walkInterval);
    clearInterval(animIntervals[6]);
    currFrames = [];
    walkerIds = [];
    $('.walker').children().addClass('hidden');
    $('#elder-wave-m').children().addClass('hidden');
    clearFocus('floor-0', 'f', 'hallway');
    clearFocus('floor-1', 'm', 'hallway');
  }
  
  function transition4() {
    setFocus('floor-1', 'm', 'hallway');
    setFocus('floor-1', 'f', 'hallway');
    currFrame = -1;
    $('#walking-forward-left-f-container').attr('mask', 'url(#mask-floor-1-hallway)');
    $('#walking-forward-left-m-container').attr('mask', 'url(#mask-floor-1-hallway)');
    $('#walking-forward-right-m-container').attr('mask', 'url(#mask-floor-1-hallway)');
    $('#walking-forward-right-f-container').attr('mask', 'url(#mask-floor-1-hallway)');
    setWalkers('m', 'forward', 'right', 780, 240);
    setWalkers('f', 'forward', 'right', 860, 290);
    setWalkers('m', 'forward', 'left', 320, 240);
    setWalkers('f', 'forward', 'left', 230, 290);
    $('#elder-wave-f-0').removeClass('hidden');
    $('#elder-wave-m-0').removeClass('hidden');
    walkInterval = setInterval(runWalkingAnimations, 250);
  }
  
  function clearTransition4() {
    clearInterval(walkInterval);
    clearInterval(animIntervals[5]);
    clearInterval(animIntervals[6]);
    currFrames = [];
    walkerIds = [];
    $('.walker').children().addClass('hidden');
    $('#elder-wave-f').children().addClass('hidden');
    $('#elder-wave-m').children().addClass('hidden');
    clearFocus('floor-1', 'f', 'hallway');
    clearFocus('floor-1', 'm', 'hallway');
  }
  
  function transition5() {
    setFocus('floor-1', 'm', 'hallway');
    setFocus('floor-1', 'f', 'hallway');
    currFrame = -1;
    $('#walking-back-left-f-container').attr('mask', 'url(#mask-floor-1-hallway)');
    $('#walking-back-right-f-container').attr('mask', 'url(#mask-floor-1-hallway)');
    $('#walking-back-left-m-container').attr('mask', 'url(#mask-floor-1-hallway)');
    $('#walking-back-right-m-container').attr('mask', 'url(#mask-floor-1-hallway)');
    setWalkers('m', 'back', 'left', 977, 350);
    setWalkers('f', 'back', 'left', 880, 305);
    setWalkers('m', 'back', 'right', 114, 355);
    setWalkers('f', 'back', 'right', 200, 300);
    $('#elder-wave-f-0').removeClass('hidden');
    $('#elder-wave-m-0').removeClass('hidden');
    walkInterval = setInterval(runWalkingAnimations, 250);
  }
  
  function clearTransition5() {
    clearInterval(animIntervals[5]);
    clearInterval(animIntervals[6]);
    clearInterval(walkInterval);
    currFrames = [];
    walkerIds = [];
    $('.walker').children().addClass('hidden');
    $('#elder-wave-f').children().addClass('hidden');
    $('#elder-wave-m').children().addClass('hidden');
    clearFocus('floor-1', 'm', 'hallway');
    clearFocus('floor-1', 'f', 'hallway');
  }
  
  function transition6() {
    setFocus('floor-3', 'm', 'hallway');
    setFocus('floor-3', 'f', 'hallway');
     $('#walking-back-left-f-container').attr('mask', 'url(#mask-floor-3-hallway)');
    $('#walking-back-right-f-container').attr('mask', 'url(#mask-floor-3-hallway)');
    $('#walking-back-left-m-container').attr('mask', 'url(#mask-floor-3-hallway)');
    $('#walking-back-right-m-container').attr('mask', 'url(#mask-floor-3-hallway)');
    setWalkers('m', 'back', 'right', 160, 260);
    setWalkers('f', 'back', 'right', 150, 245);
    setWalkers('m', 'back', 'left', 940, 245);
    setWalkers('f', 'back', 'left', 920, 253);
    walkInterval = setInterval(runWalkingAnimations, 250);
  }
  
  function clearTransition6() {
    clearInterval(walkInterval);
    currFrames = [];
    walkerIds = [];
    $('.walker').children().addClass('hidden');
    clearFocus('floor-3', 'm', 'hallway');
    clearFocus('floor-3', 'f', 'hallway');
  }
  
  function transition7() {
    setFocus('floor-2', 'm', 'hallway');
    setFocus('floor-2', 'f', 'hallway');
    $('#walking-back-left-f-container').attr('mask', 'url(#mask-floor-2-hallway)');
    $('#walking-back-right-f-container').attr('mask', 'url(#mask-floor-2-hallway)');
    $('#walking-back-left-m-container').attr('mask', 'url(#mask-floor-2-hallway)');
    $('#walking-back-right-m-container').attr('mask', 'url(#mask-floor-2-hallway)');
    setWalkers('m', 'back', 'right', 160, 300);
    setWalkers('f', 'back', 'right', 150, 285);
    setWalkers('m', 'back', 'left', 940, 285);
    setWalkers('f', 'back', 'left', 920, 293);
    walkInterval = setInterval(runWalkingAnimations, 250);
  }
  
  function clearTransition7() {
    clearInterval(walkInterval);
    currFrames = [];
    walkerIds = [];
    $('.walker').children().addClass('hidden');
    clearFocus('floor-2', 'm', 'hallway');
    clearFocus('floor-2', 'f', 'hallway');
  }

  // vars is [animation name],[animation frames],[total frames]
  function runAnimation(vars) {
    let parsedVars = vars.split(',');
    let animation = parsedVars[0];
    let animationFrames = parseInt(parsedVars[1]);
    let totalFrames = parseInt(parsedVars[2]);
    let intervalNum = -1;
    if (parsedVars.length >= 4) {
      intervalNum = parseInt(parsedVars[3]);
    }
    let frame = currFrame;
    $('#' + animation + '-' + currFrame%animationFrames).addClass('hidden');
    currFrame++;
    $('#' + animation + '-' + currFrame%animationFrames).removeClass('hidden');
    if (currFrame + 1 == totalFrames) {
      clearInterval(animIntervals[intervalNum]);
    }
  }

  function runAnimationReverse(vars) {
    let parsedVars = vars.split(',');
    let animation = parsedVars[0];
    let animationFrames = parseInt(parsedVars[1]);
    let totalFrames = parseInt(parsedVars[2]);
    let intervalNum = -1;
    if (parsedVars.length == 4) {
      intervalNum = parseInt(parsedVars[3]);
    }
    $('#' + animation + '-' + Math.abs(animationFrames - 1 - (currFrame%animationFrames))).addClass('hidden');
    currFrame++;
    $('#' + animation + '-' + Math.abs(animationFrames - 1 - (currFrame%animationFrames))).removeClass('hidden');
    if (currFrame + 1 == totalFrames) {
      clearInterval(animIntervals[intervalNum]);
    }
  }

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
    if(event.key == '1') {
      transition1();
    } else if (event.key == '2') {
      transition2();
    } else if (event.key == '3') {
      transition3();
    } else if (event.key == '4') {
      transition4();
    } else if (event.key == '5') {
      transition5();
    } else if (event.key == '6') {
      transition6();
    } else if (event.key == '7') {
      transition7();
    } else if (event.key == '8') {
      rise();
    } else if (event.key == '9') {
      dining();
    } else if (event.key == '0') {
      meeting();
    } else if (event.key == 'q') {
      baking();
    } else if (event.key == 'w') {
      sleep();
    } else if (event.key == 'e') {
      prayer();
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
