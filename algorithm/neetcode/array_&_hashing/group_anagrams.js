/***
 *
 * Given an array of strings strs, group all anagrams together into sublists. You may return the output in any order.
 * An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.
 *
 *
 *
 *
 * Test 1:
 * Input: strs = ["act","pots","tops","cat","stop","hat"]
 * Output: [["hat"],["act", "cat"],["stop", "pots", "tops"]]
 *
 * Test 2:
 * Input: strs = ["x"]
 * Output: [["x"]]
 *
 * Test 3:
 * Input: strs = [""]
 * Output: [[""]]
 */

function groupAnagrams(strs) {
  const res = {};
  for (let s of strs) {
    const count = new Array(26).fill(0);
    for (let c of s) {
      count[c.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
    }
    const key = count.join('.'); // ['bdddddddddd', 'bbbbbbbbbbc']
    // console.log('** RYAN group_anagrams.js 30 key : ', key);
    if (!res[key]) {
      res[key] = [];
    }
    res[key].push(s);
  }

  return Object.values(res);
}

const testCase1 = ['act', 'pots', 'tops', 'cat', 'stop', 'hat'];
const testCase2 = ['x'];
const testCase3 = [''];
const testCase4 = ['bdddddddddd', 'bbbbbbbbbbc'];
console.log(groupAnagrams(testCase4));
