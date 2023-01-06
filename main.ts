function Snake () {
	
}
function Kamen_nuzky_papir () {
	
}
function Precist_zpravu () {
	
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    Stisk_A = true
    Stisk_B = false
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_B, EventBusValue.MICROBIT_BUTTON_EVT_DOWN, function () {
    Stisk_A = false
    Stisk_B = true
})
function Kompas () {
	
}
function Sirena () {
	
}
function Reset_stisku_AB () {
    Stisk_A = false
    Stisk_B = false
}
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_AB, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
    Stisk_A = true
    Stisk_B = true
})
function Poslat_zpravu () {
    while (!(Stisk_A) && !(Stisk_B)) {
    	
    }
}
let Stisk_B = false
let Stisk_A = false
let listJmena = ["LUKY", "TERKO"]
let Jmeno = listJmena[1]
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
let listSmajliku = [
images.iconImage(IconNames.Happy),
images.iconImage(IconNames.Sad),
images.iconImage(IconNames.Surprised),
images.iconImage(IconNames.Heart),
images.iconImage(IconNames.Ghost),
images.iconImage(IconNames.Yes)
]
basic.showString("Ahoj," + Jmeno)
basic.showString("Zvol appku")
let rolovaniNabidkou = 0
Reset_stisku_AB()
basic.forever(function () {
    listIkon[rolovaniNabidkou].scrollImage(5, 500)
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
        rolovaniNabidkou = 0
        if (rolovaniNabidkou == 0) {
            Precist_zpravu()
        } else if (rolovaniNabidkou == 1) {
            Poslat_zpravu()
        } else if (rolovaniNabidkou == 2) {
            Kamen_nuzky_papir()
        } else if (rolovaniNabidkou == 3) {
            Kompas()
        } else if (rolovaniNabidkou == 4) {
            Sirena()
        } else if (rolovaniNabidkou == 5) {
            Snake()
        } else {
        	
        }
    }
})
