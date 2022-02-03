$( ".city" ).hover(
  function() {
    console.log("hi");
  }, function() {
    console.log("bye");
  }
);

const oldWatervliet = {
  id: 'oldWatervliet',
  name: "WATERVLIET, NY",
  dateFounded: 1787,
  dateDissolved: 1938,
  x: 48.09,
  y: 18.78,
  connections: [],
  bishopric: "",
  families: 4,
  totalMembership: 2668,
  landHoldings: 4500,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const mountLebanon = {
  id: 'mountLebanon',
  name: "MOUNT LEBANON, NY",
  dateFounded: 1787,
  dateDissolved: 1947,
  x: 49.82,
  y: 19.25,
  connections: [],
  bishopric: "",
  families: 8,
  totalMembership: 3019,
  landHoldings: 3000,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const hancock = {
  id: 'hancock',
  name: "HANCOCK, MA",
  dateFounded: "1790",
  dateDissolved: "1960",
  x: 52.06,
  y: 18.51,
  connections: [],
  bishopric: "",
  families: 3,
  totalMembership: 548,
  landHoldings: 3500,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const harvard = {
  id: 'harvard',
  name: "HARVARD, MA",
  dateFounded: 1791,
  dateDissolved: 1918,
  x: 57.33,
  y: 18.82,
  connections: [],
  bishopric: "",
  families: 4,
  totalMembership: null,
  landHoldings: 1800,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const oldEnfield = {
  id: 'oldEnfield',
  name: "ENFIELD, CT",
  dateFounded: 1790,
  dateDissolved: 1917,
  x: 53,
  y: 21.69,
  connections: [],
  bishopric: "",
  families: 5,
  totalMembership: 739,
  landHoldings: 3300,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const tyringham = {
  id: 'tyringham',
  name: "TYRINGHAM, MA",
  dateFounded: "1790",
  dateDissolved: "1875",
  x: 51.59,
  y: 19.82,
  connections: [],
  bishopric: "",
  families: 3,
  totalMembership: 241,
  landHoldings: 1000,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const alfred = {
  id: 'alfred',
  name: "ALFRED, ME",
  dateFounded: "1793",
  dateDissolved: "1932",
  x: 58.44,
  y: 13.39,
  connections: [],
  bishopric: "",
  families: 3,
  totalMembership: 241,
  landHoldings: 1100,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const canterbury = {
  id: 'canterbury',
  name: "CANTERBURY, NH",
  dateFounded: "1792",
  dateDissolved: "1992",
  x: 56.29,
  y: 14.01,
  connections: [],
  bishopric: "",
  families: 3,
  totalMembership: 746,
  landHoldings: 3000,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const newEnfield = {
  id: 'newEnfield',
  name: "ENFIELD, NH",
  dateFounded: "1792",
  dateDissolved: "1923",
  x: 54.11,
  y: 12.55,
  connections: [],
  bishopric: "",
  families: 3,
  totalMembership: 183,
  landHoldings: 3000,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const sabbathdayLake = {
  id: 'sabbathdayLake',
  name: "SABBATHDAY LAKE, ME",
  dateFounded: "1793",
  dateDissolved: "present",
  x: 57.8,
  y: 10.36,
  connections: [],
  bishopric: "",
  families: 3,
  totalMembership: 165,
  landHoldings: 2000,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const shirley = {
  id: 'shirley',
  name: "SHIRLEY, MA",
  dateFounded: "1791",
  dateDissolved: "1908",
  x: 56.62,
  y: 17.97,
  connections: [],
  bishopric: "",
  families: 3,
  totalMembership: 859,
  landHoldings: 2000,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const westUnion = {
  id: 'westUnion',
  name: "WEST UNION, IN",
  dateFounded: "1810",
  dateDissolved: "1827",
  x: 6.48,
  y: 39.04,
  connections: [],
  bishopric: "",
  families: 3,
  totalMembership: null,
  landHoldings: null,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const southUnion = {
  id: 'southUnion',
  name: "SOUTH UNION, Ky",
  dateFounded: "1807",
  dateDissolved: "1922",
  x: 9.6,
  y: 48.18,
  connections: [],
  bishopric: "",
  families: 4,
  totalMembership: 676,
  landHoldings: 6000,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const unionVillage = {
  id: 'unionVillage',
  name: "UNION VILLAGE, OH",
  dateFounded: "1806",
  dateDissolved: "1912",
  x: 17.7,
  y: 36.91,
  connections: [],
  bishopric: "",
  families: 6,
  totalMembership: 3873,
  landHoldings: 4500,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const newWatervliet = {
  id: 'newWatervliet',
  name: "WATERVLIET, OH",
  dateFounded: "1806",
  dateDissolved: "1910",
  x: 18.56,
  y: 34.23,
  connections: [],
  bishopric: "",
  families: 2,
  totalMembership: 127,
  landHoldings: 1300,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const pleasantHill = {
  id: 'pleasantHill',
  name: "PLEASANT HILL, KY",
  dateFounded: "1806",
  dateDissolved: "1910",
  x: 15.27,
  y: 42.93,
  connections: [],
  bishopric: "",
  families: 8,
  totalMembership: 494,
  landHoldings: 4200,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const whitewater = {
  id: 'whitewater',
  name: "WHITEWATER, OH",
  dateFounded: "1824",
  dateDissolved: "1910",
  x: 15.56,
  y: 37.44,
  connections: [],
  bishopric: "",
  families: 3,
  totalMembership: 407,
  landHoldings: 1500,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const groveland = {
  id: 'groveland',
  name: "GROVELAND, NY",
  dateFounded: "1836",
  dateDissolved: "1892",
  x: 35.52,
  y: 19.19,
  connections: [],
  bishopric: "",
  families: 3,
  totalMembership: 491,
  landHoldings: 2280,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const northUnion = {
  id: 'northUnion',
  name: "NORTH UNION, OH",
  dateFounded: "1822",
  dateDissolved: "1889",
  x: 25.29,
  y: 27.61,
  connections: [],
  bishopric: "",
  families: null,
  totalMembership: null,
  landHoldings: 1355,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const sodusBay = {
  id: 'sodusBay',
  name: "SODUS BAY, NY",
  dateFounded: "1826",
  dateDissolved: "1836",
  x: 38.51,
  y: 18.44,
  connections: [],
  bishopric: "",
  families: null,
  totalMembership: null,
  landHoldings: null,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const narcoosee = {
  id: 'narcoosee',
  name: "NARCOOSEE, FL",
  dateFounded: "1896",
  dateDissolved: "1911",
  x: 33.784,
  y: 87.54,
  connections: [],
  bishopric: "",
  families: 2,
  totalMembership: 793,
  landHoldings: null,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};
const whiteOak = {
  id: 'whiteOak',
  name: "WHITE OAK, GA",
  dateFounded: "1898",
  dateDissolved: "1902",
  x: 18.78,
  y: 72.18,
  connections: [],
  bishopric: "",
  families: null,
  totalMembership: null,
  landHoldings: null,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
};

const villages = [oldWatervliet, mountLebanon, hancock, harvard, oldEnfield, tyringham, alfred, canterbury, newEnfield, sabbathdayLake, shirley, westUnion, southUnion, unionVillage, newWatervliet, pleasantHill, whitewater, groveland, northUnion, sodusBay, narcoosee, whiteOak];

const svg = document.getElementById('imageFrameSVG');

for (const village of villages) {
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  circle.setAttribute('class', 'city');
  circle.setAttribute('id', village.id);
  circle.setAttribute('cx', village.x + '%');
  circle.setAttribute('cy', village.y + '%');
  circle.setAttribute('r', '.4%');
  circle.setAttribute('stroke-width', '0');
  circle.setAttribute('fill', 'rgba(186,60,15,.25)');
  svg.appendChild(circle);
};

$( ".city" ).hover(
  function() {
    $(this).attr('r', '1%');
    var village = villages.find(obj => {
      return obj.id === $(this).attr('id');
    });
    $("#cityName").html(village.name);
    $("#datesActive").html(village.dateFounded + "-" + village.dateDissolved);
    $("bishopric").html(village.bishopric);
    $("#infoFrame").animate({opacity: 1, speed: "fast", easing: "swing"});

    if(village.totalMembership != null) {
      var ratio = village.totalMembership / 4000.0 * 80;
      $( "#totalMembershipBar" ).animate({width: ratio + "%", speed: "slow", easing: "swing"});
    };
    if(village.landHoldings != null) {
      var ratio = village.landHoldings / 6000.0 * 80;
      $( "#landHoldingsBar" ).animate({width: ratio + "%", speed: "slow", easing: "swing"});
    };
    if(village.families != null) {
      for (let i = 0; i < village.families; i++) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        circle.setAttribute('class', 'familyDot');
        circle.setAttribute('cx', (3 + 7 * i) +'%');
        circle.setAttribute('cy', '50%');
        circle.setAttribute('r', '3%');
        circle.setAttribute('stroke-width', '0');
        circle.setAttribute('fill', 'rgba(186,60,15,' + (.25 + 1 * .05));
        $("#families").append(circle);
      }
    };
    if(village.description != null) {
      $("#description").html(village.description);
    };
  }, function() {
    $(this).attr('r', '.4%');
    $(".familyDot").remove();
    $("#infoFrame").animate({opacity: 0, speed: "fast", easing: "swing"});
    $( "#totalMembershipBar" ).animate({width: 0, speed: "slow", easing: "swing"});
    $( "#landHoldingsBar" ).animate({width: 0, speed: "slow", easing: "swing"});
  });
