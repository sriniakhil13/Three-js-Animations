
/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */
/* Room Objects */
var globalcount=-1;
var cube, plane;
var startTime   = Date.now();
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var geometry;
var material;
var candrag=0;
var score=0;
var textbox;
var group1 = new THREE.Group();
var group2 = new THREE.Group();
var group3=new THREE.Group();
var current;
var geometry;
var material;
var loader;
var texture;
var temp;
var p1= new THREE.Group();
var p2= new THREE.Group();
var p3=new THREE.Group();
var p4=new THREE.Group();
var p5=new THREE.Group();
var p5=new THREE.Group();
var p6=new THREE.Group();
var p7=new THREE.Group();
var p8=new THREE.Group();
var p9=new THREE.Group();
var p10=new THREE.Group();
var geometry;
var myBack;
var pdrag=new Array();
var cylinder;
var material;
var cherry = new Array();
var present_number;
var textMesh1;
var textMesh2;
var textMesh3;
var textMesh4;
var textMesh5;
var showOptions;
var learnMesh;
var learnMesh_main1;
var learnMesh_main2;
var text_let;
var text_no;
var tick;
var wrong1;
var ik=1;
var timeused=0;
var numcount=1;
var stop=false;
var Animation_start=false;
//////////////
/******************* Load Experiment objects code ***********************/

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Couting 21-50 help</h2>";
    helpContent = helpContent + "<p>There are two phases in the given activity - </p>";
    helpContent = helpContent + "<p>1. Learn</p>";
    helpContent = helpContent + "<p>2. Fill in the blanks</p>";
    helpContent = helpContent + "<h3>Learn</h3>";
    helpContent = helpContent + "<p>In this phase the student can see slideshow showing how exactly you can count the objects.</p>";
    helpContent = helpContent + "<h3>Fill in the blanks</h3>"
    helpContent = helpContent + "<p>In this phase there is field and 5 options</p>";
    helpContent = helpContent + "<p>The student should count the number of apples and drag the his (choice) option to the field</p>";
    helpContent = helpContent + "<p>Then if answer choosen by student is correct then a tick appears and score increases  by 1.</p>";
    helpContent = helpContent + "<p>if answer choosen is wrong a wrong mark appears, there is no decrement of score i.e no negative mark.</p>";
    helpContent = helpContent + "<p>Student can go to next question by clicking next button in controls area.</p>";
    helpContent = helpContent + "<p>If student chooses to submit the quiz, student can click on submit button in controls area.</p>";
    helpContent = helpContent + "<p>Student's final score will appear on screen.</p>";
    helpContent = helpContent + "<h3>Controls</h3>";
    helpContent = helpContent + "<p>1.Learn - This button displays the learning phase screen.</p>";
    helpContent = helpContent + "<p>2.Fill in the blanks - This button displays the Fill in the blanks section phase screen.</p>";
    helpContent = helpContent + "<p>3.Next - This button goes to next question.</p>";
    helpContent = helpContent + "<p>3.Submit - This button submits the Fill in the blanks phase.</p>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{ 
    infoContent =  "";
    infoContent = infoContent + "<h2>Couting 21-50 experiment concepts</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>This experiment helps to learn counting from 21 to 50 by demonstrating what actual couting means and test the student with quiz(Fill in the blanks).</p>";    
    PIEupdateInfo(infoContent);

}


/***************************/
function initialiseControlVariables()
{

}
current=true;
var can_go_next=false;
var can_learn=true;
var wenttolearn=0;
function initialiseControls()
{
    PIEaddDualCommand("learn",function name(){
       resetExperiment();

       a30();
    a29();
    a28();
    a21();
    a22();
    a23();
    a24();
    a25();
    a26();
    a27();
    PIErender();
       stop=true;
       console.log("XXXXX"+stop);
       PIEstartAnimation();
        learnMesh_main1.visible=false;
        //learnMesh_main2.visible=false;
        wenttolearn=1;
        
    });
    PIEaddDualCommand("Fill in the blanks",function name(){
        
        
            reset();
            //wait(1);
        learnMesh_main1.visible=false;
        
        PIErender();
        score=0;
        upd();
        can_go_next=true; 
        current=true;
        candrag=1;
        
        
   });
   PIEaddDualCommand("Next",function nextfun(){
    if(current && can_go_next)
        {
        	console.log("KUMAR");
        	candrag=1;
            reset();
        learnMesh_main1.visible=false;
        
        PIErender();
        upd();
        current=true;
        
        }
   });
    PIEaddDualCommand("submit",function submitfun(){
        reset();
        learnMesh_main1.visible=false;

        current=false;
        
        PIErender();
        can_go_next=false;
        tick.visible=false;
        wrong1.visible=false;
        showscore();
        current=true;
        
        
   });
}
var sc;
var score_text;
var score_text1;
var learn_end=true;
function showscore()
{
     var materialFront = new THREE.MeshBasicMaterial( { color: 0xFF00FF } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Score "+score, 
        {
            size: 10, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        sc = new THREE.Mesh(textGeom, textMaterial );
        sc.position.set(-35,30,2); 
        sc.name=0;
        PIEaddElement(sc);
        PIErender();
    });
    
    if(score<5){
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Try again,Try to Score atleast 5", 
        {
            size: 4, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        score_text = new THREE.Mesh(textGeom, textMaterial );
        score_text.position.set(-18,10,2); 
        
        PIEaddElement(score_text);
        PIErender();
        
    });
        
    }else{
        loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Hurray..! You learned couting..", 
        {
            size: 5, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        score_text1 = new THREE.Mesh(textGeom, textMaterial );
        score_text1.position.set(-15,0,2); 
        
        PIEaddElement(score_text1);
        PIErender();
        
    });
    }
        
}

