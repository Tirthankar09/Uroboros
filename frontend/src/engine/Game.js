    import Player from "../entities/player.js"
    import Input from "../input/input.js"
    import Platform from "../entities/Platform.js";

    class Game {

        constructor() {

            console.log("Game Created");

            this.height = 900;
            this.width = 1900;

            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext("2d");

            this.canvas.height = this.height;
            this.canvas.width = this.width;

            this.canvas.style.backgroundColor = "black";

            document.body.appendChild(this.canvas);

            this.input = new Input();
            this.player = new Player();

            this.previousTimeStamp = 0;

            this.groundY = this.height - 100;

            this.platforms = [new Platform(500,600,400,40), new Platform(900,450,300,40), new Platform(1400,300,250,40)];
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
            
            const deltaTime = (timestamp - this.previousTimeStamp) / 1000

            this.previousTimeStamp = timestamp;

            this.update(deltaTime);

            this.render();

            this.input.endframe();

            requestAnimationFrame((timestamp) => this.gameloop(timestamp));
        }

        update(deltaTime) {

            this.player.update(deltaTime, this.input, this.groundY, this.width, this.platforms);

        }

        render() {

            this.context.fillStyle = "black";
            this.context.fillRect(0,0,this.width,this.height);

            for (const platform of this.platforms) {
                platform.render(this.context);
            }
            
            this.player.render(this.context);

        }
    }

    export default Game; 