const fs = require('fs');
const path = require('path');

const joueursPath = path.join(__dirname, 'joueurs.json');


let joueurs = {};
if (fs.existsSync(joueursPath)) {
    try {
        joueurs = JSON.parse(fs.readFileSync(joueursPath, 'utf-8'));
        console.log('[✅] Profils des joueurs chargés.');
    } catch (err) {
        console.error('❌ Erreur lors du chargement des joueurs :', err);
    }
}

function saveJoueurs() {
    fs.writeFile(joueursPath, JSON.stringify(joueurs, null, 2), (err) => {
        if (err) console.error('❌ Erreur lors de la sauvegarde des joueurs :', err);
    });
}

const vendeurs = {
    "marchand": [
        { nom: "Torche", description: "Éclaire les souterrains.", prix: 1, stock: 10 },
        { nom: "Bougie", description: "Petite source de lumière.", prix: 1, stock: 15 },
        { nom: "Chaîne (3 m)", description: "Chaîne solide de 3 mètres.", prix: 5, stock: 5 },
        { nom: "Sac à dos", description: "Transporter facilement vos affaires.", prix: 2, stock: 7 },
        { nom: "Bélier portable", description: "Pour enfoncer des portes.", prix: 4, stock: 2 },
        { nom: "Corde en chanvre (15 m)", description: "Solide et polyvalente.", prix: 1, stock: 8 },
        { nom: "Seau", description: "Pour transporter des liquides.", prix: 0.05, stock: 10 },
        { nom: "Chausse-trappes (20)", description: "Crée un obstacle au sol.", prix: 1, stock: 4 },
        { nom: "Sifflet", description: "Pour signaler ou alerter.", prix: 0.05, stock: 12 },
        { nom: "Couverture", description: "Pour se protéger du froid.", prix: 0.5, stock: 6 }
    ],
    "forgeron": [
        { nom: "Épée courte", description: "1d6 perforant. Finesse, légère.", prix: 10, stock: 3 },
        { nom: "Hache d'armes", description: "1d8 tranchant. Polyvalente (1d10).", prix: 10, stock: 2 },
        { nom: "Arc long", description: "1d8 perforant. Portée 45 m/180 m.", prix: 50, stock: 1 },
        { nom: "Bouclier", description: "Bonus +2 en CA.", prix: 10, stock: 4 },
        { nom: "Dague", description: "1d4 perforant. Finesse, légère, lancer (6/18 m).", prix: 2, stock: 5 },
        { nom: "Cotte de mailles", description: "16 CA. (For 13). Désavantage Discrétion.", prix: 75, stock: 2 },
        { nom: "Maillet", description: "2d6 contondant. Lourde, à deux mains.", prix: 10, stock: 3 },
        { nom: "Lance", description: "1d6 perforant. Lancer (6/18 m), polyvalente (1d8).", prix: 1, stock: 6 },
        { nom: "Clibanion", description: "17 CA. (For 15). Désavantage Discrétion.", prix: 200, stock: 1 },
        { nom: "Arbalète légère", description: "1d8 perforant. Portée 24 m/96 m.", prix: 25, stock: 2 }
    ],
    "apothicaire": [
        { nom: "Potion de soin", description: "Restaure 2d4+2 PV.", prix: 50, stock: 5 },
        { nom: "Herbes médicinales", description: "Soigne les blessures légères.", prix: 5, stock: 10 },
        { nom: "Potion de guérison", description: "Restaure 2d4+2 PV.", prix: 50, stock: 5 },
        { nom: "Antidote (fiole)", description: "Annule l'effet d'un poison.", prix: 50, stock: 3 },
        { nom: "Huile (flasque)", description: "Peut être allumée pour brûler.", prix: 0.1, stock: 8 },
        { nom: "Poison (fiole)", description: "Inflige 1d4 dégâts de poison.", prix: 100, stock: 2 },
        { nom: "Savon", description: "Permet de nettoyer en profondeur.", prix: 0.02, stock: 10 },
        { nom: "Parfum (fiole)", description: "Un parfum raffiné.", prix: 5, stock: 5 },
        { nom: "Potion d'endurance", description: "Donne +1 en Constitution temporairement.", prix: 75, stock: 3 },
        { nom: "Potion de vitesse", description: "Double la vitesse pendant 1 minute.", prix: 120, stock: 2 }
    ]
};

