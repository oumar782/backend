'use strict'
const { promisify } = require('util')
cont {ReadFile} = require('fs')
const Readfileasync  =promisify(ReadFile)
const options ={encoding: 'UTF-8'}
const url ='../public/index.html'
module.exports  = async()=>{
const contenu  =await Readfileasync(url,options)
return contenu
}