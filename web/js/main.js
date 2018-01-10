$(document).ready(function () {
    var $document = $(document);
    var $body = $('body');
    var $nav = $('nav');
    var showNavLimit = $('.email').position().top;
    var navShown = false;
    var scrollSpy = false;
    var initTopScroll = $document.scrollTop();
    if (initTopScroll > showNavLimit) {
        $nav.fadeIn();
        navShown = true;
    } else {
        $nav.fadeOut();
    }

    var documentScroll = function (e) {
        var scrollTop = $document.scrollTop();
        if (scrollTop > showNavLimit) {
            if (!navShown) {
                $nav.fadeIn();
                $body.addClass('show-nav');
                navShown = true;
                if (!scrollSpy) {
                    $body.scrollspy({target: 'nav', offset: 0});
                    scrollSpy = true;
                }
            }
        } else {
            if (navShown) {
                $nav.fadeOut();
                $body.removeClass('show-nav');
                navShown = false;
            }
        }
    };
    $document.scroll(documentScroll);

    var trackOutboundLink = function (e) {
        if (typeof ga == 'undefined') {
            return;
        }
        var $link = $(e.currentTarget);
        var url = ($link.attr('target') == '_blank' ? $link.attr('href') : '');
        if (url) {
            ga('send', 'event', 'outbound', 'click', url);
        }
    }
    $('a').click(trackOutboundLink);
    $('[data-toggle="tooltip"]').tooltip();

    $('body').scrollspy({target: ".navbar", offset: 50});
    $('.navbar a').on("click", function () {
        console.log("onclick");
        if (this.hash !== "") {
            var hash = this.hash;
            var currentPos =  $document.scrollTop();
            var hashPos = $(hash).position().top;
            //time always >= 100 and <= 300
            var time = Math.abs(currentPos - hashPos);
            if (time < 100) {
                time = 100;
            } else if (time > 300) {
                time = 300;
            }

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, time, function () {
                window.location.hash = hash;
            });
        }
    });
});
