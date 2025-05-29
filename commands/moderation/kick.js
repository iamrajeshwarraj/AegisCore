const { Message, Client, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'kick',
    aliases: [],
    category: 'mod',
    premium: false,
    run: async (client, message, args) => {
        if (!message.member.permissions.has('KICK_MEMBERS') && message.author.id !== message.guild.ownerId) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`${client.emoji.cross} | You must have \`Kick Members\` permissions to use this command.`)
                ]
            });
        }
        if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`${client.emoji.cross} | I must have \`Kick Members\` permissions to execute this command.`)
                ]
            });
        }

        let user = await getUserFromMention(message, args[0]);
        if (!user) {
            try {
                user = await message.guild.members.fetch(args[0]);
            } catch (error) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.color)
                            .setDescription(`${client.emoji.cross} | Please provide a valid user ID or mention a member.`)
                    ]
                });
            }
        }

        let reason = args.slice(1).join(' ') || 'No Reason Provided';
        reason = `${message.author.tag} (${message.author.id}) | ${reason}`;

        if (user.id === client.user.id) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`${client.emoji.cross} | You can't kick me.`)
                ]
            });
        }

        if (user.id === message.guild.ownerId) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`${client.emoji.cross} | I can't kick the owner of this server.`)
                ]
            });
        }

        // Allow server owner to bypass role checks
        if (message.author.id !== message.guild.ownerId) {
            if (user.roles.highest.position >= message.member.roles.highest.position) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.color)
                            .setDescription(`${client.emoji.cross} | You cannot kick someone with an equal or higher role.`)
                    ]
                });
            }
        }

        if (!user.kickable) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`${client.emoji.cross} | I cannot kick this member due to role hierarchy.`)
                ]
            });
        }

        const kickMessage = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`You have been kicked from ${message.guild.name}\nExecutor: ${message.author.tag}\nReason: \`${reason}\``)
            .setColor(client.color)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

        try {
            await user.send({ embeds: [kickMessage] }).catch(() => null);
            await message.guild.members.kick(user.id, reason);
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${client.emoji.tick} | Successfully kicked **${user.user.tag}** from the server.`)
                        .setColor(client.color)
                ]
            });
        } catch (err) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`${client.emoji.cross} | An error occurred while kicking the user.`)
                ]
            });
        }
    }
};

function getUserFromMention(message, mention) {
    if (!mention) return null;
    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return null;
    const id = matches[1];
    return message.guild.members.fetch(id);
}
