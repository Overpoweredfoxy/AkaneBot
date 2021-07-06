//packages

const Discord = require('discord.js')
const config = require('./configs/config.json')
const fs = require('fs')
PREFIX = ">"





//handlers + client

const client = new Discord.Client();





//events

client.on('ready',  () => {
    console.log(`logged in as ${client.user.tag}`)
})


//chat
client.on('message', async (message) => {

    //if bot return
    if (message.author.bot) return;
    const args = message.content.slice(PREFIX.length).trim().split(' ');

    if (!message.content.startsWith(PREFIX)) return;
	const input = message.content.slice(PREFIX.length).trim();
	if (!input.length) return;
	const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

    if(command === "ping"){
        message.channel.send(`Ping: ${client.ws.ping}ms.`);

    }else if(command === "profile"){
        
        fs.readFile(`./profiles/${message.author.id}.json`, 'utf8', (err, data) => {
            if(err){
                console.log(err)
                message.channel.send("you/that person dosent have a profile")
            }else{
                
                const proUser = JSON.parse(data)
                const profileEmbed = new Discord.MessageEmbed()
                    .setTitle(proUser.username)
                    .setThumbnail(message.author.avatarURL())
                    .setDescription(proUser.des)
                    .setColor(proUser.color)
                    .addFields(
                        {name: "pronouns", value: proUser.pronouns},
                        {name:"age", value: proUser.age},
                        {name:"likes", value: proUser.yeslike},
                        {name:"dislikes", value: proUser.nolikes},
                        {name:"location", value: proUser.where}
                    )
                message.channel.send(profileEmbed)
            }


        })

        

        

    }else if(command === "create"){
        
        fs.readFile(`./profiles/${message.author.id}.json`, 'utf8', (err, data) => {
            if(err){
                console.log(err)
                message.channel.send("Profile created!")
                //aditional input
               const defaultPro = {
                "username" : message.author.tag,
                "pronouns" : "No pronouns",
                "age" : "No age",
                "sexuality" : "No sexuality",
                "des" : "No bio",
                "yeslike" : "No likes",
                "nolikes" :"No dislikes",
                "where": "No location", 
                "color": "#000000",
                "thumbnail": "https://maxcdn.icons8.com/Share/icon/Logos/discord_logo1600.png"
                }
                const datae = JSON.stringify(defaultPro)
                fs.writeFile(`./profiles/${message.author.id}.json`, datae, function(err){
                    if (err) throw err;
                    

                })
                
            }else{
                message.channel.send("You already have a profile use >edit to edit it")
            }
        })
    }else if(command === "color"){
        if (args[1] === "") return;
        if((/^#[0-9A-F]{6}$/i.test(args[1]) === true)){
            fs.readFile(`./profiles/${message.author.id}.json`, 'utf8', function (err,data) {
                if (err) {
                  return console.log(err);
                }
                const proUser = JSON.parse(data)
                var result = data.replace(proUser.color, args[1]);
              
                fs.writeFile(`./profiles/${message.author.id}.json`, result, 'utf8', function (err) {
                   if (err) return console.log(err);
                });
              });

        }else{
            message.channel.send("invalid hex code")
        }
    }else if(command === "bio"){
        if (args[1] === "") return;
        fs.readFile(`./profiles/${message.author.id}.json`, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            const proUser = JSON.parse(data)
            var result = data.replace(proUser.des, message.content.replace(">bio", ""));
          
            fs.writeFile(`./profiles/${message.author.id}.json`, result, 'utf8', function (err) {
               if (err) return console.log(err);
            });
          });
    }else if(command === "pronouns"){
        if (args[1] === "") return;
        fs.readFile(`./profiles/${message.author.id}.json`, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            const proUser = JSON.parse(data)
            var result = data.replace(proUser.pronouns, message.content.replace(">pronouns", ""));
          
            fs.writeFile(`./profiles/${message.author.id}.json`, result, 'utf8', function (err) {
               if (err) return console.log(err);
            });
          });
    }else if(command === "age"){
        if (args[1] === "") return;
        fs.readFile(`./profiles/${message.author.id}.json`, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            const proUser = JSON.parse(data)
            var result = data.replace(proUser.age, message.content.replace(">age", ""));
          
            fs.writeFile(`./profiles/${message.author.id}.json`, result, 'utf8', function (err) {
               if (err) return console.log(err);
            });
          });

    }else if(command === "likes"){
        if (args[1] === "") return;
        fs.readFile(`./profiles/${message.author.id}.json`, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            const proUser = JSON.parse(data)
            var result = data.replace(proUser.yeslike, message.content.replace(">likes", ""));
          
            fs.writeFile(`./profiles/${message.author.id}.json`, result, 'utf8', function (err) {
               if (err) return console.log(err);
            });
          });
    }else if(command === "dislikes"){
        if (args[1] === "") return;
        fs.readFile(`./profiles/${message.author.id}.json`, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            const proUser = JSON.parse(data)
            var result = data.replace(proUser.nolikes, message.content.replace(">dislikes", ""));
          
            fs.writeFile(`./profiles/${message.author.id}.json`, result, 'utf8', function (err) {
               if (err) return console.log(err);
            });
          });
    }else if(command === "location"){
        if (args[1] === "") return;
        fs.readFile(`./profiles/${message.author.id}.json`, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            const proUser = JSON.parse(data)
            var result = data.replace(proUser.where, message.content.replace(">location", ""));
          
            fs.writeFile(`./profiles/${message.author.id}.json`, result, 'utf8', function (err) {
               if (err) return console.log(err);
            });
          });
    }else if(command === "find"){
        
        var files = fs.readdirSync('./profiles/')
        var arraylen = files.length
        
        var randomFilenum = Math.floor(Math.random() * arraylen)
        
        fs.readFile(`./profiles/${files[randomFilenum]}`, 'utf8', (err, data) => {
            if(err){
                console.log(err)
                message.channel.send("Error occured")
            }else{
                
                const proUser = JSON.parse(data)
                const profileEmbed = new Discord.MessageEmbed()
                    .setTitle(proUser.username)
                    .setThumbnail("https://cdn.discordapp.com/attachments/855786017344978968/861660973793935390/bd6b28005c26d079486063a4976dfb44.png")
                    .setDescription(proUser.des)
                    .setColor(proUser.color)
                    .addFields(
                        {name: "pronouns", value: proUser.pronouns},
                        {name:"age", value: proUser.age},
                        {name:"likes", value: proUser.yeslike},
                        {name:"dislikes", value: proUser.nolikes},
                        {name:"location", value: proUser.where}
                    )
                message.channel.send(profileEmbed)
            }


        })

    }else if(command === "help"){
        const helpmenu = new Discord.MessageEmbed()
				.setColor('#0000FF')
 				.setTitle('Help')
            	.setDescription('Help commands')
            	
				.addFields(
					{ name: '>find', value:'finds profiles', inline: true},
                    { name: '>profile', value: 'displays your profile',inline: true },
					{ name: '>create', value: 'creates profile',inline: true },
					{ name: '>pronouns', value: 'edits pronouns >pronouns (prounouns here)',inline: true },
					{ name: '>age', value: 'edits age >age (age here)',inline: true },
                    { name: '>likes', value: 'edits likes >likes (likes here)',inline: true },
                    { name: '>dislikes', value: 'edits dislikes >dislikes (dislikes here)',inline: true },
                    { name: '>location', value: 'edits location >location (location here)',inline: true },
                    { name: '>bio', value: 'edits location >bio (bio here5)',inline: true },
                    { name: '>color', value: 'edits color >color (hex color here)',inline: true },
					
				)

				message.channel.send(helpmenu)
    }
    
    else{
        message.channel.send("that isnt a command")
    }

})



client.login(config.token)
