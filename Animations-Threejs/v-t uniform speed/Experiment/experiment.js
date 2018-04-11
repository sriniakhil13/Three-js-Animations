// initialising the scene 
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;          /*Scene Center Y coordinate*/
var main = new THREE.Group();
var vp = new THREE.Group();
var vn = new THREE.Group();
var table_value = new THREE.Group();
var learngroup = new THREE.Group();
var i;
var material;
var geometry;
var line;
var gapPointT=0.2;
var meline;
var mesh1=new Array();
var car;
var xaxis;
var yaxis;
var circle=new Array();
var Velocity;
var alertforpos;
var alertforneg;
var alertflag=0;
var value_t = new Array();
var value_s = new Array();
var value_ss = new Array();
var st_learn=0;
var pointforlearn;
var squareforlearn;
var squareforlearn1;
var xlength;
var ylength;
var xarrow;
var xarrow1;
var yarrow;
var yarrow1;
var learntextony;
var learntextonx;
var extratext1;
var extratext2;
var star=1;
////////////////////////////


var helpContent;
function initialiseHelp(){
  helpContent="<h2>Help for Velocity-Time grpah of uniform speed motion</h2>";
  helpContent=helpContent+"<p><h3>Controls</h3></p>";
  helpContent=helpContent+"<p>1. Use learn for understanding the concept of experiment</p>";
  helpContent=helpContent+"<p>2. Use slider to set the velocity</p>";
  helpContent=helpContent+"<p>3. Reset to get back to initial state of experiment.</p>";
  helpContent=helpContent+"<p><h3>This experiment has two phases:</h3></p>";
  helpContent=helpContent+"<p>1. Learn phase</p>";
  helpContent=helpContent+"<p>2. Try urself</p>";
  helpContent=helpContent+"<p>Table on left side shows details of distance covered by car</p>";
  helpContent=helpContent+"<p>Student can click on graph to see the position of car at that particular time and distance covered by car in that time interval.</p>";
  PIEupdateHelp(helpContent);
}


var infoContent;
function initialiseInfo(){
  infoContent ="<h2>Important info of experiment:</h2>";
  infoContent =infoContent+"<p>In Velocity - Time Graph the area under curve represents displacement bewtween time T1 and T2 </p>";
  infoContent =infoContent+"<p>In case of constant velocity, distance covered in given time <b> Distance = Velocity*Time</b> </p>";
  infoContent =infoContent+"<p>Therefore Change in distace in given interval of time <b> (S2-S1) = Velocity*(T2-T1)</b> </p>"
  infoContent =infoContent+"<p>You can check this in the table given in the right side.</p>";
  PIEupdateInfo(infoContent);

}


