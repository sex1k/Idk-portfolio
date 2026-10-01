const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";

});


/* PROJECT 3D EFFECT */

const projects = document.querySelectorAll(".video-box");

projects.forEach(project => {

    project.addEventListener("mousemove", (event) => {

        const rect = project.getBoundingClientRect();

        const x =
            (event.clientX - rect.left) /
            rect.width - .5;

        const y =
            (event.clientY - rect.top) /
            rect.height - .5;

        project.style.transform = `
            perspective(1000px)
            rotateY(${x * 5}deg)
            rotateX(${-y * 5}deg)
            scale(1.01)
        `;

    });


    project.addEventListener("mouseleave", () => {

        project.style.transform = "";

    });

});


/* TEXT REVEAL */

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.animate(

                    [
                        {
                            opacity: 0,
                            transform: "translateY(50px)"
                        },

                        {
                            opacity: 1,
                            transform: "translateY(0)"
                        }
                    ],

                    {
                        duration: 900,
                        easing: "cubic-bezier(.2,.8,.2,1)",
                        fill: "forwards"
                    }

                );

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: .15
    }

);


document
    .querySelectorAll(
        ".project, .about-grid, .skill-list > div"
    )
    .forEach(element => {

        observer.observe(element);

    });
