import {Router, Request, Response} from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);

router.get("/inicio",ensureAuthenticated, (request: Request, response :Response)=>{
  return response.send("Bem vindo ao DashBoard da Ctrl Finances!")
});

export {router};
