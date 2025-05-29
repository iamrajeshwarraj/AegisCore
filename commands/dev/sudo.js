const { Client, MessageEmbed } = require('discord.js');
const config = require(`${process.cwd()}/config.json`);

module.exports = {
    name: 'sudo',
    aliases: ['actas', 'runas'],
    category: 'owner',
    run: async (client, message, args) => {
        if (!config.owner.includes(message.author.id)) {
            return message.channel.send('You do not have permission to use this command.');
        }

        const user = message.mentions.members.first();
        if (!user) return message.channel.send('Please mention a valid user.');

        const command = args.slice(1).join(' ');
        if (!command) return message.channel.send('Please provide a command to run.');

        const fakeMessage = {
            content: command,
            author: user.user,
            member: user,
            guild: message.guild,
            channel: message.channel,
            client: client,
            mentions: message.mentions,
            reply: (msg) => message.channel.send(msg)
        };

        const commandName = command.split(' ')[0];
        const cmd = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));

        if (!cmd) return message.channel.send('Command not found.');

        try {
            await cmd.run(client, fakeMessage, command.split(' ').slice(1));
            message.channel.send(`Executed \`${command}\` as ${user.user.tag}`);
        } catch (err) {
            message.channel.send(`Error: ${err.message}`);
        }
    }
};
