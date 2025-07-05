import React, { useEffect, useState } from "react";
import Spotify from "../services/Spotify";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

// import SongRow if you have it, or use your own component
function RecommendedTrackRow({ name, artist, img, onClick }) {
  return (
    <div className="dashboard-song-row" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={img} alt={name} className="dashboard-song-avatar" />
      <div className="dashboard-song-info">
        <div className="dashboard-song-name">{name}</div>
        <div className="dashboard-song-artist">{artist}</div>
      </div>
      <span className="dashboard-song-play">▶️</span>
    </div>
  );
}

export default function RecommendedPage() {
  const [tracks, setTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecommendations() {
      // Get user's top artists, top tracks, and available genres
      const [topArtists, topTracks, genres] = await Promise.all([
        Spotify.getUserTopArtists(),
        Spotify.getUserTopTracks(),
        Spotify.getAvailableGenres(),
      ]);
      // Pick a few genres (for demo, first 2)
      const seed_genres = genres.slice(0, 2).join(",");
      // Build seeds (Spotify needs at least one, max 5 seeds total)
      const recommendations = await Spotify.getRecommendations({
        seed_artists: topArtists.slice(0,2).join(","),
        seed_tracks: topTracks.slice(0,2).join(","),
        seed_genres,
      });
      setTracks(recommendations);
    }
    fetchRecommendations();
  }, []);

  return (
    <div className="recommended-container">
      <h2>Recommended For You</h2>
      <div className="dashboard-songs-list">
        {tracks.length === 0 ? (
          <div style={{ color: "#aaa" }}>No recommendations yet.</div>
        ) : (
          tracks.map(track => (
            <RecommendedTrackRow
              key={track.id}
              name={track.name}
              artist={track.artist}
              img={track.albumCover || "/cover-default.jpg"}
              onClick={() => navigate(`/track/${track.id}`)}
            />
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}