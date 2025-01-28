const { Message } = require('discord.js');
const { getLanguage } = require('../utils/language'); // Adjust import path if necessary

module.exports = {
    name: 'seek',
    description: 'Seeks to a specified time in the currently playing track',
    async execute(message, args) {
        const player = message.client.music.players.get(message.guild.id);
        const language = getLanguage(message); // Function to get the user's language
        const langConfig = require(`../languages/${language}.json`);

        if (!player) return message.channel.send(langConfig.seek.noMusic);
        if (!args[0]) return message.channel.send(langConfig.seek.noTime);

        const seekTime = parseInt(args[0]);
        if (isNaN(seekTime)) return message.channel.send(langConfig.seek.invalidNumber);

        player.seek(seekTime * 1000); // Convert seconds to milliseconds
        message.channel.send(`Seeked to ${seekTime} seconds.`);
    },
};
