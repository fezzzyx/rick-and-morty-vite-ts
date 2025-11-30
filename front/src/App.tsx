import {Route, type RouteObject, Routes} from "react-router"
import {RouterEnum} from "@/config/RouterEnum.ts";
import Providers from "@/providers/Providers.tsx";
import CharacterList from "@/screens/characters/CharacterList.tsx";
import MainPage from "@/screens/main/Main.tsx";
import Header from "./components/Header";
import CharacterDetail from "@/screens/characters/CharacterDetail.tsx";
import LocationList from "@/screens/locations/LocationList.tsx";
import LocationDetail from "@/screens/locations/LocationDetail.tsx";
import EpisodeList from "@/screens/episodes/EpisodeList.tsx";
import EpisodeDetail from "@/screens/episodes/EpisodeDetail.tsx";
import NotFound from "@/screens/not-found/NotFound.tsx";

export default function App() {
	const routes: Array<RouteObject> = [
        { path: RouterEnum.MAIN, element: <MainPage /> },
        { path: RouterEnum.CHARACTERS, element: <CharacterList /> },
        { path: RouterEnum.CHARACTER, element: <CharacterDetail /> },
        { path: RouterEnum.LOCATIONS, element: <LocationList /> },
        { path: RouterEnum.LOCATION, element: <LocationDetail /> },
        { path: RouterEnum.EPISODES, element: <EpisodeList /> },
        { path: RouterEnum.EPISODE, element: <EpisodeDetail /> },

        {path: "*", element: <NotFound/>},
    ]

    return (
        <Providers>
            <Header />
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element}/>

                ))}
            </Routes>
        </Providers>

	)
}