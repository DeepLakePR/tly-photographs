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
    const Carousel_Content_List = Carousel.find('> div');

    const Carousel_Fill_Bar = SectionApresentation.find('.carousel-fill-bar');

    const Carousel_Last_Btn = SectionApresentation.find('.carousel-interact-last-btn');
    const Carousel_Next_Btn = SectionApresentation.find('.carousel-interact-next-btn');

    const Carousel_Play_Pause_Btn = SectionApresentation.find('.carousel-interact-play_pause-btn');

    let fullCarouselWidth = $(Carousel)[0].scrollWidth;
    let maxCarouselLength = Carousel_Content_List.length;

    var currentIndex = 0;
    var isPaused = false;
    var timeToNext = 7000; // seconds
    let debuggerCarrousel = false;

    // $(Carousel.find('> div')[1]).position().left

    // console.log(Carousel.find('> div'));

    Carousel.find('> div').each((i, div)=>{

        console.warn(i);    
        console.log($(div).position().left);

    });

    // Setup Carousel
    (function setupCarousel(){

        Carousel.find('> div img').each((_, img)=>{

            $(img).attr('image-loader-src', $(img).attr('src'));
            $(img).attr('src', '');

        });

        return initCarousel();

    })();

    // Init
    function initCarousel() {

        // console.warn(currentIndex);
        // console.log($(Carousel.find('> div').eq(currentIndex)));

        // Reset and Load Current Images
        Carousel.find('> div img').each((_, img)=>{
            $(img).attr('src', '');

        });
        

        $(Carousel.find('> div')[currentIndex]).find('img').each((_, img)=>{
            $(img).attr('src', $(img).attr('image-loader-src'));

            return;

        });

        // Check if is paused
        if (isPaused) {
            console.warn('carousel paused');

            return;
        }

        // Animate Fill Bar
        Carousel_Fill_Bar.animate({
            width: '100%'
        }, timeToNext, () => {

            // Completed, next slide
            if (isPaused) return;

            lastNextCarousel('next');
            // console.log('[NEXT] concluded, next slide');

        });

        return;
    };

    // Last Next
    function lastNextCarousel(type) {

        // Reset Fill Bar
        Carousel_Fill_Bar.stop(true);
        Carousel_Fill_Bar.css('width', '0%');

        // Check Debugger
        if(!debuggerCarrousel && isPaused)
            debuggerCarrousel = true;

        // Check if is last or next
        if (type === 'last') {
            if (currentIndex === 0) {
                currentIndex = maxCarouselLength;

            } else {
                currentIndex -= 1;

            }

        } else {
            if (currentIndex == (maxCarouselLength - 1)) {
                currentIndex = 0;

            } else {
                currentIndex += 1;

            }

        } 


        // Scroll and Init
        let carouselScrollTarget = Carousel.scrollLeft() + ($(Carousel_Content_List[currentIndex]).offset().left - Carousel.offset().left);

        Carousel.scrollLeft(carouselScrollTarget);

        initCarousel();

        return true;

    };

    // Last
    Carousel_Last_Btn.click(() => {
        return lastNextCarousel('last');

    })

    // Next
    Carousel_Next_Btn.click(() => {
        return lastNextCarousel('next');

    });

    // Play Pause
    Carousel_Play_Pause_Btn.click(() => {

        if (!isPaused) { // Pause
            isPaused = true;
            Carousel_Play_Pause_Btn.find('i').removeClass();
            Carousel_Play_Pause_Btn.find('i').addClass('fa-regular fa-circle-play');

            Carousel_Fill_Bar.pause();

            return;
        }

        // Play
        isPaused = false;
        Carousel_Play_Pause_Btn.find('i').removeClass();
        Carousel_Play_Pause_Btn.find('i').addClass('fa-regular fa-circle-pause');
        
        if(debuggerCarrousel){
            initCarousel();
            debuggerCarrousel = false;

        }else{
            Carousel_Fill_Bar.resume();

        }

        return; 

    });

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
