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
}

export function createContext(userInfo: UserInfo) {
  const context = {
    user: {
      id: userInfo.sub,
      name: userInfo.name?.trim() || userInfo.preferred_username?.trim() || "",
      email: userInfo.email?.trim() || "",
      lobby_bypass: true,
      security_bypass: true,
      // Every authenticated user is a moderator (owner). token_affiliation
      // reads this field.
      affiliation: "owner",
    },
  };

  return context;
}
