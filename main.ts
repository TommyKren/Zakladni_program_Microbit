function Vymaz_zprav () {
    typZpravy = ""
    ciselnaZprava = 0
}
function Snake () {
    images.iconImage(IconNames.No).showImage(0, 2000)
}
function Prijmout_smajlik () {
    images.iconImage(IconNames.No).showImage(0, 2000)
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
    Stisk_A = false
    Stisk_B = true
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
    Stisk_A = true
    Stisk_B = false
})
function Kamen_nuzky_papir () {
    radio.setGroup(1)
    radio.sendValue("test", -1)
    listKamNuzPap = [images.createImage(`
        . # # # .
        # # # . #
        # . # . #
        # . # # #
        . # # # .
        `), images.createImage(`
        . . . # #
        # # . # #
        . . # . .
        # # . # #
        . . . # #
        `), images.createImage(`
        # # # . .
        # . # # .
        # . # # #
        # . . . #
        # # # # #
        `)]
    listVyhraProhra = [images.createImage(`
        # # # # #
        # . . . #
        . # # # .
        . . # . .
        . # # # .
        `), images.iconImage(IconNames.Sad), images.iconImage(IconNames.No)]
    zvolenyTah = 0
    akceProbehla = false
    while (true) {
        basic.pause(100)
        while (!(input.isGesture(Gesture.Shake))) {
            images.createBigImage(`
                . . # . . . . . . .
                . # # # . . . . . .
                . . # . . . . # . .
                . . . . . . # # # .
                . . . . . . . # . .
                `).scrollImage(5, 200)
        }
        if (!(akceProbehla)) {
            zvolenyTah = randint(0, 2)
            radio.sendValue(listTypuZprav[0], zvolenyTah)
            music.playSoundEffect(music.builtinSoundEffect(soundExpression.giggle), SoundExpressionPlayMode.InBackground)
            akceProbehla = true
            listKamNuzPap[zvolenyTah].showImage(0, 500)
        }
        while (true) {
            basic.pause(100)
            if (typZpravy == listTypuZprav[0]) {
                dobaStridaniAnimace = 500
                listKamNuzPap[zvolenyTah].showImage(0, dobaStridaniAnimace)
                if (ciselnaZprava == zvolenyTah) {
                    listVyhraProhra[2].showImage(0, dobaStridaniAnimace)
                } else if (ciselnaZprava + 1 == zvolenyTah || ciselnaZprava - 2 == zvolenyTah) {
                    listVyhraProhra[1].showImage(0, dobaStridaniAnimace)
                } else {
                    listVyhraProhra[0].showImage(0, dobaStridaniAnimace)
                }
            }
            if (Stisk_A) {
                akceProbehla = false
                Vymaz_zprav()
                break;
            }
        }
        if (Stisk_A && Stisk_B) {
            Reset_stisku_AB()
            break;
        }
        Reset_stisku_AB()
    }
}
function Pozdrav (_Jmeno: string) {
    basic.showString("Ahoj," + _Jmeno)
    basic.showString("Zvol appku")
}
function Kompas () {
    input.calibrateCompass()
    while (true) {
        basic.pause(500)
        basic.showArrow(input.compassHeading())
        if (Stisk_A && Stisk_B) {
            Reset_stisku_AB()
            break;
        }
    }
}
function Sirena () {
    images.iconImage(IconNames.No).showImage(0, 2000)
}
function Reset_stisku_AB () {
    Stisk_A = false
    Stisk_B = false
}
radio.onReceivedValue(function (name, value) {
    typZpravy = name
    ciselnaZprava = value
    if (typZpravy == listTypuZprav[1]) {
        prijatySmajlik = ciselnaZprava
    }
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_AB, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
    Stisk_A = true
    Stisk_B = true
})
function Poslat_smajlik () {
    rolovaniNabidkou = 0
    Reset_stisku_AB()
    radio.setGroup(1)
    while (true) {
        Vymaz_zprav()
        listSmajliku[rolovaniNabidkou].showImage(0, 200)
        if (Stisk_B && !(Stisk_A)) {
            Reset_stisku_AB()
            if (rolovaniNabidkou == listSmajliku.length - 1) {
                rolovaniNabidkou = 0
            } else {
                rolovaniNabidkou = rolovaniNabidkou + 1
            }
        }
        if (Stisk_A && !(Stisk_B)) {
            Reset_stisku_AB()
            radio.sendValue(listTypuZprav[1], rolovaniNabidkou)
        }
        if (Stisk_A && Stisk_B) {
            akceProbehla = false
            Vymaz_zprav()
            break;
        }
    }
    rolovaniNabidkou = 0
}
let dobaStridaniAnimace = 0
let akceProbehla = false
let zvolenyTah = 0
let listVyhraProhra: Image[] = []
let listKamNuzPap: Image[] = []
let Stisk_B = false
let Stisk_A = false
let ciselnaZprava = 0
let typZpravy = ""
let rolovaniNabidkou = 0
let prijatySmajlik = 0
let listTypuZprav: string[] = []
let listSmajliku: Image[] = []
let listJmena = ["LUKY", "TERKO"]
let Jmeno = listJmena[0]
let listIkon = [
images.createBigImage(`
    # # # # # . . # . .
    # # . # # . # . # .
    # . # . # # # # # #
    # . . . # # # . # #
    # # # # # # . # . #
    `),
images.createBigImage(`
    # # # # # . . # # #
    # # . # # . . # # .
    # . # . # . . # . #
    # . . . # . . # # #
    # # # # # . . . . .
    `),
images.createBigImage(`
    . . . # # # . . # #
    # # . # # . # . # .
    . . # . . . . # . .
    # # . # # . # . # .
    . . . # # # . . # #
    `),
images.createBigImage(`
    . # # # . . # # # .
    # . # . # # . . # #
    # . # . # # . # . #
    # . . . # # . . . #
    . # # # . . # # # .
    `),
images.createBigImage(`
    . . . . . # . # . #
    . . # . . . # # # .
    . # # # . # # . # #
    . . # . . . # # # .
    . . . . . # . # . #
    `),
images.createBigImage(`
    . . . # # . . . # #
    . . # . # . . # . #
    . . # # . . . # # .
    . . . . . # # . . .
    . . . . . . # . . .
    `)
]
listSmajliku = [
images.iconImage(IconNames.Happy),
images.iconImage(IconNames.Sad),
images.iconImage(IconNames.Surprised),
images.iconImage(IconNames.Heart),
images.iconImage(IconNames.Ghost),
images.iconImage(IconNames.Yes)
]
listTypuZprav = ["KaNuPa", "Smajl"]
prijatySmajlik = -1
rolovaniNabidkou = 0
Reset_stisku_AB()
basic.forever(function () {
    listIkon[rolovaniNabidkou].scrollImage(5, 400)
    if (Stisk_B && !(Stisk_A)) {
        Reset_stisku_AB()
        if (rolovaniNabidkou == listIkon.length - 1) {
            rolovaniNabidkou = 0
        } else {
            rolovaniNabidkou = rolovaniNabidkou + 1
        }
    }
    if (Stisk_A && !(Stisk_B)) {
        Reset_stisku_AB()
        if (rolovaniNabidkou == 0) {
            Prijmout_smajlik()
        } else if (rolovaniNabidkou == 1) {
            Poslat_smajlik()
        } else if (rolovaniNabidkou == 2) {
            Kamen_nuzky_papir()
        } else if (rolovaniNabidkou == 3) {
            Kompas()
        } else if (rolovaniNabidkou == 4) {
            Sirena()
        } else if (rolovaniNabidkou == 5) {
            Snake()
        }
        rolovaniNabidkou = 0
    }
})
