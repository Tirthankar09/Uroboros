class Input {
    constructor() {

        this.pressedKeys = new Set();

        window.addEventListener("keydown",(event) => {this.pressedKeys.add(event.key.toLowerCase());
        });

        window.addEventListener("keyup",(event) => {this.pressedKeys.delete(event.key.toLowerCase());
        });

    }
}

export default Input