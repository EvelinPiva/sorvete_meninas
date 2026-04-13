export default class Sorvete{
    constructor(raio,altura){
        this.raio = raio 
        this.altura = altura
    }
    calcularCilindro(){
        let area = Math.PI * this.raio * this.raio
        return area
    }
    calcularPeso(){
        let peso = this.calcularVolume() * (0,6)
        return peso
    }
    calcularVolume(){
        let volume = this.altura * this.altura
        return volume
    }
    calcularLista(){
        
    }
    calcularCustoTotal(){

    }
    calcularCustoPorPote(){

    }

}
// RF03: O sistema deve calcular a lista de compras de
// ingredientes proporcional à tonelagem escolhida.

// RF04: O sistema deve exibir o Custo Total de produção e o Custo
// por Pote a partir de uma referência de preço padrão real.                          