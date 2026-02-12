# 4CITE Exercises

Ce dépôt contient les exercices de test de logique métier. Chaque exercice est isolé dans son propre dossier et possède son propre environnement Docker.

## Structure du Projet

### Jour 1
- `day1/1` : Test de l'âge adulte (TypeScript + Jest)
- `day1/2` : Logique de panier d'achat (Approche fonctionnelle)
- `day1/3` : Logique de panier d'achat (Approche Orientée Objet)

### Jour 2
- `day2/ex1` : Système de paiement e-commerce (Mocks + TypeScript)

---

## Comment Tester 🧪

### 1. En utilisant Docker (Recommandé)

#### Jour 2 - Exercice 1 : Système de Paiement
```powershell
docker build -t order-service-test -f day2/ex1/Dockerfile day2/ex1
docker run --rm order-service-test
```

#### Jour 1 - Exercice 1 : Âge Adulte
```powershell
docker build -t age-test -f day1/1/Dockerfile day1/1
docker run age-test
```

... (voir les autres commandes dans les dossiers respectifs)

### 2. En local (via NPM Workspaces)
Si vous avez Node.js installé sur votre machine :

```bash
# Installer toutes les dépendances
npm install

# Lancer TOUS les tests
npm test

# Lancer les tests d'un projet spécifique
npm test -w day2/ex1
```

---

## Environnement de Développement

Le projet est configuré pour l'IDE **Antigravity**. 
Pour éviter les soulignages d'erreurs (types manquants), exécutez à la racine :
```bash
npm install --no-workspaces
```

Toute modification poussée sur la branche `main` déclenchera automatiquement les tests via GitHub Actions.
