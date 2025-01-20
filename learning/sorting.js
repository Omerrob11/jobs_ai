// insertion sort:
/*
Algo: DATA STRUCTURES are ways to organzie data.
- go through the all array
- define the current item to sort (starting from index === 1)
- as long as the index bigger than 0 and you are smaller than the index before you - swap
- STOP: when you are bigger than the index before you

Nuances:
- i will mean which element we are currently sorting.
- if i === 2, it means we are sorting the 3rd elements in  the list
- so each time, we have n-i elements to sort
- and we progressing each loop iteration, by adding increasing i by 1,

the idea:
- we sort "backwards" - we take the element, and compare it with the before elements
- until you are getting to the start of the list, or you are bigger than the one before you.
- which means while you are bigger than 0 and smaller than the one before you - if its good, it means
- you need to swap, because you are smaller
- if we swap, the current item that we sort, is index is smaller by one.
- so after we were sorting you, we have a sorted list, and a non sorted list
- so each time, we prgoress and take another one out of the unsroted list, and put it in the correct place
- of the currently sorted list
*/

/*
The idea: new
- we go through all the list
- we insert the item into the sorted list by swapping the item we sort with the item before it,
untill the item before it is smaller then him

so we have: !!!!!!!
unsorted pile, and sorted pile
where each time we go over one item of the unsorted pile, and swap as long he is smaller than the item before it
than, we go to the next non - sorted item, and do that to him.
as long as he is smaller than the item before it, and as long we are not in the beginning of the list 
!!!!
*/

/*
Time complexity:
- to sort the first position we have 1 -1 comprasion to do
- to sort the second position, we have 2 -1 comparsion to do max
- to sort the i position, we have i -1 comparsions to do max
- to sort the n position, we have n-1 comprasions to have
- its a airthmetic squestns, so O(n^2)
- it is stable, as we swap only adjacent and if you are smaller
- it is in place


*/

function insertionSore(unSortedList) {
  // i reference the new item from the unsorted list, each iteration we take item from here.
  // each iteration, we have n-i left items to sort in the un sorted list.
  for (let i = 0; i < unSortedList.length; i++) {
    // the current item to sort from the unsorted list
    // each iteration, there is less 1 item to sort in the unsorted list
    // the i index always taking an item from the unsorted list we still have to sort
    let current = i;

    // stop if current === 0, because its mean there is not other values to compare you
    // as long as you are smaller than the item before and not the first item, preform a swap
    while (current > 0 && unSortedList[current] < unSortedList[current - 1]) {
      // preform a swap
      const temp = unSortedList[current];
      unSortedList[current] = unSortedList[current - 1];
      unSortedList[current - 1] = temp;
      // if you preform a swap, the index of the current item is now lower by one.
      current--;
    }
  }
  return unsortedList;
}

/*
The idea:
-We will signify the sorted list at the end, so we start at the end, which will reference the sorted list
- we will than have another loop, starting from the start, bubble the elements up until we reach the start of the sorted list
- so if you are bigger, we will swap you with the next item, and we continue until we reach the sorted list
- The i Index (The first one) will signify the beginning of the sorted list - not to touch on it.
- the second index will iterate the remaning un sorted list, and bubble them up
- so each time, !!!! We gurantee to have one less element to sort, because we bubble each iteration the element to the sorted list !!!!
- and each time, we promise, that the higher element will be at the end, so we go until j < i, becaue we know the higher element
- will be at the end, which means the start of the list is 100% bigger than all remaning elements in the unsorted list


STOP: when you did not preform a swap at the iteration.
why? because it means that all the elements are sorted

Time complexity: 
- first iteration: we might preform n swaps
- second iteration: we might prefrom n-1 swap
- last iteration: we might preform a swap
- airthemetic, o(n^2)


*/
function bubbleSort(unsortedList) {
  const n = unsortedList.length - 1;

  for (let i = n; i >= 0; i--) {
    // each iteration, i will signify the beginning of the sorted list
    // and for each iteration, we will go through all the elemnts in the list.
    // so, if there is an iteration that we didn't swapped, it means that in the unsorted list
    // all the elements are in order, and in the sorted list we already know it.
    // so we define the swap in here, because this is the actual iteration that we check if we swapp
    // the second loop is go through the items to swap them, here we are checking if too swap
    let swapped = false;
    for (let j = 0; j < i; j++) {
      if (unsortedList[i] > unsortedList[j + 1]) {
        const temp = unsortedList[j];
        unsortedList[j] = unsortedList[j + 1];
        unsortedList[j + 1] = temp;
        swapped = true;
      }
    }

    //if no swap, finish, we arleady sorted, no need to go trough until we reach the start of the list

    if (!swapped) return unsortedList;
  }
  // each iteration we swap, just change it
  return unsortedList;
}

/*
Selection sort
- look for the minimum - go over the list in the second iteration, compare to the current minIndex
- put it in the end of the sorted list (we found other minimum before it) - at index i;
- increase the end of the sorted list by 1 (i iteration increased)

outer loop: i === number of elements that already sorted 
iner loop: n-i === j: number of elements needs to sort: go through the list

STOP: when we reach the end of the list, because i is the index that give us the end of the sorted list.
Time complexity: O(n^2)
stable: no (we might swap non adjacent)
in place: yes
*/

function selectionSort(unsortedList) {
  // i reference the end of the sorted list
  for (let i = 0; i < unsortedList.length; i++) {
    let minIndex = i;

    for (let j = i; j < unsortedList.length; j++) {
      if (unsortedList[minIndex] > unsortedList[j]) {
        minIndex = j;
      }
    }
    // preform a swap
    // at index minIndex, preform a swap with i;

    const temp = unsortedList[i];
    unsortedList[i] = unsortedList[minIndex];
    unsortedList[minIndex] = temp;
  }

  return unsortedList;
}

// Javascript sorting:
// takes compare function, with 2 arguments, both of the items to compare
// (a,b) => if positive, b is coming before a
// if negative, a coming before b.
// if 0, than the ordering remains the same
