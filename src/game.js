var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload, create, update});

var platforms;
var cursors;
function preload() {
    
    game.load.image('sky', 'assets/sprites/sky.png');    
    game.load.image('ground', 'assets/sprites/platform.png');
    game.load.image('star', 'assets/sprites/star.png');
    game.load.spritesheet('dude', 'assets/sprites/dude.png', 32, 48); // Los ultimos dos parametros son para dividir al personaje

}

function create() {
    
    //Configuraciones iniciales
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    game.add.sprite(0, 0, 'sky');
    
    // Plataforma del juego
    platforms = game.add.group();
    platforms.enableBody = true; //Habilitaremos la fisica 
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;
    
    //game.add.sprite(0, 0, 'star');

    // Crear jugador
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;


    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    
    cursors = game.input.keyboard.createCursorKeys();
}

function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;
    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    }

    else if(cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    }

    else {
        player.animations.stop();
        player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;
    }
}