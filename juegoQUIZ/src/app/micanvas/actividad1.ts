
import {Panel} from '../milib/views/panels/panel';
import {Label} from '../milib/views/labels/label';
import {Button,ButtonListener} from '../milib/views/buttons/button';
import {EventsAdmin,EventsAdminListener} from '../milib/events/eventsadmin';
import {DataHolder} from '../milib/dataholder/dataholder';
import {Motor} from '../milib/engines/motor';
import {Imagen} from '../milib/views/imgs/imagen';
import {Window} from '../milib/views/windows/window';


export class Actividad1 implements EventsAdminListener,ButtonListener{

    private motor:Motor;
    private panelMenu:Panel;
    private imagenFondo:Imagen;
    private btnEmpezar:Button;
    private btnContinuar:Button;
    private btnFin:Button;
    private imagenQuiz:Imagen;
    private imagenTrans:Imagen;
    private window1:Window;
    private wGanar:Imagen;
    private wPerder:Imagen;
    private lblPregunta:Label;
    private btn1:Button;
    private btn2:Button;
    private btn3:Button;
    private btn4:Button;

    private arrPr:Array<string>;
    private arrRes:Array<string[]>;
    private arrResOk:Array<number>;
    private indice:number;


    constructor(vMotor:Motor){
        this.motor=vMotor;
        this.imagenFondo=new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.imagenFondo.setImg('./assets/fondo-blanco.jpg');
        this.motor.setRaiz(this.imagenFondo);
        this.crearEscenarioMenu();
        this.crearEscenarioJuego();
    }

    private setTextPrRes():void{
        if(this.indice>=this.arrPr.length){
            this.crearEscenarioGanar();
        }else{
            this.lblPregunta.setTexto(this.arrPr[this.indice]);
            
            for(var f = 0; f < this.arrRes[this.indice].length; f++){
                console.log(this.arrRes[this.indice][f]);
                if (f==0) {
                    this.btn1.setTexto(this.arrRes[this.indice][f]); 
                }else if (f==1) {
                    this.btn2.setTexto(this.arrRes[this.indice][f]);
                } else if(f==2){
                    this.btn3.setTexto(this.arrRes[this.indice][f]);
                }else if(f==3){
                    this.btn4.setTexto(this.arrRes[this.indice][f]);
                }
            }  
        }
    }

    private crearEscenarioGanar():void{
        if(this.indice>=this.arrPr.length){
            this.window1.setImagePath('./assets/fVictoria.jpg');
            this.motor.setViewVisibility(this.imagenTrans.uid,false);
            this.crearEscenarioJuego();
            /*
            //---> VENTANA Ganar
            this.wGanar = new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
            this.motor.addViewToParentView(this.window1,this.wGanar);
            this.wGanar.setImg('./assets/fVictoria.jpg');
            this.motor.setViewVisibility(this.imagenTrans.uid,true);
            this.motor.setViewVisibility(this.wGanar.uid,true);
            */
        }
        
    }

    private crearEscenarioPerder():void{
        //---> VENTANA Perder
        this.wPerder = new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.wPerder.setImg('./assets/fGameOver.png');
        this.motor.addViewToParentView(this.window1,this.wPerder);
        this.motor.setViewVisibility(this.imagenTrans.uid,true);
        this.motor.setViewVisibility(this.wPerder.uid,true);
        //this.wGanar.btnSalir.setListener(this);
    }

    private crearEscenarioMenu():void{
        let pmw=DataHolder.instance.nScreenWidth*0.6;
        let pmh=DataHolder.instance.nScreenHeight*0.6;
        let pmx=DataHolder.instance.nScreenWidth2-(pmw>>1);
        let pmy=DataHolder.instance.nScreenHeight2-(pmh>>1);

        this.imagenQuiz=new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight);
        this.imagenQuiz.setImg('./assets/fondoQuiz.jpg');
        this.motor.addViewToParentView(this.imagenFondo,this.imagenQuiz);