function valuation()
{
     geometry = new THREE.BoxGeometry(7,10,0)
   tick = createMesh(geometry,"tick.png");
    tick.position.set(27,0,2)
    tick.visible=false;
    
    PIEaddElement(tick);
    geometry = new THREE.BoxGeometry(7,10,0)
   wrong1 = createMesh(geometry,"wrong.png");
    wrong1.position.set(27,0,2)
    wrong1.visible=false;
    PIEaddElement(wrong1);
}
function makevisiblefalse()
{
    PIEremoveElement(tick);
    PIEremoveElement(wrong1);
    
}
/*************************************/
function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = 0.0;
    mySceneTLY = 50;
    mySceneBRX = 50;
    mySceneBRY = 0.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
    
}
function initialiseOtherVariables()
{
    /* Barriers */
    leftB=mySceneTLX;
    rightB=mySceneBRX;
    bottomB=mySceneBRY;
    topB=mySceneTLY;
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
function random()
{
    return Math.floor((Math.random() * 30) + 21);
}
var arr = [];
function uniquerandom()
{
    
while(arr.length < 5){
    var randomnumber = Math.floor(Math.random()*30) + 21;
    if(arr.indexOf(randomnumber) > -1) continue;
    arr[arr.length] = randomnumber;
}
}
//***********************************Drag elements***********************//////////////////////////////
var OneX,OneY,OneZ,match=0;
var drag=[[10,10,2],[20,10,2],[0,10,2],[30,10,2],[40,10,2]];

function myMainDrag(element, newpos)
{
    OneX = newpos.x;
    OneY = newpos.y;
    OneZ = newpos.z;
    if(newpos.x< 15 && newpos.x>10 && newpos.y<0 && newpos.y>-2 && candrag)
    {
        OneX = 14;
        OneY = -1;
        OneZ = 2;
        if(pdrag[element.name]==present_number)
        {             
                tick.visible=true;
                candrag=0;
                score+=1;
        }
        else
        {
            wrong1.visible=true;
            candrag=0;
        }
        PIErender();
      PIEsetDrag(element,false);
      PIEsetDragEnd(element,myMainEnd);
      PIEsetDragStart(element,false);
    }
    
    element.position.set(OneX, OneY, OneZ);
}

function myMainEnd(element, newpos){
    
    element.position.set(14,-1,2)
    PIErender();
}

function myTwoEnd(element, newpos)
{
  element.position.set(drag[element.name][0],drag[element.name][1],drag[element.name][2]);
  PIErender();
}
/////***************************************************************************//////////////////
function multiplechoice()
{
	PIEremoveElement(textMesh1);
	PIErender();
	PIEremoveElement(textMesh2);
	PIErender();
	PIEremoveElement(textMesh3);
	PIErender();
	PIEremoveElement(textMesh4);
	PIErender();
	PIEremoveElement(textMesh5);
	PIErender();

    var materialFront = new THREE.MeshBasicMaterial( { color: 0x00FA9A } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x00FA9A } );
    var materialArray = [ materialFront, materialSide ];
    var loader = new THREE.FontLoader();

    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        
        var textGeom = new THREE.TextGeometry(arr[0], 
        {
            size: 3, height: 1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.01, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });  
    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        textMesh1 = new THREE.Mesh(textGeom, textMaterial );
        textMesh1.position.set(10,10,2);
        textMesh1.name=0;
        PIEaddElement(textMesh1);
        PIEdragElement(textMesh1);
        PIEsetDrag(textMesh1,myMainDrag);
        PIEsetDragEnd(textMesh1,myTwoEnd);
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        
        var textGeom = new THREE.TextGeometry(arr[1],{
            size: 3, height: 1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.01, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });  
    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        textMesh2 = new THREE.Mesh(textGeom, textMaterial );
        textMesh2.position.set(20,10,2);
        textMesh2.name=1;
     PIEaddElement(textMesh2);
        PIEdragElement(textMesh2);
        PIEsetDrag(textMesh2,myMainDrag);
        PIEsetDragEnd(textMesh2,myTwoEnd);
         PIErender();
    });
   
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        
        var textGeom = new THREE.TextGeometry(arr[2],{
            size: 3, height: 1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.01, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });  
    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        textMesh3 = new THREE.Mesh(textGeom, textMaterial );
    textMesh3.position.set(0,10,2);
         textMesh3.name=2;
     PIEaddElement(textMesh3);
        PIEdragElement(textMesh3);
        PIEsetDrag(textMesh3,myMainDrag);
        PIEsetDragEnd(textMesh3,myTwoEnd);
        PIErender();
        
    });
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        choice3= (Math.floor(Math.random()*10)+21)+30;
        var textGeom = new THREE.TextGeometry(arr[3],{
            size: 3, height: 1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.01, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });  
    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        textMesh4 = new THREE.Mesh(textGeom, textMaterial );
    textMesh4.position.set(30,10,2);
         textMesh4.name=3;
     PIEaddElement(textMesh4);
        PIEdragElement(textMesh4);
        PIEsetDrag(textMesh4,myMainDrag);
        PIEsetDragEnd(textMesh4,myTwoEnd);
        PIErender();
        
    });
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
       
        var textGeom = new THREE.TextGeometry(arr[4],{
            size: 3, height: 1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.01, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });  
    var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        textMesh5 = new THREE.Mesh(textGeom, textMaterial );
    textMesh5.position.set(40,10,2);
         textMesh5.name=4;
     PIEaddElement(textMesh5);
        PIEdragElement(textMesh5);
        PIEsetDrag(textMesh5,myMainDrag);
        PIEsetDragEnd(textMesh5,myTwoEnd);
        PIErender();
        
    });
    
    PIEaddElement(group2);
    
    
    
}
var text_in_fill;
var board;
function main(){
    
     valuation();
    
     var materialFront = new THREE.MeshBasicMaterial( { color: 0xFFFAFA } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0xFFFAFA } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Choose the correct option from above", 
        {
            size: 2, height: 0.1,
            font: font, style: "normal",
            
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
       text_in_fill  = new THREE.Mesh(textGeom, textMaterial );
        text_in_fill.position.set(-45,0,2); 
        text_in_fill.name=0;
        PIEaddElement(text_in_fill);
        });
    PIErender();
    var x=10;
    var y=0;
    var k=-1;
        present_number=arr[Math.floor(Math.random()*5)];
        pdrag.push(arr[0]);
        pdrag.push(arr[1]);
        pdrag.push(arr[2]);
        pdrag.push(arr[3]);
        pdrag.push(arr[4]);
        PIErender(); 
        geometry=new THREE.BoxGeometry(120,100,0);
        board=createMesh(geometry,'chalkboard.png');
        board.position.x=10;
        board.position.y=30;
        PIEaddElement(board);
        PIErender();
        PIErender(); 
        PIErender(); 
        PIErender(); 
        PIErender(); 

        for(i=0;i<present_number;i++)
        {
            k=k+1;
            geometry = new THREE.BoxGeometry(5,5,0.1)
            cherry[i] = createMesh(geometry,"1.png");
            cherry[i].position.set(-30+(k*x),55+y,2);
            if((i+1)%9==0)
            {
                y=y-6;
                k=-1;
            }
        
        PIEaddElement(cherry[i]);
        PIErender();
        cherry[i].visibile=true;
        group1.add(cherry[i]);
        PIErender(); 
        PIErender(); 
        PIErender(); 
        PIErender(); 
        
        
    }
    PIEaddElement(group1);
    PIErender(); 
