// Obtenção de Elementos HTML:
// Obtém os elementos HTML relevantes para interação:
const searchButton = document.getElementById("search");
const cepInput = document.getElementById("cep");
const citiesSelect = document.getElementById("cities");
const resultDiv = document.getElementById("result");
const containerDiv = document.querySelector(".container");

// Quando a página HTML é carregada, o JavaScript no arquivo script.js é executado. 
// Isso inclui a definição de eventos, como o clique no botão "Buscar".
searchButton.addEventListener("click", () => {
    // Quando o botão "Buscar" é clicado, o evento de clique é acionado. 
    // O código dentro do callback desse evento é executado.
    resultDiv.innerHTML = "";
    containerDiv.classList.remove("error");

    const cep = cepInput.value.trim();
    const city = citiesSelect.value;

    // Verifica se os campos de CEP e seleção de cidades estão vazios. 
    // Se ambos estiverem vazios, uma mensagem de erro é exibida no resultDiv, 
    // e a classe .error é adicionada à containerDiv para fazer a div tremer informando visualmente que existe algo errado.
    if (!cep && !city) {
        resultDiv.textContent = "CEP não encontrado";
        containerDiv.classList.add("error");
        return;

    }

    // Se houver um valor no campo de CEP, 
    // Verifica se o formato é válido (8 dígitos numéricos).
    if (cep && !/^\d{8}$/.test(cep)) {
        resultDiv.textContent = "CEP inválido. O formato correto é 8 dígitos numéricos.";
        containerDiv.classList.add("error");
        return;
    }

    let url = `https://viacep.com.br/ws/${cep || city}/json/`;

    // Se não houver erros até este ponto, o código executa uma chamada Fetch 
    // para a URL correta com base no valor do campo de CEP ou seleção de cidades.
    fetch(url)
        // Dentro do bloco .then() da promessa Fetch, o código processa a resposta da API. 
        // Se a resposta indicar que o CEP não foi encontrado (através da propriedade erro), 
        // uma mensagem de erro é exibida no resultDiv.
        // Caso contrário, os dados relevantes da resposta (como logradouro, bairro, cidade, estado) são exibidos no resultDiv.
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                resultDiv.textContent = "CEP não encontrado";
                containerDiv.classList.add("error");
                return;
            }

            resultDiv.innerHTML = `
              <p>CEP: ${data.cep}</p>
              <p>Logradouro: ${data.logradouro}</p>
              <p>Bairro: ${data.bairro}</p>
              <p>Cidade: ${data.localidade}</p>
              <p>Estado: ${data.uf}</p>
            `;
        })
        // Se ocorrer algum erro durante a chamada Fetch (por exemplo, falha de rede ou servidor indisponível), o bloco .catch() é acionado.
        .catch(error => {
            console.error("Erro ao buscar CEP:", error);
            resultDiv.textContent = "Ocorreu um erro ao buscar o CEP.";
            containerDiv.classList.add("error");
        });
});

// Uma vez que o processo de busca e exibição de resultados (ou mensagens de erro) seja concluído, o fluxo retorna ao estado inicial, pronto para outra busca.