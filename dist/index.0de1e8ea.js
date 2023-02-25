class AirPlane {
    constructor(imageId, x, y){
        this.imageId = imageId;
        this.x = x;
        this.y = y;
        this.vel = 0;
        this.dir = 0.5;
        this.delta_vel = 0.1;
        this.delta_alp = 0.01;
        this.alpha = 0;
        this.g = 0;
        this.bulletCount = 0;
        this.gunCooldown = 0;
        this.health = 150;
    }
    Update() {
        this.x += this.vel * Math.cos(this.dir * Math.PI);
        if (this.x > canvas.width) this.x -= canvas.width;
        else if (this.x < 0) this.x += canvas.width;
        this.y -= this.vel * Math.sin(this.dir * Math.PI);
        if (this.y > canvas.height) this.y -= canvas.height;
        else if (this.y < 0) this.y += canvas.height;
        this.dir += this.alpha;
        this.alpha += -this.alpha * 0.06;
        if (this.vel > 3) this.vel -= Math.abs(this.alpha) * 3;
        this.g = 1 / Math.abs(Math.cos(this.alpha * 360 * Math.PI));
        // console.log("vel: " + this.vel * 50 + "/ dir: " + this.dir + "/ alpha: " + (this.alpha * 180) + "/    \nG: " + this.g);
        if (this.bulletCount > 15) {
            if (Date.now() - this.gunCooldown > 3000) {
                this.bulletCount = 0;
                this.gunCooldown = 0;
            }
            if (this.gunCooldown == 0) this.gunCooldown = Date.now();
        }
    // console.log(this.imageId + " " + this.health);
    }
    // direction = 1 \\ -1
    changeSpeed(direction) {
        if (direction < 0) {
            if (this.vel < 3) return;
            this.vel += direction * this.delta_vel * 0.6;
            return;
        } else this.vel += direction * this.delta_vel; // 
        if (this.vel > 10) this.vel = 10;
    }
    // direction = 1 \\ -1
    changeDirection(direction) {
        this.alpha += direction * (this.vel * 50 / 10 + 7) / 180 / 20 / 15;
    }
    fireGun(color) {
        if (this.bulletCount <= 15) {
            objects.push(new Bullet(this.dir, this.x, this.y, color, objects.length, this.imageId));
            this.bulletCount++;
        }
    }
}
class Bullet {
    constructor(dir, x, y, color, id, owner){
        this.color = color;
        this.dir = dir;
        this.x = x + 20;
        this.y = y + 10;
        this.id = id;
        this.owner = owner;
    }
    Update() {
        this.x += 20 * Math.cos(this.dir * Math.PI);
        this.y -= 20 * Math.sin(this.dir * Math.PI);
        if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) objects.splice(2, 1);
        this.CheckBulletHit();
    }
    Draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 3, 3);
    }
    CheckBulletHit() {
        let distance;
        for(let i = 0; i < 2; i++){
            if (this.owner == objects[i].imageId) continue;
            distance = Math.sqrt((this.x - objects[i].x - 15) ** 2 + (this.y - objects[i].y - 30) ** 2);
            // console.log(this.owner);
            if (distance < 30) {
                // console.log("distance: " + distance);
                // console.log("hit");
                objects[i].health -= 1;
                document.getElementById("health_" + objects[i].imageId).style.width = Math.floor(objects[i].health / 1.5).toString() + "%";
            }
        }
    }
}

//# sourceMappingURL=index.0de1e8ea.js.map
