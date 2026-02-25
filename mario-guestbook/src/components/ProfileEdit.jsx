import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function ProfileEdit({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    location: '',
    occupation: '',
    specialty: '',
    website: '',
    coins_collected: 0,
    worlds_completed: 0,
    avatar_url: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const { data, error } = await supabase
      .from('mario_profile')
      .select('*')
      .limit(1)
      .single();

    if (!error && data) {
      setFormData(data);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result;
      if (formData.id) {
        // update
        const { data, error } = await supabase
          .from('mario_profile')
          .update(formData)
          .eq('id', formData.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        // insert
        const { data, error } = await supabase
          .from('mario_profile')
          .insert([formData])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      onSave(result);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="panel">
        <div className="panel-title">✏️ EDIT YOUR PROFILE</div>

        <label htmlFor="name">YOUR NAME:</label>
        <input id="name" type="text" placeholder="e.g. SUPER MARIO" value={formData.name} onChange={handleChange} required />

        <label htmlFor="title">YOUR TITLE:</label>
        <input id="title" type="text" placeholder="e.g. Legendary Hero" value={formData.title} onChange={handleChange} />

        <label htmlFor="avatar_url">PROFILE PICTURE URL:</label>
        <input id="avatar_url" type="url" placeholder="https://github.com/efl-ward/mobprog_finals/blob/main/kendrick_lmao-removebg-preview.png" value={formData.avatar_url || ''} onChange={handleChange} />

        <label htmlFor="bio">ABOUT YOU:</label>
        <textarea id="bio" rows="5" placeholder="Tell your story..." value={formData.bio} onChange={handleChange} required />

        <label htmlFor="location">LOCATION:</label>
        <input id="location" type="text" placeholder="e.g. TAGUIG CITY" value={formData.location} onChange={handleChange} />

        <label htmlFor="occupation">OCCUPATION:</label>
        <input id="occupation" type="text" placeholder="e.g. Student" value={formData.occupation} onChange={handleChange} />

        <label htmlFor="specialty">SPECIALTY:</label>
        <input id="specialty" type="text" placeholder="e.g. Platforming, Rescue Missions" value={formData.specialty} onChange={handleChange} />

        <label htmlFor="website">WEBSITE:</label>
        <input id="website" type="url" placeholder="https://your-website.com" value={formData.website} onChange={handleChange} />

        <label htmlFor="coins_collected">COINS COLLECTED:</label>
        <input id="coins_collected" type="number" placeholder="0625" min="0" value={formData.coins_collected} onChange={handleChange} />

        <label htmlFor="worlds_completed">WORLDS COMPLETED:</label>
        <input id="worlds_completed" type="number" placeholder="8" min="0" value={formData.worlds_completed} onChange={handleChange} />

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'SAVING...' : '💾 SAVE PROFILE'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}>
          ❌ CANCEL
        </button>
      </div>
    </form>
  );
}