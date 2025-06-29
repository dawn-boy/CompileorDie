import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from './ui/AppLayout.jsx'
import HomePage from './features/home/HomePage.jsx'
import Login from './features/authentication/Login.jsx'
import SignUp from './features/authentication/SignUp.jsx'
import Profile from './features/profile/Profile.jsx'
import Customize from './features/profile/Customize.jsx'
import Team from './features/profile/Team.jsx'
import Abouts from './features/profile/Abouts.jsx'
import Countdown from './ui/Countdown.jsx'
import GamePlay from './features/game/GamePlay.jsx'
import End from './features/end/End.jsx'
import Loading from './ui/Loading.jsx'
import store from './redux/store.js'
import { Provider } from 'react-redux'
import ErrorPage from './ui/ErrorPage.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './ui/ProtectedRoute.jsx'

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
        path: '/signup',
        element: <SignUp />,
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
        element: <ProtectedRoute />,
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
                path: 'team',
                element: <Team />,
              },
              {
                path: 'abouts',
                element: <Abouts />,
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <Toaster
        position="top-center"
        gutter={15}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
        }}
      />
    </Provider>
  )
}

export default App
