## sequence

1. GamePlay:
		Phase 1:
				- Everyone gets a question and codes their answer
				- Hacker gets the choice to bug someone
		Phase 2:
				- Hacker bugs the chosen guy's code
				- Debugger gets the choice to debug someone
				- Cyber Guardian can sus out someone and see if they were right
				- Developers are doing filler tasks
		Phase 3: 
				- Discussion and voting phase
				- hacker creates confusion
				- if debugger managed to debug the buggy code, Everyone's safe. Or else bugman is fired
				- if cyber guardian managed to find out who the sussy bakka was.. he should somehow get everyone to believe him without giving away his identity

		The game loops above phases until 
				- there's only two players including the hacker
				- the hacker's found and killed ruthelessly



## routes
/ ( get )

/login ( get, post )

/question ( post ) 

/lobby

/hacker ( get )
/debugger ( get )
/cyberGuardian ( get )
/developer ( get )

/endgame ( get )


## tools
html, css, javascript
mongodb
ejs
node.js

## Pages

0. Home
		- Game Desc
		- Login redirect

1. Login 	
		- username field
		- pass field
		- enter player's name
		- join a team
		- submit button

2. Lobby
		- ready status of team players
		- ready button
		- randomly assigns the roles when the game begins

3. Hacker 
		- [if its phase 1] gets to choose whom to bug
		- [if its phase 2] gets the chosen one's code to bug
		- gets a question just like other players
		- code execution and submission 

4. Debugger 
		- [if its phase 2] gets to choose whom to debug
		- [if its phase 3] gets the chosen one's code to debug
		- gets a question just like other players
		- code execution and submission 

5. Cyber guardian 
		- has the power to check if their sus is true (once per cycle)
		- gets a question just like other players
		- code execution and submission 

6. Developers
		- gets a question just like other players
		- code execution and submission 
		- can't even control their own fate..

7. Endgame
		- The results
		- showcasing the role of each player and their activity throughout the game
