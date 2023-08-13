const searchButton = document.getElementById("search");
const cepInput = document.getElementById("cep");
const citiesSelect = document.getElementById("cities");
const resultDiv = document.getElementById("result");
const containerDiv = document.querySelector(".container");

searchButton.addEventListener("click", () => {
    resultDiv.innerHTML = "";
    containerDiv.classList.remove("error");

    const cep = cepInput.value.trim();
    const city = citiesSelect.value;

    if (!cep && !city) {
        resultDiv.textContent = "CEP não encontrado";
        containerDiv.classList.add("error");
        return;
    }

    let url = `https://viacep.com.br/ws/${cep || city}/json/`;

    if (cep && !/^\d{8}$/.test(cep)) {
        resultDiv.textContent = "CEP inválido. O formato correto é 8 dígitos numéricos.";
        containerDiv.classList.add("error");
        return;
    }

    fetch(url)
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
        .catch(error => {
            console.error("Erro ao buscar CEP:", error);
            resultDiv.textContent = "Ocorreu um erro ao buscar o CEP.";
            containerDiv.classList.add("error");
        });
});