// initialising the scene 
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */
var globalshaderemove=0;
var alreadynotstarted=0;
var learnarea=0;
var cangiveanswer=0;
var youcanlearn=1;
var grid_x=-15;
var grid_y=5;
var grid_z=0;
var grid;
var in_u;

var line1;
var car;
var geometry;
var material;
var loader;
var texture;
var startanim=0;
var xp;
var in_acc;
var yp;
var cx=-10;
var globalcx=-10;
var cy=-14;
var wrong;
/*shaded area variables*/
var horizo2;
var vert;
var horizo1;
var horizo;
var part1;
var part2;
var vapart1;
var vapart2;
var vapart3;
var vapart4;
var vapart5;
var vapart6;
var vapart7;
var vapart8;
var vapart9;
/* closed shaded area variables*/
/*Variables for acitivity*/
var fun1;
var fun2;
var fun3;
var fun4;
var fun5;
var fun6;
var fun7;
var fun8;
var fun9;
var fun10;
var tick;
var activityarea=0;
///
var text_let1;
var text_let2;
var text_let3;
var text_let4;
var text_let5;
var text_let6;
var text_let7;
var text_let8;
var text_let9;
var text_let10;
var text_let11;
var text_let12;
var text_let13;
var a=0;
var u=0;
function handleacc(value){
    a=value;
}
function handlevel(value){
    u=value;
       
    
                    resetExperiment();
                         createline();
                        createcarline();
        oncargraphvalues();
        PIErender();
}
function initialiseControls()
{
    PIEaddInputCommand("Learn",function s0(){
        
                    resetExperiment();
                    createshadedarea();
        
        } );
    PIEaddInputSlider("Acceleration",0,handleacc,-5,5,0.1);
    PIEaddInputSlider("Intial Velocity",0,handlevel,-10,10,0.1);
    
    
    PIEaddInputCommand("Activity",function s1(){
     
                resetExperiment();
                    activityfun();
                         });
    
    PIEaddInputText("Answer",'0');
    PIEaddInputCommand("Submit",function right()
                        {
        
   var ans= PIEgetInputText('Answer');
        
    if(ans==4){
    wrong.visible=false;

   
    tick.visible=true;
    PIErender();
    
    }
    else
        {
            wrong.visible=true;
   
    tick.visible=false;
    PIErender();
        }

    });
    
    
    
}
function initialiseOtherVariables()
{
    
}
function createrightwrong()
{
     geometry = new THREE.BoxGeometry(3,3,0)
     tick = createMesh(geometry,"tick.png");
    tick.position.set(10,1,0.1)
    tick.visible=false;
    PIEaddElement(tick);
    geometry = new THREE.BoxGeometry(3,3,0)
     wrong = createMesh(geometry,"wrong.png");
    wrong.position.set(10,1,0.1)
    wrong.visible=false;
    PIEaddElement(wrong);
    
    
}
var dot=[];
var board;
function activityfun()
{
     var material = new THREE.LineBasicMaterial({
	color: 0x000000
});
    var geometry = new THREE.Geometry();
geometry.vertices.push(
	new THREE.Vector3( -5, 15, 0 ),
	new THREE.Vector3( -25,7, 0 ),
	
);
    fun1 = new THREE.Line( geometry, material );
    PIEaddElement(fun1);
    PIErender();

    	var geometry  = new THREE.BoxGeometry(30, 15, 0);
    var material  = new THREE.MeshBasicMaterial();

    var backgroundTexture = THREE.ImageUtils.loadTexture( '4.png' );
    backgroundTexture.wrapS = backgroundTexture.wrapT = THREE.RepeatWrapping;
    backgroundTexture.repeat.set( 1,1 );
    
    material = new THREE.MeshBasicMaterial( { map: backgroundTexture } );
    material.side  = THREE.BackSide;
    var board  = new THREE.Mesh(geometry, material);
    board.position.y=6;
    board.position.x=20;
    PIEaddElement(board);
     PIErender();
        PIErender();
        PIErender();
    PIEstartAnimation();
    PIEstopAnimation();
        
       







    var material = new THREE.LineDashedMaterial( {
	color: 0x000000,
	linewidth: 1,
	scale: 1,
	dashSize: 0.4,
	gapSize: 0.1,
} );
    
   var geometry = new THREE.Geometry();
geometry.vertices.push(
	new THREE.Vector3( -9, 13.4, 0 ),
	new THREE.Vector3( -25,13.4, 0 ),
	
);
    geometry.computeLineDistances();
    fun2 = new THREE.Line( geometry, material );
    PIEaddElement(fun2);
    PIErender();
    /// dots
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    dot[0] = new THREE.Mesh( geometry, material );
    dot[0].position.set(-9,13.4,0.4);
    PIEaddElement(dot[0]);
PIErender();

    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    dot[1] = new THREE.Mesh( geometry, material );
    dot[1].position.set(-17,10.25,0.4);
    PIEaddElement(dot[1]);
    PIErender();
    ////////
    var geometry = new THREE.Geometry();
geometry.vertices.push(
	new THREE.Vector3( -9, 13.4, 0 ),
	new THREE.Vector3( -9,-5, 0 ),
	
);
    geometry.computeLineDistances();
    fun3 = new THREE.Line( geometry, material );
    PIEaddElement(fun3);
    PIErender();
    var geometry = new THREE.Geometry();
geometry.vertices.push(
	new THREE.Vector3( -17, 10.25, 0 ),
	new THREE.Vector3( -25,10.25, 0 ),
	
);
    geometry.computeLineDistances();
    fun4 = new THREE.Line( geometry, material );
    PIEaddElement(fun4);
    
    PIErender();
    var geometry = new THREE.Geometry();
geometry.vertices.push(
	new THREE.Vector3( -17, 10.25, 0 ),
	new THREE.Vector3( -17,-5, 0 ),
	
);
    geometry.computeLineDistances();
    fun5 = new THREE.Line( geometry, material );
    PIEaddElement(fun5);
    PIErender();
   var materialFront = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "From Graph:", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        fun6 = new THREE.Mesh(textGeom, textMaterial );
        fun6.position.set(8,10,0.1);
        
        PIEaddElement(fun6);
        PIErender();
        
    }); 
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "V1 = 26", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        fun7 = new THREE.Mesh(textGeom, textMaterial );
        fun7.position.set(8,8,0.1);
        
        PIEaddElement(fun7);
        PIErender();
        
    }); 
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "V2 = 42", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        fun8 = new THREE.Mesh(textGeom, textMaterial );
        fun8.position.set(12,8,0.1);
        
        PIEaddElement(fun8);
        PIErender();
        
    }); 
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "T1 = 4        T2 = 8", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        fun9 = new THREE.Mesh(textGeom, textMaterial );
        fun9.position.set(8,6,0.1);
        
        PIEaddElement(fun9);
        PIErender();
    }); 
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Find Acceleration ? (Use controls to enter answer and click on submit)", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        fun10 = new THREE.Mesh(textGeom, textMaterial );
        fun10.position.set(8,4,0.1);
        
        PIEaddElement(fun10);
        PIErender();
        
    }); 
    
    cangiveanswer=1;
    right();
    
    //PIEsetCellInput('1','1','1','default');
    
    
    
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

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h3>There are 3 phases of this experiment.</h3>";
    helpContent = helpContent + "<p> 1. Learn phase <br> 2. Visualization phase <br> 3. Activity Phase <br> <p>";
    
    helpContent = helpContent + "<p>Learn phase : In this phase student understands that distance travelled by car 'S' is equal to Area of traingle + Area of rectangle which is <b> u*t + 1/2*a*t*t </b>. (where u is initial velocity t is time a is acceleration) <p>";
    helpContent = helpContent + "<p>Visualization phase: Here for choosed value of 'a' and 'u' graph is plotted against V vs T . When ever students clicks on grpah the car's position shows Displacement covered by car in time 't' <p>";
    helpContent = helpContent + "<p>Acitivity phase:  Here a graph is given with two points choosen student has to find the acceleration and submit answer. <p>";
    helpContent = helpContent + "<p><b>Note: <b><p>";
    helpContent = helpContent + "<p><b>Displacement <b>is seperation between initial and final point where as <b> distance <b>is 'how much an object has covered'.<p>";
    PIEupdateHelp(helpContent);
}

