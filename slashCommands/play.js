const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { QueryType } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Loads Songs from YT")

    .addSubcommand((subcommand) => {
      subcommand
        .setName("song")
        .setDescription("Loads Single Song from URL")
        .addStringOption((option) => {
          option.setName("url").setDescription("Song URL").setRequired(true);
        });
    })

    .addSubcommand((subcommand) => {
      subcommand
        .setName("playlist")
        .setDescription("Loads Playlist Songs from URL")
        .addStringOption((option) => {
          option
            .setName("url")
            .setDescription("Playlist URL")
            .setRequired(true);
        });
    })

    .addSubcommand((subcommand) => {
      subcommand
        .setName("search")
        .setDescription("Search for Song based on Keywords")
        .addStringOption((option) => {
          option
            .setName("searchTerms")
            .setDescription("Search Keywords")
            .setRequired(true);
        });
    }),

  run: async ({ client, interaction }) => {
    if (!interaction.member.voice.channel)
      return interaction.editReply("Must be in VC to use this command");

    const queue = await client.player.createQueue(interaction.guild);
    if (!queue.connection)
      await queue.connect(interaction.member.voice.channel);

    let embed = new MessageEmbed();

    //Single Song Handler

    //Playlist Handler

    //Search Handler
  },
};
