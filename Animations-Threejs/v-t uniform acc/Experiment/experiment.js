var mySceneTLX;        
var mySceneTLY;        
var mySceneBRX;       
var mySceneBRY;        
var mySceneW;          
var mySceneH;          
var myCenterX;         
var myCenterY; 
var SceneTLX;
var SceneTLY;
var SceneBRX;
var SceneBRY;
var line;
//axis
var xaxis;
var yaxis;
var fun1;
var fun2;
var i;
var text_let1;
var mesh1=[];
///
var pointCircle=[];
var iold=0;
var j=0;
var squareD=[];
var circle=[];
///
var Initial_velocity=0;
var accn=0;
///
var car;

///animation variables
var animate;
var a_newtime;
var a_oldtime=0;
var a_acc;
var a_ivel;

///
var learnv= new THREE.Group();
var main = new THREE.Group();
var negpos = new THREE.Group();
var graphl = new THREE.Group();
var learn = new THREE.Group();
var fromallpos=0;
var fromposneg=0;
var question=new THREE.Group();
var line2;
var planex1;
var planex2;
var planex3;
var planex4;
var planex5;
////////

var globalans1=0;
var globalans2=0;
var globalans3=0;
/*************************Initialise functions*****************************************/

function initialiseOtherVariables()
{
    
     SceneTLX=-40;
    SceneTLY=20;
    SceneBRX=40;
   SceneBRY=-20;
    
    
}
function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = 0.0;
    mySceneTLY = 3.0;
    mySceneBRX = 4.0;
    mySceneBRY = 0.0
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;

}
function initialiseControls1()
{
	PIEaddInputSlider("Initial Velocity",0,handlev,-10,10,1);
	PIEaddInputSlider("Acceleration",0,handlea,-2,2,0.1);
}
function initialiseControls()
{
	PIEaddInputCommand("Learn",function d(){
		resetExperiment();
		learnphase();
		PIErender();
	});
	PIEaddInputSlider("Initial Velocity",0,handlev,-10,10,1);
	PIEaddInputSlider("Acceleration",0,handlea,-2,2,0.1);
	PIEaddInputCommand("Question",function efg(){
		resetExperiment();
		quest();
	});
    PIEaddDisplayCommand("Submit",function h(){
        if(globalans1==1 && globalans2==2 && globalans3==1 )
        {
            document.getElementById("res").style.display = "block"; 
        var res_info = "<h2>Hurray! You nailed it ...</h2><br>";
        res_info+="<p><h3>Notes:</h3><br>1. Yes it stops for infnitesimally small time before moving backward. <br></p>";
        res_info+="<p>2. Slope of graph is acceleration so if a is negative slope is also negative.<br></p>";
        res_info+="<p>3. Use formula v = u + a * t put v =0 .</p>";
        document.getElementById('res').innerHTML = res_info ;

        }
        else{
            document.getElementById("res").style.display = "block"; 
        var res_info = "<h2><br><br><br>Wrong answer... learn and try again..( </h2><br>";
        document.getElementById('res').innerHTML = res_info ;
        }
    });
	
}