geometry = new THREE.BoxGeometry( 6, 5, 0.1 );
 material = new THREE.MeshBasicMaterial( {color: 0xF0F8FF} );
 cube = new THREE.Mesh( geometry, material );
    cube.position.set(16,0,2);
    cube.visible=true;
    PIEaddElement(cube);
    PIErender(); 
   PIErender();
    multiplechoice();
  
    
}
var title= new THREE.Group();
function learntitle()
{
     
}
function learntitlechange()
{
    if(stop){
    var materialFront = new THREE.MeshBasicMaterial( { color: 0x006400} );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0xfffffff } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    learn_end=true;
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "Now Lets do a excerise..! Use controls", 
        {
            size: 3, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        learnMesh_main2 = new THREE.Mesh(textGeom, textMaterial );
        learnMesh_main2.position.set(-40,10,2); 
        learnMesh_main2.name=0;
        PIEaddElement(learnMesh_main2);
        PIErender();
        
       
           
        });
    }
    
}
///////////////////************* Main function**************?///////////////////////////////
function loadExperimentElements()
{
    current=true;
    PIEsetExperimentTitle("Counting 21-50");
    PIEsetDeveloperName("Srini Akhil");
    //PIEhideControlElement();
    
    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();
     initialiseControls();
    /* initialise Scene */
    initialiseScene();
    
    /* initialise Other Variables */
    initialiseOtherVariables();
    
    PIEscene.background = new THREE.Color(0x7FFFD4);
    PIErender();
    
     var materialFront = new THREE.MeshBasicMaterial( { color: 0x006400 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x006400 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry("Couting 21-50", 
        {
            size: 10, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        learnMesh_main1= new THREE.Mesh(textGeom, textMaterial );
        learnMesh_main1.position.set(-31,17,2); 
        learnMesh_main1.name=0;

        PIEaddElement(learnMesh_main1);
        learnMesh_main1.visible=true;
        PIErender();
        
        
       
           
        });
    PIErender();
  
        
    a30();
    a29();
    a28();
    a21();
    a22();
    a23();
    a24();
    a25();
    a26();
    a27();
    PIEadjustDisplayScene();
    PIErender();
   // document.getElementById("reset").remove();
    PIEsetAreaOfInterest(mySceneTLX-15, mySceneTLY+15, mySceneBRX, mySceneBRY-15);

} 
               

/**
 * This function resets the position of all experiment elements to their default values.
 * <p>
 * This is called during initial document load.
 * This is also be called by the system provided reset button.
 * <p>
 * Apart from the position, this should also reset all variables which can be controlled by the user.
 * This function will also clear any output variables/graphs
 */
function reset()
{
 
    for(i=0;i<present_number;i++)
        {
            group1.remove(cherry[i]);
            PIErender();
        }
    PIEremoveElement(group1);
    PIErender();
    arr =[];
    pdrag=[];
    PIEremoveElement(board);
    uniquerandom();
    stop=false;
    time=0;
    timeused=0;
   	// p1.visible=false;
   	// p2.visible=false;
   	// p3.visible=false;
   	// p4.visible=false;
   	// p5.visible=false;
   	// p6.visible=false;
   	// p7.visible=false;
   	// p8.visible=false;
   	// p9.visible=false;
   	// p10.visible=false;

    PIErender();
    PIEremoveElement(cube);
    PIErender();
    PIEremoveElement(score_text);
    PIErender();
    PIEremoveElement(score_text1);
    PIErender();
    PIEremoveElement(sc);
    PIErender();
    PIEremoveElement(text_in_fill);
    PIErender();
    PIEremoveElement(textMesh1);
    PIEremoveElement(textMesh2);
    PIErender();
    PIEremoveElement(textMesh3);
    PIEremoveElement(textMesh4);
    PIErender();
    PIEremoveElement(textMesh5);
    PIErender();
    PIEremoveElement(tick);
    PIEremoveElement(wrong1);
    if(wenttolearn){
    PIEremoveElement(learnMesh_main2);
    PIErender();
	}
    PIErender();
    PIEremoveElement(p1);
    PIErender();
   	PIEremoveElement(p2);
   	PIErender();
   	PIEremoveElement(p3);
   	PIErender();
   	PIErender();
   	PIEremoveElement(p4);
   	PIErender();
   	PIEremoveElement(p5);
   	PIErender();
   	PIEremoveElement(p6);
   	PIErender();
   	PIEremoveElement(p7);
   	PIErender();
   	PIEremoveElement(p8);
   	PIErender();
   	PIEremoveElement(p9);
   	PIErender();
   	PIEremoveElement(p10);

    PIErender(); 
    numcount=1;

    
}
function resetExperiment()
{
 
    for(i=0;i<present_number;i++)
        {
            group1.remove(cherry[i]);
            PIErender();
        }
    PIEremoveElement(group1);
    PIErender();
    arr =[];
    pdrag=[];
    PIEremoveElement(board);
    uniquerandom();
   	// p1.visible=false;
   	// p2.visible=false;
   	// p3.visible=false;
   	// p4.visible=false;
   	// p5.visible=false;
   	// p6.visible=false;
   	// p7.visible=false;
   	// p8.visible=false;
   	// p9.visible=false;
   	// p10.visible=false;

   	PIEremoveElement(p1);
   	PIErender();
   	PIEremoveElement(p2);
   	PIErender();
   	PIEremoveElement(p3);
   	PIErender();
   	PIEremoveElement(p4);
   	PIErender();
   	PIEremoveElement(p5);
   	PIErender();
   	PIEremoveElement(p6);
   	PIErender();
   	PIEremoveElement(p7);
   	PIErender();
   	PIEremoveElement(p8);
   	PIErender();
   	PIEremoveElement(p9);
   	PIErender();
   	PIEremoveElement(p10);
   	PIErender();

    PIErender();
    PIEremoveElement(cube);
    PIErender();
    PIEremoveElement(score_text);
    PIErender();
    PIEremoveElement(score_text1);
    PIErender();
    PIEremoveElement(sc);
    PIErender();
    PIEremoveElement(text_in_fill);
    PIErender();
    PIEremoveElement(textMesh1);
    PIErender();
    PIEremoveElement(textMesh2);
    PIErender();
    PIEremoveElement(textMesh3);
    PIErender();
    PIEremoveElement(textMesh4);
    PIErender();
    PIEremoveElement(textMesh5);
    PIErender();
    PIEremoveElement(tick);
    PIEremoveElement(wrong1);
    if(wenttolearn){
    
    PIEremoveElement(learnMesh_main2);
    PIErender();
	}
	learnMesh_main1.visible=true;
    PIErender();
    stop=false;
    numcount=1;
    PIErender(); 
    can_go_next=false;  
    time=0;
    timeused=0;
    
}
function upd(){
    makevisiblefalse();
    main();
}
var bunddle;
var bunddle1;
var bunddle2;
var animation_tex=["Twenty one","Twenty two","Twenty three","Twenty four","Twenty five","Twenty six","Twenty seven","Twenty eight","Twenty nine","Thirty","Thirty One","Thirty two","Thirty three","Thirty four","Thirty five","Thirty six","Thirty seven","Thirty eight","Thirty nine","Fourty","Fourty one","Fourty two","Fourty three","Fourty four","Fourty five","Fourty six","Fourty seven","Fourty eight","Fourty nine","Fifity"];
/////////////////***********slideshow learn phase functions***********************/////////////////////////
function a21()
{
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle = createMesh(geometry,"3.png");
    bunddle.position.set(-30,40,0.1)
    PIEaddElement(bunddle);
    p1.add(bunddle);
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xFF7F50 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x7FFF00 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-31,27,2);
        
        
        p1.add(text_let);
    });
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle1 = createMesh(geometry,"3.png");
    bunddle1.position.set(-20,40,0.1)
    PIEaddElement(bunddle1);
    p1.add(bunddle1);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-21,27,2);
        
        
        p1.add(text_let);
    });
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle2 = createMesh(geometry,"2.png");
    bunddle2.position.set(-10,40,0.1)
    PIEaddElement(bunddle2);
    p1.add(bunddle2);
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-11,27,2);
        
        
        p1.add(text_let);
    });
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "21", 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(25,40,2);
        
        
        p1.add(text_let);
    });
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( animation_tex[0], 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(15,10,2);
        
        
        p1.add(text_let);
    });
    
    
    
    PIEaddElement(p1);
    p1.visible=false;
}
function a22()
{
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle = createMesh(geometry,"3.png");
    bunddle.position.set(-30,40,0.1)
   
    p2.add(bunddle);
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-31,27,2);
        
        
        p2.add(text_let);
    });
    
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle1 = createMesh(geometry,"3.png");
    bunddle1.position.set(-20,40,0.1)
   
    p2.add(bunddle1);
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-21,27,2);
        
       
        p2.add(text_let);
    });
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle2 = createMesh(geometry,"2.png");
    bunddle2.position.set(-10,40,0.1)
    
    p2.add(bunddle2);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-11,27,2);
        
        
        p2.add(text_let);
    });
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle2 = createMesh(geometry,"2.png");
    bunddle2.position.set(-7,40,0.1)
    
    p2.add(bunddle2);
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-8,27,2);
        
        
        p2.add(text_let);
    });
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "22", 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(25,40,2);
        
        
        p2.add(text_let);
    });
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( animation_tex[1], 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(15,10,2);
        
        
        p2.add(text_let);
    });
    
    PIEaddElement(p2);
    PIErender(); 
    p2.visible=false;
}
function a23()
{
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle = createMesh(geometry,"3.png");
    bunddle.position.set(-30,40,0.1)
    
    p3.add(bunddle);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-31,27,2);
        
        
        p3.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle1 = createMesh(geometry,"3.png");
    bunddle1.position.set(-20,40,0.1)
   
    p3.add(bunddle1);
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-21,27,2);
        
        
        p3.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle2 = createMesh(geometry,"2.png");
    bunddle2.position.set(-10,40,0.1)
    
    p3.add(bunddle2);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-11,27,2);
        
       
        p3.add(text_let);
    });
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle2 = createMesh(geometry,"2.png");
    bunddle2.position.set(-7,40,0.1)
   
    p3.add(bunddle2);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-8,27,2);
        
        
        p3.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle2 = createMesh(geometry,"2.png");
    bunddle2.position.set(-4,40,0.1)
    
    p3.add(bunddle2);
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-5,27,2);
        
        
        p3.add(text_let);
    });
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "23", 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(25,40,2);
        
       
        p3.add(text_let);
    });
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( animation_tex[2], 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(15,10,2);
        
       
        p3.add(text_let);
    });
    
    
    PIEaddElement(p3);
    PIErender(); 
    p3.visible=false;
    PIErender(); 
}
function a24()
{
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( animation_tex[3], 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(15,10,2);
        
      
        p4.add(text_let);
    });
    
    
    
     geometry = new THREE.BoxGeometry(7,20,0)
   bunddle = createMesh(geometry,"3.png");
    bunddle.position.set(-30,40,0.1)
   
    p4.add(bunddle);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-31,27,2);
        
        
        p4.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle1 = createMesh(geometry,"3.png");
    bunddle1.position.set(-20,40,0.1)
   
    p4.add(bunddle1);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-21,27,2);
        
      
        p4.add(text_let);
    });
    
    
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle2 = createMesh(geometry,"2.png");
    bunddle2.position.set(-10,40,0.1)
   
    p4.add(bunddle2);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-11,27,2);
        
       
        p4.add(text_let);
    });
    
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle2 = createMesh(geometry,"2.png");
    bunddle2.position.set(-7,40,0.1)
  
    p4.add(bunddle2);
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-8,27,2);
        
       
        p4.add(text_let);
    });
    
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle2 = createMesh(geometry,"2.png");
    bunddle2.position.set(-4,40,0.1)
   
    p4.add(bunddle2);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-5,27,2);
        
      
        p4.add(text_let);
    });
    
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle2 = createMesh(geometry,"2.png");
    bunddle2.position.set(-1,40,0.1)
   
    p4.add(bunddle2);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-2,27,2);
        
       
        p4.add(text_let);
    });
    
    
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "24", 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(25,40,2);
        
       
        p4.add(text_let);
    });
    
    PIEaddElement(p4);
    PIErender(); 
    p4.visible=false;
    PIErender(); 
}
function a25()
    {
     var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( animation_tex[4], 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(15,10,2);
        
      
        p5.add(text_let);
    });
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle = createMesh(geometry,"3.png");
    bunddle.position.set(-30,40,0.1)
    
    p5.add(bunddle);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-31,27,2);
        
        
        p5.add(text_let);
    });
    
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle1 = createMesh(geometry,"3.png");
    bunddle1.position.set(-20,40,0.1)
   
    p5.add(bunddle1);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-21,27,2);
        
        
        p5.add(text_let);
    });
    
    
    
    
    geometry = new THREE.BoxGeometry(5,20,0)
   bunddle1 = createMesh(geometry,"4.png");
    bunddle1.position.set(-10,40,0.1)
   
    p5.add(bunddle1);
    
   
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "FIVE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-11,27,2);
        
      
        p5.add(text_let);
    });
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "25", 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(25,40,2);
        
        p5.add(text_let);
    });
    
    PIEaddElement(p5);
    p5.visible=false;
}
function a26()
{
    
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( animation_tex[5], 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(15,10,2);
        
       
        p6.add(text_let);
    });
    
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle = createMesh(geometry,"3.png");
    bunddle.position.set(-30,40,0.1)
   
    p6.add(bunddle);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-31,27,2);
        
                p6.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle1 = createMesh(geometry,"3.png");
    bunddle1.position.set(-20,40,0.1)
   
    p6.add(bunddle1);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-21,27,2);
        
       
        p6.add(text_let);
    });
    
    geometry = new THREE.BoxGeometry(5,20,0)
   bunddle1 = createMesh(geometry,"4.png");
    bunddle1.position.set(-10,40,0.1)
   
    p6.add(bunddle1);
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "FIVE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-11,27,2);
        
       
        p6.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle1 = createMesh(geometry,"2.png");
    bunddle1.position.set(-3,40,0.1)
   
    p6.add(bunddle1);
    
    
        loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-4,27,2);
        
      
        p6.add(text_let);
    });
    
    
    
    
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "26", 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(25,40,2);
        
       
        p6.add(text_let);
    });
    
    PIEaddElement(p6);
    p6.visible=false;
    PIErender(); 
}
function a27()
{
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( animation_tex[6], 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(15,10,2);
        
       
        p7.add(text_let);
    });
    
    
     geometry = new THREE.BoxGeometry(7,20,0)
   bunddle = createMesh(geometry,"3.png");
    bunddle.position.set(-30,40,0.1)
  
    p7.add(bunddle);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-31,27,2);
        
      
        p7.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle1 = createMesh(geometry,"3.png");
    bunddle1.position.set(-20,40,0.1)
  
    p7.add(bunddle1);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-21,27,2);
        
      
        p7.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(5,20,0)
   bunddle1 = createMesh(geometry,"4.png");
    bunddle1.position.set(-10,40,0.1)
 
    p7.add(bunddle1);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "FIVE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-11,27,2);
        
       
        p7.add(text_let);
    });
    
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle1 = createMesh(geometry,"2.png");
    bunddle1.position.set(-3,40,0.1);
  
    p7.add(bunddle1);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-4,27,2);
        
       
        p7.add(text_let);
    });
    
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle1 = createMesh(geometry,"2.png");
    bunddle1.position.set(0,40,0.1)
  
    p7.add(bunddle1);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-1,27,2);
        
      
        p7.add(text_let);
    });
    
    
    
    
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "27", 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(25,40,2);
        
    
        p7.add(text_let);
    });
    
    PIEaddElement(p7);
    p7.visible=false;
}
function a28()
{
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( animation_tex[7], 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(15,10,2);
        
       
        p8.add(text_let);
    });
    
     geometry = new THREE.BoxGeometry(7,20,0)
   bunddle = createMesh(geometry,"3.png");
    bunddle.position.set(-30,40,0.1)
   
    p8.add(bunddle);
    
    
        loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-31,27,2);
        
       
        p8.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle1 = createMesh(geometry,"3.png");
    bunddle1.position.set(-20,40,0.1)
  
    p8.add(bunddle1);
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-21,27,2);
        
       
        p8.add(text_let);
    });
    
    
    
    
    geometry = new THREE.BoxGeometry(5,20,0)
   bunddle1 = createMesh(geometry,"4.png");
    bunddle1.position.set(-10,40,0.1)
   
    p8.add(bunddle1);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "FIVE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-11,27,2);
        
       
        p8.add(text_let);
    });
    
    
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle1 = createMesh(geometry,"2.png");
    bunddle1.position.set(-3,40,0.1)
   
    p8.add(bunddle1);
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-4,27,2);
        
        p8.add(text_let);
    });
    
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle1 = createMesh(geometry,"2.png");
    bunddle1.position.set(0,40,0.1)
  
    p8.add(bunddle1);
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-1,27,2);
        
      
        p8.add(text_let);
    });
    
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle1 = createMesh(geometry,"2.png");
    bunddle1.position.set(3,40,0.1)
 
    p8.add(bunddle1);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(2,27,2);
        
       
        p8.add(text_let);
    });
    
    
    
    
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "28", 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(25,40,2);
        
      
        p8.add(text_let);
    });
    
    PIEaddElement(p8);
    p8.visible=false;
}
function a29()
{
    
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( animation_tex[8], 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(15,10,2);
        
       
        p9.add(text_let);
    });
    
    
    
     geometry = new THREE.BoxGeometry(7,20,0)
   bunddle = createMesh(geometry,"3.png");
    bunddle.position.set(-30,40,0.1)
    
    p9.add(bunddle);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-31,27,2);
        
       
        p9.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle1 = createMesh(geometry,"3.png");
    bunddle1.position.set(-20,40,0.1)
   
    p9.add(bunddle1);
    
    
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-21,27,2);
        
       
        p9.add(text_let);
    });
    
    
    geometry = new THREE.BoxGeometry(5,20,0)
   bunddle1 = createMesh(geometry,"4.png");
    bunddle1.position.set(-10,40,0.1)
    
    p9.add(bunddle1);
    
    
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "FIVE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-11,27,2);
        
        
        p9.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle1 = createMesh(geometry,"2.png");
    bunddle1.position.set(-3,40,0.1)
    
    p9.add(bunddle1);
    
    
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-4,27,2);
        
       
        p9.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle1 = createMesh(geometry,"2.png");
    bunddle1.position.set(0,40,0.1)
    
    p9.add(bunddle1);
    
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-1,27,2);
        
       
        p9.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(1,20,0)
   bunddle1 = createMesh(geometry,"2.png");
    bunddle1.position.set(3,40,0.1)
    
    p9.add(bunddle1);
    
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(2,27,2);
        
        
        p9.add(text_let);
    });
    
    
    
     geometry = new THREE.BoxGeometry(1,20,0)
   bunddle1 = createMesh(geometry,"2.png");
    bunddle1.position.set(6,40,0.1)
    
    p9.add(bunddle1);
    
    
     loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "ONE", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(5,27,2);
        
        
        p9.add(text_let);
    });
    
    
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "29", 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(25,40,2);
        
       
        p9.add(text_let);
    });
    
    PIEaddElement(p9);
    p9.visible=false;
}
function a30()
{
    var materialFront = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
    var materialSide = new THREE.MeshBasicMaterial( { color: 0x000088 } );
    var materialArray = [ materialFront, materialSide ];
     var loader = new THREE.FontLoader();
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( animation_tex[9], 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(15,10,2);
        
       
        p10.add(text_let);
    });
    
    
    
     geometry = new THREE.BoxGeometry(7,20,0)
   bunddle = createMesh(geometry,"3.png");
    bunddle.position.set(-30,40,0.1)
    
    p10.add(bunddle);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-31,27,2);
        
       
        p10.add(text_let);
    });
    
    
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle1 = createMesh(geometry,"3.png");
    bunddle1.position.set(-20,40,0.1)
    
    p10.add(bunddle1);
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-21,27,2);
        
       
        p10.add(text_let);
    });
    
    
    
    
    geometry = new THREE.BoxGeometry(7,20,0)
   bunddle1 = createMesh(geometry,"3.png");
    bunddle1.position.set(-10,40,0.1)
   
    p10.add(bunddle1);
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "TEN", 
        {
            size: 1, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(-11,27,2);
        
       
        p10.add(text_let);
    });
    
    
    
    
    
    loader.load( 'optimer_bold.typeface.js', function ( font ) {
        var textGeom = new THREE.TextGeometry( "30", 
        {
            size: 6, height: 0.1, curveSegments: 3,
            font: font, weight: "bold", style: "normal",
            bevelThickness: 0.01, bevelSize: 0.2, bevelEnabled: true,
            material: 0, extrudeMaterial: 0
        });        
        var textMaterial = new THREE.MeshFaceMaterial(materialArray);
        text_let = new THREE.Mesh(textGeom, textMaterial );
        text_let.position.set(25,40,2);
        
       
        p10.add(text_let);
    });
    
    PIEaddElement(p10);
    p10.visible=false;
    PIErender();
}

