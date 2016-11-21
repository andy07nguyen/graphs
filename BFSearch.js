var adjList = {
            "A": ["B", "G"],
            "B" : ["A", "E", "D", "C"],
            "C" : ["B", "D"],
            "D": ["B", "C"],
            "E": ["B", "F"],
            "F" : ["E"],
            "G" : ["A"]
    }
var Queue = function() {
  this.arr = []
  this.enqueue = function(val) {
    this.arr.push(val)
    return this;
  }
  this.dequeue = function() {
    var toReturn = this.arr[0];
    for(var i=0; i<this.arr.length-1; i++){
      this.arr[i] = this.arr[i+1];
    }
    this.arr.pop();
    return toReturn;

  }
  this.length = function() {
    return this.arr.length
  }
}

// this function requires an adjacency list and an origin. End is optional.
var BFS = function(aList, origin, end){
  var queue = new Queue();
  var tracker = {};
  //start off the tracker with the origin as 0 distance, no previous
  tracker[origin] = [0, null];
  //put the origin in the queue
  queue.enqueue(origin);
  // we haven't found the end point request yet, so mark foundend as false
  var foundend = false;

  // as long as there is something in the queue, pop off the front and refer to it as current.
  while(queue.length() != 0 && foundend == false){
    current = queue.dequeue();
    // go back to the adjacency list to refer to its neighbors
    for(var i=0; i<aList[current].length; i++){
      var currneighbor = aList[current][i];
      // if the currneighbor is not in tracker yet, add it in. The key of currneighbor should be an array with the count from current + 1 and current. Then add currneighbor to the queue.
      if(!tracker[currneighbor]){
        tracker[currneighbor] = [tracker[current][0]+1, current];
        queue.enqueue(currneighbor);

      }
      // if currneighbor is the endpoint you're looking for, mark foundend as true (which will break the while loop) and break out of this for loop
      if(end != undefined && currneighbor == end){
        foundend = true;
        break;
      }

    }

  }
  // tracker is returned, which shows the minimum values from the origin to each data point and the previous data point, excluding any unnecessary data not needed to find our endpoint(if provided)
  return tracker;


}

var newBFS = new BFS(adjList, "A");
console.log(newBFS)
