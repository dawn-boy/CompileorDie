import {Outlet} from "react-router-dom";

const Profile = () => {
  return (
    <div>
      This is the Profile page.
      <Outlet />
    </div>
  );
};

export default Profile;
