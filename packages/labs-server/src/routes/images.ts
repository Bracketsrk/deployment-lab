import express, { Request, Response } from "express";
import { MongoClient } from "mongodb";
import { ImageProvider } from "../ImageProvider";

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {

    app.get("/api/images", async (req: Request, res: Response) => {
        console.log("Received request at /api/images");

        let userId: string | undefined = undefined;
        
        const imageProvider = new ImageProvider(mongoClient);
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
            console.log(userId);
            const images = await imageProvider.getAllImages(userId);
            res.send(images);
        }
        else {
            const images = await imageProvider.getAllImages();
            res.send(images);
        }
    });


    app.patch('/api/images/:id', async (req: Request, res: Response) => {
        // console.log("OK");
        const imageId = req.params.id;
        const newName = req.body.name;

        if (!newName) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing name property"
            });
            return;
        }
        console.log(imageId);
        console.log(newName);

        const imageProvider = new ImageProvider(mongoClient);
        const result = await imageProvider.updateImageName(imageId, newName);

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
        

        // const itemId = parseInt(req.params.id);
        // const updatedItem = req.body;
  
        // data.items = data.items.map((item) =>
        //   item.id === itemId ? { ...item, ...updatedItem } : item
        // );
  
        // res.json({ message: 'Item updated successfully', item: data.items.find(item => item.id === itemId) });
      });
  
    
}