// -----------------------------------------------------------------------------
// HTML pages shown by the adapter. They use the Peopleware design (violet
// accent, dark violet surfaces), follow the system's light or dark mode and
// work without JavaScript.
// -----------------------------------------------------------------------------

// Pages contain no script, only inline styles and links.
export const PAGE_HEADERS = {
  "Content-Type": "text/html; charset=utf-8",
  "Cache-Control": "no-store",
  "Content-Security-Policy":
    "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
};

// -----------------------------------------------------------------------------
// HTML escape
// -----------------------------------------------------------------------------
function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// -----------------------------------------------------------------------------
// The Peopleware sign. It takes the text color of the page.
// -----------------------------------------------------------------------------
const LOGO = `<svg class="logo" viewBox="0 0 56 38" aria-hidden="true">
  <path fill="currentColor" transform="translate(-26.5,-59)" d="m 81.952407,60.520254 h -7.9255 c -0.1422,6.836199 -0.0777,13.672399 -0.0313,20.508595 -0.0103,2.21 -0.7098,4.9189 -2.2503,6.4258 -1.0512,1.1139 -2.9263,1.6145 -4.5421,1.584 -2.8036,-0.3554 -5.448,-2.2547 -7.7381,-4.1767 1.1825,-1.3802 2.272,-2.7967 3.244,-4.2017 3.3428,-4.919496 4.9598,-10.261996 1.7025,-15.888295 -2.0155,-3.5066 -5.9445,-5.2969 -9.8788,-5.3165 -3.9343,0.0196 -7.8634,1.8099 -9.8789,5.3165 -3.2573,5.626299 -1.6403,10.968699 1.7025,15.888295 0.9721,1.405 2.0615,2.8215 3.244,4.2017 -2.29,1.922 -4.9344,3.8212 -7.738,4.1767 -1.6158,0.0305 -3.4909,-0.4701 -4.5421,-1.584 -1.5406,-1.5068 -2.24,-4.2157 -2.2503,-6.4258 0.0464,-6.836196 0.111,-13.672396 -0.0313,-20.508595 h -7.9255 c -0.1385,6.986299 -0.0882,13.973299 -0.0208,20.959395 0.1142,2.0572 0.545,4.0259 1.3333,5.948 1.6824,4.3591 5.7365,7.8267 10.4306,8.4479 0.928,0.1751 1.9111,0.2033 2.8449,0.2209 1.4143,-0.004 2.8504,-0.3373 3.9815,-0.7483 3.1423,-1.2119 6.1335,-3.1763 8.85,-5.5168 2.7166,2.3405 5.7077,4.305 8.8501,5.5168 1.1311,0.411 2.5672,0.7446 3.9815,0.7483 0.9338,-0.0177 1.9169,-0.0458 2.8449,-0.2209 4.6941,-0.6212 8.7482,-4.0887 10.4307,-8.4479 0.7882,-1.9221 1.2191,-3.8908 1.3333,-5.948 0.0674,-6.986096 0.1177,-13.973097 -0.0208,-20.959395 z m -24.2311,15.218799 c -0.3791,0.637296 -0.8038,1.279796 -1.265,1.905896 l -1.9233,2.2541 -1.9233,-2.2541 c -0.4611,-0.6261 -0.886,-1.2686 -1.265,-1.905896 -1.3035,-2.2316 -1.934,-4.6549 -0.6639,-7.207 0.7859,-1.5906 2.3179,-2.4027 3.852,-2.4115 h 1e-4 c 1.5342,0.009 3.0661,0.8209 3.8521,2.4115 1.2703,2.5521 0.6397,4.9754 -0.6637,7.207 z"/>
</svg>`;

// -----------------------------------------------------------------------------
// Colors from the Peopleware design tokens, the same as in Jitsi's config.js.
// -----------------------------------------------------------------------------
const STYLE = `
  :root {
    color-scheme: light dark;
    --page: #F6F0FF;
    --page-top: #F6F0FF;
    --page-glow: #E7D1FF;
    --card: #FFFFFF;
    --border: #E7D1FF;
    --text: #1B1E23;
    --muted: #5B6170;
    --logo: #8000FF;
    --primary: #8000FF;
    --primary-hover: #6700D6;
    --on-primary: #FFFFFF;
    --secondary-hover: #EEE1FF;
    --focus: #9538FF;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --page: #100A1C;
      --page-top: #2B0059;
      --page-glow: #8000FF80;
      --card: #1B1E23E6;
      --border: #3D4352;
      --text: #FFFFFF;
      --muted: #C2C6D0;
      --logo: #FFFFFF;
      --primary: #8000FF;
      --primary-hover: #9538FF;
      --secondary-hover: #252931;
      --focus: #DCBDFF;
    }
  }

  * { box-sizing: border-box; }

  body {
    margin: 0;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 16px;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    line-height: 1.5;
    color: var(--text);
    background-color: var(--page);
    background-image:
      radial-gradient(circle at 10% 0%, var(--page-glow), transparent 60%),
      linear-gradient(160deg, var(--page-top), var(--page) 60%);
    background-attachment: fixed;
  }

  main {
    width: 100%;
    max-width: 400px;
    padding: 32px 24px;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: var(--card);
    text-align: center;
  }

  .logo { width: 56px; height: 38px; color: var(--logo); }

  h1 { margin: 16px 0 4px; font-size: 1.5rem; }

  p { margin: 0 0 24px; color: var(--muted); overflow-wrap: anywhere; }

  a.button {
    display: block;
    margin-top: 12px;
    padding: 12px 16px;
    border: 1px solid var(--primary);
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
  }

  a.primary { background: var(--primary); color: var(--on-primary); }
  a.primary:hover { background: var(--primary-hover); border-color: var(--primary-hover); }

  a.secondary { background: transparent; color: var(--text); border-color: var(--border); }
  a.secondary:hover { background: var(--secondary-hover); }

  a.button:focus-visible { outline: 3px solid var(--focus); outline-offset: 2px; }

  small { display: block; margin-top: 24px; color: var(--muted); }
`;

// -----------------------------------------------------------------------------
// The frame of every page. "content" must already be escaped.
// -----------------------------------------------------------------------------
function layout(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no"
  >
  <meta name="referrer" content="no-referrer">
  <title>${escapeHtml(title)}</title>
  <style>${STYLE}</style>
</head>
<body>
  <main>
    ${LOGO}
    ${content}
  </main>
</body>
</html>`;
}

// -----------------------------------------------------------------------------
// Choice page after a failed silent login: log in or continue as guest.
// -----------------------------------------------------------------------------
export function choicePage(
  room: string,
  loginUri: string,
  guestUri: string,
): string {
  return layout(
    "Join meeting",
    `<h1>Join meeting</h1>
    <p>${escapeHtml(room)}</p>
    <a class="button primary" href="${escapeHtml(loginUri)}">Log in</a>
    <a class="button secondary" href="${escapeHtml(guestUri)}">
      Continue as guest
    </a>
    <small>Guests wait until someone in the meeting lets them in.</small>`,
  );
}

// -----------------------------------------------------------------------------
// Page for the mobile and desktop apps. The login runs in the browser, the link
// hands the token over to the app.
// -----------------------------------------------------------------------------
export function returnToAppPage(meetingUri: string): string {
  return layout(
    "Meeting authentication",
    `<h1>Logged in</h1>
    <p>Return to the app to join the meeting.</p>
    <a class="button primary" href="${escapeHtml(meetingUri)}">
      Return to the app
    </a>
    <small>You can close this tab afterwards.</small>`,
  );
}
