# Exercice : Système de paiement e-commerce (Day 2 / Ex 1)

Ce module implémente la logique de validation et de finalisation d'une commande dans un système e-commerce.

## Objectifs du Test
Le système doit être testé pour vérifier les points suivants :
- **Vérification du stock** : L'ordre ne doit passer que si tous les articles sont disponibles.
- **Calcul du total** : Le prix total doit être correctement calculé.
- **Débit client** : Le service de paiement externe doit être appelé avec le bon montant.
- **Email de confirmation** : Un email doit être envoyé à l'utilisateur après validation.
- **Enregistrement de la commande** : La commande doit être sauvegardée en base de données.

## Technologies utilisées
- **TypeScript** : Pour une meilleure sécurité des types.
- **Jest** : Framework de test.
- **Mocks** : Utilisation de `jest.fn()` pour simuler les services externes (Paiement, Email, Inventaire, Repository).

## Comment lancer les tests

### Via Docker
```bash
docker build -t order-service-test .
docker run --rm order-service-test
```

### En local
```bash
npm install
npm test
```
