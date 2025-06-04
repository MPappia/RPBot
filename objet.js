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

module.exports = { joueurs, vendeurs, saveJoueurs };
