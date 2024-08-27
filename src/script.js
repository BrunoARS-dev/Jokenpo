document.addEventListener('DOMContentLoaded', loading);

// Declaração de Variaveis gerais.

const box = document.querySelectorAll('.box'); // Div contendo nome indicando lado do player e cpu.

// Declaração de Variaveis gerais onde obtenho elementos em tela.
const imgPlayer1 = document.querySelector('.player-1 img'); //imagem do icone selecionado jogador 1.
const spanPlayer1 = document.querySelector('#score-p1 span'); //Pontuação jogador 1.
const imgPlayer2 = document.querySelector('#player-2 img'); //imagem do icone selecionado da maquina.
const spanPlayer2 = document.querySelector('#score-p2 span'); //Pontuação da maquina.
const title = document.querySelector('.title span'); //Resultado da partida.
const selected = document.querySelectorAll(".selected div"); //icone que marca o ultimo item selecionado.
const loadingMaquina = document.querySelectorAll("#player-2 selected-icon") //Pontos do loading da maquina.
const vencerdor = document.querySelector(".modal span"); //
const modal = document.querySelector(".modal"); // modal com informações
const overlay = document.getElementById("overlay"); // overlay
const partidas = document.querySelector('#partidas span')
const empates = document.querySelector('#empates span')
const derrotas = document.querySelector('#derrotas span')
const vitorias = document.querySelector('#vitorias span')
const choice = document.querySelector(".choice-icons")
var modoAtual = localStorage.getItem('modoDeJogo')

//Variaveis de estatitiscas
var contJogador1 = 0 //pontuação jogador 1
var contJogador2 = 0 //pontuação da maquina
var totalEmpates = 0
var contadorPartidas = 0


 function definirModoDeJogo(modo){

    if(modo == "casual"){
        localStorage.setItem('modoDeJogo',  'casual')
    } else {
        modoAtual = 'melhor-de-cinco'
        localStorage.setItem('modoDeJogo', 'melhor-de-cinco')
    }
}


// Função para criar efeito de loading na tela.
function loading() {
    
    let pointIndex = 0;

    setInterval(function() {
        box.forEach(box => {
            const points = box.querySelectorAll('.point');
            points.forEach((point, i) => {
                if (i === pointIndex) {
                    point.classList.add('loading');
                } else {
                    point.classList.remove('loading');
                }
            });
        });

        pointIndex = (pointIndex + 1) % 3; 
    }, 500); 
}


// Função para realizar a esolha da maquina.
function soteioMaquina(){
    let NumeroAleatorio = Math.floor(Math.random() * (2 - 0 + 1)) ;
   
    const opcoes = document.querySelectorAll(".choice-icons img");

    return opcoes[NumeroAleatorio];
}

//Função para motrar seta indicando o icone "Selecionado" em tela
function mostrarTriangulo(escolhaDoUsuario){
    selected.forEach(div => {
       if(div.classList.contains('selected-'+ escolhaDoUsuario.id)){
            div.classList.remove('invisible')

       } else {
        div.classList.add('invisible')
       }
    }

    )
}

//Função para verificar o vencedor da rodada.
function verificarVencedor(escolhaDoUsuario, escolhaDaMaquina){

    const rockWins = escolhaDoUsuario.id == 'rock' && escolhaDaMaquina.id == 'scissors';
    const paperWins = escolhaDoUsuario.id == 'paper' && escolhaDaMaquina.id == 'rock';
    const scissorsWins = escolhaDoUsuario.id == 'scissors' && escolhaDaMaquina.id == 'rock';


    if(rockWins || paperWins || scissorsWins){
        contJogador1++
            spanPlayer1.innerHTML = contJogador1
            title.innerHTML = 'VENCEU'
       }
       else if(escolhaDoUsuario.id ==  escolhaDaMaquina.id){
            totalEmpates++
            title.innerHTML = 'EMPATE'
       }else{
        contJogador2++
        spanPlayer2.innerHTML = contJogador2
        title.innerHTML = 'PERDEU'
       }

       atualizarEstatisticas()
}


