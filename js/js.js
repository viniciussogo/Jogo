function start() { // Inicio da função start()

	$("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador'class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1'class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo2'class='anima1'></div>");
	$("#fundoGame").append("<div id='amigo'class='anima2'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");



    //Principais variáveis do jogo

	var podeAtirar=true;
    var fimdejogo=false;
    var pontos=0;
    var salvos=0;
    var perdidos=0;
    var energiaAtual=3;
	var jogo = {}
    var velocidade=5;
    var posicaoY = parseInt(Math.random() * 370);
    var TECLA = {
        A: 65,
        D: 68,
        Enter: 13
        }
    
        jogo.pressionou = [];
    var somDisparo=document.getElementById("somDisparo");
    var somExplosao=document.getElementById("somExplosao");
    var musica=document.getElementById("musica");
    var somGameover=document.getElementById("somGameover");
    var somPerdido=document.getElementById("somPerdido");
    var somResgate=document.getElementById("somResgate");

    //Música em loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();
        
    //Verifica se o usuário pressionou alguma tecla	
	
	$(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
        });
    
    
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
        });
	
	//Game Loop

	jogo.timer = setInterval(loop,30);
	
	function loop() {
	
	movefundo();
    movejogador();
    moveinimigo1();
    moveinimigo2();
    colisao();
    placar();
    energia();

	
	} // Fim da função loop()

    //Função que movimenta o fundo do jogo
	
	function movefundo() {
	
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1);
        
        } // fim da função movefundo()

    
    function movejogador() {
	
	if (jogo.pressionou[TECLA.A]) {
		var esquerda = parseInt($("#jogador").css("left"));
		$("#jogador").css("left",esquerda-10);
            if (esquerda<=0) {
		
            $("#jogador").css("left",esquerda+10);
            }
	
	}
	
	if (jogo.pressionou[TECLA.D]) {
		
		var esquerda = parseInt($("#jogador").css("left"));
		$("#jogador").css("left",esquerda+10);
            if (esquerda>=1250) {
		
            $("#jogador").css("left",esquerda-10);
            }	
	}
	
	if (jogo.pressionou[TECLA.Enter]) {

		disparo();
		//Chama função Disparo	
	}

	} // fim da função movejogador()

    function moveinimigo1() {

        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left",posicaoX-velocidade);
                    
            if (posicaoX<=0) {
                
            $("#inimigo1").css("left",1200);
                        
            }
    } //Fim da função moveinimigo1()

    function moveinimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
	$("#inimigo2").css("left",posicaoX-velocidade);
				
		if (posicaoX<=0) {
			
		$("#inimigo2").css("left",1300);
					
		}
} // Fim da função moveinimigo2()
    function disparo() {
	
	    if (podeAtirar==true) {
        somDisparo.play();
		
	    podeAtirar=false;
	
	    topo = parseInt($("#jogador").css("top"))
	    posicaoX= parseInt($("#jogador").css("left"))
	    tiroX = posicaoX + 30;
	    topoTiro=topo+20;
	    $("#fundoGame").append("<div id='disparo'class='anima3'></div");
	    $("#disparo").css("top",topoTiro);
	    $("#disparo").css("left",tiroX);
	
	    var tempoDisparo=window.setInterval(executaDisparo, 25);
	
	} //Fecha podeAtirar
 
   	    function executaDisparo() {
	    posicaoX = parseInt($("#disparo").css("left"));
	    $("#disparo").css("left",posicaoX+15); 

        	if (posicaoX>1200) {
						
			window.clearInterval(tempoDisparo);
			tempoDisparo=null;
			$("#disparo").remove();
			podeAtirar=true;
					
                   }
	} // Fecha executaDisparo()
} // Fecha disparo()
    function colisao() {
    var colisao1 = ($("#jogador").collision($("#inimigo1")));
    var colisao2 = ($("#jogador").collision($("#inimigo2")));
    var colisao3 = ($("#disparo").collision($("#inimigo1")));
    var colisao4 = ($("#disparo").collision($("#inimigo2")));

        // jogador com o inimigo1
        
            if (colisao1.length>0) {
            somPerdido.play();
            energiaAtual--;
            perdidos++;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao3(inimigo1X,inimigo1Y);


            $("#inimigo1").remove();
            
            reposicionaInimigo1();
	        }
            // jogador com o inimigo2 
            if (colisao2.length>0) {
            somPerdido.play();
            energiaAtual--;
            perdidos++;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao4(inimigo2X,inimigo2Y);
                
            $("#inimigo2").remove();
            
            reposicionaInimigo2();
            
            }	
            // Disparo com o inimigo1
		
	        if (colisao3.length>0) {
		
            pontos=pontos+100;
            velocidade=velocidade+0.5;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X,inimigo1Y);
            $("#disparo").css("left",1250);
            
            $("#inimigo1").remove();
            
            reposicionaInimigo1();
            }

            if (colisao4.length>0) {
		
            pontos=pontos+50;
            velocidade=velocidade+0.7;
            inimigo1X = parseInt($("#inimigo2").css("left"));
            inimigo1Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo1X,inimigo1Y);
            $("#disparo").css("left",1250);
                
            $("#inimigo2").remove();
            
            reposicionaInimigo2();
            }


    
} //Explosão 1
    function explosao1(inimigo1X,inimigo1Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image");
    var div=$("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
                
    var tempoExplosao=window.setInterval(removeExplosao, 2000);
        
        function removeExplosao() {
                
        div.remove();
        window.clearInterval(tempoExplosao);
        tempoExplosao=null;
                
        }
            
    } // Fim da função explosao1()

    function reposicionaInimigo1() {
	
        var tempoColisao4=window.setInterval(reposiciona4, 3300);
            
            function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4=null;
                
                if (fimdejogo==false) {
                
                $("#fundoGame").append("<div id=inimigo1 class='anima1'></div");
                
                }
                
            }	
        }	
    //Reposiciona Inimigo2
	
	function reposicionaInimigo2() {
	
        var tempoColisao4=window.setInterval(reposiciona4, 7500);
            
            function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4=null;
                
                if (fimdejogo==false) {
                
                $("#fundoGame").append("<div id=inimigo2 class='anima1'></div");
                
                }
                
            }	
        }	

