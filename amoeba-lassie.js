let initHealth = 5;
let health;
let hackles;
let amoebaPosX = [0, 600];
let amoebaPosY = [0, 400];
let amoebaVelX = [-400, 400];
let amoebaVelY = [-400, 400];
let hackleVelX = [-270, 280];
let hackleVelY = [-145, 160];

class AmoebaLassie extends Phaser.Scene {
    constructor() {
        super({key: "AmoebaLassie"});
        health = initHealth;
        killed = 0;
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
        this.load.audio('golang', 'assets/golang.mp3');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        let add = this.add;
        add.image(460, 340, 'background');

        amoebas = this.physics.add.group();
        hackles = this.physics.add.group();

        let complain = this.sound.add("golang", {loop: false});
        let amoeba = amoebas.create(Phaser.Math.Between(...amoebaPosX), Phaser.Math.Between(...amoebaPosY), 'amoeba-lassie').setInteractive();
        spawn(amoeba);

        amoeba.on('pointerdown', function (pointer) {
            hit(this);
            if (Phaser.Math.Between(1, 7) === 3) {
                complain.play();
            }
            let hackle = hackles.create(pointer.x, pointer.y, "java-rant-".concat(Phaser.Math.Between(1, 9)));
            hackle.setVelocity(Phaser.Math.Between(...hackleVelX), Phaser.Math.Between(...hackleVelY));
        });

        WebFont.load({
            google: {
                families: ['Nosifer']
            },
            active: function() {
                killedText = add.text(20, 20, 'amoebas killed: 0', {fontFamily: 'Nosifer', fontSize: 42, color: 'Red' });
            }
        });
    }
}

function spawn(amoeba) {
    amoeba.enableBody(true, Phaser.Math.Between(...amoebaPosX), Phaser.Math.Between(...amoebaPosY), true, true);
    amoeba.setVelocity(Phaser.Math.Between(...amoebaVelX), Phaser.Math.Between(...amoebaVelY));
    amoeba.setCollideWorldBounds(true);
    amoeba.setBounce(1);
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
    killedText.setText('amoebas killed: ' + killed);
    spawn(amoeba);
}
