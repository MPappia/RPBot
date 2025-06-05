# Politique de Confidentialité (Privacy Policy)

Dernière mise à jour : 05/06/2025

## 1. Introduction

Cette politique décrit comment RPBot collecte, utilise et protège vos données personnelles lorsque vous interagissez avec le bot sur Discord.

## 2. Données Collectées

1. **Identifiant Discord** :  
   - Lorsqu’un·e Utilisateur interagit (commande slash, réaction, achat), son ID unique est stocké pour associer l’or et l’inventaire.  

2. **Pseudonyme (tag Discord)** :  
   - Enregistré pour personnaliser les messages (ex. « Utilisateur#1234 »).  

3. **Inventaire et Or** :  
   - Le montant d’or (nombre entier) et la liste d’objets possédés (nom + quantité) par joueur sont stockés dans `joueurs.json`.

4. **Logs d’Actions** :  
   - Toute commande, achat, lancer de dés ou réaction est consignée dans `logs.txt` avec horodatage et ID Discord.  

Aucune autre donnée n’est collectée (adresse IP, informations de paiement, contenu des messages privés, etc.).

## 3. Finalités du Traitement

- **Gestion de l’inventaire et des ressources** : permettre à chaque joueur de conserver sa progression (or, objets).  
- **Fonctionnalités du bot** : lancer des dés, afficher les tables aléatoires, gérer les achats.  
- **Sécurité et journalisation** : conserver un historique des actions pour détecter d’éventuelles fraudes et pour la maintenance.  

## 4. Base Légale

Le traitement se fonde sur le consentement implicite de l’Utilisateur lorsqu’il/elle choisit d’utiliser RPBot. Les données sont nécessaires au fonctionnement du Service.

## 5. Partage des Données

- Les informations restent exclusivement sur le serveur sur lequel le bot est hébergé (fichiers locaux `joueurs.json` et `logs.txt`).  
- Aucune donnée personnelle n’est partagée avec des tiers ou avec des services externes.

## 6. Conservation des Données

- **`joueurs.json`** :  
  - Conservé tant que le bot est actif sur votre serveur.  
  - Vous pouvez demander la suppression de votre profil et de vos données associées à tout moment (via commande admin ou retrait du bot).  

- **`logs.txt`** :  
  - Conservation indéfinie à des fins de diagnostic et de sécurité.  
  - Vous pouvez purgéer ce fichier manuellement si nécessaire.

## 7. Sécurité

- **Accès restreint** : seuls les Administrateurs du serveur (rôle « Maitre des dés ») peuvent modifier directement les données via `/admin`.  
- **Protection des fichiers** : assurez-vous que le serveur Discord et l’hébergeur sont configurés pour limiter l’accès aux fichiers JSON et logs à des utilisateurs autorisés.

## 8. Droits des Utilisateurs

En tant qu’Utilisateur, vous pouvez :

1. **Consulter** les données vous concernant (or, inventaire).  
2. **Modifier** votre profil uniquement via les commandes autorisées (achat, dépenses).  
3. **Demander la suppression** complète de votre profil (commande `/admin reset` ou en contactant l’administrateur du serveur).  

## 9. Mineurs

Ce Service n’est pas spécifiquement destiné aux mineurs. Si vous avez moins de 16 ans, demandez l’autorisation d’un parent ou tuteur avant d’utiliser RPBot, car il collecte des ID Discord (données personnelles).

## 10. Modifications de la Politique

La présente Politique de Confidentialité peut être mise à jour à tout moment. La date en tête du document sera modifiée. Il est recommandé de la consulter régulièrement.

---

> **Contact**  
> Pour toute question relative à cette politique, veuillez contacter knr[underscore]d sur Discord. D'autres moyens de contact sont disponnibles sur mon profil Github.  
