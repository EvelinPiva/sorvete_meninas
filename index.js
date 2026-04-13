import Sorvete from "./models/Mocha.js"
import Receita from "./models/Receita.js"
import Custo from "./models/Custo.js"

// RF01: Pote 500ml - raio = 5cm, altura = 6.37cm ≈ 500g
const mochaPedido = new Sorvete(5, 6.37)
const pesoSorvete = mochaPedido.getPesoUnitario()

// Verificando produção da receita de Mocha
const receita = new Receita()
const qtdeIngredientes = receita.calcularQtdeIngredientes()
const qtdeSorvete = receita.calcularQtdeSorvete(pesoSorvete)

console.log(`A quantidade de sorvete Mocha produzida é: ${qtdeSorvete}`)
console.log('Quantidade de Ingredientes (Leite, Creme, Café, Chocolate, Açúcar)')
console.table(qtdeIngredientes)

// Calculando custos de produção
const custo = new Custo()
const precosIngredientes = custo.calcularCusto(qtdeIngredientes)

console.log('--- Custo dos Ingredientes Mocha (R$) ---')
console.table(precosIngredientes)

console.log(`O custo total de produção é: R$ ${custo.totalCusto}`)
console.log(`O custo por unidade de Mocha é: R$ ${(custo.totalCusto / qtdeSorvete).toFixed(2)}`)