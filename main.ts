input.onButtonPressed(Button.A, function () {
    Pause = true
    basic.showNumber(LeftPlayerScore)
    basic.pause(1000)
    Pause = false
})
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    Pause = true
    basic.showNumber(RightPlayerScore)
    basic.pause(1000)
    Pause = false
})
let goal1 = 0
let goal = 0
let Pause = false
let RightPlayer = ""
let LeftPlayer = ""
let RightPlayerScore = 0
let LeftPlayerScore = 0
LeftPlayerScore = 0
RightPlayerScore = 0
let ScoreToWin = 5
let MatchTime = 3
basic.showArrow(ArrowNames.North)
while (!(input.logoIsPressed())) {
    basic.pause(1)
}
basic.clearScreen()
if (LeftPlayer != "" && RightPlayer != "") {
    basic.showString("" + RightPlayer + " vs " + LeftPlayer)
} else if (LeftPlayer != "" || RightPlayer != "") {
    basic.showString("" + RightPlayer + LeftPlayer)
} else {
    basic.showString("GO!")
}
music.setVolume(255)
music.playTone(466, music.beat(BeatFraction.Whole))
music.rest(music.beat(BeatFraction.Whole))
music.playTone(466, music.beat(BeatFraction.Whole))
music.rest(music.beat(BeatFraction.Whole))
music.playTone(466, music.beat(BeatFraction.Whole))
music.rest(music.beat(BeatFraction.Whole))
music.playTone(932, music.beat(BeatFraction.Double))
basic.pause(1000)
Pause = false
let StartTime = control.millis()
basic.forever(function () {
    goal = pins.digitalReadPin(DigitalPin.P1)
    goal1 = pins.digitalReadPin(DigitalPin.P2)
    if (goal1 == 0 && !(goal == 0)) {
        Pause = true
        RightPlayerScore += 1
        music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
        basic.showNumber(RightPlayerScore)
        basic.pause(500)
        goal1 = 0
        Pause = false
    }
    if (goal == 0 && !(goal1 == 0)) {
        Pause = true
        LeftPlayerScore += 1
        music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
        basic.showNumber(LeftPlayerScore)
        basic.pause(500)
        goal = 0
        Pause = false
    }
})
basic.forever(function () {
    if (StartTime > MatchTime * 60000) {
        Pause = true
        music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
        basic.showLeds(`
            # # # # #
            # . # . #
            # . # . #
            # . . . #
            # # # # #
            `)
        basic.pause(1000)
        if (LeftPlayer == "" || RightPlayer == "") {
            while (true) {
                basic.showString("" + LeftPlayerScore + "-" + RightPlayerScore + "   ")
            }
        } else {
            if (LeftPlayerScore > RightPlayerScore) {
                while (true) {
                    basic.showString("" + LeftPlayer + " wins!")
                }
            } else if (LeftPlayerScore < RightPlayerScore) {
                while (true) {
                    basic.showString("" + RightPlayer + " wins!")
                }
            } else {
                while (true) {
                    basic.showString(" Draw!")
                }
            }
        }
    } else if (!(Pause)) {
        led.plotBarGraph(
        MatchTime * 60000 - control.millis(),
        MatchTime * 60000
        )
    }
})
