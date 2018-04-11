// initialising the scene 
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY; 

//
var animatestart=0;
var fontHelvetick = null;
var fontGentilis = null;
var fontOptimer = null;
var disableImage = null;
var HORIZONTAL = "HORIZONTAL";
var VERTICAL = "VERTICAL";
const ALIGNTOP = 0;
const ALIGNBOTTOM = 1;
const ALIGNMIDDLE = 2;
const ALIGNLEFT = 0;
const ALIGNRIGHT = 1;
var text_load;
////
const colorMappingsResistance = {
	1: 0xf96363,
	2: 0xf9b862,
	3: 0xe4f962,
	4: 0x18a02e,
	5: 0x18a08d,
	6: 0x1872a0,
	7: 0x1632ce,
	8: 0x6e1587,
	9: 0x911429,
	10: 0x911458
};
const wireColor = 0xbcbcbc;

var geometry;
/******************** Text **********************/
function createMesh(geom, imageFile) {
       var texture = new THREE.TextureLoader().load(imageFile);
       PIErender();
       var mat = new THREE.MeshBasicMaterial();
       mat.map = texture;
       mat.transparent = true;
       mat.map.needsUpdate = true;
       var mesh = new THREE.Mesh(geom, mat);PIErender();
       PIErender();
       return mesh;

}
/****************** Resistance   ***********************/
function drawResistance(val,scale=false) {
		var resistanceO = new THREE.Group();
		var resistanceSphereEndG = new THREE.CircleGeometry(0.6, 6);
		var resistanceSphereEndM = new THREE.MeshBasicMaterial({ color: 0xDEB887 });
		var resistanceSphereEndO = new THREE.Mesh(resistanceSphereEndG, resistanceSphereEndM);
		resistanceSphereEndO.position.z += 0.00;

		var resistanceFlatG = new THREE.BoxGeometry(2, 0.6);
		var resistanceFlatM = new THREE.MeshBasicMaterial({ color: 0xDEB887 });
		var resistanceFlatO = new THREE.Mesh(resistanceFlatG, resistanceFlatM);

		// var resistanceWireG = new THREE.BoxGeometry(2, 0.15);
		// var resistanceWireM = new THREE.MeshBasicMaterial({ color: wireColor });
		// var resistanceWireO = new THREE.Mesh(resistanceWireG, resistanceWireM);
		// resistanceWireO.position.z -= 0.005;
		
		var resistanceSphereDup = resistanceSphereEndO.clone();
		//var resistanceWireDup = resistanceWireO.clone();

		resistanceSphereEndO.position.x = -1;
		resistanceSphereDup.position.x = 1;
		//resistanceWireO.position.x = -1;
		//resistanceWireDup.position.x = 1;

		resistanceO.add(resistanceFlatO);
		resistanceO.add(resistanceSphereDup);
		resistanceO.add(resistanceSphereEndO);
		//resistanceO.add(resistanceWireO);
		//resistanceO.add(resistanceWireDup);
		resistanceO.position.z = 0.0;
		console.log(val);
		
		resistanceO.scale.set(1.3,1.3,0);
		
		return resistanceO;
}
/****************************************/
class Pipes{
	constructor(type, params = {}){
		this.type = type;
		this.params = params;
		if(this.type == "HORIZONTAL"){
			let paramsTemp = {align: ALIGNTOP, color: 0xffffff, half: true, part: true, ended: false, leftE: true};
			for(const key of Object.keys(paramsTemp)){
				if(!params.hasOwnProperty(key)){
					params[key] = paramsTemp[key];
				}
			}
			this.object = this.horizontal();
		} else if(this.type == "VERTICAL") {
			let paramsTemp = {align: ALIGNLEFT, color: 0xffffff, half: true, part: true};
			for(const key of Object.keys(paramsTemp)){
				if(!params.hasOwnProperty(key)){
					params[key] = paramsTemp[key];
				}
			}
			this.object = this.vertical();
		}
	}

	get draw(){
		return this.object;
	}

	horizontal(){
		let align = this.params["align"];
		let color = this.params.color;
		let half = this.params.half;
		let leftPart = this.params.part;
		let ended = this.params.ended;
		let leftE = this.params.leftE;
		var pipeGeometry;
		let group = new THREE.Group();
		// let group = new 
		if(half == false){
			pipeGeometry = new THREE.PlaneGeometry(5, 0.1, 1, 1);
		} else {
			pipeGeometry = new THREE.PlaneGeometry(2.5, 0.1, 1, 1);
		}
		var pipeMaterial = new THREE.MeshBasicMaterial({color: color});
		var pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
		if(align == ALIGNTOP){
			pipe.position.y = 0.45;
		} else if(align == ALIGNBOTTOM){
			pipe.position.y = -0.45;
		} else if(align == ALIGNMIDDLE){
			pipe.position.y = 0.0;
		}
		if(half == true){
			if(leftPart == true){
				pipe.position.x = -0.225;
			} else {
				pipe.position.x = 0.225;
			}
		}
		if(ended == true){
			let circleG = new THREE.CircleGeometry(0.35, 20);
			let circleM = new THREE.MeshBasicMaterial({color: color});
			let circle = new THREE.Mesh(circleG, circleM);
			let text;
			// circle.position.y 
			if(leftE == true) {
				circle.position.x = -0.5;
				//text = drawText("A", color, 0.5, 0.001, fontHelvetick, 0.0, true);
				//text.position.x = -1.2;
			} else if(leftE == false) {
				circle.position.x = +0.5;
				//text = drawText("B", color, 0.5, 0.001, fontHelvetick, 0.0, true);
				//text.position.x = +0.8;
			}
			group.add(circle);
			//group.add(text);
		} 
		group.add(pipe)
		return group;
	}

	vertical(){
		let align = this.params.align;
		let color = this.params.color;
		let half = this.params.half;
		let topPart = this.params.part;
		var pipeGeometry;
		if(half == false){
			pipeGeometry = new THREE.PlaneGeometry(0.1, 5, 1, 1);
		} else {
			pipeGeometry = new THREE.PlaneGeometry(0.1, 2.5, 1, 1);
		}
		var pipeMaterial = new THREE.MeshBasicMaterial({color: color});
		var pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);
		if(align == ALIGNLEFT){
			pipe.position.x = -0.45;
		}else if(align == ALIGNRIGHT){
			pipe.position.x = 0.45;
		} else if(align == ALIGNMIDDLE){
			pipe.position.x = 0.0;
		}
		if(half == true){
			if(topPart == true){
				pipe.position.y = 0.225;
			}else{
				pipe.position.y = -0.225;
			}
		}
		return pipe;
	}
}

/*******************************************/
var startobsanimation=0;
var c=0;
var opresi1 = new THREE.Group;
var opresi2 = new THREE.Group;
var opresi3 = new THREE.Group;
function onMouseDown()
{
	PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);
    var intersects0 = PIEraycaster.intersectObjects(switchimage.children);
    if(intersects0.length>0)
    {
    	console.log("WTF");
    	swit.visible=false;
    	PIErender();
    	closedswit.visible=true;
    	PIErender();
    	
    	startobsanimation=1;
    var ty=	setInterval(function dummy() {
    		if(c==0)
    		{
    			arrowgroup0.visible=true;
    			PIErender();
    			document.getElementById("explain").innerHTML="<p>Here the current <i>I</i> splits into 3 parts.</p>";
    			c+=1;
    		}
    		else if(c==1)
    		{
    			arrowgroup0.visible=false;
    			arrowgroup1.visible=true;
    			PIErender();
    			document.getElementById("port1").innerHTML=" 2.5 A";
    	
    			document.getElementById("explain").innerHTML="<p>I<sub>1</sub>&nbsp;=&nbsp;V / R<sub>1</sub></p>";
    			c+=1;
    		}
    		else if(c==2)
    		{
    			arrowgroup1.visible=false;
    			arrowgroup2.visible=true;
    			PIErender();
    			document.getElementById("port2").innerHTML=" 1.67 A";
    	
    			document.getElementById("explain").innerHTML="<p>I<sub>2</sub>&nbsp;=&nbsp;V / R<sub>2</sub></p>";
    			c+=1;

    		}
    		else if(c==3)
    		{
    			arrowgroup2.visible=false;
    			arrowgroup3.visible=true;
    			PIErender();
    			document.getElementById("port3").innerHTML=" 0.83 A";
    			document.getElementById("explain").innerHTML="<p>I<sub>3</sub>&nbsp;=&nbsp;V / R<sub>3</sub></p>";
    			c+=1;

    		}
    		else if(c==4)
    		{
    			arrowgroup3.visible=false;
    			arrowgroup4.visible=true;
    			arrowgroup5.visible=true;
    			arrowgroup6.visible=true;
    			PIErender();
    			document.getElementById("explain").innerHTML="<b>Note: </b><br>Incoming current is equal to outgoing current at any point in the circuit.";
    			c+=1;

    		}
    		else
    		{
    			arrowgroup4.visible=false;
    			arrowgroup5.visible=false;
    			arrowgroup6.visible=false;
    			PIErender();
    			clearInterval(ty);
    		}

    		console.log("hello");
    	},2000);
    	document.getElementById("main").innerHTML="5 A";
    	
    	document.getElementById("table").style.display="block";
    	PIEstopAnimation();

    	PIErender();
    }
  	
  	

}
var optiongroup = new THREE.Group();
var resm=[];

