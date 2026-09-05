import Player from "../entities/player.js"
import Input from "../input/input.js"
import Platform from "../entities/Platform.js"
import Camera from "../camera/Camera.js"
import Enemy from "../entities/enemy.js"

class Game {

    constructor(assets) {

        console.log("Game Created");

        this.height = 860;
        this.width = 1900;
        this.worldWidth = 2900;

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        this.canvas.height = this.height;
        this.canvas.width = this.width;

        this.canvas.style.backgroundColor = "black";

        document.body.appendChild(this.canvas);

        this.input = new Input();

        this.player = new Player(assets);

        this.enemy = new Enemy(assets);

        this.previousTimeStamp = 0;

        this.groundY = this.height - 100;

        this.platforms = [new Platform(300,600,500,40), new Platform(900,450,300,40), new Platform(1400,300,250,40)];

        this.camera = new Camera(this.player, this.width, this.height, this.worldWidth);

    }

    start() {

        requestAnimationFrame((timestamp) => this.gameloop(timestamp));
    } 

    gameloop(timestamp) {

        if(this.previousTimeStamp === 0) {
            this.previousTimeStamp = timestamp;

            requestAnimationFrame((timestamp) => this.gameloop(timestamp));

            return;
        }
        
        let deltatime = (timestamp - this.previousTimeStamp) / 1000;

        deltatime = Math.min(deltatime, 0.05);

        this.previousTimeStamp = timestamp;

        this.update(deltatime);

        this.render();

        this.input.endframe();

        requestAnimationFrame((timestamp) => this.gameloop(timestamp));
    }

    update(deltatime) {

        this.player.update(deltatime, this.input, this.groundY, this.worldWidth, this.platforms, this.enemy);
        this.enemy.update(deltatime,this.groundY, this.platforms, this.player);
        this.camera.update();
    }

    render() {

        this.context.fillStyle = "black";
        this.context.fillRect(0,0,this.width,this.height);

        for (const platform of this.platforms) {
            platform.render(this.context, this.camera);
        }
        
        this.enemy.render(this.context, this.camera);
        this.player.render(this.context, this.camera);
        if(this.player.isDead() && this.player.deadAnimationFinished && this.player.deadScreenReady) {
            this.context.fillStyle = "rgba(0, 0, 0, 0.6)";
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.context.fillStyle = "red";
            this.context.font = "bold 60px Lucida Console";
            this.context.textAlign = "center";
            this.context.fillText("YOU DIED.",this.canvas.width / 2,this.canvas.height / 2);
        }

    }
}

export default Game; 