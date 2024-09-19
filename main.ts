namespace SpriteKind {
    export const ball = SpriteKind.create()
    export const missdetector = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile`, function (sprite, location) {
    bounceball(sprite)
    tiles.setTileAt(location, assets.tile`myTile5`)
    info.changeScoreBy(4)
})
function addMissDetector () {
    MD = sprites.create(img`
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        `, SpriteKind.missdetector)
    MD.setPosition(80, 115)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    advancelevel()
})
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile3`, function (sprite, location) {
    bounceball(sprite)
    tiles.setTileAt(location, assets.tile`myTile1`)
    info.changeScoreBy(2)
})
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile2`, function (sprite, location) {
    bounceball(sprite)
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeScoreBy(1)
})
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile1`, function (sprite, location) {
    bounceball(sprite)
    tiles.setTileAt(location, assets.tile`myTile`)
    info.changeScoreBy(3)
})
function bounceball (ball: Sprite) {
    ballVx = randint(ballspeed / 3, ballspeed)
    ballVy = ball.vy * -1
    if (ball.vx < 0) {
        ballVx = ballVx * -1
    }
    ball.setVelocity(ballVx, ballVy)
}
function advancelevel () {
    tiles.setCurrentTilemap(levelMaps[level])
    level += 1
    game.splash("Level" + level)
    spawnball()
}
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile5`, function (sprite, location) {
    bounceball(sprite)
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeScoreBy(5)
    if (randint(0, 100) >= 25) {
        info.changeLifeBy(1)
        paddle.changeScale(0.35, ScaleAnchor.Middle)
    }
})
sprites.onOverlap(SpriteKind.ball, SpriteKind.missdetector, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
    spawnball()
    ball.setPosition(randint(25, 160), randint(25, 135))
    ball.setVelocity(randint(50, 75), randint(50, 75))
})
function spawnball () {
    ball = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . 1 1 1 1 1 1 1 1 1 1 1 3 1 . . 
        . 1 1 1 1 1 1 1 1 1 1 3 3 1 1 . 
        . 1 1 1 1 1 1 1 1 1 1 1 3 1 1 . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . 1 1 1 1 1 1 1 1 1 1 1 1 . . 
        . . . 1 1 1 1 1 1 1 1 1 1 . . . 
        . . . . 1 1 1 1 1 1 1 1 . . . . 
        . . . . . . 1 1 1 1 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.ball)
    ball.setPosition(73, 58)
    ball.setVelocity(ballspeed, ballspeed)
    ball.setBounceOnWall(true)
    ball.setScale(0.35, ScaleAnchor.Middle)
}
function spawnpaddle () {
    paddle = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
        . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    paddle.setPosition(80, 110)
    controller.moveSprite(paddle, 100, 0)
    paddle.setStayInScreen(true)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ball, function (sprite, otherSprite) {
    bounceball(otherSprite)
    otherSprite.y = paddle.top + 1
})
let ball: Sprite = null
let paddle: Sprite = null
let ballVy = 0
let ballVx = 0
let MD: Sprite = null
let ballspeed = 0
let level = 0
let levelMaps: tiles.TileMapData[] = []
levelMaps = [tilemap`level2`, tilemap`level23`, tilemap`level0`]
level = 0
ballspeed = 100
info.setScore(0)
advancelevel()
spawnpaddle()
addMissDetector()
