$(document).ready(function(){

  let villages;
  let bishoprics;
  let files = 0;
  let svg;
  let activeVillageId = 2;

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

        let cityDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        cityDot.setAttribute('class', 'city');
        cityDot.setAttribute('id', village.id);
        cityDot.setAttribute('cx', village.x + '%');
        cityDot.setAttribute('cy', village.y + '%');
        svg.appendChild(cityDot);
      };
      setVillage(activeVillageId, true);
    }
  }

  function highlightVillage(villageId, setActive) {
    $('#' + villageId).css('fill', setActive ? activeColor : hoverColor);
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
      svgName.appendChild(line);
      $('#' + id).removeClass('hidden');
    } else {
      line.setAttribute('class', className);
      svgName.appendChild(line);
    }
  }

  function clearLines() {
    $('.line').animate({opacity: 0}, 200, 'linear', $('.line').remove());
  }

  function drawLines(villageId) {
    let className = 'line';
    let index = getIndexOfK(bishoprics, villageId.toString());
    let bishopric = bishoprics[index[0]];
    let x1 = $('#' + bishopric[0]).attr("cx");
    let y1 = $('#' + bishopric[0]).attr("cy");
    let i = 1;
    while(bishopric[i]) {
      let newId = bishopric[i];
      let x2 = $('#' + newId).attr("cx");
      let y2 = $('#' + newId).attr("cy");
      drawLine(x1, y1, x2, y2, svg, className, i + 'Line', true);
      i++;
    }
    if (villageId == 2) { // if mount lebanon
      for(let a = 1; a < bishoprics.length; a++) {
        let newId = bishoprics[a][0];
        let x2 = $('#' + newId).attr("cx");
        let y2 = $('#' + newId).attr("cy");
        drawLine(x1, y1, x2, y2, svg, className, i + 'Line', true);
        i++;
      }
    } else {
      let x2 = x1;
      let y2 = y1;
      x1 = $('#2').attr("cx");
      y1 = $('#2').attr("cy");
      drawLine(x1, y1, x2, y2, svg, className, i + 'Line', true);
    }
  }

  function resetVillage(villageId) {
    $('#' + villageId).css('fill', offWhite);
    $('#' + villageId + 'Highlight').animate({r: '0.25rem'});
  }

  function setSidebarContent(villageId) {
    let village = villages.find(obj => {
      return obj.id == villageId;
    });

    let num = villageId > 9 ? villageId : '0' + villageId;
    $('#village_name').html((num + '.<br>' + village.name + '<br>' + village.state).toUpperCase());
    $('#dates').html(village.yearFounded + '-' + village.yearDissolved);
    $('#bishopric').html(village.bishopric);
    if(village.totalMembership !== null) {
      var ratio = village.totalMembership / 4000.0 * 80;
      $('#membership').html(village.numMembers);
    };
    if(village.landHoldings != null) {
      var ratio = village.landHoldings / 6000.0 * 80;
      $( '#landHoldings' ).html(village.landHoldings);
    };
    if(village.numFamilies != null) {
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
      $('#sidebar-header').animate({opacity: 0}, 50, 'linear', setSidebarContent(villageId));
      $('#sidebar-content').animate({opacity: 0}, 50, 'linear');
      $('#sidebar-header').animate({opacity: 0.25}, 100, 'linear');
      $('#sidebar-content').animate({opacity: 0.25}, 100, 'linear');
    }
  }

  function setVillage(villageId, setActive) {
    if (setActive) {
      resetVillage(activeVillageId);
      activeVillageId = villageId;
      clearLines();
      drawLines(villageId);
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

  $('#us-coast-map-container').on('mouseover', 'svg .city', function(event) {
    let villageId = parseInt($(this).attr('id'));
    if (villageId !== activeVillageId) {
      setVillage(villageId, false);
    }
  });

  $('#us-coast-map-container').on('mouseout', 'svg .city', function(event) {
    let villageId = parseInt($(this).attr('id'));
    if (villageId !== activeVillageId) {
      resetVillage(villageId);
      setSidebar(activeVillageId, true);
    }
  });

  $('#us-coast-map-container').on('mousedown', 'svg .city', function(event) {
    let villageId = parseInt($(this).attr('id'));
    if (villageId !== activeVillageId) {
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
});
