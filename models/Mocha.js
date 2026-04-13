export default class Sorvete {
    constructor(raio,altura) {
        this.raio = raio
        this.altura = altura
        this.densidade = 0.6 // densidade do sorvete em g/cm³
    }

    calcularCilindro() {
        let area = Math.PI * this.raio * this.raio
        return area
    }

    calcularVolume() {
        let volume = this.altura * this.calcularCilindro()
        return volume
    }

    // relacionamento entre volume e a densidade do sorvete, independente do tamanho
    // regra de negócio da densidade constante do sorvete em 0,6 g/cm³
    getPesoUnitario() {
        return this.calcularVolume() * this.densidade
    }
}