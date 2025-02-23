import { Routes, Route } from "react-router";
import { useState } from "react";
import { Link } from "react-router";
import { useImageFetching } from "./images/useImageFetching.js";
import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { MainLayout } from "./MainLayout.jsx";

function App() {
    const [username, setUsername] = useState("John Doe");

    function updateUsername(newName) {
        setUsername(newName);
    }

    const { ogIsLoading, fetchedImages } = useImageFetching("");

    const ogImageElements = fetchedImages.map((image) => (
        <div key={image.id} className="ImageGallery-photo-container">
            <Link to={"/images/" + image.id}>
                <img src={image.src} alt={image.name}/>
            </Link>
        </div>
    ));

    console.log({username});
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Homepage userName={username} />}/>
                <Route path="/account" element={<AccountSettings updateUser={updateUsername} />} />
                <Route path="/images" element={<ImageGallery isLoading={ogIsLoading} imageElements={ogImageElements} />} />
                <Route path="/images/:imgId" element={<ImageDetails />} />
            </Route>
        </Routes>
    );
}

export default App
