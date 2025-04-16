const observer = new IntersectionObserver((entries) => {
    /* ใช้ในการตรวจสอบว่าผู้ใช้เลื่อนจอใน element นั้นหรือไม่ */
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElemment = document.querySelectorAll('.hidden-top');
hiddenElemment.forEach((element) => {
    observer.observe(element);
})