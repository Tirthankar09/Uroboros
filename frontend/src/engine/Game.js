    import Player from "../entities/player.js"
    import Input from "../input/input.js"

    class Game {
        constructor() {
            console.log("Game Created");

            this.height = 1920;
            this.width = 1080;

            this.canvas = document.createElement("canvas");
            this.context = this.canvas.getContext("2d");

            this.canvas.height = this.height;
            this.canvas.width = this.width;

            this.canvas.style.backgroundColor = "black";

            document.body.appendChild(this.canvas);

            this.input = new Input();
            this.player = new Player();

        }

        start() {
            requestAnimationFrame(() => this.gameloop());
        }

        gameloop() {

            this.update();

            this.render();


            console.log("Frame")
            requestAnimationFrame(() => this.gameloop());
        }

        update() {
            this.player.update(this.input);
        }

        render() {
            this.player.render(this.context);
        }
    }

    export default Game; 