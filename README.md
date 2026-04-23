# ☕🍦 Gelato Geométrico — Fábrica 4.0

> Sistema de Controle de Produção Industrial para Sorvetes Artesanais  
> **Sabor em Destaque: Café Mocha**

---

## 1. Identificação do Projeto

| Campo          | Informação                              |
|----------------|-----------------------------------------|
| **Projeto**    | Gelato Geométrico — Fábrica 4.0         |
| **Equipe**     | Sabor Especial                          |
| **Sabor**      | ☕ Café Mocha                           |
| **Disciplina** | Desenvolvimento de Sistemas             |

**Integrantes da Equipe:**
- Evelin Piva
- Julia Zamarch Monteiro
- Luíza Michielin Reinhardt

> 🖼️ *Banner / Logotipo gerado no Figma — inserir imagem aqui*  
> `![Banner Gelato Geométrico](./img/banner.png)`

---

## 2. Visão Geral do Sistema

### Descrição
O **Gelato Geométrico — Fábrica 4.0** é um sistema web do tipo PWA (Progressive Web App) desenvolvido para controle de produção industrial de sorvetes artesanais. O sistema funciona como o **"Cérebro da Fábrica"**, auxiliando o mestre sorveteiro a planejar lotes industriais com precisão matemática, eliminando erros humanos que, em um lote de 12 toneladas, poderiam gerar prejuízos de milhares de reais.

### Objetivo
O aplicativo permite que o **Gerente de Produção**:
- Selecione o sabor **Café Mocha** e defina a meta de produção (**1, 5 ou 12 toneladas**)
- Escolha o **tamanho do pote cilíndrico** (Pequeno 400g, Médio 900g ou Grande 1700g)
- Calcule o **volume do pote** com base no raio e altura informados
- Escale automaticamente a **receita base de 900 g** para a tonelagem escolhida
- Obtenha a **lista de compras de ingredientes** proporcional à produção
- Visualize o **custo total** e o **custo unitário por pote** para precificação

---

## 3. Especificações Técnicas — ISO 25010

### Tecnologias Utilizadas

| Tecnologia       | Finalidade                                      |
|------------------|-------------------------------------------------|
| HTML5            | Estrutura e semântica das telas                 |
| CSS3             | Estilização, responsividade e animações         |
| JavaScript (ESM) | Lógica de negócio, cálculos e manipulação DOM   |
| Node.js v18+     | Ambiente de execução dos testes                 |
| Jest             | Testes unitários das classes de negócio         |

### Resolução Alvo
> 📱 **iPhone 14 — 390px × 844px** (com responsividade adicional para desktop)

### Modelo de Densidade
O sistema utiliza a constante de densidade **0,6 g/cm³** para converter volume em peso.

O sorvete contém **ar incorporado** durante o processo de batimento (*overrun*), fazendo com que o volume final seja significativamente maior que o peso da massa — ou seja, 1 cm³ de sorvete pesa **menos** de 1 grama. Essa constante é obrigatória em todos os cálculos volumétricos do sistema.

> **Fórmula:** `Peso (g) = Volume (cm³) × 0,6`

### Requisitos Funcionais

| Código | Requisito |
|--------|-----------|
| **RF01** | O sistema deve permitir a escolha entre 3 tamanhos de recipientes cilíndricos: **Pequeno (400g)**, **Médio (900g)** ou **Grande (1700g)** |
| **RF02** | O sistema deve calcular o **volume do pote** com base no raio e altura informados pelo usuário |
| **RF03** | O sistema deve calcular a **lista de compras de ingredientes** proporcional à tonelagem escolhida (1t, 5t ou 12t) |
| **RF04** | O sistema deve exibir o **Custo Total** de produção e o **Custo por Pote** com base em referência de preço real |

### Regras de Negócio

| Código | Regra | Descrição |
|--------|-------|-----------|
| **RN01** | Densidade | O cálculo de peso para volume deve usar obrigatoriamente **0,6 g/cm³** — `Peso = Volume × 0,6` |
| **RN02** | Arredondamento de Potes | A quantidade de potes deve ser sempre arredondada **para baixo** (`Math.floor`) — nunca pote incompleto |
| **RN03** | Escalabilidade | A receita base de **900 g** deve ser escalada para **1.000 kg, 5.000 kg ou 12.000 kg** |
| **RN04** | Precisão Financeira | Todos os cálculos de custo devem ser exibidos com **duas casas decimais** |
| **RN05** | Validação de Entrada | Campos inválidos (nulo, negativo ou não numérico) devem ser bloqueados com alerta visual em **< 0,5 segundos** |

### Requisitos Não Funcionais (ISO 25010)

