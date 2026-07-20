class Camera {
    constructor(target, width, height, worldWidth) {
        this.target = target;
        this.width = width;
        this.height = height;
        this.worldWidth = worldWidth

        this.x = 0;
        this.y = 0;

        this.deadZoneWidth = 500;
        this.deadZoneLeft = (this.width - this.deadZoneWidth) / 4;
        this.deadZoneRight = this.deadZoneLeft + this.deadZoneWidth;
    }

    update() {

        const playerScreenX = this.target.x - this.x;

        if(playerScreenX > this.deadZoneRight) {
            this.x += playerScreenX - this.deadZoneRight;
        }

        if(playerScreenX < this.deadZoneLeft) {
            this.x -= this.deadZoneLeft - playerScreenX;
        }

        if (this.x < 0) {
            
            this.x = 0;
        }

        if (this.x + this.width > this.worldWidth) {

            this.x = this.worldWidth - this.width;

        }


}
}
export default Camera