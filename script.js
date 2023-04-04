const nameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const gpaElement = document.getElementById("gpa");
const ageElement = document.getElementById("age");
const degreeElement = document.getElementById("degree");
const tableBody = document.querySelector("tbody");
const btnElement = document.getElementById("add-btn");
const students = [];

//function to edit table
function handleEdit(id) {
  //   const buttonElement = event.target;
  //   const id = buttonElement.id;

  //   if (buttonElement.textContent === "Edit") {
  //     event.target.textContent = "Save";
  //     const parentElement = buttonElement.parentElement;

  //     parentElement.removeChild(parentElement.firstChild);

  //     let input = document.createElement("input");
  //     input.id = "edit";
  //     input.value = students[id - 1].degree;
  //     parentElement.insertBefore(input, event.target);
  //   } else {
  //     const degreeElement = document.getElementById("edit");
  //     students[id - 1].degree = degreeElement.value;
  //     renderStudentsInTable();
  //   }
  students.forEach((student) => {
    if (student["ID"] == id) {
      document.getElementById("name").value = student["name"];
      document.getElementById("email").value = student["email"];
      document.getElementById("age").value = student["age"];
      document.getElementById("grade").value = student["gpa"];
      document.getElementById("degree").value = student["degree"];
      document.getElementByClassName("submit").innerText = "Edit Student";

      document.getElementsByClassName("submit").onclick = function jsFunc() {
        student["name"] = document.getElementById("name").value;
        student["email"] = document.getElementById("email").value;
        student["age"] = document.getElementById("age").value;
        student["gpa"] = document.getElementById("gpa").value;
        student["degree"] = document.getElementById("degree").value;

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("age").value = "";
        document.getElementById("gpa").value = "";
        document.getElementById("degree").value = "";

        document.getElementByClassName("submit").innerText = "Add Student";

        renderStudentsInTable();
      };
    }
  });
}

function handelDelete(id) {
  const index = students.findIndex((student) => student.id === id);
  students.splice(index, 1);
  renderStudentsInTable();
}

// function to search student by name, email, or degree
function search() {
  var input, filter, table, tr, td, i, txtValue, txtValue1, txtValue2;
  input = document.getElementById("search-box");
  filter = input.value.toUpperCase();
  table = document.getElementById("table-body");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    td1 = tr[i].getElementsByTagName("td")[2];
    td2 = tr[i].getElementsByTagName("td")[5];

    if (td || td1 || td2) {
      txtValue = td.textContent || td.innerText;
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;

      if (
        txtValue.toUpperCase().indexOf(filter) > -1 ||
        txtValue1.toUpperCase().indexOf(filter) > -1 ||
        txtValue2.toUpperCase().indexOf(filter) > -1
      ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// creating the table row dynamically
function createTableRow(data, tableBody, studentId) {
  const tr = document.createElement("tr");

  const idTd = document.createElement("td");
  idTd.textContent = studentId;

  const nameTd = document.createElement("td");
  nameTd.textContent = data.name;

  const emailTd = document.createElement("td");
  emailTd.textContent = data.email;

  const gpaTd = document.createElement("td");
  gpaTd.textContent = data.gpa;

  const ageTd = document.createElement("td");
  ageTd.textContent = data.age;

  const degreeTd = document.createElement("td");
  degreeTd.classList.add("flex");

  const editBtn = document.createElement("button");
  const deleteBtn = document.createElement("button");
  const span = document.createElement("span");

  degreeTd.textContent = data.degree;

  editBtn.textContent = "Edit";
  editBtn.id = studentId;
  deleteBtn.textContent = "Delete";
  deleteBtn.id = studentId;

  editBtn.addEventListener("click", handleEdit);
  deleteBtn.addEventListener("click", handelDelete);

  degreeTd.appendChild(span);
  degreeTd.appendChild(editBtn);
  degreeTd.appendChild(deleteBtn);

  //adding in table row
  tr.appendChild(idTd);
  tr.appendChild(nameTd);
  tr.appendChild(emailTd);
  tr.appendChild(ageTd);
  tr.appendChild(gpaTd);
  tr.appendChild(degreeTd);

  // adding in tableBody
  tableBody.appendChild(tr);
}

// rendering the students
function renderStudentsInTable() {
  tableBody.innerHTML = "";
  students.map(function (student, index) {
    createTableRow(student, tableBody, index + 1);
  });
}

//handling the data from the input elements
function handleFormSubmit() {
  const studentName = nameElement.value;
  nameElement.value = "";
  const email = emailElement.value;
  emailElement.value = "";
  const age = ageElement.value;
  ageElement.value = "";
  const gpa = gpaElement.value;
  gpaElement.value = "";
  const degree = degreeElement.value;
  degreeElement.value = "";

  //checking if there is some empty field
  if (studentName && email && age && gpa && degree) {
    const student = {
      name: studentName,
      email: email,
      age: age,
      gpa: gpa,
      degree: degree,
    };

    students.push(student);

    renderStudentsInTable();
  } else {
    alert("please enter all the details");
  }
}

btnElement.addEventListener("click", handleFormSubmit);
