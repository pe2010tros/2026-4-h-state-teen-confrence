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
def pickRandomFloorTile():
    global candidates
    candidates = tiles.get_tiles_by_type(sprites.dungeon.floor_light0)
    if len(candidates) == 0:
        candidates = tiles.get_tiles_by_type(sprites.builtin.field1)
    if len(candidates) == 0:
        candidates = tiles.get_tiles_by_type(sprites.skillmap.island_tile1)
    if len(candidates) == 0:
        candidates = tiles.get_tiles_by_type(assets.tile("""
            myTile1
            """))
    if len(candidates) == 0:
        return tiles.get_tile_location(0, 0)
    return candidates[randint(0, len(candidates) - 1)]

def on_b_pressed():
    loadSecretLevel()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    if not (isInSecretLevel):
        Player_YE.vy = -150
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def loadSecretLeve2():
    global isInSecretLevel, enemyList, locPost
    # mark we're in a secret level so the on_update logic moves enemies
    isInSecretLevel = True
    # clean up secret enemies
    k = 0
    while k <= len(enemyList) - 1:
        if enemyList[k]:
            sprites.destroy(enemyList[k])
        k += 1
    enemyList = []
    # reuse the main level tilemap for the new post-secret level
    tiles.set_current_tilemap(tilemap("""
        level
        """))
    # reset player and goal positions
    Player_YE.set_position(288, 656)
    Grammy.set_position(80, 80)
    controller.move_sprite(Player_YE, 100, 100)
    Player_YE.ay = 0
    Grammy.ay = 0
    Player_YE.vy = 0
    # recreate Taylor as a single enemy for this level
    if Taylor:
        sprites.destroy(Taylor)
    # ensure there is a mic in this level
    if mic:
        sprites.destroy(mic)
    # place mic on a floor tile
    locPost = pickRandomFloorTile()
    tiles.place_on_tile(mic, locPost)
    mic.ay = 0
    scene.camera_follow_sprite(Player_YE)
    # Spawn 3 slow-chasing enemies
    createSecretEnemy(80, 256)
    # Spawn 3 slow-chasing enemies
    createSecretEnemy(480, 64)
    # Spawn 3 slow-chasing enemies
    createSecretEnemy(272, 272)

def on_on_overlap(sprite3, otherSprite3):
    game.game_over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

def loadSecretLevel():
    global isInSecretLevel, secretMic, loc
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
        # place secret mic on a random floor tile
        loc = pickRandomFloorTile()
        tiles.place_on_tile(secretMic, loc)
        secretMic.ay = 0
    # Spawn 3 slow-chasing enemies
    createSecretEnemy(50, 40)
    createSecretEnemy(50, 250)
    createSecretEnemy(300, 250)
# UPDATED: Destroys the specific mic you touched and updates score correctly

def on_on_overlap2(sprite2, otherSprite2):
    sprites.destroy(otherSprite2, effects.bubbles, 500)
    # Adds 5 points to current score instead of forcing it to exactly 5
    info.change_score_by(5)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap2)

def on_on_overlap3(sprite, otherSprite):
    if isInSecretLevel:
        loadSecretLeve2()
    else:
        game.game_over(True)
sprites.on_overlap(SpriteKind.player, SpriteKind.Goal, on_on_overlap3)

loc: tiles.Location = None
secretMic: Sprite = None
locPost: tiles.Location = None
isInSecretLevel = False
candidates: List[tiles.Location] = []
enemyList: List[Sprite] = []
tempTaylor: Sprite = None
mic: Sprite = None
Taylor: Sprite = None
Grammy: Sprite = None
Player_YE: Sprite = None
enemy: Sprite = None
# Setup Level 1 Game State
Player_YE = sprites.create(assets.image("""
    myImage0
    """), SpriteKind.player)
Player_YE.set_position(10, 30)
Grammy = sprites.create(assets.image("""
    Grammy
    """), SpriteKind.Goal)
Grammy.set_position(250, 30)
tiles.set_current_tilemap(tilemap("""
    level1
    """))
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
# place initial mic on a floor tile
initLoc = pickRandomFloorTile()
tiles.place_on_tile(mic, initLoc)
controller.move_sprite(Player_YE, 100, 0)
Player_YE.ay = 300
Taylor.ay = 300
Grammy.ay = 300
mic.ay = 300
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
    elif Taylor:
        Taylor.vx = 0
game.on_update(on_on_update)
