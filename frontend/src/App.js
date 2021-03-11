import { useEffect, useState } from "react";
import LoadingScreen from "./views/loading/LoadingScreen";
import { useDispatch } from "react-redux";
import { loadBooks } from "./actions/BookActions";
import { loadCharacters } from "./actions/CharacterActions";
import { loadLocations } from "./actions/LocationActions";
import Main from "./views/main/Main";
import { Box } from "@chakra-ui/react";

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

    return <Box w="100%">{isLoading ? <LoadingScreen /> : <Main />}</Box>;
}

export default App;
