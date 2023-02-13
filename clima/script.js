
document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;
    
    if (input !== '') {
        limparInfo()
        mostrarAviso('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=bb9ade50219af052606f38585e02524d&units=metric&lang=pt_br`;

        let resultado = await fetch(url); // faz a requisição e espera
        let json = await resultado.json(); // pegou o resultado e tranformou em json

        console.log(json);

        if (json.cod === 200) {
            mostrarInfo({
                nome: json.name,
                pais: json.sys.country,
                temperatura: json.main.temp,
                iconeTemperatura: json.weather[0].icon,
                velocidadeVento: json.wind.speed,
                anguloVento: json.wind.deg
            })
            
        } else {
            limparInfo();
            mostrarAviso('Não encontramos essa localização.');
        }
    } else {
        limparInfo()
    }
});

function mostrarInfo(json) {
    mostrarAviso('');
    
    document.querySelector('.titulo').innerHTML = `${json.nome}, ${json.pais}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temperatura} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.velocidadeVento} <span>km/h</span>`;
    
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.iconeTemperatura}@2x.png`);
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.anguloVento - 90}deg)`;
    
    document.querySelector('.resultado').style.display = 'block';
};

function limparInfo() {
    mostrarAviso('');
    document.querySelector('.resultado').style.display = 'none';
};

function mostrarAviso(msg) {
    document.querySelector('.aviso').innerHTML = msg;
};