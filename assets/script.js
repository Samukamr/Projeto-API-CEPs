
const clearForm = () => {
    document.querySelector('#address').value = '';
    document.querySelector('#district').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#state').value = '';
};

const fillOutForm = (address) => {
    document.querySelector('#address').value = address.logradouro;
    document.querySelector('#district').value = address.bairro;
    document.querySelector('#city').value = address.localidade;
    document.querySelector('#state').value = address.uf;
};

const eNumber = (Number) => /^[0-9]+$/.test(Number);

const  cepValid = (cep) => cep.length == 8 && eNumber(cep);



const searchCep = async() => {
    clearForm();

    const cep = document.querySelector('#cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    if(cepValid(cep)) {
        const dice = await fetch(url); // recebendo o resultado do fetch
        const address = await dice.json(); // pegando os dados e aplicando a função json.
        if(address.hasOwnProperty('erro')) { // "se tiver essa propriedade"
            document.querySelector('#address').value = 'CEP não encontrado';
        } else {
            fillOutForm(address);
        }
    } else {
        document.querySelector('#address').value = 'CEP incorreto!';
    }
};

document.querySelector('#cep').addEventListener('focusout', searchCep);