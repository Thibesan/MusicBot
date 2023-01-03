const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses Currently Playing Song"),
        
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)
        
        if (!queue)
            return await interaction.editReply("There are no songs in the queue")
        
        queue.setPaused(true)
        //Reply formatted with code block for ease of use (reference for resume command)
        await interaction.editReply("Music Has been Paused!.\n Use \`/resume\` to resume the music")
    }
        
    
}