const tables = {
    meteo :[
        { interval: [1,20], description: 'Pluie fine'},
        { interval: [21,40], description: 'Ciel couvert'},
        { interval: [41,60], description: 'Ciel dégagé'},
        { interval: [61,80], description: 'Vent fort'},
        { interval: [81,95], description: 'Orage'},
        { interval: [96,100], description: 'Tempête'}
    ],
    rencontre :[
        { interval: [1, 10], description: "Loup en meute (1d6 + 2 loups)" },
        { interval: [11, 20], description: "Groupe de gobelins (1d4 gobelins)" },
        { interval: [21, 40], description: "Voyageur errant (paysan, sans arme)" },
        { interval: [41, 60], description: "Groupe de bandits (1d4 + 2 bandits)" },
        { interval: [61, 80], description: "Marchand ambulant" },
        { interval: [81, 95], description: "Druide en méditation" },
        { interval: [96, 100], description: "Rencontre amicale (donne des conseils)" }
    ],
    decouverte: [
        { interval: [1, 4],    description: "Trace de passage d’animal (terre retournée, branche cassée)" },
        { interval: [5, 10],   description: "Terrier/aire d’un animal (indiquer: jeter 1d100 dans table créatures sauvages)" },
        { interval: [11, 15],  description: "Cadavre d’animal récent (1d10 jours) → jeter 1d100 sur table créatures sauvages" },
        { interval: [16, 20],  description: "Crottes d’animal (jeter 1d100 sur table créatures sauvages)" },
        { interval: [21, 23],  description: "Trace humaine (empreintes, sentier, branchages brisés)" },
        { interval: [24, 24],  description: "Cadavre d’humanoïde (récent, 1d10 jours)" },
        { interval: [25, 26],  description: "Tombe d’humanoïde (pierres, tumulus, vestiges de bûcher)" },
        { interval: [27, 28],  description: "Déchets humains (petits : restes, poterie cassée)" },
        { interval: [29, 30],  description: "Déchets humains (grosses caisses, tonneaux abandonnés)" },
        { interval: [31, 31],  description: "Ruine en pierre abandonnée (récente)" },
        { interval: [32, 32],  description: "Ruine en pierre abandonnée (ancienne, murs éventrés)" },
        { interval: [33, 33],  description: "Ruines d’habitation en bois (souches, sol écroulé)" },
        { interval: [34, 34],  description: "Ruine brûlée (charbons, poutres calcinées)" },
        { interval: [35, 37],  description: "Vestiges d’un feu de camp (cendres, braises éteintes)" },
        { interval: [38, 38],  description: "Objet perdu (babiole aléatoire ; valeur 1d10 po)" },
        { interval: [39, 39],  description: "Habitation inoccupée (en bon état, portes ouvertes)" },
        { interval: [40, 40],  description: "Habitation occupée (fermier isolé ou caravane)" },
        { interval: [41, 42],  description: "Ruisseau, eau sale" },
        { interval: [43, 45],  description: "Ruisseau, eau potable" },
        { interval: [46, 47],  description: "Source d’eau (contaminée)" },
        { interval: [48, 49],  description: "Source d’eau (saine mais stagnante)" },
        { interval: [50, 52],  description: "Source d’eau (pure, fraîche)" },
        { interval: [53, 55],  description: "Marre, eau contaminée" },
        { interval: [56, 58],  description: "Marre, eau sale" },
        { interval: [59, 60],  description: "Marre, eau potable" },
        { interval: [61, 62],  description: "Colline rocheuse isolée" },
        { interval: [63, 65],  description: "Pierre remarquable (menhir, rocher gravé)" },
        { interval: [66, 66],  description: "Entrée d’une petite grotte" },
        { interval: [67, 67],  description: "Entrée d’une grande caverne" },
        { interval: [68, 68],  description: "Filon affleurant (minerai, métal, charbon)" },
        { interval: [69, 69],  description: "Entrée d’une mine abandonnée" },
        { interval: [70, 70],  description: "Élémentaire de terre mineur (1d4 élémentaires)" },
        { interval: [71, 71],  description: "Statue érodée (soldat, femme, animal sculpté)" },
        { interval: [72, 72],  description: "Gargouille ou vestige architectural étrange" },
        { interval: [73, 73],  description: "Terre sacrée (cercles de pierres ou autel ancien)" },
        { interval: [74, 74],  description: "Terre profanée (cercle rituel, runes noires)" },
        { interval: [75, 75],  description: "Gouffre profond (profondeur 1d6×3 m)" },
        { interval: [76, 77],  description: "Marécage épais" },
        { interval: [78, 79],  description: "Zone boueuse" },
        { interval: [80, 80],  description: "Tourbière dangereuse" },
        { interval: [81, 81],  description: "Arbuste animé (plante magique)" },
        { interval: [82, 82],  description: "Arbre animé (arbre magique)" },
        { interval: [83, 84],  description: "Zone dénudée (pas de végétation sur 1d10×100 m)" },
        { interval: [85, 88],  description: "Arbre remarquable (souche géante, arbre foudroyé)" },
        { interval: [89, 92],  description: "Tas de bois coupé (2d8 branches) → jeter 1d20 sur table récolte de bois" },
        { interval: [93, 96],  description: "Nourriture abandonnée (2d12 rations) → jeter 1d20 sur table nourriture" },
        { interval: [97, 100], description: "Petite forêt isolée ou clairière" }
    ]
}

module.exports = { joueurs, vendeurs, saveJoueurs, tables };
