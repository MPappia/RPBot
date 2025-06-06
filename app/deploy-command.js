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
        .setName('reaction_config')
        .setDescription('Gérer les réactions personnalisées du bot')
        .addSubcommand(sub=>
            sub.setName('add')
                .setDescription('Associer un emoji à un message')
                .addStringOption(opt=>
                    opt.setName('emoji')
                        .setDescription("Emoji Unicode ou :nom: de l'émoji custom")
                        .setRequired(true)
                )
                .addStringOption(opt=>
                    opt.setName('message')
                        .setDescription("Texte à envoyer en MP lorsque l'émoji est cliqué")
                        .setRequired(true)
                )
        )
        .addSubcommand(sub=>
            sub.setName('remove')
                .setDescription("Supprimer une association d'émoji")
                .addStringOption(opt=>
                    opt.setName('emoji')
                        .setDescription("Emoji à dissocier")
                        .setRequired(true)
                )
        )
        .addSubcommand(sub=>
            sub.setName('list')
                .setDescription("Affiche la liste des réactions disponnibles")
        )
        .addSubcommand(sub=>
            sub.setName('change')
                .setDescription('Modifie une réaction de la liste')
                .addStringOption(opt=>
                    opt.setName("emoji")
                        .setDescription('Emoji dont on souhaite changer le message')
                        .setRequired(true)
                )
                .addStringOption(opt=>
                    opt.setName('message')
                        .setDescription('Nouveau texte à envoyer en MP')
                        .setRequired(true)
                )
            ),

    new SlashCommandBuilder()
        .setName('enigme')
        .setDescription('Affiche une énigme aléatoire'),

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
            ),
    new SlashCommandBuilder()
        .setName('help')
        .setDescription("Affiche la liste de toutes les commandes du bot"),
    
    new SlashCommandBuilder().setName('mj').setDescription('Créer un rôle Maitre des dés pour les fonctionnalités plus pousées')
            .addSubcommand(sub => sub.setName('assign').setDescription('Attribue le rôle à un membre')
                .addUserOption(opt=>opt.setName('joueur').setDescription('Le membre deviendra MJ').setRequired(true)))
            .addSubcommand(sub=>sub.setName('remove').setDescription('Retire le rôle Maitre des dés à un membre').addUserOption(opt=>opt.setName('joueur').setDescription('Le membre à qui on retire le rôle MJ').setRequired(true)))
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
