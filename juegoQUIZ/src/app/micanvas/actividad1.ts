
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
    private window1:Window;
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

    /**
     * OJO!! AUNQUE EN ESTE EJEMPLO SE USE EL PANEL, ES OBLIGATORIO CREAR UN OBJETO WINDOW EN EL MILIB, Y AGREGARLE EL BOTON
     * DE SALIR EN LA ESQUINA COMO SALE EN EL LA PAGINA WEB. HABRA QUE QUITAR EL PANEL Y USAR WINDOW
     */
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

        this.btnFin = new Button(this.motor,this.imagenFondo.w*0.7,this.btnContinuar.y+100,this.imagenQuiz.w/4,100);
        this.btnFin.setTexto("Salir");
        this.btnFin.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imagenQuiz,this.btnFin);

        
        
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
            ["Margo.","Agnes.","Lucy.","Patricia"]
        ];

        this.arrResOk = [0,3,2,0,0];
        this.indice=0;
        
        this.window1= new Window(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.motor.addViewToParentView(this.imagenFondo,this.window1);
        this.window1.btnSalir.setListener(this);

        this.lblPregunta = new Label (this.motor,DataHolder.instance.nScreenWidth*0.1,DataHolder.instance.nScreenHeight*0.2,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.lblPregunta.setColor("red");
        this.lblPregunta.setTexto("Pregunta");
        this.motor.addViewToParentView(this.window1,this.lblPregunta);

        this.btn1 = new Button(this.motor,DataHolder.instance.nScreenWidth*0.1,DataHolder.instance.nScreenHeight*0.4,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.btn1.setTexto("Respuesta 1");
        this.btn1.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.window1,this.btn1);

        this.btn2 = new Button(this.motor,DataHolder.instance.nScreenWidth*0.1,DataHolder.instance.nScreenHeight*0.5,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.btn2.setTexto("Respuesta 2");
        this.btn2.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.window1,this.btn2);

        this.btn3 = new Button(this.motor,DataHolder.instance.nScreenWidth*0.1,DataHolder.instance.nScreenHeight*0.6,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.btn3.setTexto("Respuesta 3");
        this.btn3.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.window1,this.btn3);

        this.btn4 = new Button(this.motor,DataHolder.instance.nScreenWidth*0.1,DataHolder.instance.nScreenHeight*0.7,DataHolder.instance.nScreenWidth>>1,DataHolder.instance.nScreenHeight>>4);
        this.btn4.setTexto("Respuesta 4");
        this.btn4.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.window1,this.btn4);

    }


    screenSizeChanged?(vWidth:number,vHeight:number):void{
        console.log("SE HA ACTUALIZADO EL TEMAÑO DE LA PANTALLA");
      }

      buttonListenerOnClick?(btn:Button):void{
          if (this.btnEmpezar==btn) {
            this.motor.setViewVisibility(this.imagenQuiz.uid,false);
            this.motor.setViewVisibility(this.window1.uid,true);
            for(var i = 0; i <= this.indice; i++){
                this.lblPregunta.setTexto(this.arrPr[i]);
                
                for(var f = 0; f < this.arrRes[i].length; f++){
                    console.log(this.arrRes[i][f]);
                    if (f==0) {
                        this.btn1.setTexto(this.arrRes[i][f]); 
                    }else if (f==1) {
                        this.btn2.setTexto(this.arrRes[i][f]);
                    } else if(f==2){
                        this.btn3.setTexto(this.arrRes[i][f]);
                    }else if(f==3){
                        this.btn4.setTexto(this.arrRes[i][f]);
                    }
                    
                }
                
             }
            
          }else if (this.window1.btnSalir=btn) {
            this.motor.setViewVisibility(this.imagenQuiz.uid,true);
            this.motor.setViewVisibility(this.window1.uid,false);
          }

      }
      
}