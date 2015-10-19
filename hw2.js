function hexFromRGB(r, g, b) {
    var hex = [
      r.toString( 16 ),
      g.toString( 16 ),
      b.toString( 16 )
    ];
    $.each( hex, function( nr, val ) {
      if ( val.length === 1 ) {
        hex[ nr ] = "0" + val;
      }
    });
    return hex.join( "" ).toUpperCase();
  }
  //http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
  function hexToRgb(hex) {
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return [r,g,b];
}

  function refreshSwatch() {
    var red = $( "#red" ).slider( "value" ),
      green = $( "#green" ).slider( "value" ),
      blue = $( "#blue" ).slider( "value" )

      $( "#redBox" ).val(red);
      $( "#greenBox" ).val(green);
      $( "#blueBox" ).val(blue);

      hex = hexFromRGB( red, green, blue );
    $( "#swatch" ).css( "background-color", "#" + hex );
  }
  $(function() {
    $( "#red, #green, #blue" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 255,
      value: 127,
      slide: refreshSwatch,
      change: refreshSwatch
    });

    $("#redBox").change(function() {
      $( "#red" ).slider( "value", $("#redBox").val() );
    })
    $("#blueBox").change(function() {
      $( "#blue" ).slider( "value", $("#blueBox").val() );
    })
    $("#greenBox").change(function() {
      $( "#green" ).slider( "value", $("#greenBox").val() );
    })
    $( "#redBox, #greenBox, #blueBox" ).slider({
      orientation: "horizontal",
      range: "min",
      max: 255,
      value: 127,
      slide: refreshSwatch,
      change: refreshSwatch
    });

    $( "#red" ).slider( "value", 21 );
    $( "#green" ).slider( "value", 207 );
    $( "#blue" ).slider( "value", 253 );

    $( "#redBox" ).val($( "#red" ).slider( "value" ));
    $( "#greenBox" ).val($( "#green" ).slider( "value" ));
    $( "#blueBox" ).val($( "#green" ).slider( "value" ));

  });

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

   function scoring (act_r, act_g, act_b, exp_r, exp_g, exp_b) {
    r_off = (Math.abs(exp_r - act_r)/255)*100
    g_off = (Math.abs(exp_g - act_g)/255)*100
    b_off = (Math.abs(exp_b - act_b)/255)*100
    p_off = (r_off + g_off + b_off)/3
    ans = ((15 - difficulty - p_off) / (15 - difficulty)) * (15000 - ms_taken)
    return ans;
  }


  $( document ).ready(function() {
    var red = getRandomInt(0,256);
    var green = getRandomInt(0,256);
    var blue = getRandomInt(0,256);

    console.log(red);
    console.log(green);
    console.log(blue);

    hex = hexFromRGB( red, green, blue );
    $( "#randomSwatch" ).css( "background-color", "#" + hex );

  });
