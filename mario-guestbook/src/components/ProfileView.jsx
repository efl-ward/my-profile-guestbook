import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import CarouselSection from './CarouselSection'; // import the new component

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
    specialty: 'NONE :(',
    website: 'https://www.facebook.com/efl.srn',
    coins_collected: 9999,
    worlds_completed: 8,
    lives: '∞',
    power_level: '⭐⭐⭐',
    avatar_url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/kendrick_lmao-removebg-preview.png'
  });

  // --- YOUR PHOTO ARRAYS (replace with actual raw GitHub URLs) ---
  const friendsPhotos = [
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f1.jpg', title: 'Friend 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f2.jpg', title: 'Friend 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f3.jpg', title: 'Friend 3' },
    {url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f9.jpg', title: 'Friend 23' },

    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f10.jpeg', title: 'Friend 4' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f11.jpeg', title: 'Friend 5' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f12.jpeg', title: 'Friend 6' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f14.jpeg', title: 'Friend 7' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f15.jpeg', title: 'Friend 8' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f16.jpeg', title: 'Friend 9' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f17.jpeg', title: 'Friend 10' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f18.jpeg', title: 'Friend 11' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f19.jpeg', title: 'Friend 12' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f21.jpeg', title: 'Friend 13' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f20.jpeg', title: 'Friend 14' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f22.jpeg', title: 'Friend 15' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f26.jpg', title: 'Friend 16' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f27.jpg', title: 'Friend 17' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f28.jpg', title: 'Friend 18' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f29.jpg', title: 'Friend 19' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f5.JPG', title: 'Friend 20' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f6.JPG', title: 'Friend 21' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f7.JPG', title: 'Friend 22' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/g1.jpg', title: 'Friend 24' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/received_739386440945897.jpeg', title: 'Friend 25' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/received_632118294992140.jpeg', title: 'Friend 26' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/received_2117874181734005.jpeg', title: 'Friend 27' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/received_1878139022518072.jpeg', title: 'Friend 28' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/received_1689891165095385.jpeg', title: 'Friend 29' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/received_1375764633161015.jpeg', title: 'Friend 30' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/received_1192855737990024.jpeg', title: 'Friend 31' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/received_1004598367920363.jpeg', title: 'Friend 32' },
  ];

  const inspirationsPhotos = [
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f32.jpg', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/8e30b42b-69a0-45bc-89fb-4a3476569646.jfif', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f31.jpg', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/50ab5c38-b69e-4250-a5d4-441293a19505.jfif', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/96262eed-7890-4e45-ba37-c73b68e2dc20.jfif', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/a353d731-d482-4139-9fd6-bf50596ffaa7.jfif', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/a3636b82-e718-4866-bac1-d0db9371941c.jfif', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b05b0f22-a6da-4b8b-958e-3fcdff02bd9c%20(1).jfif', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/ba18398c-f74b-4d76-8e16-de51d9e76563.jfif', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/c7d303b6-3789-42c7-968a-9a89eebe54a6.jfif', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/ed98c9bc-19d0-4505-a8b7-e90a7623c60f%20(1).jfif', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/87a2a469-c997-4f62-8281-80057f2e3b3f%20(1).jfif', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/7f0390ac-e525-475e-915a-c66ca20b72d8%20(1).jfif', title: 'Inspiration 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/96262eed-7890-4e45-ba37-c73b68e2dc20.jfif', title: 'Inspiration 1' },
  ];

  const academicPhotos = [
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f4.jpeg', title: 'Academic 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f25.jpeg', title: 'Academic 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f24.jpg', title: 'Academic 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/f23.jpg', title: 'Academic 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/received_927148115762714.png', title: 'Academic 1' },
  ];

  const hobbyPhotos = [
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b1.jpg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b13.jpg', title: 'Hobby 1' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b15.jpeg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b17.jpeg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b18.jpg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b12.jpg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b2.jpg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b3.jpg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b4.jpeg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b4.jpg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b6.jpg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b7.jpg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/g2.jpg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/g6.jpeg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/g8.jpeg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b13.jpg', title: 'Hobby 2' },
    { url: 'https://raw.githubusercontent.com/efl-ward/mobprog_finals/refs/heads/main/oooohuulul/b10.jpeg', title: 'Hobby 2' },
  ];
  // ----------------------------------------------------------------

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

      {/* Skills */}
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

      {/* Four separate carousels */}
      <CarouselSection title="Friends" photos={friendsPhotos} icon="👥" />
      <CarouselSection title="Inspiration" photos={inspirationsPhotos} icon="💡" />
      <CarouselSection title="Academic" photos={academicPhotos} icon="📚" />
      <CarouselSection title="My Hobby" photos={hobbyPhotos} icon="🎮" />

      <button className="btn" onClick={onEdit}>✏️ EDIT PROFILE</button>
    </>
  );
}