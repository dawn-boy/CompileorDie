# Erebor
Players are secretly assigned roles as either Hackers or Developers. The Hackers' goal is to sabotage the code and cause a system crash, while the Developers must work together to find the Hackers and fix the broken code before it's too late. Special roles like the Debugger, who can fix corrupted code, and the Cyber Guardian, who can investigate other players, add complexity and excitement to the game.

## Sequence
- Phase 1:
  - Everyone gets a question and codes their answer
  - Hacker gets the choice to bug someone
- Phase 2:
  - Hacker bugs the chosen guy's code
  - Debugger gets the choice to debug someone
  - Cyber Guardian can sus out someone and see if they were right
  - Developers are doing filler tasks
    
- Phase 3:
  - Discussion and voting phase
  - hacker creates confusion
  - if debugger managed to debug the buggy code, Everyone's safe. Or else bugman is fired
  - if cyber guardian managed to find out who the sussy bakka was.. he should somehow get everyone to believe him without giving away his identity

- The game loops above phases until
   - there's only two players including the hacker
   - the hacker's found and killed ruthelessly



## Routes
- / ![req](https://img.shields.io/badge/get-blue)
- /login ![req](https://img.shields.io/badge/get-blue) ![req](https://img.shields.io/badge/post-red)
- /question ![req](https://img.shields.io/badge/post-red)
- /lobby ![req](https://img.shields.io/badge/get-blue)
- /hacker ![req](https://img.shields.io/badge/get-blue)
- /debugger ![req](https://img.shields.io/badge/get-blue)
- /cyberGuardian ![req](https://img.shields.io/badge/get-blue)
- /developer ![req](https://img.shields.io/badge/get-blue)
- /endgame ![req](https://img.shields.io/badge/get-blue)


## Tech-stack
### Front-end
1. HTML
2. CSS
3. Javascript
4. EJS

### Back-end
1. Node.js
2. MongoDB
   
## Pages

0. Home
   - Game Desc
   - Login redirect

2. Login
   - username field
   - pass field
   - enter player's name
   - join a team
   - submit button

4. Lobby
   - ready status of team players
   - ready button
   - randomly assigns the roles when the game begins

6. Hacker
   - [if its phase 1] gets to choose whom to bug
   - [if its phase 2] gets the chosen one's code to bug
   - gets a question just like other players
   - code execution and submission 

8. Debugger
   - [if its phase 2] gets to choose whom to debug
   - [if its phase 3] gets the chosen one's code to debug
   - gets a question just like other players
   - code execution and submission 

10. Cyber guardian
    - has the power to check if their sus is true (once per cycle)
    - gets a question just like other players
    - code execution and submission 

12. Developers
    - gets a question just like other players
    - code execution and submission
    - can't even control their own fate..

14. Endgame
		- The results
		- showcasing the role of each player and their activity throughout the game