function jokenpo(escolhaDoUsuario){

    let escolhaDaMaquina =  soteioMaquina();
   
    if( modoAtual == 'casual'){ 
        console.log(choice)


    box.forEach(box => {
        const points = box.querySelectorAll('.point');
        points.forEach(point => {
            point.classList.add('none'); 
        });
   });

   //mostrando a escolha do jogador 1
   imgPlayer1.src = escolhaDoUsuario.src;
   imgPlayer1.classList.remove('none');

   loadingMaquina.forEach(div => {
       point.classList.remove('none'); 
    });

   //mostrando a escolha da maquina
   imgPlayer2.src = escolhaDaMaquina.src;
   imgPlayer2.classList.remove('none');
   imgPlayer2.classList.add('player-2');

   verificarVencedor(escolhaDoUsuario, escolhaDaMaquina);
   mostrarTriangulo(escolhaDoUsuario);

} else if( modoAtual == 'melhor-de-cinco' && contJogador1 < 3  && contJogador2 <3 && contadorPartidas < 5){
        
        console.log(modoAtual)
        box.forEach(box => {
            const points = box.querySelectorAll('.point');
            points.forEach(point => {
                point.classList.add('none'); 
            });
       });
    
       //mostrando a escolha do jogador 1
       imgPlayer1.src = escolhaDoUsuario.src;
       imgPlayer1.classList.remove('none');
    
       loadingMaquina.forEach(div => {
           point.classList.remove('none'); 
        });
    
       //mostrando a escolha da maquina
       imgPlayer2.src = escolhaDaMaquina.src;
       imgPlayer2.classList.remove('none');
       imgPlayer2.classList.add('player-2');
    
       verificarVencedor(escolhaDoUsuario, escolhaDaMaquina);
       mostrarTriangulo(escolhaDoUsuario);

       contadorPartidas++
} else {
    
    abrirModal();
}
}


function abrirModal(){
    modal.classList.remove('none');
    overlay.classList.remove("none");

}

function fecharModal(){
    const modal = document.querySelector(".modal")
    const overlay = document.getElementById("overlay")
    modal.classList.add("none")
    overlay.classList.add("none")
}
 function resetGame(){
    contJogador1 = 0 
    contJogador2 = 0 
    totalPartidas = 0
    totalEmpates = 0
    

    partidas.innerHTML = 0
    empates.innerHTML = 0 + '%'
    vitorias.innerHTML = 0 + '%'
    derrotas.innerHTML = 0 + '%'
    
    title.innerHTML = 'ESCOLHA'
    spanPlayer1.innerHTML = contJogador1
    spanPlayer2.innerHTML = contJogador2
    esconderTriangulo()
    imgPlayer1.classList.add('none')
    imgPlayer2.classList.add('none')

    box.forEach(box => {
        const points = box.querySelectorAll('.point');
        points.forEach((point, i) => {
                      point.classList.remove('none');

        });
    })
}


 function esconderTriangulo(){
    selected.forEach(div => {
        div.classList.add('invisible')
       })
}

function atualizarEstatisticas(){
    var totalPartidas = contJogador1 + contJogador2 + totalEmpates
    var percetual_vitorias = (contJogador1/totalPartidas)*100
    var percetual_derrotas = (contJogador2/totalPartidas)*100
    var percetual_empates = (totalEmpates/totalPartidas)*100


    partidas.innerHTML = totalPartidas
    empates.innerHTML = percetual_empates.toFixed(0) + '%'
    vitorias.innerHTML = percetual_vitorias.toFixed(0) + '%'
    derrotas.innerHTML = percetual_derrotas.toFixed(0) + '%'

}



var teste = 2

  function teste1(){
    teste = 0
    console.log(teste + ' function')
    return teste
    
}



teste1()

console.log(teste)
