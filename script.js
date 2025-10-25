// SPA - Templates das páginas
const paginas = {
  inicio: document.getElementById("conteudo").innerHTML,
  projeto: `
    <section>
      <h2>Sobre o Projeto🐾</h2>
      <p>A ONG Cães atua em toda a Paraíba, promovendo resgate, acolhimento e adoção de cães abandonados.</p>
      <button id="btnInicio">Voltar ao Início</button>
    </section>
  `,
  cadastro: `
    <section>
      <h2>Cadastro de Voluntário</h2>
      <form id="formCadastro">
        <input type="text" id="nome" placeholder="Nome completo" required>
        <input type="email" id="email" placeholder="Email" required>
        <input type="text" id="telefone" placeholder="Telefone (opcional)">
        <button type="submit">Enviar</button>
        <p id="mensagem"></p>
      </form>
      <button id="btnInicio">Voltar ao Início</button>
    </section>
  `
};

// Função para carregar páginas
function carregarPagina(pagina){
  const conteudo = document.getElementById("conteudo");
  conteudo.innerHTML = paginas[pagina];

  if(pagina === "cadastro") validarFormulario();
  if(pagina === "inicio") mostrarSaudacao();

  document.querySelectorAll("nav a").forEach(link => link.classList.remove("ativo"));
  document.querySelector(`a[data-page="${pagina}"]`)?.classList.add("ativo");
}

// Navegação SPA
document.querySelectorAll("nav a, main a[data-page]").forEach(link => {
  link.addEventListener("click", e=>{
    e.preventDefault();
    const pagina = e.target.getAttribute("data-page");
    if(pagina) carregarPagina(pagina);
  });
});

// Botão "Voltar ao Início"
document.addEventListener("click", e=>{
  if(e.target && e.target.id === "btnInicio"){
    carregarPagina("inicio");
  }
});

// Formulário - Validação
function validarFormulario(){
  const form = document.getElementById("formCadastro");
  const msg = document.getElementById("mensagem");

  if(!form) return;

  form.addEventListener("submit", e=>{
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    if(!nome || !email){
      msg.textContent = "⚠️ Preencha os campos obrigatórios!";
      msg.style.color = "red";
      return;
    }

    localStorage.setItem("usuario", nome);
    msg.textContent = "✅ Cadastro realizado com sucesso!";
    msg.style.color = "green";
    form.reset();
  });
}

// Saudação personalizada
function mostrarSaudacao(){
  const nome = localStorage.getItem("usuario");
  if(!nome) return;

  const saudacao = document.createElement("p");
  saudacao.textContent = `💚 Bem-vindo de volta, ${nome}!`;
  saudacao.style.fontWeight = "bold";
  saudacao.style.color = "#2c7a7b";
  document.getElementById("conteudo")?.appendChild(saudacao);
}

// Carrega página inicial
carregarPagina("inicio");
