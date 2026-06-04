namespace SpriteKind {
    export const Goal = SpriteKind.create()
}
/**
 * FIXED: Explicitly declare the strict types to prevent the 'any' error
 */
/**
 * FIXED: Declare game sprites with the Sprite type explicitly
 */
function createSecretEnemy (x: number, y: number) {
    tempTaylor = sprites.create(img`
        . . . . 5 5 5 5 . . . . . 
        . . 5 5 5 5 5 5 5 5 . . . 
        . 5 5 5 5 5 5 5 5 5 5 . . 
        5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 5 5 5 5 5 5 5 5 5 5 5 . 
        5 5 5 5 5 5 4 4 5 5 5 5 . 
        5 5 5 5 f 4 4 f 5 5 5 5 . 
        5 5 5 b f 4 4 f b 5 5 5 . 
        . f 4 1 f 4 4 f 1 4 f . . 
        . f 4 4 4 4 4 4 4 4 f . . 
        . f f f e e e e f f f . . 
        f 4 f b 7 7 7 7 b f 4 f . 
        4 4 f 7 7 7 7 7 7 f 4 4 . 
        4 4 f 6 6 6 6 6 6 f 4 4 . 
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
    mic.setPosition(randint(5, 600), randint(5, 600))
    Grammy.ay = 0
    mic.ay = 0
    Player_YE.ay = 0
    Player_YE.vy = 0
    controller.moveSprite(Player_YE, 100, 100)
    if (Taylor) {
        sprites.destroy(Taylor)
    }
    // Spawn 3 slow-chasing enemies
    createSecretEnemy(105, 27)
    createSecretEnemy(50, 300)
    createSecretEnemy(400, 400)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Goal, function (sprite, otherSprite) {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    sprites.destroy(mic, effects.bubbles, 500)
    info.setScore(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
let enemy: Sprite = null
let isInSecretLevel = false
let enemyList: Sprite[] = []
let tempTaylor: Sprite = null
let mic: Sprite = null
let Taylor: Sprite = null
let Grammy: Sprite = null
let Player_YE: Sprite = null
// Setup Level 1 Game State
Player_YE = sprites.create(assets.image`myImage0`, SpriteKind.Player)
Player_YE.setPosition(11, 5)
Grammy = sprites.create(assets.image`Grammy`, SpriteKind.Goal)
Grammy.setPosition(233, 32)
Taylor = sprites.create(img`
    . . . . 5 5 5 5 . . . . . 
    . . 5 5 5 5 5 5 5 5 . . . 
    . 5 5 5 5 5 5 5 5 5 5 . . 
    5 5 5 5 5 5 5 5 5 5 5 5 . 
    5 5 5 5 5 5 5 5 5 5 5 5 . 
    5 5 5 5 5 5 4 4 5 5 5 5 . 
    5 5 5 5 f 4 4 f 5 5 5 5 . 
    5 5 5 b f 4 4 f b 5 5 5 . 
    . f 4 1 f 4 4 f 1 4 f . . 
    . f 4 4 4 4 4 4 4 4 f . . 
    . f f f e e e e f f f . . 
    f 4 f b 7 7 7 7 b f 4 f . 
    4 4 f 7 7 7 7 7 7 f 4 4 . 
    4 4 f 6 6 6 6 6 6 f 4 4 . 
    . . . f f f f f f . . . . 
    . . . f f . . f f . . . . 
    `, SpriteKind.Enemy)
Taylor.setPosition(105, 27)
mic = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Food)
mic.setPosition(79, 30)
controller.moveSprite(Player_YE, 100, 0)
Player_YE.ay = 300
Taylor.ay = 300
Grammy.ay = 300
mic.ay = 300
tiles.setCurrentTilemap(tilemap`level1`)
scene.cameraFollowSprite(Player_YE)
game.onUpdate(function () {
    if (isInSecretLevel) {
        for (let i = 0; i <= enemyList.length - 1; i++) {
            enemy = enemyList[i]
            enemy.vx = Player_YE.x > enemy.x ? 30 : -30
            enemy.vy = Player_YE.y > enemy.y ? 30 : -30
        }
    } else {
        if (Taylor) {
            Taylor.vx = 0
        }
    }
})
