import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ProfileView({ onEdit }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('mario_profile')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading profile:', error);
    }
    setProfile(data || getDefaultProfile());
    setLoading(false);
  };

  const getDefaultProfile = () => ({
    name: 'SUPER MARIO',
    title: 'LEGENDARY HERO & PLUMBER',
    bio: 'A brave plumber from the Mushroom Kingdom on an endless quest to rescue Princess Peach from Bowser. Expert in jumping, pipe navigation, and coin collection. Known for defeating enemies by jumping on their heads and breaking brick blocks with fists.',
    location: 'Mushroom Kingdom',
    occupation: 'Professional Plumber & Hero',
    specialty: 'Platforming, Rescue Missions, Kart Racing',
    website: 'https://super-mario.com',
    coins_collected: 9999,
    worlds_completed: 8,
    lives: '∞',
    power_level: '⭐⭐⭐'
  });

  if (loading) return <div className="panel">Loading profile...</div>;

  return (
    <>
      {/* Profile Header */}
      <div className="panel">
        <div className="profile-avatar">
          <div className="avatar-circle">🍄</div>
          <div className="profile-name">{profile.name}</div>
          <div className="profile-title">{profile.title}</div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{profile.coins_collected}</div>
            <div className="stat-label">💰 Coins Collected</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{profile.worlds_completed}</div>
            <div className="stat-label">🌍 Worlds Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{profile.lives}</div>
            <div className="stat-label">💚 Extra Lives</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{profile.power_level}</div>
            <div className="stat-label">⚡ Power Level</div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="panel">
        <div className="panel-title">📜 ABOUT ME</div>
        <div className="info-text" style={{ lineHeight: 1.8, padding: '12px' }}>
          {profile.bio}
        </div>
      </div>

      {/* Info */}
      <div className="panel">
        <div className="panel-title">ℹ️ PROFILE INFO</div>
        <div className="info-row">
          <div className="info-icon">🏠</div>
          <div className="info-content">
            <div className="info-label">LOCATION</div>
            <div className="info-text">{profile.location}</div>
          </div>
        </div>
        <div className="info-row">
          <div className="info-icon">💼</div>
          <div className="info-content">
            <div className="info-label">OCCUPATION</div>
            <div className="info-text">{profile.occupation}</div>
          </div>
        </div>
        <div className="info-row">
          <div className="info-icon">🎮</div>
          <div className="info-content">
            <div className="info-label">SPECIALTY</div>
            <div className="info-text">{profile.specialty}</div>
          </div>
        </div>
        <div className="info-row">
          <div className="info-icon">🌐</div>
          <div className="info-content">
            <div className="info-label">WEBSITE</div>
            <div className="info-text">{profile.website}</div>
          </div>
        </div>
      </div>

      {/* Skills (static for now) */}
      <div className="panel">
        <div className="panel-title">⭐ POWER-UPS & SKILLS</div>
        <div className="skills-list">
          <div className="skill-badge">🍄 Super Mushroom</div>
          <div className="skill-badge">🌟 Star Power</div>
          <div className="skill-badge">🌺 Fire Flower</div>
          <div className="skill-badge">🦅 Cape Feather</div>
          <div className="skill-badge">🍃 Tanooki Suit</div>
          <div className="skill-badge">⚡ Lightning Speed</div>
        </div>
      </div>

      <button className="btn" onClick={onEdit}>✏️ EDIT PROFILE</button>
    </>
  );
}