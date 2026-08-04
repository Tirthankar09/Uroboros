export default class Assets {
    constructor() {
        this.images = new Map();

        this.assetsList = {idle2 : "../assets/sprites/idle/0002.png",idle3 : "../assets/sprites/idle/0003.png",idle4 : "../assets/sprites/idle/0004.png",idle5 : "../assets/sprites/idle/0005.png",idle6 : "../assets/sprites/idle/0006.png",idle7 : "../assets/sprites/idle/0007.png",idle8 : "../assets/sprites/idle/0008.png",idle9 : "../assets/sprites/idle/0009.png",idle10 : "../assets/sprites/idle/0010.png",
            run1: "../assets/sprites/running/0001.png",run2: "../assets/sprites/running/0002.png",run3: "../assets/sprites/running/0003.png",run4: "../assets/sprites/running/0004.png",run5: "../assets/sprites/running/0005.png",run6: "../assets/sprites/running/0006.png",run7: "../assets/sprites/running/0007.png",run8: "../assets/sprites/running/0008.png",
            jump1: "../assets/sprites/jump/0001.png",
            fall1: "../assets/sprites/fall/0001.png"};
        }

    async load() {
        for(const key of Object.keys(this.assetsList)) {

        const image = new Image();

        const promise = new Promise((resolve) => {image.onload = () => {resolve();}});

        image.src = this.assetsList[key];

        await promise;

        this.images.set(key,image);
    }
    
}

    get(name) {

        return this.images.get(name);
        
    }
}