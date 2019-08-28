let lassieInitHealth = 5;
let lassiePosX = [0, 600];
let lassiePosY = [0, 400];
let lassieVelX = [-400, 400];
let lassieVelY = [-400, 400];
let lassieHealth = lassieInitHealth;
let lassieKilled = 0;
let lassieKilledText;
let lassieAmoebas;
let hackles;
let hackleVelX = [-270, 280];
let hackleVelY = [-145, 160];

class AmoebaLassie extends Phaser.Scene {
    constructor() {
        super({key: "AmoebaLassie"});
    }

    preload() {
        this.load.image('background-lassie', 'assets/background-lassie.jpg');
        this.load.image('amoeba-lassie', 'assets/amoeba-lassie.png');
        this.load.image('back-red', 'assets/back-red.png');
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
        add.image(460, 340, 'background-lassie');
        let back = this.physics.add.image(880, 85, "back-red");
        back.setInteractive();
        back.on('pointerdown', function (event) {
            this.scene.start("Splash");
        }, this);

        lassieAmoebas = this.physics.add.group();
        hackles = this.physics.add.group();

        let complain = this.sound.add("golang", {loop: false});
        let lassieAmoeba = lassieAmoebas.create(Phaser.Math.Between(...lassiePosX), Phaser.Math.Between(...lassiePosY), 'amoeba-lassie').setInteractive();
        spawnLassie(lassieAmoeba);

        lassieAmoeba.on('pointerdown', function (pointer) {
            hitLassie(this);
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
                lassieKilledText = add.text(20, 20, 'amoebas killed: 0', {fontFamily: 'Nosifer', fontSize: 42, color: 'Red' });
            }
        });
    }
}

function spawnLassie(lassieAmoeba) {
    lassieAmoeba.enableBody(true, Phaser.Math.Between(...lassiePosX), Phaser.Math.Between(...lassiePosY), true, true);
    lassieAmoeba.setVelocity(Phaser.Math.Between(...lassieVelX), Phaser.Math.Between(...lassieVelY));
    lassieAmoeba.setCollideWorldBounds(true);
    lassieAmoeba.setBounce(1);
    lassieHealth = lassieInitHealth;
}

function hitLassie(lassieAmoeba) {
    lassieHealth -= 1;
    if (lassieHealth === 0) {
        killLassie(lassieAmoeba)
    }
}

function killLassie(lassieAmoeba) {
    lassieAmoeba.disableBody(true, true);
    lassieKilled += 1;
    lassieKilledText.setText('amoebas killed: ' + lassieKilled);
    spawnLassie(lassieAmoeba);
}
