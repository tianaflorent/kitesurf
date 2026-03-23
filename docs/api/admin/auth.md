# docs/api/admin/auth.md

> Description générale : Ce module documente les routes d'authentification pour l'interface d'administration, incluant la connexion, la déconnexion et la récupération du profil utilisateur.

---

## Routes API

### `POST /api/admin/login`

**Description**
Valide les identifiants de l'utilisateur et initialise une session sécurisée via des cookies HTTP-only (Access Token et Refresh Token).

**Paramètres (Body JSON)**
| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| email | `string` | Oui | L'adresse email de l'administrateur. |
| password | `string` | Oui | Le mot de passe associé. |

**Réponse**
| Statut | Description |
|--------|-------------|
| `200 OK` | Retourne l'objet `user` et définit les cookies de session. |
| `400 Bad Request` | Paramètres manquants. |
| `401 Unauthorized` | Identifiants incorrects. |

---

### `POST /api/admin/logout`

**Description**
Termine la session utilisateur en supprimant les cookies d'authentification.

**Réponse**
| Statut | Description |
|--------|-------------|
| `200 OK` | Supprime les cookies `admin_session` et `admin_refresh`. |

---

### `GET /api/admin/me`

**Description**
Retourne les informations du profil de l'utilisateur actuellement connecté.

**Réponse**
| Statut | Description |
|--------|-------------|
| `200 OK` | Contient `id`, `email` et `role`. |
| `401 Unauthorized` | Session expirée ou non existante. |
