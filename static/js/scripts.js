import { getTitle, showPage } from "./common.js";
import {
    showStudents,
    getStudentID,
    resetStudentSearch,
    deleteStudent,
    showModal,
    closeModal,
    saveStudent,
    showAddForm,
    closeAddForm,
    addStudent
} from "./students.js";
import { showTeachers, addTeacher, deleteTeacher } from "./teachers.js";

// ── Expose functions used in HTML onclick attributes ──────────────────────────

window.showPage         = showPage;

// Students
window.getStudentID     = getStudentID;
window.resetStudentSearch = resetStudentSearch;
window.deleteStudent    = deleteStudent;
window.showModal        = showModal;
window.closeModal       = closeModal;
window.saveStudent      = saveStudent;
window.showAddForm      = showAddForm;
window.closeAddForm     = closeAddForm;
window.addStudent       = addStudent;
// Teachers
window.addTeacher       = addTeacher;
window.deleteTeacher    = deleteTeacher;

// ── Init ──────────────────────────────────────────────────────────────────────

getTitle();
showStudents();
showTeachers();
showPage("dashboard");
