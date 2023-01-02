const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("Skips to certain song number")
        .addNumberOption((option) => {
            option
                .setName("trackNumber")
                .setDescription("Selected Track to Skip To")
                .setMinValue(1)
                .setRequired(true)  
        }),
        
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)
        
        if (!queue)
            return await interaction.editReply("There are no songs in the queue")
        
        const trackNum = interation.option.getNumber("trackNumber")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Invalid Track Option")
            
        queue.skipTo(trackNum - 1)
        await interaction.editReply(`Skipped Ahead to Track Number ${trackNum}`)
    }
        
    
}