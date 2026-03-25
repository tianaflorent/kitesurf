import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

interface SendInviteEmailParams {
  to: string;
  firstName: string;
  inviteToken: string;
}

export async function sendInviteEmail({
  to,
  firstName,
  inviteToken,
}: SendInviteEmailParams): Promise<{ success: boolean; error?: string }> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const inviteLink = `${appUrl}/auth/accept-invite?token=${inviteToken}`;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: "Vous êtes invité à rejoindre Purewind Admin",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 32px;">
            <div style="display: inline-block; background: #0f172a; color: white; width: 48px; height: 48px; border-radius: 12px; line-height: 48px; font-size: 20px; font-weight: bold;">P</div>
          </div>
          <h1 style="font-size: 22px; font-weight: 600; color: #0f172a; text-align: center; margin-bottom: 8px;">
            Bienvenue ${firstName} !
          </h1>
          <p style="color: #64748b; text-align: center; font-size: 14px; line-height: 1.6; margin-bottom: 32px;">
            Vous avez été invité(e) en tant que modérateur sur la plateforme Purewind.
            Cliquez sur le bouton ci-dessous pour définir votre mot de passe et activer votre compte.
          </p>
          <div style="text-align: center; margin-bottom: 32px;">
            <a href="${inviteLink}" style="display: inline-block; background: #0f172a; color: white; padding: 12px 32px; border-radius: 12px; font-size: 14px; font-weight: 600; text-decoration: none;">
              Activer mon compte
            </a>
          </div>
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">
            Si vous n'avez pas demandé cette invitation, ignorez cet email.
          </p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("[sendInviteEmail] Erreur :", error);
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return { success: false, error: message };
  }
}
