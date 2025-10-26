document.addEventListener('DOMContentLoaded', function() {
    // --- Envio do formulário ---
    const form = document.getElementById('formCadastro');
    const mensagem = document.getElementById('mensagem');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            form.style.display = 'none';
            mensagem.style.display = 'block';
        });
    }

    // --- Máscara automática para data de nascimento ---
    const nascimentoInput = document.getElementById('nascimento');
    if (nascimentoInput) {
        nascimentoInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 2) value = value.slice(0,2) + '/' + value.slice(2);
            if (value.length > 5) value = value.slice(0,5) + '/' + value.slice(5,9);
            this.value = value;
        });
    }

    // --- Máscara automática para CPF ---
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            let v = this.value.replace(/\D/g,'');
            if (v.length > 3) v = v.slice(0,3)+'.'+v.slice(3);
            if (v.length > 7) v = v.slice(0,7)+'.'+v.slice(7);
            if (v.length > 11) v = v.slice(0,11)+'-'+v.slice(11,13);
            this.value = v;
        });
    }

    // --- Máscara automática para telefone ---
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            let v = this.value.replace(/\D/g,'');
            if (v.length > 0) v = '('+v;
            if (v.length > 3) v = v.slice(0,3)+') '+v.slice(3);
            if (v.length > 10) v = v.slice(0,10)+'-'+v.slice(10,15);
            this.value = v;
        });
    }

    // --- Máscara e busca automática de CEP ---
    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function() {
            let v = this.value.replace(/\D/g,'');
            if (v.length > 5) v = v.slice(0,5)+'-'+v.slice(5,8);
            this.value = v;

            if (v.replace('-','').length === 8) {
                buscarCep(v.replace('-',''));
            }
        });
    }

    function buscarCep(cep) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    document.getElementById('endereco').value = data.logradouro || '';
                    document.getElementById('cidade').value = data.localidade || '';
                    document.getElementById('estado').value = data.uf || '';
                } else {
                    alert('CEP não encontrado.');
                }
            })
            .catch(() => alert('Erro ao buscar o CEP. Tente novamente.'));
    }
});
