import { Router } from "express";
import { check } from 'express-validator';
import { getUsers, createUser, deleteUser, updateUser, getUserById } from "../controller/user.controller";
import {
    isInstitucionExist,
    validateUniqueCedula, validateUniqueEmail,
    getRolById,
    FieldsMsg,
    getStudentRelation,
    getTeacherRelation,
    getSupervisorRelation,
    validateJWT,
    checkInstitutionHeader,
    validateReqBodyUser,
} from "../middleware";

const router = Router();
  
router.use(validateJWT) 

router.post("/usuario", [
    ...checkInstitutionHeader,
    ...validateReqBodyUser,
    FieldsMsg,

    getRolById,
    isInstitucionExist,

    validateUniqueCedula,
    validateUniqueEmail,

], createUser);

router.put("/usuario/:id", [

    ...checkInstitutionHeader,
    ...validateReqBodyUser,
    FieldsMsg,

    getRolById,
    isInstitucionExist,

    getUserById,
    validateUniqueCedula,
    validateUniqueEmail,

], updateUser);

router.get("/usuario", [...checkInstitutionHeader, FieldsMsg], getUsers);

router.get("/usuario/:id", [...checkInstitutionHeader, FieldsMsg], getUserById);

router.delete("/usuario/:id", [

    ...checkInstitutionHeader, 
    FieldsMsg, 
    
    getUserById,
    // isStudentRelation,
    // isTeacherRelation,
    // isEncargadoRelation,

], deleteUser);

export const userRouter = router;
