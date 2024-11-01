document.addEventListener('DOMContentLoaded', () => {
    const mainSection = document.querySelector('.main-section');
    const scrollBlock = document.querySelector('.scroll-block');
  
    // Créer un observer pour surveiller si la section principale est complètement visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
            console.log(entry)
          if (entry.isIntersecting) {
            console.log('visible')
            // La section est complètement visible
            document.body.style.overflow = 'hidden'; // Bloquer le défilement de la page
            scrollBlock.style.overflowY = 'auto'; // Activer le défilement interne
          } else {
            // La section n'est pas complètement visible
            console.log('not visible')
            document.body.style.overflow = 'auto'; // Réactiver le défilement de la page
            scrollBlock.style.overflowY = 'hidden'; // Désactiver le défilement interne
          }
        });
      },
      {
        threshold: 1.0 // Déclencher seulement lorsque 100% de la section est visible
      }
    );
  
    // Observer la section principale
    observer.observe(mainSection);
  
    // Gérer le défilement du sous-bloc pour réactiver le défilement de la page
    scrollBlock.addEventListener('scroll', () => {
        console.log('scroll')
        if (scrollBlock.scrollTop === 0 || scrollBlock.scrollTop + scrollBlock.clientHeight >= scrollBlock.scrollHeight) {
            document.body.style.overflow = 'auto'; // Réactiver le défilement de la page
            scrollBlock.style.overflowY = 'hidden'; // Désactiver le défilement interne
        }
    });
});
  
const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
