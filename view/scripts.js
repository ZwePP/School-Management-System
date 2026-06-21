const BASE_URL = "http://127.0.0.1:8000";

// pageTitle = fetch(`${BASE_URL}`)
// .then(response => response.json())
// .then(data => console.log(data.message))

// console.log(pageTitle)

async function getTitle(){
    response = await fetch(`${BASE_URL}`);
    const title = await response.json();
    const pageTitle = document.getElementById("pageTitle")
    pageTitle.innerHTML = `${title.title}`;
        
    
}
getTitle(); //show title automatically

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

async function showTeachers() {
    const response = await fetch(`${BASE_URL}/teachers/`);
    const teachers = await response.json();

    const list = document.getElementById("teacherList");

    list.innerHTML = "";
    teachers.forEach(teacher => {

        list.innerHTML += `
            <li class="result-item">
                ${teacher.teacher_id} -
                ${teacher.teacher_name}
                <button onclick="deleteTeacher(${teacher.teacher_id})">
                     Delete
                 </button>
            </li>
        `;
    });
}

// Automatically load teachers when page opens
showTeachers();

async function addTeacher(){
    const name = document.getElementById("teacherName").value;
    if(!name){
        alert("Enter teacher name");
        return;
    }

    await fetch(
        `${BASE_URL}/teachers/`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:0,
                name:name
            })
        }
    );

    document.getElementById("teacherName").value = "";

    loadTeachers();
}

async function deleteTeacher(id){

    await fetch(
        `${BASE_URL}/teachers/${id}`,
        {
            method:"DELETE"
        }
    );

    loadTeachers();
}



// ---------- STUDENT ----------------

async function showStudents() {
    const response = await fetch(`${BASE_URL}/students/`);
    const students = await response.json();

    const list = document.getElementById("studentList");

    list.innerHTML = "";
    students.forEach(student => {

        list.innerHTML += `
            <li class="result-item">
                ${student.student_id} -
                 ${student.student_name}
                 ${student.gender}
                ${student.class_id}
                ${student.phone}
                ${student.date_of_birth}
                <button onclick="deleteStudent(${student.student_id})">
                     Delete
                 </button>
            </li>
        `;
    });
}
showStudents()

async function deleteStudent(id){
    await fetch(`${BASE_URL}/students/${id}`,
        {
            method:"DELETE"
        });
}



