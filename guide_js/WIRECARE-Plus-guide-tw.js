// block-data-slider ////////////////////////////////////////////////////////
$(document).ready(function () {
    let slickInitialized = false;
    const $dataSlider = $('.block-data-slider');
    const $circleItems = $('.block-data-circle > figcaption');
    const $slider = $('.block-data-slider');
    const $window = $(window);

    function initDataSlider() {
        const windowWidth = window.innerWidth;

        if ($dataSlider.length) {
            if (windowWidth < 768) {
                if (!slickInitialized && !$dataSlider.hasClass('slick-initialized')) {
                    $dataSlider.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: false,
                        infinite: true,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        pauseOnHover: false,
                        pauseOnDotsHover: false,
                        pauseOnFocus: false
                    });
                    slickInitialized = true;
                }
                setEqualHeight();
            } else {
                if (slickInitialized && $dataSlider.hasClass('slick-initialized')) {
                    $dataSlider.slick('unslick');
                    slickInitialized = false;
                }
                resetHeight();
            }
            $circleItems.removeClass('active').first().addClass('active');
        }
    }

    function setEqualHeight() {
        const $elements = $('.block-data-slider li');
        if ($elements.length) {
            let maxHeight = 0;
            $elements.css('height', 'auto');
            $elements.each(function () {
                maxHeight = Math.max(maxHeight, $(this).outerHeight());
            });
            $elements.css('height', maxHeight + 'px');
        }
    }

    function resetHeight() {
        const $elements = $('.block-data-slider li');
        if ($elements.length) {
            $elements.css('height', 'auto');
        }
    }

    function updateNav(index) {
        $circleItems.removeClass('active').eq(index).addClass('active');
    }

    if ($slider.length) {
        $slider.on('afterChange', function (event, slick, currentSlide) {
            updateNav(currentSlide);
            setEqualHeight();
        });
    }

    if ($dataSlider.length) {
        $dataSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $circleItems.removeClass('active').eq(nextSlide).addClass('active');
        });
    }

    $circleItems.on('click', function () {
        if (slickInitialized && $dataSlider.length) {
            const index = $(this).index();
            $circleItems.removeClass('active').eq(index).addClass('active');
            $dataSlider.slick('slickGoTo', index);
        }
    });

    initDataSlider();
    updateNav(0);
    $window.trigger('scroll');

    $window.on('resize', function () {
        initDataSlider();
    });

    $dataSlider.on('init', function () {
        if (window.innerWidth < 768) {
            setEqualHeight();
        }
    });
});

// video ////////////////////////////////////////////////////////
$(document).ready(function () {
    const $window = $(window);
    const $slider = $('.block-status_slider');
    let $infoSlider = null;

    function initBlockLightSlider() {
        if ($slider.length && !$slider.hasClass('slick-initialized')) {
            $slider.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                infinite: true,
                arrows: false,
                dots: false,
                swipe: true,
                fade: true,
                pauseOnHover: false,
                pauseOnDotsHover: false,
                pauseOnFocus: false,
            });
        }
    }

    function initInfoSlider() {
        const $blockLightInfo = $('.block-status_info');
        const windowWidth = window.innerWidth;

        if ($blockLightInfo.length) {
            if (windowWidth < 1025) {
                if (!$infoSlider && !$blockLightInfo.hasClass('slick-initialized')) {
                    $infoSlider = $blockLightInfo.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        autoplay: true,
                        autoplaySpeed: 3000,
                        infinite: true,
                        arrows: false,
                        dots: false,
                        swipe: true,
                        pauseOnHover: false,
                        pauseOnDotsHover: false,
                        pauseOnFocus: false,
                        asNavFor: '.block-status_slider'
                    });
                }
            } else if ($infoSlider && $blockLightInfo.hasClass('slick-initialized')) {
                $blockLightInfo.slick('unslick');
                $infoSlider = null;
            }
        }
    }

    function updateNav(index) {
        $('.block-status_info li').removeClass('active').eq(index).addClass('active');
    }

    if ($slider.length) {
        $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            updateNav(nextSlide);
            if (window.innerWidth < 1025 && $infoSlider) {
                $('.block-status_info').slick('slickGoTo', nextSlide);
            }
        });
    }

    $('.block-status_info li').on('click', function (e) {
        e.preventDefault(); // 防止可能的默認行為干擾
        const index = $(this).index();
        const windowWidth = window.innerWidth;

        // 停止自動播放以確保手動控制優先
        if ($slider.length) {
            $slider.slick('slickGoTo', index);
        }

        // 更新active狀態
        updateNav(index);

        // 小於768px時同步infoSlider
        if (windowWidth < 1025 && $infoSlider) {
            $('.block-status_info').slick('slickPause');
            $('.block-status_info').slick('slickGoTo', index);
        }
    });

    // 初始化
    initBlockLightSlider();
    initInfoSlider();
    updateNav(0);

    // Resize 時重設
    $window.on('resize', function () {
        initInfoSlider();
    });
});


