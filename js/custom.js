var lastWindowWidth = window.innerWidth, //last saved window width
    mob = 767, //mob version
    tablet = 1200, //tablet version
    is_ready = false; //is page loaded

window.addEventListener("touchmove", Scroll);
window.addEventListener("scroll", Scroll);

jQuery(function ($) {

    //sliders
    if ($('.slider--training').length) {
        //random items
        var sliderHome = document.querySelector('.slider--training');
        for (var i = sliderHome.children.length; i >= 0; i--) {
            sliderHome.appendChild(sliderHome.children[Math.random() * i | 0]);
        }
        $('.slider--training').slick({
            arrows: false,
            dots: true,
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            focusOnSelect: false,
            touchThreshold: 10,
            appendDots: $(".slider-dots"),
            responsive: [
                {
                        breakpoint: 1201,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 561,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        })
    }

    if ($('.slider--article').length) {
        $('.slider--article').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            focusOnSelect: false,
            touchThreshold: 10
        })
    }

    //initialise magnific popup with videoplayer
    if ($('.js-video-container').length) {
        $('.js-video-container').magnificPopup({
            delegate: '.js-video-play',
            callbacks: {
                open: function () {
                    players = Plyr.setup('#player', {
                        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'airplay', 'fullscreen']
                    });
                    players[0].play();
                },
                close: function () {
                    players[0].pause();
                    players[0].destroy();
                }
            }
        })
    }

    //initialise video player on article pages
    if ($('.js-video').length) {
        var videoPlayers = Plyr.setup('.js-video', {
            invertTime: false,
            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'airplay', 'fullscreen'],
            tooltips: {
                controls: true,
                seek: true,
            },
            captions: {
                active: true,
                language: 'auto',
                update: false
            }
        });
    }
    smoothy();
})

$(window).resize(function () {
    if (window.innerWidth != lastWindowWidth) {
        //expand header when site resizes from mobile to desktop
        if (window.innerWidth > tablet) {
            $("header nav").removeClass("nm-show");
            $(".nm-menu-expand").removeClass("nm-active");
            $("body").removeClass("modal-show");
        }

        Scroll();

        if (window.innerWidth > tablet) {
            smoothy();
        }
    }

    lastWindowWidth = window.innerWidth;
});

//scrolling page
function Scroll() {

}

window.onload = function () {
    is_ready = true;
    $("body").addClass("loaded");

    Scroll();
}

//smooth submenu
function smoothy() {
    if ($("header nav div>ul>li ul").length) {
        $("header nav div>ul>li ul").each(function () {
            var el = $(this);
            el.width("");

            var w = el.outerWidth();
            w -= w % 2;

            el.width(w);
        })
    }
}

//menu toggle

$(".nm-menu-expand").on("click", function () {
    if (!($(this).hasClass("nm-active"))) {
        $(this).addClass("nm-active");
        $('.menu_mobile').addClass('active_menu');

    } else {
        $(this).removeClass("nm-active");
        $('.menu_mobile').removeClass('active_menu');
    }
});

//toggle submenu

$("nav li.menu-item-has-children > a").on("click", function (e) {
    if ($(this).attr('href') == '#') {
        e.preventDefault();
    }
    if (window.innerWidth < tablet) {
        if (!$(this).hasClass("clicked")) {
            e.preventDefault();
            $(this).next("ul").slideToggle("fast");
            $(this).addClass("clicked");
        }
    }
});


//cookies

var $ = jQuery.noConflict();

$(document).ready(function () {
    $('.cookie').css('display', 'flex');
    $('.cookie__close').click(function () {
        $('.cookie').fadeOut(500);
        $.cookie('cookie', 'example', {expires: 7, path: '/'});
    });

    if (typeof $.cookie('cookie') === 'undefined') {
        $('.cookie').removeClass('cookie_exist');
    } else {
        $('.cookie').addClass('cookie_exist');
    }
    // random quote
    var random = Math.floor(Math.random() * $('.section--quote .section__wrapper').length);
    $('.section--quote .section__wrapper').hide().eq(random).show();
});

$(".menu_mobile li:has(ul.sub_menu)").addClass("i-have-kids");
$(".menu_mobile .i-have-kids").each(function () {
    $(this).append('<div class="menu_toggle">+</div>')
});
$(".menu_toggle").each(function () {
    $(this).on("click", function () {
        $('.menu_toggle').text("+");
        $(".menu_mobile li").removeClass('active');
        $(this).parent().toggleClass("active");
        $(this).toggleClass("active");
        if ($(this).hasClass("active")) {
            $(this).text("-");
        }
        else {
            $(this).text("+");
            $(this).parent().toggleClass("active");

        }
    });
});

// select
// Iterate over each select element
$('select').each(function () {

    // Cache the number of options
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;
    $this.addClass('s-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="styledSelect"></div>');
    var $styledSelect = $this.next('div.styledSelect');
    $styledSelect.text($this.children('option').eq(0).text());
    var $list = $('<ul />', {
        'class': 'options'
    }).insertAfter($styledSelect);
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }
    var $listItems = $list.children('li');
    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.styledSelect.active').each(function () {
            $(this).removeClass('active').next('ul.options').hide();
        });
        $(this).toggleClass('active');
        $(this).toggleClass('active').next('ul.options').toggle();
    });

    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
    });

    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

// categories accordion
$('.category__button').on('click', function(){
    $(this).toggleClass('active');
    $(this).next('ul').toggleClass('active');
});

// 3d map
$('.map_3d .icon_map, .icons_description_item .icon_360').on('click', function(){
    var map = $(this).attr('data-toggle');
    $('.modal_window_3d').addClass('active');
    $('.modal_window_3d iframe').attr('src', map);
    $('.modal_window_3d .close_btn').on('click', function(){
        $(this).parent().parent().removeClass('active');
        $('.modal_window_3d iframe').attr('src', '');
    });
});

// home page hero slider
if ($('.slider-image-home').length) {
    $('.slider-image-home').slick({
        arrows: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        focusOnSelect: false,
        touchThreshold: 10,
        autoplay: true,
        autoplaySpeed: 4000
    });
}

if ($('.courses-posts-holder').length) {
    //random items
    var sliderHome = document.querySelector('.courses-posts-holder');
    for (var i = sliderHome.children.length; i >= 0; i--) {
        sliderHome.appendChild(sliderHome.children[Math.random() * i | 0]);
    }
    $('.courses-posts-holder').slick({
        arrows: false,
        dots: true,
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        focusOnSelect: false,
        touchThreshold: 10,
        appendDots: $(".slider-dots"),
        responsive: [
            {
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 561,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })
}

