# prisma/schema.prisma

> Description générale : Fichier de définition du schéma de la base de données MongoDB via Prisma. Il contient les modèles de données pour les avis (reviews) et les utilisateurs (users).

---

## Modèles

### `Review`

**Description**
Représente un avis laissé par un utilisateur sur le site.

| Champ | Type | Description |
|-------|------|-------------|
| `id` | `String` | Identifiant unique (ObjectId). |
| `name` | `String` | Nom de l'auteur. |
| `comment` | `String` | Contenu de l'avis. |
| `rating` | `Int` | Note (1-5). |
| `status` | `String` | État de modération : `PENDING`, `APPROVED`, `REJECTED`. |

---

### `User`

**Description**
Représente un compte utilisateur pour l'administration.

| Champ | Type | Description |
|-------|------|-------------|
| `id` | `String` | Identifiant unique (ObjectId). |
| `firstName` | `String` | Prénom de l'utilisateur. |
| `lastName` | `String` | Nom de famille. |
| `email` | `String` | Email unique pour la connexion. |
| `password` | `String` | Mot de passe haché. |
| `role` | `String` | Rôle de l'utilisateur (`ADMIN`, `MODERATOR`). |

**Cas limites & comportements**
- L'email est unique (`@unique`).
- Le rôle par défaut est `MODERATOR`.
- Les dates `createdAt` et `updatedAt` sont gérées automatiquement par Prisma.