// video ////////////////////////////////////////////////////////
$(function () {
    $('.removeTextNodes').contents().filter(function () {
        return this.nodeType === 3;
    }).remove();
});
// video ////////////////////////////////////////////////////////
$(document).ready(function () {
    var $videos = $('.videoPlay');

    function isVideoInMiddleOfViewport($video) {
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        var videoTop = $video.offset().top;
        var videoBottom = videoTop + $video.outerHeight();
        var middleOfViewport = (viewportTop + viewportBottom) / 2;

        return videoTop < middleOfViewport && videoBottom > middleOfViewport;
    }
    $(window).scroll(function () {
        $videos.each(function () {
            var $video = $(this);

            if (isVideoInMiddleOfViewport($video)) {
                if (!$video.data('hasBeenInView')) {
                    $video.get(0).play();
                    $video.data('hasBeenInView', true);
                }
            } else {
                if ($video.data('hasBeenInView')) {
                    $video.get(0).pause();
                    $video.get(0).currentTime = 0;
                    $video.data('hasBeenInView', false);
                }
            }
        });
    });
});
// getNow ////////////////////////////////////////////////////////
//$(function () {
//    var scrollTop = $(".getNow");
//
//    $(window).scroll(function () {
//        var topPos = $(this).scrollTop();
//        if (topPos > 100) {
//            $(scrollTop).css("opacity", "1");
//
//        } else {
//            $(scrollTop).css("opacity", "0");
//        }
//    });
//});

// scrollTop ////////////////////////////////////////////////////////
$(function () {
    var scrollTop = $(".scrollTop");

    $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 100) {
            $(scrollTop).css("opacity", "1");

        } else {
            $(scrollTop).css("opacity", "0");
        }
    });
    $(scrollTop).click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;

    });
});
//// scrollTop ////////////////////////////////////////////////////////
//$(function () {
//    var scrollTop = $(".scrollTop");
//    var lastScrollTop = 0; // 記錄上次滾動位置
//
//    $(window).scroll(function () {
//        var topPos = $(this).scrollTop();
//
//        if (topPos === 0) {
//            // 滾動到頂部時隱藏
//            scrollTop.css("opacity", "0");
//        } else if (topPos > lastScrollTop) {
//            // 向下滾動時隱藏
//            scrollTop.css("opacity", "0");
//        } else {
//            // 向上滾動時顯示
//            scrollTop.css("opacity", "1");
//        }
//
//        lastScrollTop = topPos; // 更新上次滾動位置
//    });
//
//    scrollTop.click(function () {
//        $("html, body").animate({
//                scrollTop: 0,
//            },
//            800
//        );
//        return false;
//    });
//});
// scrollTop ////////////////////////////////////////////////////////
$(document).ready(function () {
    'use strict';

    var lastScrollTop = $(window).scrollTop(), // 取得當前滾動位置
        navbar = $('header');

    // **頁面載入時設定 header 狀態**
    if (lastScrollTop > 0) {
        navbar.addClass("scrolldown").removeClass("scrollUp");
    } else {
        navbar.removeClass("scrolldown scrollUp");
    }

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();

        if (scrollTop === 0) {
            // 滾動到頂部時移除所有 class，並確保顯示
            navbar.removeClass("scrolldown scrollUp");
        } else if (scrollTop > lastScrollTop && lastScrollTop > 0) {
            // 只有當向下滾動且不在頂部時才隱藏
            navbar.addClass("scrolldown").removeClass("scrollUp");
        } else if (scrollTop < lastScrollTop) {
            // 向上滾動時顯示
            navbar.addClass("scrollUp").removeClass("scrolldown");
        }

        lastScrollTop = scrollTop; // 更新上次滾動位置
    });
});
// AOS ////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        disable: () => window.innerWidth < 768
    });
});

// lenis.js ////////////////////////////////////////////////////////
$(document).ready(function () {

    Delighters.config({
        start: 1,
        autoInit: false
    })
});


// lenis.js ////////////////////////////////////////////////////////
$(document).ready(function () {
    const lenis = new Lenis();
    /*
    lenis.on("scroll", (e) => {
        //console.log(e);
    });
    */
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
});
// 平滑滾動引用 ////////////////////////////////////////////////////////
$('html').smoothScroll();

/////////////////////////////////////////////////////////////////////
document.querySelectorAll(".accordion").forEach(accordion => {
    const items = accordion.querySelectorAll("dt");

    function toggleAccordion(event) {
        const content = this.nextElementSibling;
        const isOpen = this.getAttribute('aria-expanded') === 'true';

        // 先關閉當前 .accordion 內的所有內容
        items.forEach(item => {
            item.setAttribute('aria-expanded', 'false');
            const itemContent = item.nextElementSibling;
            itemContent.style.maxHeight = null;
        });

        // 如果當前是關閉的，則展開
        if (!isOpen) {
            this.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    // 預設展開該 .accordion 內的第一個選項
    if (items.length > 0) {
        items[0].setAttribute('aria-expanded', 'true');
        const firstContent = items[0].nextElementSibling;
        firstContent.style.maxHeight = firstContent.scrollHeight + "px";
    }

    // 為當前 .accordion 內的按鈕綁定點擊事件
    items.forEach(item => item.addEventListener('click', toggleAccordion));
});


/////////////////////////////////////////////////////////////////////
//$(document).ready(function () {
//    function setEqualHeight() {
//        const elements = document.querySelectorAll('.block-data-slider li div > span');
//        let maxHeight = 0;
//
//        // 檢查視窗寬度
//        if (window.innerWidth > 768) {
//            // 先重置高度以獲取自然高度
//            elements.forEach(el => {
//                el.style.height = 'auto';
//            });
//
//            // 找到最大高度
//            elements.forEach(el => {
//                const height = el.offsetHeight;
//                maxHeight = Math.max(maxHeight, height);
//            });
//
//            // 設置所有元素為最大高度
//            elements.forEach(el => {
//                el.style.height = `${maxHeight}px`;
//            });
//        }
//    }
//
//    // 頁面載入時執行
//    window.addEventListener('load', setEqualHeight);
//    // 視窗大小改變時執行
//    window.addEventListener('resize', setEqualHeight);
//
//});
