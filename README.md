Conway's Game of life

Conway's Game of Life is considered one of the most significant and elegant algorithms in the world, combining art and science. From two or three basic rules, this algorithm has the astonishing ability to simulate a Turing machine
Rules are simples, in a population of cells:
-a living cell can only survive the next generation if it has only two or three neighbors.
-a dead cell only survives the next generation if it has only three neighbors.
My implementation of this game was done in javascript
The script.js file contains all the logic of the code: definition of a generation, function which calculates the neighbors of each cell of the given generation, a function which calculates the new generation from the neighbors.
The main.js file is the entry point for my code, also contains the game's start function.