function getresistancevaluesforgroup()
{
	var rm1=Math.floor((Math.random() * 10) + 1);
	var rm2=Math.floor((Math.random() * 10) + 1);
	var rm3=Math.floor((Math.random() * 10) + 1);
	resm[0]= ((rm1*rm2*rm3)/((rm1*rm2)+(rm1*rm3)+(rm2*rm3))).toFixed(2);
	resm[1]=(((rm1+1)*rm2*rm3)/(((rm1+1)*rm2)+((rm1+1)*rm3)+(rm2*rm3))).toFixed(2);
	resm[2]=(((rm1+2)*rm2*rm3)/(((rm1+2)*rm2)+((rm1+2)*rm3)+(rm2*rm3))).toFixed(2);
	var currm=(10/resm[0]).toFixed(2);
	document.getElementById("gmain").innerHTML=currm+"";
	document.getElementById("gr1").innerHTML=rm1+" ohm";
	document.getElementById("gr2").innerHTML=rm2+" ohm";
	document.getElementById("gr3").innerHTML=rm3+" ohm";
	document.getElementById("goption1").innerHTML="1} "+resm[1]+" ohm";
	document.getElementById("goption2").innerHTML="2} "+resm[0]+" ohm";
	document.getElementById("goption3").innerHTML="3} "+resm[2]+" ohm";




}

function createdivwithres()
{

		var geometry = new THREE.BoxGeometry( 10, 10, 0 );
		var material = new THREE.MeshBasicMaterial( {color: 0xF0F8FF} );
		cube = new THREE.Mesh( geometry, material );
		cube.position.set(-5,12,-0.1);
		optiongroup.add(cube);
		PIEaddElement(optiongroup);


	   	var opres1=drawResistance(10);
		opres1.position.x=-5;
		opres1.position.y=13.7;
		opres1.position.z=9;
		opresi1.add(opres1);
		PIErender();
		opres2=drawResistance(10);
		opres2.position.x=-5;
		opres2.position.y=10.7;
		opres2.position.z=9;
		opresi2.add(opres2);
		PIErender();
		opres3=drawResistance(10);
		opres3.position.x=-5;
		opres3.position.y=7.7;
		opres3.position.z=9;
		opresi3.add(opres3);
		PIErender();

		PIEaddElement(opresi1);
		PIEaddElement(opresi2);
		PIEaddElement(opresi3);



		var div = document.createElement("div");
	    div.style.position = "absolute";
	    div.style.top = "10%";
	    div.style.left = "38%";
	    div.style.color = "black";
	    div.style.height = "3%";
	    div.style.width = "8%";
	    div.style.zIndex = "100";
	    div.style.display = "block";
	    div.style.background = "transparent";
	    div.style.borderStyle = "none";
	    div.setAttribute('id', 'goption1');
	    document.body.appendChild(div);
		

		var div = document.createElement("div");
	    div.style.position = "absolute";
	    div.style.top = "18.5%";
	    div.style.left = "38%";
	    div.style.color = "black";
	    div.style.height = "3%";
	    div.style.width = "8%";
	    div.style.zIndex = "100";
	    div.style.display = "block";
	    div.style.background = "transparent";
	    div.style.borderStyle = "none";
	    div.setAttribute('id', 'goption2');
	    document.body.appendChild(div);

	    var div = document.createElement("div");
	    div.style.position = "absolute";
	    div.style.top = "27%";
	    div.style.left = "38%";
	    div.style.color = "black";
	    div.style.height = "3%";
	    div.style.width = "8%";
	    div.style.zIndex = "100";
	    div.style.display = "block";
	    div.style.background = "transparent";
	    div.style.borderStyle = "none";
	    div.setAttribute('id', 'goption3');
	    document.body.appendChild(div);
		PIEaddElement(optiongroup);

}

var count=0;
function showarrow()
{	
	


}
function animate()
{

}
var flag=1;
/*****************************************/
function initialiseControls()
{
	PIEaddInputCommand("Observation",function a1(){
	
		flag=0;
		document.getElementsByTagName('INPUT')[0].disabled=true;
		resetExperiment();
		text_load.visible=false;
		observation();
	});
	PIEaddInputCommand("Learn",function a1(){
		resetExperiment();
		text_load.visible=false;
		learning();
	});
	PIEaddInputCommand("Try",function a3(){
		resetExperiment();
		text_load.visible=false;
		trying();
	});
	PIEaddInputCommand("Analogy",function a1(){
		document.getElementsByTagName('INPUT')[0].disabled=true;
		resetExperiment();
		text_load.visible=false;
		wateranalogy();
		
		
	});
	PIEaddInputSlider("Answer",1,handleanswer,1,3,1);
	PIEaddInputSlider("Resistance",0,handlecurrent,0,10,1);

}
var text_let12;
var text_let11;
function handleanswer(value)
{
	if(value==2)
	{
		PIEremoveElement(text_let12);
		var materialFront = new THREE.MeshBasicMaterial( { color: 0xFFA500 } );
	    var materialSide = new THREE.MeshBasicMaterial( { color: 0xFFA500 } );
	    var materialArray = [ materialFront, materialSide ];
	    var loader = new THREE.FontLoader();

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry("CORRECT...!" , 
        {
            size: 2, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let11 = new THREE.Mesh(textGeom, textMaterial );
        text_let11.position.set(15,4,0.1);
        
        PIEaddElement(text_let11);
        PIErender();
        
    });
	}
	else
	{
		PIEremoveElement(text_let11);
		var materialFront = new THREE.MeshBasicMaterial( { color: 0xFFA500 } );
	    var materialSide = new THREE.MeshBasicMaterial( { color: 0xFFA500 } );
	    var materialArray = [ materialFront, materialSide ];
	    var loader = new THREE.FontLoader();

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry("WRONG...!" , 
        {
            size: 2, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let12 = new THREE.Mesh(textGeom, textMaterial );
        text_let12.position.set(15,4,0.1);
        
        PIEaddElement(text_let12);
        PIErender();
        
    });
	}
}

function handlecurrent(value)
{
	var checkproductof_two=(resist1*resist2)+(resist1*value)+(resist2*value);
	var checkproductof_three=(resist1*resist2*value);
	var p=0;
	var k=0;
	var resitance_resultant=(checkproductof_three/checkproductof_two).toFixed(2);
	var check_current1=10/resitance_resultant;
	var check_current=(check_current1.toFixed(2));
	document.getElementById("quesnmain").innerHTML=check_current;
	document.getElementById("RR").innerHTML="<b>"+resitance_resultant+" ohm</b>";
	if(check_current==current)
	{	
		texto="Perfect..!"
		console.log("Sucess");
		document.getElementById("req").innerHTML="R<sub>eq</sub> = "+resitance_resultant+" ohm";
		right(texto);
		var myVar=setInterval(function dummy1(){
			if(p<1)
			{
				correct.scale.set(p+2,p+2,0);
				PIErender();
				console.log("working");
				p+=1;
			}
			else
			{
				correct.visible=false;
				PIErender();
				clearInterval(myVar);
			}
		},1000);

		setInterval(function dummy2(){
			if(k==0)
			{
				console.log("GOOD MORNING");
				document.getElementById("a1").innerHTML="1/R<sub>eq</sub>  =";
				k+=1;
			}
			else if(k==1)
			{
				document.getElementById("a2").innerHTML="1/R<sub>1</sub>  + 1/R<sub>2</sub> +";
				k+=1;
			}
			else if(k==2)
			{
				document.getElementById("a3").innerHTML="1/R<sub>3</sub> ";
				k+=1;
			}
			else if(k==3)
			{
				dump="=                               "+"1/"+resist1+" + 1/"+resist2+" + 1/"+"R<sub>3</sub>";
				
				document.getElementById("a4").innerHTML=dump;
				k+=1;
			}
			else if(k==4)
			{
				
				var ff=(1/resitance_resultant).toFixed(2);
				document.getElementById("rest").innerHTML=""+ff+" = 1/"+resist1+" + 1/"+resist2+" + 1/R<sub>3</sub>";
				k+=1;
			}
			else if(k==5)
			{
				
				
				document.getElementById("restultcal").innerHTML="<p>R<sub>3</sub> &nbsp;= "+resist3+" ohm<p>";
				k+=1;
			}
		},1000);
	}
}
var obser = new THREE.Group();
var swit;
var closedswit;
var switchimage =  new THREE.Group();
var closedimage = new THREE.Group();
var arrow=[];
var arrowgroup0=new THREE.Group();
var arrowgroup1=new THREE.Group();
var arrowgroup2=new THREE.Group();
var arrowgroup3=new THREE.Group();
var arrowgroup4=new THREE.Group();
var arrowgroup5=new THREE.Group();
var arrowgroup6=new THREE.Group();

