
const form = document.getElementById("login");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPass").value;

  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    const result = document.getElementById("resultado");
    result.textContent = JSON.stringify(data);

    if (data.msg) {
      alert(data.msg);
    } else {
      alert("Login exitoso");
    }

  } catch (error) {
    console.log("error al loguear", error);
  }
});
