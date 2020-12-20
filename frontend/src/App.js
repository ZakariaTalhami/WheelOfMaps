import { useEffect, useState } from "react";
import LoadingScreen from "./views/loading/LoadingScreen";
import { useDispatch } from "react-redux";
import { loadBooks } from "./actions/BookActions";
import { loadCharacters } from "./actions/CharacterActions";
import { loadLocations } from "./actions/LocationActions";
import Main from "./views/main/Main";

function App() {
    const [isLoading, setIsloading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        // Wait for all entities to be loaded
        Promise.all([
            dispatch(loadBooks()),
            dispatch(loadCharacters()),
            dispatch(loadLocations()),
        ]).then(() => setIsloading(false));
    }, []);

    return (
        <div className="App">
            {isLoading && <LoadingScreen />}
            {!isLoading && <Main />}
        </div>
    );
}

export default App;
