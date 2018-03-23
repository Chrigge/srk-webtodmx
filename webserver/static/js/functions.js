// PAR function
function startColorwheel(){
     // Responsive sizing of the color wheel
     var colorwheelSize = Math.min(window.innerWidth,window.innerHeight)*0.6;
     // Initialise color wheel
     var cw = Raphael.colorwheel($("#colorwheelInput .colorwheel")[0],colorwheelSize,100);
     // Connect input field to color wheel
     cw.input($("#colorwheelInput input")[0]);

     // Define what to do when the color changes
     cw.onchange(function(color){
         var devID = $( "input[name=devIDPar]" ).val();
         sendPOSTValue ({"deviceID": devID, "colorValues": color.hex});
     })
}

// Scanner functions
function updateScannerValsPos(event, axis){ // update range bars, xy position informations and xy panel when changing range bars or xy position in text fields
     var valueSet = event.target.value;
     var valuePanel = panelSize / 255.0 * valueSet;// convert midi value to location value

     if (axis == "x") {
          $( "input[name=xPos], input[name=xPosRange]" ).val(valueSet);
          var otherValue = $( "input[name=yPos]" ).val();
          pointer.attr({cx: valuePanel});

          sendXYvalues(valueSet, otherValue);
     }
     if (axis == "y") {
          $( "input[name=yPos], input[name=yPosRange]" ).val(valueSet);
          var otherValue = $( "input[name=xPos]" ).val();
          pointer.attr({cy: valuePanel});

          sendXYvalues(otherValue, valueSet);
     }

}

function updateScannerValsBrightness(event){ // update scanner brightness
     var valueSet = event.target.value;
     $( "input[name=brightness], input[name=brightnessRange]" ).val(valueSet);
}

function updateScannerValsXYPos(xPos, yPos){ // update xy range bar and value field after changing xy-Panel value
     $( "input[name=xPos], input[name=xPosRange]" ).val(Math.round(xPos));
     $( "input[name=yPos], input[name=yPosRange]" ).val(Math.round(yPos));
     sendXYvalues(xPos, yPos); // send values via AJAX
}

function create2dPanel(){
     panelSize = Math.min(window.innerWidth,window.innerHeight)*0.6; // panel size, is global variable for cross assignment operations
     var container = $(".2dPanel")[0]; // draw panel here
     var paper = Raphael(container, panelSize, panelSize); // initialise Raphael (drawer class) container
     var bgColor = "black";
     var panel = paper.rect(0, 0, panelSize, panelSize).attr({fill: bgColor}); // creates rectangular, "xy-panel"
     panel.node.style.cursor = "crosshair"; // cursor style

     var pointerRad = panelSize / 20; // size of pointer of xy-panel
     pointer = paper.circle(panelSize / 2,panelSize / 2,pointerRad).attr({"stroke-width":4, stroke:"#fff"}); // creates pointer of xy-panel, is global variable for cross assignment operations

     panel.drag(
               function (dx, dy, x, y, event) { // onmove function
                    // recalculate position of pointer
                    xPos = Math.max(0, x - $(panel.node).offset().left);
                    xPos = Math.min(xPos, panelSize);
                    yPos = Math.max(0, y - $(panel.node).offset().top);
                    yPos = Math.min(yPos, panelSize);

                    pointer.attr({cx: xPos, cy: yPos}); // and assign it

                    updateScannerValsXYPos(255.0 / panelSize * xPos, 255.0 / panelSize * yPos);
               },
               function (x, y, event) { // onmousedown function
                    xPos = x - $(panel.node).offset().left;
                    yPos = y - $(panel.node).offset().top;
               },
               function () { // onmouseup function
                    //console.log("Stop");
               });

}

function sendXYvalues(xPos, yPos){
     sendPOSTValue({"deviceID": "4", "x": xPos, "y": yPos});
}

///////// CLASS INDEPENDET FUNCTIONS
// Sends the color data to
function sendPOSTValue (inputValue) {
    console.log(inputValue);
    var request = $.ajax ({
        url: "/ajax",
        type: "POST",
        data: inputValue,
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