function getarrows()
{
	var dir = new THREE.Vector3( 1, 0, 0 );
    dir.normalize();
    var origin = new THREE.Vector3( -18,-0.8,0 );
    var length = 3;
    var hex = 0x000000;
    arrow[0]= new THREE.ArrowHelper( dir, origin, length, hex,headLength=0.7,headWidth=0.5);
    arrowgroup0.add(arrow[0]);
    PIErender();
    var geometry = new THREE.PlaneGeometry(0.1,3);     
    var material = new THREE.MeshBasicMaterial({ color: 0xFF4500, });
    var linein=new THREE.Mesh(geometry,material);
    linein.position.set(-16,3,0.1);
    arrowgroup1.add(linein);
    PIErender();
    var origin = new THREE.Vector3( -16,4.5,0 );
    var length = 3;
    var hex = 0x000000;
    arrow[1]= new THREE.ArrowHelper( dir, origin, length, hex,headLength=0.7,headWidth=0.5);
    arrowgroup1.add(arrow[1]);
    PIErender();
    var origin = new THREE.Vector3( -14,-0.8,0 );
    var length = 3;
    var hex = 0x000000;
    arrow[2]= new THREE.ArrowHelper( dir, origin, length, hex,headLength=0.7,headWidth=0.5);
    arrowgroup2.add(arrow[2]);
    PIErender();
	var geometry = new THREE.PlaneGeometry(0.1,3);     
    var material = new THREE.MeshBasicMaterial({ color: 0xFF4500, });
    var linein=new THREE.Mesh(geometry,material);
    linein.position.set(-16,-5.5,0.1);
    arrowgroup3.add(linein);
    PIErender();
    var origin = new THREE.Vector3( -16,-7,0 );
    var length = 3;
    var hex = 0x000000;
    arrow[3]= new THREE.ArrowHelper( dir, origin, length, hex,headLength=0.7,headWidth=0.5);
    arrowgroup3.add(arrow[3]);
    PIErender();


    var geometry = new THREE.PlaneGeometry(3,0.1);     
    var material = new THREE.MeshBasicMaterial({ color: 0xFF4500, });
    var linein=new THREE.Mesh(geometry,material);
    linein.position.set(5,5,0.1);
    arrowgroup4.add(linein);
    var dir = new THREE.Vector3( 0, -1, 0 );
    var origin = new THREE.Vector3( 6.5,5,0 );
    var length = 3;
    var hex = 0x000000;
    arrow[4]= new THREE.ArrowHelper( dir, origin, length, hex,headLength=0.7,headWidth=0.5);
    arrowgroup4.add(arrow[4]);
    PIErender();


    var dir = new THREE.Vector3( 1, 0, 0 );
    var origin = new THREE.Vector3( 2,-0.8,0 );
    var length = 3;
    var hex = 0x000000;
    arrow[5]= new THREE.ArrowHelper( dir, origin, length, hex,headLength=0.7,headWidth=0.5);
    arrowgroup5.add(arrow[5]);
    PIErender();
    var dir = new THREE.Vector3( 0, 1, 0 );
    var geometry = new THREE.PlaneGeometry(3,0.1);     
    var material = new THREE.MeshBasicMaterial({ color: 0xFF4500, });
    var linein=new THREE.Mesh(geometry,material);
    linein.position.set(5,-7.5,0.1);
    arrowgroup6.add(linein);
	var origin = new THREE.Vector3( 6.5,-7.5,0 );
    var length = 3;
    var hex = 0x000000;
    arrow[6]= new THREE.ArrowHelper( dir, origin, length, hex,headLength=0.7,headWidth=0.5);
    arrowgroup6.add(arrow[6]);

    PIErender();
    arrowgroup0.visible=false;
    arrowgroup1.visible=false;
    arrowgroup2.visible=false;
    arrowgroup3.visible=false;
    arrowgroup4.visible=false;
    arrowgroup5.visible=false;
    arrowgroup6.visible=false;

    PIErender();
    PIEaddElement(arrowgroup6);
    PIEaddElement(arrowgroup5);
    PIEaddElement(arrowgroup4);
    PIEaddElement(arrowgroup3);
    PIEaddElement(arrowgroup1);
    PIEaddElement(arrowgroup0);
    PIEaddElement(arrowgroup2);
    PIErender();
}
var group=new THREE.Group();


