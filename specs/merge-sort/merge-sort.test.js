/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const mergeSort = (nums) => {
  // if array only has one thing it's sorted so return it
  if (nums.length < 2) return nums;
  // get the mid point
  const mid = Math.floor(nums.length / 2);
  // first list is the first half
  const list1 = nums.slice(0, mid);
  // second list is the second half
  const list2 = nums.slice(mid);
  /* return the result of calling merge(x, y)
    where x and y are each the result of calling mergeSort
    on the first and second lists. In other words, go back
    to the top of this function with each list and repeat
    until we finally return when nums is of length 1 
  */
  return merge(mergeSort(list1), mergeSort(list2));
};

const merge = (list1, list2) => {
  // create array to build sorted list
  // create two pointers. one to iterate through each list
  let sortedArray = [],
    left = 0,
    right = 0;

  /*  while each list's pointer is less than the
    length of the list
  */
  while (left < list1.length && right < list2.length) {
    /* check the value in each list at the index
    of their respective pointers.
    e.g, left is 2 and right is 5; check list1[2] & list2[5]
    */

    /* if list1's value is less than list2's value
    add list1's value to sortedArray
    */
    if (list1[left] < list2[right]) {
      sortedArray.push(list1[left]);
      left++;
    } else {
      // otherwise add list2's value to sortedArray
      sortedArray.push(list2[right]);
      right++;
    }
  }
  /* once one of the pointers reaches the end of its list
  we take our sortedArray and we add both lists back to the
  sortedArray. Because one of our pointers reached the end
  of its list, one of the two lists we add back is empty.
  This doesn't matter. The JS
  engine can figure out that it doesnt need to do anything
  with the empty array we passed it. Besides the empty list,
  we also pass along the other list, using slice to cut off
  items we already iterated past via our pointer
  */
  return sortedArray.concat(list1.slice(left), list2.slice(right));
};

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
