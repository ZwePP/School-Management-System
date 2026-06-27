import { BASE_URL } from "./config.js";

// ── Read ──────────────────────────────────────────────────────────────────────

export async function showStudents() {
    const response = await fetch(`${BASE_URL}/students/`);
    const students = await response.json();

    const list = document.getElementById("studentList");
    list.innerHTML = "";

    students.forEach(student => {
        list.innerHTML += buildStudentRow(student);
    });
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function buildStudentRow(student) {
    return `
        <li class="result-item">
            <span>
                #${student.student_id} — ${student.student_name}
                (${student.gender}) | ${student.phone} | ${student.date_of_birth} | Class ${student.class_id}
            </span>
            <span>
                <button onclick="showModal(${student.student_id})">Edit</button>
                <button onclick="deleteStudent(${student.student_id})">Delete</button>
            </span>
        </li>
    `;
}


export async function getStudentID() {
    const id = document.getElementById("studentIDSearch").value.trim();

    if (!id) {
        showStudents();
        return;
    }

    const response = await fetch(`${BASE_URL}/students/${id}`);

    if (!response.ok) {
        alert("Student not found");
        return;
    }

    const student = await response.json();
    const list = document.getElementById("studentList");
    list.innerHTML = buildStudentRow(student);
}

export function resetStudentSearch() {
    document.getElementById("studentIDSearch").value = "";
    showStudents();
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function deleteStudent(id) {
    if (!confirm(`Delete student #${id}?`)) return;

    const response = await fetch(`${BASE_URL}/students/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        alert("Failed to delete student");
        return;
    }

    showStudents();
}

// ── Edit modal ────────────────────────────────────────────────────────────────

export async function showModal(id) {
    const response = await fetch(`${BASE_URL}/students/${id}`);

    if (!response.ok) {
        alert("Could not load student data");
        return;
    }

    const student = await response.json();

    document.getElementById("editStudentId").value = id;
    document.getElementById("editName").value     = student.student_name;
    document.getElementById("editGender").value   = student.gender;
    document.getElementById("editPhone").value    = student.phone;
    document.getElementById("editDOB").value      = student.date_of_birth;
    document.getElementById("editClassId").value  = student.class_id;

    document.getElementById("editModal").classList.remove("hidden");
}

export function closeModal() {
    document.getElementById("editModal").classList.add("hidden");
}

export async function saveStudent() {
    const id = document.getElementById("editStudentId").value;

    const payload = {
        name:          document.getElementById("editName").value.trim(),
        gender:        document.getElementById("editGender").value.trim(),
        phone:         document.getElementById("editPhone").value.trim(),
        date_of_birth: document.getElementById("editDOB").value,
        class_id:      parseInt(document.getElementById("editClassId").value, 10),
    };

    const response = await fetch(`${BASE_URL}/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        alert("Failed to save student");
        return;
    }

    closeModal();
    showStudents();
}

// Add modal
export async function showAddForm(){
    document.getElementById("addModal").classList.remove("hidden");
}
export async function closeAddForm(){
    document.getElementById("addModal").classList.add("hidden");
}
export async function addStudent(){
    const payload = {
        name: document.getElementById("addStudentName").value.trim(),
        date_of_birth: document.getElementById("addStudentDOB").value,
        gender: document.getElementById("addStudentGender").value.trim(),
        phone: document.getElementById("addStudentPhone").value.trim(),
        class_id: parseInt(document.getElementById("addStudentClass").value)
    };

    const response = await fetch(`${BASE_URL}/students/`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),

    })
    if (!response.ok) {
        alert("Failed to save student");
        return;
    }
    closeAddForm()
}