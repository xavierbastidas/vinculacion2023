import { Router } from "express";
import {  getRole } from "../controllers/role.controller.js";

const router = Router();

router.get(
    '/info',
    getRole
  );



export default router;