var infoContent;


function initialiseInfo()
{
    infoContent = "";
    infoContent = infoContent + "<h2>Velocity Time grpah with uniform acceleration.</h2>";
    infoContent = infoContent + "<h3>Velocity vs Time graph is plot for choosen initial velocity and acceleration.</h3>";
    infoContent = infoContent + "<h3>Distance travelled by car is given by area under graph.</h3>";
    infoContent = infoContent + "<h3>Also, (distance) <b> S = u*t + 1/2*a*t*t </b>.</h3>";
    infoContent = infoContent + "<h3>Where, <br> <b> u </b> is <b> initial velocity</b><br><b> a </b> is <b>acceleration</b><br> <b> t </b> is <b> time</b> <br></h3>";
    
    
    
    PIEupdateInfo(infoContent);
}
var plane0;
var plane1;
var plane2;
var plane3;
var learnanimation;
function createshadedarea()
{


	var heartShape = new THREE.Shape();
	
	heartShape.moveTo(-25,5,0);
	heartShape.lineTo(-25,7,0);
	heartShape.lineTo(-9,7,0);
	heartShape.lineTo(-9,5,0);
	heartShape.lineTo(-25,5,0);
	
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xEE82EE	 } );
	plane0 = new THREE.Mesh( geometry, material ) ;
	PIEaddElement( plane0 );


	var heartShape = new THREE.Shape();
	
	heartShape.moveTo(-25,5,0);
	heartShape.lineTo(-25,7,0);
	heartShape.lineTo(-9,7,0);
	heartShape.lineTo(-9,5,0);
	heartShape.lineTo(-25,5,0);
	
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xEE82EE } );
	plane2 = new THREE.Mesh( geometry, material ) ;
	plane2.position.x=0;
	plane2.position.y=0;
	PIEaddElement( plane2 );



	var heartShape = new THREE.Shape();
	
	heartShape.moveTo(-25,7,0);
	heartShape.lineTo(-9,11,0);
	heartShape.lineTo(-9,7,0);
	heartShape.lineTo(-25,7,0);
	
	
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xEE82EE } );
	plane1 = new THREE.Mesh( geometry, material ) ;
	PIEaddElement( plane1 );


	var heartShape = new THREE.Shape();
	
	heartShape.moveTo(-25,7,0);
	heartShape.lineTo(-9,11,0);
	heartShape.lineTo(-9,7,0);
	heartShape.lineTo(-25,7,0);
	
	
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshBasicMaterial( { color: 0xEE82EE } );
	plane3 = new THREE.Mesh( geometry, material ) ;
	PIEaddElement( plane3 );



    var material = new THREE.LineBasicMaterial({
	color: 0x000000
});
    var geometry = new THREE.Geometry();
