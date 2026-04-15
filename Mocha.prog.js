// Importando as nossas classes "cegas" (Regras de Negócio)
import Sorvete from "./models/Mocha.js"
import Receita from "./models/Receita.js"
import Custo from "./models/Custo.js"

// 1. Mapeando apenas os botões e áreas gerais
const botaoCalcular = document.getElementById('btn-calcular')
const botaoLimpar = document.getElementById('btn-limpar')
const areaResultado = document.getElementById('resposta')
const selectTamanho = document.getElementById('tamanho')

// Evento para fazer o select mudar o valor do input automaticamente
selectTamanho.addEventListener('change', () => {
    if (selectTamanho.value !== 'custom') {
        document.getElementById('diametro').value = selectTamanho.value
    } else {
        document.getElementById('diametro').value = ''
        document.getElementById('diametro').focus()
    }
})

// 2. Criando o evento de clique para o botão "Calcular Produção"
botaoCalcular.addEventListener('click', () => {

    const diametro = Number(document.getElementById('diametro').value)
    const espessura = Number(document.getElementById('espessura').value)

    console.log('diametro = ', diametro)
    console.log('espessura = ', espessura)

    // --- A MESMA LÓGICA COMO FEITA NO index.js ---

    // Passo 1: Geometria do Sorvete

    const tamanho = new Sorvete(diametro / 2, espessura)
    const pesoDoSorvete = tamanho.getPesoUnitario()

    // Passo 2: Produção da Receita
    const receita = new Receita()
    const qtdeIngredientes = receita.calcularQtdeIngredientes()
    const qtdeSorvete = receita.calcularQtdeSorvete(pesoDoSorvete)

    console.log(`A quantidade de sorvete M é: ${qtdeSorvete}`)
    console.log('--- Quantidade de Ingredientes ---')
    console.table(qtdeIngredientes)


    // Passo 3: Custos Financeiros
    const custo = new Custo()
    const precosIngredientes = custo.calcularCusto(qtdeIngredientes)

    console.log('--- Custo dos Ingredientes (R$) ---')
    console.table(precosIngredientes)

    console.log(`O custo total de produção é: R$ ${custo.totalCusto}`)
    console.log(`O custo de bola por sorvete é: R$ ${(custo.totalCusto / qtdeSorvete).toFixed(2)}`)

    // --- TERMINA A LÓGICA FEITA NO index.js E COMEÇA A SAÍDA PARA A TELA (DOM) ---

    const custoPorSorvete = (custo.totalCusto / qtdeSorvete).toFixed(2)
    // Montando o texto e a tabela que vão aparecer na tela (EM KG E LITROS)
    const relatorioNaTela = `
        <h3>Relatório: 1 Tonelada de Massa</h3>
        <p><strong>Rendimento:</strong> ${qtdeSorvete} pizzas inteiras</p>
        <p><strong>Custo total de produção:</strong> R$ ${custo.totalCusto}</p>
        <p><strong>Custo de massa por pizza:</strong> R$ ${custoPorSorvete}</p>
        
        <br>
        <h4>Tabela de Ingredientes e Custos</h4>
        <table>
            <thead>
                <tr>
                    <th>Ingrediente</th>
                    <th>Quantidade</th>
                    <th>Custo (R$)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Açúcar</td>
                    <td>${(qtdeIngredientes.acucar / 1000).toFixed(2)} kg</td>
                    <td>R$ ${precosIngredientes.acucar}</td>
                </tr>
                <tr>
                    <td>Leite</td>
                    <td>${(qtdeIngredientes.leite / 1000).toFixed(2)} L</td>
                    <td>R$ ${precosIngredientes.leite}</td>
                </tr>
                <tr>
                    <td>Creme</td>
                    <td>${(qtdeIngredientes.creme / 1000).toFixed(2)} L</td>
                    <td>R$ ${precosIngredientes.creme}</td>
                </tr>
                <tr>
                    <td>Café</td>
                    <td>${(qtdeIngredientes.cafe / 1000).toFixed(2)} kg</td>
                    <td>R$ ${precosIngredientes.cafe}</td>
                </tr>
                <tr>
                    <td>Caramelo</td>
                    <td>${(qtdeIngredientes.caramelo / 1000).toFixed(2)} kg</td>
                    <td>R$ ${precosIngredientes.caramelo}</td>
                </tr>
                <tr>
            </tbody>
        </table>
    `

    // Injetando o relatório montado dentro da área de resposta
    areaResultado.innerHTML = relatorioNaTela
})

// 3. Criando o evento para o botão "Limpar"
botaoLimpar.addEventListener('click', () => {
    // Volta os campos para o valor padrão da receita original
    document.getElementById('tamanho').value = "35"
    document.getElementById('diametro').value = 35
    document.getElementById('espessura').value = 0.5

    // Limpa a tela de resultado
    areaResultado.innerHTML = "<p>Insira os dados do sorvete e " +
        "clique em 'Calcular Produção' para ver o rendimento, ingredientes e custos.</p>"
})
