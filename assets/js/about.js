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