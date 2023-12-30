// Define the Student class with a constructor
class Student {
    constructor(id, name, surname) {
        this.student_id = id;
        this.student_name = name;
        this.student_surname = surname;
    }
}
// Get students' data from local storage or use initial data if not available
let studentsData = getLocalStudents();

// Function to retrieve students from local storage
function getLocalStudents() {
    const localStudents = localStorage.getItem('students');
    return localStudents ? JSON.parse(localStudents) : [];
}

// Initial student data used if local storage is empty
const initialStudents = [
  {"student_id": 1, "student_name": "Ali", "student_surname": "Yılmaz"},
  {"student_id": 2, "student_name": "Ayşe", "student_surname": "Demir"},
  {"student_id": 3, "student_name": "Emre", "student_surname": "Kaya"},
  {"student_id": 4, "student_name": "Zeynep", "student_surname": "Çelik"},
  {"student_id": 5, "student_name": "Mehmet", "student_surname": "Yalın"},
  {"student_id": 6, "student_name": "Selin", "student_surname": "Öztürk"},
  {"student_id": 7, "student_name": "Can", "student_surname": "Arslan"},
  {"student_id": 8, "student_name": "Ece", "student_surname": "Turan"},
  {"student_id": 9, "student_name": "Burak", "student_surname": "Güneş"},
  {"student_id": 10, "student_name": "Nazlı", "student_surname": "Doğan"},
  {"student_id": 11, "student_name": "Kerem", "student_surname": "Aydın"},
  {"student_id": 12, "student_name": "Elif", "student_surname": "Şahin"},
  {"student_id": 13, "student_name": "Oğuz", "student_surname": "Özkan"},
  {"student_id": 14, "student_name": "Deniz", "student_surname": "Acar"},
  {"student_id": 15, "student_name": "Cemre", "student_surname": "Kurt"},
  {"student_id": 16, "student_name": "Kaan", "student_surname": "Demirci"},
  {"student_id": 17, "student_name": "İlayda", "student_surname": "Gür"},
  {"student_id": 18, "student_name": "Berk", "student_surname": "Koç"},
  {"student_id": 19, "student_name": "Sude", "student_surname": "Aydın"},
  {"student_id": 20, "student_name": "Ahmet", "student_surname": "Aksoy"},
  {"student_id": 21, "student_name": "Yağmur", "student_surname": "Korkmaz"},
  {"student_id": 22, "student_name": "Okan", "student_surname": "Sarı"},
  {"student_id": 23, "student_name": "Aslı", "student_surname": "Gündüz"},
  {"student_id": 24, "student_name": "Mert", "student_surname": "Yıldırım"},
  {"student_id": 25, "student_name": "Gizem", "student_surname": "Taşkın"},
  {"student_id": 26, "student_name": "Tolga", "student_surname": "Erdem"},
  {"student_id": 27, "student_name": "Nisan", "student_surname": "Aslan"},
  {"student_id": 28, "student_name": "Umut", "student_surname": "Bulut"},
  {"student_id": 29, "student_name": "Ceren", "student_surname": "Soylu"},
  {"student_id": 30, "student_name": "Onur", "student_surname": "Güzel"},
  {"student_id": 31, "student_name": "Eylül", "student_surname": "Şimşek"},
  {"student_id": 32, "student_name": "Efe", "student_surname": "Akgün"},
  {"student_id": 33, "student_name": "Gamze", "student_surname": "Demirtaş"},
  {"student_id": 34, "student_name": "Kadir", "student_surname": "Ergin"},
  {"student_id": 35, "student_name": "Serra", "student_surname": "Başar"},
  {"student_id": 36, "student_name": "Yiğit", "student_surname": "Yavuz"},
  {"student_id": 37, "student_name": "İrem", "student_surname": "Kara"},
  {"student_id": 38, "student_name": "Ozan", "student_surname": "Serbest"},
  {"student_id": 39, "student_name": "Elvan", "student_surname": "Erdoğan"},
  {"student_id": 40, "student_name": "Enes", "student_surname": "Alp"},
  {"student_id": 41, "student_name": "Yasmin", "student_surname": "Kılıç"},
  {"student_id": 42, "student_name": "Furkan", "student_surname": "Yıldız"},
  {"student_id": 43, "student_name": "Duygu", "student_surname": "Göktürk"},
  {"student_id": 44, "student_name": "Alper", "student_surname": "Bilge"},
  {"student_id": 45, "student_name": "İlay", "student_surname": "Yücel"},
  {"student_id": 46, "student_name": "Ufuk", "student_surname": "Keskin"},
  {"student_id": 47, "student_name": "Melis", "student_surname": "Kaplan"},
  {"student_id": 48, "student_name": "Arda", "student_surname": "Kocaman"},
  {"student_id": 49, "student_name": "Yelda", "student_surname": "Öztürk"},
  {"student_id": 50, "student_name": "Selim", "student_surname": "Çınar"}
]

