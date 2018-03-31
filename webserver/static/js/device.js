/**
 * Class that handles DMX devices.
 * @param       int id         Device ID.
 * @param       string name    Name of DMX device.
 * @param       dictionary DMXModules Contains devices' modules in name: type convention.
 * @constructor
 */
function DMXDevice(id, name, DMXModules){
     var builtModules = {};

     var parentDiv = document.getElementById('DMXDevicesContainer');
     var div = document.createElement('div'); // creating div in vanilla JS, is cleaner, more addressable solution
     var domId = 'devId-' + id; // id of the div, defined by device id
     $(div).addClass('menuItem deviceDiv');
     $(div).attr('id', domId);
     $(parentDiv).append(div);

     var heading = document.createElement('div'); //make heading
     $(heading).addClass('deviceHeading');
     var headingInput = document.createElement('input'); //with editable input as title of device
     $(headingInput).attr('type', 'text');
     $(headingInput).val(name);
     $(heading).append(headingInput);
     $(div).append(heading);

     var menuEntry = document.createElement('a'); //create entry in menu
     $(menuEntry).html(name);
     $(menuEntry).attr('href', '#' + domId)

     $('#mainNav').append(menuEntry);

     heading.onkeyup = function(){ //bind devices name to menu entry
          $(menuEntry).html($(headingInput).val());
     }

     $.each(DMXModules, buildModules); // go through each module and build the modules

     function buildModules(moduleName, moduleType){
          // console.log(moduleName + ' ' + moduleType); // debug output

          if (moduleType == 'colorwheel') {
               builtModules[moduleName] = new ModuleColorwheel(moduleName, div);
               builtModules[moduleName].cw.onchange(function(color){
                    sendInstructions(moduleName, color);
               })
          }
          else if (moduleType == 'raw') {
               builtModules[moduleName] = new ModuleRaw(moduleName, div);
               builtModules[moduleName].onchange(function(value){
                    sendInstructions(moduleName, value);
               })
          }
          else if (moduleType == 'xyPanel') {
               builtModules[moduleName] = new ModuleXYPanel(moduleName, div);
               builtModules[moduleName].onchange(function(xValue, yValue){
                    sendInstructions(moduleName, xValue + ' ' + yValue);
               })
          }
          else {
               console.log('DMX-Device ' + moduleType + ' unkown.');
          }
     }

     // send information to DMX Server onchange
     function sendInstructions(moduleName, value){
          console.log(moduleName + ': ' + value);
     }
}

/**
 * Contructs and handles the colorwheel module
 * @param       string name      The name of the colorwheel module.
 * @param       htmlDOM parentDiv The DOM element, in which the colorwheel shall be built.
 * @constructor
 */
function ModuleColorwheel(name, parentDiv){
     // create module div
     var div = document.createElement('div');
     $(div).addClass('moduleDiv colorwheelDiv');
     $(parentDiv).append(div);

     // create heading as input
     var heading = $('<div class="moduleHeading colorwheelHeading"><input type="text" value="'+name+'"/></div>');

     //create label, div and input and set their attributes, append them to parent div
     var inputDiv = document.createElement('div');
     $(inputDiv).addClass('colorwheelInput');

     var colorwheelLabel = document.createTextNode('Color (hex): ');

     var colorwheelInput = document.createElement('input');
     $(colorwheelInput).attr('type','text');

     $(inputDiv).append(colorwheelLabel, colorwheelInput);

     var colorwheelDiv = document.createElement('div');
     $(colorwheelDiv).addClass('colorwheel');

     $(div).append(heading, inputDiv, colorwheelDiv);

     // Responsive sizing of the color wheel
     var colorwheelSize = Math.min(window.innerWidth,window.innerHeight)*0.6;
     // Initialise color wheel
     var cw = Raphael.colorwheel(colorwheelDiv,colorwheelSize,100);
     // Connect input field to color wheel
     cw.input(colorwheelInput);

     //define public variables
     this.cw = cw;
}

/**
 * Contructs and handles the xy panel module.
 * @param       string name         The name of the xy panel.
 * @param       htmlDOM parentDiv    The DOM element, in which the xy panel shall be built.
 * @param       {Number} [startX=127] Start x position of the panel.
 * @param       {Number} [startY=127] Start y position of the panel.
 * @constructor
 */
