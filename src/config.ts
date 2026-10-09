// oidc
export const OIDC_ISSUER_URL = Deno.env.get("OIDC_ISSUER_URL") ||
  "https://ucs-sso-ng.mydomain.corp/realms/ucs";
export const OIDC_CLIENT_ID = Deno.env.get("OIDC_CLIENT_ID") || "jitsi";
export const OIDC_CLIENT_SECRET = Deno.env.get("OIDC_CLIENT_SECRET") || "";
export const OIDC_SCOPES = Deno.env.get("OIDC_SCOPES") ||
  "openid profile email";
// The "prompt" value sent for interactive logins. Set it to an empty string to
// omit the parameter (the provider then only asks for consent when needed).
export const OIDC_PROMPT = Deno.env.get("OIDC_PROMPT") ?? "consent";

// jwt
export const JWT_ALG = Deno.env.get("JWT_ALG") || "HS256";
export const JWT_HASH = Deno.env.get("JWT_HASH") || "SHA-256";
export const JWT_APP_ID = Deno.env.get("JWT_APP_ID") || "myappid";
export const JWT_APP_SECRET = Deno.env.get("JWT_APP_SECRET") || "myappsecret";
export const JWT_EXP_SECOND = Number(Deno.env.get("JWT_EXP_SECOND") || 10800);
// Backdate "nbf" a bit to tolerate rounding and small clock skew between the
// adapter, Prosody and the client.
export const JWT_NBF_LEEWAY_SECOND = Number(
  Deno.env.get("JWT_NBF_LEEWAY_SECOND") || 10,
);

// adapter
export const HOSTNAME = Deno.env.get("HOSTNAME") || "127.0.0.1";
export const PORT = Number(Deno.env.get("PORT") || 9000);
// Query parameter that marks a guest in the meeting URL. The silent login
// flow sends users without an IdP session back to the room with this marker so
// that the web server does not redirect them to the adapter again.
export const GUEST_PARAM = Deno.env.get("GUEST_PARAM") || "guest";
export const AUTO_RETURN_TO_APP =
  Deno.env.get("AUTO_RETURN_TO_APP")?.toLowerCase() === "true";
