const form = document.getElementById("login");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("inputNombre").value;
  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPass").value;
  const rol = document.getElementById("select").value;

  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, password, rol }),
    });
    const data = await response.json();

    if (response.ok) {
      alert(data.msg);
      window.location.href = window.location.origin + "/html/login.html";
    } else {
      alert(`Error: ${data.msg}`);
    }
  } catch (error) {
    console.error("Error al hacer la peticion", error);
  }
});
