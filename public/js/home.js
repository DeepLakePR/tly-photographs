$(() => {

    ///////////////////////////
    // Smooth Scrolling
    const lenis = new Lenis({
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: true,
    });

    function lenis_raf(time) {
        lenis.raf(time);
        requestAnimationFrame(lenis_raf);
    }

    requestAnimationFrame(lenis_raf);

    ///////////////////////////
    // Footer Common Questions
    const CommonQuestion_Single = $('footer .com-quest');

    CommonQuestion_Single.each((_, questionDiv) => {

        questionDiv = $(questionDiv);

        questionDiv.find('p').click(() => {

            if (typeof questionDiv.attr('opened') !== 'undefined' && questionDiv.attr('opened') !== false) {
                questionDiv.removeAttr('opened');
                return;

            }

            questionDiv.attr('opened', '');
            return;
        });

    })

});
