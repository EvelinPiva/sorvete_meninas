export default class Sorvete {
    constructor(diametro, altura) {
        this.raio = diametro / 2
        this.altura = altura
        this.densidade = 0.85 // densidade do sorvete em g/cm³
    }
 
    calcularCilindro() {
        let area = Math.PI * this.raio * this.raio
        return area
    }
 
    calcularVolume() {
        let volume = this.altura * this.calcularCilindro()
        return volume
    }
 
    getPesoUnitario() {
        return this.calcularVolume() * this.densidade
    }
}
 