/****************************Handle functions**************************************/
function handlev(value)
{
	Initial_velocity=value;
}
function handlea(value)
{
	accn=value;
	main.remove(line);
	PIErender();
	
	resetExperiment();
	PIErender();
	if(Initial_velocity>=0 && accn>0 || (Initial_velocity<=0 && accn<0))
	{
		PIEremoveElement(negpos);
		PIEaddElement(graphl);
		PIErender();

	}


	if(Initial_velocity>=0 && accn<0 || (Initial_velocity<=0 && accn>0))
	{
		PIEremoveElement(graphl);
		PIEaddElement(negpos);
		PIErender();

	}



	creategraph();
}
var plane1;
var plane2;
var plane3;
var plane0;
var line1;
var pointCircle1;
var learnanimation=0;
function learnphase()
{
	Initial_velocity=5;
	accn=1;
	
	var material = new THREE.LineBasicMaterial({color: 0x000000});
	var geometry = new THREE.Geometry();
    geometry.vertices.push(
	new THREE.Vector3( -25, 5+(Initial_velocity*0.4), 0 ),
	new THREE.Vector3( -5, 5+((Initial_velocity+(accn*10))*0.4), 0 ),
	
     );
    line1 = new THREE.Line( geometry, material );
	
    learn.add(line1);
    PIErender();
    animate=0;
    backanimate1=0;
    backanimate=0;
    animate1=0;


	iold=0;
	i=60;
	j=0;
	a_oldtime=(iold*0.1);
    a_newtime=(i*0.1);
    a_ivel=Initial_velocity;
    a_acc=accn;	

	var final=(Initial_velocity+((i*0.1)*accn))*0.4;
   
    var geometry = new THREE.CircleGeometry( 0.15, 32 );
   var  material = new THREE.MeshBasicMaterial( { color: 0xDAA520 } );
    pointCircle1= new THREE.Mesh( geometry, material );
    pointCircle1.position.set(-25+(i*0.2),5+final,0);
    learn.add(pointCircle1);
    PIErender();

	var heartShape = new THREE.Shape();
	
	heartShape.moveTo(-25,5+(Initial_velocity*0.4),0);
	heartShape.lineTo(-25+(i*0.2),5+final,0);
	heartShape.lineTo(-25+(i*0.2),5+(Initial_velocity*0.4),0);
	heartShape.lineTo(-25,5+(Initial_velocity*0.4),0);
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xDAA520 } );
	plane0 = new THREE.Mesh( geometry, material ) ;
	learn.add( plane0 );
	PIErender();

	var heartShape = new THREE.Shape();
	
	heartShape.moveTo(-25,5+(Initial_velocity*0.4),0);
	heartShape.lineTo(-25+(i*0.2),5+final,0);
	heartShape.lineTo(-25+(i*0.2),5+(Initial_velocity*0.4),0);
	heartShape.lineTo(-25,5+(Initial_velocity*0.4),0);
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xDAA520 } );
	plane1 = new THREE.Mesh( geometry, material ) ;
	learn.add( plane1 );
	PIErender();

	var heartShape = new THREE.Shape();
	heartShape.moveTo( -25, 5,0);
	heartShape.lineTo(-25,5+(Initial_velocity*0.4),0);
	heartShape.lineTo(-25+(i*0.2),5+(Initial_velocity*0.4),0);
	heartShape.lineTo(-25+(i*0.2),5,0);
	heartShape.lineTo(-25,5,0);
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xDAA520 } );
	plane2 = new THREE.Mesh( geometry, material ) ;
	learn.add( plane2 );
	
	PIErender();

	var heartShape = new THREE.Shape();
	heartShape.moveTo( -25, 5,0);
	heartShape.lineTo(-25,5+(Initial_velocity*0.4),0);
	heartShape.lineTo(-25+(i*0.2),5+(Initial_velocity*0.4),0);
	heartShape.lineTo(-25+(i*0.2),5,0);
	heartShape.lineTo(-25,5,0);
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xDAA520   } );
	plane3 = new THREE.Mesh( geometry, material ) ;
	learn.add( plane3 );
	PIEaddElement(learn);
	PIErender();
	PIEaddElement(graphl);
	PIErender();
	calculateforanimation();
	learnanimation=1;
	//drawarrow();
	PIEstartAnimation();

}
var hey1;
var hey2;
var yes;
var no;
function addtickwrong()
{
	
    PIErender();
    
    console.log("lolllllll");

}
var chyes;
var chno;
var chquestion1_yes=new THREE.Group();
var chquestion1_no=new THREE.Group();
var chquestion2_yes=new THREE.Group();
var chquestion2_no=new THREE.Group();
var chquestion3_yes=new THREE.Group();
var chquestion3_no=new THREE.Group();
var chyes2;
var chno2;
var chno1;
var chyes1;

function textchange()
{
    var materialFront = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " 1. YES", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        chyes = new THREE.Mesh(textGeom, textMaterial );
        chyes.position.set(10,6,0.1);
        
        
        chquestion1_yes.add(chyes);
        chquestion1_yes.visible=false;
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " 2. NO", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        chno = new THREE.Mesh(textGeom, textMaterial );
        chno.position.set(14,6,0.1);
        
        
        chquestion1_no.add(chno);
        chquestion1_no.visible=false;
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " 1. slope is positive", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        chyes1 = new THREE.Mesh(textGeom, textMaterial );
        chyes1.position.set(10,2,0.1);
        
        
        chquestion2_yes.add(chyes1);
        chquestion2_yes.visible=false;
        PIErender();
        
    });


    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " 2. slope is negative", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        chno1 = new THREE.Mesh(textGeom, textMaterial );
        chno1.position.set(20,2,0.1);
        
        
        chquestion2_no.add(chno1);
        chquestion2_no.visible=false;
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " 1. t = 5", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        chyes2 = new THREE.Mesh(textGeom, textMaterial );
        chyes2.position.set(10,-2,0.1);
        
        
        chquestion3_yes.add(chyes2);
        chquestion3_yes.visible=false;
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " 2. t = 6", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        chno2 = new THREE.Mesh(textGeom, textMaterial );
        chno2.position.set(15,-2,0.1);
        
        
        chquestion3_no.add(chno2);
        chquestion3_no.visible=false;
        PIErender();
        
    });




