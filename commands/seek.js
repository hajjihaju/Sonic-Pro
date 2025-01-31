const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require("../config.js");
const musicIcons = require('../UI/icons/musicicons.js');

async function seek(client, interaction, lang) {
    try {
        const player = client.riffy.players.get(interaction.guildId);
        const position = interaction.options.getInteger('time');

        if (!player || !player.playing) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({ 
                    name: lang.seek.embed.noActivePlayer, 
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
                .setDescription(lang.seek.embed.noActivePlayerDescription);

            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (position < 0 || position > player.queue.current.duration) {
            return interaction.reply({ content: lang.seek.invalidTimeError, ephemeral: true });
        }

        player.seek(position * 1000); // Convert seconds to milliseconds

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setAuthor({ 
                name: lang.seek.embed.seekUpdated, 
                iconURL: musicIcons.seekIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setDescription(lang.seek.embed.seekUpdatedDescription.replace("{time}", position));

        return interaction.reply({ embeds: [embed] });
    } catch (error) {
        console.error('Error seeking track:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setAuthor({ 
                name: lang.seek.embed.error, 
                iconURL: musicIcons.alertIcon,
                url: config.SupportServer
            })
            .setFooter({ text: lang.footer, iconURL: musicIcons.heartIcon })
            .setDescription(lang.seek.embed.errorDescription);

        return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "seek",
    description: "Seek to a specific part of the song",
    permissions: "0x0000000000000800",
    options: [{
        name: 'time',
        description: 'Time in seconds to seek to',
        type: ApplicationCommandOptionType.Integer,
        required: true
    }],
    run: seek
};
