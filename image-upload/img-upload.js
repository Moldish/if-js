const form = document.getElementById('fileForm');
const fileInput = document.getElementById('fileInput');
const imagePreview = document.getElementById('imagePreview');

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    imagePreview.innerHTML = `<img src="${event.target.result}" class="image-input" alt="preview">`;
  };

  reader.readAsDataURL(file);
});

form.addEventListener('change', async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  try {
    const response = await fetch('https://if-student-api.onrender.com/api/file', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
});

imagePreview.addEventListener('click', () => {
  fileInput.click();
});
