import { PrismaClient } from "@prisma/client";
import { getDTOUser } from "../DTO/userDTO";
import { getFilters, getPagKey } from "../filters/filters";
import { Request } from "express"; 

const prisma = new PrismaClient(); 

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