import { CredentialsProvider } from "../CredentialsProvider";
import express, { Request, Response, NextFunction } from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();
const signatureKey = process.env.JWT_SECRET;

if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
}

function generateAuthToken(username: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { username: username },
            signatureKey as string,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

export function verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction // Call next() to run the next middleware or request handler
) {
    const authHeader = req.get("Authorization");
    // The header should say "Bearer <token string>".  Discard the Bearer part.
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).end();
    } else { // signatureKey already declared as a module-level variable
        jwt.verify(token, signatureKey as string, (error, decoded) => {
            if (decoded) {
                next();
            } else {
                res.status(403).end();
            }
        });
    }
}


export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {

    app.post("/auth/register", async (req: Request, res: Response) => {
        const user = req.body.username;
        const pass = req.body.password;

        if (!user) {
            res.status(400).send({
                error: "Missing field",
                message: "Missing username or password"
            });
            return;
        }
        if (!pass) {
            res.status(400).send({
                error: "Missing field",
                message: "Missing username or password"
            });
            return;
        }
        // console.log(`${user}, ${pass}`);
        const credentialsProvider = new CredentialsProvider(mongoClient);
        const status: boolean = await credentialsProvider.registerUser(user, pass);
        if (status === false) {
            res.status(400).send({
                error: "User taken",
                message: "Username already taken"
            });
            return;
        }

        const jwt = await generateAuthToken(user);     
        res.status(201).send(jwt);
        
    });


    app.post("/auth/login", async (req: Request, res: Response) => {
        const user = req.body.username;
        const pass = req.body.password;

        if (!user) {
            res.status(400).send({
                error: "Missing field",
                message: "Missing username or password"
            });
            return;
        }
        if (!pass) {
            res.status(400).send({
                error: "Missing field",
                message: "Missing username or password"
            });
            return;
        }

        const credentialsProvider = new CredentialsProvider(mongoClient);
        const status: boolean = await credentialsProvider.verifyPassword(user, pass);

        if (status) {
            const jwt = await generateAuthToken(user);
            res.status(200).send(jwt);
            console.log("sent jwt");
            return;
        }
        else {
            res.status(401).send({
                error: "Forbidden",
                message: "Bad username or password"
            });
            return;
        }
        // res.send(status);
    
    });
    
}