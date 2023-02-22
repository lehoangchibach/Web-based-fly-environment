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
        this.bulletCount = 0;
        this.gunCooldown = 0;
    }

    Update() {
        this.x += this.vel * Math.cos(this.dir * Math.PI);
        this.y -= this.vel * Math.sin(this.dir * Math.PI);
        this.dir += this.alpha;
        this.alpha += -this.alpha * 0.06;
        if (this.vel > 3) {
            this.vel -= Math.abs(this.alpha) * 3;
        }
        this.g = 1 / Math.abs(Math.cos(this.alpha * 360 * Math.PI))
        // console.log("vel: " + this.vel * 50 + "/ dir: " + this.dir + "/ alpha: " + (this.alpha * 180) + "/    \nG: " + this.g);
        if (this.bulletCount > 15) {
            if (Date.now() - this.gunCooldown > 3000) {
                this.bulletCount = 0;
                this.gunCooldown = 0
            }
            if (this.gunCooldown == 0) {
                this.gunCooldown = Date.now();
            }
        }
    }

    // direction = 1 \\ -1
    changeSpeed(direction) {
        if (direction < 0) {
            if (this.vel < 3) {
                return;
            }
        }
        this.vel += direction * this.delta_vel; // / (Math.abs(this.alpha * 360))
        if (this.vel < 0) {
            this.vel = 0;
        } else if (this.vel > 10) {
            this.vel = 10;
        }
    }

    // direction = 1 \\ -1
    changeDirection(direction) {
        this.alpha += direction * (this.vel * 50 / 10 + 7) / 180 / 20 / 15;
    }

    fireGun(color) {
        if (this.bulletCount <= 15) {
            objects.push(new Bullet(this.dir, this.x, this.y, color, objects.length, this.imageId))
            this.bulletCount++;
        }
    }
}


class Bullet {
    constructor(dir, x, y, color, id, owner) {
        this.color = color
        this.dir = dir;
        this.x = x;
        this.y = y;
        this.id = id;
        this.owner = owner
    }


    Update() {
        this.x += 20 * Math.cos(this.dir * Math.PI);
        this.y -= 20 * Math.sin(this.dir * Math.PI);
        if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
            objects.splice(2, 1)
        }
    }


    Draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, 2, 2);
    }
}