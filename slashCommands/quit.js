const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("Stops Bot, Clears Queue"),
        
    run: async ({client, interaction}) => {
        const queue = client.player.getQueue(interaction.guildId)
        
        if (!queue)
            return await interaction.editReply("There are no songs in the queue")
        
        queue.destroy() //Clears queue, disconnects bot from voice channel
        await interaction.editReply("GoodBye!")
    }
        
    
}