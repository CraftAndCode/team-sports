input.onButtonPressed(Button.A, function () {
    if (!(Pause)) {
        Pause = true
        basic.showNumber(LeftPlayerScore)
        basic.pause(1000)
        Pause = false
    }
})
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    if (!(Pause)) {
        Pause = true
        basic.showNumber(RightPlayerScore)
        basic.pause(1000)
        Pause = false
    }
})
let PauseTime = 0
let Pause = false
let RightPlayerScore = 0
let LeftPlayerScore = 0
let LeftPlayer = "Player 1"
let RightPlayer = "Player 2"
LeftPlayerScore = 0
RightPlayerScore = 0
let ScoreToWin = 5
let MatchTime = 60
basic.showArrow(ArrowNames.North)
while (!(input.logoIsPressed())) {
    basic.pause(1)
}
basic.clearScreen()
music.setVolume(255)
music.playTone(466, music.beat(BeatFraction.Whole))
music.rest(music.beat(BeatFraction.Whole))
music.playTone(466, music.beat(BeatFraction.Whole))
music.rest(music.beat(BeatFraction.Whole))
music.playTone(466, music.beat(BeatFraction.Whole))
music.rest(music.beat(BeatFraction.Whole))
music.playTone(932, music.beat(BeatFraction.Double))
basic.showString("GO!")
basic.pause(1000)
Pause = false
let TimeLeft = MatchTime * 1000
let StartTime = control.millis()
basic.forever(function () {
    pins.setPull(DigitalPin.P1, PinPullMode.PullDown)
    pins.setPull(DigitalPin.P2, PinPullMode.PullDown)
    if (!(Pause)) {
        if (pins.digitalReadPin(DigitalPin.P1) == 0 && !(pins.digitalReadPin(DigitalPin.P2) == 0)) {
            for (let index = 0; index <= 50; index++) {
                basic.pause(10)
                if (!(pins.digitalReadPin(DigitalPin.P1) == 0) || pins.digitalReadPin(DigitalPin.P2) == 0) {
                    break;
                }
                if (index == 50) {
                    PauseTime = control.millis()
                    Pause = true
                    RightPlayerScore += 1
                    music.startMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
                    basic.showNumber(RightPlayerScore)
                    while (pins.digitalReadPin(DigitalPin.P1) == 0) {
                        basic.pause(1)
                    }
                    Pause = false
                    StartTime += control.millis() - PauseTime
                }
            }
        }
        if (pins.digitalReadPin(DigitalPin.P2) == 0 && !(pins.digitalReadPin(DigitalPin.P1) == 0)) {
            for (let index = 0; index <= 50; index++) {
                basic.pause(10)
                if (!(pins.digitalReadPin(DigitalPin.P2) == 0) || pins.digitalReadPin(DigitalPin.P1) == 0) {
                    break;
                }
                if (index == 50) {
                    PauseTime = control.millis()
                    Pause = true
                    LeftPlayerScore += 1
                    music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
                    basic.showNumber(LeftPlayerScore)
                    while (pins.digitalReadPin(DigitalPin.P2) == 0) {
                        basic.pause(1)
                    }
                    Pause = false
                    StartTime += control.millis() - PauseTime
                }
            }
        }
        TimeLeft = MatchTime * 1000 - (control.millis() - StartTime)
    }
})
basic.forever(function () {
    if (TimeLeft <= 0 || (LeftPlayerScore > ScoreToWin || RightPlayerScore > ScoreToWin)) {
        Pause = true
        music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
        if (LeftPlayerScore > RightPlayerScore) {
            while (true) {
                proportionalFont.showString("" + LeftPlayer + " wins! ", 150)
            }
        } else if (LeftPlayerScore < RightPlayerScore) {
            while (true) {
                proportionalFont.showString("" + RightPlayer + " wins! ", 150)
            }
        } else {
            while (true) {
                proportionalFont.showString(" Draw!", 150)
            }
        }
    } else if (!(Pause)) {
        led.plotBarGraph(
        TimeLeft,
        MatchTime * 1000
        )
    }
})
