const file_input = document.querySelector('.file-input');
const submit = document.querySelector('.submit');
const preview_image = document.querySelector('.preview-image');
const preview_audio = document.querySelector('.preview_audio');

let selectedFile = null;

file_input.addEventListener("change", () => {
    if (file_input.files.length > 0) {
        selectedFile = file_input.files[0];
        const extension = selectedFile.name.split('.').pop().toLowerCase();

        if (extension === 'jpg' || extension === 'png' || extension === 'jpeg') {
            preview_image.src = URL.createObjectURL(selectedFile);
            preview_image.style.display = 'block';
            preview_audio.style.display = 'none';
        }

        else if (extension === 'mp3' || extension === 'wav') {
            preview_audio.src = URL.createObjectURL(selectedFile);
            preview_audio.style.display = 'block';
            preview_image.style.display = 'none';
        }
    }
});

submit.onclick = async function() {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('audio', selectedFile);
    formData.append('gain', 5);

    const response = await fetch('http://127.0.0.1:5000/suggest', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    console.log(data);
};
