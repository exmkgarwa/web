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

    var submitForm = function (form,data) {

        o.ajax({
            "data":data,
            "url": $(form).attr('action'),
            "async": true,
            "crossDomain": true,
            "method": "POST",
            contentType: 'application/json',
            dataType: 'json',
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            "processData": false,

            success: function (response) {
                if(response && response.code) {
                    $('#messageModal').find('p.updateMessage').html('We are currently facing technical difficulties due to which we could not register your request. Please try again later. We apologize for the inconvenience caused.');
                } else {
                    $('#messageModal').find('p.updateMessage').html('Thank you for filling out the form. We have received your request for a demo and will reach out to you shortly!');
                }
            },
            error: function () {
                $('#contactUsModal').modal('hide');
                $('#messageModal').find('p.updateMessage').html('We are currently facing technical difficulties due to which we could not register your request. Please try again later. We apologize for the inconvenience caused.');
            },
            complete: function (response) {
                $('#contactUsModal').modal('hide');
                $('#messageModal').modal('show');
                o('#subscribeSubmit').removeClass('disabled');
            }
        })
    };

    o('#subscribeSubmit:not(.disabled)').on('click', function (e) {
        e.preventDefault();
        $(this).addClass('disabled');
        var phoneRegex = /-?(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)?/;
        var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        var isValidForm = true;

        $('#subscribeForm').find('.form-group').removeClass('has-error');

        $('#subscribeForm').find('input:not([type=hidden])').each(function () {
            if ($(this).attr('id') === 'email' && !emailRegex.test($(this).val())) {
                $(this).closest('.form-group').addClass('has-error');
                isValidForm = false;
            }

            if (($(this).attr('id') === 'email' || $(this).attr('id') === 'firstName' || $(this).attr('id') === 'lastName')) {
                if($.trim($(this).val()) == '') {
                    $(this).closest('.form-group').addClass('has-error');
                    isValidForm = false;
                }
            }

            if ($(this).attr('id') === 'phone' && !phoneRegex.test($(this).val())) {
                $(this).closest('.form-group').addClass('has-error');
                isValidForm = false;
            }
        });

        if(isValidForm) {
            var data = {
                "email": $('#subscribeForm').find('input#email').val(),
                "firstName": $('#subscribeForm').find('input#firstName').val(),
                "lastName": $('#subscribeForm').find('input#lastName').val(),
                "phone": $('#subscribeForm').find('input#phone').val()
            };
            submitForm('#subscribeForm', JSON.stringify(data));
            return;
        }
    });
}(jQuery);