function ModuleXYPanel(name, parentDiv, startX = 127, startY = 127){
     var curX = startX, curY = startY;
     var changeCallback = false; // callback function for this module, false at init

     // create module div
     var div = document.createElement('div');
     $(div).addClass('moduleDiv xyDiv');
     $(parentDiv).append(div);

     // create heading as input
     var heading = $('<div class="moduleHeading xyHeading"><input type="text" value="'+name+'"/></div>');

     // create x/y value/range container div
     var  xInput,
          xRange,
          xDiv,
          yInput,
          yRange,
          yDiv;

     [xInput, xRange, xDiv] = createInputRange(startX, 'xDiv', 'x-Position: ');
     [yInput, yRange, yDiv] = createInputRange(startY, 'yDiv', 'y-Position: ');

     // add all value/range containers to overall div
     $(div).append(heading, xDiv, yDiv);

     // add event handlers
     createInputRangeEventHandlers(xInput, xRange);
     createInputRangeEventHandlers(yInput, yRange, false);

     // create xy panel
     var panelDiv = document.createElement('div');
     $(panelDiv).addClass('panelDiv');
     $(div).append(panelDiv);

     var  panelSize,
          pointer, // make the pointer an object variable
          xpos,
          ypos;

     createXYPanel();

     // show, which functions are public
     return returnPublicFunctions();

     // declare public functions (oop is messed up in js..)
     function returnPublicFunctions(){
         return {onchange: onchange};
     }

     // create input/bar
     function createInputRange(startVal, divClass, description){
          // create changable inputs
          var label = document.createTextNode(description);
          var input = document.createElement('input');
          var range = document.createElement('input');
          $(input).attr('type','number');
          $(range).attr('type','range');

          // add min, max, stepwidth and start value
          $(input).add($(range)).attr('min','0');
          $(input).add($(range)).attr('max','255');
          $(input).add($(range)).attr('step', '1');
          $(input).add($(range)).val(startVal);

          var irDiv = document.createElement('div');
          $(irDiv).addClass(divClass + ' rangeFader');
          $(irDiv).append(label, input, range);

          return [input, range, irDiv];
     }

     // setup event listeners
     function createInputRangeEventHandlers(input, range, isX = true){
          input.onchange = function(){
                              eventInputRangeOnChange($(range), $(input).val(), isX);
                           };
          range.onchange = function(){
                              eventInputRangeOnChange($(input), $(range).val(), isX);
                           };
          range.onmousemove = function(){
                              eventInputRangeOnChange($(input), $(range).val(), isX);
                           };
     }

     // create the xy panel
     function createXYPanel(){
          panelSize = Math.min(window.innerWidth,window.innerHeight)*0.6; // panel size, is global variable for cross assignment operations
          var paper = Raphael(panelDiv, panelSize, panelSize); // initialise Raphael (drawer class) container
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
                         // change values in range and submit values
                         eventPanelOnChange();
                    },
                    function (x, y, event) { // onmousedown function
                         xPos = x - $(panel.node).offset().left;
                         yPos = y - $(panel.node).offset().top;
                         // change values in range and submit values
                         eventPanelOnChange();
                    },
                    function () { // onmouseup function
                         //console.log("Stop");
                    });
     }

     // adjust values accordingly onchange of the input or range
     function eventInputRangeOnChange(element, value, isX = true){
         element.val(value);
         var valuePanel = panelSize / 255.0 * value;// convert 8-bit value to location value for xy panel

         if( !isX ){
              curY = value;
              pointer.attr({cy: valuePanel});
         }
         else{
             curX = value;
             pointer.attr({cx: valuePanel});
         }
         executeCallback();
     }

     // adjust values accordingly onchange/click of the xy panel pointer
     function eventPanelOnChange(){
          pointer.attr({cx: xPos, cy: yPos}); // assign new pointer position
          // console.log(xPos + ' ' + yPos); // debug output

          // convert pointer position to 8-bit value and save it
          curX = Math.round( 255.0 / panelSize * xPos );
          curY = Math.round( 255.0 / panelSize * yPos );

          // change input and range positions
          $(xInput).val(curX);
          $(xRange).val(curX);

          $(yInput).val(curY);
          $(yRange).val(curY);

          // execute callback to send new values
          executeCallback();
     }

     // executes callback function, if it is defined
     function executeCallback(){
          // if a callback function changeCallback is defined, the execute it with x/y argument
          if (({}).toString.call(changeCallback).match(/function/i)){
            changeCallback(curX, curY);
          }
     }

     // function to be executed, when the callback function is executed
     function onchange(callback){
         changeCallback = callback;
         return {onchange: onchange};
     }
}

/**
 * Contructs and handles the raw module.
 * @param       string name           The name of the raw module.
 * @param       htmlDOM parentDiv      The DOM element, in which the xy panel shall be built.
 * @param       {Number} [startVal=127] [description]
 * @constructor
 */
function ModuleRaw(name, parentDiv, startVal = 127){
     var curVal = startVal;
     var changeCallback = false; // callback function for this module, false at init

     // create module div
     var div = document.createElement('div');
     $(div).addClass('moduleDiv rawDiv');
     $(parentDiv).append(div);

     // create heading as input
     var heading = $('<div class="moduleHeading rawHeading"><input type="text" value="'+name+'"/></div>');

     // create label
     var label = document.createTextNode(name + ': ');

     // create changable inputs
     var inputsDiv = document.createElement('div');
     $(inputsDiv).addClass('rangeFader');

     var input = document.createElement('input');
     $(input).attr('type','number');

     var range = document.createElement('input');
     $(range).attr('type','range');

     // add min, max, stepwidth and start value
     $(input).add($(range)).attr('min','0');
     $(input).add($(range)).attr('max','255');
     $(input).add($(range)).attr('step', '1');
     $(input).add($(range)).val(startVal);

     $(inputsDiv).append(label, input, range);

     $(div).append(heading, inputsDiv);

     // event handlers for changes
     input.onchange = function(){
                         eventOnChange($(range), $(input).val());
                      };
     range.onchange = function(){
                         eventOnChange($(input), $(range).val());
                      };
     range.onmousemove = function(){
                         eventOnChange($(input), $(range).val());
                      };

     // show, which functions are public
     return returnPublicFunctions();

     // declare public functions (oop is messed up in js..)
     function returnPublicFunctions(){
          return {onchange: onchange};
     }

     // adjust values accordingly onchange of the input or range
     function eventOnChange(element, value){
          element.val(value);
          curVal = value;
          // if a callback function changeCallback is defined, the execute it with one argument
          if (({}).toString.call(changeCallback).match(/function/i)){
            changeCallback(curVal);
          }
     }

     // function to be executed, when the callback function is executed
     function onchange(callback){
          changeCallback = callback;
          return {onchange: onchange};
     }
}
