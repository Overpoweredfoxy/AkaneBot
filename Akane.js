//packages

const Discord = require('discord.js')
const config = require('./configs/config.json')
const fs = require('fs')
const { Database } = require('quickmongo')
//const db = new Database(config.database)



//handlers + client

const client = new Discord.Client();


//events

client.on('ready',  () => {
    console.log(`logged in as ${client.user.tag}`)
})


//chat
client.on('message', async (message) => {
    
})


client.login(config.token)
