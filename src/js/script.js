$(document).ready(function() {
  $('.nav-trigger').hover(
    function() {
      $('.nav').css('background-color', 'rgba(11, 29, 38, 0.7)');
      $('.nav').css('border-radius', '5px');
    },
    function() {
      $('.nav').css('background-color', 'transparent');
      $('.nav').css('border-radius', '0px');
    }
  );
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

/*$(document).ready(function(){       
  let scroll_pos = 0;
  $(document).scroll(function() { 
      scroll_pos = $(this).scrollTop();
      if((scroll_pos > 1400)) {
        nav.css('background-color', 'rgba(11, 29, 38, 0.5)');
        nav.css('border-radius', '5px');
      }
      else {
        nav.css('background-color', 'transparent');
        nav.css('border-radius', '0');
    }});
});*/