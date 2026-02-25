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
    name: 'EDUARD FLORENCE L. SERNA',
    title: 'LEGENDARY HATDOG STUDENT',
    bio: 'I am a motivated and curious individual who enjoys learning new things and improving my skills. I have a strong interest in technology, creativity, and problem-solving. I am dedicated to doing my best in every task and always aim to grow both personally and professionally. In my free time, I enjoy exploring new ideas, working on projects, and spending time on things that inspire me.',
    location: 'TAGUIG CITY',
    occupation: 'STUDENT AT ASIA PACIFIC COLLEGE',
    specialty: 'Platforming, Rescue Missions, Kart Racing',
    website: 'https://www.facebook.com/efl.srn',
    coins_collected: 9999,
    worlds_completed: 8,
    lives: '∞',
    power_level: '⭐⭐⭐',
    avatar_url: null
  });

  if (loading) return <div className="panel">Loading profile...</div>;

  return (
    <>
      {/* Profile Header */}
      <div className="panel">
        <div className="profile-avatar">
          {profile.avatar_url ? (
            <img 
              src={profile.avatar_url} 
              alt={profile.name} 
              className="avatar-image"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline-flex';
              }}
            />
          ) : null}
          <div 
            className="avatar-circle" 
            style={{ display: profile.avatar_url ? 'none' : 'inline-flex' }}
          >
            🍄
          </div>
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
          <div className="skill-badge">🍄 HTML</div>
          <div className="skill-badge">🌟 JAVASCRIPT</div>
          <div className="skill-badge">🌺 CSS</div>
          <div className="skill-badge">🦅 MYSQL</div>
          <div className="skill-badge">🍃 PYTHON</div>
          <div className="skill-badge">⚡ JAVA</div>
        </div>
      </div>

      <button className="btn" onClick={onEdit}>✏️ EDIT PROFILE</button>
    </>
  );
}