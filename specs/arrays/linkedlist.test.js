/*
  LinkedList
  
  Name your class / constructor (something you can call new on) LinkedList
  
  LinkedList is made by making nodes that have two properties, the value that's being stored and a pointer to
  the next node in the list. The LinkedList then keep track of the head and usually the tail (I would suggest
  keeping track of the tail because it makes pop really easy.) As you may have notice, the unit tests are the
  same as the ArrayList; the interface of the two are exactly the same and should make no difference to the
  consumer of the data structure.
  
  length - integer  - How many elements in the list
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses, 
                      and returns removed value
                      
  I would suggest making a second class, a Node class. However that's up to you how you implement it. A Node
  has two properties, value and next.

  As always, you can change describe to xdescribe to prevent the unit tests from running while
  you work
*/

class LinkedList {
  // code goes here
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(value) {
    const node = new Node(value);
    this.length++;
    // if list is empty make node the head
    if (!this.head) {
      this.head = node;
    } else {
      // else add to end of list
      this.tail.next = node;
    }
    // regardless of if list was empty or not, make last item in list the new node
    this.tail = node;
  }

  pop() {
    // delete and return last item
    return this.delete(this.length - 1);
  }

  find(index) {
    // if out of list's range, return null
    if (index >= this.length) return null;
    let current = this.head;
    // get to list item and set it to current
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    // return found item
    return current;
  }

  // get node and return its value
  get(index) {
    const node = this.find(index);
    if (!node) return void 0;
    return node.value;
  }

  delete(index) {
    // need to handle first item (head) differently
    if (index === 0) {
      const head = this.head;
      // if we h
      if (head) {
        // set head to next node
        this.head = head.next;
      } else {
        // if it's the only item in the list then our list is now empty
        this.head = null;
        this.tail = null;
      }
      this.length--;
      return head.value;
    }

    // all items other than the first
    const node = this.find(index - 1);
    const search = node.next;
    if (!search) return null;
    node.next = search.next;
    if (!node.next) {
      this.tail = node.next;
    }
    this.length--;
    return search.value;
  }
}

class Node {
  // code goes here
  constructor(value) {
    this.value = value;
  }
}

// unit tests
// do not modify the below code
describe("LinkedList", function () {
  const range = (length) =>
    Array.apply(null, { length: length }).map(Number.call, Number);
  const abcRange = (length) =>
    range(length).map((num) => String.fromCharCode(97 + num));
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  test("constructor", () => {
    expect(list).toEqual(expect.any(LinkedList));
  });

  test("push", () => {
    abcRange(26).map((character) => list.push(character));
    expect(list.length).toEqual(26);
  });

  test("pop", () => {
    abcRange(13).map((character) => list.push(character));
    expect(list.length).toEqual(13);
    range(10).map(() => list.pop());
    expect(list.length).toEqual(3);
    expect(list.pop()).toEqual("c");
  });

  test("get", () => {
    list.push("first");
    expect(list.get(0)).toEqual("first");
    list.push("second");
    expect(list.get(1)).toEqual("second");
    expect(list.get(0)).toEqual("first");
    abcRange(26).map((character) => list.push(character));
    expect(list.get(27)).toEqual("z");
    expect(list.get(0)).toEqual("first");
    expect(list.get(9)).toEqual("h");
    list.pop();
    expect(list.get(list.length - 1)).toEqual("y");
  });

  test("delete", () => {
    abcRange(26).map((character) => list.push(character));
    list.delete(13);
    expect(list.length).toEqual(25);
    expect(list.get(12)).toEqual("m");
    expect(list.get(13)).toEqual("o");
    list.delete(0);
    expect(list.length).toEqual(24);
    expect(list.get(0)).toEqual("b");
  });
});
