var inspect = require('util').inspect

var _log = (t) => console.log(inspect(t, {color: true, depth: Infinity}))

var dict = [['label','en','es','fr'],
	['casa','home','casa','maison'],
	['perro','dog','perro','chien'],
	['gato','cat','gato','chat'],
	['mujer','woman','mujer','femme'],
	['hombre','man','hombre','homme'],
	['carro','car','carro','voiture']]

_log(dict[0])