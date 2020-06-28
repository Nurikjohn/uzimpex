$('.section7').waypoint(function(direction){
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
        delay:100
    });
},{
    offset: '50%'
});