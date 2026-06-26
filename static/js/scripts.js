
import { getTitle } from './common.js';
import "./students.js";
import "./teachers.js";

getTitle();

function showPage(pageId){
    const pages =
        document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.add("hidden");
    });
    document
        .getElementById(pageId)
        .classList.remove("hidden");
}

window.showPage = showPage;






// ---------- STUDENT ----------------









