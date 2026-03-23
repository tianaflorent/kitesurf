# lib/auth.ts

> Description générale : Ce module contient les utilitaires d'authentification pour l'administration, incluant le hachage des mots de passe, la gestion des JSON Web Tokens (JWT) et la manipulation des cookies de session.

---

## Fonctions / Composants / Méthodes

### `hashPassword()`

**Description**
Hache un mot de passe en utilisant bcrypt avec un grain de sel (salt) de 12 rounds.

**Paramètres**
| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| password | `string` | Oui | Le mot de passe en clair à hacher. |

**Retour**
| Type | Description |
|------|-------------|
| `Promise<string>` | Le hash du mot de passe. |

**Exemple d'utilisation**
```ts
const hashed = await hashPassword("monMotDePasse");
```

---

### `verifyPassword()`

**Description**
Vérifie si un mot de passe en clair correspond à un hash stocké.

**Paramètres**
| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| password | `string` | Oui | Le mot de passe en clair. |
| hash | `string` | Oui | Le hash à comparer. |

**Retour**
| Type | Description |
|------|-------------|
| `Promise<boolean>` | `true` si le mot de passe correspond, `false` sinon. |

---

### `signAccessToken()`

**Description**
Génère un Access Token JWT signé pour un utilisateur.

**Paramètres**
| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| payload | `object` | Oui | Contient `userId`, `email` et `role`. |

**Retour**
| Type | Description |
|------|-------------|
| `Promise<string>` | Le token JWT signé. |

---

### `signRefreshToken()`

**Description**
Génère un Refresh Token JWT signé.

**Paramètres**
| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| payload | `object` | Oui | Contient `userId`, `email` et `role`. |

**Retour**
| Type | Description |
|------|-------------|
| `Promise<string>` | Le token JWT signé. |

---

### `verifyAccessToken()` / `verifyRefreshToken()`

**Description**
Vérifient la validité d'un token (Access ou Refresh) et retournent son contenu décodé.

**Paramètres**
| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| token | `string` | Oui | Le token JWT à vérifier. |

**Retour**
| Type | Description |
|------|-------------|
| `Promise<TokenPayload | null>` | Le payload du token si valide, `null` sinon. |

---

### `setAuthCookies()`

**Description**
Configure les cookies `admin_session` (Access Token) et `admin_refresh` (Refresh Token) dans la réponse.

**Paramètres**
| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| accessToken | `string` | Oui | L'access token à stocker. |
| refreshToken | `string` | Oui | Le refresh token à stocker. |
| responseCookies | `object` | Oui | L'objet cookies de la réponse (NextResponse). |

---

### `getSessionUser()`

**Description**
Récupère l'utilisateur actuellement connecté à partir des cookies. Tente de rafraîchir la session si l'access token est expiré mais que le refresh token est valide.

**Retour**
| Type | Description |
|------|-------------|
| `Promise<TokenPayload | null>` | Le payload de l'utilisateur si authentifié, `null` sinon. |

**Cas limites & comportements**
- Si seul le refresh token est valide, retourne le payload pour permettre au middleware ou à la route de mettre à jour les cookies (les cookies sont en lecture seule dans les Server Components).

---

### `requireRole()`

**Description**
Vérifie qu'un utilisateur est connecté et possède l'un des rôles autorisés.

**Paramètres**
| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| ...allowedRoles | `UserRole[]` | Oui | Liste des rôles autorisés (ex: "ADMIN", "MODERATOR"). |

**Retour**
| Type | Description |
|------|-------------|
| `Promise<TokenPayload | null>` | L'utilisateur si autorisé, `null` sinon. |
