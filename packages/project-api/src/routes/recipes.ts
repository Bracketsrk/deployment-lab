import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { RecipeProvider } from "../RecipeProvider";

export function registerRecipeRoutes(app: express.Application, mongoClient: MongoClient) {

    app.get("/api/recipes", async (req: Request, res: Response) => {
        console.log("Received request at /api/recipes");

        let userId: string | undefined = undefined;
        
        const recipesProvider = new RecipeProvider(mongoClient);
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
            console.log(userId);
            const recipes = await recipesProvider.getAllRecipes(userId);
            res.send(recipes);
        }
        else {
            const recipes = await recipesProvider.getAllRecipes();
            res.send(recipes);
        }
    });


    app.patch('/api/recipes/:id', async (req: Request, res: Response) => {
        // console.log("OK");
        const recipeId = req.params.id;
        const newName = req.body.name;

        if (!newName) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing name property"
            });
            return;
        }
        console.log(recipeId);
        console.log(newName);

        const recipeProvider = new RecipeProvider(mongoClient);
        const result = await recipeProvider.updateRecipeName(recipeId, newName);

        if (result === 0) {
            res.status(404).send({
                error: "Not found",
                message: "Image does not exist"
            });
            return;
        }
        else {
            res.status(204).send();
            return;
        }
      });
  
    
}