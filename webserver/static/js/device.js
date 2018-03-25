function DMXDevice(id, name, DMXModules){
     var builtModules = {};

     var div = $('<div class="device">Hello</div>');
     $('#DMXDevicesContainer').append(div);
     $(div).html('test');

     $.each(DMXModules, buildModules);

     function buildModules(moduleName, moduleType){
          console.log(moduleName + ' ' + moduleType);
          if (moduleType == 'colorwheel') {
               builtModules[moduleName] = new ModuleColorwheel(div);
               /*builtModules[moduleName].cw.onchange(function(color){
                    console.log(color);
               })*/
          }
     }
}

function ModuleColorwheel(parentDiv){
     var colorwheelDiv = $('<div class="colorwheel"></div>');
     var colorwheelInput = $('<input>').attr('type','text');
     $(parentDiv).append(colorwheelDiv, colorwheelInput);

     // Responsive sizing of the color wheel
     var colorwheelSize = Math.min(window.innerWidth,window.innerHeight)*0.6;
     // Initialise color wheel
     var cw = Raphael.colorwheel($(colorwheelDiv),colorwheelSize,100);
     // Connect input field to color wheel
     cw.input($(colorwheelInput));

     // Define what to do when the color changes

}
