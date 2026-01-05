const upload = document.querySelector('.upload');
const github = document.querySelector('.github');
const report = document.querySelector('.report');
const demo = document.querySelector('.demo');

upload.onclick = function() {
    section[1].scrollIntoView({behavior: 'smooth'});
}

github.onclick = function() {
    window.open('https://github.com/DarttGoblin/Synesthesia_server', '_blank');
}

report.onclick = function() {
    window.open('https://drive.google.com/file/d/1VYHbbJppJZpfYNXbxCFizb_qtsHfdLvh/view?usp=sharing', '_blank');
}

demo.onclick = function() {
    window.open('https://drive.google.com/file/d/1k0vfswVvqJll3GTuzD5fc0LGrnXjmLoj/view?usp=sharing', '_blank');
}