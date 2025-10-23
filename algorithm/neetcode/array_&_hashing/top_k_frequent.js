/**
 * Given an integer array nums and an integer k, return the k most frequent elements within the array.
 * The test cases are generated such that the answer is always unique.
 * You may return the output in any order.
 */

const nums1 = [1, 2, 2, 3, 3, 3];
const k1 = 2;
// Output: [2, 3];

const nums2 = [7, 7];
const k2 = 1;
// Output: [7];

function topKFrequent(nums, k) {
  let count = {};
  for (const num of nums) {
    count[num] = (count[num] || 0) + 1;
  }

  const freq = Array.from({ length: nums.length + 1 }, () => []);
  for (const [n, c] of Object.entries(count)) {
    freq[c].push(parseInt(n));
  }

  const res = [];
  for (let i = freq.length - 1; i > 0; i--) {
    for (const num of freq[i]) {
      res.push(num);
      if (res.length === k) {
        return res;
      }
    }
  }
}

console.log(topKFrequent(nums1, k1));
