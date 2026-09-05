export default class Assets {
    constructor() {
        this.images = new Map();

        this.assetsList = {idle2 : "../assets/sprites/idle/0002.png",idle3 : "../assets/sprites/idle/0003.png",idle4 : "../assets/sprites/idle/0004.png",idle5 : "../assets/sprites/idle/0005.png",idle6 : "../assets/sprites/idle/0006.png",idle7 : "../assets/sprites/idle/0007.png",idle8 : "../assets/sprites/idle/0008.png",idle9 : "../assets/sprites/idle/0009.png",idle10 : "../assets/sprites/idle/0010.png",
            run1: "../assets/sprites/running/0001.png",run2: "../assets/sprites/running/0002.png",run3: "../assets/sprites/running/0003.png",run4: "../assets/sprites/running/0004.png",run5: "../assets/sprites/running/0005.png",run6: "../assets/sprites/running/0006.png",run7: "../assets/sprites/running/0007.png",run8: "../assets/sprites/running/0008.png",
            jump1: "../assets/sprites/jump/0001.png",
            fall1: "../assets/sprites/fall/0001.png",
            attack1: "../assets/sprites/attack/0001.png", attack2: "../assets/sprites/attack/0002.png", attack3: "../assets/sprites/attack/0003.png", attack4: "../assets/sprites/attack/0004.png", attack5: "../assets/sprites/attack/0005.png",
            enemyIdle1: "../assets/sprites/enemyIdle/0001.png", enemyIdle2: "../assets/sprites/enemyIdle/0002.png", enemyIdle3: "../assets/sprites/enemyIdle/0003.png", enemyIdle4: "../assets/sprites/enemyIdle/0004.png", enemyIdle5: "../assets/sprites/enemyIdle/0005.png", enemyIdle6: "../assets/sprites/enemyIdle/0006.png", enemyIdle7: "../assets/sprites/enemyIdle/0007.png", enemyIdle8: "../assets/sprites/enemyIdle/0008.png", enemyIdle9: "../assets/sprites/enemyIdle/0009.png", enemyIdle10: "../assets/sprites/enemyIdle/0010.png",
            enemyAttack1: "../assets/sprites/enemyAttack/0001.png", enemyAttack2: "../assets/sprites/enemyAttack/0002.png", enemyAttack3: "../assets/sprites/enemyAttack/0003.png", enemyAttack4: "../assets/sprites/enemyAttack/0004.png", enemyAttack5: "../assets/sprites/enemyAttack/0005.png", enemyAttack6: "../assets/sprites/enemyAttack/0006.png", enemyAttack7: "../assets/sprites/enemyAttack/0007.png", enemyAttack8: "../assets/sprites/enemyAttack/0008.png", enemyAttack9: "../assets/sprites/enemyAttack/0009.png", enemyAttack10: "../assets/sprites/enemyAttack/0010.png", enemyAttack11: "../assets/sprites/enemyAttack/0011.png", enemyAttack12: "../assets/sprites/enemyAttack/0012.png", enemyAttack13: "../assets/sprites/enemyAttack/0013.png", enemyAttack14: "../assets/sprites/enemyAttack/0014.png", enemyAttack15: "../assets/sprites/enemyAttack/0015.png",
            dead1: "../assets/sprites/dead/0001.png", dead2: "../assets/sprites/dead/0002.png", dead3: "../assets/sprites/dead/0003.png", dead4: "../assets/sprites/dead/0004.png", dead5: "../assets/sprites/dead/0005.png", dead6: "../assets/sprites/dead/0006.png", dead7: "../assets/sprites/dead/0007.png", dead8: "../assets/sprites/dead/0008.png", dead9: "../assets/sprites/dead/0009.png", dead10: "../assets/sprites/dead/0010.png", dead11: "../assets/sprites/dead/0011.png", dead12: "../assets/sprites/dead/0012.png", dead13: "../assets/sprites/dead/0013.png", dead14: "../assets/sprites/dead/0014.png", dead15: "../assets/sprites/dead/0015.png", dead16: "../assets/sprites/dead/0016.png", dead17: "../assets/sprites/dead/0017.png", dead18: "../assets/sprites/dead/0018.png", dead19: "../assets/sprites/dead/0019.png", dead20: "../assets/sprites/dead/0020.png", dead21: "../assets/sprites/dead/0021.png", dead22: "../assets/sprites/dead/0022.png", dead23: "../assets/sprites/dead/0023.png", dead24: "../assets/sprites/dead/0024.png", dead25: "../assets/sprites/dead/0025.png", dead26: "../assets/sprites/dead/0026.png", dead27: "../assets/sprites/dead/0027.png", dead28: "../assets/sprites/dead/0028.png", dead29: "../assets/sprites/dead/0029.png", dead30: "../assets/sprites/dead/0030.png"
        };
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