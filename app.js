var inspect = require('util').inspect

var _log = (t) => console.log(inspect(t, {color: true, depth: Infinity}))

var dict = [['label','en','es','fr'],
	['CASA','home','casa','maison'],
	['PERRO','dog','perro','chien'],
	['GATO','cat','gato','chat'],
	['MUJER','woman','mujer','femme'],
	['HOMBRE','man','hombre','homme'],
	['CARRO','car','carro','voiture']]

var result = dict.reduce((langFile,row,idx) => {

	//header processing
	if(idx == 0){
		row.forEach((e, rowIdx) => {
			if(rowIdx > 0) langFile[e] = {}
		})

		return langFile
	}
	else{
		Object.keys(langFile).map((lang, i) => {
			var ii = i+1
			langFile[lang][row[0]] = row[ii]
		})
	}


	return langFile

}, {})

console.log('=========================================================')
_log(result)