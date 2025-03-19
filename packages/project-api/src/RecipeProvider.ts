import { MongoClient, Collection, WithId } from "mongodb";

interface User {
    _id: string;
    username: string;
    email: string;
}

interface RecipeDocument {
    _id: string;
    src: string;
    name: string;
    author: string; 
}

interface DenormalizedRecipeDocument {
    _id: string;
    src: string;
    name: string;
    author: User; 
}

export class RecipeProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllRecipes(author?: string): Promise<DenormalizedRecipeDocument[]> { 
        const recipeCollectionName = process.env.RECIPES_COLLECTION_NAME;
        const userCollectionName = process.env.USERS_COLLECTION_NAME;
        
        if (!recipeCollectionName) {
            throw new Error("Missing RECIPES_COLLECTION_NAME from environment variables");
        }
        if (!userCollectionName) {
            throw new Error("Missing USERS_COLLECTION_NAME from environment variables");
        }

        const recipesCollection = this.mongoClient.db().collection<RecipeDocument>(recipeCollectionName); 
        const usersCollection = this.mongoClient.db().collection<User>(userCollectionName);

        const recipes = await recipesCollection.find().toArray();

        const denormalizedRecipes = await Promise.all(
            recipes.map(async (recipe) => {
                const user = await usersCollection.findOne({ _id: recipe.author });
                const copy = {
                    ...recipe,
                    author: user
                }

                return copy as DenormalizedRecipeDocument;
            })
        );

        if (typeof author === "string") {
            return denormalizedRecipes.filter((document) => document.author._id === author);
        }
        else {
            return denormalizedRecipes;
        }
    }

    async updateRecipeName(recipeId: string, newName: string): Promise<number> {
        const recipeCollectionName = process.env.RECIPES_COLLECTION_NAME;
        if (!recipeCollectionName) {
            throw new Error("Missing RECIPES_COLLECTION_NAME from environment variables");
        }
        const recipesCollection = this.mongoClient.db().collection<RecipeDocument>(recipeCollectionName); 

        // if (typeof dbName === "string" && typeof colName === "string") {
        const result = await recipesCollection.updateOne({_id: recipeId},{$set:{name: newName}});
        // }
        
        return result.matchedCount;
    }
}
