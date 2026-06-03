import { Suspense, useEffect, useState } from "react"
import {
    BrowserRouter as Router,
    useRoutes,
    useLocation,
    Navigate,
} from "react-router-dom"
import routes from "~react-pages"
import { client } from "@/lib/client"
import Cookies from "js-cookie"
import Main from "./layout/Main"
import LoginComponent from "./layout/Auth"
import { LoadingScreen } from "./components/LoadingScreen"

function AppRoutes() {
    const location = useLocation()
    const element = useRoutes(routes)

    if (location.pathname === "/") {
        return <Navigate to="/dashboard" replace />
    }

    return element
}

function RootLayout() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                await client.query({ settings: { authMode: true } })
                setIsLoggedIn(true)
            } catch (e) {
                try {
                    const refreshToken = Cookies.get("suwayomi_refresh_token")
                    if (refreshToken) {
                        const request = await client.mutation({
                            refreshToken: {
                                __args: { input: { refreshToken } },
                                clientMutationId: true,
                                accessToken: true,
                            },
                        })
                        const newAccessToken = request.refreshToken.accessToken
                        Cookies.set("suwayomi_access_token", newAccessToken, {
                            expires: 7,
                        })
                        await client.query({ settings: { authMode: true } })
                        setIsLoggedIn(true)
                    } else {
                        setIsLoggedIn(false)
                    }
                } catch (refreshError) {
                    setIsLoggedIn(false)
                }
            }
        }

        checkAuth()
    }, [])

    if (isLoggedIn === null) {
        return (
            <LoadingScreen
                message="Checking Authentication..."
                subtext="Verifying your session with the Suwayomi server"
            />
        )
    }

    if (!isLoggedIn) {
        return <LoginComponent />
    }

    return (
        <Main>
            <Suspense
                fallback={
                    <LoadingScreen
                        message="Loading Component..."
                        subtext="Mounting the requested page module"
                        isOverlay={false}
                    />
                }
            >
                <AppRoutes />
            </Suspense>
        </Main>
    )
}

export default function App() {
    return (
        <Router>
            <RootLayout />
        </Router>
    )
}
