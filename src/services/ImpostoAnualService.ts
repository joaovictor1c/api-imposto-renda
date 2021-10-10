import { FaixaIRAnual, PercentualIRAnual, ValorDependente } from "../enums/ImpostoAnualEnum";

interface ImpostoRendaAnual {
  salarioBrutoAnual: number;
  valorRetido: number;
  valorInss: number;
  qtdDependentes: number;
}

class ImpostoAnualService {
 
  async impostoAnual ({ salarioBrutoAnual, valorRetido, valorInss, qtdDependentes }: ImpostoRendaAnual) {
    
    this.pessoaIsenta(salarioBrutoAnual);

    this.validarDadosImposto(salarioBrutoAnual, valorRetido, valorInss, qtdDependentes);

    const valorDeducaoDependentesInss = this.deducaoDependentes(salarioBrutoAnual, qtdDependentes);

    const valorParaCalcular = valorDeducaoDependentesInss - valorRetido - valorInss;
    if(valorParaCalcular < 0 ){
      throw new Error ("Os valores para calculo estao errado");
    }

    const faixaIRAnual = this.faixaIRAnual(valorParaCalcular);

    return this.calculoImposto(valorParaCalcular, faixaIRAnual);

  }
  calculoImposto(valorCalculoImposto: number, faixa : FaixaIRAnual) : number{
    if(faixa === "faixa5"){
      return (valorCalculoImposto - 55976.16) * 0.275 +  (PercentualIRAnual.FAIXA1 + PercentualIRAnual.FAIXA2 + PercentualIRAnual.FAIXA3 + PercentualIRAnual.FAIXA4);
    }else if( faixa === "faixa4"){
      return (valorCalculoImposto - 45012.7) * 0.225 +  (PercentualIRAnual.FAIXA1 + PercentualIRAnual.FAIXA2 + PercentualIRAnual.FAIXA3);
    }else if( faixa === "faixa3"){
      return (valorCalculoImposto - 33919.9) * 0.15 +  (PercentualIRAnual.FAIXA1 + PercentualIRAnual.FAIXA2 );
    }else if( faixa === "faixa2"){
      return (valorCalculoImposto - 22847.77) * 0.75 +  (PercentualIRAnual.FAIXA1 );
    }

  }

  faixaIRAnual(salarioBruto : number) : FaixaIRAnual{
    if(salarioBruto > 55976.16){
      return FaixaIRAnual.FAIXA5;
    }else if(salarioBruto >= 45012.7 && salarioBruto <= 55976.16){
      return FaixaIRAnual.FAIXA4;
    }else if(salarioBruto >= 33919.9 && salarioBruto <= 45012.6){
      return FaixaIRAnual.FAIXA3
    }else if(salarioBruto >= 22847.77 && salarioBruto <= 33919.8 ){
      return FaixaIRAnual.FAIXA2
    }else if(salarioBruto <= 22847.76){
      return FaixaIRAnual.FAIXA1
    }
    
  }


  deducaoDependentes(salarioBruto: number, qtdDependentes: number) : number{
    return salarioBruto = salarioBruto - (ValorDependente.DEPENDENTE * qtdDependentes);
  }

  pessoaIsenta(salarioBrutoAnual: number){
    if(salarioBrutoAnual <= 22847.76){
      throw new Error ("A pessoa é isenta de imposto");
    }
  }

  validarDadosImposto(salarioBrutoAnual : number, valorRetido : number, valorInss : number, qtdDependentes : number){

    if(!salarioBrutoAnual && salarioBrutoAnual < 0){

      throw new Error ("O salario bruto anual nao esta correto");

    }else if(!valorRetido && valorRetido < 0){

      throw new Error ("O valor retido nao esta correto");

    }else if (!valorInss && valorInss < 0){

      throw new Error ("O valor de INSS nao esta correto");

    }else if (!qtdDependentes && qtdDependentes < 0){

      throw new Error ("O numero de dependentes nao esta correto");

    }
  }
}

export { ImpostoAnualService };