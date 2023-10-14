$(document).ready(function() {
  $('.footer').on('mouseenter', function() {
    $('.menu-trigger, .enter__aside').css('display', 'none');
  }).on('mouseleave', function() {
    $('.menu-trigger').css('display', 'block');
    $('.enter__aside').css('display', 'flex');
  });
  function checkMediaQuery() {
    if (window.matchMedia("(max-width: 1844px)").matches) {
      let scroll_pos = 0;
      $(document).scroll(function() { 
        scroll_pos = $(this).scrollTop();
        if (scroll_pos > 1400) {
          $('.menu-trigger, .enter__aside').css('background-color', 'rgba(11, 29, 38, 0.7)');
          $('.enter__aside').css('border-radius', '8px');
          $('.menu-trigger').css({'border-top-left-radius': '8px', 'border-bottom-left-radius' : '8px'});
        } else {
          $('.menu-trigger, .enter__aside').css('background-color', 'transparent');
          $('.menu-trigger, .enter__aside').css('border-radius', '0px');
        }
      });
    }
  }
  checkMediaQuery();
  $(window).on('resize', checkMediaQuery);
});

let sections = $('section')
  , nav = $('nav')
  , nav_height = nav.outerHeight();

$(window).on('scroll', function () {
  let cur_pos = $(this).scrollTop();
  
  sections.each(function() {
    let top = $(this).offset().top - nav_height,
        bottom = top + $(this).outerHeight();
    
    if (cur_pos >= top && cur_pos <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');
      
      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
  });
});

nav.find('a').on('click', function () {
  let $el = $(this)
    , id = $el.attr('href');
  
  $('html, body').animate({
    scrollTop: $(id).offset().top - nav_height
  }, 500);
  
  return false;
});