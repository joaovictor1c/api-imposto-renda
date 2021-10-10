import { FaixaIR,PercentualIR, ValorDependente, FaixaINSS, PercentualINSS } from "../enums/ImpostoNaFonteEnum";

interface ImpostoRenda {
  salarioBruto: number;
  qtdDependentes: number;
  valorPensaoAlimenticia: number;
}


class ImpostoService {
  async impostoNafonte ({ salarioBruto, qtdDependentes, valorPensaoAlimenticia }: ImpostoRenda) {
    
    this.pessoaIsenta(salarioBruto);

    this.pensaoAlimenticia(salarioBruto, valorPensaoAlimenticia);

    this.validarDadosImposto(salarioBruto, qtdDependentes, valorPensaoAlimenticia);

    const faixaInss = this.faixaINSS(salarioBruto);

    const descontoInss = this.calculoINSS(salarioBruto, faixaInss);

    salarioBruto = salarioBruto - descontoInss;

    const valorDeducaoDependentes = this.deducaoDependentes(salarioBruto, qtdDependentes)
   
    const valorParaCalculodeImposto = valorDeducaoDependentes - valorPensaoAlimenticia;
    
    const faixaImposto = this.faixaIR(valorParaCalculodeImposto);

    return this.calculoImposto(salarioBruto, faixaImposto);

  }

  calculoImposto(valorCalculoImposto: number, faixa : FaixaIR) : number{
    if(faixa === "faixa5"){
      return (valorCalculoImposto - 4664.68) * 0.2750 +  (PercentualIR.FAIXA1 + PercentualIR.FAIXA2 + PercentualIR.FAIXA3 + PercentualIR.FAIXA4);
    }else if( faixa === "faixa4"){
      return (valorCalculoImposto - 3751.06) * 0.2250 +  (PercentualIR.FAIXA1 + PercentualIR.FAIXA2 + PercentualIR.FAIXA3);
    }else if( faixa === "faixa3"){
      return (valorCalculoImposto - 2826.66) * 0.150 +  (PercentualIR.FAIXA1 + PercentualIR.FAIXA2 );
    }else if( faixa === "faixa2"){
      return (valorCalculoImposto - 1903.99) * 0.750 +  (PercentualIR.FAIXA1 );
    }

  }

  calculoINSS (salarioBruto : number, faixa : FaixaINSS): number{
    if(faixa === "faixa5"){
      return PercentualINSS.FAIXA5;
    }else if( faixa === "faixa4"){
      return (salarioBruto - 3305.23) * 0.14 +  (PercentualINSS.FAIXA1 + PercentualINSS.FAIXA2 + PercentualINSS.FAIXA3);
    }else if( faixa === "faixa3"){
      return (salarioBruto - 2203.49) * 0.12 +  (PercentualINSS.FAIXA1 + PercentualINSS.FAIXA2 );
    }else if( faixa === "faixa2"){
      return (salarioBruto - 1100.01) * 0.09 +  (PercentualINSS.FAIXA1 );
    }else if( faixa === "faixa1"){
      return salarioBruto  * 0.075
    }
    
  }
  
  faixaINSS(salarioBruto : number) : FaixaINSS{
    if(salarioBruto > 6433.57){
      return FaixaINSS.FAIXA5;
    }else if(salarioBruto >= 3305.23 && salarioBruto <= 6433.57){
      return FaixaINSS.FAIXA4;
    }else if(salarioBruto >= 2203.49 && salarioBruto <= 3305.22){
      return FaixaINSS.FAIXA3
    }else if( salarioBruto >= 1100.01 &&salarioBruto <= 2203.48 ){
      return FaixaINSS.FAIXA2
    }else if(salarioBruto <= 1100.00){
      return FaixaINSS.FAIXA1
    }
    
  }

  faixaIR(salarioBruto : number) : FaixaIR{
    if(salarioBruto > 4664.68){
      return FaixaIR.FAIXA5;
    }else if(salarioBruto >= 3751.06 && salarioBruto <= 4664.68){
      return FaixaIR.FAIXA4;
    }else if(salarioBruto >= 2826.66 && salarioBruto <= 3751.05){
      return FaixaIR.FAIXA3
    }else if( salarioBruto >= 1903.99 && salarioBruto <= 2826.65 ){
      return FaixaIR.FAIXA2
    }else if(salarioBruto <= 1903.98){
      return FaixaIR.FAIXA1
    }
    
  }

  pensaoAlimenticia(salarioBruto: number,valorPensaoAlimenticia : number){
    if(valorPensaoAlimenticia > salarioBruto){
      throw new Error ("Não é possivel calcular com valor de pensao alimenticia maior que salario bruto");
    }
  }

  deducaoDependentes(salarioBruto: number, qtdDependentes: number) : number{
    return salarioBruto = salarioBruto - (ValorDependente.DEPENDENTE * qtdDependentes);
  }

  pessoaIsenta(salarioBruto: number){
    if(salarioBruto <= 1903.98){
      throw new Error ("A pessoa é isenta de imposto");
    }
  }

  validarDadosImposto(salarioBruto: number, qtdDependentes: number, valorPensaoAlimenticia : number){

    if(!salarioBruto && salarioBruto < 0){

      throw new Error ("O salario bruto nao esta correto");

    }else if(!qtdDependentes && qtdDependentes < 0){

      throw new Error ("A quantidade de dependentes nao esta correto");

    }else if (!valorPensaoAlimenticia && valorPensaoAlimenticia < 0){

      throw new Error ("O valor de pensao alimenticia nao esta correto");
    }
  }


}

export { ImpostoService };
