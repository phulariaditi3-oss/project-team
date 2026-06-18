// Dark Mode

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

// Counter Animation

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = target / 100;

        if(count < target){
            counter.innerText =
            Math.ceil(count + increment);

            setTimeout(updateCounter,20);
        }
        else{
            counter.innerText = target;
        }
    };

    updateCounter();
});

// Contact Form

document.querySelector("form")
.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Message Sent Successfully!");
});