var groupclosedswit;
var grooupclosedimage = new THREE.Group();
var cube;
function trying()
{	
	
	createdivwithres();
	//

		var div = document.createElement("div");
	    div.style.position = "absolute";
	    div.style.top = "10%";
	    div.style.left = "14%";
	    div.style.color = "#8B4513";
	    div.style.height = "3%";
	    div.style.width = "20%";
	    div.style.zIndex = "100";
	    div.style.display = "block";
	    div.style.background = "transparent";
	    div.style.borderStyle = "none";
	    div.setAttribute('id', 'ganswer');
	    document.body.appendChild(div);
	    document.getElementById("ganswer").innerHTML="Choose option, Use Answer Slider in controls to answer (Reset to try again)";




		var div = document.createElement("div");
	    div.style.position = "absolute";
	    div.style.top = "40%";
	    div.style.left = "38%";
	    div.style.color = "black";
	    div.style.height = "3%";
	    div.style.width = "8%";
	    div.style.zIndex = "100";
	    div.style.display = "block";
	    div.style.background = "transparent";
	    div.style.borderStyle = "none";
	    div.setAttribute('id', 'gr1');
	    document.body.appendChild(div);

	    var div = document.createElement("div");
	    div.style.position = "absolute";
	    div.style.top = "52%";
	    div.style.left = "38%";
	    div.style.color = "black";
	    div.style.height = "2%";
	    div.style.width = "8%";
	    div.style.zIndex = "100";
	    div.style.display = "block";
	    div.style.background = "transparent";
	    div.style.borderStyle = "none";
	    div.setAttribute('id', 'gr2');
	    document.body.appendChild(div);
	    PIErender();
	    var div = document.createElement("div");
	    div.style.position = "absolute";
	    div.style.top = "64.7%";
	    div.style.left = "38%";
	    div.style.color = "black";
	    div.style.height = "2%";
	    div.style.width = "8%";
	    div.style.zIndex = "100";
	    div.style.display = "block";
	    div.style.background = "transparent";
	    div.style.borderStyle = "none";
	    div.setAttribute('id', 'gr3');
	    document.body.appendChild(div);
	    PIErender();




		var div = document.createElement("div");
	    div.style.position = "absolute";
	    div.style.top = "61%";
	    div.style.left = "18%";
	    div.style.color = "black";
	    div.style.height = "2%";
	    div.style.width = "4%";
	    div.style.zIndex = "100";
	    div.style.display = "block";
	    div.style.background = "transparent";
	    div.style.borderStyle = "none";
	    div.setAttribute('id', 'gvoltage');
	    document.body.appendChild(div);
	    document.getElementById("gvoltage").innerHTML="10 V";


	    //raju

	    var div = document.createElement("div");
	    div.style.position = "absolute";
	    div.style.top = "51.5%";
	    div.style.left = "20%";
	    div.style.color = "blue";
	    div.style.height = "2.5%";
	    div.style.width = "3%";
	    div.style.textAlign = "center";
	    div.style.zIndex = "100";
	    div.style.display = "block";
	    div.style.background = "#fff";
	    div.style.border = "2px solid";
	    div.setAttribute('id', 'gmain');
	    document.body.appendChild(div);

	    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: true, part: false}).draw;
		part1.position.x=0;
	    part1.position.y=3.7;
	    group.add(part1);
	    PIErender();

	    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: true, part: false}).draw;
		part1.position.x=0;
	    part1.position.y=-1.2;
	    group.add(part1);
	    PIErender();

	    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: true, part: false}).draw;
		part1.position.x=0;
	    part1.position.y=-6.2;
	    group.add(part1);
	    PIErender();
		


	//



	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-25.5;
    part1.position.y=-1.2;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-26.5;
    part1.position.y=-2.4;
    group.add(part1);
    PIErender();
  	var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-26.5;
    part1.position.y=-9;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-25.5;
    part1.position.y=-11.5;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-21.5;
    part1.position.y=-11.5;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-16.5;
    part1.position.y=-11.5;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-12.5;
    part1.position.y=-11.5;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-8.5;
    part1.position.y=-11.5;
    group.add(part1);
    PIErender();


    // var geometry = new THREE.PlaneGeometry(5,5);
    // groupswit = createMesh(geometry,"switch.png");
    // groupswit.position.set(-4.5, -11, 0.1);
    // groupswit.visible=true;
   	// groupswitchimage.add(groupswit);
   	// PIEaddElement(groupswitchimage);
   	// PIErender();

   	var geometry = new THREE.PlaneGeometry(5,5);
    groupclosedswit = createMesh(geometry,"closed.png");
    groupclosedswit.position.set(-4.5, -11.5, 0.1);
    
   	grooupclosedimage.add(groupclosedswit);
   	PIEaddElement(grooupclosedimage);
   	PIErender();


    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-0.5;
    part1.position.y=-11.5;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=3.5;
    part1.position.y=-11.5;
    group.add(part1);
    PIErender();
     var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=7.5;
    part1.position.y=-11.5;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=10;
    part1.position.y=-3.6;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=10;
    part1.position.y=-7.5;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=10;
    part1.position.y=-10.2;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false,ended: true}).draw;
	part1.position.x=7.6;
    part1.position.y=-1.2;
    group.add(part1);
    PIErender();


	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: true, part: false, ended: true}).draw;
	part1.position.x=-23;
    part1.position.y=-1.2;
    group.add(part1);
    PIErender();


    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-17;
    part1.position.y=-1.2;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-14.5;
    part1.position.y=0;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-14.5;
    part1.position.y=2.5;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-12;
    part1.position.y=3.7;
    group.add(part1);
    PIErender();
    var res1=drawResistance(10);
	res1.position.x=-7.5;
	res1.position.y=3.7;
	group.add(res1);
	PIErender();
	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-3;
    part1.position.y=3.7;
    group.add(part1);
    PIErender();

    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=3;
    part1.position.y=3.7;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=5.5;
    part1.position.y=2.5;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=5.5;
    part1.position.y=0;
    group.add(part1);
    PIErender();

    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-12;
    part1.position.y=-1.2;
    group.add(part1);
    var res1=drawResistance(10);
	res1.position.x=-7.5;
	res1.position.y=-1.2;
	group.add(res1);
	PIErender();
	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-3;
    part1.position.y=-1.2;
    group.add(part1);
    PIErender();

    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=3;
    part1.position.y=-1.2;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-14.5;
    part1.position.y=-2.5;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-14.5;
    part1.position.y=-5;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-12;
    part1.position.y=-6.2;
    group.add(part1);
    PIErender();
    var res1=drawResistance(10);
	res1.position.x=-7.5;
	res1.position.y=-6.2;
	group.add(res1);
	PIErender();
	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-3;
    part1.position.y=-6.2;
    group.add(part1);
    PIErender();

    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=3;
    part1.position.y=-6.2;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=5.5;
    part1.position.y=-2.5;
    group.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=5.5;
    part1.position.y=-5;
    group.add(part1);
    PIErender();

     var geometry = new THREE.PlaneGeometry(5,5);
    battery = createMesh(geometry,"1.png");
    battery.position.set(-26.5, -5, 0.1);
   
    group.add(battery);
    PIErender();





    PIEaddElement(group);
    getresistancevaluesforgroup();
    PIEstartAnimation();
    PIEstopAnimation();
    PIErender();
}
function observation()
{
	getarrows();

    
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "61%";
    div.style.left = "18%";
    div.style.color = "black";
    div.style.height = "2%";
    div.style.width = "4%";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "transparent";
    div.style.borderStyle = "none";
    div.setAttribute('id', 'voltage');
    document.body.appendChild(div);

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "41%";
    div.style.left = "67%";
    div.style.color = "#800000";
    div.style.height = "20%";
    div.style.width = "30%";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "#F0F8FF";
    div.style.borderStyle = "none";
    div.style.fontSize="25px";
    div.setAttribute('id', 'explain');
    document.body.appendChild(div);
    document.getElementById("voltage").innerHTML="10 V";

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "40%";
    div.style.left = "38%";
    div.style.color = "black";
    div.style.height = "3%";
    div.style.width = "8%";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "transparent";
    div.style.borderStyle = "none";
    div.setAttribute('id', 'R1');
    document.body.appendChild(div);

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "52%";
    div.style.left = "38%";
    div.style.color = "black";
    div.style.height = "2%";
    div.style.width = "8%";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "transparent";
    div.style.borderStyle = "none";
    div.setAttribute('id', 'R2');
    document.body.appendChild(div);
    PIErender();
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "64.7%";
    div.style.left = "38%";
    div.style.color = "black";
    div.style.height = "2%";
    div.style.width = "8%";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "transparent";
    div.style.borderStyle = "none";
    div.setAttribute('id', 'R3');
    document.body.appendChild(div);
    PIErender();
	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-25.5;
    part1.position.y=-1.2;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-26.5;
    part1.position.y=-2.4;
    obser.add(part1);
    PIErender();
  	var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-26.5;
    part1.position.y=-9;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-25.5;
    part1.position.y=-11.5;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-21.5;
    part1.position.y=-11.5;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-16.5;
    part1.position.y=-11.5;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-12.5;
    part1.position.y=-11.5;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-8.5;
    part1.position.y=-11.5;
    obser.add(part1);
    PIErender();

 //    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	// part1.position.x=-4.5;
 //    part1.position.y=-11.5;
 //    obser.add(part1);

 	var geometry = new THREE.PlaneGeometry(5,5);
    swit = createMesh(geometry,"switch.png");
    swit.position.set(-4.5, -11, 0.1);
    swit.visible=true;
   	switchimage.add(swit);
   	PIEaddElement(switchimage);
   	PIErender();

   	var geometry = new THREE.PlaneGeometry(5,5);
    closedswit = createMesh(geometry,"closed.png");
    closedswit.position.set(-4.5, -11.5, 0.1);
    closedswit.visible=false;
   	closedimage.add(closedswit);
   	PIEaddElement(closedimage);
   	PIErender();


    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-0.5;
    part1.position.y=-11.5;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=3.5;
    part1.position.y=-11.5;
    obser.add(part1);
    PIErender();
     var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=7.5;
    part1.position.y=-11.5;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=10;
    part1.position.y=-3.6;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=10;
    part1.position.y=-7.5;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=10;
    part1.position.y=-10.2;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false,ended: true}).draw;
	part1.position.x=7.6;
    part1.position.y=-1.2;
    obser.add(part1);
    PIErender();


	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: true, part: false, ended: true}).draw;
	part1.position.x=-23;
    part1.position.y=-1.2;
    obser.add(part1);
    PIErender();
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "51.5%";
    div.style.left = "20%";
    div.style.color = "blue";
    div.style.height = "2.5%";
    div.style.width = "3%";
    div.style.textAlign = "center";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "#fff";
    div.style.border = "2px solid";
    div.setAttribute('id', 'main');
    document.body.appendChild(div);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-17;
    part1.position.y=-1.2;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-14.5;
    part1.position.y=0;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-14.5;
    part1.position.y=2.5;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-12;
    part1.position.y=3.7;
    obser.add(part1);
    PIErender();
    var res1=drawResistance(10);
	res1.position.x=-7.5;
	res1.position.y=3.7;
	obser.add(res1);
	PIErender();
	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-3;
    part1.position.y=3.7;
    obser.add(part1);
    PIErender();
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "39.5%";
    div.style.left = "49%";
    div.style.color = "blue";
    div.style.height = "2.5%";
    div.style.width = "4%";
    //div.style.textAlign = "center";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "#fff";
    div.style.border = "2px solid";
    div.setAttribute('id', 'port1');
    document.body.appendChild(div); //......
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=3;
    part1.position.y=3.7;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=5.5;
    part1.position.y=2.5;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=5.5;
    part1.position.y=0;
    obser.add(part1);
    PIErender();

    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-12;
    part1.position.y=-1.2;
    obser.add(part1);
    var res1=drawResistance(10);
	res1.position.x=-7.5;
	res1.position.y=-1.2;
	obser.add(res1);
	PIErender();
	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-3;
    part1.position.y=-1.2;
    obser.add(part1);
    PIErender();
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "51.5%";
    div.style.left = "49%";
    div.style.color = "blue";
    div.style.height = "2.5%";
    div.style.width = "4%";
   //div.style.textAlign = "center";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "#fff";
    div.style.border = "2px solid";
    div.setAttribute('id', 'port2');
    document.body.appendChild(div);//////..........
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=3;
    part1.position.y=-1.2;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-14.5;
    part1.position.y=-2.5;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-14.5;
    part1.position.y=-5;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-12;
    part1.position.y=-6.2;
    obser.add(part1);
    PIErender();
    var res1=drawResistance(10);
	res1.position.x=-7.5;
	res1.position.y=-6.2;
	obser.add(res1);
	PIErender();
	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-3;
    part1.position.y=-6.2;
    obser.add(part1);
    PIErender();

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "63.8%";
    div.style.left = "49%";
    div.style.color = "blue";
    div.style.height = "2.5%";
    div.style.width = "4%";
    //div.style.textAlign = "center";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "#fff";
    div.style.border = "2px solid";
    div.setAttribute('id', 'port3');
    document.body.appendChild(div);
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=3;
    part1.position.y=-6.2;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=5.5;
    part1.position.y=-2.5;
    obser.add(part1);
    PIErender();
    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=5.5;
    part1.position.y=-5;
    obser.add(part1);
    PIErender();
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "5%";
    div.style.left = "3%";
    div.style.color = "#006400";
    div.style.height = "40%";
    div.style.width = "20%";
    div.style.textAlign = "center";
    div.style.zIndex = "100";
    div.style.display = "none";
    div.style.background = "#F0F8FF";
    div.style.border = "2px solid";
    div.setAttribute('id', 'table');
    div.innerHTML = "<h1>OBS. Table</h1><p>R<sub>1</sub>&nbsp;= 4</p><p>R<sub>2</sub>&nbsp;= 6</p><p>R<sub>3</sub>&nbsp;= 12</p><p>I<sub>1</sub>&nbsp;= 2.5</p><p>I<sub>2</sub>&nbsp;= 1.67</p><p>I<sub>3</sub>&nbsp;= 0.83</p><p>I&nbsp;=&nbsp;I<sub>1</sub>+I<sub>2</sub>+I<sub>3</sub>&nbsp;= 5</p>"
    document.body.appendChild(div);


    var geometry = new THREE.PlaneGeometry(5,5);
    battery = createMesh(geometry,"1.png");
    battery.position.set(-26.5, -5, 0.1);
   
    obser.add(battery);
    PIErender();
   // PIEstartAnimation();

   
    //PIEstopAnimation();
    

    document.getElementById("R1").innerHTML="<b>4 ohm<b>";
  	document.getElementById("R2").innerHTML="<b>6 ohm<b>";
	document.getElementById("R3").innerHTML="<b>12 ohm<b>";
	

    PIErender();
    PIEaddElement(obser);
    PIEstartAnimation();
}
var resist1;
var resist2;
var resist3;
var current;
var equivalent_resistance;
function calculateresistance()
{	
	resist1=Math.floor((Math.random() * 10) + 1);
	resist2=Math.floor((Math.random() * 10) + 1);
	resist3=Math.floor((Math.random() * 10) + 1);
	var productoftwo=(resist1*resist2)+(resist1*resist3)+(resist2*resist3);
	var productofthree=(resist1*resist2*resist3);
	var equires=(productofthree/productoftwo).toFixed(2);
	var current_in_decimal=(10)/equires;
	equivalent_resistance=(productoftwo/productofthree);
	current=(current_in_decimal.toFixed(2));
	document.getElementById("learnmain").innerHTML=current;
	console.log(current);
}
var learn = new THREE.Group();
var learnmaing = new THREE.Group();
var lques = new THREE.Group();
function divlearn()
{
	


	var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "55%";
    div.style.left = "55%";
    div.style.color = "#A52A2A";
    div.style.height = "5%";
    div.style.width = "35%";
    div.style.zIndex = "100";
    div.style.fontsize="10px";
    div.style.display = "block";
    
    div.style.background = "transparent";
    div.style.fontSize="25px";
    div.setAttribute('id', 'req');
    document.body.appendChild(div);

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "10%";
    div.style.left = "2%";
    div.style.color = "#006400";
    div.style.height = "5%";
    div.style.width = "35%";
    div.style.zIndex = "100";
    div.style.display = "block";
     div.style.background = "#F0F8FF";
    div.style.fontSize="15px";
    
    div.setAttribute('id', 'tempvoltdis');
    document.body.appendChild(div);
    document.getElementById('tempvoltdis').innerHTML="Both circuits are connected to 10 V battery.";


    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "5%";
    div.style.left = "2%";
    div.style.color = "#006400";
    div.style.height = "4%";
    div.style.width = "35%";
    div.style.zIndex = "100";
    div.style.fontsize="10px";
    div.style.display = "block";
    div.style.background = "#F0F8FF";
    div.style.fontSize="15px";
    div.setAttribute('id', 'learnpart1q');
    document.body.appendChild(div);
    document.getElementById("learnpart1q").innerHTML=" <marquee>Find the unknown Resistance...? Left Screen shows circuit with Equivalent resistance</marquee>";
	

    // var div = document.createElement("div");
    // div.style.position = "absolute";
    // div.style.top = "5%";
    // div.style.right = "13%";
    // div.style.color = "blue";
    // div.style.height = "5%";
    // div.style.width = "35%";
    // div.style.zIndex = "100";
    // div.style.fontsize="10px";
    // div.style.display = "block";
    // div.style.background = "blue";
    // div.style.fontSize="15px";
    // div.setAttribute('id', 'learnpart2q');
    // document.body.appendChild(div);


	var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "63%";
    div.style.left = "55%";
    div.style.color = "#A52A2A";
    div.style.height = "5%";
    div.style.width = "15%";
    div.style.zIndex = "100";
    
    div.style.display = "block";
    
    div.style.background = "transparent";
    div.style.fontSize="25px";
    div.setAttribute('id', 'a1');
    document.body.appendChild(div);

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "63%";
    div.style.left = "64%";
    div.style.color = "#A52A2A";
    div.style.height = "5%";
    div.style.width = "15%";
    div.style.zIndex = "100";
    div.style.display = "block";
    
    div.style.background = "transparent";
    div.style.fontSize="25px";
    div.setAttribute('id', 'a2');
    document.body.appendChild(div);

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "63%";
    div.style.left = "80%";
    div.style.color = "#A52A2A";
    div.style.height = "5%";
    div.style.width = "15%";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.fontSize="25px";
    
    div.style.background = "transparent";
    div.setAttribute('id', 'a3');
    document.body.appendChild(div);

    //
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "68%";
    div.style.left = "62%";
    div.style.color = "#A52A2A";
    div.style.height = "5%";
    div.style.width = "45%";
    div.style.zIndex = "100";
    div.style.display = "block";
     div.style.background = "transparent";
    div.style.fontSize="25px";
    
    div.setAttribute('id', 'a4');
    document.body.appendChild(div);


    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "74%";
    div.style.left = "55%";
    div.style.color = "#A52A2A";
    div.style.height = "5%";
    div.style.width = "45%";
    div.style.zIndex = "100";
    div.style.display = "block";
     div.style.background = "transparent";
    div.style.fontSize="25px";
    
    div.setAttribute('id', 'rest');
    document.body.appendChild(div);

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "77%";
    div.style.left = "59%";
    div.style.color = "#A52A2A";
    div.style.height = "5%";
    div.style.width = "45%";
    div.style.zIndex = "100";
    div.style.display = "block";
     div.style.background = "transparent";
    div.style.fontSize="25px";
    
    div.setAttribute('id', 'restultcal');
    document.body.appendChild(div);


    
}
function learning()
{
	
	var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
    var loader = new THREE.FontLoader();
    
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "43%";
    div.style.left = "74%";
    div.style.color = "black";
    div.style.height = "3%";
    div.style.width = "9%";
    //div.style.textAlign = "center";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.borderStyle = "#fff";
    div.style.background = "transparent";
    div.style.fontSize="13px";
    div.setAttribute('id', 'RR');

    document.body.appendChild(div);
    document.getElementById("RR").innerHTML="<label style='font-size:15px;text-align: center'><b>&nbsp;&nbsp;&nbsp;R<sub>eq</sub></b></label>";



	var geometry = new THREE.PlaneGeometry(0.18,40);     
    var material = new THREE.MeshBasicMaterial({ color: 0xFF4500, });
   var line=new THREE.Mesh(geometry,material);
    line.position.set(0,0,0.1);
    learnmaing.add(line);
    PIEaddElement(learnmaing);
    PIErender();
    
	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false,ended:true}).draw;
	part1.position.x=-32;
    part1.position.y=1.2;
    learn.add(part1);

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "42%";
    div.style.left = "8%";
    div.style.color = "blue";
    div.style.height = "3%";
    div.style.width = "3%";
    div.style.textAlign = "center";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "#fff";
    div.style.border = "1px solid";
    div.setAttribute('id', 'learnmain');
    document.body.appendChild(div);
    calculateresistance();
    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=-27.5;
    part1.position.y=1.2;
    learn.add(part1);

    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-26;
    part1.position.y=1.2;
    learn.add(part1);

    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-23.5;
    part1.position.y=3.7;
    learn.add(part1);

    var res1=drawResistance(10,true);
	res1.position.x=-19;
	res1.position.y=3.7;
	learn.add(res1);
	var texttoadd=resist1+" ohm";

	var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "30.2%";
    div.style.left = "21.3%";
    div.style.color = "black";
    div.style.height = "3%";
    div.style.width = "5%";
    div.style.textAlign = "center";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "transparent";
    div.style.borderStyle = "none";
    div.setAttribute('id', 're1');
    document.body.appendChild(div);
    document.getElementById("re1").innerHTML="<b>"+texttoadd+"</b>";
	

	
	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-14.5;
    part1.position.y=3.7;
    learn.add(part1);





	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-23.5;
    part1.position.y=1.2;
    learn.add(part1);

    var res1=drawResistance(10,true);
	res1.position.x=-19;
	res1.position.y=1.2;
	learn.add(res1);
	var texttoadd1=resist2+" ohm";
	// 
	var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "43.2%";
    div.style.left = "21.3%";
    div.style.color = "black";
    div.style.height = "3%";
    div.style.width = "5%";
    div.style.textAlign = "center";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "transparent";
    div.style.borderStyle = "none";
    div.setAttribute('id', 're2');
    document.body.appendChild(div);
    document.getElementById("re2").innerHTML="<b>"+texttoadd1+"</b>";



	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-14.5;
    part1.position.y=1.2;
    learn.add(part1);



	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-23.5;
    part1.position.y=-1.3;
    learn.add(part1);

    var res1=drawResistance(10,true);
	res1.position.x=-19;
	res1.position.y=-1.3;
	learn.add(res1);

	var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "55.8%";
    div.style.left = "21.3%";
    div.style.color = "black";
    div.style.height = "3%";
    div.style.width = "5%";
    div.style.textAlign = "center";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "transparent";
    div.style.borderStyle = "none";
    div.setAttribute('id', 're3');
    document.body.appendChild(div);
    document.getElementById("re3").innerHTML="<b>Unknown</b>";

	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-14.5;
    part1.position.y=-1.3;
    learn.add(part1);

    var part1 =new Pipes(VERTICAL, {align: ALIGNLEFT, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=-12;
    part1.position.y=1.2;
    learn.add(part1);

    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false,ended:true,leftE: false}).draw;
	part1.position.x=-10;
    part1.position.y=1.2;
    learn.add(part1);

    learn.scale.set(1,2,0);


    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false,ended:true,leftE: true}).draw;
	part1.position.x=8;
    part1.position.y=1.2;
    lques.add(part1);

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "42%";
    div.style.left = "64%";
    div.style.color = "blue";
    div.style.height = "3%";
    div.style.width = "3%";
    div.style.textAlign = "center";
    div.style.zIndex = "100";
    div.style.display = "block";
    div.style.background = "#fff";
    div.style.border = "1px solid";
    div.setAttribute('id', 'quesnmain');
    document.body.appendChild(div);

    var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false}).draw;
	part1.position.x=15;
    part1.position.y=1.2;
    lques.add(part1);

     var res1=drawResistance(10,true);
	res1.position.x=19.5;
	res1.position.y=1.2;
	lques.add(res1);

	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: true, part: false}).draw;
	part1.position.x=22.5;
    part1.position.y=1.2;
    lques.add(part1);

	var part1 =new Pipes(HORIZONTAL, {align: ALIGNMIDDLE, color: 0x0000000, half: false, part: false,ended:true,leftE: false}).draw;
	part1.position.x=26.4;
    part1.position.y=1.2;
    lques.add(part1);

    lques.scale.set(1,2,0);
    PIEaddElement(lques);
    PIEaddElement(learn);
    PIErender();
    divlearn();

}
var watertank0 =  new THREE.Group();
var wanalogy =  new THREE.Group();
var watertank1 =  new THREE.Group();
var watertank2 =  new THREE.Group();
var watertank3 =  new THREE.Group();
var resistor1;
var resistor2;
var resistor3;
var watering;
var water;
var water1;
var container = new THREE.Group();
var container1 = new THREE.Group();
var container2 = new THREE.Group();
var container3 = new THREE.Group();
var analogyarrow;
function wateranalogy()
{

	var geometry = new THREE.PlaneGeometry(1,3);     
    var material = new THREE.MeshBasicMaterial({ color: 0xFFD700, });
    var line=new THREE.Mesh(geometry,material);
    line.position.set(-2,6,6);
    wanalogy.add(line);
    PIErender();

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "21%";
    div.style.left = "5%";
    div.style.color = "blue";
    div.style.height = "15%";
    div.style.width = "25%";
    div.style.zIndex = "100";
    div.style.fontsize="10px";
    div.style.display = "block";
    div.style.background = "transparent";
    div.style.borderRadius="50%";
    div.style.fontSize="15px";
    div.setAttribute('id', 'analogydiv');
    document.body.appendChild(div);
    document.getElementById("analogydiv").innerHTML="<p>These are resistors which control the flow  of water in that direction</p>";
 	
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "81%";
    div.style.left = "25%";
    div.style.color = "blue";
    div.style.height = "5%";
    div.style.width = "45%";
    div.style.zIndex = "100";
    div.style.fontsize="10px";
    div.style.display = "block";
    div.style.background = "#F0F8FF";
    //div.style.borderRadius="50%";
    div.style.fontSize="15px";
    div.setAttribute('id', 'analogydiv1');
    document.body.appendChild(div);
    document.getElementById("analogydiv1").innerHTML="<p>&nbsp;&nbsp;&nbsp;Note: Observe water levels are different.</p>";
 	

    var dir = new THREE.Vector3( 0.5, -0.5, 0 );
    dir.normalize();
    var origin = new THREE.Vector3( -24.5,7.8,7 );
    var length = 5;
    var hex = 0xff0000;
    analogyarrow= new THREE.ArrowHelper( dir, origin, length, hex,headLength=0.7,headWidth=0.5);
    PIEaddElement(analogyarrow);
    PIErender();

    var geometry = new THREE.PlaneGeometry(40,1);     
    var material = new THREE.MeshBasicMaterial({ color: 0xFFD700, });
    var line=new THREE.Mesh(geometry,material);
    line.position.set(-2,4,6);
    wanalogy.add(line);
    PIErender();
    var geometry = new THREE.PlaneGeometry(1,6);     
    var material = new THREE.MeshBasicMaterial({ color: 0xFFD700, });
    var line=new THREE.Mesh(geometry,material);
    line.position.set(-22,1.5,6);
    wanalogy.add(line);
    PIErender();
    var geometry = new THREE.PlaneGeometry(1,6);     
    var material = new THREE.MeshBasicMaterial({ color: 0xFFD700, });
    var line=new THREE.Mesh(geometry,material);
    line.position.set(-2,1.5,6);
    wanalogy.add(line);
    PIErender();
    var geometry = new THREE.PlaneGeometry(1,6);     
    var material = new THREE.MeshBasicMaterial({ color: 0xFFD700, });
    var line=new THREE.Mesh(geometry,material);
    line.position.set(18,1.5,6);
    wanalogy.add(line);
    PIErender();




    	var containerGeo = new THREE.BoxGeometry (7, 7, 7);
	    container = new THREE.Mesh( containerGeo, new THREE.MeshBasicMaterial( {color: "#b6b6b6", side: THREE.DoubleSide} ));
	    container.rotation.x -= 0;
	    container.rotation.y -= Math.PI/6;
	    container.position.y += 4;
	    container.position.z += 5;
	    container.position.x += 3;
		var edges = new THREE.EdgesGeometry (containerGeo);
	    var line = new THREE.LineSegments (edges, new THREE.LineBasicMaterial( {color: 0x00}));
	    container.add(line);
	    var waterGeo = new THREE.BoxGeometry (7+0.05, 9*7/10, 7+0.1);
	    water = new THREE.Mesh (waterGeo, new THREE.MeshBasicMaterial({color: "#266bff"} ));
	    edges = new  THREE.EdgesGeometry(waterGeo);
	    line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( {color: 0x00}));
	    water.add(line);
	    water.position.y -= (7 - 9*7/10)/2;
	 	container.add(water);
		watertank0.add(container);
	    watertank0.position.set(-5,6,0.1);
	  	PIErender();
	    //



	 	var containerGeo = new THREE.BoxGeometry (7, 7, 7);
	    container1 = new THREE.Mesh( containerGeo, new THREE.MeshBasicMaterial( {color: "#b6b6b6", side: THREE.DoubleSide} ));
	    container1.rotation.x -= 0;
	    container1.rotation.y -= Math.PI/6;
	    container1.position.y += 4;
	    container1.position.z += 5;
	    container1.position.x += 3;
		var edges = new THREE.EdgesGeometry (containerGeo);
	    var line = new THREE.LineSegments (edges, new THREE.LineBasicMaterial( {color: 0x00}));
	    container1.add(line);
	    var waterGeo = new THREE.BoxGeometry (7+0.05, 0*7/10, 7+0.1);
	    water1 = new THREE.Mesh (waterGeo, new THREE.MeshBasicMaterial({color: "#266bff"} ));
	    edges = new  THREE.EdgesGeometry(waterGeo);
	    line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( {color: 0x00}));
	    water1.add(line);
	    water1.position.y -= (7 - 0*7/10)/2;
	   	container1.add(water1);
	    watertank1.add(container1);
	    watertank1.position.set(-25,-7,0.1);
	    
	    PIErender();


	    //
	    var containerGeo = new THREE.BoxGeometry (7, 7, 7);
	    container2 = new THREE.Mesh( containerGeo, new THREE.MeshBasicMaterial( {color: "#b6b6b6", side: THREE.DoubleSide} ));
	    container2.rotation.x -= 0;
	    container2.rotation.y -= Math.PI/6;
	    container2.position.y += 4;
	    container2.position.z += 5;
	    container2.position.x += 3;
		var edges = new THREE.EdgesGeometry (containerGeo);
	    var line = new THREE.LineSegments (edges, new THREE.LineBasicMaterial( {color: 0x00}));
	    container2.add(line);
	    var waterGeo = new THREE.BoxGeometry (7+0.05, 0*7/10, 7+0.1);
	    water2 = new THREE.Mesh (waterGeo, new THREE.MeshBasicMaterial({color: "#266bff"} ));
	    edges = new  THREE.EdgesGeometry(waterGeo);
	    line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( {color: 0x00}));
	    water2.add(line);
	    water2.position.y -= (7 - 0*7/10)/2;
	   	container2.add(water2);
	    watertank2.add(container2);
	    watertank2.position.set(-4,-7,0.1);
	    PIErender();
	    //
	    var containerGeo = new THREE.BoxGeometry (7, 7, 7);
	    container3 = new THREE.Mesh( containerGeo, new THREE.MeshBasicMaterial( {color: "#b6b6b6", side: THREE.DoubleSide} ));
	    container3.rotation.x -= 0;
	    container3.rotation.y -= Math.PI/6;
	    container3.position.y += 4;
	    container3.position.z += 5;
	    container3.position.x += 3;
		var edges = new THREE.EdgesGeometry (containerGeo);
	    var line = new THREE.LineSegments (edges, new THREE.LineBasicMaterial( {color: 0x00}));
	    container3.add(line);
	    var waterGeo = new THREE.BoxGeometry (7+0.05, 0*7/10, 7+0.1);
	    water3 = new THREE.Mesh (waterGeo, new THREE.MeshBasicMaterial({color: "#266bff"} ));
	    edges = new  THREE.EdgesGeometry(waterGeo);
	    line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( {color: 0x00}));
	    water3.add(line);
	    water3.position.y -= (7 - 0*7/10)/2;
	   	container3.add(water3);
	    watertank3.add(container3);
	    watertank3.position.set(16,-7,0.1);
	    PIErender();





	var resistorGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 16);
    resistor1 = new THREE.Mesh(resistorGeo, new THREE.MeshBasicMaterial({color: "#f90cba"}));
    resistor1.position.x += 0.85;
    resistor1.position.y += 3.65;
    resistor1.position.z += 8.2;
    resistor1.rotation.x -= Math.PI/6;
    resistor1.rotation.z += Math.PI/2;
	var edges = new THREE.EdgesGeometry(resistorGeo);
    var lines = new THREE.LineSegments(edges, new THREE.LineDashedMaterial({color: "#000000"}));
    resistor1.add(lines);
    resistor1.position.set(-1.5,3.2,20);
	wanalogy.add(resistor1);
	PIErender();

	var resistorGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 16);
    resistor1 = new THREE.Mesh(resistorGeo, new THREE.MeshBasicMaterial({color: "#f90cba"}));
    resistor1.position.x += 0.85;
    resistor1.position.y += 3.65;
    resistor1.position.z += 8.2;
    resistor1.rotation.x -= Math.PI/6;
    resistor1.rotation.z += Math.PI/2;
	var edges = new THREE.EdgesGeometry(resistorGeo);
    var lines = new THREE.LineSegments(edges, new THREE.LineDashedMaterial({color: "#000000"}));
    resistor1.add(lines);
    resistor1.position.set(-17,3.2,20);
	wanalogy.add(resistor1);
	PIErender();

	var resistorGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.8, 16);
    resistor1 = new THREE.Mesh(resistorGeo, new THREE.MeshBasicMaterial({color: "#f90cba"}));
    resistor1.position.x += 0.85;
    resistor1.position.y += 3.65;
    resistor1.position.z += 8.2;
    resistor1.rotation.x -= Math.PI/6;
    resistor1.rotation.z += Math.PI/2;
	var edges = new THREE.EdgesGeometry(resistorGeo);
    var lines = new THREE.LineSegments(edges, new THREE.LineDashedMaterial({color: "#000000"}));
    resistor1.add(lines);
    resistor1.position.set(14,3.2,20);
	wanalogy.add(resistor1);
	PIErender();




 	PIEaddElement(wanalogy);
	PIEaddElement(watertank0);
	PIEaddElement(watertank1);
	PIEaddElement(watertank2);
	PIEaddElement(watertank3);

	
	PIErender();
	animatestart=1;
	PIEstartAnimation();
}
var correct=new THREE.Group();
var text_let1 ;
function right(text)
{
	var materialFront = new THREE.MeshBasicMaterial( { color: 0xFFA500 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0xFFA500 } );
    var materialArray = [ materialFront, materialSide ];
    var loader = new THREE.FontLoader();

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry(text , 
        {
            size: 2, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
         text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-7,6,0.1);
        
        correct.add(text_let1);
        PIErender();
        
    });
   // correct.scale.set(3,3,0);
    PIEaddElement(correct);

}

