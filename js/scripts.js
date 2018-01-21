$(document).ready(function () {

    /* ----- Vaariables and user agent check ----- */
    isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


    /* ----- Function to prevent Default Events ----- */
    function pde(e) {
        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false;
    }


    /* ----- Safari class if is Safari ----- */
    if (isSafari) {
        $('html').addClass('is-safari');
    } else {
        $('html').removeClass('is-safari');
    };


    /* ----- Darken the revealed menu on mobile ----- */
    $('.navbar-toggle').on('click', function () {
        if (!$('.navbar-collapse').hasClass("in")) {
            $('.navbar').addClass('darken-menu');
        } else if ($('.navbar-collapse').hasClass("in")) {
            $('.navbar').removeClass('darken-menu');
        }
    });


    /* ----- Parallax effect on welcome screen ----- */
    $(document).scroll(function () {
        var position = $(document).scrollTop();

        if (!isMobile) {
            $(".welcome-section .content-wrapper").css({
                opacity: (1 - position / 500)
            });
        };
    });


    /* ----- Collapse navigation on click (Bootstrap 3 is missing it) ----- */
    $('.nav a').on('click', function () {
        $('#my-nav').removeClass('in').addClass('collapse');
    });


    /* ----- Scroll down from Welcome screen ----- */
    $('.welcome-section .scroll-more').click(function (evt) {
        var place = $('body').children('section').eq(1);
        // var offsetTop = $('.navbar').outerHeight();
        $('html, body').animate({
            scrollTop: $(place).offset().top
        }, 1200, 'easeInOutCubic');
        pde(evt);
    });


    /* ----- Nice scroll to Sections ----- */
    $('.navbar-nav li a').click(function (evt) {
        var place = $(this).attr('href');
        var off = $(place).offset().top;
        $('html, body').animate({
            scrollTop: off
        }, 1200, 'easeInOutCubic');
        pde(evt);
    });


    /* ----- Minimize and darken the Menu Bar ----- */
    $('body').waypoint(function (direction) {
        $('.navbar').toggleClass('minified dark-menu');
    }, {
        offset: '-200px'
    });


    /* ----- Testimonials rotator ----- */
    $('#testimonials-rotator').cbpQTRotator();


    /* ----- Text Rotator ----- */
    $(".rotating-words").textrotator({
        animation: "dissolve",
        separator: ",",
        speed: 3000
    });


    /* ----- Clients Carousel ----- */
    $('.carousel').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        slide: 'div',
        dots: true,
        easing: 'easeInOutQuart',
        speed: 800,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                easing: 'easeInOutQuart',
                speed: 800,
            }
  }, {
            breakpoint: 992,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                easing: 'easeInOutQuart',
                speed: 800,
            }
  }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true,
                easing: 'easeInOutQuart',
                speed: 800,
            }
  }]
    });


    /* ----- Show "Back to Top" button ----- */
    $(document).scroll(function () {
        var position = $(document).scrollTop();
        var headerHeight = $('#welcome').outerHeight();
        if (position >= headerHeight - 100) {
            $('.scrolltotop').addClass('show-to-top');
        } else {
            $('.scrolltotop').removeClass('show-to-top');
        }
    });

    // Scroll on Top
    $('.scrolltotop, .navbar-brand').click(function (e) {
        $('html, body').animate({
            scrollTop: '0'
        }, 1200, 'easeInOutCubic');
        pde(e);
    });


    /* ----- Filterable Portfolio effect ----- */
    $('ul.filter-list li').click(function () {
        $(this).css('outline', 'none');

        $('ul.filter-list .active').removeClass('active');
        $(this).addClass('active');

        var filterVal = $(this).attr('data-id');

        if (filterVal == 'rage') {
            $("#gallery_rage").show();
            $("#gallery_studio").hide();
            $("#gallery_production").hide();
        } else if (filterVal == 'studio') {
            $("#gallery_studio").show();
            $("#gallery_rage").hide();
            $("#gallery_production").hide();
        } else if (filterVal == 'production') {
            $("#gallery_production").show();
            $("#gallery_studio").hide();
            $("#gallery_rage").hide();
        }

        return false;
    });


    /* ----- Contact form ----- */
    $("#submit_btn").click(function (e) {
        e.preventDefault();

        $('#submit_btn').text('').append('<i class="fa fa-spinner fa-spin"></i>');

        //get input field values
        var user_name = $('input[name=name]').val();
        var user_email = $('input[name=email]').val();
        var user_human = $('input[name=human]').val();
        var user_message = $('textarea[name=message]').val();

        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if (user_name == "") {
            $('input[name=name]').css('border-color', 'red');
            $('#submit_btn').remove('i').text('Submit');
            proceed = false;
        }
        if (user_email == "") {
            $('input[name=email]').css('border-color', 'red');
            $('#submit_btn').remove('i').text('Submit');
            proceed = false;
        }
        if (user_human == "") {
            $('input[name=human]').css('border-color', 'red');
            $('#submit_btn').remove('i').text('Submit');
            proceed = false;
        }
        if (user_message == "") {
            $('textarea[name=message]').css('border-color', 'red');
            $('#submit_btn').remove('i').text('Submit');
            proceed = false;
        }

        //everything looks good! proceed...
        if (proceed) {

            //data to be sent to server
            post_data = {
                'userName': user_name,
                'userEmail': user_email,
                'userHuman': user_human,
                'userMessage': user_message
            };

            //Ajax post data to server
            $.post('contact.php', post_data, function (response) {

                //load json data from server and output message     
                if (response.type == 'error') {
                    output = '<div class="error">' + response.text + '</div>';
                    $('#submit_btn').remove('i').text('Submit');
                } else {
                    output = '<div class="success">' + response.text + '</div>';

                    $('#submit_btn').remove('i').text('Message sent!');
                    $('#submit_btn').attr("disabled", true);

                    //reset values in all input fields
                    $('#contact_form input').val('');
                    $('#contact_form textarea').val('');
                }

                $("#result").hide().html(output).slideDown();

            }, 'json');

        }

    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function () {
        $("#contact_form input, #contact_form textarea").css('border-color', '');
        $("#result").slideUp();
    });


    /* ----- Forms Placeholder fix for IE8 and IE9 ----- */
    $('[placeholder]').focus(function () {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function () {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur().parents('form').submit(function () {
        $(this).find('[placeholder]').each(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        })
    });

    $('#gallery_rage').imagesLoaded(function () {
        //Photo Gallery grid
        $('#gallery_rage').isotope({
            // options
            itemSelector: '.item',
            layoutMode: 'masonry'
        });
    });

    $(".filter").on("click", function () {

        var category_name = $(this).attr("data-id");

        if (category_name == 'rage') {
            $('#gallery_rage').isotope({
                // options
                itemSelector: '.item',
                layoutMode: 'masonry'
            });
        } else if (category_name == 'studio') {
            $('#gallery_studio').isotope({
                // options
                itemSelector: '.item',
                layoutMode: 'masonry'
            });
        } else if (category_name == 'production') {
            $('#gallery_production').isotope({
                // options
                itemSelector: '.item',
                layoutMode: 'masonry'
            });
        }

    });

    // init




    /* ----- Initialize Portfolio Grid ----- */
    initializeGrid();


    /* ----- Initializa Parallax effect ----- */
    parallaxed('.parallax');


    /* ----- Initialize Photoswipe ----- */

    initializePhotoSwipe();

});



/* ----- Functions ----- */

function initializeGrid() {
    Grid.init();
}

function parallaxed(obj) {

    $(window).bind("load resize scroll", function () {
        $(obj).each(function () {
            var windowHeight = $(window).height();
            var windowWidth = $(window).width();
            var scrollPos = $(window).scrollTop();
            var objectPos = $(this).offset().top;
            var position = objectPos - scrollPos;

            if (!isMobile && windowWidth >= 768) {
                $(this).css('background-position', '50% ' + parseInt(position * 0.2) + 'px');
            } else {
                $(this).css({
                    backgroundPosition: '50% 0px',
                    backgroundSize: 'cover'
                });
            }
        });
    });

}

/* Initialize PhotoSwipe
 */
function initializePhotoSwipe() {
    var initPhotoSwipeFromDOM = function (gallerySelector) {

        // parse slide data (url, title, size ...) from DOM elements 
        // (children of gallerySelector)
        var parseThumbnailElements = function (el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                childElements,
                linkEl,
                size,
                item;

            for (var i = 0; i < numNodes; i++) {


                figureEl = thumbElements[i]; // <figure> element

                // include only element nodes 
                if (figureEl.nodeType !== 1) {
                    continue;
                }

                linkEl = figureEl.children[0]; // <a> element

                size = linkEl.getAttribute('data-size').split('x');

                // create slide object
                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };



                if (figureEl.children.length > 1) {
                    // <figcaption> content
                    item.title = figureEl.children[1].innerHTML;
                }

                if (linkEl.children.length > 0) {
                    // <img> thumbnail element, retrieving thumbnail url
                    item.msrc = linkEl.children[0].getAttribute('src');
                }

                item.el = figureEl; // save link to element for getThumbBoundsFn
                items.push(item);
            }

            return items;
        };

        // find nearest parent element
        var closest = function closest(el, fn) {
            return el && (fn(el) ? el : closest(el.parentNode, fn));
        };

        // triggers when user clicks on thumbnail
        var onThumbnailsClick = function (e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            var clickedListItem = closest(eTarget, function (el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });

            if (!clickedListItem) {
                return;
            }


            // find index of clicked item
            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;

            for (var i = 0; i < numChildNodes; i++) {
                if (childNodes[i].nodeType !== 1) {
                    continue;
                }

                if (childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }



            if (index >= 0) {
                openPhotoSwipe(index, clickedGallery);
            }
            return false;
        };

        // parse picture index and gallery index from URL (#&pid=1&gid=2)
        var photoswipeParseHash = function () {
            var hash = window.location.hash.substring(1),
                params = {};

            if (hash.length < 5) {
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if (!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');
                if (pair.length < 2) {
                    continue;
                }
                params[pair[0]] = pair[1];
            }

            if (params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            if (!params.hasOwnProperty('pid')) {
                return params;
            }
            params.pid = parseInt(params.pid, 10);
            return params;
        };

        var openPhotoSwipe = function (index, galleryElement, disableAnimation) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);

            // define options (if needed)
            options = {
                index: index,

                // define gallery index (for URL)
                galleryUID: galleryElement.getAttribute('data-pswp-uid'),

                getThumbBoundsFn: function (index) {
                    // See Options -> getThumbBoundsFn section of docs for more info
                    var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();

                    return {
                        x: rect.left,
                        y: rect.top + pageYScroll,
                        w: rect.width
                    };
                },

                // history & focus options are disabled on CodePen
                // remove these lines in real life: 
                history: false,
                focus: false

            };

            if (disableAnimation) {
                options.showAnimationDuration = 0;
            }

            // Pass data to PhotoSwipe and initialize it
            gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        // loop through all gallery elements and bind events
        var galleryElements = document.querySelectorAll(gallerySelector);

        for (var i = 0, l = galleryElements.length; i < l; i++) {
            galleryElements[i].setAttribute('data-pswp-uid', i + 1);
            galleryElements[i].onclick = onThumbnailsClick;
        }

        // Parse URL and open gallery if it contains #&pid=3&gid=1
        var hashData = photoswipeParseHash();
        if (hashData.pid > 0 && hashData.gid > 0) {
            openPhotoSwipe(hashData.pid - 1, galleryElements[hashData.gid - 1], true);
        }
    };

    // execute above function
    initPhotoSwipeFromDOM('.my-simple-gallery');
}