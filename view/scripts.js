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
                ${student.phone}
                ${student.date_of_birth}
                ${student.class_id}
                <button onclick="showModal(${student.student_id})">
                    Edit
                </button>
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

async function getStudentID() {
    const id =
        document.getElementById(
            "studentIDSearch"
        ).value;

    if (!id) {
        showStudents();
        return;
    }

    const response = await fetch(
        `${BASE_URL}/students/${id}`
    );

    if (!response.ok) {
        alert("Student not found");
        return;
    }

    const student = await response.json();

    const list =
        document.getElementById(
            "studentList"
        );
    list.innerHTML = `
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
}

async function resetStudentSearch() {
    document.getElementById(
        "studentIDSearch"
    ).value = "";

    showStudents();
}


async function showModal(id){
    const response = await fetch(`${BASE_URL}/students/${id}`);
    const  data = await response.json()
    // fill the box with the student values
    document.getElementById("editName").value = data.student_name;   
    document.getElementById("editGender").value = data.gender;   
    document.getElementById("editPhone").value = data.phone;   
    document.getElementById("editDOB").value = data.date_of_birth;   
    document.getElementById("editClassId").value = data.class_id;   
    document.getElementById("editStudentId").value = id; //store opened id
    document.getElementById("editModal").classList.remove("hidden");
}

async function closeModal(){
    document.getElementById("editModal").classList.add("hidden");
}
async function saveStudent(){
    const id = document.getElementById("editStudentId").value;
    const stuName = document.getElementById("editName").value;
    const stuGender = document.getElementById("editGender").value;
    const stuPhone = document.getElementById("editPhone").value;
    const stuDOB = document.getElementById("editDOB").value;
    const classID = parseInt(document.getElementById("editClassId").value);

    await fetch(
        `${BASE_URL}/students/${id}`,
        {
            method:'PUT',
            headers:{
                    'Content-Type': 'application/json', // Informs the server about the data format
            },
            body: JSON.stringify({"name":stuName,"date_of_birth":stuDOB,"gender":stuGender,"phone":stuPhone,"class_id":classID}) 

        }
        

    );
    console.log(typeof classID)

}
