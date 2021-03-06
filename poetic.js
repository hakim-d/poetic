/*
 * PoeticJS
 * The classical Arabic poems are written such that each verse is written as two halves on the same row and separated by one or more punctuation marks or spaces. This Javascript library can do that easily.
 * Copyright (C) 2017 Hakim DAHOUNE (http://hakim.ma, @7akim_d)
 */

var poetic = (function (){

  function columnize ( target = "body", color = "#000", delimiter = "*", delimiter_color = null, delimiter_size = "100%", line_height = "normal", alternative = false ) {
    // Create the poem css styles
    var style = document.createElement('style');
    style.type = 'text/css';
    if (!delimiter_color) delimiter_color = color;
    style.innerHTML = `.poetic {color:${color}; direction: rtl; font-size: 1vw; box-sizing: content-box;}
                        .poetic sadr, .poetic ajuz {
                         width: 44%; text-align: justify; text-align-last: justify; display: inline-block; font-size: 100%;
                        }
                        .poetic bayt {line-height: ${line_height}; display: block; padding: 0.3em 0;}
                        .poetic sadr {padding-left: 6%;}
                        .poetic ajuz {padding-right: 6%;}
                        .poetic bayt::after {content: "${delimiter}";font-size: ${delimiter_size}; color: ${delimiter_color};position: absolute;right: 50%; margin-right: -10px;width: 20px;height: 20px;text-align:center;}
                        @media only screen and (max-width: 789px) {.poetic{font-size: 2.6vw;}}
                        @media only screen and (max-width: 480px) {
                          .poetic {font-size: 4.2vw;}
                          .poetic sadr, .poetic ajuz {width: 70%;}
                          .poetic ajuz {padding-right: 30%;}
                          .poetic bayt {padding: 0.5em 0;}
                          .poetic bayt::after {display:none;}
                        }
                       `;
    if (alternative) { style.innerHTML += `.poetic bayt:nth-child(even) {background: ${delimiter_color}33;}` }
    document.getElementsByTagName('head')[0].appendChild(style);

    // Define the DOM target to apply the poem formatting
    var bind = document.querySelector(target);
    bind.className += " poetic";
    var text = bind.innerHTML;
    text = "\n" + text.trim();
    // Wrapping the poem with the verse tags: <bayt>, <sadr> and <ajuz>
    text = text.replace(/\n|#|\<br\>/gi, function checkStr(x,y){
      if ( x == "\n" ) {
        if ( y == 0 ) return "<bayt><sadr>" + x;
        else return "</ajuz></bayt>" + x + "<bayt><sadr>";
      }
      if ( x == "#" ) { return "</sadr><ajuz>"; }
      // Removing html line-breaks
      if ( x == "<br>" ) { return ""; }
    });

    // Apply the poem formatting
    bind.innerHTML = text;
  }
  
  return {
    columnize: columnize
  };
  
})();
