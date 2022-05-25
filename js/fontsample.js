$(function(){

$('.i_text').focus(function(){
  let val = $(this).parent().attr('id');
  //console.log(val + "l_text");
  $('#'+val + ' .l_text').animate({'color':'#3be5ae'},300);
}).blur(function(){
  $('.l_text').animate({'color':'black'},150);
});

});