///////////////////////////
function learn()
{
    Velocity=6;
    creategraph();
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointforlearn = new THREE.Mesh( geometry, material );
    pointforlearn.position.set(-24.9+(70)*0.2,5+(1*Velocity),0.4);
    learngroup.add(pointforlearn);

    var geometry = new THREE.PlaneGeometry(((70)*gapPointT) , (Velocity)+(gapPointT));
    var material = new THREE.MeshBasicMaterial({ color: 0xFFC0CB,  });
    squareforlearn = new THREE.Mesh(geometry, material);
    squareforlearn.position.x = -25 + ((70+1)*0.2)/2 ;
    squareforlearn.position.y = pointy + ((Velocity/2));
    learngroup.add(squareforlearn);

    var geometry = new THREE.PlaneGeometry(((70)*gapPointT) , (Velocity)+(gapPointT));
    var material = new THREE.MeshBasicMaterial({ color: 0xFFC0CB,  });
    squareforlearn1 = new THREE.Mesh(geometry, material);
    squareforlearn1.position.x = -25 + ((70+1)*0.2)/2 ;
    squareforlearn1.position.y = pointy + ((Velocity/2));
    learngroup.add(squareforlearn1);


    PIEaddElement(learngroup);
    PIEaddElement(vp);
    PIErender();
    tostartforlearnanimation();


}
function drawlength()
{
    var geometry = new THREE.PlaneGeometry(14, 0.18);     
    var material = new THREE.MeshBasicMaterial({ color: 0xA0522D, });
    
    xlength=new THREE.Mesh(geometry,material);
    
    xlength.position.set(21,6,0);
    learngroup.add(xlength);
    var dir = new THREE.Vector3( -1, 0, 0 );
    dir.normalize();
    var origin = new THREE.Vector3( 14,6,0 );
    var length = 1;
    var hex = 0x000000;
     xarrow= new THREE.ArrowHelper( dir, origin, length, hex,headLength=0.7);
    learngroup.add(xarrow);

    var dir = new THREE.Vector3( 1, 0, 0 );
    dir.normalize();
    var origin = new THREE.Vector3( 28,6,0 );
    var length = 1;
    var hex = 0x000000;
     xarrow1= new THREE.ArrowHelper( dir, origin, length, hex,headLength=0.7);
    learngroup.add(xarrow1);

    var geometry = new THREE.PlaneGeometry(0.18, 6); 
    var material = new THREE.MeshBasicMaterial({ color: 0xA0522D, });
      
    ylength=new THREE.Mesh(geometry,material);

    ylength.position.set(29,10.5,0);
    learngroup.add(ylength);


    var dir = new THREE.Vector3( 0, 1, 0 );
    dir.normalize();
    var origin = new THREE.Vector3( 29,13.5,0 );
    var length = 1;
    var hex = 0x000000;
     yarrow= new THREE.ArrowHelper( dir, origin, length, hex,headLength=0.7);
    learngroup.add(yarrow);

    var dir = new THREE.Vector3( 0, -1, 0 );
    dir.normalize();
    var origin = new THREE.Vector3( 29,7.5,0 );
    var length = 1;
    var hex = 0x000000;
     yarrow1= new THREE.ArrowHelper( dir, origin, length, hex,headLength=0.7);
    learngroup.add(yarrow1);


    //learntextonx

     var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "7", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        learntextonx = new THREE.Mesh(textGeom, textMaterial );
        learntextonx.position.set(21,4,0.1);
        
        learngroup.add(learntextonx);
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "6", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        learntextony = new THREE.Mesh(textGeom, textMaterial );
        learntextony.position.set(31,10.5,0.1);
        
        learngroup.add(learntextony);
        PIErender();
        
    });

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Area = 6 * 7 = 42", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        extratext1 = new THREE.Mesh(textGeom, textMaterial );
        extratext1.position.set(19,1,0.1);
        
        learngroup.add(extratext1);
        PIErender();
        
    });

    var materialFront = new THREE.MeshBasicMaterial( { color: 0x006400 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x006400 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    

    loader.load( 'optimer_bold.typeface.json', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Therefore, Area is equal to distance travelled (s = v * t) by car below", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        extratext2 = new THREE.Mesh(textGeom, textMaterial );
        extratext2.position.set(5,-1,0.1);
        
        learngroup.add(extratext2);
        PIErender();
        
    });


}

function creategraph()
{
    var geometry = new THREE.PlaneGeometry(22, 0.18);     
    var material = new THREE.MeshBasicMaterial({ color: 0xFF4500, });
    
    line=new THREE.Mesh(geometry,material);
    
    line.position.set(-14,5+(Velocity),0.1);
    main.add(line);
    PIErender();
}

function handle_vel(value)
{
    Velocity=value;
    PIEchangeDisplayText("Velocity",value);
    PIEremoveElement(vp);
    PIEremoveElement(vn);
    if(Velocity>0)
    {
    	car.position.x = -35;
 car.position.y = -16;
 car.position.z = 0;
    	PIEaddElement(vp);
    }
    else
    {
    	car.position.x=35;
    	car.position.y=-16;
    	PIEaddElement(vn);
    }
    main.remove(line);
    creategraph();
}
///

