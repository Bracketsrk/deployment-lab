import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'


const IMAGES = [
    {
        id: "0",
        src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Blue_merle_koolie_short_coat_heading_sheep.jpg",
        name: "Blue merle herding sheep"
    },
    {
        id: "1",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Huskiesatrest.jpg/2560px-Huskiesatrest.jpg",
        name: "Huskies"
    },
    {
        id: "2",
        src: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Taka_Shiba.jpg",
        name: "Shiba"
    },
    {
        id: "3",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/2560px-Felis_catus-cat_on_snow.jpg",
        name: "Tabby cat"
    },
    {
        id: "4",
        src: "https://upload.wikimedia.org/wikipedia/commons/8/84/Male_and_female_chicken_sitting_together.jpg",
        name: "Chickens"
    }
];

/**
 * Fetches images on component mount.  Returns an object with two properties: isLoading and fetchedImages, which will be
 * an array of ImageData
 *
 * @param imageId {string} the image ID to fetch, or all of them if empty string
 * @param delay {number} the number of milliseconds fetching will take
 * @returns {{isLoading: boolean, fetchedImages: ImageData[]}} fetch state and data
 */
// export function useImageFetching(imageId, delay=1000) {
//     const [isLoading, setIsLoading] = useState(true);
//     const [fetchedImages, setFetchedImages] = useState([]);
//     useEffect(() => {
//         async () => {
//             const response = await fetch('/api/images');
//             print("HERE");
//             if (!response.ok) {
//               throw new Error('Network response was not ok');
//             }
//             console.log(response.json());
//             return response.json(); 
//           };
//         // setTimeout(async () => {
//         //     await fetch("/api/images").then(console.log(Response));
//         //     // console.log("hi2");
//         //     if (imageId === "") {
//         //         setFetchedImages(IMAGES);
//         //     } else {
//         //         setFetchedImages(IMAGES.filter((image) => image.id === imageId));
//         //     }
//         //     setIsLoading(false);
//         // }, delay);
//     }, [imageId]);

//     // console.log("Here");
//     // fetch("/api/images").then(console.log(Response));
//     // // setFetchedImages(Response)
//     // setIsLoading(false);

//     return { isLoading, fetchedImages };
// }

const fetchImages = async () => {
  const response = await fetch('/api/images');
  
  if (!response.ok) {
    throw new Error('Bad response');
  }
  
  return response.json(); 
};

// const fetchImage = async (imgId) => {
//   const response = await fetch(`/api/images${imgId}`);
  
//   if (!response.ok) {
//     throw new Error('Bad response');
//   }
  
//   return response.json(); 
// };

export function useImageFetching() {
  // if (someParam) {
  //   return useQuery({
  //     queryKey: ['image'],
  //     queryFn: fetchImage 
  //   })
  // }

  return useQuery({
    queryKey: ['images'], 
    queryFn: fetchImages,
  });
};


// export async function useImageFetching() {
//   const fetchImages = async () => {
//       const response = await fetch('/api/images');
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//       return response.json(); 
//   };

//   const { status, data, error } = useQuery({
//     queryKey: ['images'],
//     queryFn: fetchImages,
//   });

//   if (status === 'pending') {
//     return status;
//   }

//   if (status === 'error') {
//     return status;
//   }

//   console.log("data:");
//   console.log(data);

//   return data;
// }
