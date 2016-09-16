var gameOfLife = {
  width: 90,
  height: 60,
  stepInterval: null,
  totalSwitched: [],
  iteration: 0,

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");
    
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    
    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);
    
    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    /* 
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    */
  },
  
  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y" 
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "on-click" events that allow a user to click on 
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"
    
    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white
    
    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board
    
    var onCellClick = function (e) {
      if (this.getAttribute('data-status') == 'dead') {
        this.className = "alive";
        this.setAttribute('data-status', 'alive');
      } else {
        this.className = "dead";
        this.setAttribute('data-status', 'dead');
      }
    };

    for (var h = 0; h < this.height; h++){
      for (var w = 0; w < this.width; w++){
          var currentCell = document.getElementById(w + "-" + h);
        currentCell.onclick = onCellClick;
      }
    }
    var that = this;
    var clearFunc = function (e){
      for (var h = 0; h < that.height; h++){
        for (var w = 0; w < that.width; w++){
          var currentCell = document.getElementById(w + "-" + h);
          currentCell.className = "dead";
          currentCell.setAttribute('data-status', 'dead');
        }
      }
    }
    var clearButton = document.getElementById('clear_btn');
    clearButton.addEventListener('click', clearFunc);
    
    var stepButton = document.getElementById('step_btn');
    stepButton.addEventListener('click', this.step.bind(this));  

    var playButton = document.getElementById('play_btn');
    playButton.addEventListener('click', this.enableAutoPlay.bind(this));     

    var resetButton = document.getElementById('reset_btn');
    resetButton.addEventListener('click', this.resetRandom.bind(this));    
  },

  step: function () {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game. 
      for (var h = 0; h < this.height; h++){
        for (var w = 0; w < this.width; w++){
          var currentCell = document.getElementById(w + "-" + h);
          currentCell.value = 0;
          currentCell.switched = 0;
          for (var hd = -1; hd < 2; hd++){
            for (var wd = -1; wd < 2; wd++){
              if(0 <= w+wd && w+wd < this.width){
                if(0 <= h+hd && h+hd < this.height){
                  if (!(wd === 0 && hd === 0)){
                    var currentNeighbor = document.getElementById((w+wd) + "-" + (h+hd));
                    if (currentNeighbor.className === "alive"){
                        currentCell.value++;
                    }
                  }
                }
              }
            }
          }
        }
      }
      for (var h = 0; h < this.height; h++){
        for (var w = 0; w < this.width; w++){
          var currentCell = document.getElementById(w + "-" + h);
          if (currentCell.className === "alive"){
            if (currentCell.value < 2 || currentCell.value > 3){
              currentCell.switched = 1;
              currentCell.className = "dead";
              currentCell.setAttribute('data-status', 'dead');
            }
          } else {
            if (currentCell.value === 3){
              currentCell.switched = 1;
              currentCell.className = "alive";
              currentCell.setAttribute('data-status', 'alive');
            }
          }
        }
      }
      this.totalSwitched.push(0);
      for (var h = 0; h < this.height; h++){
        for (var w = 0; w < this.width; w++){
          var currentCell = document.getElementById(w + "-" + h);
          if (currentCell.switched === 1){
            this.totalSwitched[this.iteration]++;
          }
        }
      }
      if ((this.iteration > 1) && (this.totalSwitched[this.iteration-1] === this.totalSwitched[this.iteration-2])){
        this.resetRandom();
      }
      this.iteration++;
      console.log(this.totalSwitched);
    },

  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
    // this.step()
    setInterval(this.step.bind(this), 5);
  },

  resetRandom: function(){
      for (var h = 0; h < this.height; h++){
        for (var w = 0; w < this.width; w++){
          var currentCell = document.getElementById(w + "-" + h);
          var choice = Math.round(Math.random());
          if (choice === 1){
            currentCell.className = "alive";
            currentCell.setAttribute('data-status', 'alive');
          } else {
            currentCell.className = "dead";
            currentCell.setAttribute('data-status', 'dead');
          }
        }
      }
  }
};

gameOfLife.createAndShowBoard();
