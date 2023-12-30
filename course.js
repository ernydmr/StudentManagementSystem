// Class definition for Course
class Course {
    constructor(id, name, credit, enroll) {
        this.course_id = id;
        this.course_name = name;
        this.course_credit = credit;
        this.enroll = enroll || [];  // Use provided enroll data or create an empty array . ( In here im adding all information to array like studens and grades then easily i can acces from course)
    }
}

// Initial courses to be used if no data is available in local storage
const initialCourses = [
    new Course(1, "Web Developing",6),
    new Course(2, "Database Management",6),
    new Course(3, "Python",6),
    new Course(4, "Java",6)
];

// Retrieve courses and students data from local storage
let coursesData = getLocalCourses()
let studentsData = getLocalStudents();

// If there is no course data in local storage, use the initial courses and save them
if (coursesData.length === 0) {
    coursesData = [...initialCourses];
    localStorage.setItem('courses', JSON.stringify(coursesData));
}

// Event listener for DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM content loaded");
    displayCourses();
    updateDeleteLectureForm();
    updateSelectStudentForListForm()
    updateSelectStudentForm();
    updateSelectStudentForAddForm()
    updateSelectStudentFormGPA()
    if(coursesData.length < 5){     // If there is new course we created it will empty(if we deleted one of the inital course it will fill the new one to)
    enrollStudentsAutomatically();
}
});

// Function to generate a random student name (ill add them to courses for beginning , and always there will be student in course)
function getRandomStudentName() {
    if (studentsData.length > 0) {
        const randomStudent = studentsData[Math.floor(Math.random() * studentsData.length)];
        return `${randomStudent.student_name} ${randomStudent.student_surname}`;
    } else {
        return "Check your student data";
    }
}

// Function to generate random student data
function generateRandomStudentData(studentId) {
    const localStudents = getLocalStudents();
    
    // Check if there are students available
    if (localStudents.length > 0) {
        const randomStudent = localStudents[Math.floor(Math.random() * localStudents.length)];
        const firstName = randomStudent.student_name;
        const lastName = randomStudent.student_surname;
        const midtermGrade = Math.floor(Math.random() * 101); // Random midterm grade between 0 and 100
        const finalGrade = Math.floor(Math.random() * 101); // Random final grade between 0 and 100

        // Checking students id
        const studentData = {
            student_id: randomStudent.student_id, // Using original id for student, so with this we can easily access to student information
            student_name: firstName,
            student_surname: lastName,
            midterm_grade: midtermGrade,
            final_grade: finalGrade
        };

        return studentData;
    } else {
        // İf there is no student data stop.
        return null;
    }
}

// Function to enroll students automatically
function enrollStudentsAutomatically() {
    coursesData.forEach(course => {
        course.enroll = [];  // Reset the enroll list for each course
        const enrolledStudentIds = []; // IDs of students already enrolled in this course
        const enrolledStudentNames = []; // Names of students already enrolled in this course

        // Enroll 25 students for each course
        for (let i = 1; i <= 25; i++) {
            let studentData;

            do {
                // Create a new student
                studentData = generateRandomStudentData(i);
            } while (
                enrolledStudentIds.includes(studentData.student_id) ||
                enrolledStudentNames.includes(`${studentData.student_name} ${studentData.student_surname}`)
            );

            // Check if the student ID or name is already in the enroll list
            const existingEnrollment = course.enroll.find(enrollment =>
                enrollment.student_id === studentData.student_id ||
                `${enrollment.student_name} ${enrollment.student_surname}` === `${studentData.student_name} ${studentData.student_surname}`
            );

            // If the student ID or name is not in the enroll list, add the student
            if (!existingEnrollment) {
                course.enroll.push(studentData);
                enrolledStudentIds.push(studentData.student_id);
                enrolledStudentNames.push(`${studentData.student_name} ${studentData.student_surname}`);
            }
        }
    });

    // Update local storage
    localStorage.setItem('courses', JSON.stringify(coursesData));

    // Display updated course data
    displayCourses();
    updateDeleteLectureForm();
    updateSelectStudentForListForm();
}

