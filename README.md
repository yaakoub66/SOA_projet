# SOA_projet
# Application Frontend REST – Gestion des Personnes

## Contexte
Ce projet consiste à développer un frontend web consommant un backend RESTful
développé en Java JEE avec JAX-RS. Le backend fournit des services REST permettant
la gestion des personnes (CRUD). Le frontend communique avec le backend via des
requêtes HTTP en format JSON, en respectant l’architecture Client / Serveur.

---

## Description du projet
L’application permet :
- d’ajouter une personne
- d’afficher la liste des personnes
- de rechercher une personne par ID ou par nom
- de modifier une personne
- de supprimer une personne

Le backend est exécuté sur Tomcat via Eclipse, tandis que le frontend s’exécute
dans le navigateur.

---

## Architecture
Navigateur → Frontend (HTML / CSS / JS) → REST API (JAX-RS) → Backend → Base de données

---

## Technologies utilisées
Backend :
- Java JEE
- JAX-RS
- Tomcat
- JSON
- CORS Filter

Frontend :
- HTML5
- CSS3
- JavaScript
- Fetch API

---

## Structure du frontend
frontend-rest-person/
- index.html
- javascript.js
- style.css
- README.md

---

## Services REST exposés
Chemin de base : /persons

POST   /persons  
Ajoute une personne (name, age)

GET    /persons  
Retourne la liste des personnes

GET    /persons/{id}  
Retourne une personne par ID

GET    /persons/search?name=Ali  
Recherche une personne par nom

PUT    /persons/{id}  
Modifie une personne

DELETE /persons/{id}  
Supprime une personne

---

## Gestion du CORS
Un filtre CORS est utilisé pour autoriser les appels depuis le frontend :
- Access-Control-Allow-Origin : *
- Méthodes : GET, POST, PUT, DELETE, OPTIONS
- Gestion des requêtes OPTIONS (preflight)

---

## Fonctionnalités du frontend
- Affichage dynamique des personnes
- Formulaire d’ajout avec validation
- Modification avec pré-remplissage
- Suppression avec confirmation
- Recherche par ID ou par nom
- Appels REST via Fetch API
- Gestion du format JSON

---

## Lancement du projet
1. Démarrer le backend REST sur Tomcat depuis Eclipse
2. Vérifier l’API : http://localhost:8080/.../persons
3. Ouvrir index.html dans un navigateur
4. Utiliser l’application

---

## Vidéo de démonstration
Lien vidéo :
https://drive.google.com/file/d/1MIN6PfyX6bB8Whc0UzEKSaGMNiet9s10/view?usp=drive_link


---

## Réalisé par
Nom : Yaakoub chahed
Groupe : tp2


Lien GitHub :
https://github.com/yaakoub66/SOA_projet

