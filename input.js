// https://gablaxian.com/articles/creating-a-game-with-javascript/handling-user-input
class Input {
    constructor() {
        
        this.UP_ARROW = 38;
        this.RT_ARROW = 39;
        this.LT_ARROW = 37;
        this.DN_ARROW = 40;
        this.SPACE = 32;
        
        this.ESC = 27;

        this.keys = [];

        window.addEventListener('keydown', (e) => {
            this.keys[e.keyCode] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.keyCode] = false;
        });
    }

    check(key) {
        return this.keys[key];
    }

    getHorizontal() {
        let r = this.check(this.RT_ARROW);
        let l = this.check(this.LT_ARROW);
        
        if(r && l) {
            return 0;
        } else if(r) {
            return 1;
        } else if(l) {
            return -1;
        } else {
            return 0;
        }
        //return r && l ? 0 : r ? 1 : l ?  -1 : 0;
    }

    getVertical() {
        let u = this.check(this.UP_ARROW);
        let d = this.check(this.DN_ARROW);
        
        if(u && d) {
            return 0;
        } else if(u) {
            return -1;
        } else if(d) {
            return 1;
        } else {
            return 0;
        }
        
        //return u && d ? 0 : u ? 1 : d ?  -1 : 0;
        //return this.check(this.UP_ARROW) || this.check(this.SPACE);
    }
}

export default Input;