const Discord = require('discord.js');
const DiscordToken = require('./credentials')
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if (message.content.startsWith("!gitner ")) {
        let command = message.content.split("!gitner ")[1];

        if (command.startsWith("match ")) {
            let project = command.split("match ")[1]
            console.log(message.content);
            
            message.react('👌');
            const embed = new Discord.MessageEmbed()
                .setTitle(`Hey ${message.author.username}, I found this juicy issue just for your liking!`)
                .setAuthor("Gitner thinks this is best for you!", "https://i.ibb.co/Fqw0Scq/Untitled-Diagram.jpg")
                /*
                * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                */
                .setColor(0x00AE86)
                .setDescription("This is the main body of text, it can hold 2048 characters.")
                .setFooter("This is the footer text, it can hold 2048 characters", "http://i.imgur.com/w1vhFSR.png")
                .setImage("http://i.imgur.com/yVpymuV.png")
                .setThumbnail("http://i.imgur.com/p2qNFag.png")
                /*
                * Takes a Date object, defaults to current date.
                */
                .setTimestamp()
                .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
                .addField("This is a field title, it can hold 256 characters",
                "This is a field value, it can hold 1024 characters.")
                /*
                * Inline fields may not display as inline if the thumbnail and/or image is too big.
                */
                .addField("Inline Field", "They can also be inline.", true)
                .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
                
            message.channel.send({ embed });
        } else {
            let embed = new Discord.MessageEmbed();
            // Request here
            embed.setTitle(`Hey ${message.author.username}, I found this juicy issue just for your liking!`)
                .setAuthor("Gitner thinks this is best for you!", "https://i.ibb.co/Fqw0Scq/Untitled-Diagram.jpg")
                /*
                * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                */
                .setColor(0x00AE86)
                .setDescription("Repository description")
                .setFooter("Gitner - Product of the Halfway MLH Fellowship Hackathon", "https://i.ibb.co/Fqw0Scq/Untitled-Diagram.jpg")
                .setThumbnail("http://i.imgur.com/p2qNFag.png")
                .setTimestamp()
                .setURL("https://github.com/")
                .addField("This is a field title. Some issue stats here",
                "This is a field value. Some issue stats here")
                /*
                * Inline fields may not display as inline if the thumbnail and/or image is too big.
                */
            message.channel.send({ embed })
        }
    }
});

client.login(DiscordToken);