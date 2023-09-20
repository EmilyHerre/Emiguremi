import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { check, header, validationResult } from 'express-validator';

const prisma = new PrismaClient();


export const validateReqBodyUser = [
    check("cedula", "El numero cedula es obligatorio, y debe ser numerico").notEmpty().custom((value) => {
        return Number.isInteger(Number(value));
    }),
    check("nombre", "El nombre es obligatorio.").notEmpty(),
    check("apellidos", "Los apellidos es obligatorio.").notEmpty(),
    check("email", "El email es obligatorio").notEmpty(),
    check("email", "Debe especificar un formato de email valido. Ejm. 'example@example.com'").isEmail(),
    check("password", "La contraseña es obligatoria.").notEmpty(),
    check("estado", "El estado es obligatorio.").isBoolean(),
    check("idRol", "El rol es obligatorio").isInt(),
    (req: Request, res: Response, next: Function) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "error",
                errors: errors.array(),
            });
        }
        next();
    },
];

export const validateReqUpdateBodyUser = [
    check("cedula", "El numero cedula es obligatorio, y debe ser numerico").optional().isNumeric(),
    check("nombre", "El nombre es obligatorio.").optional().notEmpty(),
    check("apellidos", "Los apellidos es obligatorio.").optional().notEmpty(),
    check("email", "El email es obligatorio").optional().notEmpty(),
    check("email", "Debe especificar un formato de email valido. Ejm. 'example@example.com'").optional().isEmail(),
    check("estado", "El estado es obligatorio.").optional().isBoolean(),
    check("idRol", "El rol es obligatorio").optional().isInt(),
    (req: Request, res: Response, next: Function) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "error",
                errors: errors.array(),
            });
        }
        next();
    },
];


// export const validateUniqueCedula = async (req: Request, res: Response, next: Function) => {

//     const { id } = req.params;
//     const { cedula } = req.body;

//     const where = id ? {
//         cedula: cedula,
//         AND: {
//             NOT: {
//                 id: Number(id)
//             }
//         },

//     } : { cedula: cedula };

//     const user = await prisma.usuario.findUnique({
//         where: {
//             ...where
//         }
//     });

//     if (user) {
//         return res.status(400).json({
//             status: "error",
//             message: "La cedula digitada ya existe",
//         });
//     }

//     next();
// }

// export const validateUniqueEmail = async (req: Request, res: Response, next: Function) => {

//     const { id } = req.params;
//     const { email } = req.body;

//     const where = id ? {
//         email: email,
//         AND: {
//             NOT: {
//                 id: Number(id)
//             }
//         },

//     } : { email: email };

//     const user = await prisma.usuario.findUnique({
//         where: {
//             ...where
//         }
//     });

//     if (user) {
//         return res.status(400).json({
//             status: "error",
//             message: "El email digitado ya existe",
//         });
//     }
//     next();
// }



// export const getUserById = async (req: Request, res: Response, next: Function) => {

//     const { id } = req.params;
//     const { idUsuario } = req.body;

//     var idU = idUsuario ? idUsuario : id;

//     const user = await prisma.usuario.findUnique({
//         where: {
//             id: Number(idU),
//         }
//     });

//     if (!user) {
//         return res.status(404).json({
//             status: "error",
//             message: "El usuario no existe",
//         });
//     }

//     next();
// }

// export const getStudentRelation = async (req: Request, res: Response, next: Function) => {

//     const { id } = req.params;
//     const { idEstudiante } = req.body;

//     var idE = idEstudiante ? idEstudiante : id;

//     const user = await prisma.usuario.findUnique({
//         where: {
//             id: Number(idE),
//         },
//         include: {
//             Estudiante: true,
//         }
//     });

//     if (user?.Estudiante.length !== 0) {
//         return res.status(404).json({
//             status: "error",
//             message: "El usuario esta relacionado con un Estudiante",
//         });
//     }

//     next();
// }

// export const getTeacherRelation = async (req: Request, res: Response, next: Function) => {

//     const { id } = req.params;
//     const { idProfesor } = req.body;

//     var idR = idProfesor ? idProfesor : id;

//     const user = await prisma.usuario.findUnique({
//         where: {
//             id: Number(idR),
//         },
//         include: {
//             Profesor: true,
//         }
//     });

//     if (user?.Profesor.length !== 0) {
//         return res.status(404).json({
//             status: "error",
//             message: "El usuario esta relacionado con un Profesor",
//         });
//     }

//     next();
// }

// //TODO: Cambiar nombre -> manager (?) 
// export const getSupervisorRelation = async (req: Request, res: Response, next: Function) => {

//     const { id } = req.params;
//     const { idProfesor } = req.body;

//     var idE = idProfesor ? idProfesor : id;

//     const user = await prisma.usuario.findUnique({
//         where: {
//             id: Number(idE),
//         },
//         include: {
//             Encargado: true,
//         }
//     });

//     if (user?.Encargado.length !== 0) {
//         return res.status(404).json({
//             status: "error",
//             message: "El usuario esta relacionado con un Encargado",
//         });
//     }

//     next();
// }