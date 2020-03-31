(function($) {
    $(document).ready(function() {

        /* -- Sticky Header -- Starts */
        $(window).scroll(function(){
            if(!$('.side-menu').hasClass('active')) { 
                var nav = $('#mainNav'),
                    hero = $('.hero'),
                    scroll = $(window).scrollTop();
                    placeHolder = $('.placeholder-mainNav');
                      
                if(scroll >= (hero.height() - 41)){        
                        nav.addClass('fixed');
                        nav.addClass('nav-alt-color');
                        nav.addClass('alt-color-nav');
                        placeHolder.css({'position':'relative'});
                } 
                else {
                    nav.removeClass('fixed');
                    nav.removeClass('nav-alt-color');
                    nav.removeClass('alt-color-nav');
                    placeHolder.css({'position':'absolute'});
                } 
            }   
        });
        /* -- Sticky Header -- Ends */

        /* -- TypewriterJS Starts --- */
        var $heroDesc = $('#hero-desc');
        var dynamicText = [];

        if (window.HeroConfig) {
            dynamicText = HeroConfig.dynamicText || [];
        }
        
        if(dynamicText && $heroDesc.length) {
            var typewriter = new Typewriter($heroDesc.get(0), {
                loop: true
            });

            dynamicText.forEach(function(text) {
                typewriter.typeString(text)
                    .pauseFor(1500)
                    .deleteAll()
                    .start();
            });
        }
        /* -- TypewriterJS Ends --- */
    });
})($);