PIEaddElement(chquestion1_yes);
PIEaddElement(chquestion2_yes);
PIEaddElement(chquestion3_yes);
PIEaddElement(chquestion1_no);
PIEaddElement(chquestion2_no);
PIEaddElement(chquestion3_no);
    
            
}
var question1_yes=new THREE.Group();
var question1_no=new THREE.Group();
var question2_yes=new THREE.Group();
var question2_no=new THREE.Group();
var question3_yes=new THREE.Group();
var question3_no=new THREE.Group();
var yes2;
var no2;
var no1;
var yes1;
function addtesttoquest()
{
	addtickwrong();

	var materialFront = new THREE.MeshBasicMaterial( { color: 0x006400 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x006400 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    		


    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Q1) Does the car stop before moving backward? ", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(5,8,0.1);
        
        question.add(text_let);
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " 1. YES", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        yes = new THREE.Mesh(textGeom, textMaterial );
        yes.position.set(10,6,0.1);
        
        
        question1_yes.add(yes);
        question1_yes.visible=true;
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " 2. NO", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        no = new THREE.Mesh(textGeom, textMaterial );
        no.position.set(14,6,0.1);
        
        question1_no.add(no);
         question1_no.visible=true;
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Q2) If acceleration is negative what is slope of V-T graph?", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(5,4,0.1);
        
        
        question.add(text_let);
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " 1. slope is positive", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        yes1 = new THREE.Mesh(textGeom, textMaterial );
        yes1.position.set(10,2,0.1);
        
        
        question2_yes.add(yes1);
         question2_yes.visible=true;
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " 2. slope is negative", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        no1 = new THREE.Mesh(textGeom, textMaterial );
        no1.position.set(20,2,0.1);
        
        
        question2_no.add(no1);
        question2_no.visible=true;
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Q3) If a = -2 and u = 10 then time at which car changes direction?", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(5,0,0.1);
        
        
        question.add(text_let);
        PIErender();
        
    });


    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " 1. t = 5", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        yes2 = new THREE.Mesh(textGeom, textMaterial );
        yes2.position.set(10,-2,0.1);
        
        
        question3_yes.add(yes2);
        question3_yes.visible=true;
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " 2. t = 6", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var no2 = new THREE.Mesh(textGeom, textMaterial );
        no2.position.set(15,-2,0.1);
        
        
        question3_no.add(no2);
        question3_no.visible=true;
        PIErender();
        
    });




    PIEaddElement(question1_no);
    PIEaddElement(question1_yes);
    PIEaddElement(question2_no);
    PIEaddElement(question2_yes);
    PIEaddElement(question3_no);
    PIEaddElement(question3_yes);

    PIErender();
    
     
}

function quest()
{
	Initial_velocity=10;
	accn=-2;
	iold=0;
	i=99;
	a_oldtime=(iold*0.1);
    a_newtime=(i*0.1);
    a_ivel=Initial_velocity;
    a_acc=accn;	
	var material = new THREE.LineBasicMaterial({color: 0x000000});
	var geometry = new THREE.Geometry();
    geometry.vertices.push(
	new THREE.Vector3( -25, 5+(Initial_velocity*0.4), 0 ),
	new THREE.Vector3( -5, 5+((Initial_velocity+(accn*10))*0.4), 0 ),
	
     );
    line2 = new THREE.Line( geometry, material );
	
    question.add(line2);
    var final=(Initial_velocity+((i*0.1)*accn))*0.4;
    var heartShape = new THREE.Shape();
	heartShape.moveTo( -25, 5,0);
	heartShape.lineTo(-25,5+(Initial_velocity*0.4),0);
	heartShape.lineTo(-25+(-Initial_velocity/accn)*2,5,0);
	heartShape.lineTo(-25,5,0);
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xDAA520 } );
	hey1 = new THREE.Mesh( geometry, material ) ;
	question.add( hey1 );
	var heartShape = new THREE.Shape();
	heartShape.moveTo(-25+(-Initial_velocity/accn)*2,5,0);
	heartShape.lineTo(-25+(i*0.2),5,0);
	heartShape.lineTo(-25+(i*0.2),5+final,0);
	
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xDAA520 } );
	hey2 = new THREE.Mesh( geometry, material ) ;
	question.add( hey2 );

	PIErender();
	PIEaddElement(question);
	PIErender();
	PIEaddElement(negpos);
	addtesttoquest();
    textchange();
    calculateforanimation();
    PIEstartAnimation();
}
function creategraph()
{
	var material = new THREE.LineBasicMaterial({
    lineWidth:3,
	color: 0x8B008B
});
	var geometry = new THREE.Geometry();
geometry.vertices.push(
	new THREE.Vector3( -25, 5+(Initial_velocity*0.4), 0 ),
	new THREE.Vector3( -5, 5+((Initial_velocity+(accn*10))*0.4), 0 ),
	
);
    

    line = new THREE.Line( geometry, material );
	
    main.add(line);
    PIErender();

}
var arrowHelper;
var text_let;
function drawarrow()
{
	var materialFront = new THREE.MeshBasicMaterial( { color: 0x006400 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x006400 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Distance covered = Area of triangle ", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(8,3,0.1);
        
        learnv.add(text_let);
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " + ", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(13,11.5,0.1);
        
        learnv.add(text_let);
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Distance covered = Area of triangle ", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(8,3,0.1);
        
        learnv.add(text_let);
        PIErender();
        
    });
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "                           +  Area of rectangle ", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(9,1.5,0.1);
        
        learnv.add(text_let);
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "                            = (0.5 * 6 * 5) + (5 * 6)", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(9,0,0.1);
        
        learnv.add(text_let);
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "                            = 45 (Dist. travlled by car) ",
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(9,-1.5,0.1);
        
        learnv.add(text_let);
        PIErender();
        
    });



    PIEaddElement(learnv);

}
/********************************AXIS VALUES**************************************************/
function axisvalue()
{
    
    
    
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "          1     2      3     4      5     6      7     8      9     10       ", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26,4.15,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "0", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26,4.5,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "5", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26,7,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });

    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "10", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.5,9,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "15", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.5,11,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "20", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.5,13,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "25", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.5,15,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "30", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.5,17,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Y-axis (Velocity)", 
        {
            size: 0.4, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-28.5,18.15,0.1);
        
        main.add(text_let1);
        PIErender();
        

    });



     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "X-axis (Time)", 
        {
            size: 0.5, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-2,4,0.1);
        
        main.add(text_let1);
        PIErender();
        
        
    });



    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-5", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.3,2.5,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-10", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.6,0.5,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-15", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.6,-1.5,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-20", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.6,-3.5,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-25", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.6,-5.5,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-30", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.6,-7.5,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
}
/**********************************click function**************************************************************/
function createMesh(geom, imageFile) {
       var texture = new THREE.TextureLoader().load(imageFile);
       var mat = new THREE.MeshBasicMaterial();
       mat.map = texture;
       mat.transparent = true;
       mat.map.needsUpdate = true;
       var mesh = new THREE.Mesh(geom, mat);

       PIErender();
       return mesh;
}
var tick;
var wrong1;

