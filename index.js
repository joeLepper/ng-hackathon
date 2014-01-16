var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/tty.Sphero-OPP-RN-SPP' },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(me) {
      var color = '0x00FF00';
      var bitFilter = 0xFFFF00;
      var orientation = 90;

      function newRoll(){
        me.sphero.roll(90, -orientation);
      }

      me.sphero.on('start', function() {
        console.log("Setting up Collision Detection...");
        me.sphero.detectCollisions();
        me.sphero.setRGB(color);
        // me.sphero.stop();
      });

      me.sphero.on('collision', function(data) {
        orientation += 90;
        if( orientation > 360) orientation -= 360;
        console.log(orientation);

        console.log("Collision:");
        color = color ^ bitFilter;
        console.log("Color: " + (color.toString(16)) + " ");
        me.sphero.setRGB(color);
        setTimeout(function newRoll(){
          me.sphero.roll(-90, orientation);
        }, 1000);
        //me.sphero.roll(90, orientation);
      });

    }
}).start();