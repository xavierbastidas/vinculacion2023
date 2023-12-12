import { Router } from "express";
import { register,login , registerAdmin, registerPollster, getIdRole, checkEmailBD} from "../controllers/auth.controller.js";
import { bodyLoginValidator, bodyRegisterValidator, bodyRegisterValidatorAP} from "../middlewares/validationManager.js";
import { requireToken } from "../middlewares/requireToken.js";


const router = Router();

router.post(
    "/register",
    bodyRegisterValidator,
    requireToken,
    register
  );
router.post("/login",
bodyLoginValidator,
login);

router.post("/admin",bodyRegisterValidatorAP,registerAdmin);

router.post("/pollster",bodyRegisterValidatorAP,registerPollster);

router.get("/:id_usuario", getIdRole);
router.post("/checkEmailBD",checkEmailBD)

    
export default router;


