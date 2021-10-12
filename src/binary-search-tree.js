const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
module.exports = 
class BinarySearchTree {
  constructor() {
    this.base = null;
  }

  root() {
    return this.base;
  }

  add(data) {
    this.base = addWithin(this.base, data);

    function addWithin(node, value) {
      if (!node) {
        return new Node(value);
      }
      if (node.data === value) {
        return node;
      }
      if (node.data > value) {
        node.left = addWithin(node.left, value);
      } else {
        node.right = addWithin(node.right, value);
      }

      return node;
    }
  }

  searchWithin(node, value) {
    if (!node) {
      return false;
    }
    if (node.data === value) {
      return node;
    }
    if (node.data > value) {
      return this.searchWithin(node.left, value);
    } else {
      return this.searchWithin(node.right, value);
    }
  }

  has(data) {
    return this.searchWithin(this.base, data) ? true : false;  
  }  

  find(data) {
    return this.searchWithin(this.base, data) || null;
  }

  remove(data) {
    return removeNode(this.base, data);

    function removeNode(node, value) {
      if (!node) {
        return null;
      }

      if (node.data > value) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (node.data < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right;
          return node;
        }

        if (!node.right) {
          node = node.left
          return node;
        }

        let minValueFromRight = node.right;
        while (minValueFromRight.left) {
          minValueFromRight = minValueFromRight.left;
        }

        node.data = minValueFromRight.data;
        node.right = removeNode(node.right, minValueFromRight.data);

        return node;
      }
    }
  }

  min() {
    let current = this.base;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this.base;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }

};