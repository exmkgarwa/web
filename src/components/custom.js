! function(o) {
    "use strict";
    o('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var a = o(this.hash);
            if ((a = a.length ? a : o("[name=" + this.hash.slice(1) + "]")).length) return o("html, body").animate({
                scrollTop: a.offset().top - 54
            }, 1e3, "easeInOutExpo"), !1
        }
    }), o(".js-scroll-trigger").click(function() {
        o(".navbar-collapse").collapse("hide")
    }), o("body").scrollspy({
        target: "#mainNav",
        offset: 56
    });
    var a = function() {
        if(100 < o("#mainNav").offset().top) {
            o("#mainNav").addClass("navbar-shrink");
            o('.navbar-brand>img').attr('src','images/logo.png');
        } else {
            o("#mainNav").removeClass("navbar-shrink");
            o('.navbar-brand>img').attr('src','images/logo2.png');
        }
    };
    a(), o(window).scroll(a);
}(jQuery);