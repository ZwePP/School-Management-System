import { BASE_URL } from "./config.js";

// ── Read ──────────────────────────────────────────────────────────────────────

export async function showTeachers() {
    const response = await fetch(`${BASE_URL}/teachers/`);
    const teachers = await response.json();

    const list = document.getElementById("teacherList");
    list.innerHTML = "";

    teachers.forEach(teacher => {
        list.innerHTML += `
            <li class="result-item">
                <span>#${teacher.teacher_id} — ${teacher.teacher_name}</span>
                <button onclick="deleteTeacher(${teacher.teacher_id})">Delete</button>
            </li>
        `;
    });
}

// ── Create ────────────────────────────────────────────────────────────────────

export async function addTeacher() {
    const name = document.getElementById("teacherName").value.trim();

    if (!name) {
        alert("Enter a teacher name");
        return;
    }

    const response = await fetch(`${BASE_URL}/teachers/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: 0, name }),
    });

    if (!response.ok) {
        alert("Failed to add teacher");
        return;
    }

    document.getElementById("teacherName").value = "";
    showTeachers();
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function deleteTeacher(id) {
    if (!confirm(`Delete teacher #${id}?`)) return;

    const response = await fetch(`${BASE_URL}/teachers/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        alert("Failed to delete teacher");
        return;
    }

    showTeachers();
}
