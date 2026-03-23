# middleware.ts

> Description générale : Ce middleware Next.js intercepte les requêtes vers les routes d'administration (`/admin` et `/api/admin`). Il gère la vérification de l'authentification via JWT et le rafraîchissement automatique de l'Access Token si le Refresh Token est valide.

---

## Fonctions / Composants / Méthodes

### `middleware()`

**Description**
Fonction principale du middleware qui vérifie l'état d'authentification de l'utilisateur.

**Paramètres**
| Nom | Type | Requis | Description |
|-----|------|--------|-------------|
| request | `NextRequest` | Oui | L'objet de la requête entrante. |

**Retour**
| Type | Description |
|------|-------------|
| `Promise<NextResponse>` | La réponse suivante (`NextResponse.next()`) ou une redirection vers `/admin/login`. |

**Fonctionnement interne**
1. Identifie si la route est une page d'admin ou une API d'admin.
2. Vérifie la présence et la validité de l'Access Token (`admin_session`).
3. Si l'Access Token est absent ou expiré, tente de valider le Refresh Token (`admin_refresh`).
4. Si le Refresh Token est valide :
   - Génère un nouvel Access Token frais.
   - Ajoute le nouvel Access Token aux cookies de la réponse.
   - Autorise la requête.
5. Si aucune authentification n'est valide :
   - Redirige vers `/admin/login` avec le paramètre `next` pour les pages.
   - Retourne une erreur JSON 401 pour les APIs.

---

## Configuration

**Matcher**
```ts
export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
```
Le middleware s'exécute uniquement sur les chemins commençant par `/admin` ou `/api/admin`.
