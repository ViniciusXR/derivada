var teste = '';
const consultarSeletor = (variante) => document.querySelector(variante)

const entradaPolinomio = consultarSeletor('#entradaPolinomio')
const calcularDerivada = consultarSeletor('#calcularDerivada')
const resultadoDerivada = consultarSeletor('#resultadoDerivada')
const btnLiberarFuncional = consultarSeletor('#btnLiberarFuncional')
const sectionValorFuncional = consultarSeletor('#sectionValorFuncional')
const entradaX = consultarSeletor('#entradaX')
const valorFuncinal = consultarSeletor('#valorFuncinal')

calcularDerivada.addEventListener('click', () => {
    if (entradaPolinomio.value) {
        resultadoDerivada.value = derivarPolinomio(entradaPolinomio.value)
    }
})

btnLiberarFuncional.addEventListener('click', () => {
    if (resultadoDerivada.value) sectionValorFuncional.style.display = 'block'
})

valorFuncinal.addEventListener('click', () => calcularFuncional(teste))

function calcularFuncional(polinomio) {
    console.log(polinomio)
    let teste = polinomio[0]
    console.log({ teste })
    console.log(teste.split(''))
    console.log(teste.split('')[0])
    console.log(Number(teste.split('')[0]) * entradaX.value)
}


function derivarPolinomio(polinomio) {
    // Remove espaços desnecessários e divide o polinômio em termos
    const terms = polinomio.replace(/\s+/g, '').match(/([+-]?[^-+]+)/g);

    // Função para derivar um termo
    function derivarTermo(term) {
        const match = term.match(/([+-]?\d*\.?\d*)?x(?:\^([+-]?\d+))?/);
        if (!match) {
            return ''; // Retorna string vazia se o termo não for válido
        }

        let coeficiente = match[1] || '1';
        let expoente = match[2] || '1';

        // Converte coeficiente e expoente para números
        coeficiente = parseFloat(coeficiente);
        expoente = parseInt(expoente);

        // Caso especial: termo constante (sem x)
        if (isNaN(expoente)) {
            return ''; // Derivada de uma constante é 0
        }

        // Derivada de ax^b é (a*b)x^(b-1)
        const novoCoeficiente = coeficiente * expoente;
        const novoExpoente = expoente - 1;

        if (novoExpoente === 0) {
            return `${novoCoeficiente}`;
        } else if (novoExpoente === 1) {
            return `${novoCoeficiente}x`;
        } else {
            return `${novoCoeficiente}x^${novoExpoente}`;
        }
    }

    // Deriva todos os termos e filtra termos não válidos (constantes)
    const derivedTerms = terms.map(derivarTermo).filter(term => term !== '');
    console.log(derivedTerms)
    teste = derivedTerms;

    // Une os termos derivados em uma string e retorna
    return derivedTerms.join(' + ').replace(/\+\s*-\s*/g, '- ');
}

