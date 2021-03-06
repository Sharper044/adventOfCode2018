'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.solution2_2 = solution2_2;

var _day2input = require('../resources/day2input');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function solution2_2() {
  var longArr = _day2input.input.split('\n').map(function (id) {
    return id.split('');
  });
  loops: {
    var _loop = function _loop(i) {
      var arr = longArr.map(function (id) {
        var newId = [].concat(_toConsumableArray(id.slice(0, i)), _toConsumableArray(id.slice(i + 1, id.length)));
        return newId.filter(function (char) {
          return char !== ' ';
        }).join('');
      }).sort();
      console.log(arr);
      for (var j = 0; j < arr.length - 1; j++) {
        if (arr[j] === arr[j + 1]) {
          console.log("Day 2.1 Answer: ", arr[j]);
          return 'break|loops';
        }
      }
    };

    for (var i = 0; i < longArr[0].length; i++) {
      var _ret = _loop(i);

      if (_ret === 'break|loops') break loops;
    }
  }
}

// --- Part Two ---
// Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.

// The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

// abcde
// fghij
// klmno
// pqrst
// fguij
// axcye
// wvxyz
// The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

// What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)

// Your puzzle answer was icxjvbrobtunlelzpdmfkahgs.

// Both parts of this puzzle are complete! They provide two gold stars: **