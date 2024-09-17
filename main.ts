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
        ballVx = 0 * -1
    }
    ball.setVelocity(ballVx, ballVy)
}
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile5`, function (sprite, location) {
    bounceball(sprite)
    info.changeScoreBy(5)
    if (randint(0, 100) >= 50) {
        info.changeLifeBy(1)
    }
})
sprites.onOverlap(SpriteKind.ball, SpriteKind.missdetector, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
    spawnball()
    ball.setPosition(randint(25, 160), randint(25, 135))
    ball.setVelocity(randint(10, 50), randint(10, 50))
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
    ball.setPosition(73, 54)
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
let paddle: Sprite = null
let ball: Sprite = null
let ballVy = 0
let ballVx = 0
let MD: Sprite = null
let ballspeed = 0
info.setLife(3)
let level = 0
let spritecount = 0
ballspeed = 800
tiles.setCurrentTilemap(tilemap`level2`)
spawnball()
spawnpaddle()
addMissDetector()