// Checking local data and if its empty automaticly creating initaldata
if (studentsData.length === 0) {
    studentsData = [...initialStudents];
    localStorage.setItem('students', JSON.stringify(studentsData));
}

// Display students in the table or filter and display based on search term
function displayStudents() {
    // Get the list of students from the studentsData array
    const students = studentsData;

    // Get the reference to the HTML div where the table will be displayed
    const filteredStudentsDiv = document.getElementById("filteredStudents");

    // Clear the content of the div to avoid appending the table multiple times
    filteredStudentsDiv.innerHTML = "";

    // Create a new HTML table element
    const table = document.createElement("table");
    table.border = "1";

    // Create the table header row
    const headerRow = table.insertRow(0);
    const idHeader = headerRow.insertCell(0);
    const nameHeader = headerRow.insertCell(1);
    const surnameHeader = headerRow.insertCell(2);

    // Set the header cell content
    idHeader.innerHTML = "<b>ID</b>";
    nameHeader.innerHTML = "<b>Name</b>";
    surnameHeader.innerHTML = "<b>Surname</b>";

    // Get the search input element
    const searchInput = document.getElementById("searchStudentInput");

    // If there's a search term, filter students; otherwise, display all students
    const searchTerm = searchInput.value.trim().toLowerCase();  // trim ekledim
    const filteredStudents = searchTerm
        ? students.filter(student => {
              const fullName = `${student.student_name} ${student.student_surname}`;
              return fullName.toLowerCase().includes(searchTerm);
          })
        : students;

    // Iterate over each student and create a new row in the table for each
    filteredStudents.forEach(student => {
        const row = table.insertRow(-1); // -1 inserts a new row at the last position

        // Create cells in the row and set their content
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.innerHTML = student.student_id; // Set the student ID in the first cell
        cell2.innerHTML = student.student_name; // Set the student name in the second cell
        cell3.innerHTML = student.student_surname; // Set the student surname in the third cell
    });

    // Append the table to the specified div
    filteredStudentsDiv.appendChild(table);
}


function fillEditForm() {
    const editStudentSelect = document.getElementById("editStudentSelect");
    const selectedStudentId = parseInt(editStudentSelect.value);
    const selectedStudent = studentsData.find(student => student.student_id === selectedStudentId);

    if (selectedStudent) {
        document.getElementById("editStudentName").value = selectedStudent.student_name;
        document.getElementById("editStudentSurname").value = selectedStudent.student_surname;
    }
}

function displayEditDeleteSelects() {
    const editStudentSelect = document.getElementById("editStudentSelect");
    const deleteStudentSelect = document.getElementById("deleteStudentSelect");

    studentsData.forEach(student => {
        const option = document.createElement("option");
        option.value = student.student_id;
        option.text = `${student.student_id}: ${student.student_name} ${student.student_surname}`;
        editStudentSelect.add(option);
        deleteStudentSelect.add(option.cloneNode(true));
    });
}

// Event listener to display students and edit/delete selects when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    displayStudents();
    displayEditDeleteSelects();
});

