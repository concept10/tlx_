const Clutter = imports.gi.Clutter;
const GdkPixbuf = imports.gi.GdkPixbuf;
const Rsvg = imports.gi.Rsvg;

function drawCircleWithFadingSVGInside() {
    // Initialize Clutter
    Clutter.init(null);

    // Create a Clutter stage (canvas)
    let stage = new Clutter.Stage();
    stage.set_size(200, 200);
    stage.set_color(new Clutter.Color({ red: 0, green: 0, blue: 0, alpha: 0 })); // Transparent background
    stage.connect('destroy', Clutter.main_quit);
    stage.show();

    // Create a Clutter rectangle to represent the outer circle
    let outerCircle = new Clutter.Actor();
    outerCircle.set_size(160, 160);
    outerCircle.set_background_color(new Clutter.Color({ red: 0.3, green: 0.5, blue: 0.8, alpha: 255 }));
    outerCircle.set_pivot_point(0.5, 0.5);
    outerCircle.set_position(20, 20);
    stage.add_child(outerCircle);

    // Create a Clutter rectangle to represent the inner circle
    let innerCircle = new Clutter.Actor();
    innerCircle.set_size(80, 80);
    innerCircle.set_background_color(new Clutter.Color({ red: 0.8, green: 0.3, blue: 0.5, alpha: 255 }));
    innerCircle.set_pivot_point(0.5, 0.5);
    innerCircle.set_position(60, 60);
    outerCircle.add_child(innerCircle);

    // Load SVG data (replace 'path/to/your/svg.svg' with the actual path to your SVG file)
    let svgData = GdkPixbuf.Pixbuf.new_from_file_at_scale("path/to/your/svg.svg", 80, 80, true, null);

    // Create Rsvg handle from SVG data
    let svgHandle = new Rsvg.Handle();
    svgHandle.write(svgData.get_pixels());
    svgHandle.close();

    // Create ClutterActor for SVG image
    let svgActor = new Clutter.Actor();
    svgActor.set_pivot_point(0.5, 0.5);
    svgActor.set_position(0, 0);
    svgActor.set_size(80, 80);
    svgActor.set_content(svgHandle);
    innerCircle.add_child(svgActor);

    // Create animations for fade-in and rotation
    let fadeAnimation = new Clutter.Animation();
    fadeAnimation.set_duration(1000); // 1000ms (1 second) fade-in duration
    fadeAnimation.set_mode(Clutter.AnimationMode.EASE_OUT_QUAD);
    fadeAnimation.add_track(new Clutter.Alpha({ opacity: 0 }));
    fadeAnimation.add_track(new Clutter.Alpha({ opacity: 255 }));
    fadeAnimation.connect('completed', () => {
        rotateAnimation.run();
    });

    let rotateAnimation = new Clutter.Animation();
    rotateAnimation.set_duration(100); // 100ms (0.1 seconds) per rotation
    rotateAnimation.set_mode(Clutter.AnimationMode.LINEAR);
    rotateAnimation.add_track(new Clutter.RotateAngle());
    rotateAnimation.connect('tick', (animation, progress) => {
        innerCircle.set_rotation_angle(Clutter.RotateAxis.Z_AXIS, progress * 360);
    });

    // Run the fade-in animation
    fadeAnimation.run();

    // Show the stage
    stage.show_all();

    // Start the Clutter main loop
    Clutter.main();
}

drawCircleWithFadingSVGInside();