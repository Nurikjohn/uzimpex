let counted = false;

$('.section2').waypoint(function (direction) {
    $('.section2').addClass("fade-in")
}, {
    offset: '40%'
});

$('.section3').waypoint(function (direction) {
    $('.section3').addClass("fade-in")
}, {
    offset: '40%'
});

$('.section4').waypoint(function (direction) {
    $('.section4').addClass("fade-in")
}, {
    offset: '40%'
});

$('.section5').waypoint(function (direction) {
    $('.section5').addClass("fade-in")
}, {
    offset: '40%'
});

$('.section6').waypoint(function (direction) {
    $('.section6').addClass("fade-in")
}, {
    offset: '40%'
});

$('.section7').waypoint(function (direction) {

    $('.section7').addClass("fade-in");

    if (!counted) {
        $('.count-first').animationCounter({
            start: 0,
            end: parseInt($('.count-first').text()),
            step: 20,
            delay: 2
        });

        $('.count-second').animationCounter({
            start: 0,
            end: parseInt($('.count-second').text()),
            step: 1,
            delay: 30
        });

        $('.count-third').animationCounter({
            start: 0,
            end: parseInt($('.count-third').text()),
            step: 1,
            delay: 100
        });

        counted = true
    }
}, {
    offset: '50%'
});

$('.section8').waypoint(function (direction) {
    $('.section8').addClass("fade-in")
}, {
    offset: '40%'
});

$('.section9').waypoint(function (direction) {
    $('.section9').addClass("fade-in")
}, {
    offset: '40%'
});

$('.section10').waypoint(function (direction) {
    $('.section10').addClass("fade-in")
}, {
    offset: '40%'
});

$('.section11').waypoint(function (direction) {
    $('.section11').addClass("fade-in")
}, {
    offset: '40%'
});

$('.section12').waypoint(function (direction) {
    $('.section12').addClass("fade-in")
}, {
    offset: '40%'
});

$('.section13').waypoint(function (direction) {
    $('.section13').addClass("fade-in")
}, {
    offset: '40%'
});

$('.section14').waypoint(function (direction) {
    $('.section14').addClass("fade-in")
}, {
    offset: '80%'
});