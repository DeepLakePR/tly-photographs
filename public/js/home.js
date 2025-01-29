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
    // Apresentation Carousel
    const SectionApresentation = $('section.apresentation');

    const Carousel = SectionApresentation.find('.carousel');

    const Carousel_Fill_Bar = SectionApresentation.find('.carousel-fill-bar');

    const Carousel_Last_Btn = SectionApresentation.find('.carousel-interact-last-btn');
    const Carousel_Next_Btn = SectionApresentation.find('.carousel-interact-next-btn');

    const Carousel_Play_Pause_Btn = SectionApresentation.find('.carousel-interact-play_pause-btn');

    let fullCarouselWidth = $(Carousel)[0].scrollWidth;
    var incrementWidthPos = fullCarouselWidth / Carousel.find('> div').length;
    var currentWidthPos = 0;
    var isPaused = false;
    var timeToNext = 10000; // seconds

    let carouselInterval;

    // Init
    function initCarousel(){

        carouselInterval = setInterval(()=>{

            Carousel_Fill_Bar.animate({
                width: '0%'
            }, 0);

            if(isPaused){
                clearInterval(carouselInterval)
                carouselInterval = null;

                return;
            }

            Carousel_Fill_Bar.animate({
                width: '100%'
            }, timeToNext, ()=>{

                if(isPaused){
                    clearInterval(carouselInterval)
                    carouselInterval = null;
    
                    return;
                }

                if(currentWidthPos <= 0){
                    lastNextCarousel('last');
    
                }else{
                    lastNextCarousel('next');
    
                }

            });

        }, timeToNext);

    };

    // Last Next
    function lastNextCarousel(type, isFromButton = false){

        if(isFromButton){
            Carousel_Fill_Bar.stop(true);
            clearTimeout(carouselInterval);

        }

        if(type === 'last'){
            if(currentWidthPos <= 0){
                currentWidthPos = fullCarouselWidth;

            }else{
                currentWidthPos -= incrementWidthPos;
            
            }

        }else{
            if(currentWidthPos + incrementWidthPos >= fullCarouselWidth){
                currentWidthPos = 0;

            }else{
                currentWidthPos += incrementWidthPos;

            }
            
        }

        Carousel.scrollLeft(currentWidthPos);

        if(isFromButton){
            initCarousel();

        }

    };

    Carousel_Last_Btn.click(()=>{
        lastNextCarousel('last', true);

    })

    Carousel_Next_Btn.click(()=>{
        lastNextCarousel('next', true);

    });

    // Play Pause
    Carousel_Play_Pause_Btn.click(()=>{

        if(!isPaused){ // Pause
            isPaused = true;
            Carousel_Play_Pause_Btn.find('i').removeClass();
            Carousel_Play_Pause_Btn.find('i').addClass('fa-regular fa-circle-play');

            Carousel_Fill_Bar.stop(true);

            return;

        }

        // Play
        isPaused = false;
        Carousel_Play_Pause_Btn.find('i').removeClass();
        Carousel_Play_Pause_Btn.find('i').addClass('fa-regular fa-circle-pause');
        initCarousel();

    });

    //initCarousel();

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
