const swiper = new Swiper(".card-wrapper", {
  loop: true,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

const form = document.querySelector("form");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
  const bodyMessage = `First Name: ${firstName.value}<br> Last Name: ${lastName.value}<br> Email: ${email.value} <br> Subject: ${subject.value} <br> Message: ${message.value} <br>`;

  emailjs
    .send("service_nivjpif", "template_jndpheg", {
      name: firstName.value + " " + lastName.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    })
    .then((response) => {
      if(response.status === 200){
        Swal.fire({title: "Success", 
                   text: "Email sent successfully!", 
                   icon: "success",
                  });
      } else{
        Swal.fire({title: "Error", 
                   text: `Email failed with status: ${response.status}`, 
                   icon: "error",
                  });
      }
  })
  .catch((error) => {
    Swal.fire({title: "Error", 
               text: `Something went wrong: ${error.text || error}`, 
               icon: "error",
              });
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");
  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (email.value != "") {
      checkEmail();
    }

    email.addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex =
    /^([a-z\d\.-]+)@([a-z\d\-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTextEmail = document.querySelector(".error-txt.email");
  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTextEmail.innerText = "Enter a valid email address";
    } else {
      errorTextEmail.innerText = "Email Address can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !firstName.classList.contains("error") &&
    !lastName.classList.contains("error") &&
    !subject.classList.contains("error") &&
    !email.classList.contains("error") &&
    !message.classList.contains("error")
  ) {
    console.log("Email sent successfully!");
    sendEmail();
    form.reset();
    return false;
  }
});
