$('.slider-for').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.customers-photo'
});
$('.customers-photo').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows:true,
  centerMode:true,
  slidesPerRow:6,
  asNavFor:'.slider-for',
  focusOnSelect: true,
  responsive: [
  {
    breakpoint: 600,
    settings: {
      slidesToShow:1,
      arrows: false,
      dots: true
    }
  }
  ]
});

$('.left').click(function () {
  $('.plan-move').css('left', '4px');
  $('.right').css('color','#a2a3a5');
  $('.left').css('color','#26292c');
  $('.plan-move').css('box-shadow','10px 10px 15px 5px rgba(0,0,0,0.1)');
})

$('.right').click(function() {
  $('.plan-move').css('left', '128px');
  $('.left').css('color','#a2a3a5');
  $('.right').css('color','#26292c');
  $('.plan-move').css('box-shadow','-10px 10px 10px 5px rgba(0,0,0,0.1)');
})

$('#second').click(function() {
  $('#first').removeClass('plan-card_active');
  $(this).addClass('plan-card_active');
})

$('#first').click(function() {
  $('#second').removeClass('plan-card_active');
  $(this).addClass('plan-card_active');
})

$(function() {
  $('.plan-card button').disabled = true;
  $('.plan-card_active button').disabled = false
})
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoJy5zbGlkZXItZm9yJykuc2xpY2soe1xyXG4gIHNsaWRlc1RvU2hvdzogMSxcclxuICBzbGlkZXNUb1Njcm9sbDogMSxcclxuICBhcnJvd3M6IGZhbHNlLFxyXG4gIGZhZGU6IHRydWUsXHJcbiAgYXNOYXZGb3I6ICcuY3VzdG9tZXJzLXBob3RvJ1xyXG59KTtcclxuJCgnLmN1c3RvbWVycy1waG90bycpLnNsaWNrKHtcclxuICBpbmZpbml0ZTogdHJ1ZSxcclxuICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgc2xpZGVzVG9TY3JvbGw6IDEsXHJcbiAgYXJyb3dzOnRydWUsXHJcbiAgY2VudGVyTW9kZTp0cnVlLFxyXG4gIHNsaWRlc1BlclJvdzo2LFxyXG4gIGFzTmF2Rm9yOicuc2xpZGVyLWZvcicsXHJcbiAgZm9jdXNPblNlbGVjdDogdHJ1ZSxcclxuICByZXNwb25zaXZlOiBbXHJcbiAge1xyXG4gICAgYnJlYWtwb2ludDogNjAwLFxyXG4gICAgc2V0dGluZ3M6IHtcclxuICAgICAgc2xpZGVzVG9TaG93OjEsXHJcbiAgICAgIGFycm93czogZmFsc2UsXHJcbiAgICAgIGRvdHM6IHRydWVcclxuICAgIH1cclxuICB9XHJcbiAgXVxyXG59KTtcclxuXHJcbiQoJy5sZWZ0JykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICQoJy5wbGFuLW1vdmUnKS5jc3MoJ2xlZnQnLCAnNHB4Jyk7XHJcbiAgJCgnLnJpZ2h0JykuY3NzKCdjb2xvcicsJyNhMmEzYTUnKTtcclxuICAkKCcubGVmdCcpLmNzcygnY29sb3InLCcjMjYyOTJjJyk7XHJcbiAgJCgnLnBsYW4tbW92ZScpLmNzcygnYm94LXNoYWRvdycsJzEwcHggMTBweCAxNXB4IDVweCByZ2JhKDAsMCwwLDAuMSknKTtcclxufSlcclxuXHJcbiQoJy5yaWdodCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICQoJy5wbGFuLW1vdmUnKS5jc3MoJ2xlZnQnLCAnMTI4cHgnKTtcclxuICAkKCcubGVmdCcpLmNzcygnY29sb3InLCcjYTJhM2E1Jyk7XHJcbiAgJCgnLnJpZ2h0JykuY3NzKCdjb2xvcicsJyMyNjI5MmMnKTtcclxuICAkKCcucGxhbi1tb3ZlJykuY3NzKCdib3gtc2hhZG93JywnLTEwcHggMTBweCAxMHB4IDVweCByZ2JhKDAsMCwwLDAuMSknKTtcclxufSlcclxuXHJcbiQoJyNzZWNvbmQnKS5jbGljayhmdW5jdGlvbigpIHtcclxuICAkKCcjZmlyc3QnKS5yZW1vdmVDbGFzcygncGxhbi1jYXJkX2FjdGl2ZScpO1xyXG4gICQodGhpcykuYWRkQ2xhc3MoJ3BsYW4tY2FyZF9hY3RpdmUnKTtcclxufSlcclxuXHJcbiQoJyNmaXJzdCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICQoJyNzZWNvbmQnKS5yZW1vdmVDbGFzcygncGxhbi1jYXJkX2FjdGl2ZScpO1xyXG4gICQodGhpcykuYWRkQ2xhc3MoJ3BsYW4tY2FyZF9hY3RpdmUnKTtcclxufSlcclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgJCgnLnBsYW4tY2FyZCBidXR0b24nKS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgJCgnLnBsYW4tY2FyZF9hY3RpdmUgYnV0dG9uJykuZGlzYWJsZWQgPSBmYWxzZVxyXG59KSJdLCJmaWxlIjoibWFpbi5qcyJ9
