function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
      const output = document.getElementById('preview');
      output.src = reader.result;
      output.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  
  async function submitImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (!file) {
      alert("Please select an image first.");
      return;
    }
  
    const form = new FormData();
    form.append('data', file);
  
    const fileReader = new FileReader();
    fileReader.onloadend = async function () {
      const base64 = fileReader.result;
  
      const token = await fetch('https://www.nyckel.com/connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=lm9r14a46ffzl5tdkkba8x6d1ktzn1u6&client_secret=2m50ba9hfknzxsz88goswsenfvqhbag5k9xyzt19auvo97f8kkr6c19a8ilfjs64'
      }).then(response => response.json());
  
      try {
        const response = await fetch('https://www.nyckel.com/v1/functions/bird-identifier/invoke', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token.access_token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: base64 })
        });
  
        const data = await response.json();
  
        document.getElementById('prediction').textContent = `Predicted: ${data.labelName}`;
        document.getElementById('confidence').textContent = `Confidence: ${Math.round(data.confidence * 100)}%`;
        document.getElementById('result').style.display = 'block';
      } catch (error) {
        console.error('Error uploading image:', error);
        document.getElementById('prediction').textContent = 'Error occurred while processing the image.';
        document.getElementById('result').style.display = 'block';
      }
    };
  
    fileReader.readAsDataURL(file);
  }
  
  let isOn = true;
  
  document.getElementById('toggleBtn').addEventListener('click', () => {
    window.location.href = isOn ? 'nighttime.html' : 'daytime.html';
    isOn = !isOn;
  });