(function($) {
    $(document).ready(function() {
        /* --- Smooth Scroll Nav items Starts--- */
        $(document).on('click', 'a.navbar-item[href^="#"]', function (ev) {
            ev.preventDefault();
        
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top - 110
            }, 200);
        });
        
        /* --- Smooth Scroll Nav items Ends--- */
        /* -- Side Menu Main Nav Starts -- */
        var navItems = $('.nav a.mobile__hide');

        navItems.each(function(ind,ele){
            if(ind !== (navItems.length - 1)){
                $(ele).clone().removeClass('mobile__hide').addClass('nav-item-c mobile__show_inline').prependTo('.nav-menu-cl');
            }
        });

        $('.nav-item-c').click(function(){
            $('.side-menu').removeClass('active'); 
            $('body').css({"overflow":"visible"});
         });
        /* -- Side Menu Main Nav Ends -- */

        /* -- Grid ellipsis Starts --- */
        $('.grid-layout .grid-item').each(function() {
            if($(this).hasClass('big-grid-item')) {
                $(this).find('.grid-item-desc').ellipsis({
                    lines: 8,             // force ellipsis after a certain number of lines. Default is 'auto'
                    ellipClass: 'ellip',  // class used for ellipsis wrapper and to namespace ellip line
                    responsive: true      // set to true if you want ellipsis to update on window resize. Default is false
                });
            }  else {
                $(this).find('.grid-item-desc').ellipsis({
                    lines: 4,             
                    ellipClass: 'ellip',  
                    responsive: true
                });
            }
        });
        /* -- Grid ellipsis Ends --- */

        /* -- Feature box ellipsis Starts --- */
        ellipsis(6);
        /* -- Feature box  ellipsis Ends --- */

        /* --- More Side Menu Starts --- */
        $("[data-toggle='side-menu']").click(function(e) {
            $('.side-menu').toggleClass('active');  

            if($('.side-menu').hasClass('active')) {  
                
                $('.side-menu input').show();
                $('.side-menu .extra-button-nav').show();
                $('.side-menu .social-follow').show();
                
                if($('#mainNav').hasClass('alt-color-nav')) {
                    $('#mainNav').removeClass('nav-alt-color');
                } else {
                    $('#mainNav').addClass('fixed');
                }   
                $('body').css({"overflow":"hidden"});

            }else{
                
                $('.side-menu input').hide();
                $('.side-menu .extra-button-nav').hide();
                $('.side-menu .social-follow').hide();
                
                if($('#mainNav').hasClass('alt-color-nav')) {
                    $('#mainNav').addClass('nav-alt-color');
                } else {
                    $('#mainNav').removeClass('fixed');
                }   
                $('body').css({"overflow":"visible"});

            }
            
            return false;
        });
        /* --- More Side Menu Ends --- */

        /* -- Home Grid modal Starts --- */
        if($('.grid-container').length) {
            var modalHTML = '<div class="modal" id="gridItemModal" tabindex="-1" role="dialog" aria-labelledby="gridItemModalLabel" aria-hidden="true">\
                    <div class="modal-dialog modal-dialog-centered" role="document">\
                        <div class="modal-content">\
                            <div class="modal-header">\
                                <i class="mdi mdi-close close" data-dismiss="modal" aria-label="Close"></i>\
                                <div class="center-v">\
                                    <time>Our Work</time>\
                                    <h5 class="modal-title" id="gridItemModalLabel"></h5>\
                                    <span class="modal-subtitle"></span>\
                                </div>\
                            </div>\
                            <div class="modal-body">\
                                <span>Summary Here</span>\
                            </div>\
                            <div class="modal-footer">\
                                <a href="#" class="btn-more">Link Label</a>\
                            </div>\
                        </div>\
                    </div>\
                </div>';
    
            $('body').append(modalHTML);
    
            $('.grid-modal-trigger').click(function(event){
                event.preventDefault();
                //getting modal content info from grid item
                var modal_title = $(this).find('.grid-item-title').text();
                var modal_content = $(this).find('.grid-item-modal-description').html();
                var modal_url = $(this).find('.grid-item-url').text();
                var modal_footer_size = $(this).find('.grid-item-modal-footer-size').text();
                //adding grid item content inside modal before open's
                $('#gridItemModal').on('show.bs.modal', function (event) {
                    var modal = $(this);
                    modal.find('.modal-title').text(modal_title);
                    modal.find('.modal-body span').html(modal_content);
                    switch(modal_footer_size){
                        case "1":
                            modal.find('.modal-footer').removeClass('m-short m-medium m-large');
                            modal.find('.modal-footer').addClass('m-short');
                        break;
                        case "2":
                            modal.find('.modal-footer').removeClass('m-short m-medium m-large');
                            modal.find('.modal-footer').addClass('m-medium');
                        break;
                        case "3":
                            modal.find('.modal-footer').removeClass('m-short m-medium m-large');
                            modal.find('.modal-footer').addClass('m-large');
                        break;
                    }
                    modal.find('.modal-footer a[href^="#"]').text(modal_title);
                    modal.find('.modal-footer a[href^="#"]').attr("href", modal_url);
                });
                
            });
            
            $('#gridItemModal').on('shown.bs.modal', function () {
                $('.sections-container , .hero').addClass('custom-backdrop');
            });
    
            $('#gridItemModal').on('hide.bs.modal', function () {
                $('.sections-container , .hero').removeClass('custom-backdrop');
            });
        }

         /* -- Home Grid modal Ends --- */

         /* -- Webinar Article Modal Starts --*/
         if($('#video-modal').length) {
            $('#video-modal').on('shown.bs.modal', function () {
                $('.main-container').addClass('custom-backdrop');
            });

            $('#video-modal').on('hide.bs.modal', function () {
                $('.main-container').removeClass('custom-backdrop');
            }); 
         }
         /* -- Webinar Article Modal Ends --*/

        /* --- Home Carousel starts --- */
        var cssSmall = {
            width: 75,
            height: 75,
            marginTop: 75
        };
        var cssMedium = {
            width: 100,
            height: 100,
            marginTop: 60
        };
        var cssLarge = {
            width: 250,
            height: 250,
            marginTop: 0
        };
        var aniConf = {
            queue: false,
            duration: 300
        };
     
        $('#carousel')
            .children().css(cssSmall)
            .eq(1).css(cssMedium)
            .next().css(cssLarge)
            .next().css(cssMedium);
            
        $('#carousel').carouFredSel({
            width: '100%',
            height: 250,
            items: 5,
            scroll: {
                items: 1,
                duration: aniConf.duration,
                onBefore: function (data) {

                    //	0 [ 1 ] 2  3  4
                    data.items.old.eq(1).animate(cssSmall, aniConf);

                    //	0  1 [ 2 ] 3  4
                    data.items.old.eq(2).animate(cssMedium, aniConf);

                    // 0  1  2  [ 3 ] 4
                    data.items.old.eq(3).animate(cssLarge, aniConf);

                    //	0  1  2  3 [ 4 ]
                    data.items.old.eq(4).animate(cssMedium, aniConf);
                }
            }
        });
        /* --- Home Carousel Ends --- */
        
         // Search 
         $('.search-form').submit(function(event){
            event.preventDefault();
            var $query = $('.search-bar-container .search-input');
            window.location.href = window.location.origin+'/search-results?q="'+ $query.val()+'"';
        });

        $('.search-container.no-filter .search-btn').click(function(event){
           event.preventDefault();
           var $query = $('.search-container .search-input');
           window.location.href = window.location.origin+'/search-results?q="'+ $query.val()+'"';
       });;
    });
})($);


