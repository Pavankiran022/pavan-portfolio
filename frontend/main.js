const fades = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {
  fades.forEach((element) => {
    const top = element.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {
      element.classList.add("active");
    }
  });
});

window.dispatchEvent(new Event("scroll"));

const text = ["Node.js Developer", "Backend Engineer", "API Developer"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
  if (count === text.length) {
    count = 0;
  }

  currentText = text[count];
  letter = currentText.slice(0, ++index);

  const heroTitle = document.querySelector(".hero-content h1");

  if (heroTitle) {
    heroTitle.innerHTML = `Hi, I'm <span>Pavan</span><br>${letter}`;
  }

  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1200);
  } else {
    setTimeout(type, 120);
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.querySelector('input[type="text"]').value;
      const email = document.querySelector('input[type="email"]').value;
      const message = document.querySelector("textarea").value;

      try {
        const response = await fetch(
          "https://pavan-portfolio-ui2v.onrender.com/send-message",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              message: message,
            }),
          },
        );

        const data = await response.json();

        if (data.success) {
          alert("Message sent successfully 🚀");
          this.reset();
        } else {
          alert("Failed to send message");
        }
      } catch (error) {
        alert("Server error. Please try again.");
        console.log(error);
      }
    });
  }
});
