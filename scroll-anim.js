document.addEventListener('DOMContentLoaded', () => {
    const options = {
        root: document.querySelector("#bloc-choose-your-size"),
        rootMargin: "0px",
        threshold: 1.0,
    };

    const callbackChooseYourSizeScroll = (entries, observer) => {
        entries.forEach((entry) => {
            console.log(entry);
          // Each entry describes an intersection change for one observed
          // target element:
          //   entry.boundingClientRect
          //   entry.intersectionRatio
          //   entry.intersectionRect
          //   entry.isIntersecting
          //   entry.rootBounds
          //   entry.target
          //   entry.time
        });
    };
    
    const observer = new IntersectionObserver(callbackChooseYourSizeScroll, options);

})