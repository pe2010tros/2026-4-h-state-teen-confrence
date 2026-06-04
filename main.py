@namespace
class SpriteKind:
    Goal = SpriteKind.create()
def createSecretEnemy(x: number, y: number):
    global tempTaylor
    tempTaylor = sprites.create(img("""
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
            """),
        SpriteKind.enemy)
    tempTaylor.set_position(x, y)
    tempTaylor.ay = 0
    enemyList.append(tempTaylor)

def on_b_pressed():
    loadSecretLevel()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    if not (isInSecretLevel):
        Player_YE.vy = -150
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def loadSecretLevel():
    global isInSecretLevel, secretMic
    isInSecretLevel = True
    tiles.set_current_tilemap(tilemap("""
        level2
        """))
    Player_YE.set_position(285, 600)
    Grammy.set_position(290, 75)
    Grammy.ay = 0
    Player_YE.ay = 0
    Player_YE.vy = 0
    controller.move_sprite(Player_YE, 100, 100)
    if Taylor:
        sprites.destroy(Taylor)
    # Destroy the very first mic from Level 1 so it doesn't float around
    if mic:
        sprites.destroy(mic)
    # NEW: Loop to spawn 5 random mics in the secret level
    for index in range(5):
        secretMic = sprites.create(assets.image("""
            myImage1
            """), SpriteKind.food)
        secretMic.set_position(randint(5, 600), randint(5, 600))
        secretMic.ay = 0
    # Spawn 3 slow-chasing enemies
    createSecretEnemy(50, 40)
    createSecretEnemy(50, 250)
    createSecretEnemy(300, 250)

def on_on_overlap(sprite, otherSprite):
    game.game_over(True)
sprites.on_overlap(SpriteKind.player, SpriteKind.Goal, on_on_overlap)

# UPDATED: Destroys the specific mic you touched and updates score correctly

def on_on_overlap2(sprite2, otherSprite2):
    sprites.destroy(otherSprite2, effects.bubbles, 500)
    # Adds 5 points to current score instead of forcing it to exactly 5
    info.change_score_by(5)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap2)

def on_on_overlap3(sprite3, otherSprite3):
    game.game_over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap3)

secretMic: Sprite = None
isInSecretLevel = False
enemyList: List[Sprite] = []
tempTaylor: Sprite = None
mic: Sprite = None
Taylor: Sprite = None
Grammy: Sprite = None
enemy: Sprite = None
Player_YE: Sprite = None
# Setup Level 1 Game State
Player_YE = sprites.create(assets.image("""
    myImage0
    """), SpriteKind.player)
Player_YE.set_position(10, 30)
Grammy = sprites.create(assets.image("""
    Grammy
    """), SpriteKind.Goal)
Grammy.set_position(250, 30)
Taylor = sprites.create(img("""
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
        """),
    SpriteKind.enemy)
Taylor.set_position(105, 27)
mic = sprites.create(assets.image("""
    myImage1
    """), SpriteKind.food)
mic.set_position(190, 10)
controller.move_sprite(Player_YE, 100, 0)
Player_YE.ay = 300
Taylor.ay = 300
Grammy.ay = 300
mic.ay = 300
tiles.set_current_tilemap(tilemap("""
    level1
    """))
scene.camera_follow_sprite(Player_YE)

def on_on_update():
    global enemy
    if isInSecretLevel:
        j = 0
        while j <= len(enemyList) - 1:
            enemy = enemyList[j]
            enemy.vx = 30 if Player_YE.x > enemy.x else -30
            enemy.vy = 30 if Player_YE.y > enemy.y else -30
            j += 1
    else:
        if Taylor:
            Taylor.vx = 0
game.on_update(on_on_update)
