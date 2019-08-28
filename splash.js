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
                families: ['Nosifer', 'Finger Paint']
            },
            active: function() {
                add.text(100, 50, 'Kill Amoeba', {fontFamily: 'Nosifer', fontSize: 80, color: 'White' });

                add.text(260, 410, 'Lassie', { fontFamily: 'Finger Paint', fontSize: 40, color: 'White' });
                add.text(660, 410, 'Pigeon', { fontFamily: 'Finger Paint', fontSize: 40, color: 'White' });

                add.text(70, 500, 'Bulky [5 hp]\nRants generic Java gospel\nOpposes Golang [1/7 hits]', { fontFamily: 'Finger Paint', fontSize: 20, color: 'White' });
                add.text(495, 500, 'Lightweight [3 hp]\nMultiplies when killed [with fakes]\nCoos constantly', { fontFamily: 'Finger Paint', fontSize: 20, color: 'White' });
            }
        });
    }

}
