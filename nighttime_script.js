
function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function () {
    const output = document.getElementById('preview');
    output.src = reader.result;
    output.style.display = 'block';
    document.getElementById('preview-template').style.display = 'none';
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
  
  console.log(file);
  console.log(form);

  const fileReader = new FileReader();
  fileReader.onloadend = async function() {
    const base64 = fileReader.result;//.split(',')[1];
    console.log("JO: " + base64);

    console.log(base64);

    const token = await fetch('https://www.nyckel.com/connect/token', {
      method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=lm9r14a46ffzl5tdkkba8x6d1ktzn1u6&client_secret=2m50ba9hfknzxsz88goswsenfvqhbag5k9xyzt19auvo97f8kkr6c19a8ilfjs64'
    })
    .then(response => response.json());
    console.log(token);
    console.log(token.access_token);

    try {
      // 1. Send the image to Nyckel API
      const response = await fetch('https://www.nyckel.com/v1/functions/constellations/invoke', {
          method: 'POST',
          headers: {
              'Authorization': 'Bearer ' + token.access_token,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "data": base64
          })
          // JSON.stringify(
          //     {"data": "https://celebrateurbanbirds.org/wp-content/uploads/2016/05/northern-cardinal-1024x916.jpg"}
          // )
      });

      console.log(response);

      const data = await response.json();

      console.log(data);

      // 2. Show prediction result
      // if (data.result) {
      
      document.getElementById('prediction').textContent = `${data.labelName}`;
      document.getElementById('confidence').textContent = `Confidence: ${Math.round(data.confidence * 100)}%`;
      document.getElementById('result').style.display = 'block'; // Show result
      // } else {
      //   document.getElementById('prediction').textContent = 'Unable to make a prediction.';
      //   document.getElementById('result').style.display = 'block'; // Show result even if prediction fails
      // }
    } catch (error) {
      console.error('Error uploading image:', error);
      document.getElementById('prediction').textContent = 'Error occurred while processing the image.';
      document.getElementById('result').style.display = 'block'; // Show error result
    }
    
    return base64;
  }
  fileReader.readAsDataURL(file);
}