var mesh;
var mesh1 = [];             //Geometry for graphhelper for clicking
var pointCircle = [];       //Points clicked by user
var j=0;                    //number of points clicked by user
var squareD = new Array();
var iold=0;
var timeold;

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
var pointy=5;
var to=0;
var timearray=new Array();
function setOn(){

    
    if(i > iold)
    {
        var u;
        if(j>1){
            console.log("WTF11111");
        for(u=0;u<(j-1);u++)
        {
            main.remove(pointCircle[u]);
            PIErender();

        }
    }
    geometry = new THREE.CircleGeometry( 0.15, 32 );
    material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
    pointCircle[j] = new THREE.Mesh( geometry, material );
    pointCircle[j].position.set(-24.9+(i)*0.2,5+(1*Velocity),0.4);
    timearray[j]=(i*0.1).toFixed(2);
    meline=i-iold;
    main.add(pointCircle[j]);
    console.log("time"+" "+(i*0.25));
        
    update_table(timearray);



    if(Velocity>0){
        modValueVelocity=Velocity;
    }
    else{
        modValueVelocity = -Velocity;
        
    }

   console.log(Velocity+"modvaluevelocity");
    var geometry = new THREE.PlaneGeometry(((i-iold)*gapPointT) , (modValueVelocity)+(gapPointT));
   

    var material = new THREE.MeshBasicMaterial({ color: 0xFFC0CB,  });

    squareD[j] = new THREE.Mesh(geometry, material);
    squareD[j].position.x = -25 + ((i+1)*0.2)/2 + (iold*gapPointT)/2;
    squareD[j].position.y = pointy + ((Velocity/2));
    main.add(squareD[j]);
    get_values();
    time = (i+1)*0.14;
    
    if(j==0){
        timeold = 0;
    }else{
        timeold = (iold + 1)*0.14;
    }
        iold = i;

    j++;
    }
    

    
    

else if(Velocity > 0)
{
    PIEremoveElement(table_value);
    alertboxforpositive();
} else{
    PIEremoveElement(table_value);
    alertboxfornegative();
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

///

function initialiseControls()
{
    PIEaddInputCommand("Learn",function k()
    {
        learn();

    })
    PIEaddInputSlider("Velocity",0,handle_vel,-10,10,1);
    PIEaddDisplayText("Velocity",0);
    // PIEaddDisplayCommand("Reset",function s(){
    //     PIEstopAnimation();
    //     resetExperiment();
    // })
    
    
}
var SceneTLX;
var SceneTLY;
var SceneBRX;
var SceneBRY;
function initialiseOtherVariables()
{
    var linelength=20;
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

////
function xaxisvalue(){
    
    
    
    
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
        var textGeom = new THREE.TextGeometry( "2", 
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
        var textGeom = new THREE.TextGeometry( "4", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26,9,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "6", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26,11,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "8", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26,13,0.1);
        
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
        text_let1.position.set(-26.5,15,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Y-axis (Velocity)", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-28.5,17.15,0.1);
        
        main.add(text_let1);
        PIErender();
        

    });



     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "X-axis (Time)", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-2,4,0.1);
        
        main.add(text_let1);
        PIErender();
        
        
    });



    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-2", 
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
        var textGeom = new THREE.TextGeometry( "-4", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.3,0.5,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-6", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.3,-1.5,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "-8", 
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let1 = new THREE.Mesh(textGeom, textMaterial );
        text_let1.position.set(-26.3,-3.5,0.1);
        
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
        text_let1.position.set(-26.6,-5.5,0.1);
        
        main.add(text_let1);
        PIErender();
        
    });
    
    
    
    
    
    
}


////
var text_let1;
var fun1;
var fun2;
var spotLight;

