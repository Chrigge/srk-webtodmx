function startColorwheel(){
     // Responsive sizing of the color wheel
     var colorwheelSize = Math.min(window.innerWidth,window.innerHeight)*0.6;
     // Initialise color wheel
     var cw = Raphael.colorwheel($("#colorwheelInput .colorwheel")[0],colorwheelSize,100);
     // Connect input field to color wheel
     cw.input($("#colorwheelInput input")[0]);

     // Define what to do when the color changes
     cw.onchange(function(color){
         console.log(color.hex)
         sendPOSTValue (color.hex)
     })
}


// Sends the color data to
function sendPOSTValue (inputData) {
    var request = $.ajax ({
        url: "/ajax",
        type: "POST",
        data: { "colorValue":inputData },
        success: function (result) {
            console.log (result);
        }
    })
    request.done (function (response, textStatus, jqXHR) {
        console.log ("Color sent to server (POST)");
    })
    request.fail (function (jqXHR, textStatus, errorThrown) {
        console.error ("Error: " + textStatus, errorThrown);
    })
}

// Scanner functions
function updateScannerValsXPos(event){
     var valueSet = event.target.value;
     $( "input[name=xPos], input[name=xPosRange]" ).val(valueSet);
}

function updateScannerValsYPos(event){
     var valueSet = event.target.value;
     $( "input[name=yPos], input[name=yPosRange]" ).val(valueSet);
}

function updateScannerValsBrightness(event){
     var valueSet = event.target.value;
     $( "input[name=brightness], input[name=brightnessRange]" ).val(valueSet);
}

function create2dPanel(){
     var panelSize = Math.min(window.innerWidth,window.innerHeight)*0.6;
     var container = $(".2dPanel")[0];
     var paper = Raphael(container, panelSize, panelSize);
     var bgColor = "black";
     var panel = paper.rect(0, 0, panelSize, panelSize).attr({fill: bgColor});
     panel.node.style.cursor = "crosshair";

     var pointerRad = panelSize / 20;
     var pointer = paper.circle(panelSize / 2,panelSize / 2,pointerRad).attr({"stroke-width":4, stroke:"#fff"});

     panel.drag(
               function (dx, dy, x, y, event) {
                    xPos = Math.max(0, x - $(panel.node).offset().left);
                    xPos = Math.min(xPos, panelSize);
                    yPos = Math.max(0, y - $(panel.node).offset().top);
                    yPos = Math.min(yPos, panelSize);

                    console.log("Drag " + dx + " " + dy);
                    pointer.attr({cx: xPos, cy: yPos});
               },
               function (x, y, event) {
                    console.log("Start");

                    xPos = x - $(panel.node).offset().left;
                    yPos = y - $(panel.node).offset().top;
                    pointer.attr({cx: xPos, cy: yPos});
               },
               function () {
                    console.log("Stop");
               });

}
