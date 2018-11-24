/** カウンタの値を取得して、JavaScriptで出力する。 */
$(window).load(function () {
  function updateCounter( _s ){
    var obj={ total:0, today:0, yestaday:0 };
    try {
      obj = eval( "("+_s+")" );
    } catch(e) {
      $('#counter *').replaceWith( "script eval error" );
      return;
    }
      $('#counter *').replaceWith( 
        "<ul id='counter-list'>"+
          "<li id='counter-listitem-total'><span id='counter-total'>Total:</span> "+ obj['total'] +"</li>"+
          "<li><span id='counter-today'>Today :</span> "+ obj['today'] + "</li>"+
        "</ul>" ).fadeIn('slow');
  }
  $.get( "/blog/access_counter/access", updateCounter );
});
          "<li id='counter-listitem-total'><span id='counter-total'>Total:</span> "+ obj['total'] +"</li>"+
          "<li><span id='counter-today'>Today :</span> "+ obj['today'] + "</li>"+
