document.addEventListener('DOMContentLoaded', () => {
    const slideLeft = document.querySelector('#slide-left');
    const slideLeftItem = document.querySelectorAll('#slide-left .slide-item');
    const slideRightItem = document.querySelectorAll('#slide-right .slide-item');
    const slideRight = document.querySelector('#slide-right');
    let isWheelEventPending = false; // Indique qu'un événement de scroll est en attente
    const debounceDelay = 1000;
    function moveToNextSlideLeft(slideLeftItem) {
        // on determine qui est le slide active
        const activeItem = Array.from(slideLeftItem).find(item => item.classList.contains('active'));
        const activeSlideNum = parseInt(activeItem.getAttribute('data-slide-value'));
        let nextSlideItemtoActive = null;
        if(activeSlideNum == 1) {
            nextSlideItemtoActive = Array.from(slideLeftItem).find(item => item.getAttribute('data-slide-value') == 2)
        }
        if(activeSlideNum == 2) {
            nextSlideItemtoActive = Array.from(slideLeftItem).find(item => item.getAttribute('data-slide-value') == 3)
        }
        if(activeSlideNum == 3) {
            nextSlideItemtoActive = Array.from(slideLeftItem).find(item => item.getAttribute('data-slide-value') == 3)
        }

        slideLeftItem.forEach(item => {
            item.classList.remove('active')
        })
        nextSlideItemtoActive.classList.add('active');
        let dataNext = parseInt(nextSlideItemtoActive.getAttribute('data-slide-value'))
        // annimation
        if(dataNext == 1) {
            slideLeft.style.marginTop =  "0px";
            slideLeft.style.transition = "margin-top 1s ease-in-out";
            slideRight.style.marginTop =  "0px";
            slideRight.style.transition = "margin-top 1s ease-in-out";
        }
        if(dataNext == 2) {
            if (window.matchMedia("(max-width: 992px)").matches) {
                slideLeft.style.marginTop =  "-75px";
                slideLeft.style.transition = "margin-top 1s ease-in-out";
                slideRight.style.marginTop =  "-75px";
                slideRight.style.transition = "margin-top 1s ease-in-out";
            }
            else {
                slideLeft.style.marginTop =  "-215px";
                slideLeft.style.transition = "margin-top 1s ease-in-out";
                slideRight.style.marginTop =  "-215px";
                slideRight.style.transition = "margin-top 1s ease-in-out";
            }   
        }
        if(dataNext == 3) {
            document.body.style.overflow = 'auto';
            document.body.removeEventListener('wheel', handleScrollInSection);
            if (window.matchMedia("(max-width: 992px)").matches) {
                slideLeft.style.marginTop =  "-150px";
                slideLeft.style.transition = "margin-top 1s ease-in-out";
                slideRight.style.marginTop =  "-150px";
                slideRight.style.transition = "margin-top 1s ease-in-out";
            }
            else {
                slideLeft.style.marginTop =  "-430px";
                slideLeft.style.transition = "margin-top 1s ease-in-out";
                slideRight.style.marginTop =  "-430px";
                slideRight.style.transition = "margin-top 1s ease-in-out";
            }
            
        }
        
    }

    function moveToPreviewSlideLeft(slideLeftItem) {
        const activeItem = Array.from(slideLeftItem).find(item => item.classList.contains('active'));
        const activeSlideNum = parseInt(activeItem.getAttribute('data-slide-value'));
        let previewSlideItemtoActive = null;
        if(activeSlideNum == 1) {
            previewSlideItemtoActive = Array.from(slideLeftItem).find(item => item.getAttribute('data-slide-value') == 1)
        }
        if(activeSlideNum == 2) {
            previewSlideItemtoActive = Array.from(slideLeftItem).find(item => item.getAttribute('data-slide-value') == 1)
        }
        if(activeSlideNum == 3) {
            previewSlideItemtoActive = Array.from(slideLeftItem).find(item => item.getAttribute('data-slide-value') == 2)
        }

        slideLeftItem.forEach(item => {
            item.classList.remove('active')
        })
        previewSlideItemtoActive.classList.add('active');
        let dataPreview = parseInt(previewSlideItemtoActive.getAttribute('data-slide-value'))
        // annimation
        if(dataPreview == 1) {
            document.body.style.overflow = 'auto';
            document.body.removeEventListener('wheel', handleScrollInSection);
            slideLeft.style.marginTop =  "0px";
            slideRight.style.marginTop =  "0px";
            slideLeft.style.transition = "margin-top 1s ease-in-out";
            slideRight.style.transition = "margin-top 1s ease-in-out";
        }
        if(dataPreview == 2) {
            if (window.matchMedia("(max-width: 992px)").matches) {
                slideLeft.style.marginTop =  "-75px";
                slideRight.style.marginTop =  "-75px";
                slideLeft.style.transition = "margin-top 1s ease-in-out";
                slideRight.style.marginTop =  "margin-top 1s ease-in-out";
            } else {
                slideLeft.style.marginTop =  "-215px";
                slideRight.style.marginTop =  "-215px";
                slideLeft.style.transition = "margin-top 1s ease-in-out";
                slideRight.style.marginTop =  "margin-top 1s ease-in-out";
            }
        }
        if(dataPreview == 3) {
            if (window.matchMedia("(max-width: 992px)").matches) {
                slideLeft.style.marginTop =  "-75px";
                slideRight.style.marginTop =  "-75px";
                slideLeft.style.transition = "margin-top 1s ease-in-out";
                slideRight.style.marginTop =  "margin-top 1s ease-in-out";
            } else {
                slideLeft.style.marginTop =  "-150px";
                slideLeft.style.transition = "margin-top 1s ease-in-out";
                slideRight.style.marginTop =  "-150px";
                slideRight.style.transition = "margin-top 1s ease-in-out";
            }
        }
    }

    function handleScrollInSection(event) {
        if (isWheelEventPending) {
            return;
        }
        isWheelEventPending = true; 
       
        if(event.deltaY > 0) {
            moveToNextSlideLeft(slideLeftItem);
            
        }else {
            moveToPreviewSlideLeft(slideLeftItem);
        }
        
        setTimeout(() => {
            isWheelEventPending = false;
        }, debounceDelay); 
    }
    
    const section = document.querySelector('.bloc-choose-your-size');
    const options = {
        rootMargin: '0px',
        threshold: .5
    };
    document.body.style.overflowX = 'hidden';
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.body.style.overflowY = 'hidden';
                document.body.addEventListener('wheel', handleScrollInSection);
            } else {
                // Réactiver le défilement de la page lorsque la section n'est plus visible
                document.body.style.overflowY = 'auto';
                document.body.removeEventListener('wheel', handleScrollInSection);
            }
        });
        
    }, options);
    
    if(section) {
        observer.observe(section);
    }
    
})
