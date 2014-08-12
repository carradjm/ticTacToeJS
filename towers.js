var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame(numDisks) {
  this.stacks = [[],[],[]]
  for (var i = numDisks; i > 0; i--) {
    this.stacks[0].unshift(i);
  }
}

HanoiGame.prototype.isWon = function () {
  if (this.stacks[0].length === 0 &&
  (this.stacks[1].length === 0 || this.stacks[2].length === 0)) {
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
  if (typeof this.stacks[endTowerIdx][0] === "undefined") {
    return true;
  } else if (this.stacks[startTowerIdx][0] < this.stacks[endTowerIdx][0]) {
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.move = function (startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    this.stacks[endTowerIdx].unshift(this.stacks[startTowerIdx].shift());
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.print = function () {
  for (var i = 0; i < this.stacks.length; i++) {
    console.log( "Stack " + (i + 1) + ": " + JSON.stringify(this.stacks[i]))
  }
};

HanoiGame.prototype.promptMove = function(cb) {
  this.print();

  reader.question ("From which stack?: ", function(a1) {
    reader.question ("To which stack?: ", function(a2) {
      cb(parseInt(a1) - 1, parseInt(a2) - 1);
    })
  })
};

HanoiGame.prototype.run = function(completionCallback) {
  var game = this;

  this.promptMove(function (start, end) {
    var moved = game.move(start, end);
    if (!moved) {
      console.log("Invalid move!");
    }

    if (!game.isWon()) {
      game.run(completionCallback)
    } else {
      completionCallback();
    }
  });
};

game = new HanoiGame(3);

game.run(function() {
  console.log("You win!");
  this.print();
  reader.close();
});