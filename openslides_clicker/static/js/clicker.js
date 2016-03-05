var nextSlideKeys = [
    13,
    32,
    34,
    39,
    40,
    78,
];

var prevSlideKeys = [
    8,
    18,
    33,
    37,
    38,
    80,
];

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
        console.log("Key Up", e.which, $.inArray(e.which, prevSlideKeys), $.inArray(e.which, nextSlideKeys));
        if ($.inArray(e.which, prevSlideKeys) >= 0) {
            previousSlide();
            return e.preventDefault();
        } else if ($.inArray(e.which, nextSlideKeys) >= 0) {
            nextSlide();
            return e.preventDefault();
        }
    });
});
