@namespace
class SpriteKind:
    Goal = SpriteKind.create()

def on_b_pressed():
    loadSecretLevel()
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    Player_YE.vy = -150
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def loadSecretLevel():
    tiles.set_current_tilemap(tilemap("""
        level2
        """))
    # Move player to the start of the secret level
    Player_YE.set_position(285, 600)
    # Move goal
    Grammy.set_position(290, 75)
    Taylor.set_position(105, 27)
    mic.set_position(randint(5, 600), 30)
    Grammy.ay = 0
    # NEW: Allow free 8-way movement (X and Y directions)
    controller.move_sprite(Player_YE, 100, 100)
    # NEW: Remove gravity so the player can fly/hover freely
    Player_YE.ay = 0
    Player_YE.vy = 0

def on_on_overlap(sprite, otherSprite):
    game.game_over(True)
sprites.on_overlap(SpriteKind.player, SpriteKind.Goal, on_on_overlap)

def on_on_overlap2(sprite2, otherSprite2):
    sprites.destroy(mic, effects.bubbles, 500)
    info.set_score(5)
sprites.on_overlap(SpriteKind.player, SpriteKind.food, on_on_overlap2)

def on_on_overlap3(sprite3, otherSprite3):
    game.game_over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap3)

mic: Sprite = None
Taylor: Sprite = None
Grammy: Sprite = None
Player_YE: Sprite = None
Player_YE = sprites.create(assets.image("""
    myImage0
    """), SpriteKind.player)
Player_YE.set_position(11, 5)
Grammy = sprites.create(assets.image("""
    Grammy
    """), SpriteKind.Goal)
Grammy.set_position(233, 32)
Taylor = sprites.create(img("""
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
        """),
    SpriteKind.enemy)
Taylor.set_position(105, 27)
mic = sprites.create(img("""
        . . f c f c f c f c f c f c . .
        . f c f c f c f c f c f c f c .
        f c f c f c f c f c f c f c f c
        c f c f c f c f c f c f c f c f
        b b b b b b b b b b b b b b b b
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        f f f f f f f f f f f f f f f f
        . f f f f f f f f f f f f f f .
        . . . f f f f f f f f f f . . .
        . . . . f f f f f f f f . . . .
        . . . . . f f f f f f . . . . .
        . . . . . . f f f f . . . . . .
        . . . . . . . f f . . . . . . .
        . . . . . . . f f . . . . . . .
        """),
    SpriteKind.food)
mic.set_position(79, 30)
controller.move_sprite(Player_YE, 100, 0)
Player_YE.ay = 300
Taylor.ay = 300
Grammy.ay = 300
mic.ay = 300
tiles.set_current_tilemap(tilemap("""
    level1
    """))
scene.camera_follow_sprite(Player_YE)