var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var touchX, touchY;
var sy = 0;
var check = 0;

function success(){
  console.log("yey");
}
function fail(){
  console.log("fail");
}



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('touchstart', function(event){
  console.log(event.touches);

  touchX = event.touches[0].pageX;
  touchY = event.touches[0].pageY;
  console.log(touchX, touchY);

  if (touchX <= button1.x + button1.width && touchX >= button1.x) {
    if (touchY <= button1.y + button1.height && touchY >= button1.y) {


        check = 1;


        //button1.x = Math.random()*(canvas.width + button1.width) - button1.width;
        //button1.y = Math.random()*(canvas.height + button1.height)- button1.height;
    }
  }


    if (touchX <= button2.x + button2.width && touchX >= button2.x) {
      if (touchY <= button2.y + button2.height && touchY >= button2.y) {


          check = 0;

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

// C U S T O M      R E C T A N G L E     B U T T O N //

function button(x, y, width, length, color){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = length;
  this.color = color;
  c.fillStyle = this.color;
  this.draw = function(){c.fillRect(this.x, this.y, this.width, this.height);};
}
////  B U T T O N     C O N F I G U R A T I O N S   //////

var button1 = new button(50,canvas.height/2-25,50,50, 'cyan' );
var button2 = new button(canvas.width-100,canvas.height/2-25,50,50,'red');


button1.draw();
button2.draw();

bluetoothSerial.connect("00:18:E4:40:00:06",success(), fail());

if (check) {
  bluetoothSerial.write("basla");
}
else bluetoothSerial.write("dur");