function PIEmouseDown(event){

    xpoint = PIEmouseP.x;
    ypoint = PIEmouseP.y;

	event.preventDefault();
	console.log("yes"+"no"+xpoint+"     "+ypoint);
	console.log("i m in mousedown");

    PIEraycaster.setFromCamera(PIEmouseP,PIEcamera);
   var questray1yes = PIEraycaster.intersectObjects(question1_yes.children);
   console.log("RUMAD"+questray1yes);
    if(questray1yes.length > 0){
        question1_yes.visible=false;
        chquestion1_yes.visible=true;
        PIErender();
        globalans1=1;
        console.log("BOX1");
    }


    PIEraycaster.setFromCamera(PIEmouseP,PIEcamera);
   var questray2yes = PIEraycaster.intersectObjects(question2_yes.children);
   console.log("RUMAD"+questray1yes);
    if(questray2yes.length > 0){
        question2_yes.visible=false;
        chquestion2_yes.visible=true;
        PIErender();
        globalans2=1;
        console.log("BOX2");
    }

    

     PIEraycaster.setFromCamera(PIEmouseP,PIEcamera);
   var questray1no = PIEraycaster.intersectObjects(question1_no.children);
   console.log("RUMAD"+questray1yes);
    if(questray1no.length > 0){
        question1_no.visible=false;
        chquestion1_no.visible=true;
        PIErender();
        globalans1=2;
        console.log("BOX");
    }

     PIEraycaster.setFromCamera(PIEmouseP,PIEcamera);
   var questray2no = PIEraycaster.intersectObjects(question2_no.children);
   console.log("RUMAD"+questray1yes);
    if(questray2no.length > 0){
        question2_no.visible=false;
        chquestion2_no.visible=true;
        PIErender();
        globalans2=2;
        console.log("BOX");
    }

     PIEraycaster.setFromCamera(PIEmouseP,PIEcamera);
   var questray3yes = PIEraycaster.intersectObjects(question3_yes.children);
   console.log("RUMAD"+questray1yes);
    if(questray3yes.length > 0){
        question3_yes.visible=false;
        chquestion3_yes.visible=true;
        PIErender();
        globalans3=1;
        console.log("BOX2");
    }

    

     PIEraycaster.setFromCamera(PIEmouseP,PIEcamera);
   var questray3no = PIEraycaster.intersectObjects(question3_no.children);
   console.log("RUMAD"+questray1yes);
    if(questray3no.length > 0){
        question3_no.visible=false;
        chquestion3_no.visible=true;
        PIErender();
        globalans3=2;
        console.log("BOX");
    }
    


	// if(xpoint>0.271 && xpoint<0.345 && ypoint>0.26 && ypoint<0.285)
	// {
	// 	question.remove(wrong1);
	// 	var geometry = new THREE.BoxGeometry(3,3,0)
	//      tick = createMesh(geometry,"tick.png");
	//     tick.position.set(15,0,2)
   
 //    question.add(tick);

 //     PIErender();

 //     	var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
 //    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
 //    var materialArray = [ materialFront, materialSide ];
 //     var loader = new THREE.FontLoader();
    
    
    
 //    loader.load( 'optimer_bold.typeface.js', function ( font ) {
 //        var textGeom = new THREE.TextGeometry( "Yes, car stops for infnitesimally small time and then moves backwards", 
 //        {
 //            size: 0.7, height: 0, 
 //            font: font, weight: "normal", style: "normal",
            
 //        });        
 //        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
 //        text_let1 = new THREE.Mesh(textGeom, textMaterial );
 //        text_let1.position.set(4,-3,0.1);
        
 //        question.add(text_let1);
 //        PIErender();
        
 //    });

	// }

	// if(xpoint>0.401 && xpoint<0.45 && ypoint>0.26 && ypoint<0.285)
	// {
	// 	question.remove(tick);
	// 	var geometry = new THREE.BoxGeometry(3,3,0)
	//     wrong1 = createMesh(geometry,"wrong.png");
	//     wrong1.position.set(15,0,2)
    
	//     question.add(wrong1);
	//     PIErender();
		
	// }


 	PIEraycaster.setFromCamera(PIEmouseP,PIEcamera);
    var intersects = PIEraycaster.intersectObjects([line]);
    
    var intersects1 = [];
    for(i=0; i<100; i++)
    {
        intersects1[i] = PIEraycaster.intersectObjects([mesh1[i]]);
    }
    
    console.log("oooooo"+intersects1);
    
    for(i=0; i<100; i++)
    {
        console.log("iiiii"+" "+intersects.length);
 	    if(intersects.length > 0 && intersects1[i].length > 0){
            
            
            document.getElementById("start").click();
        	
 	    }
    }
}




