# docs/api/admin/reviews.md

> Description générale : Ce module documente les routes d'administration permettant de modérer les avis (reviews) déposés sur le site.

---

## Routes API

### `GET /api/admin/reviews`

**Description**
Récupère la liste exhaustive de tous les avis enregistrés, triés par date de création (du plus récent au plus ancien).

**Accès**
- Rôle requis : `ADMIN` ou `MODERATOR`.

**Réponse**
| Type | Description |
|------|-------------|
| `Review[]` | Liste d'objets Review (incluant le statut PENDING/APPROVED/REJECTED). |

---

### `PATCH /api/admin/reviews/[id]`

**Description**
Modifie le statut d'un avis spécifique pour le valider ou le rejeter.

**Accès**
- Rôle requis : `ADMIN`.

**Paramètres**
| Nom | Type | Source | Description |
|-----|------|--------|-------------|
| id | `string` | URL | Identifiant unique de l'avis. |
| status | `string` | Body | Nouveau statut : `APPROVED`, `REJECTED`, `PENDING`. |

**Réponse**
| Statut | Description |
|--------|-------------|
| `200 OK` | Retourne l'avis mis à jour. |
| `400 Bad Request` | Statut invalide. |
| `403 Forbidden` | Permission insuffisante (MODERATOR non autorisé). |

---

### `DELETE /api/admin/reviews/[id]`

**Description**
Supprime définitivement un avis de la base de données.

**Accès**
- Rôle requis : `ADMIN`.

**Paramètres**
| Nom | Type | Source | Description |
|-----|------|--------|-------------|
| id | `string` | URL | Identifiant unique de l'avis. |

**Réponse**
| Statut | Description |
|--------|-------------|
| `200 OK` | Message de confirmation. |
| `403 Forbidden` | Permission insuffisante. |
