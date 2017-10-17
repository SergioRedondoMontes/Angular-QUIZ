import {View} from '../view';
import {Motor} from '../../engines/motor';
import {Imagen} from '../imgs/imagen';
import {Button} from '../buttons/button';
import {DataHolder} from '../../dataholder/dataholder';
import {EventsAdmin,EventsAdminListener} from '../../events/eventsadmin';
 
export class Window extends View{
 
    private sColor:string='#FFFFFF';
    private imgBack:Imagen=null;
    private btnSalir:Button;
   
    constructor(vMotor:Motor, vX:number, vY:number, vW:number, vH:number){
        super(vMotor, vX, vY, vW, vH);
        this.imgBack=new Imagen(this.motor,0,0,this.w,this.h);
        this.motor.addViewToParentView(this,this.imgBack);
 
        this.btnSalir=new Button(this.motor,DataHolder.instance.nScreenWidth-this.btnSalir.w,0,100,100);
        //this.btnSalir.setImagePath("./assets/imgSalir.png");
        this.btnSalir.setTexto("SALIR");  
        this.motor.addViewToParentView(this,this.btnSalir);
 
        EventsAdmin.instance.addMouseClickToView(this.btnSalir);
 
    }
 
    public setColor(vsColor:string):void{
        this.sColor=vsColor;
    }
   
    paint(vctx:CanvasRenderingContext2D){
       
       
    }
 
    public setImagePath(vsPath:string):void{
        this.imgBack.setImg(vsPath);
    }
 
 
}