import {Outlet} from "react-router-dom";

const GamePlay = () => {
  return (
    <div>
        This is the GamePlay page.
        <Outlet />
    </div>
  );
};

export default GamePlay;
