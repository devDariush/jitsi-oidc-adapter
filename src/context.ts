// -----------------------------------------------------------------------------
// This function creates the context inside JWT's payload. It gets userInfo
// (which comes from the OIDC userinfo endpoint) as parameter.
//
// Update the codes according to your requirements. Welcome to TypeScript :)
// -----------------------------------------------------------------------------
export interface UserInfo {
  sub: string;
  name?: string;
  preferred_username?: string;
  email?: string;
  picture?: string;
}

// -----------------------------------------------------------------------------
// The "picture" claim (e.g. the Google profile picture) is placed into the
// client's <img> as the avatar. Accept only HTTPS URLs.
// -----------------------------------------------------------------------------
function getAvatar(picture: string | undefined): string {
  try {
    const url = new URL(picture?.trim() || "");
    if (url.protocol === "https:") return url.href;
  } catch {
    // invalid or missing URL
  }

  return "";
}

export function createContext(userInfo: UserInfo) {
  const context = {
    user: {
      id: userInfo.sub,
      name: userInfo.name?.trim() || userInfo.preferred_username?.trim() || "",
      email: userInfo.email?.trim() || "",
      avatar: getAvatar(userInfo.picture),
      // No lobby_bypass or affiliation claims: Prosody's muc_lobby_whitelist
      // lets token users skip the lobby and Jicofo's JWT authentication makes
      // every token user a moderator.
    },
  };

  return context;
}
