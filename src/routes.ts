import { Router } from "express";
import { ImpostoController } from "./controllers/ImpostoController";

const router = Router();

const impostoController = new ImpostoController();


router.post("/imposto/renda/fonte", impostoController.impostoNaFonte);

router.post("/imposto/renda/anual", impostoController.impostoAnual);
router.post("/imposto/iss/ti", impostoController.impostoIss);


export { router };
