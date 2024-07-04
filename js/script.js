// Função utilizada para consultar seletor
const consultarSeletor = (variante) => document.querySelector(variante)

// Seletores
const entradaPolinomio = consultarSeletor('#entradaPolinomio')
const btnCalcularDerivada = consultarSeletor('#btnCalcularDerivada')
const resultadoDerivada = consultarSeletor('#resultadoDerivada')

const btnContainer = consultarSeletor('#btnContainer')

const btnLiberarFuncional = consultarSeletor('#btnLiberarFuncional')
const divValorFuncional = consultarSeletor('#valorFuncional')
const resultadoFuncional = consultarSeletor('#resultadoFuncional')
const btnCalcularFuncional = consultarSeletor('#btnCalcularFuncional')
const x = consultarSeletor('#entradaX')

const divRetaTangente = consultarSeletor('#retaTangente')
const btnLiberarRetaTangente = consultarSeletor('#btnLiberarRetaTangente')
const btnRetaTangente = consultarSeletor('#btnRetaTangente')
const resultadoTangente = consultarSeletor('#resultadoTangente')
const a = consultarSeletor('#entradaA')

const btnResetar = consultarSeletor('#btnResetar')
const btnCalcularRaizes = consultarSeletor('#btnCalcularRaizes')
const resultadoRaizes = consultarSeletor('#resultadoRaizes')
var derivadaRecuperada = ''

function derivarPolinomio(polinomio) {
    // Remove espaços desnecessários e divide o polinômio em termos
    const termos = polinomio.replace(/\s+/g, '').match(/([+-]?[^-+]+)/g)

    // Função para derivar um termo
    function derivarTermo(termo) {
        const match = termo.match(/([+-]?\d*\.?\d*)?x(?:\^([+-]?\d+))?/)
        if (!match) {
            return '' // Retorna string vazia se o termo não for válido
        }

        let coeficiente = match[1] || '1'
        let expoente = match[2] || '1'

        // Converte coeficiente e expoente para números
        coeficiente = parseFloat(coeficiente)
        expoente = parseInt(expoente)

        // Caso especial: termo constante (sem x)
        if (isNaN(expoente)) {
            return '' // Derivada de uma constante é 0
        }

        // Derivada de ax^b é (a*b)x^(b-1)
        const novoCoeficiente = coeficiente * expoente
        const novoExpoente = expoente - 1

        if (novoExpoente === 0) {
            return `${novoCoeficiente}`
        } else if (novoExpoente === 1) {
            return `${novoCoeficiente}x`
        } else {
            return `${novoCoeficiente}x^${novoExpoente}`
        }
    }

    // Deriva todos os termos e filtra termos não válidos (constantes)
    const termosDerivados = termos.map(derivarTermo).filter(termo => termo !== '')

    // Une os termos derivados em uma string e retorna
    derivadaRecuperada = termosDerivados.join(' + ').replace(/\+\s*-\s*/g, '- ')
    return derivadaRecuperada != '' ? derivadaRecuperada : 0
}

function calcularFA(polinomio, valorA) {
    // Calcula valor de F(a)
    return (math.evaluate(polinomio, { x: valorA })).toLocaleString('pt-BR')
}

function calcularFuncional(derivada, valorX) {
    // Calcula valor funcional utilizando a derivada que foi recuperada e o valor de entrada para x formatado para o padrão númerico
    return (math.evaluate(derivada, { x: valorX })).toLocaleString('pt-BR')
}

function calcularFlinhaA(derivada, valorA) {
    //f linha
    return (math.evaluate(derivada, { x: valorA })).toLocaleString('pt-BR')
}

function encontrarRaizes(polinomio) {
    // Definindo os limites de busca
    const limiteInferior = -10
    const limiteSuperior = 10
    const precisao = 1e-8
    let raizes = []

    // Função para encontrar raízes usando o método de Newton-Raphson
    function newtonRaphson(f, df, x0, precisao) {
        let x = x0
        let iteracoes = 0
        while (iteracoes < 100) {
            const fx = f(x)
            const dfx = df(x)
            if (Math.abs(fx) < precisao) {
                return x
            }
            x -= fx / dfx
            iteracoes++
        }
        return null
    }

    // Função f(x) e sua derivada f'(x)
    const f = (x) => math.evaluate(polinomio, { x: x })
    const df = (x) => math.evaluate(derivarPolinomio(polinomio), { x: x })

    for (let i = limiteInferior; i <= limiteSuperior; i++) {
        const raiz = newtonRaphson(f, df, i, precisao)
        if (raiz !== null && !raizes.some(r => Math.abs(r - raiz) < precisao)) {
            raizes.push(raiz.toFixed(8))
        }
    }
    return raizes.join(', ')
}

btnRetaTangente.addEventListener('click', () => {
    let fa = calcularFA(entradaPolinomio.value.trim(), parseInt(a.value))
    let coeficienteAngular = calcularFlinhaA(derivadaRecuperada, parseInt(a.value))
    let b = parseInt(fa) - coeficienteAngular * parseInt(a.value)

    resultadoTangente.value = `y = ${coeficienteAngular}x + ${b}`
})

entradaPolinomio.addEventListener('input', () => {
    // Escutador de eventos que quando disparado habilita o botão para calcular a derivada
    btnCalcularDerivada.disabled = entradaPolinomio.value.length === 0
})

btnLiberarFuncional.addEventListener('click', () => {
    // Escutador de eventos que quando disparado muda estilização para liberar a visuzalização da parte de valor funcional em tela
    divValorFuncional.style.display = 'flex'
})

btnLiberarRetaTangente.addEventListener('click', () => {
    // Escutador de eventos que quando disparado muda estilização para liberar a visuzalização da parte da reta tangente em tela
    divRetaTangente.style.display = 'flex'
})

btnCalcularDerivada.addEventListener('click', () => {
    // Escutador de eventos que quando disparado executa a função de derivar o polinomio
    if (entradaPolinomio.value.trim()) {
        resultadoDerivada.value = derivarPolinomio(entradaPolinomio.value)
        if (resultadoDerivada.value != 0 && resultadoDerivada.value != 1) btnContainer.style.display = 'flex'
    }
})

btnCalcularFuncional.addEventListener('click', () => {
    // Escutador de eventos que quando disparado executa função para calcular o valor funcional da derivada
    resultadoFuncional.value = calcularFuncional(derivadaRecuperada, parseInt(x.value))
})

btnCalcularRaizes.addEventListener('click', () => {
    // Escutador de eventos que quando disparado executa a função para calcular as raízes do polinômio
    resultadoRaizes.value = encontrarRaizes(entradaPolinomio.value)
})

btnResetar.addEventListener('click', () => {
    // Escutador de eventos que quando disparado recarrega a página resetando os campos
    window.location.reload()
})
