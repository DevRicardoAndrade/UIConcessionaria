const base_url = 'https://localhost:7131/api/';
document.onload = inserirHeader();

// function marcarClick(item){

//     var style = document.styleSheets;
//     var home = document.getElementById('home');
//     home.style.color = "white";
//     home.style.fontStyle = "normal";
//     home.style.borderColor = "";

//     var elements = document.getElementsByClassName('nav-link');
//     for( var i = 0; i < elements.length; i++){
//         elements[i].style.color = "white";
//         elements[i].style.fontStyle = "normal";
//         elements[i].style.borderColor = ""; 
//     }

//     var element = document.getElementById(item);
//     element.style.color = "blue";
//     element.style.fontStyle = "italic";
//     element.style.borderColor = "white";

//     document.styleSheets = style;

// }

function fecharModal(modal){
    var modal = document.getElementById(modal);
    modal.style.display = "none";
    
}

function abrirModal(modal){
    var modal = document.getElementById(modal);
    modal.style.display = "flex";
}

function getFabricantes(){
    var loading = document.getElementById('loading');
    loading.style.display = "flex";
    var url = base_url + 'Fabricantes';
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    var fabricantes = JSON.parse(request.responseText);
    var htmlFabricantes= '';
    var i = 0;
    fabricantes.forEach(element => {
        htmlFabricantes += '<li> <div class="box" id="fabricanteId=' + element.fabricanteId + '" onclick="detalhesFabricante(id)"> <h2>' + element.nome+  '</h2> </div> </li>';
    });

    var lista = document.getElementById('fabricantes-list');
    lista.innerHTML = htmlFabricantes;
    loading.style.display = "none";
}

function postFabricantes(){
    event.preventDefault();
    var loading = document.getElementById('loading');
    loading.style.display = "flex";

    var url = base_url + 'Fabricantes';

    let elemt_nome = document.getElementById('nome').value;
    console.log(elemt_nome)

    body={
        nome : elemt_nome,
        veiculos : null
    }

    let request = new XMLHttpRequest();
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.setRequestHeader("Access-Control-Allow-Origin", "*");
    request.send(JSON.stringify(body))
    console.log(body);
    alert('Salvo');
    fecharModal();
    getFabricantes();
}

function inserirHeader(){
    var body = document.body.innerHTML;
    document.body.innerHTML ='<header> <nav class="navbar"> <div class="nav-group"> <img src="./img/car.png"> <span id="home">Concessionaria</span> </div> <ul class="nav-items"> <li> <a class="nav-link" href="./fabricantes.html" id="fabricantes">Fabricantes</a> </li> <li> <a class="nav-link" href="#" id="veiculos" >Veículos</a> </li> </ul> </nav>';
    document.body.innerHTML += body;
    if(document.title.toLowerCase() == 'concessionaria - fabricantes'){
        getFabricantes();
    }
}

function detalhesFabricante(value){
    console.log(value);
    abrirModal('detalhes');
    var element = document.getElementById('detalhes-fabricante');
    element.id = value;

    console.log(element);
}