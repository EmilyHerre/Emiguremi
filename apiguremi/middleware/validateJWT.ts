import { Request, Response } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';


export interface CustomRequest extends Request {
    token: string | JwtPayload;
    id: number;
    nombre?: string;
    cedula?: string;
}

export interface TokenData {
    id: number;
    nombre?: string;
    cedula?: string;
}

export const validateJWT = (req: Request, res: Response, next: Function) => {

    try {
        // const token = req.header('Authorization')?.replace('Bearer ', '');
        const token = req.header('x-token');

        if (!token) {
            return res.status(401).json({
                status: "error",
                message: "Token no encontrado"
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_JWT_SEED ?? "");

        const data: TokenData = decoded as TokenData;

        (req as CustomRequest).id = data.id;
        (req as CustomRequest).nombre = data.nombre;
        (req as CustomRequest).cedula = data.cedula;


        next();
    } catch (err) {
        return res.status(401).json({
            status: "error",
            message: "Token invalido" 
        });
    }
}
