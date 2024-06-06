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

const btnResetar = consultarSeletor('#btnResetar')
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

function calcularFuncional(derivada, valorX) {
    // Calcula valor funcional utilizando a derivada que foi recuperada e o valor de entrada para x formatado para o padrão númerico
    return (math.evaluate(derivada, { x: valorX })).toLocaleString('pt-BR')
}

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
        if (resultadoDerivada.value != 0) btnContainer.style.display = 'flex'
    }
})

btnCalcularFuncional.addEventListener('click', () => {
    // Escutador de eventos que quando disparado executa função para calcular o valor funcional da derivada
    resultadoFuncional.value = calcularFuncional(derivadaRecuperada, parseInt(x.value))
})

btnResetar.addEventListener('click', () => {
    // Escutador de eventos que quando disparado recarrega a página resetando os campos
    window.location.reload()
})