function setOn()
{

    
if( iold==0)
{
    a_oldtime=(iold*0.1);
    a_newtime=(i*0.1);
    a_ivel=Initial_velocity;
    a_acc=accn;	
        
    var final=5+(Initial_velocity+((i*0.1)*accn))*0.4;
   
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[j] = new THREE.Mesh( geometry, material );
    pointCircle[j].position.set(-25+(i*0.2),final,0);
    
    
   
    main.add(pointCircle[j]);
    PIErender();
    console.log("time"+" "+(i*0.25));

	var final=(Initial_velocity+((i*0.1)*accn))*0.4;
	if(Initial_velocity<0 && final>0)
	{
		var heartShape = new THREE.Shape();
		heartShape.moveTo( -25, 5,0);
	heartShape.lineTo(-25,5+(Initial_velocity*0.4),0);
	heartShape.lineTo(-25+(-Initial_velocity/accn)*2,5,0);
	heartShape.lineTo(-25,5,0);
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xDAA520 } );
	planex1 = new THREE.Mesh( geometry, material ) ;
	main.add( planex1 );
	var heartShape = new THREE.Shape();
	heartShape.moveTo(-25+(-Initial_velocity/accn)*2,5,0);
	heartShape.lineTo(-25+(i*0.2),5,0);
	heartShape.lineTo(-25+(i*0.2),5+final,0);
	
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xDAA520 } );
	planex2 = new THREE.Mesh( geometry, material ) ;
	main.add( planex2 );

	}
   else	if(final>0 || (Initial_velocity<0 && final<0)){
	var heartShape = new THREE.Shape();
	heartShape.moveTo( -25, 5,0);
	heartShape.lineTo(-25,5+(Initial_velocity*0.4),0);

	heartShape.lineTo(-25+(i*0.2),5+final,0);
	heartShape.lineTo(-25+(i*0.2),5,0);
	heartShape.lineTo(-25,5,0);
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xDAA520 } );
	planex3 = new THREE.Mesh( geometry, material ) ;
	main.add( planex3 );
}else{
	var heartShape = new THREE.Shape();
	heartShape.moveTo( -25, 5,0);
	heartShape.lineTo(-25,5+(Initial_velocity*0.4),0);
	heartShape.lineTo(-25+(-Initial_velocity/accn)*2,5,0);
	heartShape.lineTo(-25,5,0);
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xDAA520 } );
	planex4 = new THREE.Mesh( geometry, material ) ;
	main.add( planex4 );
	var heartShape = new THREE.Shape();
	heartShape.moveTo(-25+(-Initial_velocity/accn)*2,5,0);
	heartShape.lineTo(-25+(i*0.2),5,0);
	heartShape.lineTo(-25+(i*0.2),5+final,0);
	
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xDAA520 } );
	planex5 = new THREE.Mesh( geometry, material ) ;
	main.add( planex5 );



}
iold=i;
	j++;
	calculateforanimation();
}else if(final>0)
{
	alert("Reset and Try again..!");
}
else{
	alert("Reset and Try again..!");
}


	
    PIErender();
 }


function PIEmouseMove (event){

    var intersects; 
    
    event.defaultPrevented = true;

    PIEmouseP.x = ( event.clientX / PIEcanvasW ) * 2 - 1;
    PIEmouseP.y = - ( event.clientY / PIEcanvasH ) * 2 + 1;
    PIEmouseP.z = 0;
	
	PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);
    intersects = PIEraycaster.intersectObjects([line]);

    var intersects1 = [];
    for(i=0; i<100; i++)
    {
       intersects1[i] = PIEraycaster.intersectObjects([mesh1[i]]);
    }

    
    for(i=0; i<100; i++)
    {
	    if((intersects.length > 0) || (intersects1[i].length > 0)){
 		    console.log("ppp"+" "+intersects+"oooo "+intersects1);
 	        PIEscreenElem.style.cursor = 'pointer';
 	    }
 	    else{
 		    console.log("default");
 		    PIEscreenElem.style.cursor = 'auto';
	    }
    }



}

