function clickMenu() {
  var x = document.getElementById("topNav");
  if (x.className === "nav") {
    x.className += " responsive";
  } else {
    x.className = "nav";
  }
}

function removeResponsive() {
  var x = document.getElementById("topNav");
  if (x.className === "nav responsive") {
    x.className = "nav";
  }
}
