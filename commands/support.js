const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");
const musicIcons = require('../UI/icons/musicicons.js');

module.exports = {
    name: "support",
    description: "Get support server link",
    permissions: "0x0000000000000800",
    options: [],
    run: async (client, interaction, lang) => {
        try {
            const supportServerLink = "https://discord.gg/uwVGgwHV3T";
            const githubLink = "https://github.com/GlaceYT";
            const replitLink = "https://replit.com/@GlaceYT";
            const youtubeLink = "https://www.youtube.com/@GlaceYT";

            const embed = new EmbedBuilder()
                .setColor('#b300ff')
                .setAuthor({
                    name: lang.support.embed.authorName,
                    iconURL: musicIcons.beats2Icon, 
                    url: config.SupportServer
                })
                .setDescription(lang.support.embed.description
                    .replace("{supportServerLink}", supportServerLink)
                    .replace("{githubLink}", githubLink)
                    .replace("{replitLink}", replitLink)
                    .replace("{youtubeLink}", youtubeLink)
                )
                .setImage('https://cdn.discordapp.com/attachments/1273947742724685875/1277995152543055932/0DC0BBD1-3E1D-4BA5-94E4-FA16355D48CA.jpg?ex=6793a0bc&is=67924f3c&hm=e1f9a8e396d37b37adef2e9d470f117ebcfba24cd5fb6407556ff64f11ff5d4d&')
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } catch (e) {
            console.error(e);
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setAuthor({
                    name: lang.support.embed.error,
                    iconURL: musicIcons.alertIcon,
                    url: config.SupportServer
                })
                .setDescription(lang.support.embed.errorDescription)
                .setFooter({ text: lang.footer, iconURL: musicIcons.SonicIcon });

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};
