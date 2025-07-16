import { Outlet } from 'react-router-dom'
import NavBar from '../features/home/NavBar.jsx'
function AppLayout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default AppLayout
