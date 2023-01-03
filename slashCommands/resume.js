const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes Currently Playing Song"),
        
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)
        
        if (!queue)
            return await interaction.editReply("There are no songs in the queue")
        
        queue.setPaused(false)
        //Reply formatted with code block for ease of use (reference for resume command)
        await interaction.editReply("Music has been Resumed! Use \`/pause\` to to pause the music")
    }
        
    
}