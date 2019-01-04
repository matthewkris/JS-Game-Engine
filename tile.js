class Tile {
    constructor(type, x, y, width, height) {
		this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
		
		this.collision = true;
		switch(type) {
			case 0:
				this.color = "black";
				this.collision = false;
				break;
			case 1:
				this.color = "green";
				break;
            case 2:
				this.color = "blue";
                this.collision = false;
				break;
        }
    }
}

export default Tile;