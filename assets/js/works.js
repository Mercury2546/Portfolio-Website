const filterItem = document.querySelector(".items");
const filterImg = document.querySelectorAll(".gallery .image");

window.onload = () => {
  filterItem.onclick = (selectedItem) => {
    if (selectedItem.target.classList.contains("item")) {
      filterItem.querySelector(".active").classList.remove("active");
      selectedItem.target.classList.add("active");
      let filterName = selectedItem.target.getAttribute("data-name");
      filterImg.forEach((image) => {
        let filterImges = image.getAttribute("data-name");
        if ((filterImges == filterName) || (filterName == "all")) {
          image.classList.remove("hide");
          image.classList.add("show");
        } else {
          image.classList.add("hide");
          image.classList.remove("show");
        }
      });
    }
  }
  for (let i = 0; i < filterImg.length; i++) {
    filterImg[i].setAttribute("onclick", "preview(this)");
  }
}

const previewBox = document.querySelector(".preview-box"),
  categoryName = previewBox.querySelector(".title p"),
  previewImg = previewBox.querySelector("img"),
  closeIcon = previewBox.querySelector(".icon"),
  shadow = document.querySelector(".shadow");

function preview(element) {
  document.querySelector("body").style.overflow = "hidden";
  let selectedPrevImg = element.querySelector("img").src
  let selectedImgCategory = element.getAttribute("data-name");
  previewImg.src = selectedPrevImg;
  categoryName.textContent = selectedImgCategory;
  previewBox.classList.add("show");
  shadow.classList.add("show");
  closeIcon.onclick = () => {
    previewBox.classList.remove("show");
    shadow.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
  }
}

// NAVBAR
document.addEventListener('DOMContentLoaded', function () {
  const menuIcon = document.getElementById('menu');
  const navbar = document.querySelector('.navbar');
  const scrollButton = document.querySelector('.scroll-top');

  menuIcon.addEventListener('click', function () {
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('nav-toggle');
  });

  window.addEventListener('scroll', function () {
    menuIcon.classList.remove('fa-times');
    navbar.classList.remove('nav-toggle');

    if (window.scrollY > 0) {
      scrollButton.style.display = 'block';
    } else {
      scrollButton.style.display = 'none';
    }

    document.querySelectorAll('section').forEach(function (section) {
      const height = section.clientHeight;
      const offset = section.offsetTop - 200;
      const id = section.getAttribute('id');
      const top = window.scrollY;

      if (top > offset && top < offset + height) {
        document.querySelectorAll('.navbar ul li a').forEach(function (link) {
          link.classList.remove('active');
        });
        navbar.querySelector(`[href="#${id}"]`).classList.add('active');
      }
    });
  });

  document.querySelectorAll('a[href*="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });
});