# Bejeweled Lite

[screenshot]

## What is Bejeweled Lite?

My game is a simplified version of bejeweled. It has only 2 different jewel types and is in a 3x3 game board instead of 8x8.  

## Technical Discussion

- HTML
- CSS
- JavaScript
- Jquery
- Sketch (for jewel pngs)

### Notes on Game Structure

The hardest part of making this game was getting the animations to work. I ended up using a lot of timeouts to make sure that the animations were able to run before a state change.This is the function I used to replace jewels in the game board after they were deleted.

```javascript
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
}```


## The Making of Bejeweled Lite

The background image is from flickr (labeled for reuse) posted by mehmetcanli00. I used MDN to help with jquery struggles.


## Opportunities for Future Growth

I think that I would expand the game to have more jewels and a bigger board, and then be able to add a losing state. The losing state in the original bejeweled game is when there are no more valid moves to be made, which is impossible with a 3x3 grid and 2 jewels.
