let $body = $("body");

const srcs = ["images/pentagon.png","images/hexagon.png"];
//empty matrix structure for board
const board =[
	["","",""],
	["","",""],
	["","",""]
];

var score = 0;
var highScore;
//initialize high score from local storage
if (!localStorage.getItem("highScore")) {
	localStorage.setItem("highScore",score);
} else {
	highScore = localStorage.getItem("highScore");
};

//Prototype for each box in the board (jewel containers)
function Box(row, col) {
	this.row = row;
	this.col = col;
	this.img = srcs[Math.floor(Math.random()*2)];
	//css/jquery attributes 
	this.div = $("<div>");
	this.div.attr("class",`box row-${row} col-${col}`);
	this.div.attr("id",`box${row}${col}`);
};

//Initialize box div with jewel image
Box.prototype.init = function() {
	let $img = $("<img>");
	$img.attr("src", this.img);
	this.div.append($img);
}

//Get image element from box prototype
Box.prototype.getImg = function () {
	return $(`#box${this.row}${this.col} img`);
}

//Gets boxes adjacent to selected jewel and adds neighbor class
Box.prototype.neighbors = function () {
	console.log("NEIGHBORS");
	let row = this.row;
	let col = this.col;

	let neighbors = [];
	//not on bottom
	if (row<2) {
		let below = board[row+1][col];
		neighbors.push(below);
	} 
	if (row>0) {
		let above = board[row-1][col];
		neighbors.push(above);
	}
	if (col<2) {
		let right = board[row][col+1];
		neighbors.push(right);
	}
	if (col>0) {
		let left = board[row][col-1];
		neighbors.push(left);
	}
	for (let each of neighbors) {
		let eachDiv = each.div; 
		eachDiv.addClass("neighbor");
	}
}

//Get box object corresponding to jquery element
function divToObject (divId) {
	console.log("DIV TO OBJECT");
	let i = parseInt(divId[3]); //row
	let j = parseInt(divId[4]); //col
	return board[i][j];
}

//Create initial board with randomized jewels
function createBoard() {
	updateScore();
	console.log("creating board");
	var $board = $("<div>");
	$board.attr("id","board");
	for (let i=0;i<3;i++) { 	// i = row
		for (let j=0;j<3;j++) { // j = column
			//create new box
			let box = new Box(i,j);
			box.init();
			board[i][j] = box;
			$board.append(box.div);
		}
	}
	$body.append($board);
	$(".box").on("click",firstJewel);
};

//Check all rows and columns for matches
function checkBoard () {
	console.log("CHECK BOARD");
	for (let i=0;i<3;i++) {
		checkRow(i);
		checkCol(i);
	}
	//remove jewels if there are matches
	if ($(".match").length) {
		setTimeout(removeMatches,200);
	}
	else {
		renderBoard();
	}
	updateScore();
}

//Display board from object array, add to DOM
function renderBoard() {
	//reset classes and event listeners
	$(".box").removeClass("selected first second neighbor remove match");	
	$(".box").off();
	$("#board").remove();
	var $board = $("<div>");
	$board.attr("id","board");
	for (let i=0;i<3;i++) {
		for (let j=0;j<3;j++) {
			let box = board[i][j];
			box.div.empty();
			box.init();
			box.div.on("click",firstJewel);
			$board.append(box.div);
		}
	}
	$body.append($board);
	$(".box").on("click",firstJewel);
}

//Update score in DOM
function updateScore() {
	$("#score").text(score);
	if (score > highScore) {
		localStorage.setItem("highScore",score);
		highScore = score;
		displayNewHighScore();
	}
	$("#highScore").text(highScore);
}

//First jewel has been selected
function firstJewel () {
	$(".box").off();
	// add class to first select jewel
	$(this).addClass("selected first");
	let box = divToObject(this.id);
	//get adjacent boxes, add neighbor class and event listener
	box.neighbors();
	$(".neighbor").on("click",secondJewel);
	//deselecting first jewel
	$(this).on("click",function() {
		renderBoard();
	});		
}

