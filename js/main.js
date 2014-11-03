var player1 = true,
 	counter = 0,
 	active = true, // Is the game active or not

 	board = $("#board"),
 	start_game_button = $("#start_game"),
 	sideboard = $("#sideboard"),
 	container = $("#container"),
 	winner_container = $("#winner-container"),
 	reset_button = $("#reset");


// Load up our game upon clicking then hide button
start_game_button.click(function(){
	load_Game()
	start_game_button.hide()
})

// Empty the previous board, reset vars and create a 3x3 grid. Last call is a function that checks
// which player's turn it is and displays the correct image (cat!).
function load_Game(){

board.empty()
winner_container.empty()
reset_button.hide()
active = true
player1 = true
createBoard(3)
current_player_show()


function createBoard(v){
  // Create a div for our current player image
  var current_player_div = $("<div></div>").addClass("current_player")
  	// Create 3 rows
    for (var i = 0; i < v; i++){
       row = document.createElement("div");
       row.className = "row " + "row" + i;
       row.setAttribute("data-row", i)   
       // Create 9 cells
       for(var j=0; j < v; j++){
        cell = document.createElement("div");
     	token = document.createElement("div");
        cell.className = "cell " + "cell" + j;
        cell.setAttribute("data-cell", j)
        token.className = "token";
        row.appendChild(cell);
        cell.appendChild(token);

       }

       board.append(row)
    }
    // Create the matrix - Our "back-end" logic that connects to the front-end grid we created above.
    // We work with the matrix to deal wth the computations and conditional logic that allows our
    // game to come alive.
    matrix = new Array(3);
	for (var i = 0; i < matrix.length; i++) {
	matrix[i] = new Array(3);
	}

// Append the div we created at the very start of this function to the HTML generated div.
// Add the "my turn" content that sits next to the image of the cat
 winner_container.append(current_player_div)
 current_player = $(".current_player")
 current_player.html("<span>My Turn!</span>")

} //createBoard END

// Check which player's turn it is, then show the relevant image
function current_player_show(){
	
	if ( player1 === true ) {
		current_player.removeClass("sox")
		current_player.addClass("snowy")
	} else if ( player1 === false ) {
		current_player.removeClass("snowy")
		current_player.addClass("sox")
	  }

}

// When a user clicks on a cell
$( ".cell" ).click(function() {

	
	clickedRow = $(this).parent().attr('data-row') 
	clickedCell = $(this).attr("data-cell")
	token = $(this).find('div')

	// Check first if that square is already occupied, in this case alert the user to try another cell
	if ( $(this).find('div').hasClass( "snowy" ) || $(this).find('div').hasClass( "sox" ) ){
		alert("Hey! Stop poking me")
	} else if (active === true){ // user clicks an empty cell

		if (player1 === true) {  // I'm breaking the DRY rule here (dont repeat yourself) sorry!
			token.css("display", "block") // CSS and classes for occupied cell styles
	  		token.addClass("snowy")
	  		token.css("border", "none")
	  		token.addClass("expandOpen")

	  		matrix[clickedRow][clickedCell] = "p1" // to show this matrix cell is now occupied
	  		
	  		counter++ // add one to the turn counter
	  		win_condition_check() // check if our player has won
	  		player1 = false; // Set variable to player 2
	  		
		}

	  	else if (player1 === false) { 
			token.css("display", "block")
	  		token.addClass("sox")
	  		token.addClass("expandOpen")
	  		matrix[clickedRow][clickedCell] = "p2"
	  		
	  		counter++
	  		win_condition_check()
	  		player1 = true

	  		
	  	}
	  	
	  	current_player_show() 

	}




}); // End click_cell event listener

// A button that appears to reload the game
$("#reset").click(function(){ 
	
	current_player.removeClass("snowy sox")
	load_Game()
	counter = 0
	start_game_button.hide()


})





function win_condition_check(){ // Another naughty implentation, sorry again. I've used a lot of conditional logic, attempting to scale it down only met with errors and tears.

	// Check the console.logs for the intended results.
	if (counter === 5 || 7 || 9) { // If it's player one's turn
  	  for (var x = 0; x <= (matrix.length -1); x++) { // cycle the matrix rows...
		for (var y = 0; y <= (matrix[0].length -1); y++) { // ...and cycle the matrix cells

			if ((matrix[x][0]) === "p1" && (matrix[x][1]) === "p1" && (matrix[x][2]) === "p1") { // If our cell has been 'tagged' p1 given x is (e.g 0) then: x0y0, x0y1, x0y2 would mean player one has 3 horizontal cells in a line = victory!
				if (player1 === true){
				console.log("horizontal victory")
				console.log("player1 wins")
				winner_show()
				return;

				}
			}

			else if	((matrix[0][y]) === "p1" && (matrix[1][y]) === "p1" && (matrix[2][y]) === "p1") { // Repeated for other conditions
				if (player1 === true){
				console.log("vertical victory")
				console.log("player1 wins")
				winner_show()
				return;
				}
			}
			else if ((matrix[0][0]) === "p1" && (matrix[1][1]) === "p1" && (matrix[2][2]) === "p1") {
				if (player1 === true){
				console.log("LtopRdown diagonal")
				console.log("player1 wins")
				winner_show()
				return;
				}
			} 
			else if	((matrix[0][2]) === "p1" && (matrix[1][1]) === "p1" && (matrix[2][0]) === "p1") {	
				if (player1 === true){
				console.log("Rtop Ldown diagonal")
				console.log("player1 wins")
				winner_show()
				return;
				}
			}
			
		}
	
	  }  
	} // End player one check


	if (counter === 6 || 8 ) {	// Now for player 2
	  	  for (var x = 0; x <= (matrix.length -1); x++) {
			for (var y = 0; y <= (matrix[0].length -1); y++) {

				if ((matrix[x][0]) === "p2" && (matrix[x][1]) === "p2" && (matrix[x][2]) === "p2") {
				
				console.log(player1)

				if (player1== false) {
					console.log("horizontal victory")
					console.log("player2 wins")
					winner_show()
					return;
					}
				}

				else if	((matrix[0][y]) === "p2" && (matrix[1][y]) === "p2" && (matrix[2][y]) === "p2") {
				if (player1== false) {
					console.log("vertical victory")
					console.log("player2 wins")
					winner_show()
					return;
					}
				}
				else if ((matrix[0][0]) === "p2" && (matrix[1][1]) === "p2" && (matrix[2][2]) === "p2") {
				if (player1== false) {	
					console.log("LtopRdown diagonal")
					console.log("player2 wins")
					winner_show()
					return;
					}	
				}
				
				else if	((matrix[0][2]) === "p2" && (matrix[1][1]) === "p2" && (matrix[2][0]) === "p2") {	
					if (player1== false) {
					console.log("Rtop Ldown diagonal")
					console.log("player2 wins")
					winner_show()
					return;
					}
				}
				
				
			}
	
		}	
	} // End player 2 check

	// In the case of a DRAW. We announce this and allow the users to play again
	if (counter >= 9 && active == true){

	
		reset_button.show()
		active = false	
		current_player.hide()
		winner_none = document.createElement("div");
		winner_none.setAttribute("id", "winner_none")
	    winner_none.setAttribute("class", "winner none")
	    winner_none.innerHTML = "<span>" + 'It\'s a draw!' + "</span>"
	    winner_container.append(winner_none)
	}

} // Function win_condition_check END


function winner_show(){ 
	
	if (player1 == true) { // a bit confusing, but basically, if the game has finished player 2 has finished 
		winner_snowy_div = document.createElement("div");
		winner_snowy_div.setAttribute("id", "winner_snowy")
	    winner_snowy_div.setAttribute("class", "winner snowy")
	    winner_snowy_div.innerHTML = "<span>" + 'I Win!' + "</span>"
	    winner_container.append(winner_snowy_div)
		
		reset_button.show()
		active = false
		current_player.hide()
	}

	if (player1 == false) {
		winner_sox_div = document.createElement("div");
		winner_sox_div.setAttribute("id", "winner_sox")
	    winner_sox_div.setAttribute("class", "winner sox")
	    winner_sox_div.innerHTML = "<span>" + 'I Win!' + "</span>"
	    winner_container.append(winner_sox_div)
	
		reset_button.show()
		active = false	
		current_player.hide()	
	}
}


} // Load Game end