geometry.vertices.push(
	new THREE.Vector3( -5, 12, 0 ),
	new THREE.Vector3( -25,7, 0 ),
	
);
    vert = new THREE.Line( geometry, material );
    PIEaddElement(vert);
    
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "1", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        part1 = new THREE.Mesh(textGeom, textMaterial );
        part1.position.set(-17,5.7,0.1);
        
        PIEaddElement(part1);
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "2", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        part2 = new THREE.Mesh(textGeom, textMaterial );
        part2.position.set(-13,8,0.1);
        
        PIEaddElement(part2);
        
    });
    
    startanim=0;
    learnanimation=1;
    PIEstartAnimation();
    

}

var text_inlearn;
var text_inlearn1;
var text;
function displaycalinlearn()
{
    
    
     var materialFront1 = new THREE.MeshBasicMaterial( { color: 0x333333 } );
    var materialSide1 = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    var materialArray1 = [ materialFront1, materialSide1 ];
     var loader1 = new THREE.FontLoader();
    
 
 	loader1.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Distance travelled by car is area below the graph", 
        {
            size: 0.85, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial1 = new THREE.MeshFaceMaterial(materialArray1);
        text = new THREE.Mesh(textGeom, textMaterial1 );
        text.position.set(-16,-8,0.1);
        
        PIEaddElement(text);
        PIErender();
        
    });

 	loader1.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Sum of Area ", 
        {
            size: 0.85, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial1 = new THREE.MeshFaceMaterial(materialArray1);
        text_inlearn1 = new THREE.Mesh(textGeom, textMaterial1 );
        text_inlearn1.position.set(-2,13,0.1);
        
        PIEaddElement(text_inlearn1);
        PIErender();
        
    });

 	loader1.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "+", 
        {
            size: 0.85, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial1 = new THREE.MeshFaceMaterial(materialArray1);
        text_inlearn = new THREE.Mesh(textGeom, textMaterial1 );
        text_inlearn.position.set(6,6,0.1);
        
        PIEaddElement(text_inlearn);
        PIErender();
        
    });


    var materialFront = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Distance covered in 8 seconds is  =", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        vapart1 = new THREE.Mesh(textGeom, textMaterial );
        vapart1.position.set(-17,-10,0.1);
        
        PIEaddElement(vapart1);
        PIErender();
        
    });
    
    
   
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Area of part 1 + Area of part 2", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        vapart2 = new THREE.Mesh(textGeom, textMaterial );
        vapart2.position.set(-3,-10,0.1);
        
        PIEaddElement(vapart2);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " =  Area of Rectangle + Area of triangle", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        vapart3 = new THREE.Mesh(textGeom, textMaterial );
        vapart3.position.set(-5,-12,0.1);
        
        PIEaddElement(vapart3);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " = (10)*(8) + (1/2*20*8)", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        vapart9 = new THREE.Mesh(textGeom, textMaterial );
        vapart9.position.set(-5,-14,0.1);
        
        PIEaddElement(vapart9);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( " = 80 + 80 = 160", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        vapart4 = new THREE.Mesh(textGeom, textMaterial );
        vapart4.position.set(-5,-16,0.1);
        
        PIEaddElement(vapart4);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "By formulae :", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        vapart5 = new THREE.Mesh(textGeom, textMaterial );
        vapart5.position.set(15,-10,0.1);
        
        PIEaddElement(vapart5);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "( refer info section )", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        vapart6 = new THREE.Mesh(textGeom, textMaterial );
        vapart6.position.set(20,-10,0.1);
        
        PIEaddElement(vapart6);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "    = (10)*(8) + (1/2*2.5*8*8) ", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        vapart7 = new THREE.Mesh(textGeom, textMaterial );
        vapart7.position.set(20,-12,0.1);
        
        PIEaddElement(vapart7);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "    = 80 + 80 = 160", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        vapart8 = new THREE.Mesh(textGeom, textMaterial );
        vapart8.position.set(20,-14,0.1);
        
        PIEaddElement(vapart8);
        PIErender();
        
    });
    
    PIErender();
    
}
var text_to;
function createcarline()
{
     var material = new THREE.LineBasicMaterial({
	color: 0x0000ff
});
    var geometry = new THREE.Geometry();
geometry.vertices.push(
	new THREE.Vector3( -13, -16, 0 ),
	new THREE.Vector3( 35,-16, 0 ),
	
);
    line1 = new THREE.Line( geometry, material );
    //line1.position.set(-25,-25,0.5);
    PIEaddElement(line1);
    geometry=new THREE.PlaneGeometry(5,3);
    car=createMesh(geometry,'need-min.png');
    car.position.set(-13,-14,0.1);
    PIEaddElement(car);
    PIErender();
    var materialFront1 = new THREE.MeshBasicMaterial( { color: 0x333333 } );
    var materialSide1 = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    var materialArray1 = [ materialFront1, materialSide1 ];
     var loader1 = new THREE.FontLoader();
    
 
 	loader1.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Displacement of car till your clicked instant", 
        {
            size: 0.85, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial1 = new THREE.MeshFaceMaterial(materialArray1);
        text_to = new THREE.Mesh(textGeom, textMaterial1 );
        text_to.position.set(-16,-8,0.1);
        
        PIEaddElement(text_to);
        PIErender();
        
    });




}
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
function GridHelper( size, divisions, color1, color2 ) {

  size = size || 10;
  divisions = divisions || 10;
  color1 = new Color( color1 !== undefined ? color1 : 0x00000f );
  color2 = new Color( color2 !== undefined ? color2 : 0x888888 );

  var center = divisions / 2;
  var step = size / divisions;
  var halfSize = size / 2;

  var vertices = [], colors = [];

  for ( var i = 0, j = 0, k = - halfSize; i <= divisions; i ++, k += step ) {

    vertices.push( - halfSize, 0, k, halfSize, 0, k );
    vertices.push( k, 0, - halfSize, k, 0, halfSize );

    var color = i === center ? color1 : color2;

    color.toArray( colors, j ); j += 3;
    color.toArray( colors, j ); j += 3;
    color.toArray( colors, j ); j += 3;
    color.toArray( colors, j ); j += 3;

  }
    


}
function doMouseEvent(e)
{
    resetExperiment();
    in_u=u;
    in_acc=a;
    console.log(in_u+" "+in_acc);
  // console.log(e.clientX + " " + e.clientY);
  if(e.clientX>203&& e.clientX<554 && e.clientY>87 && e.clientY<442)
  {

    xp=(e.clientX-203)/35.1;
    yp=((442-e.clientY)*10/35.5)-50;

    console.log("WTFWTFWTF"+xp+"       "+yp);
      values();
      
      var diff=yp-in_u;
      var newacc=diff/xp;
      var difference_acc=newacc-in_acc;
      console.log(difference_acc);
      values();
      if(Math.abs(difference_acc)<0.5){
          startanim=1;
      }
  }
}

