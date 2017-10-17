
import {Panel} from '../milib/views/panels/panel';
import {Button} from '../milib/views/buttons/button';
import {EventsAdmin,EventsAdminListener} from '../milib/events/eventsadmin';
import {DataHolder} from '../milib/dataholder/dataholder';
import {Motor} from '../milib/engines/motor';
import {Imagen} from '../milib/views/imgs/imagen';
import {Window} from '../milib/views/windows/window';


export class Actividad1 implements EventsAdminListener{

    private motor:Motor;
    private panelMenu:Panel;
    private panelJuego:Panel;
    private imagenFondo:Imagen;
    private btnEmpezar:Button;
    private btnContinuar:Button;
    private btnSalir:Button;
    private imagenQuiz:Imagen;
    private window1:Window;

    constructor(vMotor:Motor){
        this.motor=vMotor;
        this.imagenFondo=new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.imagenFondo.setImg('./assets/fondo-blanco.jpg');
        this.motor.setRaiz(this.imagenFondo);
        this.crearEscenarioMenu();
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

        this.btnEmpezar = new Button(this.motor,this.imagenQuiz.x+1000,200,this.imagenQuiz.w/4,100);
        this.btnEmpezar.setTexto("Empezar");
        this.btnEmpezar.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imagenQuiz,this.btnEmpezar);

        this.btnContinuar = new Button(this.motor,this.btnEmpezar.x,this.btnEmpezar.y+100,this.imagenQuiz.w/4,100);
        this.btnContinuar.setTexto("Continuar");
        this.btnContinuar.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imagenQuiz,this.btnContinuar);

        this.btnSalir = new Button(this.motor,this.btnEmpezar.x,this.btnContinuar.y+100,this.imagenQuiz.w/4,100);
        this.btnSalir.setTexto("Salir");
        this.btnSalir.setImagePath('./assets/botonMenu.png');
        this.motor.addViewToParentView(this.imagenQuiz,this.btnSalir);

        //this.motor.setViewVisibility(this.btnSalir.uid,false);
        
    }

    private crearEscenarioJuego():void{
        
        this.window1= new Window(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.motor.addViewToParentView(this.imagenQuiz,this.window1);
        
    }


    screenSizeChanged?(vWidth:number,vHeight:number):void{
        console.log("SE HA ACTUALIZADO EL TEMAÑO DE LA PANTALLA");
      }

}