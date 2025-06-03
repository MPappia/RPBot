const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const commands = [
    new SlashCommandBuilder()
        .setName('market')
        .setDescription('Voir les objets vendus par un marchand')
        .addStringOption(option =>
            option.setName('vendeur')
                .setDescription('Choisis un vendeur : marchand, forgeron, apothicaire')
                .setRequired(true)),
    new SlashCommandBuilder()
        .setName('or')
        .setDescription("Voir combien d'or tu as"),
    new SlashCommandBuilder()
        .setName('inventaire')
        .setDescription("Voir ton inventaire"),
    new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Lancer un ou plusieurs dés')
        .addStringOption(option =>
            option.setName('dés')
                .setDescription('Exemple : 1d20, 3d6, 2d10+5')
                .setRequired(false))
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Enregistrement des commandes slash...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands }
        );
        console.log('Commandes enregistrées avec succès !');
    } catch (error) {
        console.error(error);
    }
})();
