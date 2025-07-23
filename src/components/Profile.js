import React,{useContext} from "react";
import { UserContext } from "./context/user-context";
//want the profile page to be a tiles of user details my orders my address change password delete account


const Profile = () => {
    const {currentUser} = useContext(UserContext);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;