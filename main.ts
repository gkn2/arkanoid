namespace SpriteKind {
    export const ball = SpriteKind.create()
    export const missdetector = SpriteKind.create()
    export const typefireball = SpriteKind.create()
    export const paddle = SpriteKind.create()
    export const clock = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile7`, function (sprite, location) {
    bounceball(sprite)
    tiles.setTileAt(location, assets.tile`myTile6`)
    info.changeScoreBy(5)
    if (randint(0, 100) <= randint(10, 20)) {
        spawnclock()
    }
})
sprites.onOverlap(SpriteKind.clock, SpriteKind.paddle, function (sprite, otherSprite) {
    sprites.destroy(clock)
    info.startCountdown(5)
    ballVx = randint(ballspeed - randint(10, 35), ballspeed)
    ballVy = ball.vy - randint(10, 35)
    ball.setVelocity(randint(50, 75), randint(50, 75))
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
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile4`, function (sprite, location) {
    bounceball(sprite)
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeScoreBy(1)
    if (randint(0, 100) <= 40) {
        SpawnFireball()
    }
})
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile0`, function (sprite, location) {
    bounceball(sprite)
    tiles.setTileAt(location, assets.tile`myTile5`)
    info.changeScoreBy(3)
    if (randint(0, 100) <= randint(20, 30)) {
        spawnclock()
    }
    if (randint(0, 100) >= 80) {
        info.changeLifeBy(1)
        paddle.changeScale(0.35, ScaleAnchor.Middle)
    }
})
function spawnclock () {
    let clockspeed = 0
    clock = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . 5 f f f f f f f f f 5 . . . 
        . 5 f f 1 1 1 f 1 1 1 f f 5 . . 
        5 f f 1 1 1 1 f 1 1 1 1 f f 5 . 
        f f 1 f 1 1 1 1 1 1 1 f 1 f f . 
        f 1 1 1 f 1 1 1 1 1 f 1 1 1 f . 
        f 1 1 1 1 1 1 f 1 1 1 1 1 1 f . 
        f 1 1 1 1 1 1 f 1 1 1 1 1 1 f . 
        f f f 1 f f f f 1 1 1 1 f f f . 
        f 1 1 1 1 1 1 1 1 1 1 1 1 1 f . 
        f 1 1 1 1 1 1 1 1 1 1 1 1 1 f . 
        f 1 1 1 f 1 1 1 1 1 f 1 1 1 f . 
        f f 1 f 1 1 1 1 1 1 1 f 1 f f . 
        5 f f 1 1 1 1 f 1 1 1 1 f f 5 . 
        . 5 f f 1 1 1 f 1 1 1 f f 5 . . 
        . . 5 f f f f f f f f f 5 . . . 
        `, SpriteKind.clock)
    clock.setPosition(73, 58)
    clock.setVelocity(clockspeed, clockspeed)
    clock.setStayInScreen(true)
    clock.setBounceOnWall(true)
    clock.setScale(0.85, ScaleAnchor.Middle)
    clock.setVelocity(paddle.x - clock.x, paddle.y - clock.y)
}
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile2`, function (sprite, location) {
    bounceball(sprite)
    tiles.setTileAt(location, assets.tile`myTile0`)
    info.changeScoreBy(2)
    if (randint(0, 100) <= 70) {
        SpawnFireball()
    }
})
info.onCountdownEnd(function () {
    sprites.destroyAllSpritesOfKind(SpriteKind.ball)
    spawnball()
})
sprites.onOverlap(SpriteKind.typefireball, SpriteKind.paddle, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    game.gameOver(false)
    game.setGameOverMessage(false, "GAME OVER!")
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
    totalscoreneeded += levelscoresneeded[level]
    tiles.setCurrentTilemap(levelMaps[level])
    level += 1
    game.splash("Level" + level)
    info.startCountdown(3)
    sprites.destroyAllSpritesOfKind(SpriteKind.ball)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    spawnball()
    spawnpaddle()
    addMissDetector()
}
sprites.onOverlap(SpriteKind.paddle, SpriteKind.ball, function (sprite, otherSprite) {
    bounceball(otherSprite)
    otherSprite.y = paddle.top - 1
})
scene.onOverlapTile(SpriteKind.ball, assets.tile`myTile5`, function (sprite, location) {
    bounceball(sprite)
    tiles.setTileAt(location, assets.tile`myTile7`)
    info.changeScoreBy(4)
    if (randint(0, 100) <= randint(10, 15)) {
        info.changeLifeBy(1)
        paddle.changeScale(0.45, ScaleAnchor.Middle)
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
    ball.setStayInScreen(true)
    ball.setScale(0.35, ScaleAnchor.Middle)
}
sprites.onOverlap(SpriteKind.typefireball, SpriteKind.missdetector, function (sprite, otherSprite) {
    sprites.destroy(sprite)
})
function SpawnFireball () {
    let fireballspeed = 0
    fireball = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 2 2 2 2 2 2 . . . . . 
        . . . 2 2 2 5 5 5 4 2 2 2 2 . . 
        . . 4 4 5 4 5 5 5 4 4 4 4 2 2 . 
        . . 4 5 5 1 1 1 4 4 5 5 5 2 2 . 
        . 4 5 5 5 1 1 1 5 1 1 5 5 4 2 . 
        . 2 2 4 1 1 5 5 5 1 1 5 5 4 2 . 
        . 2 5 5 1 1 5 1 1 5 5 d 4 4 2 . 
        . 2 5 5 5 d 1 1 1 5 1 1 5 5 2 . 
        . 2 2 5 5 4 1 1 1 5 1 1 5 5 4 . 
        . . 2 2 4 4 5 5 5 5 4 4 5 2 . . 
        . . . 2 2 4 4 5 5 4 4 4 2 2 . . 
        . . . 2 2 2 2 4 4 4 2 2 2 . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.typefireball)
    fireball.setPosition(73, 58)
    fireball.setVelocity(fireballspeed, fireballspeed)
    fireball.setScale(0.8, ScaleAnchor.Middle)
    fireball.setVelocity(paddle.x - fireball.x, paddle.y - fireball.y)
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
        `, SpriteKind.paddle)
    paddle.setPosition(80, 110)
    controller.moveSprite(paddle, 100, 0)
    paddle.setStayInScreen(true)
}
let fireball: Sprite = null
let totalscoreneeded = 0
let paddle: Sprite = null
let MD: Sprite = null
let ball: Sprite = null
let ballVy = 0
let ballVx = 0
let clock: Sprite = null
let ballspeed = 0
let level = 0
let levelscoresneeded: number[] = []
let levelMaps: tiles.TileMapData[] = []
let difficulty = 3
levelMaps = [tilemap`level5`, tilemap`level13`, tilemap`level19`]
levelscoresneeded = [52, 68, 128]
level = 0
ballspeed = 60
info.setLife(3)
info.setScore(0)
while (difficulty > 2) {
    difficulty = game.askForNumber("Choose Difficulty: 0-2. Other numbers invalid.")
}
advancelevel()
game.onUpdate(function () {
    if (info.score() >= totalscoreneeded) {
        advancelevel()
    }
})
game.onUpdateInterval(5000, function () {
    if (difficulty == 0) {
        ballspeed = 60
        paddle.setScale(1.45, ScaleAnchor.Middle)
        for (let index = 0; index < randint(4, 7); index++) {
            if (randint(1, 7) >= 4) {
                SpawnFireball()
            }
        }
    } else if (difficulty == 1) {
        ballspeed = 75
        paddle.setScale(1.25, ScaleAnchor.Middle)
        for (let index = 0; index < randint(5, 11); index++) {
            if (randint(1, 11) >= 4) {
                SpawnFireball()
            }
        }
    } else if (difficulty == 2) {
        ballspeed = 90
        paddle.setScale(1, ScaleAnchor.Middle)
        for (let index = 0; index < randint(10, 16); index++) {
            if (randint(1, 16) >= 4) {
                SpawnFireball()
            }
        }
    }
})
