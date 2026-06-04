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
function pickRandomFloorTile () {
    candidates = tiles.getTilesByType(sprites.dungeon.floorLight0)
    if (candidates.length == 0) {
        candidates = tiles.getTilesByType(sprites.builtin.field1)
    }
    if (candidates.length == 0) {
        candidates = tiles.getTilesByType(sprites.skillmap.islandTile1)
    }
    if (candidates.length == 0) {
        candidates = tiles.getTilesByType(assets.tile`myTile1`)
    }
    if (candidates.length == 0) {
        return tiles.getTileLocation(0, 0)
    }
    return candidates[randint(0, candidates.length - 1)]
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    loadSecretLevel()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(isInSecretLevel)) {
        Player_YE.vy = -150
    }
})
function loadSecretLeve2 () {
    isInSecretLevel = false
    // clean up secret enemies
    for (let k = 0; k <= enemyList.length - 1; k++) {
        if (enemyList[k]) {
            sprites.destroy(enemyList[k])
        }
    }
    enemyList = []
    // reuse the main level tilemap for the new post-secret level
    tiles.setCurrentTilemap(tilemap`level`)
    // reset player and goal positions
    Player_YE.setPosition(288, 656)
    Grammy.setPosition(80, 80)
    controller.moveSprite(Player_YE, 100, 100)
    Player_YE.ay = 0
    Grammy.ay = 0
    Player_YE.vy = 0
    // recreate Taylor as a single enemy for this level
    if (Taylor) {
        sprites.destroy(Taylor)
    }
    // ensure there is a mic in this level
    if (mic) {
        sprites.destroy(mic)
    }
    mic = sprites.create(assets.image`myImage1`, SpriteKind.Food)
    // place mic on a floor tile
    locPost = pickRandomFloorTile()
    tiles.placeOnTile(mic, locPost)
    mic.ay = 0
    scene.cameraFollowSprite(Player_YE)
    // Spawn 3 slow-chasing enemies
    createSecretEnemy(80, 256)
    // Spawn 3 slow-chasing enemies
    createSecretEnemy(480, 64)
    // Spawn 3 slow-chasing enemies
    createSecretEnemy(272, 272)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite3, otherSprite3) {
    game.gameOver(false)
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
        // place secret mic on a random floor tile
        loc = pickRandomFloorTile()
        tiles.placeOnTile(secretMic, loc)
        secretMic.ay = 0
    }
    // Spawn 3 slow-chasing enemies
    createSecretEnemy(50, 40)
    createSecretEnemy(50, 250)
    createSecretEnemy(300, 250)
}
// UPDATED: Destroys the specific mic you touched and updates score correctly
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite2, otherSprite2) {
    sprites.destroy(otherSprite2, effects.bubbles, 500)
    // Adds 5 points to current score instead of forcing it to exactly 5
    info.changeScoreBy(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Goal, function (sprite, otherSprite) {
    if (isInSecretLevel) {
        loadSecretLeve2()
    } else {
        game.gameOver(true)
    }
})
let loc: tiles.Location = null
let secretMic: Sprite = null
let locPost: tiles.Location = null
let isInSecretLevel = false
let candidates: tiles.Location[] = []
let enemyList: Sprite[] = []
let tempTaylor: Sprite = null
let mic: Sprite = null
let Taylor: Sprite = null
let Grammy: Sprite = null
let Player_YE : Sprite = null
let enemy : Sprite = null
// Setup Level 1 Game State
Player_YE = sprites.create(assets.image`myImage0`, SpriteKind.Player)
Player_YE.setPosition(10, 30)
Grammy = sprites.create(assets.image`Grammy`, SpriteKind.Goal)
Grammy.setPosition(250, 30)
tiles.setCurrentTilemap(tilemap`level1`)
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
// place initial mic on a floor tile
let initLoc = pickRandomFloorTile()
tiles.placeOnTile(mic, initLoc)
controller.moveSprite(Player_YE, 100, 0)
Player_YE.ay = 300
Taylor.ay = 300
Grammy.ay = 300
mic.ay = 300
scene.cameraFollowSprite(Player_YE)
game.onUpdate(function () {
    let j: number;
if (isInSecretLevel) {
        j = 0
        while (j <= enemyList.length - 1) {
            enemy = enemyList[j]
            enemy.vx = Player_YE.x > enemy.x ? 30 : -30
            enemy.vy = Player_YE.y > enemy.y ? 30 : -30
            j += 1
        }
    } else if (Taylor) {
        Taylor.vx = 0
    }
})
