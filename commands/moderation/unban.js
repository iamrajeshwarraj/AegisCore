const { Message, Client, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unban',
    aliases: ['pardon', 'forgive'],
    category: 'mod',
    premium: false,

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.cross} | You must have \`Ban Members\` permissions to use this command.`
                        )
                ]
            });
        }

        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.cross} | I must have \`Ban Members\` permissions to use this command.`
                        )
                ]
            });
        }

        let isOwner = message.author.id == message.guild.ownerId;
        let userId = args[0];

        if (!userId) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.cross} | Please provide a valid User ID to unban.`
                        )
                ]
            });
        }

        if (!isOwner && !client.util.hasHigher(message.member)) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.cross} | You must have a higher role than me to use this command.`
                        )
                ]
            });
        }

        try {
            let banList = await message.guild.bans.fetch();
            let bannedUser = banList.get(userId);

            if (!bannedUser) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.color)
                            .setDescription(
                                `${client.emoji.cross} | This user is not banned in this server.`
                            )
                    ]
                });
            }

            let reason = args.slice(1).join(' ') || 'No Reason Provided';
            reason = `${message.author.tag} (${message.author.id}) | ` + reason;

            await message.guild.members.unban(userId, reason);

            const successEmbed = new MessageEmbed()
                .setDescription(
                    `${client.emoji.tick} | Successfully unbanned **<@${userId}>** from the server.`
                )
                .setColor(client.color);

            return message.channel.send({ embeds: [successEmbed] });

        } catch (err) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.cross} | I was unable to unban that member.`
                        )
                ]
            });
        }
    }
};