function loadExperimentElements()
{
    PIEsetExperimentTitle("V-T Graph");
    PIEsetDeveloperName("srini akhil");
    
    PIEscene.background = new THREE.Color(0xFFEFD5);
    //initialiseHelp();
    //initialiseInfo(); 
    initialiseScene();
    initialiseControls()
    initialiseOtherVariables();
    initialiseInfo();
    initialiseHelp();
    
    document.getElementById("start").addEventListener("click", setOn);




    var geometry  = new THREE.BoxGeometry(75, 10, 0);
    var material  = new THREE.MeshBasicMaterial();

    var backgroundTexture = THREE.ImageUtils.loadTexture( 'xxx.png' );
    backgroundTexture.wrapS = backgroundTexture.wrapT = THREE.RepeatWrapping;
    backgroundTexture.repeat.set( 1,1 );
    
    material = new THREE.MeshBasicMaterial( { map: backgroundTexture } );
    material.side  = THREE.BackSide;
    var mesh  = new THREE.Mesh(geometry, material);
    mesh.position.y=-13;
    PIEaddElement(mesh);
    PIErender();



 //main code
    
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
    
    xaxisvalue();
    
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

    
    main.position.x=0;
    main.position.y=0;
    PIEaddElement(main);
    PIErender(); 
    console.log("group position:   " + main.position.x + main.position.y)
 // graph added 
    Velocity=0;
    creategraph();

    

    
    
    
    //// milestone

    geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '0-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=-35;
milestone.position.y=-8;

vp.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '10-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=-28;
milestone.position.y=-8;

vp.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '20-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=-21;
milestone.position.y=-8;

vp.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '30-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=-14;
milestone.position.y=-8;

vp.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '40-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=-7;
milestone.position.y=-8;

vp.add(milestone);


geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '50-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=0;
milestone.position.y=-8;

vp.add(milestone);


geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '60-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=7;
milestone.position.y=-8;

vp.add(milestone);


geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '70-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=14;
milestone.position.y=-8;

vp.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '80-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=21;
milestone.position.y=-8;

vp.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '90-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=28;
milestone.position.y=-8;

vp.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '100-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=35;
milestone.position.y=-8;

vp.add(milestone);


geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '0-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=35;
milestone.position.y=-8;

vn.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '10-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=28;
milestone.position.y=-8;

vn.add(milestone);


geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '20-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=21;
milestone.position.y=-8;

vn.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '30-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=14;
milestone.position.y=-8;

vn.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '40-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=7;
milestone.position.y=-8;

vn.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '50-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=0;
milestone.position.y=-8;

vn.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '60-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=-7;
milestone.position.y=-8;

vn.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '70-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=-14;
milestone.position.y=-8;

vn.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '80-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=-21;
milestone.position.y=-8;

vn.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '90-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=-28;
milestone.position.y=-8;

vn.add(milestone);

geometry = new THREE.PlaneGeometry(2, 4 );
 texture = THREE.ImageUtils.loadTexture( '100-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
var milestone = new THREE.Mesh( geometry, material );
milestone.position.x=-35;
milestone.position.y=-8;

vn.add(milestone);

    
    ////
    
    geometry = new THREE.PlaneGeometry(6.5, 3.5 );
 texture = THREE.ImageUtils.loadTexture( 'need-min.png', {}, function(){ PIErenderer.render(PIEscene, PIEcamera); } );
 material = new THREE.MeshBasicMaterial( { transparent:true, opacity: 1, map:texture} );
car = new THREE.Mesh( geometry, material );
 //setposition(car, centerX, carH/2, 0);
 car.position.x = -35;
 car.position.y = -16;
 car.position.z = 0;
 PIEaddElement(car); 
table_to_display();

		spotLight = new THREE.SpotLight( 0x126570 );
			spotLight.position.set( car.position.x,car.position.y,100);
			PIEaddElement(spotLight);
    
    
PIEsetAreaOfInterest(SceneTLX,SceneTLY,SceneBRX,SceneBRY);
    
}
function resetExperiment()
{

    main.remove(line);
    var u;
    for(u=0;u<j;u++)
    {
    	main.remove(pointCircle[u]);
    	main.remove(squareD[u]);
    }
    car.position.x=-35;
    car.position.y=-16;
   
    j=0;
    iold=0;
    timeold=0;
    
        	PIEremoveElement(alertforpos);
            PIEremoveElement(alertforneg);
            learngroup.remove(pointforlearn);
            learngroup.remove(squareforlearn1);
            learngroup.remove(squareforlearn);
            learngroup.remove(xlength);
            learngroup.remove(ylength);
            learngroup.remove(xarrow);
            learngroup.remove(xarrow1);
            learngroup.remove(yarrow);
            learngroup.remove(yarrow1);
            learngroup.remove(learntextony);
            learngroup.remove(learntextonx);
            learngroup.remove(extratext1);
            learngroup.remove(extratext2);
            PIEremoveElement(learngroup);
            star=1;
            st_learn=0;
    		PIErender();     

    		PIEupdateTableCell(1,0," ");
    		PIEupdateTableCell(2,0," ");
    		PIEupdateTableCell(3,0," ");
    		PIEupdateTableCell(4,0," ");
    		PIEupdateTableCell(1,2," ");
    		PIEupdateTableCell(2,2," ");
    		PIEupdateTableCell(3,2," ");
    		PIEupdateTableCell(4,2," ");





    
    
}
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
function alertboxforpositive()
{
    var materialFront = new THREE.MeshBasicMaterial( { color: 0x8B008B } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x8B008B } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    
    loader.load( 'optimer_bold.typeface.json', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Velocity is positive, So cannot go backwards",
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        alertforpos = new THREE.Mesh(textGeom, textMaterial );
        alertforpos.position.x=12;
        alertforpos.position.y=10;
        PIEaddElement(alertforpos);
        

        
    });

    alertflag=1;

}

