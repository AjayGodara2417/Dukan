import React from 'react'

interface Profile {
  profileName: string;
}
const ProfileIcon: React.FC<Profile> = (props) => {
  const {profileName} = props;
  return (
    <button>{profileName}</button>
  )
}

export default ProfileIcon