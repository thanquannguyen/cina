require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const picExt = ['.webp', '.png', 'jpg', 'jpeg', 'gif'];


client.on("ready", () => {
    console.log("Turned on.");
  //    var tt = [
  //   `online`,
  //   `idle`,
  //   `dnd`
  // ]

  // setInterval(() => {
  //   const index = Math.floor(Math.random() * (tt.length - 1) + 0.5); // generates a random number between 1 and the length of the activities array list (in this case 5).
  //   client.user.setPresence({
  //     status: tt[index],
  //     activity: {
  //       name: 'Cinna',
  //       type: 'STREAMING'
  //     }
  //   })
  // }, 15000);
  client.user.setActivity("cinna", {
    type: "STREAMING",
    url: "https://www.twitch.tv/deelf"
});

});

client.on("message", async message => {
    const guild = client.guilds.cache.get('899612215739559977')
    if(guild) {
        // if (message.author.id == '180690270981980161' || message.author.bot) {
            if(message.content.substring(2).startsWith('⚠')) {
                const start = message.content.indexOf('| ') + 2;
                const end = message.content.indexOf('**,', start);
                const end2 = message.content.indexOf('**!', start);
                const s1 = message.content.substring(start,end);
                const s2 = message.content.substring(start,end2);
                const log = client.channels.cache.get(`899612222987313161`);
    
                if (message.content.includes(` Beep Boop. Please DM me `)) {
                    let user1 = client.users.cache.find(user => user.username === s1);
                    message.channel.send(`<@!${user1.id}> Giải captcha bạn ơi`);
                    if (user1) {
                        let attachment = message.attachments.array()[0];
                        if (message.attachments.array().length > 0) {
                        let embed1 = new Discord.MessageEmbed();
                        picExt.forEach(ext => {
                        embed1.setDescription(`Giải captcha đi <@!${user1.id}>\nChannel <#${user1.lastMessageChannelID}>\nChannel lấy role <#899612215827648557>`);
                        if(attachment.name.endsWith(ext)) embed1.setImage(attachment.attachment); 
                        })    
                        client.users.fetch(user1.id).then((user) => {
                            user.send(`<@!${user1.id}>\nChannel <#${user1.lastMessageChannelID}>\nChannel lấy role <#899612215827648557>`,embed1);
                        });  
                        log.send(embed1);
                    } 
                    }
                }
                else if (message.content.includes(`Please complete your captcha to verify that you are human!`)) {
                    let user2 = client.users.cache.find(user => user.username === s2);
                    message.channel.send(`<@!${user2.id}> Giải captcha bạn ơi`);
                    if (user2) {
                        let embed1 = new Discord.MessageEmbed();
                        const role = guild.roles.cache.find(role => role.name === 'Auto');
                        embed1.setDescription(`Giải captcha đi <@!${user2.id}>\nChannel <#${user2.lastMessageChannelID}>\nChannel lấy role <#899612215827648557>`);    
                        client.users.fetch(user2.id).then((user) => {
                            user.send(`<@!${user2.id}>\nChannel <#${user2.lastMessageChannelID}>\nChannel lấy role <#899612215827648557>`,embed1);
                        });  
                        const member = guild.members.cache.get(user2.id);
                        if (role) {
                            member.roles.remove(role);
                        }
                    }
    
                    }
                
            }    
        // }
    }

    // if (message.content === 'create500') {
    //     for (var i = 251; i <= 500; i++) {
    //         message.guild.channels.create(`jump ${i}`, {
    //             type: 'text',
    //         })
    //         .then((channel) => {
    //             const categoryID = '864006071366713345'
    //             channel.setParent(categoryID);
    //         })
    //     }
    // }

    if (message.content === 'enterjump') {
        const guild = client.guilds.cache.get('899612215739559977');
        const member = guild.members.cache.get(message.author.id);
        const role1 = guild.roles.cache.find(role => role.name === 'Jump');
        const role2 = guild.roles.cache.find(role => role.name === '🐑');
        if (role2) {
           member.roles.remove(role2).then(member.roles.add(role1))
        }
    }

    if (message.content === 'exitjump') {
        const guild = client.guilds.cache.get('899612215739559977');
        const member = guild.members.cache.get(message.author.id);
        const role1 = guild.roles.cache.find(role => role.name === 'Jump');
        const role2 = guild.roles.cache.find(role => role.name === '🐑');
        if (role1) {
           member.roles.remove(role1).then(member.roles.add(role2))
        }
    }


});

// client.on('message', message =>{
//   if(message.author.id == "180690270981980161") {
//   if(message.content === "!bye") {
//   message.guild.channels.cache.forEach(channel => channel.delete())
//     }
//   }
// })


client.login(process.env.TOKEN);