        this.btnEmpezar = new Button(this.motor,this.imagenFondo.w*0.7,200,this.imagenQuiz.w/4,100);
        // this.btnEmpezar = new Button(this.motor,this.imagenQuiz.x+1000,200,this.imagenQuiz.w/4,100);
        this.btnEmpezar.setTexto("Empezar");
        this.btnEmpezar.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imagenQuiz,this.btnEmpezar);
        this.btnEmpezar.setListener(this);

        this.btnContinuar = new Button(this.motor,this.imagenFondo.w*0.7,this.btnEmpezar.y+100,this.imagenQuiz.w/4,100);
        this.btnContinuar.setTexto("Continuar");
        this.btnContinuar.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imagenQuiz,this.btnContinuar);
        this.btnContinuar.setListener(this);

        this.btnFin = new Button(this.motor,this.imagenFondo.w*0.7,this.btnContinuar.y+100,this.imagenQuiz.w/4,100);
        this.btnFin.setTexto("Salir");
        this.btnFin.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imagenQuiz,this.btnFin);
        this.btnFin.setListener(this);
         
    }

    private crearEscenarioJuego():void{

        this.arrPr = [
            "¿En qué película se dieron a conocer los Minions?",
            "Sabemos que son de color amarillo, pero... ¿qué otro color adoptan en una de las películas en las que salen?",
            "¿Cuál es su alimento favorito?",
            "Los Minions llevan todos gafas, pero... ¿qué otro complemento llevan?",
            "¿Cómo se llama la niña a la que uno de ellos le regala un juguete?"
        ];

        this.arrRes = [
            ["En “Gru, mi villano favorito”.","En “Gru, mi villano favorito 2”.","En “Los Minions”.","Los Mininos"],
            ["Rojo","Verde","Azul","Morado"],
            ["Las peras.","La pasta.","Las bananas.","Los limones"],
            ["Guantes negros.","No llevan ningún otro complemento.","Gorros azules.","Zapatos verdes"],
            ["Margo.","Agnes.","Lucy.","Patty"]
        ];

        this.arrResOk = [0,3,2,0,1];
        this.indice=0;
        
        //---> VENTANA Quiz
        this.window1= new Window(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.motor.addViewToParentView(this.imagenFondo,this.window1);
        this.window1.btnSalir.setListener(this);

        //---->Imagen sobre ventana para utilizar le window para ganar y perder
        this.imagenTrans =new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight);
        this.motor.addViewToParentView(this.window1,this.imagenTrans);

        //---> PREGUNTA
        this.lblPregunta = new Label (this.motor,DataHolder.instance.nScreenWidth*0.1,DataHolder.instance.nScreenHeight*0.2,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.lblPregunta.setColor("red");
        this.lblPregunta.setTexto("Pregunta");
        this.motor.addViewToParentView(this.imagenTrans,this.lblPregunta);

        //---> PRIMER respuesta
        this.btn1 = new Button(this.motor,DataHolder.instance.nScreenWidth*0.1,DataHolder.instance.nScreenHeight*0.4,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.btn1.setTexto("Respuesta 1");
        this.btn1.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imagenTrans,this.btn1);
        this.btn1.setListener(this);

        //---> SEGUNDO respuesta
        this.btn2 = new Button(this.motor,DataHolder.instance.nScreenWidth*0.1,DataHolder.instance.nScreenHeight*0.5,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.btn2.setTexto("Respuesta 2");
        this.btn2.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imagenTrans,this.btn2);
        this.btn2.setListener(this);

        //---> TERCERA respuesta
        this.btn3 = new Button(this.motor,DataHolder.instance.nScreenWidth*0.1,DataHolder.instance.nScreenHeight*0.6,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.btn3.setTexto("Respuesta 3");
        this.btn3.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imagenTrans,this.btn3);
        this.btn3.setListener(this);

        //---> CUARTA respuesta
        this.btn4 = new Button(this.motor,DataHolder.instance.nScreenWidth*0.1,DataHolder.instance.nScreenHeight*0.7,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.btn4.setTexto("Respuesta 4");
        this.btn4.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imagenTrans,this.btn4);
        this.btn4.setListener(this);

    }

    screenSizeChanged?(vWidth:number,vHeight:number):void{
        console.log("SE HA ACTUALIZADO EL TEMAÑO DE LA PANTALLA");
      }

      buttonListenerOnClick?(btn:Button):void{
          if (this.btnEmpezar==btn) {
            this.window1.setImagePath("./assets/fPreguntas.jpg");
            this.motor.setViewVisibility(this.imagenQuiz.uid,false);
            this.motor.setViewVisibility(this.window1.uid,true);
            
            this.setTextPrRes();
            console.log("-----------INDICE" + this.indice);
            
          }else if(this.btnContinuar==btn){
            this.motor.setViewVisibility(this.imagenQuiz.uid,false);
            this.motor.setViewVisibility(this.window1.uid,true);
            this.motor.setViewVisibility(this.imagenTrans.uid,true);
            this.setTextPrRes();

          }else if (this.window1.btnSalir==btn) {
            this.motor.setViewVisibility(this.imagenQuiz.uid,true);
            this.motor.setViewVisibility(this.window1.uid,false);
            this.motor.setViewVisibility(this.imagenTrans.uid,false);
            

          }else if (this.btn1==btn) {
              if (this.btn1.texto === this.arrRes[this.indice][this.arrResOk[this.indice]]) {
                this.indice=this.indice+1;
                this.setTextPrRes();
                
              }else{
                console.log("Fallaste");
                this.crearEscenarioPerder();
            
            }
            
          }else if (this.btn2==btn) {
            console.log("texto boton---" + this.btn2.texto);
            console.log("texto indice---" + this.arrRes[this.indice][this.arrResOk[this.indice]]);
            if (this.btn2.texto === this.arrRes[this.indice][this.arrResOk[this.indice]]) {
                this.indice=this.indice+1;
                this.setTextPrRes();
               
            }else{
                console.log("Fallaste");
                this.crearEscenarioPerder();
                
            }
          
        }else if (this.btn3==btn) {
            console.log("texto boton---" + this.btn3.texto);
            console.log("texto indice---" + this.arrRes[this.indice][this.arrResOk[this.indice]]);
            if (this.btn3.texto === this.arrRes[this.indice][this.arrResOk[this.indice]]) {
                this.indice=this.indice+1;
                this.setTextPrRes();
              
            }else{
                console.log("Fallaste");
                this.crearEscenarioPerder();
                
            }
        }else if (this.btn4==btn) {
            console.log("texto boton---" + this.btn4.texto);
            console.log("texto indice---" + this.arrRes[this.indice][this.arrResOk[this.indice]]);
            if (this.btn4.texto === this.arrRes[this.indice][this.arrResOk[this.indice]]) {
                this.indice=this.indice+1;
                this.setTextPrRes();
               
            }else{
                console.log("Fallaste");
                this.crearEscenarioPerder();
            }
        }
        
          
      }
      
}