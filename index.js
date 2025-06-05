const { Client, GatewayIntentBits, Partials, Events, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('dotenv').config();
const { vendeurs, joueurs, saveJoueurs, tables } = require('./objet.js');

const fs = require('fs');
const path = require('path');
const { log } = require('console');

function logAction(user, action) {
    const logLine = `[${new Date().toLocaleString()}] ${user.tag} (${user.id}): ${action}\n`;
    fs.appendFile(path.join(__dirname, 'logs.txt'), logLine, (err) => {
        if (err) console.error('Erreur lors de l\'écriture des logs :', err);
    });
}


// == Variable Client ==
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});


// === Ready ===
client.once(Events.ClientReady, async () => {
    console.log(`Connecté en tant que ${client.user.tag}`);
    
    client.guilds.cache.forEach(guild=> {
        console.log(`→ Connecté au serveur : ${guild.name} (ID : ${guild.id})`);
    });
});


// === Initialiser joueur ===
function initJoueur(user) {
    const id = user.id;
    if (!joueurs[id]) {
        joueurs[id] = {
            tag: user.tag,
            username: user.username,
            or: 100,
            inventaire: { marchand: [], forgeron: [], apothicaire: [] }
        };
    }
}


// === Tables aléatoires ===

function rollOnTable(dMax, table) {
    const roll = Math.floor(Math.random()* dMax) +1;
    const entry = table.find(row => roll >= row.interval[0] && roll <= row.interval[1]);
    return entry
        ? `🎲 Jet : ${roll} → ${entry.description}`
        : `🎲 Jet : ${roll} → Aucun résultat trouvé.`;
}

// === Créer menu d'achat ===
function createAchatMenu(vendeur) {
    const stock = vendeurs[vendeur]?.filter(item => item.stock > 0).slice(0, 10) || [];
    if (stock.length === 0) return null;

    const menu = new StringSelectMenuBuilder()
        .setCustomId(`achat_menu_${vendeur}`)
        .setPlaceholder(`Choisissez un objet chez ${vendeur}`);

    stock.forEach((item, index) => {
        menu.addOptions({
            label: `${item.nom} (${item.prix} PO, stock: ${item.stock})`,
            description: item.description,
            value: index.toString()
        });
    });
    return menu;
}

// === Créer menu des quantités ===
function createQuantiteMenu(vendeur, itemIndex, max) {
    const menu = new StringSelectMenuBuilder()
        .setCustomId(`quantite_menu_${vendeur}_${itemIndex}`)
        .setPlaceholder('Choisissez la quantité');

    for (let i = 1; i <= max; i++) {
        menu.addOptions({ label: `${i}`, value: i.toString() });
    }

    return menu;
}


// === Réactions classiques ===
const TARGET_EMOJI = '👍';
const DM_MESSAGE = "Salut ! Merci d'avoir réagi avec 👍. Voici ton message privé de bot ! 🎉";
const TARGET_EMOJI_PUNPUN = '💩';
const DM_MESSAGE_PUNPUN = "Caca";

client.on(Events.MessageReactionAdd, async (reaction, user) => {
    if (user.bot) return;
    if (reaction.partial) await reaction.fetch();
    if (reaction.message.partial) await reaction.message.fetch();

    if (reaction.emoji.name === TARGET_EMOJI) {
        const dmChannel = await user.createDM();
        await dmChannel.send(DM_MESSAGE);
        logAction(user, 'a cliqué sur 👍');
    }

    if (reaction.emoji.name === TARGET_EMOJI_PUNPUN) {
        const dmChannel = await user.createDM();
        await dmChannel.send(DM_MESSAGE_PUNPUN);
        logAction(user, 'a cliqué sur 💩');
    }
});

