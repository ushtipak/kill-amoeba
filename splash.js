class Splash extends Phaser.Scene {
    constructor() {
        super({key: "Splash"});
    }

    preload() {
        this.load.image('amoeba-lassie', 'assets/amoeba-lassie.png');
        this.load.image('amoeba-pigeon', 'assets/amoeba-pigeon.png');
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create() {
        let add = this.add;

        let lassie = this.physics.add.image(180, 400, "amoeba-lassie");
        lassie.setInteractive();
        lassie.on('pointerdown', function (event) {
            this.scene.start("AmoebaLassie");
        }, this);

        let pigeon = this.physics.add.image(580, 400, "amoeba-pigeon");
        pigeon.setInteractive();
        pigeon.on('pointerdown', function (event) {
            this.scene.start("AmoebaPigeon");
        }, this);

        this.input.keyboard.on('keyup', function(e) {
            if (e.key === "d") {
                console.log("implement original amoeba?")
            }
        }, this);

        WebFont.load({
            google: {
                families: ['Nosifer']
            },
            active: function() {
                pigeonKilledText = add.text(100, 50, 'Kill Amoeba', {fontFamily: 'Nosifer', fontSize: 80, color: 'White' });
            }
        });
    }

}
