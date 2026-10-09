# Silent login (one link for everybody)

By default, Jitsi only asks a participant to log in when the room is still
waiting for its host. Once a moderator is in the room, an authenticated user who
opens the plain meeting link joins as a guest and ends up in the lobby, without
any way to log in.

The silent login flow fixes this. Everybody uses the same link:

- Users with an active session at the OIDC provider join with a token, without
  seeing any page.
- Users without a session see a small page with two buttons: `Log in` and
  `Continue as guest`.

## How it works

1. The web server redirects a meeting URL without `jwt` and without the guest
   marker to `/oidc/silent?room=<ROOM>`.
2. The adapter sends the user to the OIDC provider with `prompt=none`. The
   provider never shows a page for this request (OpenID Connect Core 1.0,
   section 3.1.2.1).
3. With a session, the provider returns a code and the usual tokenize flow sends
   the user into the meeting with a token.
4. Without a session, the provider returns an error such as `login_required`
   (section 3.1.2.6) and the adapter shows the choice page. `Continue as guest`
   opens the meeting with `?guest=true`, so the web server does not redirect
   again.

## Nginx

Put the check into the `@root_path` location of your Jitsi Nginx config, not
into the room location. `@root_path` is only reached when the path is not a real
file, i.e. for meeting rooms. A check in the room location would also catch real
files like `/manifest.json` and the SSI subrequests of `index.html` (e.g.
`/head.html`, `/interface_config.js`), which have no query arguments and would
break the page.

```nginx
location ~ ^/([^/?&:'"]+)$ {
    set $roomname "$1";
    try_files $uri @root_path;
}

location @root_path {
    # silent login: no token and no guest marker
    set $auth_check "$arg_jwt$arg_guest";
    if ($roomname = "") {
        set $auth_check "skip";
    }
    if ($auth_check = "") {
        return 302 /oidc/silent?room=$roomname;
    }

    rewrite ^/(.*)$ /$custom_index break;
}
```

## Settings

- `OIDC_PROMPT`

  The `prompt` value for interactive logins. Default: `consent`. Set it to an
  empty string to omit the parameter. With Google, `consent` shows the consent
  screen on every login.

- `GUEST_PARAM`

  The name of the guest marker in the meeting URL. Default: `guest`. It must
  match the variable used in the Nginx config (`$arg_guest`).

## Notes

- Room and tenant names may not contain `/ ? & : ' " # < > % \` or whitespace.
  Requests with such names are rejected with `400`.
- Clients which load the meeting in an iframe (e.g. through the IFrame API)
  should pass a token or the guest marker. Otherwise they are redirected to the
  OIDC provider inside the iframe, which most providers block.
