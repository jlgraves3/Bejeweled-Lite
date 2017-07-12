***Julia Graves / July 11 2017***

# Bejeweled (Lite) Proposal

## What is bejeweled lite?

Bejeweled is a puzzle game where given a grid filled with jewels of various colors, the user swaps jewels to get 3 of the same color consecutively. My version will be simplified with only 2 different kinds of jewels and a 3x3 grid instead of an 8x8 grid.


## Wireframe
game menu
<img src="https://git.generalassemb.ly/jgraves/LECTURE_U01_D10_Wireframing-Planning/blob/master/wireframes/menu.png?raw=true"/>
board
<img src="https://git.generalassemb.ly/jgraves/LECTURE_U01_D10_Wireframing-Planning/blob/master/wireframes/board.png?raw=true"/>
select jewels
<img src="https://git.generalassemb.ly/jgraves/LECTURE_U01_D10_Wireframing-Planning/blob/master/wireframes/select.png?raw=true"/>
switch jewels to get 3 in a row
<img src="https://git.generalassemb.ly/jgraves/LECTURE_U01_D10_Wireframing-Planning/blob/master/wireframes/switch%20to%20get%203%20in%20a%20row.png?raw=true"/>
update board
<img src="https://git.generalassemb.ly/jgraves/LECTURE_U01_D10_Wireframing-Planning/blob/master/wireframes/update%20with%20new%20row.png?raw=true"/>


## Initial thoughts on game structure

I think that moving pieces around might be hard, and updated the board with new jewels also seems like a challenge.

## Phases of Completion

(The steps or phases you expect to go through, and the tasks that you'll need to accomplish to reach each step. These should resemble the acceptance criteria we were working through earlier.)

- Game board setup
    - fill each square div with a randomly selected jewel
    - set score to 0
    
- User move
    - user selects 2 jewels
    - if second jewel selected is not adjacent to first, the first jewel is deselected and the second jewel becomes the first. 
    - if swapping the 2 jewels does not create a row or column of 3 consecutive jewels of the same type, move is invalid.
    - if move is valid and at least one group of 3 is created, the consecutive jewels disappear and jewels above shift down,         with 3 new random jewels coming in from the top.
    
- Check for 3 consecutive jewels 
    - both jewels involved in the swap must be checked to see if they are part of a vertical or horizontal group of 3. If they        are, then the user's score increases and the group of 3 jewels disappears and the game board is updated with new             jewels.
    
- Update board 
    - when a row or column of jewels disappears, they must be replaced with a new row or column with randomly selected jewels       in each square.
 
 - The game is never won, player just aims to beat their own score. The game is lost when no more swaps can be made.
    
    
## Links and Resources

https://www.miniclip.com/games/bejeweled/en/
