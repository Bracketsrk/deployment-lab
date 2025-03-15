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
    author: string; 
    likes: number;
}

interface DenormalizedImageDocument {
    _id: string;
    src: string;
    name: string;
    author: User; 
    likes: number;
}

export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllImages(author?: string): Promise<DenormalizedImageDocument[]> { 
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
                const user = await usersCollection.findOne({ _id: image.author });
                const copy = {
                    ...image,
                    author: user
                }

                return copy as DenormalizedImageDocument;
            })
        );

        if (typeof author === "string") {
            // console.log(denormalizedImages[0].author._id === author);
            return denormalizedImages.filter((document) => document.author._id === author);
        }
        else {
            return denormalizedImages;
        }
    }

    async updateImageName(imageId: string, newName: string): Promise<number> {
        const imageCollectionName = process.env.IMAGES_COLLECTION_NAME;
        if (!imageCollectionName) {
            throw new Error("Missing IMAGES_COLLECTION_NAME from environment variables");
        }
        const imagesCollection = this.mongoClient.db().collection<ImageDocument>(imageCollectionName); 

        // if (typeof dbName === "string" && typeof colName === "string") {
        const result = await imagesCollection.updateOne({_id: imageId},{$set:{name: newName}});
        // }
        
        return result.matchedCount;
    }
}
