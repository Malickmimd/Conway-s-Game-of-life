
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
