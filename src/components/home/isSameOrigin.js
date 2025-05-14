export function isSameOrigin() {
  const referrer = document.referrer;

  if (!referrer) {
    // No referrer:  User likely typed the address, used a bookmark,
    // or came from an HTTPS site to an HTTP site (referrer is often blocked).
    return false; // Treat as external navigation
  }

  try {
    // Use the URL constructor to parse the referrer URL.
    const referrerURL = new URL(referrer);
    const currentOrigin = window.location.origin; // Includes protocol, hostname, and port

    return referrerURL.origin === currentOrigin;
  } catch (error) {
    // The referrer is not a valid URL.  This is unlikely, but handle it.
    console.error("Invalid referrer URL:", referrer);
    return false; // Treat as external navigation.
  }
}
