const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const os = require('os');

module.exports = {
    name: 'stats',
    category: 'info',
    aliases: ['botinfo', 'bi'],
    usage: 'stats',
    run: async (client, message, args) => {
        const uptime = Math.round(Date.now() - client.uptime);
        const duration1 = Math.round(
            (Date.now() - message.client.uptime) / 1000
        )
        let guilds1 = client.guilds.cache.size;
        let member1 = client.guilds.cache.reduce((x, y) => x + y.memberCount, 0);

        let member = member1;
        if (member >= 1000 && member < 1000000)
            member = (member / 1000).toFixed(1) + 'k';
        else if (member >= 1000000)
            member = (member / 1000000).toFixed(1) + 'm';

        let guilds = guilds1;

        const embed1 = new MessageEmbed()
            .setColor(client.color)
            .setAuthor({
                name: 'AegisCore Information'
            })
            .setDescription(
                `**__General Informations__**\n\n[**Bot's Mention:**](https://discord.gg/tGAnPSv3mg) <@!${
                    client.user.id
                }>\n[**Bot's Version:**](https://discord.gg/tGAnPSv3mg) \`1.0.0\`\n[**Total Servers:**](https://discord.gg/tGAnPSv3mg) \`${guilds}\`\n[**Total Users:**](https://discord.gg/tGAnPSv3mg) \`${member} (${
                    client.users.cache.size
                } Cached)\`\n[**Total Channels:**](https://discord.gg/tGAnPSv3mg) \`${
                    client.channels.cache.size
                }\`\n[**Total Commands:**](https://discord.gg/tGAnPSv3mg) \`${client.commands.size}\`\n[**Last Rebooted:**](https://discord.gg/tGAnPSv3mg) <t:${duration1}:R>`
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter({
                text: `Requested By ${message.author.tag}`,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            });

        message.channel.send({ embeds: [embed1] });
    }
};