// Function to get courses from local storage
function getLocalCourses() {
    // Parse the data retrieved from localStorage
    const localCourses = localStorage.getItem('courses');

    if (localCourses) {
        // Parse the data retrieved from localStorage
        const parsedCourses = JSON.parse(localCourses);

        // Convert the parsed data into new Course objects with enroll information
        const coursesWithEnroll = parsedCourses.map(course => {
            const { course_id, course_name, course_credit, enroll } = course;
            return new Course(course_id, course_name, course_credit, enroll);
        });

        return coursesWithEnroll;
    } else {
        // If 'courses' information is not present or empty in localStorage, use initialCourses to create a new array
        return [...initialCourses];
    }
}

// Function to get students from local storage
function getLocalStudents() {
    const localStudents = localStorage.getItem('students');
    return localStudents ? JSON.parse(localStudents) : [];
}

// Function to update the student name list for dropdown
function updateStudentNameList() {
    const studentNamesDatalist = document.getElementById("studentNames");
    studentNamesDatalist.innerHTML = "";

    const localStudents = getLocalStudents();
    localStudents.forEach(student => {
        const option = document.createElement("option");
        option.value = student.student_name;
        studentNamesDatalist.appendChild(option);
    });
}

// Function to display courses in a table
function displayCourses() {
    const courseTableBody = document.getElementById("courseTableBody");
    courseTableBody.innerHTML = ""; // Clear previous data

    coursesData.forEach(course => {
        const row = courseTableBody.insertRow();

        // Insert cells with course information
        const idCell = row.insertCell(0);
        idCell.innerHTML = course.course_id;

        const nameCell = row.insertCell(1);
        nameCell.innerHTML = course.course_name;

    });
}

// Function to add a new course
function addLecture() {
    // Get input values
    const lectureIDInput = document.getElementById("lectureID");
    const lectureNameInput = document.getElementById("lectureName");
    const lectureCreditInput = document.getElementById("lectureCredit");

    // Validate inputs
    const id = parseInt(lectureIDInput.value);
    if (isNaN(id) || id <= 0) {
        alert("Enter a valid positive ID.");
        return;
    }

    // Check if ID already exists
    if (coursesData.some(course => course.course_id === id)) {
        alert("A course with this ID already exists.");
        return;
    }

    const credit = parseInt(lectureCreditInput.value);
    if (isNaN(credit) || credit <= 0) {
        alert("Enter a valid positive credit.");
        return;
    }
    // Create a new Course object
    const newCourse = new Course(
        id,
        lectureNameInput.value,
        credit
    );

    // Add the new course
    coursesData.push(newCourse);

    // Update local storage
    localStorage.setItem('courses', JSON.stringify(coursesData));

    //  Display the updated course list
    displayCourses();

    // Update the delete lecture form
    updateDeleteLectureForm();

    // Show a success message
    alert("Course added!");

    updateSelectStudentForListForm();
    updateSelectStudentForAddForm();
}

// Function to delete a course
function deleteLecture() {
    const selectLectureToDelete = document.getElementById("selectLectureToDelete");
    const selectedID = parseInt(selectLectureToDelete.value);

    //  Find the index of the course with the selected ID
    const courseIndex = coursesData.findIndex(course => course.course_id === selectedID);

    // If the course is not found, show an error message
    if (courseIndex === -1) {
        alert("No course found with this ID.");
        return;
    }

    // Remove the course
    coursesData.splice(courseIndex, 1);

    // Update local storage
    localStorage.setItem('courses', JSON.stringify(coursesData));

    // Display the updated course list
    displayCourses();

    // Update the delete lecture form
    updateDeleteLectureForm();

    // Show a success messager
    alert("Course deleted!");
}