//Second jewel has been selected
function secondJewel () {
	$(this).addClass("selected second");
	$(".box").off();
	$(".box").removeClass("neighbor");
	let $first = $(".first");
	let firstBox = divToObject($first.attr("id"));
	let secondBox = divToObject(this.id);
	swapJewels(firstBox,secondBox);
}

//Swap selected jewels
function swapJewels(firstBox,secondBox) {
	//swap animation
	//second is to right of first;
	if (secondBox.col === firstBox.col+1) {
		secondBox.moveLeft();
		firstBox.moveRight();
	//second is to left of first
	} else if (secondBox.col === firstBox.col-1){
		secondBox.moveRight();
		firstBox.moveLeft();
	//second is below first
	} else if (secondBox.row === firstBox.row+1) {
		secondBox.moveUp();
		firstBox.moveDown();
	//second is above first
	} else if (secondBox.row === firstBox.row-1)  {
		secondBox.moveDown();
		firstBox.moveUp();	
	}
	//update object array with swapped images
	setTimeout(function() {
		let temp = firstBox.img;
		firstBox.img = secondBox.img;
		secondBox.img = temp;
		renderBoard();
		validMove(firstBox,secondBox);
	},1000);
}

//Check for Valid Move - Move is Valid if it Creates at Least One Match
function validMove(firstBox,secondBox) {
	let nonMatches = 0;
	if (!checkRow(firstBox.row)) {
		nonMatches = nonMatches +1;
	} 
	if (!checkRow(secondBox.row)) {
		nonMatches = nonMatches +1;
	}
	if (!checkCol(firstBox.col)) {
		nonMatches = nonMatches +1;
	}
	if (!checkCol(secondBox.col)) {
		nonMatches = nonMatches +1;
	}
	//move does not create any matches
	if (nonMatches === 4) {
		swapBack(firstBox,secondBox);
		return false;
	}
	setTimeout(removeMatches,200);
}

//Swap Jewels Back to Original Spots if Move is Invalid
function swapBack(firstBox,secondBox) {
	//second is to right of first;
	if (secondBox.col === firstBox.col+1) {
		console.log("right");
		secondBox.moveLeft();
		firstBox.moveRight();
	//second is to left of first
	} else if (secondBox.col === firstBox.col-1){
		console.log("left")
		secondBox.moveRight();
		firstBox.moveLeft();
	//second is below first
	} else if (secondBox.row === firstBox.row+1) {
		console.log("below")
		secondBox.moveUp();
		firstBox.moveDown();
	//second is above first
	} else if (secondBox.row === firstBox.row-1)  {
		console.log("above");
		secondBox.moveDown();
		firstBox.moveUp();	
	}
	setTimeout(function() {
		let temp = firstBox.img;
		firstBox.img = secondBox.img;
		secondBox.img = temp;
		renderBoard();
	},1000);
}

//Check row for a match
function checkRow(row) {
	if (board[row][0].img === board[row][1].img && board[row][1].img === board[row][2].img) {
		console.log("row " + row + " has a match");
		$(`.row-${row}`).addClass("match");
		return true;
	} else {
		return false;
	}
}

//Check column for a match
function checkCol(col) {
	if (board[0][col].img === board[1][col].img && board[1][col].img === board[2][col].img) {
		console.log("col " + col + " has a match",board[0][col].img ,board[1][col].img,board[2][col].img);
		$(`.col-${col}`).addClass("match");
		return true;
	} else {
		return false;
	}
}