function loadExperimentElements()
{
	
	initialiseControls();
	PIEsetExperimentTitle("Parallel resistance");
    PIEsetDeveloperName("Srini Akhil");
    PIEsetAreaOfInterest(-60,20,60,-20);
    initialiseHelp();
    initialiseInfo();
    PIEscene.background = new THREE.Color(0xffffff);
    document.addEventListener("mousedown", onMouseDown, false);
   	var materialFront = new THREE.MeshBasicMaterial( { color: 0x00FFFF} );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x00FFFF } );
    var materialArray = [ materialFront, materialSide ];
    var loader = new THREE.FontLoader();

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry("Resistance in parallel" , 
        {
            size: 4, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_load = new THREE.Mesh(textGeom, textMaterial );
        text_load.position.set(-25,0,0.1);
        text_load.visible=true;
       
        PIEaddElement(text_load);
        
        PIErender();
        
    });
   // correct.scale.set(3,3,0);
    
    

    PIErender();
    PIErender();

}

function resetExperiment()
{
	PIEremoveElement(obser);
	PIEremoveElement(closedimage);
	PIEremoveElement(switchimage);
	if(document.getElementById("R1"))
	{
	document.getElementById("R1").outerHTML="";
	}
	if(document.getElementById("R2"))
	{
	document.getElementById("R2").outerHTML="";
	}
	if(document.getElementById("R3"))
	{
	document.getElementById("R3").outerHTML="";
	}
	if(document.getElementById("voltage")){
	document.getElementById("voltage").outerHTML="";
	}
	if(document.getElementById("main"))
	{
	document.getElementById("main").outerHTML="";
	}
	if(document.getElementById("port1"))
	{
	document.getElementById("port1").outerHTML="";
	}
	if(document.getElementById("port2"))
	{
	document.getElementById("port2").outerHTML="";;
	}	
	if(document.getElementById("port3"))
	{
	document.getElementById("port3").outerHTML="";
	}
	if(document.getElementById("explain"))
	{
	document.getElementById("explain").outerHTML="";
	}
	if(document.getElementById("table"))
	{
	document.getElementById("table").outerHTML="";
	}
	PIEremoveElement(arrowgroup0);
	PIEremoveElement(arrowgroup1);
	PIEremoveElement(arrowgroup2);
	PIEremoveElement(arrowgroup3);
	PIEremoveElement(arrowgroup4);
	PIEremoveElement(arrowgroup5);
	PIEremoveElement(arrowgroup6);
	PIEremoveElement(wanalogy);
	PIEremoveElement(opresi1);
	PIEremoveElement(opresi2);
	PIEremoveElement(opresi3);
	PIEremoveElement(optiongroup);

	PIEremoveElement(watertank0);
	PIEremoveElement(watertank1);
	PIEremoveElement(watertank2);
	PIEremoveElement(watertank3);
	PIEremoveElement(analogyarrow);
	PIEremoveElement(learn);
	PIEremoveElement(lques);
	switchimage.remove(swit);
	closedimage.remove(closedswit);
	PIEremoveElement(switchimage);
	PIEremoveElement(closedimage);
	PIEremoveElement(learnmaing);
	PIEremoveElement(group);
	PIEremoveElement(grooupclosedimage);
	if(document.getElementById("a1")){
	document.getElementById("a1").outerHTML="";
}
if(document.getElementById("gr1")){
	document.getElementById("gr1").outerHTML="";
}
if(document.getElementById("ganswer")){
	document.getElementById("ganswer").outerHTML="";
}
if(document.getElementById("gr2")){
	document.getElementById("gr2").outerHTML="";
}
if(document.getElementById("gr3")){
	document.getElementById("gr3").outerHTML="";
}
if(document.getElementById("gmain")){
	document.getElementById("gmain").outerHTML="";
}
if(document.getElementById("goption1")){
	document.getElementById("goption1").outerHTML="";
}
if(document.getElementById("goption2")){
	document.getElementById("goption2").outerHTML="";
}
if(document.getElementById("goption3")){
	document.getElementById("goption3").outerHTML="";
}
if(document.getElementById("a2")){
	document.getElementById("a2").outerHTML="";
}
if(document.getElementById("a3")){
	document.getElementById("a3").outerHTML="";
}
if(document.getElementById("a4")){
	document.getElementById("a4").outerHTML="";
}
if(document.getElementById("gvoltage")){
	document.getElementById("gvoltage").outerHTML="";
}
if(document.getElementById("re1")){
	document.getElementById("re1").outerHTML="";
}
if(document.getElementById("re2")){
	document.getElementById("re2").outerHTML="";
}
if(document.getElementById("re3")){
	document.getElementById("re3").outerHTML="";
}
if(document.getElementById("RR")){
	document.getElementById("RR").outerHTML="";
}
if(document.getElementById("learnmain")){
	document.getElementById("learnmain").outerHTML="";
}
if(document.getElementById("quesnmain")){
	document.getElementById("quesnmain").outerHTML="";
}
if(document.getElementById("req")){
	document.getElementById("req").outerHTML="";
}
if(document.getElementById("tempvoltdis")){
	document.getElementById("tempvoltdis").outerHTML="";
}
if(document.getElementById("learnpart1q")){
	document.getElementById("learnpart1q").outerHTML="";
}
if(document.getElementById("restultcal")){
	document.getElementById("restultcal").outerHTML="";
}
if(document.getElementById("rest")){
	document.getElementById("rest").outerHTML="";
}
if(document.getElementById("analogydiv"))
{
	document.getElementById("analogydiv").outerHTML="";
}
if(document.getElementById("analogydiv1"))
{
	document.getElementById("analogydiv1").outerHTML="";
}
text_load.visible=true;
PIEremoveElement(text_let11);
PIEremoveElement(text_let12);
PIErender();



}
function waterLevelChange3(level) {

    var waterLevel = level;
    container3.remove(water3);
  	PIErender();
    console.log("I AM WORING");
    var waterGeo = new THREE.BoxGeometry (7+0.05, level*7/10, 7+0.1);
    water3 = new THREE.Mesh (waterGeo, new THREE.MeshBasicMaterial({color: "#266bff"} ));
    var edges = new  THREE.EdgesGeometry(waterGeo);
    var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( {color: 0x00}));
    water3.add(line);
    water3.position.y -= (7 - level*7/10)/2;
    container3.add(water3);
    PIErender();
    
    
}
function waterLevelChange2 (level) {

    var waterLevel = level;
    container2.remove(water2);
  	PIErender();
    console.log("I AM WORING");
    var waterGeo = new THREE.BoxGeometry (7+0.05, level*7/10, 7+0.1);
    water2 = new THREE.Mesh (waterGeo, new THREE.MeshBasicMaterial({color: "#266bff"} ));
    var edges = new  THREE.EdgesGeometry(waterGeo);
    var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( {color: 0x00}));
    water2.add(line);
    water2.position.y -= (7 - level*7/10)/2;
    container2.add(water2);
    PIErender();
   
    
}
function waterLevelChange1 (level) {

    var waterLevel = level;
    container1.remove(water1);
  	PIErender();
    console.log("I AM WORING");
    var waterGeo = new THREE.BoxGeometry (7+0.05, level*7/10, 7+0.1);
    water1 = new THREE.Mesh (waterGeo, new THREE.MeshBasicMaterial({color: "#266bff"} ));
    var edges = new  THREE.EdgesGeometry(waterGeo);
    var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( {color: 0x00}));
    water1.add(line);
    water1.position.y -= (7 - level*7/10)/2;
    container1.add(water1);
    PIErender();
    
    
}

