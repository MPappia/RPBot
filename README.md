
![rpbot](https://github.com/user-attachments/assets/7e2cc928-d0e7-43bd-bf3f-8615c679b90a)

# RPBot – Le bot qui accompagne vos soirées JDR

**Bot Discord pour jeux de rôle**, conçu pour faciliter la gestion d’inventaire, de lancers de dés, de tables aléatoires et plus encore lors de vos campagnes.

---

## Table des matières

1. [Description](#description)  
2. [Fonctionnalités](#fonctionnalités)  
3. [Prérequis](#prérequis)  
4. [Installation](#installation)  
5. [Configuration](#configuration)  
6. [Structure du projet](#structure-du-projet)  
7. [Utilisation](#utilisation)  
   - [1. Commandes Slash](#1-commandes-slash)  
   - [2. Réactions](#2-réactions)  
   - [3. Tables aléatoires](#3-tables-aléatoires)  
   - [4. Administration](#4-administration)  
   - [5. Gestion des profils et sauvegardes](#5-gestion-des-profils-et-sauvegardes)  
8. [Contribution](#contribution)  
9. [Licence](#licence)

---

## Description

RPBot est un bot Discord dédié aux parties de jeu de rôle :

- Gère un système d’**inventaire** et de **pièces d’or** pour chaque joueur.  
- Permet de **lancer des dés** via `/roll`.  
- Propose des **tables aléatoires** (météo, rencontres, découvertes) avec `/table`.  
- Offre un menu d’**achat/vendeur** interactif (`/market`) pour plusieurs catégories (marchand, forgeron, apothicaire).  
- Inclut un **espace administrateur** (`/admin`) pour gérer l’or et les objets des joueurs.  
- Envoie des **messages privés** selon des réactions (👍, 💩).  
- Archive toutes les actions importantes dans un fichier `logs.txt`.  
- Sauvegarde automatiquement les profils joueurs (`joueurs.json`).

---

## Fonctionnalités

- **Gestion d’or et d’inventaire :**  
  - Chaque joueur débute avec 100 PO.  
  - Possibilité de consulter `/or` et `/inventaire` (messages éphémères supprimés après 10 s).  

- **Boutiques (“market”)**  
  - Catégories : “marchand”, “forgeron”, “apothicaire”.  
  - Menu interactif pour sélectionner un objet, choisir la quantité, et finaliser l’achat.  
  - Stock limité : mise à jour en temps réel dans `objet.js`.  

- **Lancer de dés :**  
  - Commande `/roll [X]d[Y][±mod]`.  
  - Supporte jusqu’à 10 dés de 1000 faces.  
  - Affiche Succès/Échec critique pour d20.  

- **Tables aléatoires (`/table`) :**  
  - `/table meteo` (1d20) – météo aléatoire.  
  - `/table rencontre` (1d100) – rencontre aléatoire.  
  - `/table decouverte` (1d100) – découverte aléatoire.  
  - Seuls les utilisateurs ayant le rôle **“MJ”** peuvent exécuter `/table`.  

- **Administration (`/admin`)** :  
  - `setgold [joueur] [action:set|add|remove] [montant]`  
  - `additem [joueur] [vendeur] [objet] [quantité]`  
  - `reset [joueur]` (remet or à 100 et vide l’inventaire)  
  - Accessible uniquement aux membres avec le rôle **Maitre des dés**.  

- **Réactions spéciales :**  
  - Réaction 👍 → envoie un MP personnalisé :  
    > “Salut ! Merci d’avoir réagi avec 👍. Voici ton message privé de bot ! 🎉”  
  - Réaction 💩 → envoie un MP “Poop”  

- **Logs & Sauvegarde :**  
  - Chaque action (lancer de dés, achat, admin, réaction) est journalisée dans `logs.txt`.  
  - Les profils joueurs sont persistés dans `joueurs.json` à chaque modification.  

- **Nettoyage automatique :**  
  - Les réponses éphémères (`/or`, `/inventaire`, achats) se suppriment après 10 s pour garder le chat propre.  

---