//Explosão2
	
    function explosao2(inimigo2X,inimigo2Y) {
        somExplosao.play();
	    $("#fundoGame").append("<div id='explosao2'></div");
	    $("#explosao2").css("background-image");
	    var div2=$("#explosao2");
	    div2.css("top", inimigo2Y);
	    div2.css("left", inimigo2X);
	
	    var tempoExplosao2=window.setInterval(removeExplosao2, 2000);
	
		    function removeExplosao2() {
			
			    div2.remove();
			    window.clearInterval(tempoExplosao2);
			    tempoExplosao2=null;
			
		}
		
		
	} // Fim da função explosao2()

    function placar() {
	
        $("#placar").html("<h2> Pontos: " + pontos + "</h2>");
        
    } //fim da função placar()

    //Barra de energia

function energia() {
    $("#energia").html("<h3> Energia: " + "\n");
	
    if (energiaAtual==3) {
        
        $("#energia").css("background-image", "url(imgs/energia3.png)");
    }

    if (energiaAtual==2) {
        
        $("#energia").css("background-image", "url(imgs/energia2.png)");
    }

    if (energiaAtual==1) {
        
        $("#energia").css("background-image", "url(imgs/energia1.png)");
    }

    if (energiaAtual==0) {
        
        $("#energia").css("background-image", "url(imgs/energia0.png)");
        
        //Game Over
        gameOver();
    }

} // Fim da função energia()
function explosao3(inimigo1X,inimigo1Y) {
    $("#fundoGame").append("<div id='explosao1'></div");
    $("#explosao1").css("background-image");
    var div2=$("#explosao1");
    div2.css("top", inimigo1Y);
    div2.css("left", inimigo1X);

    var tempoExplosao1=window.setInterval(removeExplosao1, 2000);

        function removeExplosao1() {
        
            div2.remove();
            window.clearInterval(tempoExplosao1);
            tempoExplosao1=null;
        
    }
}
function explosao4(inimigo2X,inimigo2Y) {
        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image");
        var div2=$("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
    
        var tempoExplosao2=window.setInterval(removeExplosao2, 2000);
    
            function removeExplosao2() {
            
                div2.remove();
                window.clearInterval(tempoExplosao2);
                tempoExplosao2=null;
            
        }


}
//Função GAME OVER
function gameOver() {
	fimdejogo=true;
	musica.pause();
	somGameover.play();
	
	window.clearInterval(jogo.timer);
	jogo.timer=null;
	
	$("#jogador").remove();
	$("#inimigo1").remove();
	$("#inimigo2").remove();
	$("#amigo").remove();
	
	$("#fundoGame").append("<div id='fim'></div>");
	
	$("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h4>Jogar Novamente</h4></div>");
	} // Fim da função gameOver();

}
//Reinicia o Jogo
		
function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	start();
	
} //Fim da função reiniciaJogo

