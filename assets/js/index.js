// NAVBAR SECTION
function navbarClick(name) {
    let navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    let selectedLink = document.querySelector('header nav a[href*="' + name + '"]');
    if (selectedLink) {
        selectedLink.classList.add('active');
    }
}

// GALLERY SECTION
let slider = document.querySelector('.slider .list'); /* querySelector => first element  */
let items = document.querySelectorAll('.slider .list .item'); /* querySelectorAll => all element  */
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1; /* เก็บจำนวนรูปภาพ - 1 เพื่อให้ง่ายต่อลำดับของ Nodelist */
let active = 0;
next.onclick = function () {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    /* เป็นการเช็คค่า active โดยการนำ active + 1 ถ้าน้อยกว่าหรือเท่ากับค่า lengthItems หรือไม่ 
        ถ้าน้อยกว่าหรือเท่ากับ จะมีการกำหนด active = active + 1 หรือเพิ่มค่าไป 1
        ถ้ามากกว่า จะมีการกำหนดค่า active = 0
    */
    reloadSlider();
}
prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(() => { next.click() }, 3000); /* สร้างการสไลด์อัตโนมัติทุก 3 วินาทีโดยไม่ต้องคลิกปุ่ม "Next" || setInterval() คือฟังก์ชันเพื่อตั้งเวลาสำหรับการทำงาน */
function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';
    // items[active] จะอ้างอิงไปยัง element ที่ถูกเลือกในปัจจุบันในอาร์เรย์ items
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval); /* ใช้เพื่อหยุดการทำงานของ refreshInterval, ซึ่งเป็นการเรียกฟังก์ชันอย่างต่อเนื่องทุก 3 วินาที */
    refreshInterval = setInterval(() => { next.click() }, 3000); /* สไลด์ใหม่ */


}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    })
})
window.onresize = function (event) {
    reloadSlider();
};

// VIDEO SECTION
function videoSlider(link) {
    document.querySelector('.video .container .slider').src = link;
}

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