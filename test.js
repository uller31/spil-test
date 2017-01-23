            var canvas_ctx;                 // HTML canvas 2d context
            var ax = 0;                     // Acceleration x axis (Accelerometer value adjusted for direction)
            var ay = 0;                     // Acceleration y axis (Accelerometer value adjusted for direction)
            var x;                          // Circle x position
            var y;                          // Circle y position
            var vx = 0;                     // Velocity x axis
            var vy = 0;                     // Velocity y axis
            var WIDTH = 320;                // Width of canvas
            var HEIGHT = 300;               // Height of canvas
            var RADIUS = 10;                // Width of circle object
            var watchID = null;             // Accelerometer.watchAcceleration return value.

            /* DOM body onload event callback */
            document.addEventListener
            (
                "deviceready",
                /* Cordova has been initialized and is ready to roll */
                function onLoad()
                {
                    /* Initialize canvas and animation */
                    var canvas = document.getElementById("canvas");
                    canvas_ctx = canvas.getContext("2d");
                    // Center
                    x = WIDTH / 2 ;
                    y = HEIGHT/ 2 ;
                    /* Steps to start animation play */
                    vx = 0;
                    vy = 0;

                    /* Start watching the accelerometer */
                    // Canvas redraw speed in milliseconds and accelerometer frequency
                    var options = { frequency: 30 };
                    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);

                    // Draw time interval.
                    setInterval(draw, 30);
                },
                false
            );


            // Stop watching the accelerometer
            function stopWatch()
            {
                if (watchID) {
                    navigator.accelerometer.clearWatch(watchID);
                    watchID = null;
                }
            }
            /* Accelerometer data callback */
            function onSuccess( acceleration )
            {
                // Set drawing acceleration values
                ax = acceleration.x * '-.1';
                ay = acceleration.y * '.1';
            }
            /*  Accelerometer error callback */
            function onError()
            {
                alert("Accelerometer Error");
            }
            /* Draw circle */
            function circle( x, y, r )
            {
                canvas_ctx.beginPath();
                canvas_ctx.arc(x, y, r, 0, Math.PI*2, true);
                canvas_ctx.fill();
            }
            /* Draw rectangle */
            function rect( x, y, w, h )
            {
                canvas_ctx.beginPath();
                canvas_ctx.rect(x,y,w,h);
                canvas_ctx.closePath();
                canvas_ctx.fill();
            }
            /* Clear canvas */
            function clear()
            {
                canvas_ctx.clearRect(0, 0, WIDTH, HEIGHT);
            }
            /* Compute drawing metrics and draw frame */
            function draw()
            {
                // Increase velocity by acceleration
                vx += ax;
                vy += ay;
                // Update circle drawing position.
                x += vx;
                y += vy;
                /* Boundaries testing */
                // Right boundary
                if ( x + RADIUS > WIDTH  )
                {
                    x = WIDTH - RADIUS ;
                    vx = 0;
                }
                // Left boundary
                if (x - RADIUS  <= 0)
                {
                    x = RADIUS   ;
                    vx = 0;
                }
                // Bottom boundary
                if (y +  RADIUS  > HEIGHT)
                {
                    y = HEIGHT - RADIUS ;
                    vy = 0;
                }
                // Top boundary
                if (y - RADIUS  <= 0)
                {
                    y = RADIUS  ;
                    vy = 0;
                }
                                 
                /* Draw frame */
                // Clear canvas
                clear();

                // Draw canvas background
                canvas_ctx.fillStyle = "rgba(255, 255, 0, .2)";
                rect( 0, 0, WIDTH, HEIGHT );

                /* Draw circle // Circle color */
                canvas_ctx.fillStyle = "#FF0000";
                circle( x, y, RADIUS );
            }