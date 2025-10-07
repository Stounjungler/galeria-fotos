const API_URL = "https://tu-backend.onrender.com"; // Cambia esto por tu URL de Render

const form = document.getElementById("uploadForm");
const gallery = document.getElementById("gallery");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  const formData = new FormData();
  formData.append("file", file);

  await fetch(`${API_URL}/upload/`, {
    method: "POST",
    body: formData
  });

  fileInput.value = "";
  loadGallery();
});

async function loadGallery() {
  gallery.innerHTML = "<p>Cargando...</p>";
  const res = await fetch(`${API_URL}/list/`);
  const data = await res.json();

  gallery.innerHTML = "";
  data.files.forEach(url => {
    const img = document.createElement("img");
    img.src = `${API_URL}${url}`;
    gallery.appendChild(img);
  });
}

loadGallery();
