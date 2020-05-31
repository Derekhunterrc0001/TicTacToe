// this keeps track of whos turn it is
let activePlayer="X";
//this array stores an array of moves. we use this to determin who wins
let selectedSquares=[];

//this is for placing a x or o in a square
function placeXOrO(squareNumber) {
    //this condition ensures a square hasnt been selected already
    //the .some is used to check each element of selectedSquare array to
    //see if it containes the square number clicked on
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //this varible retrives the html element id that was clicked
        let select=document.getElementById(squareNumber);
        //this condition checks whos turn is it
        if (activePlayer==="X") {
            select.style.backgroundImage="url('images/x.png')";
        } else {
            select.style.backgroundImage='url("images/o.png")';
        }
        selectedSquares.push(squareNumber+activePlayer);
        //this calls a function to check for any win conditions
        checkWinConditions();
        //this condition is for changing the active player
        if (activePlayer==="X") {
            activePlayer="O";
            //if active player anything other than x 
        } else {
            //change the activeplayer to x
            activePlayer='X';
        }

        //this plays the placement sound
        audio('./media/place.mp3');
        //this checks to see if it is the computers turn
        if(activePlayer==='O') {
            //this disables clicking for the computer choice
            disableClick();
            //this waits 1 sec before placing img and enableing click
            setTimeout(function() {computersTurn();},1500);
        }
        //returning true is needed for our computersTurn() to work
        return true;
    }
    //this results in a random square being selected
    function computersTurn() {
        //this boolean is needed for our while loop
        let success= false
        //this stores a random number 0 to 8
        let pickASquare;
        //this alows our while loop to keep
        //trying if a square is selected already
        while(!success) {
            //a random number 0 to 8 is selected
            pickASquare=String(Math.floor(Math.random() *9));
            //if the randow num evealuates return true, the square hasnt been selected yet
            if (placeXOrO(pickASquare)) {
                //this line calls the function
                placeXOrO(pickASquare);
                //this changes our boolean and ends the loop
                success=true;
            };
        }
    }
}
//this parses the selcetedSquares array to search for win conditions.
//drawWinLine is called to draw line if condition is met.
function checkWinConditions() {
    // x 0,1,2 condition.
    if (arrayIncludes('0X','1X','2X')) {drawWinLine(50,100,558,100);}
    //x 3,4,5, condition
    else if (arrayIncludes('3X','4X','5X')) {drawWinLine(50,304,558,304);}
    //x 3,7,8, condition
    else if (arrayIncludes('6X','7X','8X')) {drawWinLine(50,508,558,508);}
    //x 0,3,6, condition
    else if (arrayIncludes('0X','3X','6X')) {drawWinLine(100,50,100,558);}
    // x 1, 4, 7, condition
    else if (arrayIncludes('1X','4X','7X')) {drawWinLine(304,50,304,558);}
    // x 2, 5, 8, condition
    else if (arrayIncludes('2X','5X','8X')) {drawWinLine(508,50,508,558);}
    // x 6,4,2, condition
    else if (arrayIncludes('6X','4X','2X')) {drawWinLine(100,508,510,90);}
    //x 0,4,8, condtion
    else if (arrayIncludes('0X','4X','8X')) {drawWinLine(100,100,520,520);}
    // o 0,1,2, condition
    else if (arrayIncludes('0O','1O','2O')) {drawWinLine(50,100,558,100);}
    //o 3,4,5, condition
    else if (arrayIncludes('3O','4O','5O')) {drawWinLine(50,304,558,304);}
    //o 3,7,8, condition
    else if (arrayIncludes('6O','7O','8O')) {drawWinLine(50,508,558,508);}
    //o 0,3,6, condition
    else if (arrayIncludes('0O','3O','6O')) {drawWinLine(100,50,100,558);}
    //o 1, 4, 7, condition
    else if (arrayIncludes('1O','4O','7O')) {drawWinLine(304,50,304,558);}
    //o 2, 5, 8, condition
    else if (arrayIncludes('2O','5O','8O')) {drawWinLine(508,50,508,558);}
    //o 6,4,2, condition
    else if (arrayIncludes('6O','4O','2O')) {drawWinLine(100,508,510,90);}
    //o 0,4,8, condtion
    else if (arrayIncludes('0O','4O','8O')) {drawWinLine(100,100,520,520);}
    //this condition checks for a tie. if none of the above conditions register
    // and 9 squares are selected, the code executes
    else if (selectedSquares.length >= 9) {
        //this plays the tie games sound
        audio('./media/tie.mp3');
        //this sets a .3 sec timer berfore the resestGame is called.
        setTimeout(function () {resetGame();},1500);
    }
    //this checks if an array includes 3 strings
    //it is used to check for each win condition
    function arrayIncludes(squareA, squareB, squareC) {
        //the next 3 will be used to check for 3 in a row
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //if the 3 we pass are all included in our array true is
        //returned and our else if condition executes the drawwinline
        if ( a === true && b === true && c === true) { return true; }
    }
}
//this function makes our body element temporarily unclickable
function disableClick() {
    //this makes our body unclickable
    body.style.pointerEvents='none';
    //this makes our body clickable again after 1 sec
    setTimeout(function() {body.style.pointerEvents='auto';},1500);
}
//this takes a string parameter of the path you set earlier for
//placement sound ('./media/place.mp3)
function audio(audioURL) {
    //we creat a new audio object and we pass the path as a parameter
    let audio=new Audio(audioURL);
    //play method plays our sound
    audio.play();
}
//this function utilizes html canvas to draw win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //this line accesses our html canvas element
    const canvas = document.getElementById('win-lines');
    //this line gives us access to methods and properties to use on canvas
    const c = canvas.getContext('2d');
    //this line indicates where the start of a lines x axis is
    let x1 = coordX1,
        //this is where the start of y axis is
        y1 = coordY1,
        //end of x axis
        x2 = coordX2,
        //end of y axis
        y2 = coordY2,
        //store temp x axis data we update in our animation loop
        x = x1,
        //store temp y axis data we update in our animation loop
        y = y1;
        //this function interacts with the canvas
        function animateLineDrawing() {
            //this function creates the loop for when the game ends it restarts
            const animationLoop = requestAnimationFrame(animateLineDrawing);
            // this method clears content from last loop itieration
            c.clearRect(0,0,608,608);
            //this method starts a new path
            c.beginPath();
            //this moves us to a starting point for our line
            c.moveTo(x1,y1);
            //this method indicates the end point of our line
            c.lineTo(x,y);
            //this method sets the width of our line
            c.lineWidth = 10;
            //this method sets the color of our line
            c.strokeStyle = 'rgba(70,225,33,0.8)';
            //this method draws everything we laid out above
            c.stroke();
            //this condition checks to see if we have reached the end point
            if (x1<=x2 &&y1<=y2) {
                //this condition adds 10 to the previous end x point
                if (x < x2) {x+=10;}
                //this condition adds 10 to the previous end y point
                if (y<y2) {y+=10;}
                //this condition cancles our animation loop if reach the end point
                if (x>=x2 && y>=y2) { cancelAnimationFrame(animationLoop);}
            }
            //this condition is similar to the one above
            //it was necessary for the 6,4,2 win condition
            if (x1 <=x2 && y1 >=y2) {
                if (x<x2) {x+=10;}
                if (y>y2) {y-=10;}
                if (x>=x2 && y<=y2) {cancelAnimationFrame(animationLoop);}
            }
        }
        //this function clears our canvas after our win line is drawn
        function clear() {
            //this line starts our animation loop
            const animationLoop = requestAnimationFrame(clear);
            //this line clears our canvas
            c.clearRect(0,0,608,608);
            //this line stops our animation loop
            cancelAnimationFrame(animationLoop);
        }
        //this line disallows clicking while the win sound is playing
        disableClick();
        //this line plays the win sound
        audio('./media/7bullets.mp3');//Sound from Zapsplat.com
        //this line calls our main animation loop
        animateLineDrawing();
        //this line waites one sec
        //then, clears canvas, resets game, and allows clicking again
        setTimeout(function() {clear(); resetGame(); }, 1500);
}
//this function resets the game in a tie or a win
function resetGame() {
    //this for loop iterates through each html square element
    for (let i=0; i<9; i++) {
        //this variable gets the html element of i
        let square=document.getElementById(String(i));
        //this removes our elements background image
        square.style.backgroundImage='';
    }
    //this resets our array so it is empty and we can start over
    selectedSquares= [];
}



