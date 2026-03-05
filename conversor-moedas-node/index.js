const readline = require("node:readline");
const axios = require("axios");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const moedas = {
  1: { nome: "Dólar", codigo: "USD" },
  2: { nome: "Real", codigo: "BRL" },
  3: { nome: "Euro", codigo: "EUR" }
};

rl.question("Digite o valor: ", (valor) => {

  console.log("\nEscolha a moeda base:");
  console.log("1 - Dólar");
  console.log("2 - Real");
  console.log("3 - Euro");

  rl.question("Opção: ", async (base) => {

    console.log("\nConverter para:");
    console.log("1 - Dólar");
    console.log("2 - Real");
    console.log("3 - Euro");

    rl.question("Opção: ", async (destino) => {

      const moedaBase = moedas[base];
      const moedaDestino = moedas[destino];

      if (!moedaBase || !moedaDestino) {
        console.log("Opção inválida.");
        rl.close();
        return;
      }

      try {

        const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${moedaBase.codigo}`);

        const taxa = response.data.rates[moedaDestino.codigo];

        const resultado = (Number(valor) * taxa).toFixed(2);

        console.log(`\n${valor} ${moedaBase.nome} = ${resultado} ${moedaDestino.nome}`);

      } catch (erro) {
        console.log("Erro ao buscar taxa de câmbio.");
      }

      rl.close();

    });

  });

});