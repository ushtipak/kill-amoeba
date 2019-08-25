class AmoebaLassie extends Phaser.Scene {
    constructor() {
        super({key: "AmoebaLassie"});
        health = 5;
        killed = 0;
    }

    preload() {
        this.load.image('background', 'assets/background.jpg');
        this.load.image('amoeba-lassie', 'assets/amoeba-lassie-xmass-edition.png');
    }

    create() {
        this.add.image(460, 340, 'background');

        amoebas = this.physics.add.group();
        let amoeba = amoebas.create(Phaser.Math.Between(0, 600), Phaser.Math.Between(0, 400), 'amoeba-lassie').setInteractive();
        spawn(amoeba);

        amoeba.on('pointerdown', function (pointer) {
            hit(this)
        });
        amoeba.on('pointerup', function (pointer) {
            this.clearTint();
        });
        amoeba.on('pointerout', function (pointer) {
            this.clearTint();
        });

        killedText = this.add.text(20, 20, '> 0 amoebas killed', {fontSize: '24px', fill: '#000'});
    }
}

function spawn(amoeba) {
    amoeba.enableBody(true, Phaser.Math.Between(0, 600), Phaser.Math.Between(0, 400), true, true);
    amoeba.setBounce(1);
    amoeba.setCollideWorldBounds(true);
    amoeba.setVelocity(
        Phaser.Math.Between(-400, 400),
        Phaser.Math.Between(-400, 400)
    );
    health = 5;
}

function hit(amoeba) {
    amoeba.setTint(0xff0000);
    health -= 1;
    console.log(health);
    if (health === 0) {
        amoeba.disableBody(true, true);
        killed += 1;
        killedText.setText('> ' + killed + ' amoebas killed');
        spawn(amoeba);
    }
}

