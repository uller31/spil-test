            var canvas_ctx;                 
            var ax = 0;                     
            var ay = 0;                     
			var x;
			var y;
			var vx = 0;
			var vy = 0;
			var WIDTH = 320;
			var HEIGHT = 300;              
            var RADIUS = 10;                
            var watchID = null;            
			

            function onLoad() {
				document.addEventListener("deviceready",onDeviceReady, false);
            }

			function onDeviceReady(){
				    var canvas = document.getElementById("canvas");
                    canvas_ctx = canvas.getContext("2d");
                    x = WIDTH / 2 ;
                    y = HEIGHT/ 2 ;
                    vx = 0;
                    vy = 0;

                    var options = { frequency: 30 };
                    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

                    setInterval(draw, 30);
			}	
				
            function stopWatch()
            {
                if (watchID) {
                    navigator.accelerometer.clearWatch(watchID);
                    watchID = null;
                }
            }
            
            function onSuccess( acceleration )
            {
                ax = acceleration.x * "-.1";
                ay = acceleration.y * ".1";
				var timestamp = acceleration.timestamp;
				document.getElementById('accelerometer').innerHTML = 'Acceleration X: ' + ax + '<br/>' +
				'Acceleration Y: ' + ax + '<br />' +
				'Timestamp: ' + timestamp + '<br />';
            }
            
            function onError()
            {
                alert("Accelerometer Error");
            }
            
            function circle( x, y, r )
            {
                canvas_ctx.beginPath();
                canvas_ctx.arc(x, y, r, 0, Math.PI*2, true);
                canvas_ctx.fill();
            }
        
            function rect( x, y, w, h )
            {
                canvas_ctx.beginPath();
                canvas_ctx.rect(x,y,w,h);
                canvas_ctx.closePath();
                canvas_ctx.fill();
            }
          
            function clear()
            {
                canvas_ctx.clearRect(0, 0, WIDTH, HEIGHT);
            }
           
            function draw()
            {
               
                vx += ax;
                vy += ay;
                x += vx;
                y += vy;
                if ( x + RADIUS > WIDTH  )
                {
                    x = WIDTH - RADIUS ;
                    vx = 0;
                }
                if (x - RADIUS  <= 0)
                {
                    x = RADIUS   ;
                    vx = 0;
                }
                if (y +  RADIUS  > HEIGHT)
                {
                    y = HEIGHT - RADIUS ;
                    vy = 0;
                }
               
                if (y - RADIUS  <= 0)
                {
                    y = RADIUS  ;
                    vy = 0;
                }
                                 
               
                clear();

               
                canvas_ctx.fillStyle = "rgba(255, 255, 0, .2)";
                rect( 0, 0, WIDTH, HEIGHT );

             
                canvas_ctx.fillStyle = "#FF0000";
                circle( x, y, RADIUS );
            }
		function up(){
			var RADIUS = +1;
		}
		
		function down(){
			var RADIUS = -1;
		}