class Ball {
    constructor(Tableau){
        this.scene = Tableau
        this.ball = this.scene.physics.add.sprite(0, 0, 'cercle').setOrigin(0, 0);
        this.ball.setDisplaySize(20,20);
        this.ball.body.setBounce(1.0,1.0);
        this.ball.body.setMaxVelocityX(900);
        this.ball.body.setMaxVelocityY(900);
        this.ball.body.setAllowGravity(false)
    }
}