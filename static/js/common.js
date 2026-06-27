import { BASE_URL } from "./config.js";

export async function getTitle() {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();
    document.getElementById("pageTitle").textContent = data.title;
}

export function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });
    document.getElementById(pageId).classList.remove("hidden");
}
