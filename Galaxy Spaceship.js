let rock = 0 // The location of randomized rock
let player = 0 // The location of player
let killed = 0 // If player has been killed
let playerScore = 0 // The score of player
let welcome = 1
let graph = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
]


input.onButtonPressed(Button.B, function() {
  if (player < 4 && !(killed) && !(welcome)) {
    player = player + 1
    led.plot(player, 4)
    led.unplot(player - 1, 4)
  }
})


input.onButtonPressed(Button.A, function() {
  if (player > 0 && !(killed) && !(welcome)) {
    player = player - 1
    led.plot(player, 4)
    led.unplot(player + 1, 4)
  }
})


while (true) {
  // Restart if player presses A and B after died.
  killed = 0
  welcome = 1
  player = 2
  playerScore = 0
  graph = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]

  while (welcome) {
    // Show welcome screen
    basic.showLeds(`
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            . . . . .
            `)
    input.onButtonPressed(Button.AB, function() {
      if (!killed) {
        welcome = 0
        // Unplot all leds
        basic.clearScreen()
        led.plot(player, 4)
      }
    })
  }

  while (true) {
    // Check if player has died
    for (let k = 0; k <= 4; k++) {
      if (graph[k][4] == 1 && k == player) {
        basic.showLeds(`
                    # . . . #
                    . # . # .
                    . . # . .
                    . # . # .
                    # . . . #
                    `)
        killed = 1
        break
      }
    }
    if (killed) {
      basic.pause(800)
      basic.clearScreen() // Clear 'X' mark
      if (playerScore >= 5) {
        basic.showNumber(playerScore - 5, 200)
      } else {
        basic.showNumber(0, 200)
      }
      break
    }
    // If player still alive, score + 1 and pause a littile bit
    playerScore += +1
    basic.pause(400)
    // Unplot all leds except player
    for (let l = 0; l <= 4; l++) {
      for (let m = 0; m <= 4; m++) {
        if (l != player || m != 4) {
          led.unplot(l, m)
        }
      }
    }
    // Move each line to the next
    for (let n = 0; n <= 4; n++) {
      for (let o = 4; o >= 1; o--) {
        graph[n][o] = graph[n][o - 1]
      }
    }
    // Generate new point
    rock = Math.randomRange(0, 4)
    // Clean previous leds on the first line
    for (let p = 0; p <= 4; p++) {
      graph[p][0] = 0
    }
    // Plot first line (generated randomly)
    graph[rock][0] = 1
    // Plot rest of lights based on graph matrix
    for (let q = 0; q <= 4; q++) {
      for (let r = 0; r <= 4; r++) {
        if (graph[q][r] == 1) {
          led.plotBrightness(q, r, 10)
        }
      }
    }
  }
}