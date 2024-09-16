namespace SpriteKind {
    export const ball = SpriteKind.create()
    export const missdetector = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile`, function (sprite, location) {
    info.changeScoreBy(4)
    tiles.setTileAt(location, sprites.dungeon.floorDark0)
})
function addMissDetector () {
    MD = sprites.create(img`
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f f 
        `, SpriteKind.missdetector)
    MD.setPosition(80, 115)
}
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile3`, function (sprite, location) {
    info.changeScoreBy(2)
    tiles.setTileAt(location, assets.tile`myTile1`)
})
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile2`, function (sprite, location) {
    info.changeScoreBy(1)
    tiles.setTileAt(location, assets.tile`transparency16`)
})
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile1`, function (sprite, location) {
    info.changeScoreBy(3)
    tiles.setTileAt(location, assets.tile`myTile`)
})
function bounceball (ball: Sprite) {
    ballVx = ball.vx * 1
    ballVy = ball.vy * -1
    ball.setVelocity(ballVx, ballVy)
}
sprites.onOverlap(SpriteKind.ball, SpriteKind.missdetector, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
    spawnball()
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
    ball.setVelocity(50, 50)
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
    paddle.setStayInScreen(true)
    controller.moveSprite(paddle, 100, 0)
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
let level = 0
let spritecount = 0
let ballspeed = 800
tiles.setCurrentTilemap(tilemap`level2`)
spawnball()
spawnpaddle()
addMissDetector()