// Edit the details of an existing student
function addStudent() {
    // Get references to the input fields for student ID, name, and surname
    const studentIDInput = document.getElementById("studentID");
    const studentNameInput = document.getElementById("studentName");
    const studentSurnameInput = document.getElementById("studentSurname");

    // Parse the entered ID as an integer
    const id = parseInt(studentIDInput.value);

    // Validate the entered ID
    if (isNaN(id) || id <= 0) {
        alert("Please enter a valid positive integer ID."); // Display an alert if the ID is not a positive integer
        return;
    }

    // Check if a student with the same ID already exists
    if (studentsData.some(student => student.student_id === id)) {
        alert("There is already a student with this ID."); // Display an alert if a student with the same ID already exists
        return;
    }

    // Create a new Student object with the entered ID, name, and surname
    const newStudent = new Student(
        id,
        studentNameInput.value,
        studentSurnameInput.value
    );

    // Add the new student to the studentsData array
    studentsData.push(newStudent);

    // Update the data in local storage with the new student added
    localStorage.setItem('students', JSON.stringify(studentsData));

    // Display the updated list of students and options for editing/deleting
    displayStudents();
    displayEditDeleteSelects();
}
// Edit the details of an existing student
function editStudent() {
    // Get references to the input fields for editing student ID, name, and surname
    const editStudentIDInput = document.getElementById("editStudentSelect");
    const editStudentNameInput = document.getElementById("editStudentName");
    const editStudentSurnameInput = document.getElementById("editStudentSurname");

    // Parse the selected student ID as an integer
    const id = parseInt(editStudentIDInput.value);

    // Validate the entered ID
    if (isNaN(id) || id <= 0) {
        alert("Please enter a valid positive integer ID."); // Display an alert if the ID is not a positive integer
        return;
    }

    // Find the index of the student in the studentsData array based on the selected ID
    const studentIndex = studentsData.findIndex(student => student.student_id === id);

    // Check if the student with the selected ID exists
    if (studentIndex === -1) {
        alert("There is no student with this ID."); // Display an alert if no student with the selected ID is found
        return;
    }

    // Update the name and surname of the existing student
    studentsData[studentIndex].student_name = editStudentNameInput.value;
    studentsData[studentIndex].student_surname = editStudentSurnameInput.value;

    // Update the data in local storage with the edited student details
    localStorage.setItem('students', JSON.stringify(studentsData));

    // Display the updated list of students
    displayStudents();
    alert("You changed student name-surname successfully.")
}

// Delete an existing student
function deleteStudent() {
    // Get the selected student ID for deletion
    const deleteStudentIDInput = document.getElementById("deleteStudentSelect");
    const id = parseInt(deleteStudentIDInput.value);

    // Validate the entered ID
    if (isNaN(id) || id <= 0) {
        alert("Please enter a valid positive integer ID."); // Display an alert if the ID is not a positive integer
        return;
    }

    // Find the index of the student in the studentsData array based on the selected ID
    const studentIndex = studentsData.findIndex(student => student.student_id === id);

    // Check if the student with the selected ID exists
    if (studentIndex === -1) {
        alert("There is no student with this ID."); // Display an alert if no student with the selected ID is found
        return;
    }

    // Remove the student from the studentsData array using splice
    studentsData.splice(studentIndex, 1);

    // Update the data in local storage without the deleted student
    localStorage.setItem('students', JSON.stringify(studentsData));

    // Display the updated list of students
    displayStudents();
    
    // Clear and display options for editing and deleting students
    clearAndDisplayEditDeleteSelects();
    alert("You deleted student successfully.")

}

// Clear and display options for editing and deleting students
function clearAndDisplayEditDeleteSelects() {
    const editStudentSelect = document.getElementById("editStudentSelect");
    const deleteStudentSelect = document.getElementById("deleteStudentSelect");

    // Clear existing options
    editStudentSelect.innerHTML = "";
    deleteStudentSelect.innerHTML = "";

    // Add new options
    studentsData.forEach(student => {
        const editOption = document.createElement("option");
        editOption.value = student.student_id;
        editOption.text = `${student.student_id}: ${student.student_name} ${student.student_surname}`;
        editStudentSelect.add(editOption);

        const deleteOption = document.createElement("option");
        deleteOption.value = student.student_id;
        deleteOption.text = `${student.student_id}: ${student.student_name} ${student.student_surname}`;
        deleteStudentSelect.add(deleteOption);
    });
}