import React from 'react';

const Profile = ({ onSignOut }) => {
  const user = JSON.parse(localStorage.getItem('coffeno_user'));

  if (!user) return null; // No profile if not logged in

  return (
    <div className="profile-section">
      <span>Welcome, {user.first_name} {user.last_name}</span>
      <button onClick={onSignOut}>Sign Out</button>
    </div>
  );
};

export default Profile;
