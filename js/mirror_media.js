// Set shared constants
const remSize = 14.4;

// standard colors
const activeColor = "#d65d0e";
const hoverColor = "#fe8019";
const offWhite = "#efefef";
const offBlack = "#282828";

/**
 * Index of Multidimensional Array
 * @param arr {!Array} - the input array
 * @param k {object} - the value to search
 * @return Array}
 */
function getIndexOfK(arr, k) {
  for (var i = 0; i < arr.length; i++) {
    var index = arr[i].indexOf(k);
    if (index > -1) {
      return [i, index];
    }
  }
}

function remToPx(rem) {
  return remSize*rem;
}

function pxToRem(px) {
  return px/remSize;
}

$('.button-container').on('mouseover', 'svg', function(event) {
  $(this).find('circle').css('stroke', hoverColor);
  $(this).find('text').css('fill', hoverColor);
});

$('.button-container').on('mouseout', 'svg', function(event) {
  $(this).find('circle').css('stroke', offWhite);
  $(this).find('text').css('fill', offWhite);
});

$('.button-container, .toggleOff').on('mousedown', 'svg', function(event) {
  $(this).find('circle').css('stroke', hoverColor);
  $(this).find('text').css('fill', hoverColor);
});

$('.button-container, .toggleOn').on('mousedown', 'svg', function(event) {
  $(this).find('circle').css('stroke', activeColor);
  $(this).find('text').css('fill', activeColor);
});
