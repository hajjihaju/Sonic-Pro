const { Message } = require('discord.js');

module.exports = {
    name: 'seek',
    description: 'Seeks to a specified time in the currently playing track',
    async execute(message, args) {
        const player = message.client.music.players.get(message.guild.id);
        if (!player) return message.channel.send('No music is currently playing.');

        if (!args[0]) return message.channel.send('Please provide the time in seconds to seek to.');

        const seekTime = parseInt(args[0]);
        if (isNaN(seekTime)) return message.channel.send('Please provide a valid number.');

        player.seek(seekTime * 1000); // Convert seconds to milliseconds
        message.channel.send(`Seeked to ${seekTime} seconds.`);
    },
};
