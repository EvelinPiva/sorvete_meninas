import Sorvete from '../models/Mocha.js'

describe('Testes da Regra de Negócio: Classe Sorvete', () => {

    test('Deve calcular corretamente as medidas e o peso de um mocha (35cm)', () => {

        // 1. PREPARAR: Definindo os dados de entrada
        const diametroInformado = 35
        const espessuraInformada = 0.5

        // 2. AGIR: Instanciando o objeto e chamando o método
        const sorveteMedio = new Sorvete(diametroInformado, espessuraInformada)
        const pesoCalculado = sorveteMedio.getPesoUnitario()

        // 3. VALIDAR:
        // A classe não guarda o diâmetro, ela guarda o RAIO (35 / 2 = 17.5)
        expect(sorveteMedio.raio).toBe(17.5)
        expect(sorveteMedio.altura).toBe(0.5)

        // Validando se o resultado retornou maior que zero
        expect(pesoCalculado).toBeGreaterThan(0)

        // Validando a matemática do peso (Volume * densidade)
        expect(pesoCalculado).toBeCloseTo(408.898, 3)
    })

    test('Deve calcular o peso de um sorvete pequeno e fino (20cm e 0.2cm)', () => {
        // PREPARAR E AGIR
        const sorveteFino = new Sorvete(20, 0.2)
        const pesoCalculado = sorveteFino.getPesoUnitario()

        // VALIDAR
        // O raio de 20cm deve ser 10
        expect(sorveteFino.raio).toBe(10)
        expect(sorveteFino.altura).toBe(0.2)

        // Validando com precisão de 3 casas
        expect(pesoCalculado).toBeCloseTo(53.407, 3)
    })
})