//Remove jewels that have been matched
function removeMatches() {
	//if multiple matches made, user earns more points per removed jewel
	if ($(".match").length > 3) {
		score = score + $(".match").length*20;
		displayNice();
	}
	else {
		score = score + $(".match").length*10;
	}
	updateScore();
	$(".match").addClass("remove");
	//animate removal 
	$(".match img").animate({
		"width": "0px",
		"height": "0px",
		"left": "50%",
		"top": "50%",		
		"transition": "0.1s" 
	},"linear");
	//remove image attribute in box object
	$(".match").each(function(i,boxDiv) {
		let box = divToObject(boxDiv.id);
		box.img = " ";
	})
	setTimeout(renderBoard,600);
	setTimeout(shiftDown,600);
}

//Shift remaining jewels down to fill lower empty spots
function shiftDown() {
	for (let i=1;i>=0;i--) {
		for (let j=0;j<3;j++) {
			if (board[i+1][j].img === " ") {
				board[i][j].moveDown();
				board[i+1][j].img = board[i][j].img;
				board[i][j].img = " "; 
			}
		}			
	}
	//two loops if jewels need to shift down two rows
	for (let i=1;i>=0;i--) {
		for (let j=0;j<3;j++) {
			if (board[i+1][j].img === " ") {
				board[i][j].moveDown();
				board[i+1][j].img = board[i][j].img;
				board[i][j].img = " "; 
			}
		}			
	}
	setTimeout(renderBoard,500);
	setTimeout(replaceJewels,500);
}

//Replace Removed Jewels with Random New Ones
function replaceJewels() {
	for (let i=2;i>=0;i--) {
		for (let j=0;j<3;j++) {
			//checks for empty boxes
			if (board[i][j].img === " ") {
				setTimeout(function() {
					let src = srcs[Math.floor(Math.random()*2)];
					let box = board[i][j];
					//starting position
					let top = `${(i+1)*-150}px`;
					box.img = src;
					let imgDiv = box.getImg();
					imgDiv.attr("src",src);
					imgDiv.css("top",top);
					//move jewel down to corresponding box	
					imgDiv.animate({
						"top": "0px"
					}); 		
				},200);
			}
		}
	}
	setTimeout(renderBoard,500);
	setTimeout(checkBoard,800);	
}

//Animations for Moving Jewels Around Board
var mediaQuery = window.matchMedia( "(max-width: 600px)" );

Box.prototype.moveLeft = function () {
	let img = this.getImg(); 
	let distance = mediaQuery.matches ? "-110px" :"-150px";
	img.animate({
		"left": distance,
		"transition" : "0.5s"
	});
}
Box.prototype.moveRight = function () {
	let img = this.getImg(); 
	let distance = mediaQuery.matches ? "110px" :"150px";
	img.animate({
		"left": distance,
		"transition" : "0.5s"
	});
}
Box.prototype.moveDown = function (a) {
	let img = this.getImg(); 
	let distance = mediaQuery.matches ? "110px" :"150px";
	img.animate({
		"top": distance,
		"transition" : "0.5s"
	});
}
Box.prototype.moveUp = function (after) {
	let img = this.getImg(); 
	let distance = mediaQuery.matches ? "-110px" :"-150px";
	img.animate({
		"top": distance,
		"transition" : "0.5s"
	});
}

//Displays "NICE!" when more than one match is made in a single turn
function displayNice() {
	$('#nice').animate({
		"font-size":"110px",
		"opacity":"1",
		"z-index": "3"
	},600);

	$('#nice').animate({
		"opacity":"0",
		"font-size":"80px",
		"z-index": "-2"
	},600);
}

hasRun = false; //ensures new high score alert only displays once
//Displays "NEW HIGH SCORE!" when the user's high score has been beaten.
function displayNewHighScore() {
	if (hasRun === true) {
		return;
	} else {
		$('#newHighScore').animate({
			"font-size":"90px",
			"opacity":"1",
			"z-index": "3"
		},1000);

		$('#newHighScore').animate({
			"opacity":"0",
			"font-size":"80px",
			"z-index": "-2"
		},1000);
		hasRun = true;
	}
}

createBoard();
checkBoard();