function alertboxfornegative()
{
    var materialFront = new THREE.MeshBasicMaterial( { color: 0x8B008B } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x8B008B } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    
    loader.load( 'optimer_bold.typeface.json', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Velocity is negative, So cannot go forward",
        {
            size: 0.7, height: 0, 
            font: font, weight: "normal", style: "normal",
            
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        alertforneg = new THREE.Mesh(textGeom, textMaterial );
        alertforneg.position.x=12;
        alertforneg.position.y=10;
        PIEaddElement(alertforneg);
        

        
    });

    alertflag=1;

}

var timeused=0;
var totaldist;
var inmyscaletd;
var flag=1;
var texti;

 function update_table(time)
 {

 	var d;
 	var nvel=Velocity;
 	if(Velocity<0)
 	{
 		nvel=-Velocity;

 	}
 		var tostart=0;
 		if(time.length>4)
 		{
 			tostart=time.length-4;
 		}
 		for(d=1;d<5 && tostart<time.length;d++)
 		{
 			PIEupdateTableCell(d,0,time[tostart]);
 			if(tostart!=0){
 			PIEupdateTableCell(d,2,(((time[tostart]-time[tostart-1])*nvel)).toFixed(2));
 		}else{
 				PIEupdateTableCell(d,2,(((time[tostart])*nvel)).toFixed(2));
 		}
 			tostart+=1;
 		}

 		

    
 	

 	
 	
 	
 	

 	PIErender();



 }

function textBox(text){

    var bitmap = document.createElement('canvas');
    var g = bitmap.getContext('2d');
    bitmap.width = 1024;
    bitmap.height = 1024;
    g.fillStyle = '#FDF7E5';
    g.fillRect(0,0,bitmap.width,bitmap.height);
    g.font = 'Bold 500px Arial';
    g.fillStyle = '#000000';
    g.fillText(text, 250,550);
    var text1 = new THREE.Texture(bitmap)
    text1.needsUpdate = true;
  
    var geometryA = new THREE.BoxGeometry(1, 1, 0);
    var materialA = new THREE.MeshBasicMaterial({map: text1 ,color: 0xFDF6D5} );
    var tex = new THREE.Mesh( geometryA, materialA );
    return tex;
  
  }

