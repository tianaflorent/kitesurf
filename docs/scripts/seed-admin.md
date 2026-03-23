# scripts/seed-admin.ts

> Description générale : Ce script d'initialisation (seeding) permet de créer le premier compte administrateur dans la base de données. Il est conçu pour être exécuté manuellement lors de la mise en place initiale du projet.

---

## Fonctions / Composants / Méthodes

### `main()`

**Description**
Initialise un compte administrateur par défaut si aucun utilisateur avec l'email spécifié n'existe.

**Paramètres**
| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| - | - | - | Prend ses configurations dans `.env` (`DATABASE_URL`). |

**Retour**
| Type | Description |
|------|-------------|
| `Promise<void>` | Affiche le résultat dans la console. |

**Exemple d'utilisation**
```bash
npx tsx scripts/seed-admin.ts
```

**Cas limites & comportements**
- Vérifie l'existence de l'utilisateur par son email avant la création pour éviter les doublons.
- Utilise un mot de passe par défaut (`password123!`) qui doit être modifié après la première connexion.
- Hache le mot de passe avec 12 rounds de sel via bcrypt.