function waterLevelChange (level) {

    var waterLevel = level;
    container.remove(water);
  	PIErender();
    console.log("I AM WORING");
    var waterGeo = new THREE.BoxGeometry (7+0.05, level*7/10, 7+0.1);
    water = new THREE.Mesh (waterGeo, new THREE.MeshBasicMaterial({color: "#266bff"} ));
    var edges = new  THREE.EdgesGeometry(waterGeo);
    var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( {color: 0x00}));
    water.add(line);
    water.position.y -= (7 - level*7/10)/2;
    container.add(water);
    PIErender();
    
    
}
var timeused=0;

var wl=9;
var wl1=0;
var wl2=0;
var wl3=0;


function updateExperimentElements(t, dt)
{ 
	if(animatestart)
	{
		timeused+=dt;

		if(timeused>500)
		{
			timeused=0;
			
			if(wl>0)
			{
				if(wl1<2 && wl2<3 && wl3<4)
				{
					waterLevelChange(wl-(3*0.5));
					wl-=1.5;
				}
				else if(wl1==2 && wl2<3 && wl3<4)
				{
					waterLevelChange(wl-(2*0.5));
					wl-=1;
				}
				else if(wl1<2 && wl2>3 && wl3<4)
				{
					waterLevelChange(wl-(2*0.5));
					wl-=1;
				}
				else if(wl1<2 && wl2<3 && wl3>4)
				{
					waterLevelChange(wl-(2*0.5));
					wl-=1;
				}
				else if(wl1>2 && wl2>3 && wl3<4)
				{
					waterLevelChange(wl-(1*0.5));
					wl-=0.5;
				}
				else if(wl1>2 && wl2<3 && wl3>4)
				{
					waterLevelChange(wl-(1*0.5));
					wl-=0.5;
				}
				else if(wl1<2 && wl2>3 && wl3>4)
				{
					waterLevelChange(wl-(1*0.5));
					wl-=0.5;
				}
				else if(wl1==2 && wl2==3 && wl3<4)
				{
					waterLevelChange(wl-(1*0.5));
					wl-=0.5;

				}
				
				if(wl1<2)
				{
				waterLevelChange1(wl1+0.5);
				wl1+=0.5;
				}
				if(wl2<3)
				{
					waterLevelChange2(wl2+0.5);
					wl2+=0.5;

				}
				if(wl3<4)
				{
					waterLevelChange3(wl3+0.5);
					wl3+=0.5;
				}
				
				if(wl==0 && wl1==2 && wl2==3 && wl3==4)
				{
					console.log("Party"+wl+wl1+wl2+wl3);
					animatestart=0;
					PIEstopAnimation();
				}
			}

		}
	}

}




