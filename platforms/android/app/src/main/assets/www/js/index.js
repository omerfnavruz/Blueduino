var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var touchX, touchY;
var sy = 0;
var check = 0;

function success2(){
  console.log("aa");
}

function success(){

    //bluetoothSerial.showBluetoothSettings(success2,fail2);
    bluetoothSerial.connectInsecure("00:18:E4:40:00:06",
    function(){console.log("connected"); },
    function(){console.log("disconnected");});

}
function fail(){
  alert("Enable Bluetooth");
  bluetoothSerial.enable(success2, function (){alert("can't enable bluetooth");});
}
function fail2(){
  alert("there was an error");
}

    // C U S T O M      R E C T A N G L E     B U T T O N //

    function button(x, y, width, length, color, text){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = length;
      this.color = color;
      c.fillStyle = this.color;
      this.text = text
      this.px = this.width/this.text.length;
      this.draw = function(){
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.width, this.height);
        c.fillStyle = "white";
        c.font= this.px + "px Arial";
        c.fillText(
          this.text,
          this.x + this.width/2 - this.text.length*this.px/4,
          this.y + this.height/2 + this.px/4
         );
      };
    }



var app = {
  initialize: function(){this.bindEvents();},
  bindEvents: function () {document.addEventListener('deviceready',this.onDeviceReady(), false)},
  onDeviceReady: function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ////  B U T T O N     C O N F I G U R A T I O N S   //////

    var button1 = new button(50,canvas.height/2-50,100,100, "cyan" , "connect" );
    var button2 = new button(canvas.width-150,canvas.height/2-50,100,100,'red', "disconnect");
    var button3 = new button(canvas.width/2-50, canvas.height*3/4-50, 100, 100, "blue", "check");
    var button4 = new button(canvas.width/2-50, canvas.height*1/4-50, 100, 100, "purple", "write")


    window.addEventListener('touchstart', function(event){
      console.log(event.touches);

      touchX = event.touches[0].pageX;
      touchY = event.touches[0].pageY;
      console.log(touchX, touchY);

      if (touchX <= button1.x + button1.width && touchX >= button1.x) {
        if (touchY <= button1.y + button1.height && touchY >= button1.y) {


              bluetoothSerial.isEnabled(success,fail);



            //button1.x = Math.random()*(canvas.width + button1.width) - button1.width;
            //button1.y = Math.random()*(canvas.height + button1.height)- button1.height;
        }

      }

      if (touchX <= button3.x + button3.width && touchX >= button3.x) {
        if (touchY <= button3.y + button3.height && touchY >= button3.y) {

            bluetoothSerial.isConnected(function(){alert("status: connected");},
             function(){alert("status: disconnected"); });


        }
      }


        if (touchX <= button2.x + button2.width && touchX >= button2.x) {
          if (touchY <= button2.y + button2.height && touchY >= button2.y) {


              bluetoothSerial.disconnect();

          }
        }

        if (touchX <= button4.x + button4.width && touchX >= button4.x) {
          if (touchY <= button4.y + button4.height && touchY >= button4.y) {

                bluetoothSerial.isConnected(
                  function(){
                    var input = prompt("Write what you want to send to the terminal");
                    bluetoothSerial.write(input, function(){alert("Successfully Sent");}, fail2);
                  },
                  function(){alert("status: disconnected"); }
                );






          }
        }
    });

    window.addEventListener('touchend', function(event){
      console.log(event.changedTouches);

      if (touchX <= button1.x + button1.width && touchX >= button1.x) {
        if (touchY <= button1.y + button1.height && touchY >= button1.y) {

            check = 0;

            //button1.x = Math.random()*(canvas.width + button1.width) - button1.width;
            //button1.y = Math.random()*(canvas.height + button1.height)- button1.height;
        }
      }

    });

    button1.draw();
    button2.draw();
    button3.draw();
    button4.draw();

  }
}
app.initialize();
