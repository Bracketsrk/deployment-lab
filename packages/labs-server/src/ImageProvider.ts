import { MongoClient, Collection, WithId } from "mongodb";

interface User {
    _id: string;
    username: string;
    email: string;
  }

interface ImageDocument {
    _id: string;
    src: string;
    name: string;
    user: string | User | null;
    likes: number;
}


export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllImages(): Promise<ImageDocument[]> { 
        const imageCollectionName = process.env.IMAGES_COLLECTION_NAME;
        const userCollectionName = process.env.USERS_COLLECTION_NAME;
        if (!imageCollectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        if (!userCollectionName) {
            throw new Error("Missing USERS_COLLECTION_NAME from environment variables");
        }

        const imagesCollection = this.mongoClient.db().collection<ImageDocument>(imageCollectionName); 
        const usersCollection = this.mongoClient.db().collection<User>(userCollectionName);

        
        const images = await imagesCollection.find().toArray();

        // Denormalize the user field for each image
        const denormalizedImages = await Promise.all(
            images.map(async (image) => {
                if (typeof image.user === "string") {
                    // Fetch the full user document by the user ID if user is a string
                    const user = await usersCollection.findOne({ _id: image.user });
        
                    if (user) {
                    // Replace the user ID with the full user object
                    image.user = user; 
                    } else {
                    // If no user is found, set user to null
                    image.user = null;
                    }
                }
    
                return image;
          })
        );

        return denormalizedImages;
        // return collection.find().toArray(); // Without any options, will by default get all documents in the collection as an array.
    }
}