// Function to update the delete lecture form with the current course list
function updateDeleteLectureForm() {
    const selectLectureToDelete = document.getElementById("selectLectureToDelete");
    selectLectureToDelete.innerHTML = "";
// updating course pick list for delete
    coursesData.forEach(course => {
        const option = document.createElement("option");
        option.value = course.course_id;
        option.textContent = `${course.course_id}: ${course.course_name}`;
        selectLectureToDelete.appendChild(option);
    });
}

// Function to update the select student dropdown for adding grade
function updateSelectStudentForAddForm() {
    const selectLectureForAdd = document.getElementById("selectLectureForAdd");

    // Clear the select element
    selectLectureForAdd.innerHTML = "";

    // Add options for each course to the select element
    coursesData.forEach(course => {
        const option = document.createElement("option");
        option.value = course.course_id;
        option.textContent = `${course.course_id}: ${course.course_name}`;
        selectLectureForAdd.appendChild(option);
    });
}

// Function to update the select student dropdown for listing grades
function updateSelectStudentForListForm() {
    const selectLectureForList = document.getElementById("selectLectureForList");

    // Get the ID of the selected course
    const selectedLectureID = parseInt(selectLectureForList.value);

    // Clear the select element
    selectLectureForList.innerHTML = "";

    // Add options for each course to the select element
    coursesData.forEach(course => {
        const option = document.createElement("option");
        option.value = course.course_id;
        option.textContent = `${course.course_id}: ${course.course_name}`;
        selectLectureForList.appendChild(option);
    });

    // Set the selected course ID back to its previous value
    selectLectureForList.value = selectedLectureID;
}

// Function to update the select student dropdown for managing grades
function updateSelectStudentForm() {
    const selectStudent = document.getElementById("selectStudent");
    selectStudent.innerHTML = "";

        // Get local student data
        const localStudents = getLocalStudents();
        // Add options for each student to the select element
        localStudents.forEach(student => {
        const option = document.createElement("option");
        option.value = student.student_id; // veya student.student_name; bu size bağlı
        option.textContent = `${student.student_id} - ${student.student_name} ${student.student_surname}`;
        selectStudent.appendChild(option);
    });
}

 // Function to add grades for a student in a course
function addStudentGrade() {
    // Get the ID of the selected course
    const selectLecture = document.getElementById("selectLectureForAdd");
    const selectedLectureID = parseInt(selectLecture.value);

    // Get the ID of the selected student
    const selectStudent = document.getElementById("selectStudent");
    const selectedStudentID = parseInt(selectStudent.value);

    // Get the grade inputs
    const midtermGradeInput = document.getElementById("midtermGrade");
    const midtermGrade = parseFloat(midtermGradeInput.value);
    const finalGradeInput = document.getElementById("finalGrade");
    const finalGrade = parseFloat(finalGradeInput.value);
    
    // Validate: Midterm and final grades should be between 0 and 100.
    if (isNaN(midtermGrade) || midtermGrade < 0 || midtermGrade > 100 || isNaN(finalGrade) || finalGrade < 0 || finalGrade > 100) {
        alert("Midterm ve final notları 0 ile 100 arasında olmalıdır.");
        return;
    }

    // Find the selected course
    const selectedCourse = coursesData.find(course => course.course_id === selectedLectureID);
    
    // Check if the course exists
    if (!selectedCourse) {
        alert("Seçilen ders bulunamadı.");
        return;
    }

    // Find the selected student
    const selectedStudent = studentsData.find(student => student.student_id === selectedStudentID);

    // Check if the student exists
    if (!selectedStudent) {
        alert("Seçilen öğrenci bulunamadı.");
        return;
    }

    // Check if the student is already enrolled in the course
    const existingEnrollment = selectedCourse.enroll.find(enrollment => enrollment.student_id === selectedStudentID);

    if (existingEnrollment) {
        alert("Student is already enrolled in the selected course.");
        return;
    }

    // Add the student and grades to the course's enroll array
    selectedCourse.enroll.push({
        student_id: selectedStudentID,
        student_name: selectedStudent.student_name,
        student_surname: selectedStudent.student_surname,
        midterm_grade: midtermGrade,
        final_grade: finalGrade
    });

    // Update local storage
    localStorage.setItem('courses', JSON.stringify(coursesData));

     // Show a success message
    alert("Student and grades added successfully!");
    // List the current students of the selected course
    listSelectedCourseStudents()
}

