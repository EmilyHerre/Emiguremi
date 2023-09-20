import { PrismaClient } from "@prisma/client";
import { getDTOUser } from "../DTO/userDTO";
import { getFilters, getPagKey } from "../filters/filters";
import { Request } from "express";
import { searchUser } from ".";

const prisma = new PrismaClient();

export const getPaginationUser = async (req: Request) => {

    const idI = req.header("idInstitucion");

    const { order, take, cursor: key } = getFilters(req);

    const { estado } = req.query;
    
    var filterEstado = estado == undefined ? estado : Number(estado) == 1 ? true : false;

    const where = {
        estado: filterEstado,
        id_institucion: Number(idI),
        ...searchUser(req)
    };

    const lastKey = await getLastKeyUser(where);

    return await prisma.usuario.findMany({
        include: {
            Institucion: true,
            rol: true,
        },
        skip: estado != undefined ? 0 : 1,
        cursor: { id: key },
        orderBy: { id: order },
        take: take,
        where: {
            ...where,
        },
    }).then((data) => {
        return {
            status: "ok",
            data: data.map((val) => {
                return {
                    ...getDTOUser(val),
                    institucion: val.Institucion,
                    rol: val.rol,
                };
            }),
            meta: {
                ...getPagKey(data, order, key, lastKey),
            }
        }
    }).catch((_) => {
        return {
            status: "error",
            error: "Ocurrio un error inesperado",
        }
    });
}

export const getLastKeyUser = async (where: object | {}): Promise<number> => {
    const lastKey = await prisma.usuario.aggregate({
        where: {
            ...where
        },
        _max: {
            id: true,
        },
    }).then((data) => data._max.id);
    return Number(lastKey);
}