/////////////////////////////****//////
var text_let;
var mesh1=[];
function onxaxisgraphvalues()
{
    var materialFront = new THREE.MeshBasicMaterial( { color: 0x00FFFF } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x00FFFF } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "0", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-25.5,-6,0.1);
        
        PIEaddElement(text_let);
        PIErender();
        
    });

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
PIErender();



    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "1", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-23.5,-6,0.1);
        
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "2", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-21.5,-6,0.1);
        
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "3", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-19.5,-6,0.1);
        
        PIEaddElement(text_let);
        PIErender();
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "4", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-17.5,-6,0.1);
        
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "5", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-15.5,-6,0.1);
        
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "6", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-13.5,-6,0.1);
        
        PIEaddElement(text_let);
        PIErender();
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "7", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-11.5,-6,0.1);
        
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "8", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-9.5,-6,0.1);
        
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "9", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-7.5,-6,0.1);
        
        PIEaddElement(text_let);
        PIErender();
        
    });
    PIErender();
    var dir = new THREE.Vector3( 1, 0, 0 );

//normalize the direction vector (convert to vector of length 1)
    dir.normalize();

var origin = new THREE.Vector3( -25, -5, 0.2 );
var length = 25;
var hex = 0x000000;

var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex,headLength=1);
    PIEaddElement(arrowHelper);
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "10           X-axis (Time)", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-5.5,-6,0.1);
        
        PIEaddElement(text_let);
        PIErender();
        
    });
}
var pointCircle=new Array();
function onyaxisgraphvalues()
{
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0x00FFFF } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x00FFFF } );
    var materialArray = [ materialFront, materialSide ];
    var loader = new THREE.FontLoader();
    
        
        
        loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( '-50', 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });    
            
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-27.5,-5.2,0.1);
      
        PIEaddElement(text_let);
        PIErender();
        
    });
     PIErender();  
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[0] = new THREE.Mesh( geometry, material );
    pointCircle[0].position.set(-24.9,-5,0.4);
    PIEaddElement(pointCircle[0]);
    PIErender();

    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[1] = new THREE.Mesh( geometry, material );
    pointCircle[1].position.set(-24.9,-3,0.4);
    PIEaddElement(pointCircle[1]);
    PIErender();

    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[2] = new THREE.Mesh( geometry, material );
    pointCircle[2].position.set(-24.9,-1,0.4);
    PIEaddElement(pointCircle[2]);
    PIErender();

    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[3] = new THREE.Mesh( geometry, material );
    pointCircle[3].position.set(-24.9,1,0.4);
    PIEaddElement(pointCircle[3]);
    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[4] = new THREE.Mesh( geometry, material );
    pointCircle[4].position.set(-24.9,3,0.4);
    PIEaddElement(pointCircle[4]);
    
    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[5] = new THREE.Mesh( geometry, material );
    pointCircle[5].position.set(-24.9,5,0.4);
    PIEaddElement(pointCircle[5]);
    PIErender();

    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[6] = new THREE.Mesh( geometry, material );
    pointCircle[6].position.set(-24.9,7,0.4);
    PIEaddElement(pointCircle[6]);

PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[7] = new THREE.Mesh( geometry, material );
    pointCircle[7].position.set(-24.9,9,0.4);
    PIEaddElement(pointCircle[7]);
    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[8] = new THREE.Mesh( geometry, material );
    pointCircle[8].position.set(-24.9,11,0.4);
    PIEaddElement(pointCircle[8]);
    PIErender();

    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[9] = new THREE.Mesh( geometry, material );
    pointCircle[9].position.set(-24.9,13,0.4);
    PIEaddElement(pointCircle[9]);
    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[10] = new THREE.Mesh( geometry, material );
    pointCircle[10].position.set(-24.9,15,0.4);
    PIEaddElement(pointCircle[10]);
    PIErender();
    ///
    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[11] = new THREE.Mesh( geometry, material );
    pointCircle[11].position.set(-22.9,-5,0.4);
    PIEaddElement(pointCircle[11]);

    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[12] = new THREE.Mesh( geometry, material );
    pointCircle[12].position.set(-20.9,-5,0.4);
    PIEaddElement(pointCircle[12]);
    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[13] = new THREE.Mesh( geometry, material );
    pointCircle[13].position.set(-18.9,-5,0.4);
    PIEaddElement(pointCircle[13]);
    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[14] = new THREE.Mesh( geometry, material );
    pointCircle[14].position.set(-16.9,-5,0.4);
    PIEaddElement(pointCircle[14]);
    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[15] = new THREE.Mesh( geometry, material );
    pointCircle[15].position.set(-14.9,-5,0.4);
    PIEaddElement(pointCircle[15]);
    PIErender();

    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[16] = new THREE.Mesh( geometry, material );
    pointCircle[16].position.set(-12.9,-5,0.4);
    PIEaddElement(pointCircle[16]);
    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[17] = new THREE.Mesh( geometry, material );
    pointCircle[17].position.set(-10.9,-5,0.4);
    PIEaddElement(pointCircle[17]);

    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[18] = new THREE.Mesh( geometry, material );
    pointCircle[18].position.set(-8.9,-5,0.4);
    PIEaddElement(pointCircle[18]);
    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[19] = new THREE.Mesh( geometry, material );
    pointCircle[19].position.set(-6.9,-5,0.4);
    PIEaddElement(pointCircle[19]);
    PIErender();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[20] = new THREE.Mesh( geometry, material );
    pointCircle[20].position.set(-4.9,-5,0.4);
    PIEaddElement(pointCircle[20]);

    PIErender();


    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( '-40', 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });    
            
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-27.5,-3.2,0.1);
      
        PIEaddElement(text_let);
        PIErender();
        
    });
    PIErender();
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( '-30', 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });    
            
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-27.5,-1.2,0.1);
      
        PIEaddElement(text_let);
        PIErender();
        
    });
    PIErender();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( '-20', 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });    
            
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-27.5,0.8,0.1);
      
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( '-10', 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });    
            
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-27.5,2.8,0.1);
      
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( '0', 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });    
            
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-27,4.8,0.1);
      
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( '10', 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });    
            
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-27.5,6.8,0.1);
      
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( '20', 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });    
            
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-27.5,8.8,0.1);
      
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( '30', 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });    
            
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-27.5,10.8,0.1);
      
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( '40', 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });    
            
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-27.5,12.8,0.1);
      
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( '50', 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });    
            
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-27.5,14.8,0.1);
      
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( 'Y-axis (Velocity)', 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });    
            
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        var text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-29.5,16.8,0.1);
      
        PIEaddElement(text_let);
        PIErender();
        
    });
    
    
    
    var dir = new THREE.Vector3( 0, 1, 0 );

