document.getElementById('calcular').addEventListener('click', function () {
    // Captura o valor do input
    var textoDeEntrada = document.getElementById('texto').value;



    // Exibe o valor capturado em um parágrafo
    document.getElementById('resultado').innerText = derivarPolinomio(textoDeEntrada);
});

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

    // Une os termos derivados em uma string e retorna
    return derivedTerms.join(' + ').replace(/\+\s*-\s*/g, '- ');
}
