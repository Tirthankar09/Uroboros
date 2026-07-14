class Input {
    constructor() {

        this.pressedKeys = new Set();

        this.justPressedKeys = new Set();

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

        
    }

    endframe() {

        this.justPressedKeys.clear();
    }
}

export default Input