// https://github.com/washingtonsteven/js-canvas-platformer/tree/95927ec3ff837ff3128472370b3b9f7b48464341
import Player from './player.js';
import Input from './input.js';
import Level from './level.js';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    GAMEOVER: 3
}

// target 60 FPS
// the interval between animation ticks, in ms (1000 / 60 = ~16.666667)

class Engine {

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.context = canvas.getContext("2d");
        
        this.stageProps = {
            fps: 60,
            fpsInterval: 1000 / 60, // the interval between animation ticks in ms (1000 / 60 = ~16.666667)
            width: 1280,
            height: 720,
            friction: 0.8,
            gravity: 0,
            gamestate: GAMESTATE.RUNNING,
            level: 1
        };
		
        this.last = 0;
        this.frames = 0;
        
        this.player = new Player(this.stageProps, this);
        this.input = new Input();
        this.level = new Level(this);
                
        window.addEventListener("load", () => { this.loop(); } );
    }
    
    loop() {
        
        let now = window.performance.now(); // set now
        let deltaTime = now - this.last; // get the difference since the last update
        this.last = now; // set our last

        if(this.gamestate == GAMESTATE.PAUSED) { 
            return;
        }
        
        // clear the frame
        this.context.clearRect(0, 0, this.stageProps.width, this.stageProps.height);
        
        // move player
        this.player.move(this.input.getHorizontal(), this.input.getVertical());
        
        // check collision - this would be a good place to check and see if we've left a level
        this.level.collide(this.player);
        
        // draw map
        this.level.draw(this.context);
        
        // draw
        this.player.draw(this.context);
       
		// this.context.font = "30px Arial";
		// this.context.fillText(this.deltaTime, 10, 50);
        
        // loop
        requestAnimationFrame(() => { 
            this.loop(); 
        });
    }
    
    updateGameState(gamestate) {
        this.gamestate = gamestate;
    }
    
    togglePause() {
        if(this.gamestate == GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        }
    }
}

// browser support
let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

let engine = new Engine();