| Código | Atributo ISO 25010 | Descrição |
|--------|--------------------|-----------|
| **RNF01** | Portabilidade / Adaptabilidade | Desenvolvido com **JavaScript ES Modules** (import/export), sem transpilação complexa, compatível com navegadores modernos |
| **RNF02** | Usabilidade / Estética | Interface projetada para **iPhone 14 (390 × 844 px)**, garantindo que todos os elementos estejam visíveis e operáveis sem cortes |
| **RNF03** | Eficiência / Comportamento Temporal | Tempo de resposta dos cálculos industriais **≤ 2 segundos** |
| **RNF04** | Manutenibilidade / Testabilidade | Cobertura de **100% dos métodos** das classes `Sorvete`, `Receita` e `Custo` com Jest. Nenhum commit sem todos os testes em "pass" |
| **RNF05** | Usabilidade / Proteção contra Erro | Validações que impeçam dados nulos, negativos ou não numéricos, com alerta visual em **< 0,5 segundos** |

---

## 4. Modelagem e Design

### Diagrama de Classes (UML)

```
┌──────────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│       Sorvete        │       │        Receita        │       │        Custo         │
├──────────────────────┤       ├──────────────────────┤       ├──────────────────────┤
│ - raio: number       │       │ - baseGramas: 900     │       │ - precos: object     │
│ - espessura: number  │       │                       │       │ - totalCusto: number │
│ - densidade: 0.6     │       │                       │       │                      │
├──────────────────────┤       ├──────────────────────┤       ├──────────────────────┤
│ + calcularVolume()   │◄──────│ + calcQtdeIngred()    │◄──────│ + calcularCusto()    │
│ + getPesoUnitario()  │       │ + calcQtdeSorvete()   │       │ + totalCusto         │
└──────────────────────┘       └──────────────────────┘       └──────────────────────┘
```

### Desenho Wireframe (Manual)

> 🖊️ *Inserir foto do wireframe desenhado à mão aqui*  
> `![Wireframe Manual](./img/wireframe_manual.jpg)`

### Protótipo — Figma (iPhone 14)

> 🎨 *Inserir prints das telas do Figma aqui*  
> `![Tela Inicial](./img/figma_tela_inicial.png)`  
> `![Tela Calculadora](./img/figma_calculadora.png)`  
> `![Tela Resultado](./img/figma_resultado.png)`

### Diagrama de Casos de Uso

```
                        ┌──────────────────────────────────┐
                        │    Sistema Gelato Geométrico      │
   ┌──────────┐         │                                  │
   │          │────────►│  Selecionar Sabor (Café Mocha)   │
   │ Gerente  │────────►│  Definir Tonelagem (1 / 5 / 12t) │
   │   de     │────────►│  Escolher Tamanho do Pote        │
   │ Produção │────────►│  Calcular Volume do Pote         │
   │          │────────►│  Ver Lista de Ingredientes       │
   └──────────┘────────►│  Ver Custo Total e por Pote      │
                        └──────────────────────────────────┘
```

### Diagrama de Sequência — Cálculo de Produção

```
Usuário        Interface          Sorvete          Receita           Custo
   │                │                 │                │                │
   │──Informa───────►│                 │                │                │
   │  raio/altura   │                 │                │                │
   │──Define 5t─────►│                 │                │                │
   │                │──new Sorvete()──►│                │                │
   │                │◄──pesoUnitario───┤                │                │
   │                │──calcIngredientes──────────────────►│                │
   │                │──calcQtdeSorvete────────────────────►│                │
   │                │◄──qtdeIngredientes / qtdePotes────────┤                │
   │                │──calcularCusto──────────────────────────────────────►│
   │                │◄──precosIngredientes / totalCusto────────────────────┤
   │◄──Exibe Relat.─┤                 │                │                │
```

---

## 5. Instruções de Instalação e Execução

### Pré-requisitos
- Node.js v18+
- npm v9+

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/EvelinPiva/sorvete_meninas.git

# 2. Acesse a pasta do projeto
cd gelato-geometrico

# 3. Instale as dependências
npm install

# 4. Execute os testes unitários
npm test

# 5. Abra o projeto no navegador
# Opção A — abrir diretamente no navegador:
open telaInicial.html

# Opção B — rodar um servidor local:
npx serve .
```

### 🚀 Sistema em Produção (Vercel)

> 🔗 *Inserir o link do deploy aqui após publicação no Vercel*  
> **URL:** `https://gelato-geometrico.vercel.app` *(substituir pelo link real)*

---

## 6. Cobertura de Testes

Todos os métodos das classes `Sorvete`, `Receita` e `Custo` possuem cobertura de **100%** com Jest.

