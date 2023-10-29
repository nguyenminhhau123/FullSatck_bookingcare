/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let array = [];
  for (let i = 0; i < nums.length; i++) {
    // console.log([i]);
    for (let j = 1; j < nums.length; j++) {
      if (nums[i] + nums[j] == target) {
        array.push(i);
        array.push(j);
        return array;
      }
    }
  }
};
let goal = twoSum([3, 2, 4], 6);
console.log(goal);
