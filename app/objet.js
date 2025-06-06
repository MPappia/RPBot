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


const enigmes = [
  {
    question: "Si cela cache, ce n'est que pour mieux révéler.\nCela bloque autant que cela permet de passer.\nLa réponse est dans la question.\nQue suis-je ?",
    answer: "Une énigme."
  },
  {
    question: "Je suis le commencement de l’effroi.\nLa fin de la durée et de l’espace.\nLe commencement de toute extrémité.\nEt la fin de chaque contrée.",
    answer: "La lettre E."
  },
  {
    question: "Je suis vague en bord de mer.\nJe descends des montagnes en hiver.\nSans moi vous n'aurez plus une larme.",
    answer: "L'eau."
  },
  {
    question: "Celui qui le fabrique le vend.\nCelui qui l'achète ne s'en sert pas.\nCelui qui s'en sert ne le sait pas.\nQu'est-ce ?",
    answer: "Un cercueil."
  },
  {
    question: "Un forgeron tient une épée incandescente avec une pince.\nUn magicien apparaît et lui dit : « Si tu me donnes 1 pièce d'or, je la lèche ».\nLe forgeron lui donne alors une pièce, et le magicien s'exécute sans se brûler.\nComment a-t-il fait ?",
    answer: "Il a léché la pièce, pas l'épée."
  },
  {
    question: "Un roi avait un bouffon qu'il aimait beaucoup. Mais celui-ci accomplit un jour un acte si répréhensible que, selon les lois du pays, il fut condamné à mort. Alors le roi lui dit : « Je ne peux pas te faire grâce mais je t'accorde une faveur : tu vas choisir toi-même la façon dont tu veux mourir ». Le choix du bouffon fut tel que le bourreau ne put l'exécuter et on fut obligé de lui laisser la vie.\nQuel genre de mort avait choisi le bouffon ?",
    answer: "Mourir de vieillesse."
  },
  {
    question: "Dans un royaume fort lointain, un roi était sur le point de mourir. Il appela ses deux fils et leur dit ceci : « Mes fils, je vais bientôt passer dans l'autre monde, mais il me faut un héritier, un seul, et vous êtes deux ». Le roi leur proposa donc un pari : « Celui dont le cheval arrivera le dernier à l'oasis sacrée se verra offrir le trône ».\nLes deux prétendants s'en allèrent à toute allure et chevauchèrent pendant de nombreuses nuits pour enfin arriver à l'oasis sacrée. Arrivés à 100 m, ils s'arrêtèrent et campèrent. Ils attendirent de nombreuses nuits comme cela. Un jour un sage arriva, s'enquit du problème des deux princes, et leur chuchota quelque chose à l'oreille. Les deux princes, fous de joie, éperonnèrent les chevaux et galopèrent le plus vite possible à l'oasis.\nQue leur a dit le sage ?",
    answer: "Prends le cheval de l'autre !"
  },
  {
    question: "Pour pouvoir rentrer dans la salle du trésor, il vous faudra résoudre l'énigme du cerbère de la porte. Un peu devant vous, un aventurier tente l'énigme. Le cerbère lui dit « 2 », l'aventurier lui rétorque « 4 ». La porte s'ouvre… Un deuxième aventurier tente sa chance. Le cerbère lui dit « 4 », il lui répond « 6 ». La porte s'ouvre… Un troisième aventurier s'y colle, effrayé. Le cerbère lui dit « 6 », l'homme lui rétorque « 8 ». L'aventurier se fait dévorer… C'est votre tour d'essayer. Le cerbère vous toise du regard et dit « 7 ».\nQue répondez-vous ?",
    answer: "Il faut donner le nombre de lettres qui composent le chiffre : « deux » = 4 lettres, « quatre » = 6 lettres, « sept » = 4 lettres. Il faut donc répondre « 4 »."
  },
  {
    question: "9 sacs de pièces d'or. Un sac avec de fausses pièces plus légères. Une balance à plateau et seules 2 pesées autorisées.\nQuel sac contient les fausses pièces ?",
    answer: "Pose 3 sacs sur un plateau, 3 sacs sur l'autre plateau et laisse 3 sacs au sol. De là tu élimines les 6 sacs à égalité.\nPuis pose 1 sac sur un plateau, 1 autre sur l’autre plateau et laisse 1 sac au sol. La différence de poids t'indiquera lequel contient les fausses pièces."
  },
  {
    question: "Du repos des humains, implacable ennemie.\nJ'ai rendu mille amants envieux de mon sort.\nJe me repais de sang et retrouve ma vie dans les bras de celui qui souhaite ma mort.\nQue suis-je ?",
    answer: "Une puce."
  },
  {
    question: "Il parle toutes les langues sans en comprendre aucune.\nIl loge dans les hauteurs mais jamais dans les dunes.\nIl faut bien se garder de lui faire confiance.\nCar il va répéter la moindre confidence.\nQu'est-ce ?",
    answer: "L'écho."
  },
  {
    question: "Je serai hier, j'étais demain.",
    answer: "Aujourd'hui."
  },
  {
    question: "Connu pour ses galeries\nEt le ton de son gris\nElle évoque la mauvaise vision\nEt c'est un excellent espion",
    answer: "La taupe."
  },
  {
    question: "Je détruis tout : os, chair et vie.\nJamais je ne me repose car je suis infini.\nNi l'acier des armes, ni la roche des montagnes ne me résistent.\nDévoreur sans fin, mon appétit n'a pas de limite.\nQue suis-je ?",
    answer: "Le temps."
  },
  {
    question: "Symbole de maladresse, pour beaucoup je suis signe de malédiction.\nQuand on passe l'arme, c'est parfois à moi.\nQue suis-je ?",
    answer: "La gauche."
  },
  {
    question: "Je crache fumée et feu.\nDe ma bouche grande ouverte s'élève un tapage constant.\nSeul l'habile et le talentueux peuvent, au prix de nombreux efforts et suant dans mes entrailles, créer l'utile ou le martial.\nQue suis-je ?",
    answer: "Une forge."
  },
  {
    question: "Si de ton doigt tu veux le toucher, apprête-toi alors à le retirer.\nMais si tu sais le manipuler ta demeure en sera réchauffée et illuminée.",
    answer: "Le feu."
  },
  {
    question: "Un dragon qui vole le cherche des yeux\nUn dragon qui rugit le tiens entre ses serres\nUn dragon qui sommeille l'imagine dans ses songes\nMais il est là, à côté si tu oses. Viens donc me le dérober.",
    answer: "Un trésor."
  },
  {
    question: "Vous ne pouvez que me deviner et ne pouvez qu'avancer vers moi.\nQuand vous arrivez, je ne suis plus là.\nCar à chaque pas avancé, je recule d'autant.",
    answer: "Le futur."
  },
  {
    question: "Son seuil n'est qu'un tas de cailloux et sa porte n'est souvent qu'un trou.\nMais à l’intérieur tout est diamant et or.\nTu voudrais bien la visiter mais par-dessus tout la vider.\nMa flamme va t'en décourager.",
    answer: "L'antre d'un dragon."
  },
  {
    question: "Seigneur de la non-vie j'arpente les plans.\nPar mes joyaux incandescents j'observe les mondes infinis.\nÀ la recherche de l'étincelle interdite qui fera de moi une divinité.\nAmenant ma puissance à son zénith, et avec elle des tourments pour l'éternité.\nQui suis-je ?",
    answer: "Une demi-liche."
  },
  {
    question: "Je suis si fragile que lorsque l'on prononce mon nom, je meurs.",
    answer: "Le silence."
  },
  {
    question: "Longue comme dix hommes, un homme seul peut me porter. Pourtant, dix hommes ne pourraient me dresser vers le ciel.\nQui suis-je ?",
    answer: "Une corde."
  },
  {
    question: "Un chevalier doit retrouver et sauver sa damoiselle emprisonnée. La route qui le conduit jusqu'à elle se sépare bientôt en deux chemins : celui de l'est et celui de l'ouest. Ne sachant lequel emprunter, il s'adresse à la maison située à ce carrefour, où vivent deux sœurs jumelles. L'une dit toujours la vérité et l'autre ment toujours. Il ne sait pas laquelle lui ouvrira et ne pourra la reconnaître, tant la ressemblance entre les sœurs est parfaite. Il n'a le droit de poser qu'une seule question pour savoir quelle direction suivre, celle de l'est ou celle de l'ouest.\nQuelle sera cette question qui lui permettra de savoir, sans l'ombre d'un doute, et quelle que soit la sœur qui lui ouvrira, la bonne direction à suivre pour retrouver sa belle ?",
    answer: "Demander : « Quelle direction dirait ta sœur qu'il faut prendre ? » et prendre l’autre chemin."
  },
  {
    question: "Deux hommes regardent dans des directions diamétralement opposées, l'un vers l'est, l'autre vers l'ouest.\nComment peuvent-ils se voir sans marcher, sans se retourner, ni même bouger la tête ?",
    answer: "Ils sont face à face."
  },
  {
    question: "Un client va voir un joaillier pour lui acheter 6 chaînes, chacune composée de 5 maillons. Il veut que ces 6 chaînes soient réunies en une seule. Chaque maillon ouvert et refermé par le joaillier coûte 1 pièce d'or.\nCombien coûte la conception de cette grande chaîne ?",
    answer: "5 pièces d'or."
  },
  {
    question: "5 voleurs pénètrent un par un dans un palais renfermant des diamants. Les 4 premiers voleurs prennent la moitié des diamants qu'ils trouvent plus un. Le dernier ne trouve plus rien à voler. Combien y avait-il de diamants à l'origine ?",
    answer: "30."
  },
  {
    question: "Une échelle à 6 barreaux pend le long du bord d'un bateau. Les barreaux sont espacés d'un pied (foot). À marée basse, l'eau monte jusqu'au deuxième barreau de l'échelle. À marée haute, l'eau est 2 pieds plus haut qu'à marée basse.\nÀ quel barreau l'eau arrive-t-elle alors ?",
    answer: "2 pieds, car le bateau monte avec l'eau."
  },
  {
    question: "Un arbre elfique double sa taille tous les jours. Il lui faut 100 jours pour atteindre sa taille adulte. Combien de jours faut-il pour atteindre la moitié de cette taille ?",
    answer: "99 jours. Comptez à l'envers : le jour avant sa taille adulte, avant de doubler une dernière fois, il mesurait la moitié."
  },
  {
    question: "Je suis tout au bout de ta main, je commence la nuit et je finis demain.",
    answer: "La lettre N."
  },
  {
    question: "Un chevalier possède 8 chevaux de guerre. En un mois de conflit, tous sauf 5 périrent.\nCombien en reste-t-il ?",
    answer: "5."
  },
  {
    question: "Deux moines dînent ensemble. Helm possède 5 miches de pain et Cyric 3. Un étranger s'invite à leur table. Helm et Cyric décident de partager leur repas avec l'étranger. Les 8 miches de pain sont équitablement partagées entre les trois hommes. Après le repas, l'étranger laisse 8 pièces d'argent sur le sol. Helm décide que Cyric doit en prendre 3 pour sa contribution, mais Cyric pense que le partage devrait être équitable, c'est-à-dire 4 pièces chacun. Ils commencèrent alors à se disputer. Finalement, ils consultèrent le grand moine du temple qui dit alors qu'Helm devait prendre 7 pièces et Cyric 1 seule.\nPourquoi ?",
    answer: "Diviser chaque miche en 3 pour obtenir 24 morceaux, 15 d'Helm et 9 de Cyric. Tout le monde aura donc 8 morceaux. Helm en donne donc 7 à l'étranger (15-8) et Cyric 1 (9-8). Ce qui fait 7 pièces d'or pour l’un et 1 pour l’autre."
  },
  {
    question: "Un pingre vous a promis 10 sacs d'or contenant chacun 20 pièces. Vous avez vent qu'une arnaque se trame : il aurait remplacé toutes les pièces d'un sac par des fausses, indétectables à l'œil. La seule différence est leur poids : vraies = 10 g, fausses = 20 g. Le pingre accepte toutefois que vous fassiez une seule pesée sur sa balance (précise au gramme).\nComment faire pour détecter le sac contenant les fausses pièces ?",
    answer: "Prendre 10 pièces du 1er sac, 9 du 2ᵉ, 8 du 3ᵉ, …, 1 du 10ᵉ sac, puis peser le tout. Si la différence est de 100 g, le sac 1 est truqué, si 90 g c’est le sac 2, etc."
  },
  {
    question: "Un cavalier muni d'une monture rapide quitte le hameau de Hampton en direction de la ville de Folbourg. Au même moment, un autre cavalier, moins rapide, quitte Folbourg vers Hampton. Hampton est à 30 km de Folbourg. Le premier galope à 15 km/h, le deuxième à 10 km/h.\nLorsqu'ils se croiseront, lequel sera le plus proche du hameau de Hampton ?",
    answer: "Aucun : quand ils se croiseront ils seront au même point."
  },
  {
    question: "Dans un château d’azur, il rosit le matin, rougit le soir, mais ne sort jamais la nuit.\nQui est-il ?",
    answer: "Le soleil."
  },
  {
    question: "Que peut-on mettre dans une pièce qui la rende plus lumineuse sans allumer de feu ni user de magie ?",
    answer: "Une fenêtre."
  },
  {
    question: "Sans voix, il crie.\nSans aile, il voltige.\nSans dents, il mord.\nSans bouche, il murmure.",
    answer: "Le vent."
  },
  {
    question: "Sans cesse en train de danser.\nDonnez-moi à manger et je vivrai.\nDonnez-moi à boire et je mourrai.",
    answer: "Le feu."
  },
  {
    question: "Sans la lumière que nous fuyons, nous n'existerions pas.",
    answer: "Les ombres."
  },
  {
    question: "J'ai des rivières où ne coule nulle eau.\nDes forêts où ne pousse aucun arbre.\nDes montagnes sans une seule pierre.\nDes villes où nul ne peut vivre.\nQue suis-je ?",
    answer: "Une carte."
  },
  {
    question: "Un roi vous soumet un test. On apporte une urne et deux bouts de papier ainsi qu'une plume et de l'encre. Le roi demande d'écrire « mort » sur l'un et « vie » sur l'autre, puis de tirer au sort. Comment vous en sortir à coup sûr ?",
    answer: "Écrire « mort » sur les deux papiers, en tirer un et le faire disparaître (brûler, avaler…). Le bulletin restant indique « mort », donc le roi déduira que celui disparu disait « vie »."
  },
  {
    question: "Un homme pointe quelqu'un du doigt : « d’oncles et frères je n’ai point, mais le père de cet homme est le père de mon fils ». Qui est-il ?",
    answer: "Son fils."
  },
  {
    question: "Un objet pèse cent livres plus la moitié de son poids. Combien pèse-t-il ?",
    answer: "200 livres."
  },
  {
    question: "Trois roublards jouent aux cartes dans une taverne. Julio (qui ne ment jamais) affirme que Slavik n'est pas coupable. Slavik (parfois vrai, parfois faux) affirme que c'est Bras l’borgne. Bras l’borgne (qui ment tout le temps) affirme que c'est lui le coupable. Qui est le tricheur ?",
    answer: "Julio."
  },
  {
    question: "Une princesse a l'âge que le prince aura quand la princesse aura le double de l'âge que le prince avait quand l'âge de la princesse était à la moitié de la somme de leur âge actuel. Quels sont leurs âges ?",
    answer: "Toute solution où le prince a 3/4 de l'âge de la princesse fonctionne (ex. prince 30 ans, princesse 40 ans)."
  },
  {
    question: "Elle peut contenir des mots magiques ou donner un résultat scientifique. Mais dans une lettre de noblesse elle sert de politesse. Que suis-je ?",
    answer: "La formule."
  },
  {
    question: "Quel est le mot de trois lettres que même le plus grand des sages prononce mal ?",
    answer: "Le mot « mal »."
  },
  {
    question: "Qu’est-ce qu’une chauve-souris avec une perruque ?",
    answer: "Une souris !"
  },
  {
    question: "Pour repousser tous les dangers, on m'habille de la tête aux pieds. Je protège aussi les serpents et poissons des océans. L'homme a pris exemple pour l'armure du chevalier. Qu'est-ce ?",
    answer: "Des écailles."
  },
  {
    question: "Une boite sans charnière, sans clé, sans couvercle. Pourtant à l'intérieur est caché un trésor doré.",
    answer: "Un œuf."
  },
  {
    question: "Il mord comme le plus sauvage des loups, et pourtant il est intangible. Il rougit la peau comme le fer chaud, et pourtant il est invisible.",
    answer: "Le froid."
  },
  {
    question: "Je me fige dans le temps ou dans l'eau. Je proviens parfois d'animaux. Occasionnellement on me trouve sympathique. Lorsqu'on me jette je tombe à pic.",
    answer: "De l'encre / une ancre."
  },
  {
    question: "Chaque homme a, dans sa vie, possédé un trésor. Celui qui l'a conservé, au jour dernier sera apaisé. Mais celui qui l'a perdu, alors peut-être sera pendu.",
    answer: "L'innocence."
  },
  {
    question: "Difficile à trouver, difficile à garder, je cesse d'exister si je suis découvert.",
    answer: "Un secret."
  }
]


module.exports = { joueurs, vendeurs, saveJoueurs, tables, enigmes };
