let accessToken;
let cachedUserId;

const clientId = "091ea8b3444d43d083f22813edce7e33";
const redirectUri = "https://vladyslavadanylina.github.io/glasstunes/";
const scope = "streaming user-read-email user-read-private playlist-modify-public";

// PKCE helpers
function generateRandomString(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = new Uint32Array(length);
  window.crypto.getRandomValues(values);
  return Array.from(values).map(v => charset[v % charset.length]).join('');
}

async function sha256(plain) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await window.crypto.subtle.digest('SHA-256', data);
}

function base64UrlEncode(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

const Spotify = {
  async getAccessToken() {
    if (accessToken) return accessToken;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      const codeVerifier = generateRandomString(128);
      localStorage.setItem("spotify_code_verifier", codeVerifier);

      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64UrlEncode(hashed);

      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

      window.location = authUrl;
      return;
    }

    const codeVerifier = localStorage.getItem("spotify_code_verifier");
    if (!codeVerifier) {
      window.location.href = redirectUri;
      return;
    }

    const body = new URLSearchParams({
      client_id: clientId,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    });

    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      });

      const data = await response.json();

      if (data.access_token) {
        accessToken = data.access_token;
        localStorage.removeItem("spotify_code_verifier");
        window.history.replaceState({}, document.title, redirectUri);
        return accessToken;
      } else {
        window.location.href = redirectUri;
      }
    } catch (error) {
      window.location.href = redirectUri;
    }
  },
   async getCurrentUserId() {
    if (cachedUserId) return cachedUserId;

    const token = await this.getAccessToken();
    if (!token) return;

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      console.error("Failed to fetch user ID");
      return;
    }

    const data = await response.json();
    cachedUserId = data.id;
    return cachedUserId;
  },

async getUserPlaylists() {
  const token = await this.getAccessToken();
  console.log("Token used for user playlists:", token);
  if (!token) return [];
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    console.error("Failed to fetch playlists", response.status);
    return [];
  }
  const json = await response.json();
  return (json.items || []).map(p => ({
    playlistId: p.id,
    playlistName: p.name,
    img: p.images?.[0]?.url,
    totalTracks: p.tracks?.total,
    description: p.description,
    owner: p.owner?.display_name,
  }));
},

// 1. Featured ("Made For You") playlists
async getFeaturedPlaylists() {
  const token = await this.getAccessToken();
  if (!token) return [];
  const response = await fetch(
    "https://api.spotify.com/v1/browse/featured-playlists",
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  if (!response.ok) {
    console.error("Failed to fetch featured playlists", response.status);
    return [];
  }
  const json = await response.json();
  return (json.playlists?.items || []).map(p => ({
    playlistId: p.id,
    playlistName: p.name,
    img: p.images?.[0]?.url,
    owner: p.owner?.display_name,
    description: p.description,
  }));
},
/*
async getFeaturedPlaylists() {
  const token = await this.getAccessToken();
   console.log("Token used for featured playlists:", token);
  if (!token) return [];
  console.log("Token used for featured:", token);
  const response = await fetch("https://api.spotify.com/v1/browse/featured-playlists?country=US&limit=8", {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!response.ok) {
    console.error("Failed to fetch featured playlists", response.status);
    return [];
  }
  const json = await response.json();
  return (json.playlists?.items || []).map(p => ({
    playlistId: p.id,
    playlistName: p.name,
    img: p.images?.[0]?.url,
    owner: p.owner?.display_name,
    description: p.description,
  }));
},
*/

// 2. Categories list
async getCategories() {
  const token = await this.getAccessToken();
  if (!token) return [];
  const res = await fetch("https://api.spotify.com/v1/browse/categories?country=US&limit=8", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return (data.categories?.items || []).map(c => ({
    id: c.id,
    name: c.name,
    img: c.icons?.[0]?.url,
  }));
},

  async getPlaylistTracks(playlistId) {
    const token = await this.getAccessToken();
    if (!token || !playlistId) return [];

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    if (!data.items) return [];

    return data.items
      .filter(item => item.track)
      .map(({ track }) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0]?.name || "Unknown",
        album: track.album.name,
        uri: track.uri,
        albumCover: track.album.images[0]?.url,
      }));
  },

  async search(term) {
    const token = await this.getAccessToken();
    if (!token) return [];

    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = await response.json();
    if (!json.tracks) return [];

    return json.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
      albumCover: track.album.images[0]?.url,
    }));
  },

  async savePlayList(name, trackUris) {
    if (!name || !trackUris.length) return;

    const token = await this.getAccessToken();
    const userId = await this.getCurrentUserId();
    if (!token || !userId) return;

    const createRes = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const playlist = await createRes.json();
    const playlistId = playlist.id;

    await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: trackUris }),
    });
  },
  async updatePlaylist(playlistId, name, trackUris) {
    if (!playlistId || !trackUris.length) return;

    const token = await this.getAccessToken();
    if (!token) return;

    // Update playlist name (optional)
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    // Replace tracks
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: trackUris }),
    });
  },

};

  // (другие методы getCurrentUserId, search, savePlaylist и т.д. — как раньше)


export default Spotify;
