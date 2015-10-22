var timerStart = Date.now();
var ans = 0;
var tmp = ans;
tmp = tmp.toFixed(2);

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
    $( "#blueBox" ).val($( "#blue" ).slider( "value" ));

  });

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

 function scoring (act_r, act_g, act_b, exp_r, exp_g, exp_b) {
  var r_off = (Math.abs(exp_r - act_r)/255)*100;
  var g_off = (Math.abs(exp_g - act_g)/255)*100;
  var b_off = (Math.abs(exp_b - act_b)/255)*100;
  var p_off = (r_off + g_off + b_off)/3;
  var d = document.getElementById("userDiff");
  var difficulty = d.options[d.selectedIndex].text;
  var msec_taken = Date.now() - timerStart;
  ans = ((15 - difficulty - p_off) / (15 - difficulty)) * (15000 - msec_taken);
  if (ans < 0) {
    ans = 0;
  }
  else if (ans > 15000) {
    ans = 0;
  }

  ans = ans.toFixed(2);
  return ans;
  }


  $( document ).ready(function() {
    var red = getRandomInt(0,256);
    var green = getRandomInt(0,256);
    var blue = getRandomInt(0,256);

    console.log(red);
    console.log(green);
    console.log(blue);
    // console.log(ans);

    hex = hexFromRGB( red, green, blue );
    $( "#randomSwatch" ).css( "background-color", "#" + hex );
  });

  function showResults() {
    $("#results").show();
    var colors = $( "#randomSwatch" ).css( "background-color");
    var rgb = colors.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    //the "real" values
    var red_exp = rgb[1];
    var green_exp = rgb[2];
    var blue_exp = rgb[3];

    var red_act = parseInt($("#redBox").val());
    var green_act = parseInt($("#greenBox").val());
    var blue_act = parseInt($("#redBox").val());

    var lastAns = document.getElementById("yourScore").innerHTML;

    ans = scoring(red_act, green_act, blue_act, red_exp, green_exp, blue_exp);
    if (lastAns < ans) {
      var bestAns = ans;
      document.getElementById("bestScore").innerHTML = bestAns;
    }
    document.getElementById("yourScore").innerHTML = ans;
    document.getElementById("lastScore").innerHTML = ans + "  " + document.getElementById("lastScore").innerHTML;

    var turns = document.getElementById("turnsBox").value;
    if (turns < 0) {
      alert("You must have a positive number of turns.");
    }
    else {
      turns = turns-1;
      if (turns == 0) {
        document.getElementById("scoreButton").style.display = "none";
        document.getElementById("scoreTitle").innerHTML = "Final Score";
      }
      document.getElementById("turnsBox").value = turns;
    }
    timerStart = Date.now();
    //alert(ans);
  }

  function newSwatch() {
    //alert("aakf");
    //var prevAns = ans;
    //$("#randomSwatch").load();
    var red = getRandomInt(0,256);
    var green = getRandomInt(0,256);
    var blue = getRandomInt(0,256);

    //var prevAns = ans;

    console.log(red);
    console.log(green);
    console.log(blue);

    hex = hexFromRGB( red, green, blue );
    $( "#randomSwatch" ).css( "background-color", "#" + hex );
    $("#randomSwatch").load();

    
    document.getElementById("lastScore").innerHTML = "";
    document.getElementById("yourScore").innerHTML = "";
    document.getElementById("turnsBox").value = "10";
    document.getElementById("scoreButton").style.display = "block";
    document.getElementById("scoreButton").style.display = "inline";
    timerStart = Date.now();
  }

  function reset() {}