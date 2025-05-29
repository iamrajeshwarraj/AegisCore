const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'unmute',
    aliases: ['untimeout'],
    category: 'mod',
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MODERATE_MEMBERS')) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.cross} | You must have \`Timeout Members\` permissions to use this command.`
                        )
                ]
            });
        }
        if (!message.guild.me.permissions.has('MODERATE_MEMBERS')) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.cross} | I must have \`Timeout Members\` permissions to run this command.`
                        )
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
                            .setDescription(
                                `${client.emoji.cross} | You didn't mention the member you want to unmute.`
                            )
                    ]
                });
            }
        }

        if (!user.communicationDisabledUntilTimestamp || user.communicationDisabledUntilTimestamp < Date.now()) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.cross} | <@${user.user.id}> is not muted.`
                        )
                ]
            });
        }

        if (!user.manageable) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.cross} | I don't have enough permissions to unmute <@${user.user.id}>.`
                        )
                ]
            });
        }

        try {
            await user.timeout(null);
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.tick} | Successfully unmuted <@${user.user.id}>!`
                        )
                ]
            });
        } catch (error) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.cross} | Failed to unmute <@${user.user.id}>. Please check my permissions.`
                        )
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
    return message.guild.members.fetch(id).catch(() => null);
}
