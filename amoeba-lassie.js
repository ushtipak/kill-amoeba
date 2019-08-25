class AmoebaLassie extends Phaser.Scene {
    constructor() {
        super({key: "AmoebaLassie"});

    }

    preload() {
        this.load.image('background', 'assets/background.jpg');
        this.load.image('amoeba-lassie', 'assets/amoeba-lassie-xmass-edition.png');
    }

    create() {
        this.add.image(460, 340, 'background');

        amoebas = this.physics.add.group();
        let amoeba = amoebas.create(Phaser.Math.Between(0, 600), Phaser.Math.Between(0, 400), 'amoeba-lassie').setInteractive();
        amoeba.setBounce(1);
        amoeba.setCollideWorldBounds(true);
        amoeba.setVelocity(
            Phaser.Math.Between(-400, 400),
            Phaser.Math.Between(-400, 400)
        );
        amoeba.on('pointerdown', function (pointer) {
            hitAmoeba(this)
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