// === Interactions ===
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand() && !interaction.isStringSelectMenu() && !interaction.isButton()) return;

    const userId = interaction.user.id;
    initJoueur(interaction.user);

    // === /roll ===
    if (interaction.isChatInputCommand() && interaction.commandName === 'roll') {
        let dés = interaction.options.getString('dés') || '1d20';
        const match = dés.match(/^(\d+)d(\d+)([+-]\d+)?$/);
        if (!match) {
            await interaction.reply({ content: 'Format invalide ! Utilise : `1d20`, `3d6`, `2d10+5`.'});
            return;
        }

        const nombre = parseInt(match[1]), faces = parseInt(match[2]), modificateur = match[3] ? parseInt(match[3]) : 0;
        if (nombre > 10 || faces > 1000) {
            await interaction.reply({ content: 'Limite : 10 dés, 1000 faces max.'});
            return;
        }

        let resultats = [], critique = false, echec = false;
        for (let i = 0; i < nombre; i++) {
            let roll = Math.floor(Math.random() * faces) + 1;
            resultats.push(roll);
            if (faces === 20) {
                if (roll === 20) critique = true;
                if (roll === 1) echec = true;
            }
        }

        const total = resultats.reduce((a, b) => a + b, 0) + modificateur;
        let message = `🎲 Résultats de **${dés}** : ${resultats.join(', ')}. Total : ${total}`;
        if (critique) message += `\n🌟 Succès critique !`;
        if (echec) message += `\n💥 Échec critique...`;
        await interaction.reply({ content: message });
        logAction(interaction.user, `a lancé les dés ${dés} -> Résultat : ${total}`);
        return;
    }

    // === /or ===
    if (interaction.isChatInputCommand() && interaction.commandName === 'or') {
        const or = joueurs[userId].or;
        await interaction.reply({ content: `💰 ${interaction.user}, tu as actuellement **${or} PO**.` });
        setTimeout(async () =>{
            try {
                await interaction.deleteReply();
            } catch (err) {
                console.error('Erreur lors de la suppression du message :', err);
            }
        },10000);
        logAction(interaction.user, `a consulté son or : ${or} PO`);
        return;
    }

    // === /table ===

    if(interaction.isChatInputCommand() && interaction.commandName === 'table'){
        const member = await interaction.guild.members.fetch(interaction.user.id);
        if (!member.roles.cache.some(role=>role.name === 'Maitre des dés')) {
            return interaction.reply({
                content:"❌ Seul·e le Maître du Jeu (MJ) peut utiliser cette commande.",
                flags:64
            });
        }
        
        
        const sub = interaction.options.getSubcommand();


        if(sub === 'meteo'){
            const result = rollOnTable(20, tables.meteo);
            await interaction.reply({content: result, flags:64});
            logAction(interaction.user, 'a tiré la table météo');
        }
        else if (sub === 'rencontre'){
            const result = rollOnTable(100, tables.rencontre);
            await interaction.reply({content: result, flags:64});
            logAction(interaction.user, ' a tiré la table rencontre')
        }
        else if (sub === 'decouverte'){
            const result = rollOnTable(100, tables.decouverte);
            await interaction.reply({ content: result, flags:64 });
            logAction(interaction.user, 'a tiré la table découverte');
        }
        return;
    }


    // === /inventaire ===
    if (interaction.isChatInputCommand() && interaction.commandName === 'inventaire') {
        const inventaire = joueurs[userId].inventaire;
        let message = `🎒 **Inventaire de ${interaction.user} :**\n`;
        let total = 0;
        for (const [vendeur, objets] of Object.entries(inventaire)) {
            if (objets.length > 0) {
                objets.forEach(item => {
                    message += `- ${item.nom} (${vendeur}) x${item.quantite}\n`;
                    total++;
                });
            }
        }
        if (total === 0) message += "*Aucun objet pour le moment.*";
        await interaction.reply({ content: message });
        setTimeout(async () =>{
            try {
                await interaction.deleteReply();
            } catch (err) {
                console.error('Erreur lors de la suppression du message :', err);
            }
        },10000);
        logAction(interaction.user, 'a consulté son inventaire');
        return;
    }

    // === /market ===
    if (interaction.isChatInputCommand() && interaction.commandName === 'market') {
        const vendeur = interaction.options.getString('vendeur')?.toLowerCase();
        const inventaire = vendeurs[vendeur];
        if (!inventaire) {
            const liste = Object.keys(vendeurs).join(', ');
            await interaction.reply({ content: `Vendeur introuvable. Essaie : ${liste}`, flags:64 });
            return;
        }

        const menu = createAchatMenu(vendeur);
        if (!menu) {
            await interaction.reply({ content: `Désolé, ${vendeur} n'a plus d'objets en stock.` });
            return;
        }
        const row = new ActionRowBuilder().addComponents(menu);
        await interaction.reply({ content: `🛒 **Bienvenue chez ${vendeur}** ! Sélectionne un objet à acheter :`, components: [row], flags:64 });
        logAction(interaction.user, `a ouvert le marché chez ${vendeur}`);
    }

    // === Achats et quantités ===
    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('achat_menu_')) {
        const vendeur = interaction.customId.split('_')[2];
        const index = parseInt(interaction.values[0]);
        const stock = vendeurs[vendeur]?.filter(item => item.stock > 0).slice(0, 10) || [];
        const item = stock[index];

        const maxQuantite = Math.min(5, item.stock);
        const menu = createQuantiteMenu(vendeur, index, maxQuantite);
        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.update({ content: `Combien de **${item.nom}** veux-tu acheter ?`, components: [row],flags:64 });
    }

    if (interaction.isStringSelectMenu() && interaction.customId.startsWith('quantite_menu_')) {
        const parts = interaction.customId.split('_');
        const vendeur = parts[2];
        const index = parseInt(parts[3]);
        const quantite = parseInt(interaction.values[0]);
        const stock = vendeurs[vendeur]?.filter(item => item.stock > 0).slice(0, 10) || [];
        const item = stock[index];

        const bouton = new ButtonBuilder()
            .setCustomId(`acheter_${vendeur}_${index}_${quantite}`)
            .setLabel(`Acheter ${quantite}`)
            .setStyle(ButtonStyle.Success);

        const retour = new ButtonBuilder()
            .setCustomId(`retour_${vendeur}`)
            .setLabel('Retour')
            .setStyle(ButtonStyle.Secondary);

        const quitter = new ButtonBuilder()
            .setCustomId(`quitter`)
            .setLabel('Quitter')
            .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder().addComponents(bouton, retour, quitter);
        await interaction.update({ content: `Confirme l'achat de **${quantite} x ${item.nom}** (${item.prix * quantite} PO) :`, components: [row] });
    }

    if (interaction.isButton() && interaction.customId.startsWith('acheter_')) {
        const [, vendeur, index, quantite] = interaction.customId.split('_');
        const qty = parseInt(quantite);
        const stock = vendeurs[vendeur]?.filter(item => item.stock > 0).slice(0, 10) || [];
        const item = stock[index];
        const joueur = joueurs[userId];

        if (!item || item.stock < qty) {
            await interaction.update({ content: `❌ Stock insuffisant pour **${item.nom}**.`, components: [] });
            return;
        }

        const totalPrix = item.prix * qty;
        if (joueur.or < totalPrix) {
            await interaction.update({ content: `❌ Pas assez d'or. Il te faut ${totalPrix} PO.`, components: [] });
            return;
        }

        joueur.or -= totalPrix;
        item.stock -= qty;

        const inv = joueur.inventaire[vendeur];
        const exist = inv.find(obj => obj.nom === item.nom);
        if (exist) exist.quantite += qty;
        else inv.push({ nom: item.nom, quantite: qty });

        saveJoueurs();

        await interaction.update({ content: `✅ ${interaction.user} a acheté **${qty} x ${item.nom}** pour ${totalPrix} PO. Il te reste ${joueur.or} PO.`, components: [] });
        setTimeout(async () =>{
            try {
                await interaction.deleteReply();
            } catch (err) {
                console.error('Erreur lors de la suppression du message :', err);
            }
        },10000);
        logAction(interaction.user, `a acheté ${qty} x ${item.nom} chez ${vendeur} pour ${totalPrix} PO`);
    }

    if (interaction.isButton() && interaction.customId.startsWith('retour_')) {
        const vendeur = interaction.customId.split('_')[1];
        const menu = createAchatMenu(vendeur);
        const row = new ActionRowBuilder().addComponents(menu);
        await interaction.update({ content: `🛒 **Retour chez ${vendeur}**. Sélectionne un autre objet à acheter :`, components: [row] });
    }

    if (interaction.isButton() && interaction.customId === 'quitter') {
        await interaction.update({ content: `Merci pour ta visite, ${interaction.user} ! Reviens quand tu veux ! 🛒`, components: [] });
        logAction(interaction.user, 'a quitté le menu d\'achat');
    }
    // === Admini commandes ===
    if (interaction.isChatInputCommand() && interaction.commandName=="admin"){
        const member = interaction.guild.members.fetch(interaction.user.id);
        
        if (!(await member).roles.cache.some(role=>role.name === 'Maitre des dés')) {
            await interaction.reply({content:"❌ Tu n'as pas la permission d'utiliser cette commande.", flags: 64})
            return;
        }

        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'additem') {
            const target = interaction.options.getUser('joueur');
            const vendeur = interaction.options.getString('vendeur');
            const objetNom = interaction.options.getString('objet');
            const quantite = interaction.options.getInteger('quantité');
            initJoueur(target);

            // Vérification minimale du vendeur uniquement
            if (!['marchand', 'forgeron', 'apothicaire'].includes(vendeur)) {
                await interaction.reply({ content: `❌ Vendeur invalide. Choisis parmi : marchand, forgeron, apothicaire.`, ephemeral: true });
                return;
            }

            const inventaire = joueurs[target.id].inventaire[vendeur];
            const exist = inventaire.find(i => i.nom.toLowerCase() === objetNom.toLowerCase());

            if (exist) {
                exist.quantite += quantite;
            } else {
                inventaire.push({ nom: objetNom, quantite: quantite });
            }

            saveJoueurs();
            logAction(interaction.user, `a ajouté ${quantite} x ${objetNom} (${vendeur}) à ${target.username}.`);
            await interaction.reply({ content: `✅ ${quantite} x ${objetNom} ajouté à ${target.username} dans l'inventaire du ${vendeur}.`, ephemeral: true });
        }
        
        if (subcommand === 'reset'){
            const target = interaction.options.getUser('joueur');
            initJoueur(target);
            joueurs[target.id].or = 100;
            joueurs[target.id].inventaire = { marchand: [], forgeron: [], apothicaire: [] };
            saveJoueurs();
            logAction(interaction.user, `a réinitialisé le profil de ${target.username}.`);
            await interaction.reply({ content: `✅ Profil de ${target.username} réinitialisé.`,flags: 64});
        }

        if (subcommand === 'setgold') {
            const target = interaction.options.getUser('joueur');
            const action = interaction.options.getString('action');
            const montant = interaction.options.getInteger('montant');
            initJoueur(target);

            const joueur = joueurs[target.id];
            if (action === 'set') {
                joueur.or = montant;
                await interaction.reply({ content: `✅ Or de ${target.username} défini à ${montant} PO.`, flags: 64 });
                logAction(interaction.user, `a défini l'or de ${target.username} à ${montant} PO.`);
            } else if (action === 'add') {
                joueur.or += montant;
                await interaction.reply({ content: `✅ ${montant} PO ajoutés à ${target.username}. Nouveau total : ${joueur.or} PO.`, flags: 64 });
                logAction(interaction.user, `a ajouté ${montant} PO à ${target.username}. Nouveau total : ${joueur.or} PO.`);
            } else if (action === 'remove') {
                joueur.or = Math.max(0, joueur.or - montant);
                await interaction.reply({ content: `✅ ${montant} PO retirés de ${target.username}. Total : ${joueur.or} PO.`, flags: 64 });
                logAction(interaction.user, `a retiré ${montant} PO de ${target.username}. Nouveau total : ${joueur.or} PO.`);
            } else {
                await interaction.reply({ content: `❌ Action inconnue.`, flags: 64 });
            }
            saveJoueurs();
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