// Function to list students and grades for the selected course
function listSelectedCourseStudents() {
    // Take the inputs and check are they exist
    const selectLectureForList = document.getElementById("selectLectureForList");
    const selectedLectureID = parseInt(selectLectureForList.value);
    const selectedCourse = coursesData.find(course => course.course_id === selectedLectureID);
    const gradeSystemInput = document.getElementById("gradeSystemInput");
    const gradeSystem = parseInt(gradeSystemInput.value);
    //Take the input of filtering name 
    const studentNameFilter = document.getElementById("studentNameFilter").value.toLowerCase();

    const studentListContainer = document.querySelector(".studentListContainer");
    const studentList = document.querySelector(".studentList");

    // Clear existing content
    studentList.innerHTML = "";

    // Create a table element
    const table = document.createElement("table");
    table.id = "enrollmentTable";

    // Create table header
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Student ID</th><th>Full Name</th><th>Midterm Grade</th><th>Final Grade</th><th>Total Grade</th><th>Letter Grade</th><th>Passed?</th><th>Change grades</th><th>Delete Student</th>";
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement("tbody");

    // Kontrol ekle: Derste öğrenci yoksa mesajı göster
    if (selectedCourse.enroll.length === 0) {
        const noStudentRow = document.createElement("tr");
        const noStudentCell = document.createElement("td");
        noStudentCell.colSpan = 9; // Tüm sütunları kapla
        noStudentCell.textContent = "Bu derste henüz öğrenci yok.";
        noStudentRow.appendChild(noStudentCell);
        tbody.appendChild(noStudentRow);
    } else {
        let passedCount = 0;
        let failedCount = 0;
        let totalScore = 0;

        // Seçilen derse kayıtlı öğrencileri listele
        selectedCourse.enroll.forEach(enrollment => {
            // Notu hesapla
            const totalGrade = calculateTotalGrade(enrollment.midterm_grade, enrollment.final_grade);
            const letterGrade = calculateLetterGrade(totalGrade, gradeSystem);

            // Toplam puanı güncelle
            totalScore += parseFloat(totalGrade);

            // Check if the student name matches the filter
            const studentName = `${enrollment.student_name} ${enrollment.student_surname}`.toLowerCase();
            if (studentName.includes(studentNameFilter)) {
                // Create a table row
                const row = document.createElement("tr");

                // Populate table cells
                row.innerHTML = `
                    <td>${enrollment.student_id}</td>
                    <td>${enrollment.student_name} ${enrollment.student_surname}</td>
                    <td>${enrollment.midterm_grade}</td>
                    <td>${enrollment.final_grade}</td>
                    <td>${totalGrade}</td>
                    <td>${letterGrade}</td>
                    <td>${isCoursePassed(letterGrade) ? "Passed" : "Failed"}</td>
                    <td><button onclick="editStudentGrades(${enrollment.student_id})">Edit Grades</button></td>
                    <td><button onclick="removeStudentFromEnrollment(${enrollment.student_id})">Delete</button></td>
                `;

                // Set background color for the entire row
                row.style.backgroundColor = isCoursePassed(letterGrade) ? "lightgreen" : "lightcoral";

                // Set background color for each cell in the row
                Array.from(row.cells).forEach(cell => {
                    cell.style.backgroundColor = isCoursePassed(letterGrade) ? "lightgreen" : "lightcoral";
                });

                tbody.appendChild(row);

                // Count passed and failed students
                if (isCoursePassed(letterGrade)) {
                    passedCount++;
                } else {
                    failedCount++;
                }
            }
        });

        // Display passed and failed student counts
        const countRow = document.createElement("tr");
        const countCell = document.createElement("td");
        countCell.colSpan = 9;
        countCell.textContent = `Number of passed students:${passedCount}, Number of failed students: ${failedCount}`;
        countRow.appendChild(countCell);
        tbody.appendChild(countRow);

        // Calculate and display the mean score of the entire class
        const meanScore = totalScore / selectedCourse.enroll.length;
        const meanScoreRow = document.createElement("tr");
        const meanScoreCell = document.createElement("td");
        meanScoreCell.colSpan = 9;
        meanScoreCell.textContent = `Mean of class: ${meanScore.toFixed(2)}`;
        meanScoreRow.appendChild(meanScoreCell);
        tbody.appendChild(meanScoreRow);
    }

    table.appendChild(tbody);

    // Append the table to the studentList div
    studentList.appendChild(table);

    // Güncellenen ders adını göster
    const selectedCourseLabel = document.querySelector("#selectLectureForList + label");
    selectedCourseLabel.textContent = `Name of the course listed below :  ${selectedCourse.course_name}`;

    // Öğrenci listesini göster
    studentListContainer.style.display = "block";

    // Seçilen dersin öğrenci listesini güncelle
    updateSelectStudentForListForm();
}