/************************************************************************************/
function loadExperimentElements()
{
	PIEsetExperimentTitle("V-T Graph");
    PIEsetDeveloperName("srini akhil");
    
    PIEscene.background = new THREE.Color(0xFFFAFA);
    initialiseScene();
    initialiseControls()
    initialiseOtherVariables();
     initialiseInfo();
     initialiseHelp();
    PIEsetAreaOfInterest(SceneTLX,SceneTLY,SceneBRX,SceneBRY);
   document.getElementById("start").addEventListener("click", setOn);



   var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.top = "30%";
    div.style.left = "30%";
    div.style.color = "blue";
    div.style.height = "40%";
    div.style.width = "40%";
    div.style.textAlign = "center";
    div.style.zIndex = "100";
    div.style.display = "none";
    div.style.background = "#F0F8FF";
    div.style.borderStyle = "dotted";
    div.setAttribute('id', 'res');
    document.body.appendChild(div);



    var dir = new THREE.Vector3( 1, 0, 0 );
    dir.normalize();
    var origin = new THREE.Vector3( 2,5, 0.2 );
    var length = 1;
    var hex = 0x000000;
    xaxis = new THREE.ArrowHelper( dir, origin, length, hex,headLength=1);
    main.add(xaxis);
    

     var material = new THREE.LineBasicMaterial({
    color: 0x000000
});
    var geometry = new THREE.Geometry();
geometry.vertices.push(
    new THREE.Vector3( 2, 5, 0 ),
    new THREE.Vector3( -25,5, 0 ),
    
);
     fun1 = new THREE.Line( geometry, material );
    main.add(fun1);


    var dir = new THREE.Vector3( 0, 1, 0 );
    dir.normalize();
    var origin = new THREE.Vector3( -24.94,18, 0.2 );
    var length = 1;
    var hex = 0x000000;
    yaxis = new THREE.ArrowHelper( dir, origin, length, hex,headLength=1);
    main.add(yaxis);


    var material = new THREE.LineBasicMaterial({
    color: 0x000000
});
    var geometry = new THREE.Geometry();
geometry.vertices.push(
    new THREE.Vector3( -25, 18, 0 ),
    new THREE.Vector3( -25,-8, 0 ),
    
);
     fun2 = new THREE.Line( geometry, material );
    main.add(fun2);


    var geometry = new THREE.PlaneGeometry(0.2,25 )
var material = new THREE.MeshBasicMaterial({
    color:"white",transparent:true,opacity:0.0,depthWrite:false
    });
    
for(i=0; i<100; i++){
    mesh1[i] = new THREE.Mesh(geometry, material);
    mesh1[i].position.x = -24.9  + i*(0.2);
    mesh1[i].position.y = 5;
    PIEaddElement(mesh1[i])
}
axisvalue();

geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x8B4513 } );
    

    circle[0] = new THREE.Mesh( geometry, material );
    circle[0].position.set(-25,5,0.1)
    main.add(circle[0]);
    
    circle[1] = new THREE.Mesh( geometry, material );
    circle[1].position.set(-23,5,0.1)
    main.add(circle[1]);
    
    circle[2] = new THREE.Mesh( geometry, material );
    circle[2].position.set(-21,5,0.1)
    main.add(circle[2]);
    
    circle[3] = new THREE.Mesh( geometry, material );
    circle[3].position.set(-19,5,0.1)
    main.add(circle[3]);
    
    circle[4] = new THREE.Mesh( geometry, material );
    circle[4].position.set(-17,5,0.1)
    main.add(circle[4]);
    
    circle[5] = new THREE.Mesh( geometry, material );
    circle[5].position.set(-15,5,0.1)
    main.add(circle[5]);
    
    circle[6] = new THREE.Mesh( geometry, material );
    circle[6].position.set(-13,5,0.1)
    main.add(circle[6]);
    
    circle[7] = new THREE.Mesh( geometry, material );
    circle[7].position.set(-11,5,0.1)
    main.add(circle[7]);
    
    circle[8] = new THREE.Mesh( geometry, material );
    circle[8].position.set(-9,5,0.1)
    main.add(circle[8]);
    circle[9] = new THREE.Mesh( geometry, material );
    circle[9].position.set(-7,5,0.1)
    main.add(circle[9]);
    
    circle[10] = new THREE.Mesh( geometry, material );
    circle[10].position.set(-5,5,0.1)
    main.add(circle[10]);
    
    circle[11] = new THREE.Mesh( geometry, material );
    circle[11].position.set(-25,7,0.1)
    main.add(circle[11]);
    
    circle[12] = new THREE.Mesh( geometry, material );
    circle[12].position.set(-25,9,0.1)
    main.add(circle[12]);
    
    circle[13] = new THREE.Mesh( geometry, material );
    circle[13].position.set(-25,11,0.1)
    main.add(circle[13]);
    
    circle[14] = new THREE.Mesh( geometry, material );
    circle[14].position.set(-25,13,0.1)
    main.add(circle[14]);
    
    circle[15] = new THREE.Mesh( geometry, material );
    circle[15].position.set(-25,15,0.1)
    main.add(circle[15]);
    
    circle[16] = new THREE.Mesh( geometry, material );
    circle[16].position.set(-25,3,0.1)
    main.add(circle[16]);
    
    circle[17] = new THREE.Mesh( geometry, material );
    circle[17].position.set(-25,1,0.1)
    main.add(circle[17]);
    
    circle[18] = new THREE.Mesh( geometry, material );
    circle[18].position.set(-25,-1,0.1)
    main.add(circle[18]);
    
    circle[19] = new THREE.Mesh( geometry, material );
    circle[19].position.set(-25,-3,0.1)
    main.add(circle[19]);
    
    circle[20] = new THREE.Mesh( geometry, material );
    circle[20].position.set(-25,-5,0.1)
    main.add(circle[20]);

    circle[21] = new THREE.Mesh( geometry, material );
    circle[21].position.set(-25,-7,0.1)
    main.add(circle[21]);

    circle[22] = new THREE.Mesh( geometry, material );
    circle[22].position.set(-25,17,0.1)
    main.add(circle[22]);


     var geometry = new THREE.PlaneGeometry(6.5, 3.5 );
	 var texture = THREE.ImageUtils.loadTexture( 'need-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
	 var material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
	car = new THREE.Mesh( geometry, material );
	 car.position.x = -5;
	 car.position.y = -16;
	 car.position.z = 0;
	 PIEaddElement(car); 

	 addcarvaluesfornegpos();
	 addcarvalues();





PIEaddElement(main);
PIErender();

}
//////
function addcarvalues()
{
	var materialFront = new THREE.MeshBasicMaterial( { color: 0xA52A2A } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0xA52A2A } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "0", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-5,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-25", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-10,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-50", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-15,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-75", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-20,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-100", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-25,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-125", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-30,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-150", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-35,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-175", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-40,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-200", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-45,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });


     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "25", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(0,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "50", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(5,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "75", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(10,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "100", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(15,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "125", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(20,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });


     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "150", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(25,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "175", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(30,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "200", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(35,-12,0.1);
        
        graphl.add(text_let1);
        PIErender();
        
    });
}
function addcarvaluesfornegpos()
{
	var materialFront = new THREE.MeshBasicMaterial( { color: 0x800000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x800000 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "0", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-5,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "5", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(0,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "10", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(5,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "15", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(10,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "15", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(15,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "20", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(20,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "25", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(25,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "30", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(30,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "35", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(35,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-5", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-10,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-10", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-15,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-15", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-20,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-20", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-25,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-25", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-30,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });

     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-30", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-35,-12,0.1);
        
        negpos.add(text_let1);
        PIErender();
        
    });
}
///

function resetExperiment()
{
	question.remove(tick);
	question.remove(wrong1);
	PIEremoveElement(question);
	main.remove(line);
	PIErender();
	PIEremoveElement(graphl);
	PIEremoveElement(negpos);
	PIErender();
	main.remove(planex1);
	main.remove(planex2);
	main.remove(planex3);
	main.remove(planex4);
	main.remove(planex5);
	PIEremoveElement(question);
	main.remove(pointCircle[0]);
	PIErender();
	learn.remove(line1);
	PIErender();
	learn.remove(plane0);
	learn.remove(plane1);
	learn.remove(plane2);
	learn.remove(plane3);
	learn.remove(pointCircle1);
	PIErender();
	car.position.x = -5;
	 car.position.y = -16;
	 car.position.z = 0;
	PIEremoveElement(learnv);
	PIErender();
    PIEremoveElement(question1_yes);
    PIEremoveElement(question2_yes);
    PIEremoveElement(question3_yes);
    PIEremoveElement(chquestion1_yes);
    PIEremoveElement(chquestion2_yes);
    PIEremoveElement(chquestion3_yes);
    PIEremoveElement(question1_no);
    PIEremoveElement(question2_no);
    PIEremoveElement(question3_no);
    PIEremoveElement(chquestion1_no);
    PIEremoveElement(chquestion2_no);
    PIEremoveElement(chquestion3_no);
    document.getElementById('res').style.display="none";
	iold=0;
	i=0;
	j=0;
    animate=0;
    backanimate1=0;
    backanimate=0;
    animate1=0;
    learnanimation=0;
    callfunction=0;


}

////
var distance_travelled_in_this_interval;
var dist1;
var dist2;
var dist3;
var dist_pos;
var stoptime;
var new_car_pos;
var new_car_neg;
var timeused=0;
var temp;
var dist_neg=0;
var backanimate=0;
var animate1=0;
var backanimate1=0;
var callfunction=0;
function calculateforanimation(){
	console.log("a_newtime"+a_newtime+"a_oldtime"+a_oldtime+"a_ivel"+a_ivel+"a_acc"+a_acc);
	if(a_acc<0 && a_ivel>0)
	{	
		stoptime=-a_ivel/a_acc;
		dist1=a_ivel*a_oldtime+(0.5*a_oldtime*a_oldtime*a_acc);
		
		if(a_newtime>stoptime)
		{	a_newvel=a_ivel+(a_newtime*a_acc);
			
			dist_neg=-0.5*a_newvel*(a_newtime-stoptime);
			dist_pos=0.5*a_ivel*stoptime;
			new_car_pos=car.position.x+(dist_pos*45/35);
			new_car_neg=new_car_pos-(dist_neg*45/35);
			
		}
		else
		{
			dist3=a_ivel*a_newtime+(0.5*a_newtime*a_newtime*a_acc);
			dist_pos=dist3-dist1;
			dist_neg=0;
			console.log("step"+dist_pos+"dist_old"+dist1+"dist_new"+dist1);
			new_car_pos=car.position.x+(dist_pos*45/35);
			console.log("In front only");
		}
		animate1=1;
	}
	else if(a_acc>0 && a_ivel<0)
	{
		stoptime=-a_ivel/a_acc;
		dist1=0;

		if(a_newtime>stoptime)
		{	a_newvel=a_ivel+(a_newtime*a_acc);
			
			dist_neg=-0.5*a_ivel*stoptime; 
			dist_pos=0.5*a_newvel*(a_newtime-stoptime);
			new_car_neg=car.position.x-(dist_neg*45/35);
			new_car_pos=new_car_neg+(dist_pos*45/35);
			
		}
		else{
			dist3=a_ivel*a_newtime+(0.5*a_newtime*a_newtime*a_acc);
			dist_neg=-dist3;
			console.log("dist3"+dist3);
			dist_pos=0;
			new_car_neg=car.position.x-(dist_neg*45/35);

		}
		backanimate1=1;


	}
	else
	{
		if(a_ivel<0)
		{
			dist3=a_ivel*a_newtime+(0.5*a_newtime*a_newtime*a_acc);
			console.log("WTTTF"+dist3);
			dist_neg=-dist3;
			new_car_neg=car.position.x-(dist_neg*45/200);
			dist_pos=0;
			backanimate=1;
		}
		else{
			dist3=a_ivel*a_newtime+(0.5*a_newtime*a_newtime*a_acc);
			dist_pos=dist3;
			new_car_pos=car.position.x+(dist_pos*45/200);
			dist_neg=0;
			animate=1;
		}
	}
	
}
function updateExperimentElements(t,dt)
{
	if(animate)
	{console.log("animate");
		timeused+=dt;
		if(timeused>100)
		{
			
			
			if(car.position.x<new_car_pos)
			{
				car.position.x+=0.5;
				dist_pos-=2.8125;
				timeused=0;
			}
			else
			{
				animate=0;
				
				
			}
		}

	}
	if(animate1)
	{
		console.log("animate1");
		timeused+=dt;
		if(timeused>100)
		{
			
			
			if(car.position.x<new_car_pos)
			{
				car.position.x+=0.5;
				dist_pos-=0.389;
				timeused=0;
			}
			else
			{
				animate1=0;
				if(dist_neg!=0)
				{
					dist_pos=0;
					backanimate1=1;
				}
				
			}
		}

	}
	if(backanimate1)
	{
		console.log("backanimate1");
		timeused+=dt;
		if(timeused>100)
		{
			if(car.position.x>new_car_neg)
			{
				car.position.x-=0.5;
					dist_neg-=0.389;
					timeused=0;
			}
			else
			{
				backanimate1=0;
				if(dist_pos!=0)
				{
					dist_neg=0;
					animate1=1;
				}
			}
		}
	}
	if(backanimate)
	{
		console.log("backanimate");
		timeused+=dt;
		if(timeused>100)
		{
			if(car.position.x>new_car_neg)
			{
				car.position.x-=0.5;
					dist_neg-=2.8125;
					timeused=0;
			}
			else
			{
				backanimate=0;
				
			}
		}
	}
	if(learnanimation)
	{
		timeused+=dt;
		if(timeused>50)
		{
			if(plane1.position.x<32)
			{
				plane1.position.x+=1;
			}
			else if(plane1.position.y<6)
			{
				plane1.position.y+=1;
			}
			
			else if(plane2.position.x<32)
			{
				plane2.position.x+=1;
			}
			else if(plane2.position.y<3)
			{
				plane2.position.y+=3;
			}
			else
			{
				learnanimation=0;
				callfunction=1;
			}
			
		}
	}
	
	if(callfunction==1)
	{
		console.log("STOPPED");
		drawarrow();
		PIEstopAnimation();
		callfunction=0;
	}

}

/////

var helpContent;
function initialiseHelp(){
  helpContent="<h2>Help for Velocity-Time grpah of uniform acceleration motion</h2>";
  helpContent=helpContent+"<p><h3>Controls</h3></p>";
  helpContent=helpContent+"<p>1. Use learn for understanding the concept of experiment</p>";
  helpContent=helpContent+"<p>2. Use slider to set the initial velocity</p>";
  helpContent=helpContent+"<p>3. Use slider to set the acceleration</p>";
  helpContent=helpContent+"<p>4. After you think you are familiar with concept, Try solving question to test your understanding.</p>";
  helpContent=helpContent+"<p><br></p>";
  helpContent=helpContent+"<p><h4>Note: </h4></p>";
  helpContent=helpContent+"<p>Be careful with scales.</p>";
  helpContent=helpContent+"<p>In question, click on options for e.g on text 'Yes' or 'No' and click on submit button from controls panel .</p>";
  
  PIEupdateHelp(helpContent);
}


var infoContent;
function initialiseInfo(){
  infoContent ="<h2>Important info of experiment:</h2>";
  infoContent =infoContent+"<p>In Velocity - Time Graph the area under curve represents distance travelled by car in interval 0 to time t .</p>";
  infoContent =infoContent+"<p>In case of constant acceleration, distance covered in given time <b> Distance = Inital_Velocity*Time + 1/2*Acceleration*Time^2</b> </p>";
  infoContent =infoContent+"<p>There are two cases of this experiment : </p>"
  infoContent =infoContent+"<p>Case 1 : When acceleration and initial Velocity are of same sign.</p>";
  infoContent =infoContent+"<p>Case 1 : When acceleration and initial Velocity are of different sign.</p>";
  infoContent =infoContent+"<p><b>Explanation : </b></p>";
  infoContent =infoContent+"<p>Case 1 : When acceleration and initial Velocity are of same sign, then magnitude of velocity increases with time and direction remains same.</p>";
  infoContent =infoContent+"<p>Case 2 : When acceleration and initial Velocity are of different sign , As acceleration is acting opposite to the direction of velocity, the magnitude of velocity decreases and finally comes to rest and now starts moving in opposite to inital direction with increasing magnitude of velocity i.e sign of  Velocity changes.</p>";
  infoContent =infoContent+"<p>Now, Try performing experiment, for  help on controls refer '?' in control panel .</p>";
  PIEupdateInfo(infoContent);

}



////
