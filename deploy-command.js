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
        .setName('table')
        .setDescription("Fais appel à une table aléatoire")
        .addSubcommand(sub =>
            sub.setName('meteo')
                .setDescription('Détermine une météo aléatoirement')
        )
        .addSubcommand(sub =>
            sub.setName('rencontre')
                .setDescription('Détermine une rencontre aléatoirement')
        )
        .addSubcommand(sub =>
            sub.setName('decouverte')
                .setDescription('Détermine une découverte aléatoirement')
        ),
    
    new SlashCommandBuilder()
        .setName('inventaire')
        .setDescription("Voir ton inventaire"),
    new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Lancer un ou plusieurs dés')
        .addStringOption(option =>
            option.setName('dés')
                .setDescription('Exemple : 1d20, 3d6, 2d10+5')
                .setRequired(false)),
    new SlashCommandBuilder()
        .setName('admin')
        .setDescription("Commandes d'admin pour la gestion des données")
        .addSubcommand(sub =>
            sub.setName('setgold')
                .setDescription("Définir, ajouter ou retirer de l'or à un joueur")
                .addUserOption(opt => 
                    opt.setName('joueur')
                    .setDescription('Choisir un joueur')
                    .setRequired(true)
                )
                .addStringOption(opt => 
                    opt.setName('action')
                    .setDescription('Action : set / add / remove')
                    .addChoices(
                        { name: 'Définir', value: 'set' },
                        { name: 'Ajouter', value: 'add' },
                        { name: 'Déduire', value: 'remove' }
                    )
                    .setRequired(true)
                )
                .addIntegerOption(opt => 
                    opt.setName('montant')
                    .setDescription('Montant concerné')
                    .setRequired(true)
                )
        )
            .addSubcommand(sub =>
                sub.setName('additem')
                    .setDescription("Ajouter un objet à un joueur")
                    .addUserOption(opt => opt.setName('joueur').setDescription('Choisir un joueur').setRequired(true))
                    .addStringOption(opt => opt.setName('vendeur').setDescription('marchand, forgeron, apothicaire').setRequired(true))
                    .addStringOption(opt => opt.setName('objet').setDescription('Nom exact de l\'objet').setRequired(true))
                    .addIntegerOption(opt => opt.setName('quantité').setDescription('Quantité').setRequired(true))
            )
            .addSubcommand(sub =>
                sub.setName('reset')
                    .setDescription("Réinitialiser un joueur")
                    .addUserOption(opt => opt.setName('joueur').setDescription('Choisir un joueur').setRequired(true))
            )
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
