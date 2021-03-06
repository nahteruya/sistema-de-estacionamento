const cadastrarBtn = document.getElementById('cadastrarBtn');
cadastrarBtn.addEventListener('click', capturarDados);
function capturarDados() {
    const inputNomeVeiculo = document.getElementById('nome');
    const nomeVeiculo = inputNomeVeiculo.value;
    const inputPlacaVeiculo = document.getElementById('placa');
    const placaVeiculo = inputPlacaVeiculo.value;
    let novoVeiculo = {
        nome: nomeVeiculo,
        placa: placaVeiculo,
        entrada: new Date()
    };
    document.getElementById('nome').value = '';
    document.getElementById('placa').value = '';
    if (!nomeVeiculo || !placaVeiculo) {
        alert("Os campos nome e placa do veículo são obrigatórios!");
        return;
    }
    manipularPatio().adicionarVeiculo(novoVeiculo, true);
}
manipularPatio().renderDadosLocalStorage();
function manipularPatio() {
    function adicionarVeiculo(veiculo, salvo) {
        var _a;
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${veiculo.nome}</tr>
      <td>${veiculo.placa}</tr>
      <td>${veiculo.entrada.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</tr>
      <td>
        <button class='delete' data-placa='${veiculo.placa}'>Excluir</button>
      </tr>`;
        (_a = document.getElementById('patio')) === null || _a === void 0 ? void 0 : _a.append(row);
        const excluirBtn = row.querySelector('.delete');
        excluirBtn.addEventListener('click', function () {
            removerVeiculo(this.dataset.placa);
        });
        if (salvo)
            salvarDadosLocalStorage([...lerDadosLocalStorage(), veiculo]);
    }
    function lerDadosLocalStorage() {
        return localStorage.patio ? JSON.parse(localStorage.patio) : [];
    }
    function salvarDadosLocalStorage(veiculos) {
        localStorage.setItem('patio', JSON.stringify(veiculos));
    }
    function renderDadosLocalStorage() {
        document.getElementById('patio').innerHTML = '';
        const patio = lerDadosLocalStorage();
        if (patio.length) {
            patio.forEach(veiculo => adicionarVeiculo(veiculo));
        }
    }
    function removerVeiculo(placa) {
        const veiculoParaRemover = lerDadosLocalStorage().find((veiculo) => veiculo.placa == placa);
        /* const currentTime = new Date().toLocaleString('pt-BR', {timeZone:'America/Sao_Paulo'}) */
        const tempoNoPatio = calcularTempo((new Date()).getTime() - new Date((veiculoParaRemover.entrada)).getTime());
        if (!confirm(`O veículo permaneceu por ${tempoNoPatio}. Deseja encerrar?`))
            return;
        salvarDadosLocalStorage(lerDadosLocalStorage().filter((veiculo) => veiculo.placa !== placa));
        renderDadosLocalStorage();
    }
    return { adicionarVeiculo, lerDadosLocalStorage, salvarDadosLocalStorage, renderDadosLocalStorage, removerVeiculo };
}
function calcularTempo(miliseg) {
    const hora = Math.floor(miliseg / 3600000);
    const min = Math.floor((miliseg % 3600000) / 60000);
    return `${hora} horas e ${min} minutos`;
}
let date = new Date(Date.UTC(2021, 5, 28, 3, 0, 0));
console.log('Date in India: ' + date);
let formatter = new Intl.DateTimeFormat('en-US', { timeZone: "America/Denver" });
let usDate = formatter.format(date);
console.log(usDate);
