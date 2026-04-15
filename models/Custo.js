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
            acucar: Number(((qtdeIngredientes.acucar / 1000) * this.acucar).toFixed(2)),
            leite: Number(((qtdeIngredientes.leite / 1000) * this.leite).toFixed(2)),
            creme: Number(((qtdeIngredientes.creme / 1000) * this.creme).toFixed(2)),
            cafe: Number(((qtdeIngredientes.cafe / 1000) * this.cafe).toFixed(2)),
            caramelo: Number(((qtdeIngredientes.caramelo / 1000) * this.caramelo).toFixed(2))
        }

        this.somarTotalCusto()

        return this.preco
    }

    somarTotalCusto() {
        // Soma os valores já formatados
        const somaBruta = this.preco.acucar + this.preco.leite + this.preco.creme + 
                          this.preco.cafe + this.preco.caramelo
        
        this.totalCusto = Number(somaBruta.toFixed(2))
    }
}

