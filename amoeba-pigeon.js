let pigeonInitHealth = 3;
let pigeonPosX = [340, 470];
let pigeonPosY = [125, 445];
let pigeonVelX = [-1300, 1300];
let pigeonVelY = [-1300, 1300];
let pigeonHealth = pigeonInitHealth;
let pigeonKilled = 0;
let pigeonKilledText;
let pigeonAmoebas;

class AmoebaPigeon extends Phaser.Scene {
    constructor() {
        super({key: "AmoebaPigeon"});
    }

    preload() {
        this.load.image('background-pigeon', 'assets/background-pigeon.jpg');
        this.load.image('amoeba-pigeon', 'assets/amoeba-pigeon.png');
        this.load.image('glass', 'assets/glass-pane.jpg');
        this.load.audio('pigeon', 'assets/pigeon.mp3');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        let add = this.add;
        add.image(460, 340, 'background-pigeon');

        let slides = this.physics.add.staticGroup();
        slides.create(195, 645, 'glass');
        slides.create(820, 10, 'glass');
        slides.create(750, 380, 'glass');
        slides.create(50, 280, 'glass');

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
