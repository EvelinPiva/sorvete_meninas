export default class Receita {
    // valores padrão da receita Mocha (900g)
    constructor(acucar = 80, leite = 480, creme = 170, cafe = 20,
        caramelo = 150) {

        this.acucar = acucar
        this.leite = leite
        this.creme = creme
        this.cafe = cafe
        this.caramelo = caramelo

        // peso base da receita de 900 gramas
        this.pesoBase = this.acucar + this.leite + this.creme +
                        this.cafe + this.caramelo

        // atributo do resultado dos cálculos
        this.receita = {}
        this.totalSorvete = 0
    }

    // referencia 1 Tonelada ou 1.000.000 de gramas
    calcularQtdeIngredientes() {
        const fatorEscala = 1000000 / this.pesoBase

        this.receita = {
            acucar: Number((this.acucar * fatorEscala).toFixed(2)),
            leite: Number((this.leite * fatorEscala).toFixed(2)),
            creme: Number((this.creme * fatorEscala).toFixed(2)),
            cafe: Number((this.cafe * fatorEscala).toFixed(2)),
            caramelo: Number((this.caramelo * fatorEscala).toFixed(2))
        }

        return this.receita
    }

    // Recebe o peso unitário do programa principal
    calcularQtdeSorvete(pesoUnitario) {
        this.totalSorvete = 1000000 / pesoUnitario

        this.verificarQtdeSorvete()

        return this.totalSorvete
    }

    verificarQtdeSorvete() {
        // regra de negócio de sorvetes inteiros
        this.totalSorvete = Math.floor(this.totalSorvete)
    }
}