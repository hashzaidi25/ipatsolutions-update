(function($) {

    "use strict";


    //Hide Loading Box (Preloader)
    function handlePreloader() {
        if ($('.preloader').length) {
            $('.preloader').delay(200).fadeOut(500);
        }
    }


    //Update Header Style and Scroll to Top
    function headerStyle() {
        if ($('.main-header').length) {
            var windowpos = $(window).scrollTop();
            var siteHeader = $('.main-header');
            var scrollLink = $('.scroll-to-top');

            var HeaderHight = $('.main-header').height();
            if (windowpos >= HeaderHight) {
                siteHeader.addClass('fixed-header');
                scrollLink.fadeIn(300);
            } else {
                siteHeader.removeClass('fixed-header');
                scrollLink.fadeOut(300);
            }

        }
    }

    headerStyle();


    //Submenu Dropdown Toggle
    if ($('.main-header li.dropdown ul').length) {
        $('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');

        //Dropdown Button
        $('.main-header li.dropdown .dropdown-btn').on('click', function() {
            $(this).prev('ul').slideToggle(500);
        });

        //Disable dropdown parent link
        $('.navigation li.dropdown > a').on('click', function(e) {
            e.preventDefault();
        });

        //Disable dropdown parent link
        $('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function(e) {
            e.preventDefault();
        });

    }

    // Menu Aimation
    //document.querySelectorAll('.main-menu .navigation > li > a').forEach(button => button.innerHTML = '<div class="menu-text"><span>' + button.textContent.split('').join('</span><span>') + '</span></div>');


    //Mobile Nav Hide Show
    if ($('.mobile-menu').length) {

        //$('.mobile-menu .menu-box').mCustomScrollbar();

        var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
        $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
        $('.sticky-header .main-menu').append(mobileMenuContent);

        //Hide / Show Submenu
        $('.mobile-menu .navigation > li.dropdown > .dropdown-btn').on('click', function(e) {
            e.preventDefault();
            var target = $(this).parent('li').children('ul');

            if ($(target).is(':visible')) {
                $(this).parent('li').removeClass('open');
                $(target).slideUp(500);
                $(this).parents('.navigation').children('li.dropdown').removeClass('open');
                $(this).parents('.navigation').children('li.dropdown > ul').slideUp(500);
                return false;
            } else {
                $(this).parents('.navigation').children('li.dropdown').removeClass('open');
                $(this).parents('.navigation').children('li.dropdown').children('ul').slideUp(500);
                $(this).parent('li').toggleClass('open');
                $(this).parent('li').children('ul').slideToggle(500);
            }
        });

        //3rd Level Nav
        $('.mobile-menu .navigation > li.dropdown > ul  > li.dropdown > .dropdown-btn').on('click', function(e) {
            e.preventDefault();
            var targetInner = $(this).parent('li').children('ul');

            if ($(targetInner).is(':visible')) {
                $(this).parent('li').removeClass('open');
                $(targetInner).slideUp(500);
                $(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
                $(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
                return false;
            } else {
                $(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
                $(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
                $(this).parent('li').toggleClass('open');
                $(this).parent('li').children('ul').slideToggle(500);
            }
        });

        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function() {
            $('body').addClass('mobile-menu-visible');

        });

        //Menu Toggle Btn
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function() {
            $('body').removeClass('mobile-menu-visible');
            $('.mobile-menu .navigation > li').removeClass('open');
            $('.mobile-menu .navigation li ul').slideUp(0);
        });

        $(document).keydown(function(e) {
            if (e.keyCode == 27) {
                $('body').removeClass('mobile-menu-visible');
                $('.mobile-menu .navigation > li').removeClass('open');
                $('.mobile-menu .navigation li ul').slideUp(0);
            }
        });

    }



    //Header Search
    if ($('.search-box-outer').length) {
        $('.search-box-outer').on('click', function() {
            $('body').addClass('search-active');
        });
        $('.close-search').on('click', function() {
            $('body').removeClass('search-active');
        });
    }



    //Custom Seclect Box
    if ($('.custom-select-box').length) {
        $('.custom-select-box').selectmenu().selectmenu('menuWidget').addClass('overflow');
    }



    // Add Current Class Auto
    function dynamicCurrentMenuClass(selector) {
        let FileName = window.location.href.split("/").reverse()[0];

        selector.find("li").each(function() {
            let anchor = $(this).find("a");
            if ($(anchor).attr("href") == FileName) {
                $(this).addClass("current");
            }
        });
        // if any li has .current elmnt add class
        selector.children("li").each(function() {
            if ($(this).find(".current").length) {
                $(this).addClass("current");
            }
        });
        // if no file name return
        if ("" == FileName) {
            selector.find("li").eq(0).addClass("current");
        }
    }

    if ($('.main-header .main-menu .navigation').length) {
        dynamicCurrentMenuClass($('.main-header .main-menu .navigation'));
    }



    //Parallax Scene for Icons
    if ($('.parallax-scene-1').length) {
        var scene = $('.parallax-scene-1').get(0);
        var parallaxInstance = new Parallax(scene);
    }



    if ($('.paroller').length) {
        $('.paroller').paroller({
            factor: 0.2, // multiplier for scrolling speed and offset, +- values for direction control  
            factorLg: 0.4, // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
            type: 'foreground', // background, foreground  
            direction: 'horizontal' // vertical, horizontal  
        });
    }



    //  Animation Fade Left End

    /////////////////////////////////////////////////////
    // CURSOR
    var cursor = $(".cursor"),
        follower = $(".cursor-follower");

    var posX = 0,
        posY = 0;

    var mouseX = 0,
        mouseY = 0;

    TweenMax.to({}, 0.016, {
        repeat: -1,
        onRepeat: function() {
            posX += (mouseX - posX) / 9;
            posY += (mouseY - posY) / 9;

            TweenMax.set(follower, {
                css: {
                    left: posX - 12,
                    top: posY - 12
                }
            });

            TweenMax.set(cursor, {
                css: {
                    left: mouseX,
                    top: mouseY
                }
            });
        }
    });

    $(document).on("mousemove", function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    //circle
    $(".theme-btn, a").on("mouseenter", function() {
        cursor.addClass("active");
        follower.addClass("active");
    });
    $(".theme-btn, a").on("mouseleave", function() {
        cursor.removeClass("active");
        follower.removeClass("active");
    });
    // CURSOR End



    // Main Slider
    var slider = new Swiper('.main-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.main-slider-next',
            prevEl: '.main-slider-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 1,
            },
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });




    // Main Slider Two
    var slider = new Swiper('.main-slider_two-carousel', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.slider_two-carousel-next',
            prevEl: '.slider_two-carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".slider_two-carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 1,
            },
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });





    // Main Slider Three
    var slider = new Swiper('.main-slider_three-carousel', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.slider_three-carousel-next',
            prevEl: '.slider_three-carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".slider_three-carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 1,
            },
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });




    // Services One Carousel
    var slider = new Swiper('.services-one_carousel', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.services-one_carousel-next',
            prevEl: '.services-one_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".services-one_carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 3,
            },
            '1200': {
                slidesPerView: 3,
            },
            '992': {
                slidesPerView: 3,
            },
            '768': {
                slidesPerView: 2,
            },
            '610': {
                slidesPerView: 2,
            },
            '600': {
                slidesPerView: 1,
            },
            '555': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });


    // Testimonial One Carousel
    var slider = new Swiper('.testimonial-one_carousel', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.testimonial-one_carousel-next',
            prevEl: '.testimonial-one_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".testimonial-one_carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 1,
            },
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });


    // Testimonial Two Carousel
    var slider = new Swiper('.testimonial-two_carousel', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.testimonial-two_carousel-next',
            prevEl: '.testimonial-two_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".testimonial-two_carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 1,
            },
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });




    // Testimonial Two Carousel
    var slider = new Swiper('.testimonial-three_carousel', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.testimonial-three_carousel-next',
            prevEl: '.testimonial-three_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".testimonial-three_carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 3,
            },
            '1200': {
                slidesPerView: 3,
            },
            '992': {
                slidesPerView: 2,
            },
            '768': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });



    // Team One Carousel
    var slider = new Swiper('.team-one_carousel', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.team-one_carousel-next',
            prevEl: '.team-one_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".team-one_carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 3,
            },
            '1200': {
                slidesPerView: 3,
            },
            '992': {
                slidesPerView: 3,
            },
            '610': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });



    //Accordion Box
    if ($('.accordion-box').length) {
        $(".accordion-box").on('click', '.acc-btn', function() {

            var outerBox = $(this).parents('.accordion-box');
            var target = $(this).parents('.accordion');

            if ($(this).hasClass('active') !== true) {
                $(outerBox).find('.accordion .acc-btn').removeClass('active');
            }

            if ($(this).next('.acc-content').is(':visible')) {
                return false;
            } else {
                $(this).addClass('active');
                $(outerBox).children('.accordion').removeClass('active-block');
                $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
                target.addClass('active-block');
                $(this).next('.acc-content').slideDown(300);
            }
        });
    }



    //Progress Bar
    if ($('.progress-line').length) {
        $('.progress-line').appear(function() {
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width', percent + '%');
        }, {
            accY: 0
        });
    }

    //Fact Counter + Text Count
    if ($('.count-box').length) {
        $('.count-box').appear(function() {

            var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);

            if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function() {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $t.find(".count-text").text(this.countNum);
                    }
                });
            }

        }, {
            accY: 0
        });
    }



    ///////////////////////////////////////////////////// 
    // Title Animation
    let splitTitleLines = gsap.utils.toArray(".title-anim");

    splitTitleLines.forEach(splitTextLine => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: splitTextLine,
                start: 'top 90%',
                end: 'bottom 60%',
                scrub: false,
                markers: false,
                toggleActions: 'play none none none'
            }
        });

        const itemSplitted = new SplitText(splitTextLine, {
            type: "words, lines"
        });
        gsap.set(splitTextLine, {
            perspective: 400
        });
        itemSplitted.split({
            type: "lines"
        })
        tl.from(itemSplitted.lines, {
            duration: 1,
            delay: 0.3,
            opacity: 0,
            rotationX: -80,
            force3D: true,
            transformOrigin: "top center -50",
            stagger: 0.1
        });
    });
    /////////////////////////////////////////////////////



    //Product Tabs
    if ($('.project-tab').length) {
        $('.project-tab .product-tab-btns .p-tab-btn').on('click', function(e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));

            if ($(target).hasClass('actve-tab')) {
                return false;
            } else {
                $('.project-tab .product-tab-btns .p-tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                $('.project-tab .p-tabs-content .p-tab').removeClass('active-tab');
                $(target).addClass('active-tab');
            }
        });
    }



    // Project One Carousel
    var slider = new Swiper('.project-one_carousel', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: false,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.project-one_carousel-next',
            prevEl: '.project-one_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".project-one_carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 3,
            },
            '1200': {
                slidesPerView: 3,
            },
            '992': {
                slidesPerView: 2,
            },
            '768': {
                slidesPerView: 2,
            },
            '600': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });




    // News One Carousel
    var slider = new Swiper('.news-one_carousel', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: false,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.news-one_carousel-next',
            prevEl: '.news-one_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".news-one_carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 2,
            },
            '1200': {
                slidesPerView: 2,
            },
            '992': {
                slidesPerView: 2,
            },
            '768': {
                slidesPerView: 2,
            },
            '660': {
                slidesPerView: 2,
            },
            '590': {
                slidesPerView: 1,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });



    // Clients Slider
    var slider = new Swiper('.clients-one_slider', {
        slidesPerView: 6,
        spaceBetween: 25,
        loop: true,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.clients-one_slider_button-next',
            prevEl: '.clients-one_slider_button-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".clients-one_pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 6,
            },
            '1200': {
                slidesPerView: 6,
            },
            '992': {
                slidesPerView: 5,
            },
            '768': {
                slidesPerView: 4,
            },
            '576': {
                slidesPerView: 3,
            },
            '0': {
                slidesPerView: 2,
            },
        },
    });




    // History Slider
    var slider = new Swiper('.history-one_slider', {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: false,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.history-one_carousel-next',
            prevEl: '.history-one_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".history-one_carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 4,
            },
            '1200': {
                slidesPerView: 4,
            },
            '992': {
                slidesPerView: 4,
            },
            '900': {
                slidesPerView: 2,
            },
            '768': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 2,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });





    // Four Item Slider
    var slider = new Swiper('.four-item_carousel', {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: false,
        autoplay: {
            enabled: true,
            delay: 6000
        },
        // Navigation arrows
        navigation: {
            nextEl: '.four-item_carousel-next',
            prevEl: '.four-item_carousel-prev',
            clickable: true,
        },
        //Pagination
        pagination: {
            el: ".four-item_carousel-pagination",
            clickable: true,
        },
        speed: 500,
        breakpoints: {
            '1600': {
                slidesPerView: 4,
            },
            '1200': {
                slidesPerView: 4,
            },
            '992': {
                slidesPerView: 4,
            },
            '768': {
                slidesPerView: 2,
            },
            '576': {
                slidesPerView: 2,
            },
            '0': {
                slidesPerView: 1,
            },
        },
    });




    // Odometer
    if ($(".odometer").length) {
        $('.odometer').appear();
        $('.odometer').appear(function() {
            var odo = $(".odometer");
            odo.each(function() {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
            });
            window.odometerOptions = {
                format: 'd',
            };
        });
    }




    //Tabs Box
    if ($('.tabs-box').length) {
        $('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));

            if ($(target).is(':visible')) {
                return false;
            } else {
                target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
                target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
                $(target).fadeIn(300);
                $(target).addClass('active-tab');
            }
        });
    }



    // -------------------------------------------------------
    // skewEffect-start
    let proxy = {
            skew: 0
        },
        skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
        clamp = gsap.utils.clamp(-10, 10); // don't let the skew go beyond 20 degrees. 

    ScrollTrigger.create({
        onUpdate: (self) => {
            let skew = clamp(self.getVelocity() / -300);
            // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
                proxy.skew = skew;
                gsap.to(proxy, {
                    skew: 0,
                    duration: 0.8,
                    ease: "power3",
                    overwrite: true,
                    onUpdate: () => skewSetter(proxy.skew)
                });
            }
        }
    });

    // make the right edge "stick" to the scroll bar. force3D: true improves performance
    gsap.set(".skewElem", {
        transformOrigin: "right center",
        force3D: true
    });
    // skewEffect-end
    // ---------------------------------------------------------


    /////////////////////////////////////////////////////
    // 32. Offcanvas Toggle
    $("#open_offcanvas").on("click", function() {
        // $('body').css('overflow', 'hidden');
        $('.offcanvas__area').css('transform', 'perspective(300px) rotateX(0deg)');
        $('.offcanvas__area').css('opacity', '1');
        $('.offcanvas__area').css('visibility', 'visible');
    });
    $("#close_offcanvas").on("click", function() {
        $('body').css('overflow', 'visible');
        $('.offcanvas__area').css('transform', 'perspective(300px) rotateX(18deg)');
        $('.offcanvas__area').css('opacity', '0');
        $('.offcanvas__area').css('visibility', 'hidden');
    });
    /////////////////////////////////////////////////////
    // jQuery Codes
    jQuery(document).ready(function() {

        /////////////////////////////////////////////////////
        // 30. Side Navbar
        $('.side__navbar').meanmenu({
            meanScreenWidth: "5000",
            meanMenuContainer: '.side__navbar-wrapper',
            meanMenuCloseSize: '36px',
        });
    });

    /////////////////////////////////////////////////////



    // LightBox Image
    if ($('.lightbox-image').length) {
        $('.lightbox-image').magnificPopup({
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }



    // LightBox Video
    if ($('.lightbox-video').length) {
        $('.lightbox-video').magnificPopup({
            // disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            iframe: {
                patterns: {
                    youtube: {
                        index: 'youtube.com',
                        id: 'v=',
                        src: 'https://www.youtube.com/embed/%id%'
                    },
                },
                srcAction: 'iframe_src',
            },
            fixedContentPos: false
        });
    }



    //Contact Form Validation
    if ($('#contact-form').length) {
        $('#contact-form').validate({
            rules: {
                username: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                },
                message: {
                    required: true
                }
            }
        });
    }



    // Scroll to a Specific Div
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function() {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1500);

        });
    }



    // Elements Animation
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }



    /* ==========================================================================
       When document is Scrollig, do
       ========================================================================== */

    $(window).on('scroll', function() {
        headerStyle();
    });

    /* ==========================================================================
       When document is loading, do
       ========================================================================== */

    $(window).on('load', function() {
        handlePreloader();
    });

})(window.jQuery);