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
    author: string | User | null; 
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

        const denormalizedImages = await Promise.all(
            images.map(async (image) => {
                if (typeof image.author === "string") {
                    try {
                        const user = await usersCollection.findOne({ _id: image.author });

                        if (user) {
                            image.author = user;
                        } else {
                            image.author = null;
                        }
                    } catch (error) {
                        console.error(`Error fetching user with ID ${image.author}:`, error);
                        image.author = null;
                    }
                } else if (image.author === null) {
                    image.author = null;
                }

                return image;
            })
        );

        return denormalizedImages;
    }
}
