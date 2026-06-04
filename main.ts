namespace SpriteKind {
    export const Goal = SpriteKind.create()
}
function createSecretEnemy (x: number, y: number) {
    tempTaylor = sprites.create(img`
        . . . . 5 5 5 5 . . . . . 
        . . 5 5 5 5 5 5 5 5 . . . 
        . 5 5 5 5 5 5 5 5 5 5 . . 
        5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 5 5 5 5 5 e e 5 5 5 5 . 
        5 5 5 5 f e e f 5 5 5 5 . 
        5 5 5 b f e e f b 5 5 5 . 
        . f 4 1 f 4 4 f 1 4 f . . 
        . f e 4 4 4 4 4 4 e f . . 
        . f f f e e e e f f f . . 
        f e f b 7 7 7 7 b f e f . 
        e 4 f 7 7 7 7 7 7 f 4 e . 
        e e f 6 6 6 6 6 6 f e e . 
        . . . f f f f f f . . . . 
        . . . f f . . f f . . . . 
        `, SpriteKind.Enemy)
    tempTaylor.setPosition(x, y)
    tempTaylor.ay = 0
    enemyList.push(tempTaylor)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    loadSecretLevel()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(isInSecretLevel)) {
        Player_YE.vy = -150
    }
})
function loadSecretLevel () {
    isInSecretLevel = true
    tiles.setCurrentTilemap(tilemap`level2`)
    Player_YE.setPosition(285, 600)
    Grammy.setPosition(290, 75)
    Grammy.ay = 0
    Player_YE.ay = 0
    Player_YE.vy = 0
    controller.moveSprite(Player_YE, 100, 100)
    if (Taylor) {
        sprites.destroy(Taylor)
    }
    // Destroy the very first mic from Level 1 so it doesn't float around
    if (mic) {
        sprites.destroy(mic)
    }
    // NEW: Loop to spawn 5 random mics in the secret level
    for (let index = 0; index < 5; index++) {
        secretMic = sprites.create(assets.image`myImage1`, SpriteKind.Food)
        secretMic.setPosition(randint(5, 600), randint(5, 600))
        secretMic.ay = 0
    }
    // Spawn 3 slow-chasing enemies
    createSecretEnemy(50, 40)
    createSecretEnemy(50, 250)
    createSecretEnemy(300, 250)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Goal, function (sprite, otherSprite) {
    game.gameOver(true)
})
// UPDATED: Destroys the specific mic you touched and updates score correctly
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.bubbles, 500)
    // Adds 5 points to current score instead of forcing it to exactly 5
    info.changeScoreBy(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
let secretMic: Sprite = null
let isInSecretLevel = false
let enemyList: Sprite[] = []
let tempTaylor: Sprite = null
let mic: Sprite = null
let Taylor: Sprite = null
let Grammy: Sprite = null
let enemy: Sprite = null
let Player_YE: Sprite = null
// Setup Level 1 Game State
Player_YE = sprites.create(assets.image`myImage0`, SpriteKind.Player)
Player_YE.setPosition(10, 30)
Grammy = sprites.create(assets.image`Grammy`, SpriteKind.Goal)
Grammy.setPosition(250, 30)
Taylor = sprites.create(img`
    . . . . 5 5 5 5 . . . . . 
    . . 5 5 5 5 5 5 5 5 . . . 
    . 5 5 5 5 5 5 5 5 5 5 . . 
    5 5 5 5 5 5 5 5 5 5 5 5 . 
    5 5 5 5 5 5 5 5 5 5 5 5 . 
    5 5 5 5 5 5 e e 5 5 5 5 . 
    5 5 5 5 f e e f 5 5 5 5 . 
    5 5 5 b f e e f b 5 5 5 . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f e 4 4 4 4 4 4 e f . . 
    . f f f e e e e f f f . . 
    f e f b 7 7 7 7 b f e f . 
    e 4 f 7 7 7 7 7 7 f 4 e . 
    e e f 6 6 6 6 6 6 f e e . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `, SpriteKind.Enemy)
Taylor.setPosition(105, 27)
mic = sprites.create(assets.image`myImage1`, SpriteKind.Food)
mic.setPosition(190, 10)
controller.moveSprite(Player_YE, 100, 0)
Player_YE.ay = 300
Taylor.ay = 300
Grammy.ay = 300
mic.ay = 300
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(Player_YE)
game.onUpdate(function () {
    if (isInSecretLevel) {
        for (let j = 0; j <= enemyList.length - 1; j++) {
            enemy = enemyList[j]
            enemy.vx = Player_YE.x > enemy.x ? 30 : -30
            enemy.vy = Player_YE.y > enemy.y ? 30 : -30
        }
    } else {
        if (Taylor) {
            Taylor.vx = 0
        }
    }
})
