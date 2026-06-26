import { BASE_URL } from "./config.js";

export async function getTitle(){
    const response = await fetch(`${BASE_URL}`);
    const title = await response.json();
    const pageTitle = document.getElementById("pageTitle")
    pageTitle.innerHTML = `${title.title}`;
        
    
}