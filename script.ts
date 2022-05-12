interface IVeiculo {
  nome: string;
  placa: string;
  entrada: Date | string ;
}

const cadastrarBtn = document.getElementById('cadastrarBtn') as HTMLButtonElement;
cadastrarBtn.addEventListener('click', capturarDados);

function capturarDados() {
  const inputNomeVeiculo = document.getElementById('nome') as HTMLInputElement;
  const nomeVeiculo = inputNomeVeiculo.value;

  const inputPlacaVeiculo = document.getElementById('placa') as HTMLInputElement;
  const placaVeiculo = inputPlacaVeiculo.value;

  let novoVeiculo: IVeiculo = {
    nome: nomeVeiculo,
    placa: placaVeiculo,
    entrada: new Date()
  }; 

  (document.getElementById('nome') as HTMLInputElement).value = '';
  (document.getElementById('placa') as HTMLInputElement).value = '';

  if(!nomeVeiculo || !placaVeiculo) {
    alert("Os campos nome e placa do veículo são obrigatórios!");
    return;
  } 
  manipularPatio().adicionarVeiculo(novoVeiculo, true);
}

manipularPatio().renderDadosLocalStorage();

function manipularPatio() {
  function adicionarVeiculo (veiculo: IVeiculo, salvo?: boolean) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${veiculo.nome}</tr>
      <td>${veiculo.placa}</tr>
      <td>${veiculo.entrada.toLocaleString('pt-BR', {timeZone:'America/Sao_Paulo'})}</tr>
      <td>
        <button class='delete' data-placa='${veiculo.placa}'>Excluir</button>
      </tr>`;
    document.getElementById('patio')?.append(row);

    const excluirBtn = row.querySelector('.delete') as HTMLButtonElement;
    excluirBtn.addEventListener('click', function() {
      removerVeiculo(this.dataset.placa);
    })

    if (salvo) salvarDadosLocalStorage([...lerDadosLocalStorage(), veiculo]);
  }
  function lerDadosLocalStorage(): IVeiculo[] {
    return localStorage.patio ? JSON.parse(localStorage.patio) : [];
  }
  function salvarDadosLocalStorage(veiculos: IVeiculo[]) {
    localStorage.setItem('patio', JSON.stringify(veiculos));
  }
  function renderDadosLocalStorage() {
    document.getElementById('patio')!.innerHTML = '';
    const patio = lerDadosLocalStorage();
    if (patio.length) {
      patio.forEach(veiculo => adicionarVeiculo(veiculo));
    }
  }
  function removerVeiculo(placa:string) {
    const veiculoParaRemover = lerDadosLocalStorage().find((veiculo:IVeiculo) => veiculo.placa == placa);

    /* const currentTime = new Date().toLocaleString('pt-BR', {timeZone:'America/Sao_Paulo'}) */
    const tempoNoPatio = calcularTempo((new Date()).getTime() - new Date((veiculoParaRemover.entrada)).getTime());

    if (!confirm(`O veículo permaneceu por ${tempoNoPatio}. Deseja encerrar?`)) return;

    salvarDadosLocalStorage(lerDadosLocalStorage().filter((veiculo) => veiculo.placa !== placa));
    renderDadosLocalStorage();
  }
  return {adicionarVeiculo, lerDadosLocalStorage, salvarDadosLocalStorage, renderDadosLocalStorage, removerVeiculo};
}

function calcularTempo(miliseg:number) {
  const hora = Math.floor(miliseg/3600000);
  const min = Math.floor((miliseg%3600000)/60000);

  return `${hora} horas e ${min} minutos`;
}
let date = new Date(Date.UTC(2021, 5, 28, 3, 0, 0));
console.log('Date in India: ' + date);
let formatter = new Intl.DateTimeFormat('en-US', { timeZone: "America/Denver" });   
let usDate = formatter.format(date);
console.log(usDate);