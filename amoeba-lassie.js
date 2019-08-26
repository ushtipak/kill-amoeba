let initHealth = 5;
let health;
let hackles;
let amoebaParams;
let hackleVelX;
let hackleVelY;

class AmoebaLassie extends Phaser.Scene {
    constructor() {
        super({key: "AmoebaLassie"});
        health = initHealth;
        killed = 0;
        amoebaParams = [0, 600, 0, 400, -400, 400, -400, 400];
        hackleVelX = [-270, 280];
        hackleVelY = [-145, 160];
    }

    preload() {
        this.load.image('background', 'assets/background.jpg');
        this.load.image('amoeba-lassie', 'assets/amoeba-lassie-xmass-edition.png');
        this.load.image('java-rant-1', 'assets/java-rant-1.png');
        this.load.image('java-rant-2', 'assets/java-rant-2.png');
        this.load.image('java-rant-3', 'assets/java-rant-3.png');
        this.load.image('java-rant-4', 'assets/java-rant-4.png');
        this.load.image('java-rant-5', 'assets/java-rant-5.png');
        this.load.image('java-rant-6', 'assets/java-rant-6.png');
        this.load.image('java-rant-7', 'assets/java-rant-7.png');
        this.load.image('java-rant-8', 'assets/java-rant-8.png');
        this.load.image('java-rant-9', 'assets/java-rant-9.png');
    }

    create() {
        this.add.image(460, 340, 'background');

        amoebas = this.physics.add.group();
        let amoeba = amoebas.create(Phaser.Math.Between(0, 600), Phaser.Math.Between(0, 400), 'amoeba-lassie').setInteractive();
        spawn(amoeba, ...amoebaParams);

        amoeba.on('pointerdown', function (pointer) {
            hit(this);

            let hackle = hackles.create(pointer.x, pointer.y, randomHackle());
            hackle.setVelocity(Phaser.Math.Between(...hackleVelX), Phaser.Math.Between(...hackleVelY));
        });

        hackles = this.physics.add.group();

        killedText = this.add.text(20, 20, '> 0 amoebas killed', {fontSize: '24px', fill: '#000'});
    }
}

function spawn(amoeba, posXMin, posXMax, posYMin, posYMax, velXMin, velXMax, velYMin, velYMax) {
    amoeba.enableBody(true, Phaser.Math.Between(posXMin, posXMax), Phaser.Math.Between(posYMin, posYMax), true, true);
    amoeba.setBounce(1);
    amoeba.setCollideWorldBounds(true);
    amoeba.setVelocity(Phaser.Math.Between(velXMin, velXMax), Phaser.Math.Between(velYMin, velYMax));
    health = initHealth;
}

function hit(amoeba) {
    health -= 1;
    if (health === 0) {
        kill(amoeba)
    }
}

function kill(amoeba) {
    amoeba.disableBody(true, true);
    killed += 1;
    killedText.setText('> ' + killed + ' amoebas killed');
    spawn(amoeba, ...amoebaParams);
}

function randomHackle() {
    let n = Phaser.Math.Between(1, 9);
    return "java-rant-".concat(n);
}