// Function to calculate the total grade for a student
function calculateTotalGrade(midterm, final) {
    // Calculate the total grade (midterm %40 + final %60)
    const totalGrade = (midterm * 0.4) + (final * 0.6);
    return totalGrade.toFixed(2); // Show the grade with 2 decimal part like 50.75.
}

// Function to calculate the letter grade based on the total grade and grading system
function calculateLetterGrade(totalGrade, gradeSystem) {
    if (gradeSystem === 10) {
        if (totalGrade >= 90) {
            return 'AA';
        } else if (totalGrade >= 80) {
            return 'BA';
        } else if (totalGrade >= 70) {
            return 'BB';
        } else if (totalGrade >= 60) {
            return 'CB';
        } else if (totalGrade >= 50) {
            return 'CC';
        } else if (totalGrade >= 40) {
            return 'DC';
        } else {
            return 'FF';
        }
    } else if (gradeSystem === 7) {
        if (totalGrade >= 93) {
            return 'AA';
        } else if (totalGrade >= 86) {
            return 'BA';
        } else if (totalGrade >= 79) {
            return 'BB';
        } else if (totalGrade >= 72) {
            return 'CB';
        } else if (totalGrade >= 65) {
            return 'CC';
        } else if (totalGrade >= 58) {
            return 'DC';
        } else {
            return 'FF';
        }
    } else {
        return 'Geçersiz sistem';
    }
}

// Function to check if a course is passed based on the letter grade
function isCoursePassed(letterGrade) {
    return letterGrade !== 'F' && letterGrade !== 'FF';
}

// Function to edit grades for a specific student
function editStudentGrades(studentId) {
    // Find the selected course
    const selectLectureForList = document.getElementById("selectLectureForList");
    const selectedLectureID = parseInt(selectLectureForList.value);
    const selectedCourse = coursesData.find(course => course.course_id === selectedLectureID);

    // Find the selected student within the course
    const selectedStudentIndex = selectedCourse.enroll.findIndex(enrollment => enrollment.student_id === studentId);

    // Log the selected student
    const selectedStudent = selectedCourse.enroll[selectedStudentIndex];


    // Prompt for new grades
    const newMidtermGrade = prompt("Yeni Midterm Notu:");
    const newFinalGrade = prompt("Yeni Final Notu:");

    // Validate new grades
    if (isNaN(newMidtermGrade) || isNaN(newFinalGrade) || newMidtermGrade < 0 || newMidtermGrade > 100 || newFinalGrade < 0 || newFinalGrade > 100) {
        alert("Geçerli bir midterm ve final notu giriniz (0-100 arasında).");
        return;
    }

    // Update the grades in the data
    selectedCourse.enroll[selectedStudentIndex].midterm_grade = parseFloat(newMidtermGrade);
    selectedCourse.enroll[selectedStudentIndex].final_grade = parseFloat(newFinalGrade);

    // Update local storage
    localStorage.setItem('courses', JSON.stringify(coursesData));

    // Update the displayed table
    listSelectedCourseStudents();
}

