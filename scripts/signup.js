// password show and hide
const showPWDIcons = document.querySelectorAll(".eye-icon");

showPWDIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const currPWD = icon.parentElement.parentElement.querySelectorAll(".pwd");

    currPWD.forEach((pwd) => {
      if (pwd.type === "password") {
        pwd.type = "text";
        icon.classList.replace("bx-hide", "bx-show");
      } else {
        pwd.type = "password";
        icon.classList.replace("bx-show", "bx-hide");
      }
    });
  });
});

// form validation

const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector);

  const validateOptions = [
    {
      attribute: "required",
      isValid: (input) => input.value.trim() === "",
      errorMessage: "This field is required",
    },
    {
      attribute: "text-only",
      isValid: (input) => !/^[A-Za-z\s]{2,}$/.test(input.value),
      errorMessage: "Only letters and spaces allowed (min 2 characters)",
    },
    {
      attribute: "pattern",
      isValid: (input) => {
        const regex = new RegExp(input.pattern);
        return !regex.test(input.value);
      },
      errorMessage: "Doesn't match required pattern",
    },
    {
      attribute: "match",
      isValid: (input) => {
        const matchSelector = input.getAttribute("match");
        const matchedElement = formElement.querySelector(
          `[name="${matchSelector}"]`
        );
        return (
          matchedElement && matchedElement.value.trim() !== input.value.trim()
        );
      },
      errorMessage: "Passwords do not match",
    },
    {
      attribute: "date-validation",
      isValid: (input) => {
        const enteredDate = new Date(input.value);
        const today = new Date();

        if (isNaN(enteredDate.getTime()) || enteredDate > today) return true;

        const ageLimit = 3;
        const ageDate = new Date(
          today.getFullYear() - ageLimit,
          today.getMonth(),
          today.getDate()
        );

        return enteredDate > ageDate;
      },
      errorMessage:
        "Enter a valid date (must be 13+ years old and not in the future)",
    },
    {
      attribute: "radio-group",
      isValid: (input) => {
        const name = input.name;
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        return !checked;
      },
      errorMessage: "Please select an option",
    },
  ];
  const validateRadioGroup = (name) => {
    const group = document.querySelectorAll(`input[name="${name}"]`);
    const selected = [...group].some((input) => input.checked);

    if (!selected) {
      const container = group[0].closest(".check-box-col");
      container.style.borderBottom = "1px solid red";
      return false;
    } else {
      const container = group[0].closest(".check-box-col");
      container.style.border = "none";
      return true;
    }
  };
  const toggleRequirementClass = (element, isValid) => {
    element.classList.toggle("pwd-rqm-li-show-valid", isValid);
    element.classList.toggle("pwd-rqm-li-show", !isValid);
  };

  const validatePasswordRequirements = (password) => {
    const requirements = document.querySelectorAll(".pwd-rqm-li");

    const hasMinLength = password.length >= 8;
    const hasSpecialChar = /[@$&!.]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMixedCase = /[A-Z]/.test(password) && /[a-z]/.test(password);

    const allValid =
      hasMinLength && hasSpecialChar && hasNumber && hasMixedCase;

    // Always show the requirement list unless ALL conditions are met
    requirements.forEach((li) => {
      li.style.display = allValid ? "none" : "block";
    });

    toggleRequirementClass(requirements[0], hasMinLength);
    toggleRequirementClass(requirements[1], hasSpecialChar);
    toggleRequirementClass(requirements[2], hasNumber);
    toggleRequirementClass(requirements[3], hasMixedCase);
  };

  const validateSingleFormInput = (
    formInput,
    isConfirmPasswordFocused = false
  ) => {
    const input = formInput.querySelector("input");
    const error = formInput.querySelector(".error-icon");
    const success = formInput.querySelector(".check-icon");
    const errorMessage = formInput.querySelector(".error-message");

    let formInputError = false;
    let currentErrorMessage = "";

    for (const option of validateOptions) {
      if (input.hasAttribute(option.attribute)) {
        // Special handling for password match validation
        if (option.attribute === "match") {
          // Only validate match if confirm password field is focused or both fields have values
          if (
            input.value &&
            document.querySelector(`[name="${input.getAttribute("match")}"]`)
              ?.value
          ) {
            if (option.isValid(input)) {
              formInputError = true;
              currentErrorMessage = option.errorMessage;
              break;
            }
          }
        }
        // Normal validation for other cases
        else if (option.isValid(input)) {
          formInputError = true;
          currentErrorMessage = option.errorMessage;
          break;
        }
      }
    }

    if (formInputError) {
      if (error) error.classList.add("error-icon-show");
      if (success) success.classList.remove("check-icon-show");
      input.style.borderBottom = "1px solid red";

      if (errorMessage) {
        errorMessage.textContent = currentErrorMessage;

        if (input.hasAttribute("match")) {
          const matchSelector = input.getAttribute("match");
          const matchedInput = formElement.querySelector(matchSelector);

          const bothFilled =
            matchedInput?.value.trim() !== "" && input.value.trim() !== "";

          if (bothFilled) {
            errorMessage.classList.add("error-message-show");
          } else {
            errorMessage.classList.remove("error-message-show");
          }
        } else {
          errorMessage.classList.add("error-message-show");
        }
      }
      if (input.name === "password") {
        validatePasswordRequirements(input.value);
      }
    } else {
      if (error) error.classList.remove("error-icon-show");
      if (success) success.classList.add("check-icon-show");
      input.style.borderBottom = "1px solid #0659e7";

      if (errorMessage) {
        errorMessage.style.display = "none";
      }

      if (input.name === "password") {
        validatePasswordRequirements(input.value);
      }
    }

    return !formInputError;
  };

  const setupInputEvents = () => {
    const formInputs = Array.from(formElement.querySelectorAll(".input-box"));

    formInputs.forEach((formInput) => {
      const input = formInput.querySelector("input");

      input.addEventListener("input", () => {
        // Check if this is the confirm password field
        const isConfirmPassword = input.hasAttribute("match");
        validateSingleFormInput(
          formInput,
          isConfirmPassword && document.activeElement === input
        );

        // If this is the password field, also validate the confirm password field
        if (input.name === "password") {
          const confirmPasswordInput = formElement.querySelector("[match]");
          if (confirmPasswordInput) {
            const confirmFormInput = confirmPasswordInput.closest(".input-box");
            validateSingleFormInput(confirmFormInput);
          }
        }
      });

      input.addEventListener("focus", () => {
        if (input.name === "password") {
          const requirements = document.querySelectorAll(".pwd-rqm-li");
          if (input.value.length !== 8) {
            requirements.forEach((li) => (li.style.display = "block"));
          }
        }
        validateSingleFormInput(formInput, input.hasAttribute("match"));
      });

      input.addEventListener("blur", () => {
        validateSingleFormInput(formInput, false);
      });
    });
  };

  formElement.setAttribute("novalidate", "");
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    const formInputs = Array.from(formElement.querySelectorAll(".input-box"));
    const isValid = formInputs.every((formInput) =>
      validateSingleFormInput(formInput)
    );
    const isUserTypeValid = validateRadioGroup("userType");
    const isGenderValid = validateRadioGroup("gender");

    if (isValid && isUserTypeValid && isGenderValid) {
      // console.log("Form is valid, submitting...");
      formElement.submit();
    } else {
      console.log("Form has errors.");
    }
  });

  setupInputEvents();
};

validateForm(".form");
