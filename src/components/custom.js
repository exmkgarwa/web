!function (o) {
    "use strict";
    o('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var a = o(this.hash);
            if ((a = a.length ? a : o("[name=" + this.hash.slice(1) + "]")).length) return o("html, body").animate({
                scrollTop: a.offset().top - 54
            }, 1e3, "easeInOutExpo"), !1
        }
    }), o(".js-scroll-trigger").click(function () {
        o(".navbar-collapse").collapse("hide")
    }), o("body").scrollspy({
        target: "#mainNav",
        offset: 56
    });
    var a = function () {
        if (100 < o("#mainNav").offset().top) {
            o("#mainNav").addClass("navbar-shrink");
            o('.navbar-brand>img').attr('src', 'images/logo.png');
        } else {
            o("#mainNav").removeClass("navbar-shrink");
            o('.navbar-brand>img').attr('src', 'images/logo2.png');
        }
    };
    var getFullYear = function () {
        var dt = new Date();
        o('#copyright-txt').html('All copyrights reserved &copy; ' + dt.getFullYear() + ' - ExperienceFlow');
    };

    a(), o(window).scroll(a), getFullYear();

    // support@experienceflow.com
    // rohit.nagpal@experienceflow.com
    var submitForm = function (form) {

        o.ajax({
            data: $(form).serialize(),
            type: 'POST',
            url: $(form).attr('action'),
            dataType: 'json',
            success: function (response) {
                $('#contactUsModal').modal('hide');
                if(response.status && response.status === 'OK') {
                    $('#messageModal').modal('show');
                    $('#messageModal').find('p.updateMessage').html('Thank you for filling out the form. We have received your request for a demo and will reach out to you shortly!');
                } else {
                    $('#messageModal').modal('show');
                    $('#messageModal').find('p.updateMessage').html('We are currently facing technical difficulties due to which we could not register your request. Please try again later. We apologize for the inconvenience caused.');
                }
            },
            error: function () {
                $('#contactUsModal').modal('hide');
                $('#messageModal').find('p.updateMessage').html('We are currently facing technical difficulties due to which we could not register your request. Please try again later. We apologize for the inconvenience caused.');
            }
        })
    };

    o('#subscribeSubmit:not(.disabled)').on('click', function (e) {
        e.preventDefault();
        var phoneRegex = /-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?/;
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var isValidForm = true;

        $('#subscribeForm').find('.form-group').removeClass('has-error');

        $('#subscribeForm').find('input:not([type=hidden])').each(function () {
            if ($(this).attr('id') === 'MERGE0' && !emailRegex.test($(this).val())) {
                $(this).closest('.form-group').addClass('has-error');
                isValidForm = false;
            }

            if (($(this).attr('id') === 'MERGE0' || $(this).attr('id') === 'MERGE1' || $(this).attr('id') === 'MERGE2')) {
                if($.trim($(this).val()) == '') {
                    $(this).closest('.form-group').addClass('has-error');
                    isValidForm = false;
                }
            }

            if ($(this).attr('id') === 'MERGE4' && !phoneRegex.test($(this).val())) {
                $(this).closest('.form-group').addClass('has-error');
                isValidForm = false;
            }
        });

        if(isValidForm) {
            submitForm('#subscribeForm');
        }
    });
}(jQuery);