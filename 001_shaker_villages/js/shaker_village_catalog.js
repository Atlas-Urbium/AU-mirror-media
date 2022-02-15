$(document).ready(function(){

  let villages;
  let bishoprics;
  let files = 0;
  let svg;
  let activeVillageId = 2;
  let blockSize = 'large'

  function setUpCities (csv, csvName) {
    if (csvName == "village_data") {
      villages = $.csv.toObjects(csv);
    } else if (csvName == "bishopric_data") {
      bishoprics = $.csv.toArrays(csv);
    }
    svg = document.getElementById('us-coast-map');

    files++;
    if (files == 2) {
      for (let village of villages) {
        let highlightDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        highlightDot.setAttribute('class', 'cityHighlight');
        highlightDot.setAttribute('id', village.id + 'Highlight');
        highlightDot.setAttribute('cx', village.x + '%');
        highlightDot.setAttribute('cy', village.y + '%');
        svg.appendChild(highlightDot);
      }

      for (let village of villages) {
        if (village.name == village.bishopric) {  // draw a ring around a bishopric seat
          let seatCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          seatCircle.setAttribute('class', 'cityCircle');
          seatCircle.setAttribute('id', village.id + 'CityCircle');
          seatCircle.setAttribute('cx', village.x + '%');
          seatCircle.setAttribute('cy', village.y + '%');
          svg.appendChild(seatCircle);
        }
        let cityDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        cityDot.setAttribute('class', 'city');
        cityDot.setAttribute('id', village.id + 'City');
        cityDot.setAttribute('cx', village.x + '%');
        cityDot.setAttribute('cy', village.y + '%');
        svg.appendChild(cityDot);
      };

      for (let village of villages) {
        let buttonDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        buttonDot.setAttribute('class', 'cityButton');
        buttonDot.setAttribute('id', village.id);
        buttonDot.setAttribute('cx', village.x + '%');
        buttonDot.setAttribute('cy', village.y + '%');
        svg.appendChild(buttonDot);
      }

      addFamilyCircles();

      // add bishopric circle
      let bishopricSvg = document.getElementById('bishopricKey');
      let bishopricDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      bishopricDot.setAttribute('class', 'city');
      bishopricDot.setAttribute('id', 'bishopricKeyDot');
      bishopricDot.setAttribute('cx', '50%');
      bishopricDot.setAttribute('cy', '50%');
      bishopricSvg.insertBefore(bishopricDot, bishopricSvg.childNodes[0]);

      let bishopricCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      bishopricCircle.setAttribute('class', 'cityCircle');
      bishopricCircle.setAttribute('id', 'bishopricKeyCircle');
      bishopricCircle.setAttribute('cx', '50%');
      bishopricCircle.setAttribute('cy', '50%');
      bishopricSvg.insertBefore(bishopricCircle, bishopricSvg.childNodes[0]);

      activeVillageId = '2'; // set active village to mount lebanon
      setVillage(activeVillageId, true);
    }
  }

  function addFamilyCircles() {
    $('#familyDots').empty(); 
    // add family circles
    for (i = 0; i < 8; i++) {
      let familyDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      familyDot.setAttribute('class', 'dot');
      let offset = i * 0.9 + 0.45
      familyDot.setAttribute('cx', remToPx(offset, blockSize) + 'px');
      familyDot.setAttribute('cy', '50%');
      document.getElementById('familyDots').appendChild(familyDot);
    }
  }

  function highlightVillage(villageId, setActive) {
    $('#' + villageId + 'City').css('fill', setActive ? activeColor : hoverColor);
    $('#' + villageId + 'CityCircle').css('stroke', setActive ? activeColor : hoverColor);
    $('#' + villageId + 'Highlight').css('fill', setActive ? activeColor : hoverColor);

    if (setActive) {
      $('#' + villageId + 'Highlight').animate({r: '1rem'});
    } else {
      $('#' + villageId + 'Highlight').animate({r: '0.6rem'}, 150);
    }
  }

  function drawLine(x1, y1, x2, y2, svgName, className, id, animate) {
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('id', id);
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);

    if (animate) {
      line.setAttribute('class', className + ' hidden');
      svgName.insertBefore(line, svgName.childNodes[2]);
      $('#' + id).removeClass('hidden');
    } else {
      line.setAttribute('class', className);
      svgName.insertBefore(line, svgName.childNodes[2]);
    }
  }

  function clearBishopric() {
    $('.line').remove();
    $('.city').css('fill', offWhite);
    $('.cityCircle').css('stroke', offWhite);
  }

  function getBishopric(villageId) {
    let index = getIndexOfK(bishoprics, villageId.toString());
    let bishopric = bishoprics[index[0]].slice(0);
  //  if (villageId == 2) { // if mount lebanon
  //    for(let a = 1; a < bishoprics.length; a++) {
  //      bishopric.push(bishoprics[a][0]);
  //    }
  //  } else {
  //    bishopric.push('2');
  //  }
    return bishopric;
  }

  function highlightBishopric(villageId) {
    let className = 'line';
    let bishopric = getBishopric(villageId);
    $('#' + bishopric[0] + 'City').css('fill', hoverColor);
    $('#' + bishopric[0] + 'CityCircle').css('stroke', hoverColor);
    let i = 1;
    let x1= $('#' + bishopric[0]).attr("cx");
    let y1 = $('#' + bishopric[0]).attr("cy");
    let x2;
    let y2;
    while(bishopric[i]) {
      let newId = bishopric[i];
      x2 = $('#' + newId).attr("cx");
      y2 = $('#' + newId).attr("cy");
      $('#' + newId + 'City').css('fill', hoverColor);
      drawLine(x1, y1, x2, y2, svg, className, i + 'Line', true);
      i++;
    }
    if (bishopric[0] == 2) {
      for(let a = 1; a < bishoprics.length; a++) {
        let newId = (bishoprics[a][0]);
        x2 = $('#' + newId).attr("cx");
        y2 = $('#' + newId).attr("cy");
        drawLine(x1, y1, x2, y2, svg, className, i + 'Line', true);
      }
    } else {
      x2 = x1;
      y2 = y1;
      x1 = $('#2').attr("cx");
      y1 = $('#2').attr("cy");
      drawLine(x1, y1, x2, y2, svg, className, i + 'Line', true);
    }
  }

  function resetVillage(villageId) {
    let color = getBishopric(activeVillageId).includes(villageId.toString()) ? hoverColor : offWhite;
    $('#' + villageId + 'City').css('fill', color);
    $('#' + villageId + 'CityCircle').css('stroke', color);
    $('#' + villageId + 'Highlight').animate({r: '0.25rem'});
  }

  function setSidebarContent(villageId) {
    let village = villages.find(obj => {
      return obj.id == villageId;
    });

    let num = villageId > 9 ? villageId : '0' + villageId;
    $('#village_name').html((num + '.<br>' + village.name + '<br>' + village.state).toUpperCase());
    let endYear = village.yearDissolved ? village.yearDissolved : 'present';
    $('#dates').html(village.yearFounded + '-' + endYear);
    $('#bishopric').html(village.bishopric);
    if(village.name == village.bishopric) {
      $('#bishopricKeyDot').css('fill', activeColor);
      $('#bishopricKeyCircle').css('stroke', activeColor);
    } else {
      $('#bishopricKeyDot').css('fill', hoverColor);
      $('#bishopricKeyCircle').css('stroke', hoverColor);
    }
    if(village.numMembers !== null) {
      var ratio = village.numMembers / 225;
      $('#membershipBar').css('width', ratio + 'rem');
      $('#membership').html(village.numMembers);
    };
    if(village.landHoldings != null) {
      var ratio = village.landHoldings / 600;
      $('#landBar').css('width', ratio + 'rem');
      $( '#landHoldings' ).html(village.landHoldings);
    };
    if(village.numFamilies != null) {
      var width = village.numFamilies * 0.9;
      $('#familyDots').css('width', width + 'rem');
      $('#families').html(village.numFamilies);
    };
    if(village.description != null) {
      $('#description').html(village.description);
    };
  }

  function setSidebar(villageId, setActive) {
    if(setActive) {
      setSidebarContent(villageId);
      $('#sidebar-header').animate({opacity: 1}, 150, 'linear');
      $('#sidebar-content').animate({opacity: 1}, 150, 'linear');
    } else {
      $('#sidebar-header').animate({opacity: 0.25}, 100, 'linear', setSidebarContent(villageId));
      $('#sidebar-content').animate({opacity: 0.25}, 100, 'linear');
    }
  }

  function setVillage(villageId, setActive) {
    if (setActive) {
      resetVillage(activeVillageId);
      activeVillageId = villageId;
      clearBishopric();
      highlightBishopric(villageId);
    }
    highlightVillage(villageId, setActive);
    setSidebar(villageId, setActive);
  }

  $.ajax({
    type: 'GET',
    url: 'data/village_data.csv',
    dataType: 'text',
    success: function(data) {
      setUpCities(data, 'village_data');
    }
  });

  $.ajax({
    type: 'GET',
    url: 'data/bishopric_data.csv',
    dataType: 'text',
    success: function(data) {
      setUpCities(data, 'bishopric_data');
    }
  });

  $('#us-coast-map-container').on('mouseover', 'svg .cityButton', function(event) {
    let villageId = parseInt($(this).attr('id'));
    if (villageId !== activeVillageId) {
      setVillage(villageId, false);
    }
  });

  $('#us-coast-map-container').on('mouseout', 'svg .cityButton', function(event) {
    let villageId = parseInt($(this).attr('id'));
    if (villageId !== activeVillageId) {
      resetVillage(villageId);
      setSidebar(activeVillageId, true);
    }
  });

  $('#us-coast-map-container').on('mousedown', 'svg .cityButton', function(event) {
    let villageId = parseInt($(this).attr('id'));
    if (activeVillageId !== villageId) {
      setVillage(villageId, true);
    }
  });

  $('.button-container').on('mousedown', 'svg', function(event) {
    let buttonId = $(this).attr('id');
    let villageId = activeVillageId;
    if (buttonId == 'next-button') {
      if (villageId < villages.length) {
        villageId++;
      } else {
        villageId = 1;
      }
    } else if (buttonId == 'prev-button') {
      if (villageId > 1) {
        villageId--;
      } else {
        villageId = villages.length;
      }
    }
    setVillage(villageId, true);
  });

  $( window ).resize(function() {
    addFamilyCircles();
  });
});
