let isPlaying = false // Variable pour suivre l'état du jeu
let intervalID// ID de l'intervalle pour arrêter le jeu plus tard si nécessaire
let mondeInitial

function start () {
  const startButton = document.getElementById('startButton')
  isPlaying = !isPlaying // Inverser l'état du jeu

  if (isPlaying) {
    // Démarrer le jeu
    intervalID = setInterval(() => {
      const voisins = compteVoisins(mondeInitial)
      const nouveauMonde = majMonde(mondeInitial, voisins)
      afficherMonde(nouveauMonde)
      mondeInitial = nouveauMonde // Mettre à jour le monde initial
    }, 200)
    startButton.innerText = 'Stop'
  } else {
    // Arrêter le jeu
    clearInterval(intervalID)
    startButton.innerText = 'Start'
  }
}

function randomize () {
  const nouveauMonde = initialiserMonde(50, 100)
  afficherMonde(nouveauMonde)
  mondeInitial = nouveauMonde
}
function clear () {
  const mondeVide = initialiserMonde(50, 100, true)
  afficherMonde(mondeVide)
  mondeInitial = mondeVide
}

function lancerJeu () {
  // Initialiser un monde aléatoire et l'afficher sur la grille
  mondeInitial = initialiserMonde(50, 100)
  afficherMonde(mondeInitial)

  // Associer les écouteurs d'événements aux boutons
  const startButton = document.getElementById('startButton')
  const randomizeButton = document.getElementById('randomizeButton')
  const clearButton = document.getElementById('clearButton')

  startButton.addEventListener('click', () => {
    start()
  })
  randomizeButton.addEventListener('click', () => {
    randomize()
  })

  clearButton.addEventListener('click', () => {
    clear()
  })
}

lancerJeu()
