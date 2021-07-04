//packages

const Discord = require('discord.js')
const config = require('./configs/config.json')
const fs = require('fs')
const { Database } = require('quickmongo')
//const db = new Database(config.database)
const mongoose = require('mongoose')





//handlers + client

const client = new Discord.Client();
//client.commands = new Discord.collection()
//client.events = new Discord.collection()

//["command_handler", "event_handler"].forEach((handler) => {
//    require(`./handlers/${handler}`)(client, Discord);
//})

mongoose.connect(config.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}).then(() => {
    console.log("connected to database")
}).catch(err => {
    console.log(err)
})


//events

client.on('ready',  () => {
    console.log(`logged in as ${client.user.tag}`)
})


//chat
client.on('message', async (message) => {

})





client.login(config.token)
