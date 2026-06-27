const BASE_URL = "http://127.0.0.1:8000";

export async function login() {
    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        document.getElementById("loginError").textContent = "Invalid username or password";
        return;
    }

    const user = await response.json();

    // Store who is logged in
    sessionStorage.setItem("user", JSON.stringify(user));

    // Show the app, hide login
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("sidebar").classList.remove("hidden");
    document.getElementById("mainContent").classList.remove("hidden");
}

export function logout() {
    sessionStorage.clear();
    location.reload();
}

export function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem("user"));
}