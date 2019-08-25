class Splash extends Phaser.Scene {
    constructor() {
        super({key: "Splash"});
    }

    create() {
        this.text = this.add.text(20, 50, "Kill Amoeba", {fontFamily: 'Roboto', fontSize: 80, color: 'White'});

        this.input.keyboard.on('keyup', function(e) {
            if (e.key === "l") {
                this.scene.start("AmoebaLassie");
            }
        }, this);
    }

}
