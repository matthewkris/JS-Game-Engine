class Player {
    constructor(stageProps, engine) {
        
        this.engine = engine;
        
        this.width = 15;
        this.height = 15;
        this.x = 80;
        this.y = 80;
        this.speed = 6;
        this.velX = 0;
        this.velY = 0;
        this.jumping = false;
        this.grounded = false;
        this.stageProps = stageProps;
        
        this.debugX = document.getElementById('x');
        this.debugY = document.getElementById('y');
        this.levelId = document.getElementById('level');
    }

    move(horizontal, vertical) {
        
        horizontal = this.normalize(horizontal);
        this.velX += horizontal;
        this.velX = this.clamp(this.velX, this.speed);
        this.velX *= this.stageProps.friction;
        
        vertical = this.normalize(vertical);
        this.velY += vertical;
        this.velY = this.clamp(this.velY, this.speed);
        this.velY *= this.stageProps.friction;
                
        this.x += this.velX;
        this.y += this.velY;
        
        // check to see if we need to load a new level
        if(this.x < 0) {
            this.engine.stageProps.level = 2;
            
            // reset our player
            this.x = 80;
            this.y = 80;
        }
        
        //this.x = this.clamp(this.x, this.stageProps.width - this.width, 0);
        //this.y = this.clamp(this.y, this.stageProps.height - this.height, 0);
        
        /*
        if(this.y > this.stageProps.height - this.height) {
            this.y = this.stageProps.height - this.height;
        }
        */
        
        this.debugX.innerText = this.x;
        this.debugY.innerText = this.y;
        this.levelId.innerText = this.engine.stageProps.level;
    }

    draw(context) {
        context.fillStyle = "red";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    
    // move to a util - not really sure what this is doing
    clamp(i, v1, v2) {
        if (this.not(v2)) {
            v2 = -v1;
        }
        
        let minValue = Math.min(v1, v2);
        let maxValue = Math.max(v1, v2);
        
        if (i < minValue) {
            return minValue;
        }
        
        if (i > maxValue) {
            return maxValue;
        }
        
        return i;
    }
    
    normalize(i) {
        if(i < 0) {
            return -1;
        } else if (i >0) {
            return 1;
        } else {
            return 0;
        }
    }
    
    not(o){
        return o === undefined || o === null;
    }
}

export default Player;