export default class Receita{
    // valores padrão
    constructor(acucar = 200, leite = 134, creme = 5, cafe = 4.5, 
        caramelo = 3.5){

        this.acucar = acucar,
        this.leite = leite,
        this.creme = creme,
        this.cafe = cafe,
        this.caramelo = caramelo

        // peso base da receita de 408 gramas
        this.pesoBase = this.acucar + this.leite + this.creme + 
                        this.cafe + this.caramelo

        // atributo do resultado dos cálculos
        this.receita = { }
        this.totalSorvete = 0

    }

    // referencia 1 Tonelada ou 1.000.000 de gramas
    calcularQtdeIngredientes(){
        const fatorEscala = 1000000 / this.pesoBase

            this.receita = {
            acucar: Number((this.acucar * fatorEscala).toFixed(2)),
            leite: Number((this.leite * fatorEscala).toFixed(2)),
            creme: Number((this.creme * fatorEscala).toFixed(2)),
            cafe: Number((this.cafe * fatorEscala).toFixed(2)),
            caramelo: Number((this.caramelo * fatorEscala).toFixed(2))
        }

        this.verificarQtdeLeite()// era ovos, substituí por leite

        return this.receita
    }

    verificarQtdeLeite(){
        const qtdeLeite = this.receita.leite / 56
        this.receita.leite = Math.ceil(qtdeLeite)
    }

    // Recebe o peso unitário do programa principal
    calcularQtdeSorvete(pesoUnitario){
        this.totalSorvete = 1000000 / pesoUnitario

        this.verificarQtdeSorvete()

        return this.totalSorvete
    }

    verificarQtdeSorvete(){
        // regra de negódio de sorvete inteiros
        this.totalSorvete = Math.floor(this.totalSorvete)
    }
}