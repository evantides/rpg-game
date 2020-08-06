This project uses HTML, Javascript, and CSS to make an RPG video game. It's more text based, than anything.

**PLAY THE GAME HERE:** https://rpg-game.vercel.app/

I worked primarily on getting the DOM elements to display the way I wanted them to. But, shortly after figuring out ways to create reusable functions for the DOM elements, I moved forward with creating more of the logic and the basic skeleton of the game.

The app.js contains onload functions (though, it is housed within the body of the HTML, so it doesn't actually have any onload functions). App.js uses a lot of jquery to manipulate the DOM.

Class.js contains all the class declarations I needed for my project. I used factories and normal classes.

Logic.js contains, you guessed it, the logic for the game.

All three files speak to one another, and I found it interesting (and eye-opening) getting them to be able to speak to one another. One interesting thing I noticed was that if I didn't delcare a function within a function using Let or Const, the function is accessible outside the function it was originally housed in. I don't know if that's because it's defaulting to Var, or if there is something else there. That being said, this functionality was very helpful within my gameLoop function.

```
**************
UNSOLVED PROBLEMS
**************
```

1. _Timing of the DOM elements dispalying on the screen_
   - The issue I had with getting DOM elements to display at the right times was both time consuming to work through, and has yet to be actually fixed. Some of the elements appear too soon, others too late, and the gameplay is a little janky because of it. That being said, the game is still playable, and has a win and lose state! So I figured the problem could be resolved in future updates.
2. _RPG Elements need cleaning up!_
   - In the case of this no-name bare-bones idea for an RPG, you fight enemies and that's about it. There is no functionality with the 'run away' button, but the idea behind it is that you can waste a turn trying to escape. I had initially envisioned a lot more gameplay wise, but time constraints and life made reaching those stretch goals difficult. Due to this, it's really not an RPG so much as a fighting game? But it has elements of RPG as you can name your character.
     Game genre decisions aside, I'm still really proud of this.

---

Future Updates~

---

1. **MUSIC**
2. **Better visuals**
   - I had a friend help me create the sprites used, but I'd like more of a unified look to the game later on down the road.
3. **Session or Local Storage**
   - store high scores
4. **More levels**
   - I'd like to create a more labrynthine story with various options to throw the user into a more immersive experience. After all, it's just a text game.
5. **AUDIO CUES**
   -sounds like swords hitting one another woudl be so cool. Footsteps to denote enemies.
6. **REVAMP ENEMIES**
   -add different weapons. upgrade enemies' health and attack as the game progresses. Give them names instead of Ruffian #. Instantiate bosses as well (there is definitely some framework for this in the code, but has yet to be fully implemented)
7. **CLASSES FOR THE USER... include magic maybe?**
   - and on the back of that, add mana potions to go along with health.
8. **STORY**
   -Including NPCs you can talk to! That'd be fun.
