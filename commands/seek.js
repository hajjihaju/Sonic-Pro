const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('seek')
        .setDescription('Seek to a specific timestamp in the current song.')
        .addIntegerOption(option =>
            option.setName('seconds')
                .setDescription('The timestamp (in seconds) to seek to.')
                .setRequired(true)),
    async execute(interaction) {
        const player = interaction.client.manager.get(interaction.guild.id); // Get the Lavalink player for this guild
        const seconds = interaction.options.getInteger('seconds'); // Get the seek time in seconds

        // Check if the player exists and is playing music
        if (!player || !player.playing) {
            return interaction.reply({ content: 'No music is currently playing!', ephemeral: true });
        }

        const trackDuration = player.queue.current.duration / 1000; // Duration of the current track in seconds

        // Validate the seek time
        if (seconds < 0 || seconds > trackDuration) {
            return interaction.reply({
                content: `Invalid seek time! The current track is ${Math.floor(trackDuration)} seconds long.`,
                ephemeral: true,
            });
        }

        // Seek to the specified position
        await player.seek(seconds * 1000); // Lavalink expects the time in milliseconds

        return interaction.reply({ content: `⏩ Successfully sought to ${seconds} seconds!` });
    },
};
