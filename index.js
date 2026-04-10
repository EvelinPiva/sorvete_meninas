import Sorvete from "./models/Mocha.js"
import Receita from "./models/Receita.js"
import Custo from "./models/Custo.js"

// Usuário define o tipo de Sorvete Mocha (ex: Pote 500ml)
// No exemplo abaixo: 500 (ml ou gramas), 0.2 (fator de densidade ou calda)
const mochaPedido = new Sorvete(500, 0.2)
const pesoSorvete = mochaPedido.getPesoUnitario()

// Verificando produção da receita de Mocha
const receita = new Receita()
const qtdeIngredientes = receita.calcularQtdeIngredientes() 
const qtdeSorvete = receita.calcularQtdeSorvete(pesoSorvete)

console.log(`A quantidade de sorvete Mocha produzida é: ${qtdeSorvete}`)
console.log('--- Quantidade de Ingredientes (Café, Chocolate, Leite) ---')
console.table(qtdeIngredientes)

// Calculando custos de produção
const custo = new Custo()
const precosIngredientes = custo.calcularCusto(qtdeIngredientes)

console.log('--- Custo dos Ingredientes Mocha (R$) ---')
console.table(precosIngredientes)

console.log(`O custo total de produção é: R$ ${custo.totalCusto}`)
console.log(`O custo por unidade de Mocha é: R$ ${(custo.totalCusto / qtdeSorvete).toFixed(2)}`)