function table_to_display()
{
	PIEcreateTable("Analysis", 5, 3, true);
	var fake="      ";
	PIEcreateTableCell(0,0,'th');
	PIEupdateTableCell(0,0,"Time");
	PIEupdateTableCell(0,1,"      ");
	PIEupdateTableCell(0,2,'Distance');
	PIEupdateTableColumn(1,fake);

	PIErender();
	
	
	



}
function get_values()
{
    
    
    
    console.log("ttttt"+meline);
    totaldist=(meline)*0.1*Velocity;
    
    console.log("NEW"+" "+totaldist);
    inmyscaletd=Math.abs(totaldist);
    PIEremoveElement(table_value);
    flag=0;
}
function tostartforlearnanimation()
{
    PIEremoveElement(table_value);
    console.log("HHHHHHHHHH");
    inmyscaletd=7*Velocity;
    totaldist=7*Velocity;
    star=0;
    PIEstartAnimation();

}
var timeusedforlearn=0;
function updateExperimentElements(t, dt)
{ 
    if(flag==0){
    
    console.log("NEW"+" "+totaldist+"  "+meline*0.1);
    timeused+=dt;
    if(timeused>60)
        {



            if(Velocity>0)
                {
                     

                    if(Math.abs(inmyscaletd)<1)
                    {
                    	if(inmyscaletd<0)
                    	{
                    		inmyscaletd=0;
                            flag=1;
                            PIEaddElement(table_value); 

                    		
                    	}
                    	else
                    	{
                    		car.position.x+=inmyscaletd;
                    		
                    		inmyscaletd=0;
                            flag=1;
                            PIEaddElement(table_value);

                    		
                    	}
                    }
                    else{
                    car.position.x+=1;
                    
                    inmyscaletd-=1.42;
                	}
                }
                else if(Velocity<0)
                     {
                    	
                     	if(Math.abs(inmyscaletd)<1)
                    {
                    	if(inmyscaletd<0)
                    	{
                    		inmyscaletd=0;

                    		flag=1;
                            PIEaddElement(table_value); 

                    	}
                    	else
                    	{
                    		car.position.x-=inmyscaletd;
                    		
                    		inmyscaletd=0;
                    		flag=1;
                            PIEaddElement(table_value); 

                    	}
                    }
                    else{
                    car.position.x-=1;
                    
                    inmyscaletd-=1.42;
                	}
                    }
            timeused=0;
        }
    }
    if(alertflag==1)
    {
        timeused+=dt;

        if(timeused>1500)
        {
            PIEremoveElement(alertforpos);
            PIEremoveElement(alertforneg);
            alertflag=0;
            timeused=0;
        }
    }
    if(st_learn==1)
    {
        timeusedforlearn+=dt;

        if(timeusedforlearn>100)
        {
           // squareforlearn.position.x //-18 8 // 21 10
           if(squareforlearn.position.x<=21)
           {
            squareforlearn.position.x+=1;
           }
           if(squareforlearn.position.y<=10)
           {
            squareforlearn.position.y+=0.5;
           }
           timeusedforlearn=0;
           if(squareforlearn.position.x>21 && squareforlearn.position.y>10)
           {
            st_learn=0;
            drawlength();
           }
        }

        
    }
    if(star==0)
    {
        timeused+=dt;
    if(timeused>60)
        {
            if(Math.abs(inmyscaletd)<1)
                    {
                        if(inmyscaletd<0)
                        {
                            inmyscaletd=0;
                            star=1;
                            st_learn=1;
                            

                            
                        }
                        else
                        {
                            car.position.x+=inmyscaletd;
                            
                            inmyscaletd=0;
                            star=1;
                            st_learn=1;
                            

                            
                        }
                    }
                    else{
                    car.position.x+=1;
                    
                    inmyscaletd-=1.42;
                    }
        }

    }
    
}
// x-axis
// arrow animation
