const file_input = document.querySelector('.file-input');
const submit = document.querySelector('.submit');
const preview_image = document.querySelector('.preview-image');
const preview_audio = document.querySelector('.preview-audio'); // Changed to match HTML
const result_container = document.querySelector('.result-container');

let selectedFile = null;

// File selection handler
file_input.addEventListener("change", () => {
    if (file_input.files.length > 0) {
        selectedFile = file_input.files[0];
        const extension = selectedFile.name.split('.').pop().toLowerCase();

        // Image preview
        if (['jpg', 'png', 'jpeg', 'gif', 'bmp', 'webp'].includes(extension)) {
            preview_image.src = URL.createObjectURL(selectedFile);
            preview_image.style.display = 'block';
            preview_audio.style.display = 'none';
        }
        // Audio preview
        else if (['mp3', 'wav', 'flac', 'ogg', 'm4a'].includes(extension)) {
            preview_audio.src = URL.createObjectURL(selectedFile);
            preview_audio.style.display = 'block';
            preview_image.style.display = 'none';
        }
        
        // Clear previous results
        result_container.innerHTML = '';
        result_container.classList.remove('active');
    }
});

// Submit handler
submit.onclick = async function() {
    if (!selectedFile) {
        alert('Please select a file first!');
        return;
    }

    // Show loading state
    const originalText = submit.textContent;
    submit.disabled = true;
    submit.textContent = 'Processing...';
    submit.style.opacity = '0.6';
    submit.style.cursor = 'not-allowed';

    try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('top_k', 5);

        const response = await fetch('http://127.0.0.1:5000/recommend', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Success:', data);
            displayResults(data);
        } else {
            console.error('Error:', data);
            showError(data.error || 'An error occurred. Please try again.');
        }

    } catch (error) {
        console.error('Network error:', error);
        showError('Failed to connect to server. Make sure Flask is running on port 5000.');
    } finally {
        // Reset button
        submit.disabled = false;
        submit.textContent = originalText;
        submit.style.opacity = '1';
        submit.style.cursor = 'pointer';
    }
};

// Display results
function displayResults(data) {
    let resultsHTML = `
        <h2 style="color: #667eea; margin-bottom: 20px;">
            ✨ Top ${data.top_k} Recommendations
        </h2>
    `;

    if (data.recommendation_type === 'paintings') {
        // Audio → Paintings
        resultsHTML += '<div class="recommendations">';
        data.results.forEach((rec, index) => {
            resultsHTML += `
                <div class="result-item">
                    <h3>${index + 1}. ${rec.title}</h3>
                    <p><strong>Artist:</strong> ${rec.artist}</p>
                    <p><strong>Emotion:</strong> ${rec.emotion}</p>
                    <p><strong>Similarity:</strong> ${(rec.similarity * 100).toFixed(1)}%</p>
                </div>
            `;
        });
        resultsHTML += '</div>';
    } else {
        // Image → Music
        resultsHTML += '<div class="recommendations">';
        data.results.forEach((rec, index) => {
            resultsHTML += `
                <div class="result-item">
                    <h3>${index + 1}. ${rec.filename}</h3>
                    <p><strong>Emotion:</strong> ${rec.emotion}</p>
                    <p><strong>Similarity:</strong> ${(rec.similarity * 100).toFixed(1)}%</p>
                </div>
            `;
        });
        resultsHTML += '</div>';
    }

    result_container.innerHTML = resultsHTML;
    result_container.classList.add('active');
    
    // Smooth scroll to results
    result_container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Show error message
function showError(message) {
    result_container.innerHTML = `
        <div style="background: #ff4757; color: white; padding: 20px; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0;">❌ Error</h3>
            <p style="margin: 0;">${message}</p>
        </div>
    `;
    result_container.classList.add('active');
}