namespace SpriteKind {
    export const Goal = SpriteKind.create()
}

function createSecretEnemy(x: number, y: number) {
    
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

controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    loadSecretLevel()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    if (!isInSecretLevel) {
        Player_YE.vy = -150
    }
    
})
function loadSecretLevel() {
    
    isInSecretLevel = true
    tiles.setCurrentTilemap(tilemap`
        level2
        `)
    Player_YE.setPosition(285, 600)
    Grammy.setPosition(290, 75)
    Grammy.ay = 0
    Player_YE.ay = 0
    Player_YE.vy = 0
    controller.moveSprite(Player_YE, 100, 100)
    if (Taylor) {
        sprites.destroy(Taylor)
    }
    
    //  Destroy the very first mic from Level 1 so it doesn't float around
    if (mic) {
        sprites.destroy(mic)
    }
    
    //  NEW: Loop to spawn 5 random mics in the secret level
    for (let index = 0; index < 5; index++) {
        secretMic = sprites.create(assets.image`
            myImage1
            `, SpriteKind.Food)
        // place secret mic at a random non-wall location
        let sx = randint(5, tiles.tilemapColumns() * 16 - 5)
        let sy = randint(5, tiles.tilemapRows() * 16 - 5)
        secretMic.setPosition(sx, sy)
        while (tiles.tileIsWall(tiles.locationOfSprite(secretMic))) {
            sx = randint(5, tiles.tilemapColumns() * 16 - 5)
            sy = randint(5, tiles.tilemapRows() * 16 - 5)
            secretMic.setPosition(sx, sy)
        }
        secretMic.ay = 0
    }
    //  Spawn 3 slow-chasing enemies
    createSecretEnemy(50, 40)
    createSecretEnemy(50, 250)
    createSecretEnemy(300, 250)
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Goal, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    if (isInSecretLevel) {
        loadPostSecretLevel()
    } else {
        game.gameOver(true)
    }
})

function loadPostSecretLevel() {
    isInSecretLevel = false
    // clean up secret enemies
    for (let k = 0; k <= enemyList.length - 1; k++) {
        if (enemyList[k]) {
            sprites.destroy(enemyList[k])
        }
    }
    enemyList = []
    // reuse the main level tilemap for the new post-secret level
    tiles.setCurrentTilemap(tilemap`
        level1
        `)
    // reset player and goal positions
    Player_YE.setPosition(10, 30)
    Grammy.setPosition(250, 30)
    controller.moveSprite(Player_YE, 100, 0)
    Player_YE.ay = 300
    Grammy.ay = 300
    Player_YE.vy = 0

    // recreate Taylor as a single enemy for this level
    if (Taylor) {
        sprites.destroy(Taylor)
    }
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
    Taylor.ay = 300

    // ensure there is a mic in this level
    if (mic) {
        sprites.destroy(mic)
    }
    mic = sprites.create(assets.image`
        myImage1
        `, SpriteKind.Food)
    // place mic and ensure it's not inside a wall tile
    mic.setPosition(190, 10)
    let maxX = tiles.tilemapColumns() * 16 - 5
    let maxY = tiles.tilemapRows() * 16 - 5
    while (tiles.tileIsWall(tiles.locationOfSprite(mic))) {
        mic.setPosition(randint(5, maxX), randint(5, maxY))
    }
    mic.ay = 300

    scene.cameraFollowSprite(Player_YE)
}
//  UPDATED: Destroys the specific mic you touched and updates score correctly
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function on_on_overlap2(sprite2: Sprite, otherSprite2: Sprite) {
    sprites.destroy(otherSprite2, effects.bubbles, 500)
    //  Adds 5 points to current score instead of forcing it to exactly 5
    info.changeScoreBy(5)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap3(sprite3: Sprite, otherSprite3: Sprite) {
    game.gameOver(false)
})
let secretMic : Sprite = null
let isInSecretLevel = false
let enemyList : Sprite[] = []
let tempTaylor : Sprite = null
let mic : Sprite = null
let Taylor : Sprite = null
let Grammy : Sprite = null
let enemy : Sprite = null
let Player_YE : Sprite = null
//  Setup Level 1 Game State
Player_YE = sprites.create(assets.image`
    myImage0
    `, SpriteKind.Player)
Player_YE.setPosition(10, 30)
Grammy = sprites.create(assets.image`
    Grammy
    `, SpriteKind.Goal)
Grammy.setPosition(250, 30)
tiles.setCurrentTilemap(tilemap`
    level1
    `)

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
mic = sprites.create(assets.image`
    myImage1
    `, SpriteKind.Food)
// place mic and ensure it's not inside a wall tile
mic.setPosition(190, 10)
let maxX_init = tiles.tilemapColumns() * 16 - 5
let maxY_init = tiles.tilemapRows() * 16 - 5
while (tiles.tileIsWall(tiles.locationOfSprite(mic))) {
    mic.setPosition(randint(5, maxX_init), randint(5, maxY_init))
}
controller.moveSprite(Player_YE, 100, 0)
Player_YE.ay = 300
Taylor.ay = 300
Grammy.ay = 300
mic.ay = 300
scene.cameraFollowSprite(Player_YE)
game.onUpdate(function on_on_update() {
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
