class Game {
    constructor() {
        console.log("Game Created");

        this.height = 1920;
        this.width = 1080;

        this.canvas = document.createElement("canvas");

        this.canvas.height = this.height;
        this.canvas.width = this.width;

        this.canvas.style.backgroundColor = "black";

        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = "red";
        this.context.fillRect(100,100,200,100);

        document.body.appendChild(this.canvas);
    }

    start() {
        console.log("Game Started");
    }
}

export default Game; 