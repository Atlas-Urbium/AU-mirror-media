$(document).ready(function(){

  $( '#svg-container' ).on( "mouseover", function( event ) {
    $( "#flashlight" ).attr("cx", event.pageX);
    $( "#flashlight" ).attr("cy", event.pageY);
    $( "#flashlight" ).stop();
    $( "#flashlight" ).animate({r: '20vw'});
  });

  $( '#svg-container' ).on( "mouseout", function( event ) {
    $( "#flashlight" ).attr("cx", event.pageX);
    $( "#flashlight" ).attr("cy", event.pageY);
    $( "#flashlight" ).stop();
    $( "#flashlight" ).animate({r: '0'});
  });

  $( '#svg-container' ).on( "mousemove", function( event ) {
    $( "#flashlight" ).attr("cx", event.pageX);
    $( "#flashlight" ).attr("cy", event.pageY);
  });

  $( '#svg-container' ).on( "mousedown", function( event ) {
    if ($( "#darkness" ).attr("fill") == 'black') {
      $( "#darkness" ).attr("fill", 'white');
      $( '.underground-text' ).removeClass('hidden');
      $( '.aboveground-text' ).addClass('hidden');
    } else {
      $( "#darkness" ).attr("fill", 'black');
      $( '.aboveground-text' ).removeClass('hidden');
      $( '.underground-text' ).addClass('hidden');
      $
    }
  });
});
