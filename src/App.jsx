import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './ui/AppLayout.jsx'
import HomePage from './features/home/HomePage.jsx'
import Login from './features/authentication/Login.jsx'
import Register from './features/authentication/Register.jsx'
import Profile from './features/profile/Profile.jsx'
import Customize from './features/profile/Customize.jsx'
import Team from './features/profile/Team.jsx'
import Abouts from './features/profile/Abouts.jsx'
import Countdown from './features/lobby/Countdown.jsx'
import GamePlay from './features/game/GamePlay.jsx'
import End from './features/end/End.jsx'
import Loading from './ui/Loading.jsx'
import store, { persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import ErrorPage from './ui/ErrorPage.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import AuthProtectedRoutes from './ui/route_protections/AuthProtectedRoutes.jsx'
import Lobby from './features/lobby/Lobby.jsx'
import LobbyProtectedRoutes from './ui/route_protections/LobbyProtectedRoutes.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import Waiting from './ui/Waiting.jsx'
import Sussy from './features/game/players/cyberguardian/Sussy.jsx'
import Elimination from './features/game/Elimination.jsx'
import FloatAround from './features/game/FloatAround.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60,
    },
  },
})

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/loading',
        element: <Loading />,
      },
      {
        path: '/error',
        element: <ErrorPage />,
      },
      {
        element: <AuthProtectedRoutes />,
        children: [
          {
            path: 'profile',
            element: <Profile />,
            children: [
              {
                path: 'customize',
                element: <Customize />,
              },
              {
                path: 'teams',
                element: <Team />,
              },
              {
                path: 'abouts',
                element: <Abouts />,
              },
              {
                element: <LobbyProtectedRoutes />,
                children: [
                  {
                    path: 'lobby',
                    element: <Lobby />,
                  },
                ],
              },
            ],
          },
          {
            path: 'countdown',
            element: <Countdown />,
          },
          {
            path: 'gameplay',
            element: <GamePlay />,
          },
          {
            path: 'elimination',
            element: <Elimination />,
          },
          {
            path: 'waiting',
            element: <Waiting />,
          },
          { path: 'sussy', element: <Sussy /> },
          {
            path: 'floatAround',
            element: <FloatAround />,
          },
          {
            path: 'end',
            element: <End />,
          },
        ],
      },
    ],
  },
])

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster
            position="top-center"
            gutter={15}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
            }}
          />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
