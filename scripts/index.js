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