### O que foi testado e por quê

| Classe    | Método Testado              | Regra Validada | O que garante                                          |
|-----------|-----------------------------|----------------|--------------------------------------------------------|
| `Sorvete` | `calcularVolume()`          | RF02           | Volume cilíndrico `π × r² × h` calculado corretamente |
| `Sorvete` | `getPesoUnitario()`         | RN01           | Densidade 0,6 g/cm³ aplicada corretamente              |
| `Receita` | `calcularQtdeIngredientes()`| RN03           | Escalonamento da receita base proporcional à tonelagem |
| `Receita` | `calcularQtdeSorvete()`     | RN02           | `Math.floor` garante que nunca há pote incompleto      |
| `Custo`   | `calcularCusto()`           | RF04           | Custo por ingrediente calculado com preços reais       |
| `Custo`   | `totalCusto`                | RN04           | Total exibido com exatamente 2 casas decimais          |

**Exemplo de regra testada:** Testamos a **RN02** (arredondamento de potes) na classe `Receita` para garantir que, mesmo que a massa restante seja suficiente para quase encher um pote, o sistema nunca contabilize um pote incompleto — a massa excedente retorna ao tanque.

### Print dos Testes (Jest — todos em "pass")

> 📸 *Inserir captura de tela do terminal com os testes passando aqui*  
> `![Jest Tests Passing](./img/jest_tests_pass.png)`

---

## 7. Regras de Negócio Implementadas

### Cálculo do Volume Cilíndrico (RF02)

```js
// O pote é modelado como um cilindro — raio e altura informados pelo usuário
volume = Math.PI * raio * raio * altura   // resultado em cm³
```

### Conversão Peso/Volume pela Densidade (RN01)

```js
// O sorvete tem ar incorporado → densidade abaixo de 1 g/cm³
peso = volume * 0.6   // 0.6 g/cm³ é obrigatório em todos os cálculos
```

### Arredondamento de Potes (RN02)

```js
// Nunca pote incompleto — sobra volta ao tanque
qtdPotes = Math.floor(massaTotalGramas / pesoPote)
```

### Escalonamento da Receita Base (RN03)

```js
// Receita base: 900g → escalar para 1t, 5t ou 12t
fator = massaAlvoGramas / 900
qtdIngrediente = ingredienteBase * fator
```

| Tonelagem   | Massa em Gramas | Fator Aproximado |
|-------------|-----------------|------------------|
| 1 tonelada  | 1.000.000 g     | ×1.111           |
| 5 toneladas | 5.000.000 g     | ×5.556           |
| 12 toneladas| 12.000.000 g    | ×13.333          |

### Precisão Financeira (RN04)

```js
custoPorPote = (custoTotal / qtdPotes).toFixed(2)
totalExibido = custo.totalCusto.toFixed(2)
```

### Receita Base — ☕ Café Mocha (900 g)

| Ingrediente               | Quantidade | Categoria  |
|---------------------------|------------|------------|
| 🥛 Leite                  | 480 ml     | Base       |
| 🍶 Creme de Leite         | 170 g      | Base       |
| 🍬 Açúcar                 | 80 g       | Base       |
| ☕ Café Solúvel (Especial) | 20 g       | O Especial |
| 🍮 Calda de Caramelo      | 150 g      | Adereço    |
| **Total**                 | **900 g**  |            |

---

## 8. Estrutura de Arquivos

```
gelato-geometrico/
├── telaInicial.html            ← Landing page (HOME)
├── telaInicial.css             ← Estilos exclusivos da landing page
├── index.html                  ← Calculadora de produção
├── style.css                   ← Estilos da calculadora (mobile + desktop)
├── Mocha.prog.js               ← Controlador DOM da calculadora
├── package.json
├── README.md
├── img/
│   ├── LOGO_MOCHA.png
│   ├── img_sorvete.png
│   ├── img_favicon.png
│   ├── banner.png              ← (inserir banner do Figma)
│   ├── wireframe_manual.jpg    ← (inserir foto do wireframe)
│   ├── figma_tela_inicial.png  ← (inserir print do Figma)
│   └── jest_tests_pass.png     ← (inserir print do terminal Jest)
├── html/
│   └── contato.html
├── models/
│   ├── Mocha.js                ← Classe Sorvete (geometria + peso)
│   ├── Receita.js              ← Classe Receita (escalonamento)
│   └── Custo.js                ← Classe Custo (precificação)
└── tests/
    ├── Sorvete.test.js
    ├── Receita.test.js
    └── Custo.test.js
```

---

*Projeto desenvolvido para a disciplina de Desenvolvimento de Sistemas — Equipe Sabor Especial ☕*