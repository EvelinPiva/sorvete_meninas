import Custo from '../models/Custo.js'

describe('Testes da Regra de Negócio: Classe Financeira (Custo)', () => {

    test('Deve iniciar com os preços padrão corretamente', () => {
        // 1. PREPARAR E AGIR
        const custoPadrao = new Custo()

        // 2. VALIDAR
        expect(custoPadrao.acucar).toBe(5.5)
        expect(custoPadrao.leite).toBe(0.01)
    })

    test('Deve calcular o custo dos ingredientes (conversão de g/ml para Kg/L)', () => {
        // 1. PREPARAR:
        const custo = new Custo()

        // Criando um "Mock" (Objeto simulado) com valores redondos para facilitar a matemática
        // Ex: 100.000g = 100kg. Como o açúcar custa 5.50, tem que dar R$ 550.00
        const ingredientesMock = {
            acucar: 100000,  // 100 kg
            leite: 50000,    // 50 Litros
            creme: 2000,     // 2 Litros
            cafe: 1000,      // 1 kg
            caramelo: 500    // 0.5 kg (Meio quilo)
        }

        // 2. AGIR: Mandando a classe calcular usando o objeto falso
        const precosCalculados = custo.calcularCusto(ingredientesMock)

        // 3. VALIDAR: Verificando se as multiplicações e conversões bateram
        expect(precosCalculados.acucar).toBe(550)       // 100kg * 5.5
        expect(precosCalculados.leite).toBe(0.5)        // 50L * 0.01
        expect(precosCalculados.creme).toBe(63)         // 2L * 31.5
        expect(precosCalculados.cafe).toBe(1.99)        // 1kg * 1.99
        expect(precosCalculados.caramelo).toBe(12.75)   // 0.5kg * 25.5
    })

    test('Deve somar o custo total da produção', () => {
        // 1. PREPARAR
        const custo = new Custo()
        const ingredientesMock = {
            acucar: 100000, leite: 50000, creme: 2000,
            cafe: 1000, caramelo: 500
        }

        // 2. AGIR
        custo.calcularCusto(ingredientesMock) // O total é somado lá dentro!

        // 3. VALIDAR
        // A soma exata deve ser: 550 + 0.5 + 63 + 1.99 + 12.75 = 628.24
        expect(custo.totalCusto).toBe(628.24)
    })

    test('Deve permitir calcular custos com preços dinâmicos (Inflação)', () => {
        // PREPARAR: O mercado subiu! Novo açúcar a R$ 10.00
        const custoInflacao = new Custo(10, 0.01, 31.5, 1.99, 25.5)

        const ingredientesMock = {
            acucar: 100000, // 100kg
            leite: 0, creme: 0, cafe: 0, caramelo: 0
        }

        // AGIR
        const precos = custoInflacao.calcularCusto(ingredientesMock)

        // VALIDAR
        expect(precos.acucar).toBe(1000)            // 100kg * R$ 10,00 = 1000
        expect(custoInflacao.totalCusto).toBe(1000) // apenas o açúcar
    })
})