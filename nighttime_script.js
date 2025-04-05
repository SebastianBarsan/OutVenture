function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('preview');

  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      preview.src = reader.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

async function submitImage() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image first.");
    return;
  }

  const fileReader = new FileReader();

  fileReader.onloadend = async function () {
    const base64 = fileReader.result;

    // Get token
    const tokenRes = await fetch('https://www.nyckel.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=lm9r14a46ffzl5tdkkba8x6d1ktzn1u6&client_secret=2m50ba9hfknzxsz88goswsenfvqhbag5k9xyzt19auvo97f8kkr6c19a8ilfjs64'
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    try {
      // Call constellations function
      const response = await fetch('https://www.nyckel.com/v1/functions/constellations/invoke', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: base64 })
      });

      const data = await response.json();

      // Generate points (10–30)
      const points = Math.floor(Math.random() * (30 - 10 + 1)) + 10;

      document.getElementById('prediction').textContent = `Predicted: ${data.labelName}`;
      document.getElementById('confidence').textContent = `Confidence: ${Math.round(data.confidence * 100)}%`;
      document.getElementById('points').textContent = `You earned ${points} points! ✨`;
      document.getElementById('result').style.display = 'block';

    } catch (error) {
      console.error('Error uploading image:', error);
      document.getElementById('prediction').textContent = 'Error occurred while processing the image.';
      document.getElementById('result').style.display = 'block';
    }
  };

  fileReader.readAsDataURL(file);
}


  let isOn = true; // Initial toggle state

  document.getElementById('toggleBtn').addEventListener('click', () => {
    if (isOn) {
      // Redirect to Page A
      window.location.href = 'daytime.html'; 
    } else {
      // Redirect to Page B
      window.location.href = 'nighttime.html'; 
    }
    isOn = !isOn;
  });function previewImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('preview');
  
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        preview.src = reader.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  }
  
  async function submitImage() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (!file) {
      alert("Please select an image first.");
      return;
    }
  
    const fileReader = new FileReader();
  
    fileReader.onloadend = async function () {
      const base64 = fileReader.result;
  
      // Get token
      const tokenRes = await fetch('https://www.nyckel.com/connect/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&client_id=lm9r14a46ffzl5tdkkba8x6d1ktzn1u6&client_secret=2m50ba9hfknzxsz88goswsenfvqhbag5k9xyzt19auvo97f8kkr6c19a8ilfjs64'
      });
  
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;
  
      try {
        // Call constellations function
        const response = await fetch('https://www.nyckel.com/v1/functions/constellations/invoke', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: base64 })
        });
  
        const data = await response.json();
  
        // Generate points (10–30)
        const points = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
  
        document.getElementById('prediction').textContent = `Predicted: ${data.labelName}`;
        document.getElementById('confidence').textContent = `Confidence: ${Math.round(data.confidence * 100)}%`;
        document.getElementById('points').textContent = `You earned ${points} points! ✨`;
        document.getElementById('result').style.display = 'block';
  
      } catch (error) {
        console.error('Error uploading image:', error);
        document.getElementById('prediction').textContent = 'Error occurred while processing the image.';
        document.getElementById('result').style.display = 'block';
      }
    };
  
    fileReader.readAsDataURL(file);
  }
  
  
    let isOn = true; // Initial toggle state
  
    document.getElementById('toggleBtn').addEventListener('click', () => {
      if (isOn) {
        // Redirect to Page A
        window.location.href = 'daytime.html'; 
      } else {
        // Redirect to Page B
        window.location.href = 'nighttime.html'; 
      }
      isOn = !isOn;
    });