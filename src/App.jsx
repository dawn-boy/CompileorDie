import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from "./ui/AppLayout.jsx";
import HomePage from "./features/home/HomePage.jsx";
import Login from "./features/login/Login.jsx";
import SignUp from "./features/login/SignUp.jsx";
import Profile from "./features/profile/Profile.jsx";
import Customize from "./features/profile/Customize.jsx";
import Team from "./features/profile/Team.jsx";
import Abouts from "./features/profile/Abouts.jsx";
import CountDown from "./features/countdown/CountDown.jsx";
import GamePlay from "./features/game/GamePlay.jsx";
import Question from "./features/game/Question.jsx";
import Answer from "./features/game/Answer.jsx";
import CodeBox from "./features/game/CodeBox.jsx";
import PlayerChoice from "./features/game/PlayerChoice.jsx";
import End from "./features/end/End.jsx";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [

            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/profile',
                element: <Profile />,
                children: [
                    {
                        path: 'customize',
                        element: <Customize />
                    },
                    {
                        path: 'team',
                        element: <Team />
                    },
                    {
                        path: 'abouts',
                        element: <Abouts />
                    }
                ]
            },
            {
                path: '/countdown',
                element: <CountDown />
            },
            {
                path: '/gameplay',
                element: <GamePlay />,
                children: [
                    {
                        path: 'question',
                        element: <Question />
                    },
                    {
                        path: 'answer',
                        element: <Answer />,
                        children: [
                            {
                                path: 'codebox',
                                element: <CodeBox />
                            },
                            {
                                path: 'player-choice',
                                element: <PlayerChoice />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/end',
                element: <End />
            }
        ]
    }
])

function App() {
    return <RouterProvider router={router} />
}

export default App
