// password show and hide
const showPWDIcons = document.querySelectorAll(".eye-icon");

showPWDIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const currPWD = icon.parentElement.querySelector(".pwd");

    if (currPWD.type === "password") {
      currPWD.type = "text";
      icon.classList.replace("bx-hide", "bx-show");
    } else {
      currPWD.type = "password";
      icon.classList.replace("bx-show", "bx-hide");
    }
  });
});

// image slideshow
const imageElement = document.getElementById("slideshow");
const imagePaths = [
  "../3D Images/01.png",
  "../3D Images/02.png",
  "../3D Images/03.png",
  "../3D Images/04.png",
  "../3D Images/05.png",
  "../3D Images/06.png",
];
let currentIndex = 0;
setInterval(() => {
  imageElement.style.opacity = 0;
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % imagePaths.length;
    imageElement.src = imagePaths[currentIndex];
    imageElement.style.opacity = 1;
  }, 1000);
}, 5000);

//email validation

const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector);

  const validateSingleFormInput = (formInput) => {
    const input = formInput.querySelector("input");
    const error = formInput.querySelector(".error-icon");
    const success = formInput.querySelector(".check-icon");

    let formInputError = false;

    // Check if required and empty
    if (input.hasAttribute("required") && input.value.trim() === "") {
      formInputError = true;
    }

    // Check email pattern
    if (!formInputError && input.hasAttribute("pattern")) {
      const regex = new RegExp(input.pattern);
      if (!regex.test(input.value)) {
        formInputError = true;
      }
    }

    // Check password length
    if (!formInputError && input.name === "password") {
      if (input.value.length < 8) {
        formInputError = true;
      }
    }

    // Apply UI styling
    if (formInputError) {
      if (error) error.classList.add("error-icon-show");
      if (success) success.classList.remove("check-icon-show");
      input.style.borderBottom = "1px solid red";
    } else {
      if (error) error.classList.remove("error-icon-show");
      if (success) success.classList.add("check-icon-show");
      input.style.borderBottom = "1px solid #0659e7";
    }

    return !formInputError;
  };

  const validateCheckbox = () => {
    const checkbox = formElement.querySelector(".remember-checkbox");
    const label = checkbox.closest("label");
    const isChecked = checkbox.checked;

    if (!isChecked) {
      checkbox.classList.add("invalid");
      label.classList.add("invalid");
    } else {
      checkbox.classList.remove("invalid");
      label.classList.remove("invalid");
    }

    return isChecked;
  };

  const setupInputEvents = () => {
    const formInputs = Array.from(formElement.querySelectorAll(".input-box"));

    formInputs.forEach((formInput) => {
      const input = formInput.querySelector("input");

      input.addEventListener("input", () => {
        validateSingleFormInput(formInput);
      });

      input.addEventListener("blur", () => {
        validateSingleFormInput(formInput);
      });
    });

    // Validate checkbox on change
    const checkbox = formElement.querySelector(".remember-checkbox");
    checkbox.addEventListener("change", validateCheckbox);
  };

  formElement.setAttribute("novalidate", "");
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const formInputs = Array.from(formElement.querySelectorAll(".input-box"));
    const isValidInputs = formInputs.every((formInput) =>
      validateSingleFormInput(formInput)
    );
    const isCheckboxValid = validateCheckbox();

    if (isValidInputs && isCheckboxValid) {
      formElement.submit();
    } else {
      console.log("Form has errors.");
    }
  });

  setupInputEvents();
};

validateForm(".form");
