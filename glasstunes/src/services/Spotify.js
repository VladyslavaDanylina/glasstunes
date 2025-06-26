const client_id = '2873a116bcf948b1975152029d117629';
const redirect_uri = 'https://vladyslavadanylina.github.io/glasstunes/';
const scope = 'streaming user-read-email user-read-private playlist-modify-public';

let accessToken;

const Spotify = {
  login() {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    window.location = authUrl;
  },
  logout() {
    accessToken = null;
    window.location = '/';
  },
  getAccessToken() {
    if (accessToken) return accessToken;
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    }
    return null;
  },
  async getUserProfile() {
    const token = this.getAccessToken();
    if (!token) return null;
    const res = await fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const json = await res.json();
    return {
      display_name: json.display_name,
      email: json.email,
      avatar: json.images[0]?.url || ""
    };
  }
};

export default Spotify;
