var nextSlide = function() {
    $.ajax('/mediafile/pdf/next/');
};

var previousSlide = function() {
    $.ajax('/mediafile/pdf/prev/');
};

$(document).ready(function() {
    $('body').click(nextSlide);
    $(document).keyup(function(e) {
        console.log('Key pressed:', e.which);
        if (e.which == 37 || e.which == 40) previousSlide();
        else if (e.which == 39 || e.which == 38) nextSlide();
    });
});
