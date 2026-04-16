import { NextResponse } from "next/server";

/**
 * Filtre et centralise la gestion des erreurs liées à MongoDB ou Prisma,
 * pour éviter la duplication de la vérification de la connexion.
 *
 * @param error L'erreur catchée
 * @param endpoint Le nom de l'endpoint pour les logs (ex: "[GET /api/reviews]")
 * @param defaultMessage Le message générique à renvoyer si ce n'est pas une erreur réseau
 * @returns NextResponse correspondant à l'erreur
 */
export function handleDbError(
  error: unknown,
  endpoint: string,
  defaultMessage: string = "Erreur serveur"
): NextResponse {
  const message = error instanceof Error ? error.message : String(error);

  const isDbUnavailable =
    message.includes("Server selection timeout") ||
    message.includes("No available servers") ||
    message.includes("ReplicaSetNoPrimary") ||
    message.includes("received fatal alert") ||
    message.includes("ECONN") ||
    message.includes("timed out");

  const isTransactionsUnsupported = message.includes(
    "Transactions are not supported by this deployment"
  );

  console.error(`${endpoint} Erreur :`, message);

  if (isDbUnavailable) {
    return NextResponse.json(
      { error: "Base de données indisponible. Vérifiez la connexion." },
      { status: 503 }
    );
  }

  if (isTransactionsUnsupported) {
    return NextResponse.json(
      { error: "La base de données ne supporte pas les transactions. Assurez-vous d'utiliser un ReplicaSet MongoDB." },
      { status: 503 }
    );
  }

  return NextResponse.json({ error: defaultMessage }, { status: 500 });
}