(function($) {
    $(document).ready(function() {
        var $wrapperContainer = $('body > div');
        var $sectionDividers = $('.section-divider');

        function checkCurrentDevice() {
            if (mobileCheck()) {
                $wrapperContainer.addClass('mobile-device');
                $sectionDividers.css({'background-attachment':'unset'});
            } else {
                $wrapperContainer.removeClass('mobile-device');
                $sectionDividers.css({'background-attachment':'fixed'});
            }
        }

        $(window).resize(debounce(checkCurrentDevice, 400));

        checkCurrentDevice();

        function mobileDeviceType() {
            $wrapperContainer.addClass(checkDevice());
        }
        
        mobileDeviceType();
    });
})($);


(function($) {
    $(document).ready(function() {
        var $linkBtn = $('.btn-link');
        var $pageURLInput = $('#pageURLText');
        var $shareContainer = $('#share-container');
        var contentSummary = '';
        var contentTitle = '';
        var pageURL = window.location.href;

        if (!$shareContainer.length) { return; }

        if (window.ShareConfig) {
            contentSummary = ShareConfig.contentSummary || '';
            contentTitle = ShareConfig.contentTitle || '';
        }

        function setSocialLinks() {
            $('.social-link').each(function(index, item) {
                var $link = $(item);
                var $icon = $link.find('.icon');

                if ($icon.hasClass('mdi-facebook-box')) {
                    $link.attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + pageURL);
                } else if ($icon.hasClass('mdi-twitter')) {
                    $link.attr('href', 'https://twitter.com/share?url=' + pageURL + '&text=' + contentTitle);
                } else if ($icon.hasClass('mdi-linkedin')) {
                    $link.attr('href', 'https://www.linkedin.com/shareArticle?mini=true&url=' + pageURL + '&title=' + contentTitle + '&summary=' + contentSummary);
                } else if ($icon.hasClass('mdi-email')) {
                    $link.attr('href', 'mailto:?&subject=' + contentTitle + '&body=' + pageURL);
                }
            });
        }

        if ($linkBtn.length) {
            $linkBtn.click(function() {
                $pageURLInput.val(pageURL);
                $pageURLInput.show();
                
                if (mobileCheck()) {
                    $pageURLInput.setSelectionRange(0, pageURL.length);
                } else {
                    $pageURLInput.select();
                }
    
                document.execCommand('copy');
                $pageURLInput.hide();
            });
        }

        setSocialLinks();
        $pageURLInput.hide();
    });
})($)


/* --- General Tools Start --- */
function debounce(func, wait, immediate) {
    var timeout;

    return function() {
        var context = this;
        var args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function mobileCheck() {
    var check = false;

    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
            check = true;
        }
    })(navigator.userAgent||navigator.vendor||window.opera);

    return check;
}

/* -- detecting if divice is android or ios device */
function checkDevice() {
    var device = ''
    if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) {
        device = 'device-ios';
    } 
    if (navigator.userAgent.match(/android/i)){
        device = 'device-android';
    } 

    return device
}
/* -- detecting if is android or ios device  -- Ends*/

/* --- General Tools End --- */


/* --- Swipe Start --- */
var listenerList = [];
var isSwiping = false;

