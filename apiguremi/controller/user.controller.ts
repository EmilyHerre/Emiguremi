import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { getDTOUser } from "../DTO/userDTO";
import { getFilters, getPagKey } from "../filters/filters";
import bcrypt from "bcryptjs";
import { getLastKeyUser, getPaginationUser, searchUser } from "../helpers";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {

  const { order, take, cursor } = getFilters(req);
  const idI = req.header("idInstitucion");

  if (cursor != 0) {
    return res.status(200).json(await getPaginationUser(req));
  }


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
      rol: true
    },
    orderBy: { id: order },
    take: take,
    where: {
      ...where
    },
  }).then((data) => {
    return res.status(200).json({
      status: "ok",
      data: data.map((val) => {
        return {
          ...getDTOUser(val),
          institucion: val.Institucion,
          rol: val.rol,
        };
      }),
      meta: {
        ...getPagKey(data, order, Number(cursor), lastKey),
      }
    });
  }).catch((_) => {
    return res.status(500).json({
      status: "error",
      error: "Ocurrio un error inesperado",
    });
  });

};

export const createUser = async (req: Request, res: Response) => {
  const { cedula, nombre, apellidos, email, password, estado, idInstitucion, idRol } = req.body;

  try {
    return await prisma.usuario.create({
      data: {
        cedula: cedula,
        nombre: nombre,
        apellidos: apellidos,
        email: email,
        estado: estado == 1 ? true : false,
        password: bcrypt.hashSync(password, 8),
        id_institucion: idInstitucion,
        idRol: idRol,
      },
    }).then((data) => {
      return res.status(201).json({
        status: "ok",
        data: getDTOUser(data),
      })
    });

  } catch (error) { 
    return res.status(500).json({
      status: "error",
      error: "Ocurrio un error inesperado",
    });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { cedula, nombre, apellidos, email, password, estado, idInstitucion, idRol } = req.body;

  try {

    if (password) {
      await prisma.usuario.update({
        where: { id: Number(id) },
        data: { password: bcrypt.hashSync(password, 8) }
      });
    }

    return await prisma.usuario.update({
      where: {
        id: Number(id),
      },
      data: {
        cedula: cedula,
        nombre: nombre,
        apellidos: apellidos,
        estado: estado == 1 ? true : false,
        email: email,
        id_institucion: idInstitucion,
        idRol: idRol,
      },
    }).then((_) => {
      return res.status(200).json({
        status: "ok"
      })
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      error: "Ocurrio un error inesperado",
    });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  return prisma.usuario.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      estado: false,
    },
  }).then((_) => {
    return res.status(200).json({
      status: "ok"
    });
  }).catch((_) => {
    return res.status(500).json({
      status: "error",
      error: "Ocurrio un error inesperado",
    });
  });
}

export const getUserById = async (req: Request, res: Response) => {

  return await prisma.usuario.findUnique({
    where: {
      id: Number(req.params.id),
    },
    include: {
      Institucion: true,
      rol: true
    },
  }).then((data) => {

    if (data !== null) {
      return res.status(200).json({
        status: "ok",
        data: {
          ...getDTOUser(data),
          institucion: data.Institucion,
          rol: data.rol,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        error: "El usuario no existe",
      });
    }

  }).catch((_) => {
    return res.status(500).json({
      status: "error",
      error: "Ocurrio un error inesperado",
    });
  });
}