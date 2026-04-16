import Pizza from '../models/Pizza.js'

// 'describe' cria um grupo de testes para organizar o relatório final
describe('Testes da Regra de Negócio: Classe Pizza', () => {
    
    test('Deve calcular corretamente as medidas e o peso de uma pizza média (35cm)', () => {
        
        // 1. PREPARAR: Definindo os dados de entrada
        const diametroInformado = 35
        const espessuraInformada = 0.5
        
        // 2. AGIR: Instanciando o objeto e chamando o método
        const pizzaMedia = new Pizza(diametroInformado, espessuraInformada)
        const pesoCalculado = pizzaMedia.getPesoUnitario()

        // 3. VALIDAR:
        // A classe não guarda o diâmetro, ela guarda o RAIO (35 / 2 = 17.5)
        expect(pizzaMedia.raio).toBe(17.5)
        expect(pizzaMedia.altura).toBe(0.5)

        // Validando se o resultado retornou maior que zero
        expect(pesoCalculado).toBeGreaterThan(0)

        // Validando a matemática do peso (Volume * 0.85 de densidade)
        expect(pesoCalculado).toBeCloseTo(408.898, 3)
    })

    test('Deve calcular o peso de uma pizza pequena e fina (20cm e 0.2cm)', () => {
        // PREPARAR E AGIR
        const pizzaFina = new Pizza(20, 0.2)
        const pesoCalculado = pizzaFina.getPesoUnitario()
        
        // VALIDAR
        // O raio de 20cm deve ser 10
        expect(pizzaFina.raio).toBe(10)
        expect(pizzaFina.altura).toBe(0.2)
        
        // Validando com precisão de 3 casas
        expect(pesoCalculado).toBeCloseTo(53.407, 3)
    })
})