//////////////****************************************************************///////////////////////////////
var ten,five,one;
var time=0;
var flag=0;
////////////////?*******************Animation code*****************?////////////////////////////
function updateExperimentElements(t, dt)
{
    timeused+=dt;
    if(stop)
{
	console.log("PPPPPP"+stop);
    Animation_start=true;
        if(timeused>1000 && numcount==1)
        {
        	console.log("SSSSSSSSS");
            
            timeused=0;
            p1.visible=true;
            numcount+=1;
            
        }
    else if(timeused>2000 && numcount==2 ){
        timeused=0;
        p1.visible=false;
            p2.visible=true;
        numcount+=1;
    }
    else if(timeused>2000 && numcount==3 ){
        timeused=0;
        p2.visible=false;
            p3.visible=true;
        numcount+=1;
    }
    else if(timeused>2000 && numcount==4 ){
        timeused=0;
        p3.visible=false;
            p4.visible=true;
        numcount+=1;
    }
    else if(timeused>2000 && numcount==5 ){
        timeused=0;
        p4.visible=false;
            p5.visible=true;
        numcount+=1;
    }
    else if(timeused>2000 && numcount==6 ){
        timeused=0;
        p5.visible=false;
            p6.visible=true;
        numcount+=1;
    }
    else if(timeused>2000 && numcount==7 ){
        timeused=0;
        p6.visible=false;
            p7.visible=true;
        numcount+=1;
    }
    else if(timeused>2000 && numcount==8 ){
        timeused=0;
        p7.visible=false;
            p8.visible=true;
        numcount+=1;
    }
    else if(timeused>2000 && numcount==9 ){
        timeused=0;
        p8.visible=false;
            p9.visible=true;
        numcount+=1;
    }
    else if(timeused>2000 && numcount==10 ){
        timeused=0;
        p9.visible=false;
            p10.visible=true;
        numcount+=1;
    }
    else if(timeused>2000 && numcount>10)
        {
            p10.visible=false;
            learntitlechange();
            stop=false;
            Animation_start=false;
            PIEstopAnimation();
            
        }
}
    
}
 /////////////////////*********************End of animation code*//////////////////////////////////////////////   
///////////////////////////////////*************************END**************/////////////////////////////////////      
   

