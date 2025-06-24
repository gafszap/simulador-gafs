const PRECO_BASE_2024 = {
  'Inox Polido': { ate30: 220, ate60: 260, maior60: 320 },
  'Galvanizado': { ate30: 180, ate60: 220, maior60: 300 },
  'Galvanizado com Filete': { ate30: 250, ate60: 320, maior60: 400 },
  'PVC Expandido': { ate30: 70, ate60: 90, maior60: 110 }
};

const PRECO_EXTRAS_2024 = {
  pintura: 30,
  led_indireto: 50,
  led_interno: 60,
  acrilico: 40
};

let letraSelecionada = '';

function selecionarLetra(card, tipo) {
  document.querySelectorAll('.card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
  letraSelecionada = tipo;
  atualizarExtras();
}

function atualizarExtras() {
  document.querySelectorAll('#extras label').forEach(l => l.style.display = 'none');
  if (letraSelecionada === 'Inox Polido') {
    mostrar('led_indireto');
  } else if (letraSelecionada === 'Galvanizado') {
    mostrar('led_indireto');
    mostrar('pintura');
  } else if (letraSelecionada === 'Galvanizado com Filete') {
    mostrar('led_interno');
    mostrar('acrilico');
  } else if (letraSelecionada === 'PVC Expandido') {
    mostrar('pintura');
  }
}

function mostrar(id) {
  const label = document.querySelector('label[for="' + id + '"]');
  if (label) label.style.display = 'inline-block';
}

function calcularPreco() {
  if (!letraSelecionada) {
    alert('Selecione o tipo de letra primeiro');
    return;
  }
  const altura = parseFloat(document.getElementById('altura').value);
  const qtd = parseInt(document.getElementById('quantidade').value);
  if (!altura || !qtd) {
    alert('Informe altura e quantidade');
    return;
  }
  const faixa = altura <= 30 ? 'ate30' : altura <= 60 ? 'ate60' : 'maior60';
  const base = PRECO_BASE_2024[letraSelecionada][faixa];
  let extras = [];
  let extrasTotal = 0;
  ['pintura','led_indireto','led_interno','acrilico'].forEach(id => {
    const el = document.getElementById(id);
    if (el && el.checked) {
      extras.push({nome: el.dataset.nome, valor: PRECO_EXTRAS_2024[id]});
      extrasTotal += PRECO_EXTRAS_2024[id];
    }
  });
  const unitario = base + extrasTotal;
  const total = unitario * qtd;
  let linhasExtras = extras.map(e => `<tr><td>${e.nome}</td><td>R$ ${e.valor.toFixed(2)}</td></tr>`).join('');
  if (!linhasExtras) linhasExtras = '<tr><td colspan="2">Nenhum opcional</td></tr>';
  const tabela = `
    <table class="resumo">
      <tr><th colspan="2">Resumo</th></tr>
      <tr><td>Base</td><td>R$ ${base.toFixed(2)}</td></tr>
      ${linhasExtras}
      <tr><td><strong>Subtotal unit.</strong></td><td><strong>R$ ${unitario.toFixed(2)}</strong></td></tr>
      <tr><td>Quantidade</td><td>${qtd}</td></tr>
      <tr><td><strong>Total</strong></td><td><strong>R$ ${total.toFixed(2)}</strong></td></tr>
    </table>
    <p class="disclaimer">Valores base de 2024 para fins de simula\u00e7\u00e3o. Solicite um or\u00e7amento oficial para confirma\u00e7\u00e3o.</p>`;
  document.getElementById('resultado').innerHTML = tabela;
}
