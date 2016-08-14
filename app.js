var fs = require('fs')
var _ = require('lodash')
var inspect = require('util').inspect

var _log = (t) => console.log(inspect(t, {colors: true, depth: Infinity}))

var dict = [['label','en','es','fr'],
	['CASA','house','casa','maison'],
	['CASA.PUERTA','door','puerta','porte'],
	['CASA.PISO','floor','piso','sol'],
	['CASA.MUEBLES.SOFA','couch','sofa','canapé'],
	['CASA.MUEBLES.CAMA','bed','cama','lit'],
	['CASA.MUEBLES.MESA','table','mesa','maison'],
	['PERRO','dog','perro','chien'],
	['GATO','cat','gato','chat'],
	['MUJER','woman','mujer','femme'],
	['HOMBRE','man','hombre','homme'],
	['CARRO','car','carro','voiture']]

var translations = dict.reduce((langFile, row, idx) => {

	//header processing
	if(idx == 0){
		row.forEach((e, rowIdx) => {
			if(rowIdx > 0) langFile[e] = {}
		})
		return langFile
	}
	else{
		Object.keys(langFile).map((lang, i) => {
			_.set(langFile[lang], row[0], row[i+1])
		})
	}

	return langFile

}, {})

console.log('translations done')
_log(translations)
console.log('=========================================================')
console.log('writing files')

Object.keys(translations).forEach((lang) => {
	var data = translations[lang]
	fs.writeFileSync(`lang/${lang}.json`, JSON.stringify(data))
})

console.log('done!')

process.exit(0)