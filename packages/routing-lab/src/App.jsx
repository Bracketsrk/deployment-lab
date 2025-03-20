import { Routes, Route } from "react-router";
import { useState } from "react";
import { Link } from "react-router";
import { useImageFetching } from "./images/useImageFetching.js";
import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { MainLayout } from "./MainLayout.jsx";
import { RegisterPage } from "./auth/RegisterPage.jsx";
import { LoginPage } from "./auth/LoginPage.jsx";
import { ProtectedRoute } from "./auth/ProtectedRoute.jsx";



function App() {
    const [username, setUsername] = useState("John Doe");
    const [authToken, setAuthToken] = useState("");

    function updateUsername(newName) {
        setUsername(newName);
    }

    function handleAuthToken(token) {
        console.log(token);
        setAuthToken(token);
    }

    // console.log("Here");
    // const { ogIsLoading, fetchedImages } = useImageFetching("");
    // const info = useQuery({ queryKey: ['images'], queryFn: fetchImages });
    // console.log("info:");
    // console.log(info);


    let imageElements = undefined;
    const { data, error, isLoading } = useImageFetching(authToken);

    if (isLoading) {
    return <div>Loading images...</div>;
    }

    if (error) {
    return <div>Error: {error.message}</div>;
    }
    // console.log(data);

    // let fetchedImages = "";
    // let imageElements = "";


    if (!data) {
        return;
        }
    if (authToken) {

        const imageElements = data.map((image) => (
            <div key={image._id} className="ImageGallery-photo-container">
                <Link to={"/images/" + image._id}>
                    <img src={image.src} alt={image.name}/>
                </Link>
            </div>
        ));
    }
    

    // console.log({username});
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Homepage userName={username} authToken={authToken} />}/>
                <Route path="/account" element={<AccountSettings updateUser={updateUsername} authToken={authToken} />} />
                <Route path="/images" element={<ImageGallery isLoading={isLoading} imageElements={imageElements} authToken={authToken} />} />
                <Route path="/images/:imgId" element={<ImageDetails authToken={authToken} />} />
                <Route path="/register" element={<RegisterPage handleAuthToken={handleAuthToken}/>} />
                <Route path="/login" element={<LoginPage handleAuthToken={handleAuthToken}/>} />
            </Route>
        </Routes>
    );
}

export default App;
