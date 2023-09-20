import { Router } from "express";
import { check } from 'express-validator';
import { getUsers, createUser, deleteUser, updateUser, getUserById } from "../controller/user.controller";
import {
    // isInstitucionExist,
    // validateUniqueCedula, validateUniqueEmail,
    // getRolById,
    // FieldsMsg,
    // getStudentRelation,
    // getTeacherRelation,
    // getSupervisorRelation,
    validateJWT,
    // checkInstitutionHeader,
    validateReqBodyUser,
} from "../middleware";

const router = Router();

router.use(validateJWT)

router.post("/usuario", [
    ...validateReqBodyUser,
    // FieldsMsg,

    // getRolById,
    // isInstitucionExist,

    // validateUniqueCedula,
    // validateUniqueEmail,

], createUser);

router.put("/usuario/:id", [

    ...validateReqBodyUser,
    // FieldsMsg,

    // getRolById,
    // isInstitucionExist,

    // getUserById,
    // validateUniqueCedula,
    // validateUniqueEmail,

], updateUser);

router.get("/usuario", getUsers);

router.get("/usuario/:id", getUserById);

router.delete("/usuario/:id", [

    // ...checkInstitutionHeader,
    // FieldsMsg,

    getUserById,
    // isStudentRelation,
    // isTeacherRelation,
    // isEncargadoRelation,

], deleteUser);

export const userRouter = router;