//normalize the direction vector (convert to vector of length 1)
    dir.normalize();

var origin = new THREE.Vector3( -25, -5, 0.2 );
var length = 22;
var hex = 0x000000;

var arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex,headLength=1);
    PIEaddElement(arrowHelper);
    PIErender();
    
    
    
    
    
}

function oncargraphvalues()
{
     var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "0", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-13,-17,0.1);
        
        PIEaddElement(text_let1);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "25", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let2 = new THREE.Mesh(textGeom, textMaterial );
        text_let2.position.set(-9,-17,0.1);
        
        PIEaddElement(text_let2);
        PIErender();
        
    });
    
      loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "50", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let3 = new THREE.Mesh(textGeom, textMaterial );
        text_let3.position.set(-5,-17,0.1);
        
        PIEaddElement(text_let3);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "75", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let4 = new THREE.Mesh(textGeom, textMaterial );
        text_let4.position.set(-1,-17,0.1);
        
        PIEaddElement(text_let4);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "100", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let5 = new THREE.Mesh(textGeom, textMaterial );
        text_let5.position.set(3,-17,0.1);
        
        PIEaddElement(text_let5);
        PIErender();
        
    });
    
     
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "125", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let6 = new THREE.Mesh(textGeom, textMaterial );
        text_let6.position.set(7,-17,0.1);
        
        PIEaddElement(text_let6);
        PIErender();
        
    });
     
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "150", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let7 = new THREE.Mesh(textGeom, textMaterial );
        text_let7.position.set(11,-17,0.1);
        
        PIEaddElement(text_let7);
        PIErender();
        
    });
    
     
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "175", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let8 = new THREE.Mesh(textGeom, textMaterial );
        text_let8.position.set(15,-17,0.1);
        
        PIEaddElement(text_let8);
        PIErender();
        
    });
    
     
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "200", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let9 = new THREE.Mesh(textGeom, textMaterial );
        text_let9.position.set(19,-17,0.1);
        
        PIEaddElement(text_let9);
        PIErender();
        
    });
    
     
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "225", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let10 = new THREE.Mesh(textGeom, textMaterial );
        text_let10.position.set(23,-17,0.1);
        
        PIEaddElement(text_let10);
        PIErender();
        
    });
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "250", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let11 = new THREE.Mesh(textGeom, textMaterial );
        text_let11.position.set(27,-17,0.1);
        
        PIEaddElement(text_let11);
        PIErender();
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "275", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let12 = new THREE.Mesh(textGeom, textMaterial );
        text_let12.position.set(31,-17,0.1);
        
        PIEaddElement(text_let12);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "300", 
        {
            size: 0.6, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let13 = new THREE.Mesh(textGeom, textMaterial );
        text_let13.position.set(34,-17,0.1);
        
        PIEaddElement(text_let13);
        PIErender();
        
    });
}

