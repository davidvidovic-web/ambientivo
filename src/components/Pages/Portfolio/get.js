let panels = gsap.utils.toArray(".card__content");

panels.forEach((item, i) => {
  // Get the to be staggered elements
  const contentElements = item.querySelectorAll(".card__inner > *");

  // Set initial state on the to be staggered elements
  gsap.set(contentElements, {
    y: 0,
    opacity: 0,
  });

  ScrollTrigger.create({
    trigger: item,
    markers: true,

    pin: true,
    start: "top 50%",
    end: "bottom 50%",

    onEnter: ({ progress, direction, isActive }) => {
      console.log("onEnter", progress, direction, isActive);
      gsap.fromTo(
        contentElements,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05 }
      );
    },
    onLeave: ({ progress, direction, isActive }) => {
      console.log("onLeave", progress, direction, isActive);
      if (i !== panels.length - 1) {
        gsap.fromTo(
          contentElements,
          { y: 0, opacity: 1 },
          { y: -80, opacity: 0, stagger: 0.05 }
        );
      }
    },
    onLeaveBack: ({ progress, direction, isActive }) => {
      console.log("onLeaveBack", progress, direction, isActive);
      if (i !== 0) {
        gsap.fromTo(
          contentElements,
          { y: 0, opacity: 1 },
          { y: -80, opacity: 0, stagger: 0.05 }
        );
      }
    },
    onEnterBack: ({ progress, direction, isActive }) => {
      console.log("onEnterBack", progress, direction, isActive);
      gsap.fromTo(
        contentElements,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05 }
      );
    },
  });
});
