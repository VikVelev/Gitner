const Discord = require('discord.js');
const DiscordToken = require('./credentials')
const client = new Discord.Client();
const axios = require('axios').default;

client.once('ready', () => {
	console.log('Ready!');
});

let current = 0;

let users = {
    "VikVelev" :0,
    "wangyida": 1,
    "lyuben-todorov":2,
    "nikifaets": 3,
    "zvezdin" :4,
    "harshitsinghai77" : 5
}

let items = [
    "313907014",
    "309142471",
    "105590837",
    "292541788",
    "302926814",
    "123235",
    "302050767",
    "239201565",
    "314321436",
    "210187897",
    "287064874",
    "287086670",
    "305531165",
    "295803355",
    "230105785",
    "105822413",
    "306693544",
    "247161307",
    "279966275",
    "220065188",
    "11512043",
    "27609918",
    "240920902",
    "296741564",
    "52729242",
    "110178895",
    "36040894",
    "305204141",
    "287597740",
    "172562475",
    "313085547",
    "312798229",
    "311338155",
    "312337313",
    "179663462",
    "309636647",
    "226452642",
    "62852742",
    "6701057",
    "278406578"
]

client.on('message', async (message) => {
    if (message.content.startsWith("!gitner ")) {
        let command = message.content.split("!gitner ")[1];

        if (command.startsWith("match ")) {
            
            let user = command.split("match ")[1]
            
            let userId = users[user];

            let res = await axios({
                method: "get",
                url: `http://localhost:5000/predict`
            })

            res = res.data.data;
            repoId = items[res[userId][current % 8]];
            
            let githubRepo = await axios({
                method: "get",
                url: `https://api.github.com/repositories/${repoId}`,
            })
            
            githubRepo = githubRepo.data
            
            message.react('👌');

            const embed = new Discord.MessageEmbed()
                .setTitle(`Hey ${message.author.username}, I think ${githubRepo.full_name} is cool!`)
                .setAuthor("Gitner thinks this is best for you!", "https://i.ibb.co/Fqw0Scq/Untitled-Diagram.jpg")
                /*
                * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                */
                .setColor(0x00AE86)
                .setDescription(githubRepo.description)
                .setFooter("MLH Fellowship Fall 2020 Batch 1", "https://i.ibb.co/Fqw0Scq/Untitled-Diagram.jpg")
                .setImage(githubRepo.owner.avatar_url)
                /*
                * Takes a Date object, defaults to current date.
                */
                .setTimestamp()
                .setURL(githubRepo.html_url)
                .addField("Last Active", "Yesterday", true)
                .addField("Open Issues", githubRepo.open_issues + 1, true)
                
            message.channel.send({ embed });
        }
    }
});

client.login(DiscordToken);