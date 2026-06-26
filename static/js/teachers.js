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