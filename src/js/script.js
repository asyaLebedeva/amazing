(function() {
  function toggleBtn() {
  const tglBtn = document.getElementById('touch__button')
  const socMedia = document.getElementById('follow')
  tglBtn.addEventListener('click', () => {
    socMedia.classList.remove('aside__hidden')
    tglBtn.classList.remove('aside__btn')
  })
  
  socMedia.addEventListener('click', () => {
    socMedia.classList.add('aside__hidden')
    tglBtn.classList.add('aside__btn')
  })
}
toggleBtn()

$(document).ready(function() {
  $('.footer').on('mouseenter', function() {
    $('.menu-trigger, .aside__list').css('display', 'none');
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
        $('.menu-trigger, .aside__list').css('background-color', 'rgba(11, 29, 38, 0.7)');
        $('.aside__list').css('border-radius', '8px');
        $('.menu-trigger').css({'border-top-left-radius': '8px', 'border-bottom-left-radius' : '8px'});
      } else {
        $('.menu-trigger, .aside__list').css('background-color', 'transparent');
        $('.menu-trigger, .aside__list').css('border-radius', '0px');
      }
    });
  }

  if(window.matchMedia("(min-width: 600px) and (max-width: 1200px)").matches) {
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
        $('.aside__list').css('background-color', 'transparent');
        $('.menu-trigger').css({'border-top-left-radius': '5px', 'border-bottom-left-radius' : '5px'});
      } else {
        $('.menu-trigger').css('background-color', 'transparent');
        $('.menu-trigger').css('border-radius', '0px');
      }
    });
  }
}

checkMediaQuery();
$(window).on('resize', checkMediaQuery);

let sections = $('section')
  nav = $('nav')
  navHeight = nav.outerHeight();

$(window).on('scroll', function () {
  let cursorPosition = $(this).scrollTop();
  
  sections.each(function() {
    let top = $(this).offset().top - navHeight,
        bottom = top + $(this).outerHeight();
    
    if (cursorPosition >= top && cursorPosition <= bottom) {
      nav.find('a').removeClass('active');
      sections.removeClass('active');
      
      $(this).addClass('active');
      nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
    }
  });
});

nav.find('a').on('click', function () {
  let el = $(this);
  id = el.attr('href');
  
  $('html, body').animate({
    scrollTop: $(id).offset().top - navHeight
  }, 500);
  
  return false;
});})();