var helpContent;
function initialiseHelp()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Resistances in parallel</h2>";
    infoContent = infoContent + "<h3>Controls</h3>";
    infoContent = infoContent + "<p> In learn phase, Use Resistance slider to set the unknown resistance value and see the calculations animation. To reset use inbuilt reset button besides start button at any point of experiment.  Happy Experimenting..!</p>";
   		infoContent = infoContent + "<p>In Try phase, Select the option number and use Answer slider to check if you have calculated correct or wrong</p>";
   		infoContent = infoContent + "<p>In observation phase, Click on switch to close the the circuit so, current flows and animation starts.</p>";
   	infoContent = infoContent + "<b><i>Use i Info to understand concepts.</i></b>";
    PIEupdateHelp(infoContent);

}

var infoContent;
function initialiseInfo()
{ 
    
    helpContent="";
    helpContent = helpContent + "<h2>Resistances in parallel</h2>";
    helpContent = helpContent + "<p>There are three phases in the given activity - </p>";
    helpContent = helpContent + "<p>1. Observation</p>";
    helpContent = helpContent + "<p>2. Learn</p>";
    helpContent = helpContent + "<p>3. Try</p>";
    helpContent = helpContent + "<p>4. Water Analogy</p>";
    helpContent = helpContent + "<h3><b>Observation</b></h3>";
    helpContent = helpContent + "<p>It shows how current divides in circuit with parallel resistances.</p>";
    helpContent = helpContent + "<p><h4>Formulae : </h4> I = I<sub>1</sub> + I<sub>2</sub> + I<sub>3</sub></p>";
    helpContent = helpContent + "<p> 1/R = 1/ R<sub>1</sub> + 1/ R<sub>2</sub> + 1/ R<sub>3 </sub></p>";
     helpContent = helpContent + "<h3><b>Learn</b></h3>";
      helpContent = helpContent + "<p>In this phase, student can choose the value of unknown resistance using slider till the ammeter in equivalent circuit shows same with other circuit on right. <br> And, then Equivalent resistance and calculation is showed.</p>";
    	helpContent = helpContent + "<h3><b>Try</b></h3>";
    	helpContent = helpContent + "<p>A circuit is showed with 3 resisatnces in parallel and options for equivalent resistance is given above, Calculate the equivalent resistance and choose correct option.</p>";
    	helpContent = helpContent + "<h3><b>Water Analogy</b></h3>";
    	helpContent = helpContent + "<p>We assume water as current and perform experiment.<br>The resistances control the flow of water. <br>We can observe the difference in levels of water and this is due to difference in resistances.<br>By same analogy, the current flows differently in different circuit wires based on values of resistances in that path.</p>";
    
    PIEupdateInfo(helpContent);

}
