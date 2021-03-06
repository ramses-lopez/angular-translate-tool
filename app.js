#!/usr/bin/env node
var fs = require('fs')
var _ = require('lodash')
var inspect = require('util').inspect

var _log = (t) => console.log(inspect(t, {colors: true, depth: Infinity}))

var fileName = 'lang/dictionary.csv'
var destinationFolder = 'lang'

var dict =
	fs.readFileSync(fileName, 'utf8')
	.split('\n')
	.map((row) => row.split(','))

console.log(fileName,'read')

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

// _log(translations)
// console.log('=========================================================')

console.log('writing files')

Object.keys(translations).forEach((lang) => {
	var data = translations[lang]
	fs.writeFileSync(`${destinationFolder}/${lang}.json`, JSON.stringify(data))
	console.log(`  written lang/${lang}.json`)
})

console.log('done!')

process.exit(0)