////////////////////////////**////
var line;
function createline()
{
    var material = new THREE.LineBasicMaterial({
    lineWidth:3,
	color: 0x000000
});
     
    var newu=u/5;
    var endy=(u+(a*10))/5;
    var endx=20;
    if(endy>10)
        {
            endy=10;
            endx=(30-u)/a;
            endx=endx*2;
        }
    console.log(newu+" "+endx+" "+endy);
var geometry = new THREE.Geometry();
geometry.vertices.push(
	new THREE.Vector3( -5, 12+newu, 0 ),
	new THREE.Vector3( -5+endx, 12+endy, 0 ),
	
);
    

    line = new THREE.Line( geometry, material );
    line.visible=true;
    line.position.set(-20,-7,0.1);
    PIEaddElement(line); 
    
}
// document.addEventListener("click",doMouseEvent);







function createMesh(geom, imageFile) {
       var texture = new THREE.TextureLoader().load(imageFile);
       var mat = new THREE.MeshBasicMaterial();
       mat.map = texture;
       mat.transparent = true;
       mat.map.needsUpdate = true;
       var mesh = new THREE.Mesh(geom, mat);PIErender();
       PIErender();
       return mesh;

}

function loadExperimentElements()
{
   
    PIEsetExperimentTitle("V-T Graph");
    PIEsetDeveloperName("srini akhil");
    PIEsetAreaOfInterest(-40,20,40,-20);
    PIEscene.background = new THREE.Color(0xffffff);
    initialiseHelp();
    initialiseInfo(); 
    initialiseScene();
    initialiseControls()
    initialiseOtherVariables();
    document.getElementById("start").addEventListener("click", setOn);
    
    grid = new THREE.GridHelper( 10, 10);
    grid.position.x=grid_x;
    grid.position.y=grid_y;
    grid.position.z=grid_z;
    grid.lookAt(new THREE.Vector3(grid.position.x,grid.position.y+0.01,grid.position.z));
    PIEaddElement(grid);
    
    onxaxisgraphvalues();
    onyaxisgraphvalues();
    createrightwrong();
    
    
    
    
    

}
var w;
function resetExperiment()
{
  
    
       		PIEremoveElement(plane0);
       		PIErender();
       		PIEremoveElement(plane1);
       		PIErender();
       		PIEremoveElement(plane2);
       		PIErender();
       		PIEremoveElement(plane3);
       		PIErender();
            PIEremoveElement(horizo);
            PIErender();
            PIEremoveElement(horizo1);
            PIErender();
            PIEremoveElement(horizo2);
            PIErender();
            PIEremoveElement(vert);
            PIErender();
            PIEremoveElement(part1);
            PIErender();
            PIEremoveElement(part2);
            PIErender();
            PIEremoveElement(vapart1);
            PIErender();
            PIEremoveElement(vapart2);
            PIErender();
            PIEremoveElement(vapart3);
            PIErender();
            PIEremoveElement(vapart4);
            PIErender();
            PIEremoveElement(board);
            PIEremoveElement(vapart5);
            PIErender();
            PIEremoveElement(vapart6);
            PIErender();
            PIEremoveElement(vapart7);
            PIErender();
            PIEremoveElement(vapart8);
            PIErender();
            PIErender();
            PIEremoveElement(vapart9);
            PIErender();
            PIEremoveElement(text_inlearn);
            PIErender();
           	PIEremoveElement(text_inlearn1);
           	PIErender();
           	PIErender();
            
        
    
            
            PIEremoveElement(text_let1);
            PIErender();
            PIEremoveElement(text_let2);
            PIErender();
            PIEremoveElement(text_let3);
            PIErender();
            PIEremoveElement(text_let4);
            PIErender();
            PIEremoveElement(text_let5);
            PIErender();
            PIEremoveElement(text_let6);
            PIErender();
            PIEremoveElement(text_let7);
            PIErender();
            PIEremoveElement(text_let8);
            PIErender();
            PIEremoveElement(text_let9);
            PIErender();
            PIEremoveElement(text_let10);
            PIErender();
            PIEremoveElement(text_let11);
            PIErender();
            PIEremoveElement(text_let12);
            PIErender();
            PIEremoveElement(text_let13);
            PIErender();
            PIEremoveElement(car);
            PIErender();
            PIEremoveElement(line1);
            PIEremoveElement(line);
            PIErender();
            PIEremoveElement(text);
          	PIEremoveElement(text_to);
          	for( var y=0;y<p;y++)
          	{
          		PIEremoveElement(pointCircle[y]);
          		PIErender();
          	}
            PIEremoveElement(fun1);
            PIErender();
            PIEremoveElement(fun2);
            PIErender();
            PIEremoveElement(fun3);
            PIErender();
            PIEremoveElement(fun4);
            PIErender();
            PIEremoveElement(fun5);
            PIEremoveElement(fun6);
            PIErender();
            PIEremoveElement(fun7);
            PIEremoveElement(fun8);
            PIErender();
            PIEremoveElement(fun9);
            PIErender();
            PIEremoveElement(fun10);
            PIErender();
            PIEremoveElement(dot[0]);
            PIErender();
            PIEremoveElement(dot[1]);
            	PIErender();
            learnanimation2=0;
            learnanimation=0;
            startanim=0;
            tick.visible=false;
            wrong.visible=false;
            
        

}
var time=0;
var newcarx;
var temp=0;
var dist;
var oldcarx=-10;
var needto;
function values(){
    acc=a;
    inv=u;
    dist=Math.abs(inv*xp+(0.5*acc*xp*xp));
    
    dist=(dist/25)*4;
    console.log("distance"+" "+dist+" ");
    
    newcarx=-10+dist;
    needto=Math.abs(newcarx-oldcarx);
    console.log("Oldcarx"+oldcarx);
    console.log("NEWCARX"+newcarx);
    // console.log("newcarx"+" "+newcarx);
    // console.log("cx"+" "+cx);
    // if(newcarx<cx)
    //     {
    //         w=-1;
    //         dist=cx-newcarx;
    //     }
    // else{
    //     w=1;
    //     dist=newcarx-cx;
    // }
    //PIEstopAnimation();
    startanim=1;
    PIEstartAnimation();

    
}
var timeused=0;
var learnanimation2=0;
function updateExperimentElements(t, dt)
{ 
    
    if(startanim==1)
        {
           
           time+=dt;

            if(time>50)
            {
                time=0;
                console.log("WTFhello");

                if(newcarx>oldcarx)
                {
                    if(Math.abs(needto)>1)
                    {
                        car.position.x+=0.5;
                        needto-=0.5;
                    }
                    else
                    {
                        oldcarx=newcarx;
                        startanim=0;
                        PIEstopAnimation();
                    }
                }
                if(newcarx<oldcarx)
                {
                    if(Math.abs(needto)>1)
                    {
                        car.position.x-=0.5;
                        needto-=0.5;
                    }
                    else
                    {
                        oldcarx=newcarx;
                        startanim=0;
                        PIEstopAnimation();
                    }
                }
        }
            
            
        }


        if(learnanimation==1)
        {
        	
        	timeused+=dt;
        	if(timeused>50)
        	{
        		timeused=0;
	        	if(plane2.position.x < 25 )
	        	{
	        		console.log("STUPID"+plane2.position.x+plane2.position.y+timeused);
	        		plane2.position.x+=1;
	        	}
	        	if(plane2.position.y>-2)
	        	{
	        		plane2.position.y-=1;
	        	}
	        	
	        	if(plane2.position.x==25 && plane2.position.y==-2)
	        	{
	        		learnanimation=0;
	        		learnanimation2=1;
	        	}
			}      	
        }
        if(learnanimation2==1)
        {
        	timeused+=dt;
        	if(timeused>50)
        	{
        		timeused=0;
        		if(plane3.position.x<25)
	        	{
	        		plane3.position.x+=1;

	        	}
	        	if(plane3.position.y<2)
	        	{
	        		plane3.position.y+=1;
	        	}
	        	if(plane3.position.x==25 && plane3.position.y==2)
	        		{
	        		learnanimation2=1;
	        		displaycalinlearn();
	        		PIEstopAnimation();
	        	}

        	}
        }
    
}
////////////////////////










function PIEmouseDown(event){

    xpoint = PIEmouseP.x;
    ypoint = PIEmouseP.y;

    event.preventDefault();

    console.log("i m in mousedown");
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

var iold=0;
var to=0;
var point=[];
var p=0;
function setOn(){

     
        xp=(i)*0.1;
        console.log("IOLD"+i);
         values();
         iold=i;
        var velcoity=u+(a*xp);
        var geometry = new THREE.CircleGeometry( 0.15, 32 );
   var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    point[p] = new THREE.Mesh( geometry, material );
    point[p].position.set(-24.9+(i)*0.2,5+(1*velcoity/5),0.4);
       PIEaddElement(point[p]);
       p+=1;
        
    
    
    
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

///