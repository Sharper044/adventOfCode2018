import { input } from '../resources/day4input';
import * as _ from 'lodash';

export const parseInput = () => {
  const arr = input.split('\n')
  .map(entry => {
    return {
      year: parseInt(entry.substring(1, 5), 10),
      month: parseInt(entry.substring(6, 8), 10),
      day: parseInt(entry.substring(9, 11), 10),
      hr: parseInt(entry.substring(12, 14), 10),
      min: parseInt(entry.substring(15, 17), 10),
      action: entry.substring(19),
    };
  }).sort((a, b) => {
    if (a.month !== b.month) {
      return a.month - b.month;
    } else if (a.day !== b.day) {
      return a.day - b.day;
    } else if (a.hr !== b.hr) {
      return a.hr - b.hr;
    } else {
      return a.min - b.min;
    }
  });

  return arr;
};

export const guardRecords = () => {
  const arr = parseInput();
  let records = {};
  let currentGuard = '';
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].action.charAt(0) === 'G') {
      currentGuard = arr[i].action.substring(7, arr[i].action.indexOf(' b'));
    } else if (arr[i].action.charAt(0) === 'f') {
      if (_.has(records, currentGuard)) {
        records[currentGuard] = [ ...records[currentGuard], ..._.range(arr[i].min, arr[i + 1].min)];
      } else {
        records[currentGuard] = _.range(arr[i].min, arr[i + 1].min);
      }
      i++;
    }
  }
  return records;
};

export const sleepy = (records) => {
  let dozer = '';
  for (let id in records) {
    if (dozer === '' || records[id].length > records[dozer].length) {
      dozer = id;
    }
  }
  return dozer;
};

export const minArrMaker = (record) => {
  let minutes = _.fill(Array(60), 0);
  for (let i = 0; i < record.length; i++) {
    ++minutes[record[i]];
  }
  return minutes;
};

export const solution4_1 = () => {
  const records = guardRecords();
  const dozer = sleepy(records);
  let minutes = minArrMaker(records[dozer]);

  console.log(parseInt(dozer, 10) * minutes.indexOf(_.max(minutes)));
};

export const solution4_2 = () => {
  let records = guardRecords();
  let dozer = '';
  let min = 0;
  let freq = 0;
  for (let id in records) {
    let minutes = minArrMaker(records[id]);
    if (_.max(minutes) > freq) {
      dozer = id;
      freq = _.max(minutes);
      min = minutes.indexOf(_.max(minutes));
    }
  }
  console.log(dozer * min);
};

// --- Day 4: Repose Record ---
// You've sneaked into another supply closet - this time, it's across from the prototype suit manufacturing lab. You need to sneak inside and fix the issues with the suit, but there's a guard stationed outside the lab, so this is as close as you can safely get.

// As you search the closet for anything that might help, you discover that you're not the first person to want to sneak in. Covering the walls, someone has spent an hour starting every midnight for the past few months secretly observing this guard post! They've been writing down the ID of the one guard on duty that night - the Elves seem to have decided that one guard was enough for the overnight shift - as well as when they fall asleep or wake up while at their post (your puzzle input).

// For example, consider the following records, which have already been organized into chronological order:

// [1518-11-01 00:00] Guard #10 begins shift
// [1518-11-01 00:05] falls asleep
// [1518-11-01 00:25] wakes up
// [1518-11-01 00:30] falls asleep
// [1518-11-01 00:55] wakes up
// [1518-11-01 23:58] Guard #99 begins shift
// [1518-11-02 00:40] falls asleep
// [1518-11-02 00:50] wakes up
// [1518-11-03 00:05] Guard #10 begins shift
// [1518-11-03 00:24] falls asleep
// [1518-11-03 00:29] wakes up
// [1518-11-04 00:02] Guard #99 begins shift
// [1518-11-04 00:36] falls asleep
// [1518-11-04 00:46] wakes up
// [1518-11-05 00:03] Guard #99 begins shift
// [1518-11-05 00:45] falls asleep
// [1518-11-05 00:55] wakes up
// Timestamps are written using year-month-day hour:minute format. The guard falling asleep or waking up is always the one whose shift most recently started. Because all asleep/awake times are during the midnight hour (00:00 - 00:59), only the minute portion (00 - 59) is relevant for those events.

// Visually, these records show that the guards are asleep at these times:

// Date   ID   Minute
//             000000000011111111112222222222333333333344444444445555555555
//             012345678901234567890123456789012345678901234567890123456789
// 11-01  #10  .....####################.....#########################.....
// 11-02  #99  ........................................##########..........
// 11-03  #10  ........................#####...............................
// 11-04  #99  ....................................##########..............
// 11-05  #99  .............................................##########.....
// The columns are Date, which shows the month-day portion of the relevant day; ID, which shows the guard on duty that day; and Minute, which shows the minutes during which the guard was asleep within the midnight hour. (The Minute column's header shows the minute's ten's digit in the first row and the one's digit in the second row.) Awake is shown as ., and asleep is shown as #.

// Note that guards count as asleep on the minute they fall asleep, and they count as awake on the minute they wake up. For example, because Guard #10 wakes up at 00:25 on 1518-11-01, minute 25 is marked as awake.

// If you can figure out the guard most likely to be asleep at a specific time, you might be able to trick that guard into working tonight so you can have the best chance of sneaking in. You have two strategies for choosing the best guard/minute combination.

// Strategy 1: Find the guard that has the most minutes asleep. What minute does that guard spend asleep the most?

// In the example above, Guard #10 spent the most minutes asleep, a total of 50 minutes (20+25+5), while Guard #99 only slept for a total of 30 minutes (10+10+10). Guard #10 was asleep most during minute 24 (on two days, whereas any other minute the guard was asleep was only seen on one day).

// While this example listed the entries in chronological order, your entries are in the order you found them. You'll need to organize them before they can be analyzed.

// What is the ID of the guard you chose multiplied by the minute you chose? (In the above example, the answer would be 10 * 24 = 240.)

// --- Part Two ---
// Strategy 2: Of all guards, which guard is most frequently asleep on the same minute?

// In the example above, Guard #99 spent minute 45 asleep more than any other guard or minute - three times in total. (In all other cases, any guard spent any minute asleep at most twice.)

// What is the ID of the guard you chose multiplied by the minute you chose? (In the above example, the answer would be 99 * 45 = 4455.)