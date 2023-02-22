class AirPlane {
    constructor(imageId, x, y) {
        this.imageId = imageId;
        this.x = x;
        this.y = y;
        this.vel = 0;
        this.dir = 1 / 2;
        this.delta_vel = 0.2;
        this.delta_alp = 0.01;
        this.alpha = 0;
        this.g = 0;
    }

    Update() {
        this.x += this.vel * Math.cos(this.dir * Math.PI);
        this.y -= this.vel * Math.sin(this.dir * Math.PI);
        this.dir += this.alpha;
        this.alpha += -this.alpha * 0.06;
        this.vel -= Math.abs(this.alpha) * 3;
        // this.g = 1 / (this.alpha * 20 * Math.PI)
        console.log("vel: " + this.vel * 50 + "/ dir: " + this.dir + "/ alpha: " + this.alpha + "/    G: " + this.g);

    }

    // direction = 1 \\ -1
    changeSpeed(direction) {
        this.vel += direction * this.delta_vel;
        if (this.vel < 0) {
            this.vel = 0;
        } else if (this.vel > 10) {
            this.vel = 10;
        }
    }

    // direction = 1 \\ -1
    changeDirection(direction) {
        this.alpha = direction * (this.vel * 50 / 10 + 7) / 180 / 20;
    }
}