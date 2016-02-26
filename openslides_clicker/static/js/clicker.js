var nextSlide = function() {
    $.ajax('/mediafile/pdf/next/');
};

var previousSlide = function() {
    $.ajax('/mediafile/pdf/prev/');
};

$(document).ready(function() {
    $('body').click(nextSlide);
    $('iframeoverlay').click(nextSlide);
    $(document).keyup(function(e) {
        if (e.which == 37 || e.which == 40) previousSlide();
        else if (e.which == 39 || e.which == 38) nextSlide();
    });
});
