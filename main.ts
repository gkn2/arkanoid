namespace SpriteKind {
    export const ball = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Food, assets.tile`myTile`, function (sprite, location) {
    info.changeScoreBy(1)
    tiles.setTileAt(location, assets.tile`myTile0`)
})
scene.onOverlapTile(SpriteKind.Food, assets.tile`myTile0`, function (sprite, location) {
    info.changeScoreBy(1)
    tiles.setTileAt(location, assets.tile`myTile`)
})
function bounceball (ball: Sprite) {
    ballVx = ball.vx * 1
    ballVy = ball.vy * -1
    ball.setVelocity(ballVx, ballVy)
}
function spawnball () {
    ball = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . 4 4 4 5 5 4 4 4 . . . . 
        . . . 3 3 3 3 4 4 4 4 4 4 . . . 
        . . 4 3 3 3 3 2 2 2 1 1 4 4 . . 
        . . 3 3 3 3 3 2 2 2 1 1 5 4 . . 
        . 4 3 3 3 3 2 2 2 2 2 5 5 4 4 . 
        . 4 3 3 3 2 2 2 4 4 4 4 5 4 4 . 
        . 4 4 3 3 2 2 4 4 4 4 4 4 4 4 . 
        . 4 2 3 3 2 2 4 4 4 4 4 4 4 4 . 
        . . 4 2 3 3 2 4 4 4 4 4 2 4 . . 
        . . 4 2 2 3 2 2 4 4 4 2 4 4 . . 
        . . . 4 2 2 2 2 2 2 2 2 4 . . . 
        . . . . 4 4 2 2 2 2 4 4 . . . . 
        . . . . . . 4 4 4 4 . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    ball.setPosition(73, 54)
    ball.setVelocity(50, 50)
    ball.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ball, function (sprite, otherSprite) {
    let mySprite: Sprite = null
    bounceball(otherSprite)
    mySprite.y = 0 + 1
})
let ballVy = 0
let ball: Sprite = null
let ballVx = 0
let level = 0
let spritecount = 0
let ballspeed = 800
tiles.setCurrentTilemap(tilemap`level2`)
spawnball()
