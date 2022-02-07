let keyL;
let keyR;
let gameover = false;
let lose = 0;
class Tableau1 extends Phaser.Scene {
    preload() {
        this.load.image('cercle', 'assets/cercle.png');
        this.load.image('carre', 'assets/carre.png');
        this.load.spritesheet('brick', 'assets/carre.png', { frameWidth: 60, frameHeight: 30 });
    }

    create() {
        this.StartGame()
        let me = this

        this.droite = this.physics.add.sprite(this.largeur-20, 0,'carre').setOrigin(0, 0);
        this.droite.setDisplaySize(20,this.hauteur);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);

        this.gauche = this.physics.add.sprite(0, 0,'carre').setOrigin(0, 0);
        this.gauche.setDisplaySize(20,this.hauteur);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);

        this.haut = this.physics.add.sprite(0, 0,'carre').setOrigin(0, 0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

        this.playerpad = this.physics.add.sprite(300,750,'carre').setOrigin(0.0);
        this.playerpad.setDisplaySize(200,20);
        this.playerpad.body.setAllowGravity(false);
        this.playerpad.setImmovable(true);
        this.playerpad.setTintFill(0xFFFFFF);

        this.brick1 = this.add.group({ key: 'brick', frame: 0, repeat: 9, setXY: { x: 125, y: 225, stepX: 61 } });
        this.brick2 = this.add.group({ key: 'brick', frame: 0, repeat: 9, setXY: { x: 125, y: 256, stepX: 61 } });
        this.brick3 = this.add.group({ key: 'brick', frame: 0, repeat: 9, setXY: { x: 125, y: 287, stepX: 61 } });
        this.brick4 = this.add.group({ key: 'brick', frame: 0, repeat: 9, setXY: { x: 125, y: 318, stepX: 61 } });
        this.brick5 = this.add.group({ key: 'brick', frame: 0, repeat: 9, setXY: { x: 125, y: 349, stepX: 61 } });

        this.brick1.getChildren([1]);

        this.brick1 = this.physics.add.group();
        this.physics.add.collider(this.Nball.ball,this.brick1,);

        this.physics.add.collider(this.Nball.ball,this.haut);
        this.physics.add.collider(this.Nball.ball,this.droite);
        this.physics.add.collider(this.Nball.ball,this.gauche);

        this.physics.add.collider(this.Nball.ball,this.playerpad, function(){
            me.Bounce(me.playerpad);
        });



    }

    Bounce(pad){
        let largeurPad = pad.displayWidth;

        let positionRelativePad =(this.Nball.ball.x-pad.x);

        positionRelativePad = (positionRelativePad/largeurPad);

        positionRelativePad = (positionRelativePad*2-1);

        this.Nball.ball.setVelocityX(  this.Nball.ball.body.velocity.x + positionRelativePad * largeurPad)
    }

    BallStart(){
        this.Nball.ball.x = this.largeur/2
        this.Nball.ball.y = this.hauteur/2
        this.Nball.ball.setVelocityX(0)
        this.Nball.ball.setVelocityY(0)
        this.Nball.ball.setVelocityY(200)
    }

    BallReset(){
        this.Nball.ball.x = this.largeur/2
        this.Nball.ball.y = this.hauteur/2
        this.Nball.ball.setVelocityX(0)
        this.Nball.ball.setVelocityY(0)
        this.Nball.ball.setVelocityY(200)
    }

    StartGame() {
        this.Player = new Joueur('Vies', 'Player', this, 0);
        this.Score = new Joueur('Score', 'Score', this, 0);
        this.Nball = new Ball(this)
        this.hauteur = 800;
        this.largeur = 800;
        this.BallStart();
    }



    Lose(joueur){
        joueur.score --;
        this.BallReset();
        lose ++;
    }

    Controls(){
        let me = this;
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        if (keyL.isUp) {
            me.playerpad.setVelocityX(0);
        }
        if (keyR.isUp) {
            me.playerpad.setVelocityX(0);
        }
        if (keyR.isDown) {
            if (me.playerpad.x>me.droite.x-210){
                me.playerpad.setVelocityY(0)
            }
            else {
                me.playerpad.setVelocityX(300);
            }
        }
        if (keyL.isDown) {
            if (me.playerpad.x<me.gauche.x + 30){
                me.playerpad.setVelocityY(0)
            }
            else {
                me.playerpad.setVelocityX(-300);
            }
        }
    }
    update(){

        if(this.Nball.ball.y>this.hauteur-20){
            this.Lose(this.Player)
        }
        this.Controls();

        if(lose==3){
            window.alert("You lost !");
        }
    }
}//end