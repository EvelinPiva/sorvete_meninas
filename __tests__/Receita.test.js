import Receita from '../models/Receita.js'

describe('Testes da Regra de Negócio: Classe Receita', () => {

    test('Deve calcular a proporção de ingredientes para 1 Tonelada com receita padrão', () => {
        // 1. PREPARAR: Criar uma receita sem passar valores (vai usar o padrão do construtor)
        const receitaPadrao = new Receita()

        // 2. AGIR: Pedimos para calcular a quantidade para 1 tonelada
        const proporcao = receitaPadrao.calcularQtdeIngredientes()

        // 3. VALIDAR:
        // A) Validando se a soma do peso base padrão está correta (200+134+5+4.5+3.5+5+56)
        expect(receitaPadrao.pesoBase).toBe(408)

        // B) Validando a Farinha: 200 * (1.000.000 / 408) = 490196.078... toFixed(2) = 490196.08
        expect(proporcao.farinha).toBe(490196.08)

        // C) Validando Regra de Negócio dos Ovos (Arredondamento para CIMA)
        // 1.000.000 / 408 = 2450.98... logo, precisaremos de 2451 ovos inteiros
        expect(proporcao.ovo).toBe(2451)
    });

    test('Deve calcular a quantidade de pizzas inteiras (Rendimento)', () => {
        // 1. PREPARAR
        const receita = new Receita()
        
        // Pegando o peso exato da pizza média que descobrir no teste da Pizza!
        const pesoDaPizzaMedia = 408.898 

        // 2. AGIR
        const totalDePizzas = receita.calcularQtdePizza(pesoDaPizzaMedia)

        // 3. VALIDAR: Regra de Negócio da Pizza (Arredondamento para BAIXO)
        // 1.000.000 / 408.898 = 2445.597... A regra exige cortar as sobras (Math.floor)
        expect(totalDePizzas).toBe(2445)
    });

    test('Deve permitir criar uma receita com pesos personalizados', () => {
        // PREPARAR: Criando uma receita com o dobro de farinha (400) e água (268)
        const receitaEspecial = new Receita(400, 268, 5, 4.5, 3.5, 5, 56)
        
        // VALIDAR
        // O peso base agora deve ser maior
        expect(receitaEspecial.pesoBase).toBe(742)
    })

})