import Player from "../entities/player.js"
import Input from "../input/input.js"
import Platform from "../entities/Platform.js"
import Camera from "../camera/Camera.js"
import Enemy from "../entities/enemy.js"
import Floor from "../entities/Floor.js"
import Background from "../entities/background.js"

class Game {

    constructor(assets) {

        console.log("Game Created");

        this.height = 1080;
        this.width = 1920;
        this.worldWidth = 2900;

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        this.canvas.height = this.height;
        this.canvas.width = this.width;;

        document.body.appendChild(this.canvas);

        this.input = new Input();

        this.player = new Player(assets);

        this.enemy = new Enemy(assets);

        this.previousTimeStamp = 0;

        this.groundY = this.height - 150;

        this.platforms = [new Platform(500,780,300,80,assets.get("platform")), new Platform(1000,580,300,80,assets.get("platform")), new Platform(1500,380,300,80,assets.get("platform"))];

        this.camera = new Camera(this.player, this.width, this.height, this.worldWidth);

        this.floor = new Floor(0, this.groundY, this.worldWidth, this.height - this.groundY, assets.get("floor"));

        this.background = new Background(0, 0 , this.worldWidth, this.height, assets.get("background"));

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

        this.background.render(this.context, this.camera);
        this.floor.render(this.context, this.camera);

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