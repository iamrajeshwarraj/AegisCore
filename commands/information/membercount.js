const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'membercount',
    aliases: ['mct'],
    category: 'info',
    premium: false,

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor(client.color)
            .setTitle(`Members`)
            .setDescription(`${message.guild.memberCount}`)
            .setTimestamp()

        message.channel.send({ embeds: [embed] })
    }
}
