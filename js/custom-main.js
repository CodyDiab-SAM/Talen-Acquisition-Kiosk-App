jQuery(document).ready(function($) {
    $('.slider').slick({
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: true,
      adaptiveHeight: true,
  });
  $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var current = $(slick.$slides[currentSlide]);
    current.html(current.html());
  });
  $('.your-element').on('afterChange', function(event, slick, currentSlide, nextSlide){
    $('#video')[0].play(); 
});
  $('.slider').on('afterChange', function(event, slick, currentSlide, nextSlide){
    $('.slider').find('video').get(0).pause();
    var video = $('.slick-active').find('video').get(0).play();
  });
});

  jQuery.fn.equalHeights = function() {
      var max_height = 0;
      jQuery(this).each(function() {
          max_height = Math.max(jQuery(this).height(), max_height);
      });
      jQuery(this).each(function() {
          jQuery(this).height(max_height);
      });
  };

  if (jQuery(window).width() > 320) {
      jQuery(".services-section .inner-block .box-col").equalHeights();
  }

  $('.modal').on('shown.bs.modal', function (e) {
    if($(this).find('video').length>0){
        $(this).find('video')[0].play();
       $('.playpuse').fadeOut();
       var pid = $(this).find('progress')[0].id
       progressLoop($(this).find('video')[0], pid);
    }
   
})
$('.modal').on('hidden.bs.modal', function () {
    if($(this).find('video').length>0){
    $(this).find('video')[0].pause();
    $(this).find('video')[0].currentTime = 0;
}
setTimeout(function(){
    $('.slick-active').find('video')[0].play()
    $('.playpuse').fadeOut();
},300)

})
$('.videoClass').click(function(){
    $('.video').trigger('pause');
});
$( document ).ready(function() {
    setTimeout(function(){
        playpause('vidbutton');
    },400);
    $('.pause-video').hide();
    $(document).on('touchstart click', '.video', function(e){
        if(this.paused == true){
            var self = this
            setTimeout(function(){
                self.play();
                $('.playpuse').fadeOut();
                $('.playpuse').hide();
                $('.pause-video').show();
            },300)

        }
        else{
            var self = this
            setTimeout(function(){
                self.pause();
                $('.playpuse').fadeIn();
                $('.playpuse').show();
                $('.pause-video').hide();
            },300)
        }
        var pid = $(this).next().next().next()[0].id;
        progressLoop(this, pid);
    });
});
function playpause(id){
    $('#'+id)[0].play();
    $('.playpuse').fadeOut();
    $('.pause-video').fadeIn();
    var pid = $('#'+id).next().next().next()[0].id
    progressLoop($('#'+id)[0], pid);
}

function progressLoop(video,progress) {
const progressd = document.getElementById(progress);
    setInterval(function () {
        progressd.value =
        Math.round((video.currentTime / video.duration) * 100);
    });
}
