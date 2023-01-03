const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')

module.exports = {
	//Respective subcommands for each possible play scenario (URL, Playlist URL, Search)
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Loads Songs from YouTube')
		.addSubcommand((subcommand) => subcommand
				.setName('song')
				.setDescription('Loads Single Song from URL')
				.addStringOption((option) => option
						.setName('url')
						.setDescription('Song URL')
						.setRequired(true)
				)
		)

		.addSubcommand((subcommand) => subcommand
				.setName('playlist')
				.setDescription('Loads Playlist Songs from URL')
				.addStringOption((option) => option
						.setName('url')
						.setDescription('Playlist URL')
						.setRequired(true)
				)
		)

		.addSubcommand((subcommand) => subcommand
				.setName('search')
				.setDescription('Search for Song based on Keywords')
				.addStringOption((option) => option
						.setName('searchterms')
						.setDescription('Search Keywords')
						.setRequired(true)
				)
	),

	run: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) //Check if user is in a voice channel
			return interaction.editReply('Must be in VC to use this command')

		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection)
			await queue.connect(interaction.member.voice.channel)

		let embed = new MessageEmbed()

		//Song Handler
		if (interaction.options.getSubcommand() === 'song') {
			let url = interaction.options.getString('url')
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_VIDEO,
			})

			if (result.tracks.length === 0) {
				return interaction.editReply('No Results')
			}

			const song = result.tracks[0]
			await queue.addTrack(song)
			embed
			//Song String Formatting
				.setDescription(`**${song.title} - ${song.url}** has been added to the Queue**`)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}` })
				
		//Playlist Handler
		} else if (interaction.options.getSubcommand() === 'playlist') {
			let url = interaction.options.getString('url')
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.YOUTUBE_PLAYLIST,
			})

			if (result.tracks.length === 0) {
				return interaction.editReply('No Results')
			}
			
			const playlist = result.playlist
			await queue.addTracks(result.tracks)
			embed
			//Playlist String Formatting
				.setDescription(`**${result.tracks.length} songs from ${playlist.title} - ${playlist.url}** have been added to the Queue**`)
				.setThumbnail(playlist.thumbnail)
				.setFooter({ text: `Duration: ${playlist.duration}` })
				
		//Search Handler
		} else if (interaction.options.getSubcommand() === 'search') {
			let url = interaction.options.getString('searchterms')
			const result = await client.player.search(url, {
				requestedBy: interaction.user,
				searchEngine: QueryType.AUTO,
			})

			if (result.tracks.length === 0) {
				return interaction.editReply('No Results')
			}

			const song = result.tracks[0]
			await queue.addTrack(song)
			embed
				//Song String Formatting
				.setDescription(`**${song.title} - ${song.url}** has been added to the Queue**`)
				.setThumbnail(song.thumbnail)
				.setFooter({ text: `Duration: ${song.duration}` })
		}
		//Force Play State if Queue Modified
		if (!queue.playing)
			await queue.play()
		await interaction.editReply({
			embeds: [embed]
		})
	}
}
