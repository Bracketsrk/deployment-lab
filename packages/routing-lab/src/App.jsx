import { Routes, Route } from "react-router";
import { useState } from "react";
import { Link } from "react-router";
import { useImageFetching } from "./images/useImageFetching.js";
import { Homepage } from "./Homepage";
import { AccountSettings } from "./AccountSettings";
import { ImageGallery } from "./images/ImageGallery.jsx";
import { ImageDetails } from "./images/ImageDetails.jsx";
import { MainLayout } from "./MainLayout.jsx";
import { useQuery } from '@tanstack/react-query';



function App() {
    const [username, setUsername] = useState("John Doe");

    function updateUsername(newName) {
        setUsername(newName);
    }

    // console.log("Here");
    // const { ogIsLoading, fetchedImages } = useImageFetching("");
    // const info = useQuery({ queryKey: ['images'], queryFn: fetchImages });
    // console.log("info:");
    // console.log(info);
    const { data, error, isLoading } = useImageFetching();

    if (isLoading) {
      return <div>Loading images...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }
    // console.log(data);
  
    // let fetchedImages = "";
    // let imageElements = "";


    const imageElements = data.map((image) => (
        <div key={image._id} className="ImageGallery-photo-container">
            <Link to={"/images/" + image._id}>
                <img src={image.src} alt={image.name}/>
            </Link>
        </div>
    ));

    // console.log({username});
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Homepage userName={username} />}/>
                <Route path="/account" element={<AccountSettings updateUser={updateUsername} />} />
                <Route path="/images" element={<ImageGallery isLoading={isLoading} imageElements={imageElements} />} />
                <Route path="/images/:imgId" element={<ImageDetails />} />
            </Route>
        </Routes>
    );
}

export default App;
