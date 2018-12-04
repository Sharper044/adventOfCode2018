import { input } from '../resources/day2input';

export function solution2_2() {
  const longArr = input.split('\n').map(id => id.split(''));
  loops: {
      for (let i = 0; i < longArr[0].length; i++) {
      let arr = longArr.map(id => {
        let newId = [...id.slice(0, i), ...id.slice(i+1, id.length)];
        return newId.filter(char => char !== ' ').join('');
      }).sort();
      console.log(arr);
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] === arr[j+1]) {
          console.log("Day 2.1 Answer: ", arr[j]);
          break loops;
        }
      }
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