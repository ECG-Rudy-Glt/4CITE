# 4CITE Exercises - Day 1

Ce dépôt contient les exercices de test de logique métier pour le jour 1. Chaque exercice est isolé dans son propre dossier et possède son propre environnement Docker.

## Structure du Projet

- `day1/1` : Test de l'âge adulte (TypeScript + Jest)
- `day1/2` : Logique de panier d'achat (TypeScript + Jest)
- `.github/workflows` : Intégration continue (CI) automatique.

---

## Comment Tester 🧪

### 1. En utilisant Docker (Recommandé)
Chaque projet peut être testé de manière isolée sans rien installer localement.

#### Exercice 1 : Âge Adulte
```powershell
docker build -t age-test -f day1/1/Dockerfile day1/1
docker run age-test
```

#### Exercice 2 : Panier d'Achat
```powershell
docker build -t cart-test -f day1/2/Dockerfile day1/2
docker run cart-test
```

### 2. En local (via NPM Workspaces)
Si vous avez Node.js installé sur votre machine :

```bash
# Installer toutes les dépendances
npm install

# Lancer TOUS les tests
npm test

# Lancer les tests d'un projet spécifique
npm test -w day1/1
npm test -w day1/2
```

---

## Environnement de Développement

Le projet est configuré pour l'IDE **Antigravity**. 
Pour éviter les soulignages d'erreurs (types manquants), exécutez à la racine :
```bash
npm install --no-workspaces
```

Toute modification poussée sur la branche `main` déclenchera automatiquement les tests via GitHub Actions.
