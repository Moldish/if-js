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

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData();

  fetch('https://if-student-api.onrender.com/api/file', {
    method: 'POST',
    dody: formData,
  })
    .then((response) => response.json)
    .then((data) => console.log(data));
});

imagePreview.addEventListener('click', () => {
  fileInput.click();
});
