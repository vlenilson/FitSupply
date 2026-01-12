const produtos = [
  { nome: "Halter 10kg", categoria: "pesos", preco: 120 },
  { nome: "Anilha 5kg", categoria: "pesos", preco: 40 },
  { nome: "Luvas de Treino", categoria: "acessorios", preco: 35 },
  { nome: "Cinturão Lombar", categoria: "acessorios", preco: 90 },
  { nome: "Tapete de Yoga", categoria: "tapis", preco: 70 }
];

function renderizarProdutos(lista, textoBusca = "") {
  const ul = document.getElementById("lista-produtos");
  ul.innerHTML = "";

  lista.forEach(p => {
    let nomeDestacado = p.nome;

    if (textoBusca.length > 0) {
      const regex = new RegExp(`(${textoBusca})`, "gi");
      nomeDestacado = p.nome.replace(regex, "<mark>$1</mark>");
    }

    const li = document.createElement("li");
    li.innerHTML = `${nomeDestacado} - Categoria: ${p.categoria} - Preço: R$ ${p.preco.toFixed(2)}`;
    ul.appendChild(li);
  });
}

function filtrar() {
  const texto = document.getElementById("search").value.toLowerCase();
  const categoria = document.getElementById("categoriaFiltro").value;
  const min = parseFloat(document.getElementById("minPreco").value) || 0;
  const max = parseFloat(document.getElementById("maxPreco").value) || Infinity;

  const filtrados = produtos.filter(p => {
    const nomeOk = p.nome.toLowerCase().includes(texto);
    const catOk = categoria === "" || p.categoria === categoria;
    const precoOk = p.preco >= min && p.preco <= max;

    return nomeOk && catOk && precoOk;
  });

  renderizarProdutos(filtrados, texto);
}

document.getElementById("search").addEventListener("input", filtrar);
document.getElementById("categoriaFiltro").addEventListener("change", filtrar);
document.getElementById("minPreco").addEventListener("input", filtrar);
document.getElementById("maxPreco").addEventListener("input", filtrar);

// Inicializa a lista
renderizarProdutos(produtos);
function adicionarProduto() {
  const nome = document.getElementById("nomeProduto").value;
  const categoria = document.getElementById("categoriaProduto").value;
  const preco = parseFloat(document.getElementById("precoProduto").value);

  if (!nome || !preco) {
    alert("Preencha todos os campos");
    return;
  }

  produtos.push({
    nome: nome,
    categoria: categoria,
    preco: preco
  });

  renderizarProdutos(produtos);

  // Limpa campos
  document.getElementById("nomeProduto").value = "";
  document.getElementById("precoProduto").value = "";
}
document.getElementById("adicionarBtn").addEventListener("click", adicionarProduto);