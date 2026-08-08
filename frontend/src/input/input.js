class Input {
    constructor() {

        this.pressedKeys = new Set();

        this.justPressedKeys = new Set();

        this.pressedMouseButtons = new Set();

        this.justPressedMouseButtons = new Set();

        window.addEventListener("keydown",(event) => {

            const key = event.key.toLowerCase();
            
            if(!this.pressedKeys.has(key)) {

            this.justPressedKeys.add(key);
        }

        this.pressedKeys.add(key);
    
    });

        window.addEventListener("keyup",(event) => {
            
            const key = event.key.toLowerCase();
            
            this.pressedKeys.delete(key)});

        window.addEventListener("mousedown",(event) => {

            const button = event.button;

            if (!this.pressedMouseButtons.has(button)) {

                this.justPressedMouseButtons.add(button);

            }

            this.pressedMouseButtons.add(button);

        });

        window.addEventListener("mouseup",(event) => {

            const button = event.button;

            this.pressedMouseButtons.delete(button);

        });

        
    }

    endframe() {

        this.justPressedKeys.clear();
        this.justPressedMouseButtons.clear();
    }
}

export default Input