var timerStart = Date.now();
var ans = 0;

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
  ans = ((15 - difficulty - p_off) / (15 - difficulty)) * (60000 - msec_taken);
  if (ans < 0) {
    ans = 0;
  }
  else if (ans > 60000) {
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
    var blue_act = parseInt($("#blueBox").val());

    ans = scoring(red_act, green_act, blue_act, red_exp, green_exp, blue_exp);
    document.getElementById("yourScore").innerHTML = ans;
    document.getElementById("lastScore").innerHTML = ans + "&nbsp;&nbsp;&nbsp;&nbsp;" + document.getElementById("lastScore").innerHTML;

    var turns = document.getElementById("turnsBox").value;
    if (turns < 0) {
      alert("You must have a positive number of turns.");
    }
    else {
      turns = turns-1;
      if (turns == 0) {
        document.getElementById("scoreButton").style.display = "none";
        document.getElementById("scoreTitle").innerHTML = "Final Score:";
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
    if (document.getElementById("scoreTitle").innerHTML == "Final Score:") {
      document.getElementById("scoreTitle").innerHTML = "Your Score:";
    }
    timerStart = Date.now();
  }

  function reset() {}

//the actual plugin:
  (function ( $ ) {
      $.fn.hexed = function( options ) {
          var settings = $.extend({
              // These are the defaults.
              difficulty: 5,
              rounds: 10
          }, options );

          this.append("<h1>Get Hexed!</h1><p> Your goal is to guess the RGB values of the swatch on the left using the sliders and the swatch on the right.</p><p>Use the sliders or the input boxes to adjust the RGB values of the swatch on the right.</p><p>Press the 'Got It!' button when you think you have the correct answer.</p><p>If you would like a new swatch, press the 'New Swatch!' button.</p><p>Once you run out of turns, you must select a new swatch.</p>");
          this.append("<div id='difficulty'></div>");
          $("#difficulty").append("<label>Difficulty: <select id = 'userDiff'></select></label>");
          //add an options for 1-10, making the default selected one the "Difficulty" setting
          for(var i=0; i<10; i++){
            var s = "<option value='";
            if (i == settings.difficulty){
              s = s + String(i) + "' selected='" + String(i) + "'>"+String(i)+"</option>"
            }else{
              s = s + String(i) + "'>"+String(i)+"</option>"
            }
            $("#userDiff").append(s);
          }
          this.append("<div id='turns'></div>");
          //set the turns box to start as the "Turns" setting
          $("#turns").append("  <label>Turns: <input id='turnsBox' value='" + String(settings.rounds) + "'>")
          this.append("<p class = 'label'>Random Swatch &nbsp; &nbsp; &nbsp; New Swatch</p>")

          this.append("<div id='randomSwatch' class='ui-widget-content ui-corner-al'></div><div id='swatch' class='ui-widget-content ui-corner-all'></div>")
          this.append("<div id='colors'><div id='red'> </div><input id='redBox' class='inbox'></input><div id='green'></div><input id='greenBox' class='inbox'></input><div id='blue'></div><input id='blueBox' class='inbox'></input></div>")
          this.append("<div id='ScoreSwatch'><input type='button' id='scoreButton' value='Got It!' onclick='showResults()' /><input type='button' id='newSwatch' value='New Swatch' onclick='newSwatch()' /></div>")
          this.append("<div id='results' style='display:none;'><h1 id='scoreTitle'>Your Score:</h1><p id='yourScore'></p><h1>Score on Last Color:</h1><p id='lastScore'></p></div>")
          return this;
      };

  }( jQuery ));
