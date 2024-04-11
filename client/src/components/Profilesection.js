// ProfileSection.js
import React from 'react';
import './ProfileSection.css';

const ProfileSection = ({ profile, goals }) => {
 return (
    <div className="profile-section">
      <div className="profile-logo">
        {/* Assuming you have a logo image, replace 'logo.png' with your actual logo path */}
        <img src="profile.jpg" alt="Profile Logo" />
      </div>
      <div className="profile-info">
        <h2>{profile.name}</h2>
        <p>Manager: {profile.managerName}</p>
        <p>Role: {profile.role}</p>
      </div>
     
    </div>
 );
};

export default ProfileSection;
