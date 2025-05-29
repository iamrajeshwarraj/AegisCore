const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'info',
    premium: false,
    run: async (client, message, args) => {
        let prefix = message.guild?.prefix;

        // Create a MessageSelectMenu
        const selectMenu = new MessageSelectMenu()
            .setCustomId('categorySelect')
            .setPlaceholder('Select a category')
            .addOptions([
                {
                    label: 'AntiNuke',
                    value: 'antinuke',
                    description: 'Commands related to AntiNuke',
                },
                {
                    label: 'Moderation',
                    value: 'mod',
                    description: 'Commands related to Moderation',
                },
                {
                    label: 'Utility',
                    value: 'info',
                    description: 'Utility commands',
                },
                {
                    label: 'Welcomer',
                    value: 'welcomer',
                    description: 'Commands for Welcomer',
                },
                {
                    label: 'Voice',
                    value: 'voice',
                    description: 'Commands related to Voice',
                },
                {
                    label: 'Automod',
                    value: 'automod',
                    description: 'Commands for Automod',
                },
                {
                    label: 'Custom Role',
                    value: 'customrole',
                    description: 'Commands for Custom Roles',
                },
                {
                    label: 'Logging',
                    value: 'logging',
                    description: 'Commands for Logging',
                }
            ]);

        const row1 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('antinuke')
                .setLabel('Antinuke')
                .setStyle('SECONDARY')
                .setEmoji('1218110681488953404'),
            new MessageButton()
                .setCustomId('mod')
                .setLabel('Moderation')
                .setStyle('SECONDARY')
                .setEmoji('1218111484861874226'),
            new MessageButton()
                .setCustomId('info')
                .setLabel('Utility')
                .setStyle('SECONDARY')
                .setEmoji('1218112303380168724'),
            new MessageButton()
                .setCustomId('welcomer')
                .setLabel('Welcomer')
                .setStyle('SECONDARY')
                .setEmoji('1218112881879679016')
        );
        const row2 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('voice')
                .setLabel('Voice')
                .setStyle('SECONDARY')
                .setEmoji('1218113777824694362'),            
            new MessageButton()
                .setCustomId('automod')
                .setLabel('Automod')
                .setStyle('SECONDARY')
                .setEmoji('1218177653840805978'),
            new MessageButton()
                .setCustomId('customrole')
                .setLabel('Custom Role')
                .setStyle('SECONDARY')
                .setEmoji('1218241910943252491'),
            new MessageButton()
                .setCustomId('logging')
                .setLabel('Logging')
                .setStyle('SECONDARY')
                .setEmoji('1218242995900383242')
        );

        const embed = new MessageEmbed()
            .setColor(client.color)
            .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setThumbnail(client.user.displayAvatarURL({ dynamic : true}))
            .setDescription(
                `•  Prefix for this server \`${prefix}\`\n•   Total Commands: \`${client.commands.size}\`**\n[Invite Me](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) | [Support Server](https://discord.gg/tGAnPSv3mg)**\n•  Type \`${prefix}antinuke enable\` to get started up!`
            )
            .addField(
                'Main Modules',
                `
                <:NUKE:1303631510947233814> \`:\` **AntiNuke**\n<:MOD:1303279327487594537>  \`:\` **Moderation**\n<a:utility1:1303279298399965264> \`:\` **Utility**\n<:Flowers:1303279261192552508> \`:\` **Welcomer**
                `,
                true // This makes the field inline
            )
            .addField(
                '\u200b', 
                '\u200b', 
                true // This makes the field inline
            )
            .addField(
                'Extra Modules',
                `
                <:vc_:1303279896235216947> \`:\` **Voice**\n<:role:1303279834633343008> \`:\` **Customrole**\n<:logs:1303279959598567445> \`:\` **Logging**\n<:automod:1303279920314716180> \`:\` **Automod**
                `,
                true // This makes the field inline
            );

        const helpMessage = await message.channel.send({ embeds: [embed], components: [new MessageActionRow().addComponents(selectMenu)] });

        const collector = helpMessage.createMessageComponentCollector({
            filter: (i) => i.user && (i.isButton() || i.isSelectMenu()),
            time: 60000
        });

        collector.on('collect', async (i) => {
            if (i.isButton()) {
                const category = i.customId;
                let commands = [];
                switch (category) {
                    case 'antinuke':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'security')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'mod':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'mod')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'info':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'info')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'welcomer':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'welcomer')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'voice':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'voice')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'automod':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'automod')
                            .map((x) => `\`${x.name}\``);
                        break;   
                    case 'customrole':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'customrole')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'logging':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'logging')
                            .map((x) => `\`${x.name}\``);
                        break;                 
                }
                const categoryEmbed = new MessageEmbed()
                    .setColor(client.color)
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setThumbnail(i.guild.iconURL({ dynamic: true }))
                    .setDescription(`**${i.customId.charAt(0).toUpperCase() + i.customId.slice(1)} Commands**\n${commands.join(', ')}`);
                i.reply({ embeds: [categoryEmbed], ephemeral: true });
            } else if (i.isSelectMenu()) {
                const category = i.values[0];
                let commands = [];
                if (category === 'all') {
                    commands = client.commands
                        .map((x) => `\`${x.name}\``);
                    const allCommandsEmbed = new MessageEmbed()
                        .setColor(client.color)
                        .setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setDescription(`**All Commands**\n${commands.join(', ')}`);
                    helpMessage.edit({ embeds: [allCommandsEmbed], components: [] });
                } else {
                    switch (category) {
                        case 'antinuke':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'security')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'mod':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'mod')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'info':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'info')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'welcomer':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'welcomer')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'voice':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'voice')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'automod':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'automod')
                                .map((x) => `\`${x.name}\``);
                            break;   
                        case 'customrole':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'customrole')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'logging':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'logging')
                                .map((x) => `\`${x.name}\``);
                            break;                 
                    }
                    const categoryEmbed = new MessageEmbed()
                        .setColor(client.color)
                        .setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setThumbnail(i.guild.iconURL({ dynamic: true }))
                        .setDescription(`**${category.charAt(0).toUpperCase() + category.slice(1)} Commands**\n${commands.join(', ')}`);
                    i.reply({ embeds: [categoryEmbed], ephemeral: true });
                }
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                helpMessage.edit({ components: [] });
            }
        });
    }
};
