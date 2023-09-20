import { Request, Response } from "express";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';


export const generateJWT = (id: number, nombre?: string, cedula?: string) => {
    return new Promise((resolve, reject) => {

        const payload = { id, nombre, cedula };

        jwt.sign(payload, process.env.SECRET_JWT_SEED ?? "", {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject({
                    status: "error",
                    message: "No se pudo generar el token"
                })
            };
            resolve(token);
        })
    })
} 