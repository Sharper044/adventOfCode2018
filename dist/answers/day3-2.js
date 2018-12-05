'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.solution3_2 = solution3_2;

var _day3input = require('../resources/day3input');

var _day = require('./day3-1');

function solution3_2() {
  var claimArr = (0, _day.getClaimArr)();
  var claimedSquares = (0, _day.getClaimedSquares)(claimArr);
  var found = true;
  for (var i = 0; i < claimArr.length; i++) {
    found = true;
    claimCheck: for (var row = claimArr[i].y; row < claimArr[i].y + claimArr[i].height; row++) {
      for (var col = claimArr[i].x; col < claimArr[i].x + claimArr[i].width; col++) {
        if (claimedSquares[col + '-' + row] > 1) {
          found = false;
          break claimCheck;
        }
      }
    }
    if (found === true) {
      console.log("Day 3.2 Answer: ", claimArr[i].id);
      break;
    }
  }
}

// --- Part Two ---
// Amidst the chaos, you notice that exactly one claim doesn't overlap by even a single square inch of fabric with any other claim. If you can somehow draw attention to it, maybe the Elves will be able to make Santa's suit after all!

// For example, in the claims above, only claim 3 is intact after all claims are made.

// What is the ID of the only claim that doesn't overlap?