🎨 Front-End Interface – Media Preview & Upload

🚨 HOW TO RUN INFERENCE 🚨

1. Clone Synesthesia_server interface repository (this repository)
2. Clone EchoMind backend server repository through this link: https://github.com/DarttGoblin/Synesthesia_server
3. from Kaggle through this link: https://www.kaggle.com/models/yassinebazgour/Synesthesia
4. Install the dependencies using the following command: pip install flask flask-cors torch torchaudio soundfile transformers einops werkzeug tqdm descript-audio-codec
5. Run app.py
6. Test the chosen model on you audio

Overview

This front-end interface allows users to upload and preview image or audio files before submitting them to a backend API. It automatically detects the file type and displays the appropriate preview (image or audio). After confirming, users can submit the file along with additional data to a Flask server endpoint for processing.

🧩 Features

File Detection: Automatically checks if a user uploaded an image or audio file.

Preview Support:

Displays the selected image directly in the browser (.jpg, .png, .jpeg).

Plays the selected audio file (.mp3, .wav).

Dynamic Preview Update: The preview changes instantly when the user selects a new file.

File Upload: Sends the chosen file to the backend API (/suggest endpoint) using fetch() and FormData.

Gain Control Example: Sends an additional numeric field (gain = 5) to demonstrate parameter submission.

🧠 How It Works

The user selects a file using an <input type="file">.

The JavaScript code checks the file extension to identify whether it’s an image or audio file.

A preview is displayed using URL.createObjectURL(file).

When the user clicks Submit, the selected file and any extra data are sent to the Flask backend via a POST request.

🧱 Tech Stack

HTML5 – Structure of the interface

CSS3 – (Optional) for styling preview and layout

JavaScript (ES6) – Core logic for file detection, preview, and upload

Fetch API – For sending data to the backend

Flask API (Python) – Backend endpoint receiving and processing the file

🧪 Example Flow

User chooses photo.png → image preview appears.

User chooses music.mp3 → audio player appears.

User clicks Submit → file sent to http://127.0.0.1:5000/suggest.