const text = document.querySelector(".sec-text");
const textLoad = () => {
  setTimeout(() => {
    text.textContent = "Designer";
  }, 0);
  setTimeout(() => {
    text.textContent = "Developer";
  }, 3000);
};

textLoad();
setInterval(textLoad, 6000);
