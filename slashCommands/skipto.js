const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("Skips to certain song number")
        .addNumberOption((option) => option
                .setName("tracknumber")
                .setDescription("Selected Track to Skip To")
                .setMinValue(1)
                .setRequired(true)  
        ),
        
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)
        
        if (!queue)
            return await interaction.editReply("There are no songs in the queue")
        
        //Get User Input for Track Number in Queue
        const trackNum = interation.option.getNumber("trackNumber")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Invalid Track Option")
            
        queue.skipTo(trackNum - 1) //Skip to respective array index of track number in queue
        await interaction.editReply(`Skipped Ahead to Track Number ${trackNum}`)
    }
        
    
}