function animateSwipe(dir, value, newIndex, $swipeFeatureContainer) {
    var newValue = value + 'px';

    $swipeFeatureContainer.animate({
        marginLeft: ((dir === 'left') ? '-=' : '+=') + newValue
    }, 400);
    $swipeFeatureContainer.attr('data-current-index', newIndex);
}

function getSwipeContainerWidthAndLength($item) {
    var $itemInvisible = $item.find('.article-grid-item-invisible');
    var $swipeItems = $item.find('.swipe-item');
    var amount = $swipeItems.length;
    var total = 5;

    $swipeItems.each(function(index, item) { total += item.offsetWidth; });

    if ($itemInvisible.length) {
        amount += 1;
        total += $itemInvisible.get(0).offsetWidth;
    }

    $item.width(total + 'px');

    return amount;
}

function initSwiping() {
    var $swipeFeatureContainers = $('.swipe-feature-container');

    isSwiping = true;

    $swipeFeatureContainers.each(function(index, item) {
        var $item = $(item);
        var listener = SwipeListener(item);

        $item.attr('data-length', getSwipeContainerWidthAndLength($item));
        $item.attr('data-current-index', '1');
        $item.addClass('mobile');
        $item.parents('section').css('paddingRight', '0');
        item.addEventListener('swipe', onAdditionSwipe);
        listenerList.push(listener);
    });
}

function onAdditionSwipe(e) {
    var $swipeFeatureContainer = $(e.currentTarget);
    var directions = e.detail.directions;

    if (directions.left) {
        onAdditionalSwipeLeft($swipeFeatureContainer);
    } else if (directions.right) {
        onAdditionalSwipeRight($swipeFeatureContainer);
    }
}

function onAdditionalSwipeLeft($swipeFeatureContainer) {
    var currrentIndex = parseInt($swipeFeatureContainer.attr('data-current-index'));
    var itemLength = parseInt($swipeFeatureContainer.attr('data-length'));

    if (currrentIndex === itemLength) { return; }

    var itemWidth = $swipeFeatureContainer.find('.swipe-item').get(0).offsetWidth;

    if (currrentIndex === itemLength - 1) {
        var $itemInvisible = $swipeFeatureContainer.find('.article-grid-item-invisible');
        
        itemWidth = $itemInvisible.get(0).offsetWidth;
    }

    animateSwipe('left', itemWidth, currrentIndex + 1, $swipeFeatureContainer);
}

function onAdditionalSwipeRight($swipeFeatureContainer) {
    var currrentIndex = parseInt($swipeFeatureContainer.attr('data-current-index'));
    var itemLength = parseInt($swipeFeatureContainer.attr('data-length'));

    if (currrentIndex === 1) { return; }

    var itemWidth = $swipeFeatureContainer.find('.swipe-item').get(0).offsetWidth;

    if (currrentIndex === itemLength) {
        var $itemInvisible = $swipeFeatureContainer.find('.article-grid-item-invisible');
        
        itemWidth = $itemInvisible.get(0).offsetWidth;
    }

    animateSwipe('right', itemWidth, currrentIndex - 1, $swipeFeatureContainer);
}

function stopSwiping() {
    var $swipeFeatureContainers = $('.swipe-feature-container');

    listenerList.forEach(function(listener) { listener.off(); });

    isSwiping = false;
    listenerList = [];

    $swipeFeatureContainers.each(function(index, item) {
        var $item = $(item);

        $item.removeAttr('style');
        $item.removeClass('mobile');
        $item.parents('section').css('paddingRight', '');
        item.removeEventListener('swipe', onAdditionSwipe);
    });
}
/* --- Swipe End --- */

//funtion add ellipsis in feature boxes
function ellipsis(contentLines) {
    $('.card-container .card-item').each(function() {
        $(this).find('.feature-item-summary').ellipsis({
            lines: contentLines,             // force ellipsis after a certain number of lines. Default is 'auto'
            ellipClass: 'ellip',  // class used for ellipsis wrapper and to namespace ellip line
            responsive: false      // set to true if you want ellipsis to update on window resize. Default is false
        });
    });
}