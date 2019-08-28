let pigeonInitHealth = 3;
let pigeonPosX = [340, 470];
let pigeonPosY = [125, 445];
let pigeonVelX = [-1300, 1300];
let pigeonVelY = [-1300, 1300];
let pigeonHealth = pigeonInitHealth;
let pigeonKilled = 0;
let pigeonKilledText;
let pigeonAmoebas;
let pigeonTime;
let pigeonElapsed = 0;
let pigeonCountdown = 10;

class AmoebaPigeon extends Phaser.Scene {
    constructor() {
        super({key: "AmoebaPigeon"});
    }

    preload() {
        this.load.image('background-pigeon', 'assets/background-pigeon.jpg');
        this.load.image('amoeba-pigeon', 'assets/amoeba-pigeon.png');
        this.load.image('back-white', 'assets/back-white.png');
        this.load.image('glass-3', 'assets/glass-3.png');
        this.load.image('glass-1', 'assets/glass-1.png');
        this.load.image('glass-2', 'assets/glass-2.png');
        this.load.audio('pigeon', 'assets/pigeon.mp3');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        let add = this.add;
        add.image(460, 340, 'background-pigeon');
        let back = this.physics.add.image(880, 25, "back-white");
        back.setInteractive();
        back.setInteractive();
        back.on('pointerdown', function (event) {
            pigeonElapsed = 0;
            pigeonKilled = 0;
            this.scene.start("Splash");
        }, this);

        pigeonTime = this.time.addEvent({delay: 1000, callback: verifyPigeonRun, callbackScope: this, loop: true});

        let slides = this.physics.add.staticGroup();
        slides.create(195, 645, 'glass-1');
        slides.create(820, 10, 'glass-1');
        slides.create(750, 380, 'glass-2');
        slides.create(50, 280, 'glass-3');

        pigeonAmoebas = this.physics.add.group();

        let coo = this.sound.add("pigeon", {loop: false});
        let pigeonAmoeba = pigeonAmoebas.create(Phaser.Math.Between(...pigeonPosX), Phaser.Math.Between(...pigeonPosY), 'amoeba-pigeon').setInteractive();
        spawnPigeon(pigeonAmoeba);

        pigeonAmoeba.on('pointerdown', function (pointer) {
            hitPigeon(this);
            coo.play();
        });

        this.physics.add.collider(pigeonAmoebas, slides);

        WebFont.load({
            google: {
                families: ['Nosifer']
            },
            active: function() {
                pigeonKilledText = add.text(20, 20, 'amoebas killed: 0', {fontFamily: 'Nosifer', fontSize: 42, color: 'White' });
            }
        });
    }
}

function spawnPigeon(pigeonAmoeba) {
    pigeonAmoeba.enableBody(true, Phaser.Math.Between(...pigeonPosX), Phaser.Math.Between(...pigeonPosY), true, true);
    pigeonAmoeba.setVelocity(Phaser.Math.Between(...pigeonVelX), Phaser.Math.Between(...pigeonVelY));
    pigeonAmoeba.setCollideWorldBounds(true);
    pigeonAmoeba.setBounce(1);
    pigeonHealth = pigeonInitHealth;
}

function hitPigeon(pigeonAmoeba) {
    pigeonHealth -= 1;
    if (pigeonHealth === 0) {
        killPigeon(pigeonAmoeba)
    }
}

function killPigeon(pigeonAmoeba) {
    pigeonAmoeba.disableBody(true, true);
    pigeonKilled += 1;
    pigeonKilledText.setText('amoebas killed: ' + pigeonKilled);
    spawnPigeon(pigeonAmoeba);
    pigeonAmoeba = pigeonAmoebas.create(Phaser.Math.Between(...pigeonPosX), Phaser.Math.Between(...pigeonPosY), 'amoeba-pigeon').setInteractive();
    spawnPigeon(pigeonAmoeba);
}

function verifyPigeonRun() {
    pigeonElapsed++;
    if (pigeonElapsed === pigeonCountdown) {
        pigeonAmoebas.clear(true);
        pigeonElapsed = 0;
        pigeonKilled = 0;
        this.add.text(70, 260, 'game over', {fontFamily: 'Nosifer', fontSize: 100, color: 'Red' });
        this.time.delayedCall(2500, pigeonGameEnd, [], this);
    }
}

function pigeonGameEnd() {
    this.scene.start("Splash")
}
