import {View} from '../view';
import {Motor} from '../../engines/motor';
import {Imagen} from '../imgs/imagen';
import {Button,ButtonListener} from '../buttons/button';
import {DataHolder} from '../../dataholder/dataholder';
import {EventsAdmin,EventsAdminListener} from '../../events/eventsadmin';
 
export class Window extends View{
 
    private sColor:string='#FFFFFF';
    private imgBack:Imagen=null;
    public btnSalir:Button;
   
    constructor(vMotor:Motor, vX:number, vY:number, vW:number, vH:number){
        super(vMotor, vX, vY, vW, vH);
        this.imgBack=new Imagen(this.motor,vX,vY,vW,vH);
        this.motor.addViewToParentView(this,this.imgBack);
        //this.setImagePath("./assets/fPreguntas.jpg");
        this.btnSalir=new Button(this.motor,vW-(vW*0.05),0,vW*0.05,vH*0.05);
        this.btnSalir.setImagePath("./assets/botonMenu.png");
        this.btnSalir.setTexto("SALIR");  
        this.motor.addViewToParentView(this,this.btnSalir);
 
        EventsAdmin.instance.addMouseClickToView(this.btnSalir);

        this.blVisible=false;
 
    }
 
    public setColor(vsColor:string):void{
        this.sColor=vsColor;
    }
   
    paint(vctx:CanvasRenderingContext2D){
       
       
    }
 
    public setImagePath(vsPath:string):void{
        this.imgBack.setImg(vsPath);
    }
    public setSize(vWidth:number,vHeight:number):void{
        super.setSize(vWidth,vHeight);
        this.imgBack.setSize(vWidth,vHeight);
        //this.btnSalir.setSize(vWidth*0.05,vHeight*0.02);
        this.btnSalir.setPosition(vWidth-(vWidth*0.1),0);
    }
 
}