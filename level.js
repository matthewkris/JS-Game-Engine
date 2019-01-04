import Utilities from './utilities.js';
import Tile from './tile.js';

import { level_1, level_2 } from './level_1.js';

// 40x40
// 1280  = 32
// 720   = 18
// 576 total

class Level {
    constructor(engine) {
        this.utilities = new Utilities();
                
        this.engine = engine;
        this.x = 0;
        this.y = 0;
        this.width = 40; // this is of the tiles, we should more this to the tile object
        this.height = 40;
        
        this.loading = false;
        this.level = 1; // our default (should probably take this from props)
        this.load();
    }
    
    /**
     * Load the map into an array of tiles
     */
    load() {
        
        this.loading = true;
        console.log('Loading level...' + this.engine.stageProps.level);
        
        this.level = this.engine.stageProps.level; // set our level
        if(this.level == 1) {
            this.map = level_1;
        } else {
            this.map = level_2;
        }
        
		// create an array of tile objects based on the map
		var count = 1;
		this.tiles = []; 
		for (var i = 0; i < this.map.length; i++) { 
			
			var tile = new Tile(this.map[i], this.x, this.y, this.width, this.height);
			this.tiles.push(tile); // add tile to tiles array    
			
			this.x += this.width;
            count++;
			
            if(count == 33) { // move to a new row
                this.x = 0;
                this.y += this.height;
                count = 1;
            }
		}
        
        console.log(this.tiles);
        console.log('Loading Complete!');
        this.loading = false;
    }

    /**
     * Draw the map to screen
     */
    draw(context) {
		
        // if the map changes, load the new map
        if(this.engine.stageProps.level != this.level) {
            this.load();
        }
        
		this.tiles.forEach((tile) => {
            context.fillStyle = tile.color;
			context.beginPath();
            context.rect(tile.x, tile.y, tile.width, tile.height);
            context.fill();
            context.closePath();
		});
    }
    
    collide(player) {
        //player.grounded = false;
		
        this.tiles.forEach((tile) => {
			
			if(tile.collision) {
              var collisionInfo = this.utilities.collide(player, tile);
              if (collisionInfo) {
                switch(collisionInfo.direction) {
                  case 't': 
                    player.y += collisionInfo.overlap.oY; 
                    break;
                  case 'b':
                    player.y -= collisionInfo.overlap.oY; 
                    break;
                  case 'l':
                    player.x += collisionInfo.overlap.oX; 
                    break;
                  case 'r':
                    player.x -= collisionInfo.overlap.oX; 
                    break;
                }

                if (collisionInfo.direction == 'l' || collisionInfo.direction == 'r') {
                    player.velX = 0; 
                    //player.jumping = false;
                } else if (collisionInfo.direction == 'b') {
                    //player.grounded = true;
                    //player.jumping = false;
                } else if (collisionInfo.direction == 't') {
                    player.velY = 0;
                }
              }
          }
        });
    }
}

export default Level;