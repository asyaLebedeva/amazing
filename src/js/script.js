$(document).ready(function() {
  $('.footer').on('mouseenter', function() {
    $('.menu-trigger, .enter-aside').css('display', 'none');
  }).on('mouseleave', function() {
    $('.menu-trigger').css('display', 'block');
  });
});

function checkMediaQuery() {
  let scroll_pos = 0;
  if (window.matchMedia("(max-width: 1400px) and (max-width: 1825px)").matches) {
    $(document).scroll(function() { 
      scroll_pos = $(this).scrollTop();
      if (scroll_pos > 1300) {
        $('.menu-trigger, .enter-aside').css('background-color', 'rgba(11, 29, 38, 0.7)');
        $('.enter-aside').css('border-radius', '8px');
        $('.menu-trigger').css({'border-top-left-radius': '8px', 'border-bottom-left-radius' : '8px'});
      } else {
        $('.menu-trigger, .enter-aside').css('background-color', 'transparent');
        $('.menu-trigger, .enter-aside').css('border-radius', '0px');
      }
    });
  }

  if(window.matchMedia("(max-width: 1200px)").matches) {
    $(document).ready(function() {
      $('.footer').on('mouseenter', function() {
        $('.menu-trigger').css('display', 'none');
      }).on('mouseleave', function() {
        $('.menu-trigger').css('display', 'block');
      });
    });
  }

  if(window.matchMedia("(max-width: 575px)").matches) {
    $(document).scroll(function() { 
      scroll_pos = $(this).scrollTop();
      if (scroll_pos > 600) {
        $('.menu-trigger, .enter-aside').css('background-color', 'rgba(11, 29, 38, 0.7)');
        $('.enter-aside').css('border-radius', '5px');
        $('.menu-trigger').css({'border-top-left-radius': '5px', 'border-bottom-left-radius' : '5px'});
      } else {
        $('.menu-trigger, .enter-aside').css('background-color', 'transparent');
        $('.menu-trigger, .enter-aside').css('border-radius', '0px');
      }
    });
  }
}
checkMediaQuery();
$(window).on('resize', checkMediaQuery);


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