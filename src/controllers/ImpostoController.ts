import { Request, Response } from "express";
import { ImpostoService } from "../services/ImpostoNaFonteService";
import { ImpostoAnualService } from "../services/ImpostoAnualService";
import { ImpostoIssService } from "../services/ImpostoIssService";


class ImpostoController {
  async impostoNaFonte(request: Request, response: Response) {
    const { salarioBruto, qtdDependentes, valorPensaoAlimenticia } = request.body;

    const impostoService = new ImpostoService();

    const responseImposto = await impostoService.impostoNafonte({
      salarioBruto,
      qtdDependentes,
      valorPensaoAlimenticia
    });

    return response.json(responseImposto);
  }

  async impostoAnual(request: Request, response: Response) {
    const { salarioBrutoAnual, valorRetido, valorInss, qtdDependentes } = request.body;

    const impostoService = new ImpostoAnualService();

    const responseImposto = await impostoService.impostoAnual({
      salarioBrutoAnual,
      valorRetido,
      valorInss,
      qtdDependentes
    });

    return response.json(responseImposto);
  }

  async impostoIss(request: Request, response: Response) {
    const { valorTotal } = request.body;

    const impostoService = new ImpostoIssService();

    const responseImposto = await impostoService.impostoISS({
      valorTotal
    });

    return response.json({valorISS: responseImposto, percentualISS: "5%"});
  }
}

export { ImpostoController };