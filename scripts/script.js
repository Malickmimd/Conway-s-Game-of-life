
function compteVoisins (monde) {
  const voisins = []
  for (let i = 0; i < monde.length; i++) {
    voisins[i] = []
    for (let j = 0; j < monde[i].length; j++) {
      let nombrevoisins = 0
      for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
          // Vérifier si les indices sont valides et si la cellule n'est pas celle actuelle
          if (x >= 0 && x < monde.length && y >= 0 && y < monde[i].length && !(x === i && y === j)) {
            nombrevoisins += monde[x][y]
          }
        }
      }
      voisins[i][j] = nombrevoisins
    }
  }
  return voisins
}

function majMonde (monde, voisins) {
  const newMonde = []
  for (let i = 0; i < monde.length; i++) {
    newMonde[i] = []
    for (let j = 0; j < monde[i].length; j++) {
      if (monde[i][j] === 1) {
        if (voisins[i][j] === 2 | voisins[i][j] === 3) {
          newMonde[i][j] = 1
        } else {
          newMonde[i][j] = 0
        }
      } else {
        if (voisins[i][j] === 3) {
          newMonde[i][j] = 1
        } else {
          newMonde[i][j] = 0
        }
      }
    }
  }
  return newMonde
}

function initialiserMonde (tailleLigne, tailleColonne, isClear) {
  const monde = []
  for (let i = 0; i < tailleLigne; i++) {
    monde[i] = []
    for (let j = 0; j < tailleColonne; j++) {
      if (isClear === true) {
        monde[i][j] = 0
      } else {
        // Générer un nombre aléatoire entre 0 et 1
        const randomNum = Math.random()
        // Si le nombre aléatoire est inférieur à 0.2, attribuer 1 (vivant), sinon attribuer 0 (mort)
        monde[i][j] = randomNum < 0.1 ? 1 : 0
      }
    }
  }
  return monde
}
function afficherMonde (monde) {
  const gridContainer = document.querySelector('.grid-container')
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild)
  }
  for (let i = 0; i < monde.length; i++) {
    for (let j = 0; j < monde[i].length; j++) {
      const item = document.createElement('div')
      item.classList.add('grid-item')
      if (monde[i][j] === 1) {
        item.classList.add('grid-item-alive')
      }
      item.addEventListener('click', function () {
        monde[i][j] = monde[i][j] === 1 ? 0 : 1
        afficherMonde(monde)
      })
      gridContainer.appendChild(item)
    }
  }
}

function start (actuelMonde, isPlaying) {
  let intervalID
  const startButton = document.getElementById('startButton')
  startButton.addEventListener('click', () => {
    isPlaying = !isPlaying
    if (isPlaying) {
      intervalID = setInterval(() => {
        const voisins = compteVoisins(actuelMonde)
        const newMonde = majMonde(actuelMonde, voisins)
        afficherMonde(newMonde)
        actuelMonde = newMonde
      }, 200)
      startButton.innerText = 'Stop'
    } else {
      // Arrêter le jeu
      clearInterval(intervalID)
      startButton.innerText = 'Start'
      const randomizeButton = document.getElementById('randomizeButton')
      randomizeButton.addEventListener('click', () => {
        actuelMonde = initialiserMonde(50, 100)
        afficherMonde(actuelMonde)
      })
      const clearButton = document.getElementById('clearButton')
      clearButton.addEventListener('click', () => {
        actuelMonde = initialiserMonde(50, 100, true)
        afficherMonde(actuelMonde)
      })
    }
  })
}

function randomize () {
  let monde = initialiserMonde(50, 100)
  afficherMonde(monde)
  const randomizeButton = document.getElementById('randomizeButton')
  randomizeButton.addEventListener('click', () => {
    monde = initialiserMonde(50, 100)
    afficherMonde(monde)
  })
  monde = clear()
  start(monde, false)
}

function clear () {
  const isClear = true
  let clearMonde
  const clearButton = document.getElementById('clearButton')
  clearButton.addEventListener('click', () => {
    clearMonde = initialiserMonde(50, 100, isClear)
    afficherMonde(clearMonde)
  })
  return clearMonde
}

function lancerJeu () {
  randomize()
}
