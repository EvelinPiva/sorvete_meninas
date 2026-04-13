export default class Custo {
    // valores em R$ por kg, por Litros e por unidade conforme o item
    constructor(acucar = 5.5, leite = 0.01, creme = 31.5, cafe = 1.99, 
                caramelo = 25.5) {

        this.acucar = acucar
        this.leite = leite 
        this.creme = creme 
        this.cafe = cafe 
        this.caramelo = caramelo

        // atributo do resultado dos cálculos
        this.preco = {}
        this.totalCusto = 0
    }

    // Recebe o objeto qtdeIngredientes (que já passou pelas regras da Receita)
    calcularCusto(qtdeIngredientes) {
        // Multiplicamos a qtde (gramas * 1000 = kg) pelo preço - farina, sal, fermento açúcar
        // Multiplicamos a qtde (mililitros * 1000 = L) pelo preço - azeite e água
        this.preco = {
            farinha: Number(((qtdeIngredientes.farinha / 1000) * this.farinha).toFixed(2)),
            agua: Number(((qtdeIngredientes.agua / 1000) * this.agua).toFixed(2)),
            azeite: Number(((qtdeIngredientes.azeite / 1000) * this.azeite).toFixed(2)),
            sal: Number(((qtdeIngredientes.sal / 1000) * this.sal).toFixed(2)),
            fermento: Number(((qtdeIngredientes.fermento / 1000) * this.fermento).toFixed(2)),
            acucar: Number(((qtdeIngredientes.acucar / 1000) * this.acucar).toFixed(2)),
            ovo: qtdeIngredientes.ovo * this.ovo // Ovo já é unidade
        }

        this.somarTotalCusto()

        return this.preco
    }

    somarTotalCusto() {
        // Soma os valores já formatados
        const somaBruta = this.preco.farinha + this.preco.agua + this.preco.azeite + 
                          this.preco.sal + this.preco.fermento + this.preco.acucar + 
                          this.preco.ovo
        
        this.totalCusto = Number(somaBruta.toFixed(2))
    }
}

