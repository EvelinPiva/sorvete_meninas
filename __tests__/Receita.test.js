import Receita from '../models/Receita.js'

describe('Testes da Regra de Negócio: Classe Receita', () => {

    test('Deve calcular a proporção de ingredientes para 1 Tonelada com receita padrão', () => {
        // 1. PREPARAR: Criar uma receita sem passar valores (vai usar o padrão do construtor)
        const receitaPadrao = new Receita()

        // 2. AGIR: Pedimos para calcular a quantidade para 1 tonelada
        const proporcao = receitaPadrao.calcularQtdeIngredientes()

        // 3. VALIDAR:
        // A) Validando se a soma do peso base padrão está correta (80+480+170+20+150)
        expect(receitaPadrao.pesoBase).toBe(900)

        // B) Validando o Açúcar: 80 * (1.000.000 / 900) = 88888.888... toFixed(2) = 88888.89
        expect(proporcao.acucar).toBe(88888.89)

        // C) Validando o Leite: 480 * (1.000.000 / 900) = 533333.333... toFixed(2) = 533333.33
        expect(proporcao.leite).toBe(533333.33)
    })

    test('Deve calcular a quantidade de sorvetes inteiros (Rendimento)', () => {
        // 1. PREPARAR
        const receita = new Receita()

        // Pegando o peso exato do sorvete médio descoberto no teste do Sorvete!
        const pesoDoSorveteMedio = 408.898

        // 2. AGIR
        const totalDeSorvetes = receita.calcularQtdeSorvete(pesoDoSorveteMedio)

        // 3. VALIDAR: Regra de Negócio do Sorvete (Arredondamento para BAIXO)
        // 1.000.000 / 408.898 = 2445.597... A regra exige cortar as sobras (Math.floor)
        expect(totalDeSorvetes).toBe(2445)
    })

    test('Deve permitir criar uma receita com pesos personalizados', () => {
        // PREPARAR: Criando uma receita com o dobro de açúcar (160) e leite (960)
        const receitaEspecial = new Receita(160, 960, 170, 20, 150)

        // VALIDAR
        // O peso base agora deve ser: 160+960+170+20+150 = 1460
        expect(receitaEspecial.pesoBase).toBe(1460)
    })
})