import { Usuario } from "@prisma/client";

export type DTOUser = {
    cedula: string,
    nombre: string,
    apellidos: string,
    email: string,
    estado: boolean,
    // password: string,
    // idInstitucion: number,
    // idRol: number,
}

export const getDTOUser = (val: any) => {
    return <DTOUser>{
        id: val.id,
        cedula: val.cedula,
        nombre: val.nombre,
        apellidos: val.apellidos,
        email: val.email,
        estado: val.estado,
        // password: val.password,
        // idInstitucion: val.id_institucion,
        // idRol: val.idRol,
    };
};