// Function to remove a student from the enrollment list
function removeStudentFromEnrollment(studentId) {
    // Find the selected course
    const selectLectureForList = document.getElementById("selectLectureForList");
    const selectedLectureID = parseInt(selectLectureForList.value);
    const selectedCourse = coursesData.find(course => course.course_id === selectedLectureID);

    // Find the selected student within the course
    const selectedStudentIndex = selectedCourse.enroll.findIndex(enrollment => enrollment.student_id === studentId);

    if (selectedStudentIndex === -1) {
        alert("Öğrenci bulunamadı.");
        return;
    }

    // Remove the student from the enrollment list
    selectedCourse.enroll.splice(selectedStudentIndex, 1);

    // Update local storage
    localStorage.setItem('courses', JSON.stringify(coursesData));

    // Update the displayed table
    listSelectedCourseStudents();
}

function calculateWeightedGPA() {
    const selectedStudentId = document.getElementById("selectStudentGPA").value;

    // Get selected grade system from the dropdown
    const selectedGradeSystem = document.getElementById("gradeSystemGPA").value;

    // Convert selectedStudentId to a number (assuming it's a numeric value)
    const studentId = parseInt(selectedStudentId);

    // Convert selectedGradeSystem to a number (assuming it's a numeric value)
    const gradeSystem = parseInt(selectedGradeSystem);

    // Initialize variables to hold total grade and total credit
    let totalWeightedGrade = 0;
    let totalCredit = 0;

    // Iterate through each course
    coursesData.forEach(course => {
        // Find the student's enrollment in the current course based on student ID
        const enrollment = course.enroll.find(enrollment => enrollment.student_id === studentId);

        // If the student is enrolled in the course, calculate the weighted grade
        if (enrollment) {
            const credit = course.course_credit;

            // Get the letter grade based on the new grade system
            const letterGrade = calculateLetterGrade((enrollment.midterm_grade * 0.4) + (enrollment.final_grade * 0.6), gradeSystem);

            // Calculate the weighted grade based on the new letter grade
            const weightedGrade = calculateWeightedGrade(letterGrade) * credit;

            // Add the weighted grade to the total weighted grade
            totalWeightedGrade += weightedGrade;
        // Add the credit to the total credit
        totalCredit += credit;
        }
    });

    // Check if any enrollment is found for the given student ID
    if (totalCredit === 0) {
        alert("The students has no any course.");
        return;
    }

    // Calculate the weighted GPA
    const weightedGPA = totalWeightedGrade / totalCredit;

    // Display the result
    alert(`Weighted GPA for Student ID ${studentId}: ${weightedGPA.toFixed(2)}`);
}

// Function to calculate weighted grade based on letter grade
function calculateWeightedGrade(letterGrade) {
    switch (letterGrade) {
        case 'AA':
            return 4.0;
        case 'BA':
            return 3.5;
        case 'BB':
            return 3.0;
        case 'CB':
            return 2.5;
        case 'CC':
            return 2.0;
        case 'DC':
            return 1.5;
        case 'FF':
            return 0.0;
        default:
            return 0.0;
    }
}

// Function to select student for gpa.
function updateSelectStudentFormGPA() {
    const selectStudent = document.getElementById("selectStudentGPA");
    selectStudent.innerHTML = "";

        // Get local student data
        const localStudents = getLocalStudents();
        // Add options for each student to the select element
        localStudents.forEach(student => {
        const option = document.createElement("option");
        option.value = student.student_id; 
        option.textContent = `${student.student_id} - ${student.student_name} ${student.student_surname}`;
        selectStudent.appendChild(option);
    });
}

