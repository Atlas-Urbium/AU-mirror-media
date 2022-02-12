// Set shared constants
const remSize = 14.4;

// standard colors
const activeColor = "#d65d0e";
const hoverColor = "#fe8019";
const offWhite = "#efefef";
const offBlack = "#282828";

/**
 * index of multidimensional array
 * @param arr {!Array} - the input array
 * @param k {object} - the value to search
 * @return {Array}
 */
function getIndexOfK(arr, k) {
  for (var i = 0; i < arr.length; i++) {
    var index = arr[i].indexOf(k);
    if (index > -1) {
      return [i, index];
    }
  }
}

/**
 * converts rem units to pixels based on the root font size
 * @param rem {Number} - rems
 * @return {Number} - pixel conversion
 */
function remToPx(rem) {
  return remSize*rem;
}

/**
 * converts pixels to rem units based on the root font size
 * @param px {Number} - pixels
 * @return {Number} - rem conversion
 */
function pxToRem(px) {
  return px/remSize;
}

/**
 * takes in a string and returns an array of lines
 * for custom svg text wrap
 * @param string {String} - input string
 * @param lineLength {Number} - maximum line length
 * @return {String[]} - array of lines
 */
function textWrap(string, lineLength) {
  let textLines = [];
  let stringToProcess = string;
  while (stringToProcess) {
    // if string to process is less than the character limit, add it to list and return
    if (stringToProcess.length < lineLength) {
      textLines.push(stringToProcess);
      stringToProcess = '';
    } else {
      // find the last space in the line if it exists
      let lastSpace = 0;
      for (let i = 0; i < lineLength; i++) {
        if (stringToProcess[i] == ' ') {
          lastSpace = i;
        }
      }
      // add the line to the return array
      textLines.push(stringToProcess.substring(0, lastSpace));
      stringToProcess = stringToProcess.substring(lastSpace);
    }
  }

  return textLines;
}

// standard button behavior
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
