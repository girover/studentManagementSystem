$(document).ready(function () {
        
    $('.toast').toast('show');

    $(".btn-delete").click(function () {
        $("#modal-delete .modal-body").html("Are you sure for deleting: [ " + $(this).data('name') + " ]?");
        //$('#input-student-id').val($(this).data('student-id'));
        $('#form-delete-item').attr('action', $(this).data('href'));
    });
});

// var mainContent = null;

// $(document).ready(function () {
//     $('.toast').toast('show');

//     $(".btn-delete-student").click(function () {
//         $("#modal-delete-student .modal-body").html("Are you sure for deleting the student named [ " + $(this).data('student-name') + " ]?");
//         $('#input-student-id').val($(this).data('student-id'));
//     });

//     $('#btn-students').on('click', function () {
//         $.ajax({
//             url: '/api/students',
//             type: 'GET',
//             success: function (data) {
//                 renderStudentsTable(data.data);
//             }
//         });
//     });

//     $(document).on('click', '#btn-add-student', function () {
//         $('#modal-add-student').modal('show');
//     });

//     $(document).on('click', '#modal-btn-add-student', function () {
//         let student = {
//             name: $('#input-student-name').val(),
//             email: $('#input-student-email').val(),
//             semester: $('#input-student-semester').val(),
//             education: $('#input-student-education').val()
//         }; console.log(student);
//         $.ajax({
//             url: '/api/students',
//             type: 'POST',
//             data: student,
//             success: function (data) {
//                 $('#modal-add-student').modal('hide');
//                 addStudentToTable(data.data);                
//             },
//             error: function (error) {
//                 console.log(error);
//             }     
//         });
//     });


//     mainContent = $('#main');
// });

// function renderStudents(students){    
//     mainContent.html(listOfStudents(students));
// }
// function renderStudentsTable(students){    
//     mainContent.html(tableOfStudents(students));
// }

// function listOfStudents(students){
//     let list = `
//     <div class="row">`;
//     students.forEach(student => {
//         list += `<div class="col-sm-6 col-md-4 col-lg-3">`
//                 + studentCard(student)
//                 + `</div>`;
//     });
//     list += `</div> `;
//     return list;
// }
// function tableOfStudents(students){
//     let table = `
//     <div class="card">
// 	<div class="card-body">
// 		<h5 class="card-title">List Of Students</h5>
// 		<div class="d-flex justify-content-between align-items-start">
// 			<a id="btn-add-student" class="btn btn-sm btn-dark shadow mb-2"><i class="fa fa-user-plus"></i> New</a>
// 		</div>
// 		<table class="table table-sm table-striped table-hover" id="students-table">
// 			<thead>
// 				<tr>
// 					<th>ID</th>
// 					<th>Name</th>
// 					<th>Education</th>
// 					<th>Email</th>
// 					<th>Semester</th>
// 					<th>Actions</th>
// 				</tr>
// 			</thead>
// 			<tbody> `;
// 		students.forEach((student) => {
           
// 			table +=`<tr class="">
// 						<td>${student._id}</td>
// 						<td>${student.name}</td>
// 						<td>${student.education ? student.education.name:''}</td>
// 						<td>${student.email}</td>
// 						<td>${student.semester}</td>
// 						<td>
// 							<button type="button" class="btn btn-sm btn-danger btn-delete-student" data-bs-toggle="modal" data-href="@(Url.Action("Delete", "Student", new { id = student.Id }))" data-bs-target="#modal-delete-student" data-student-id="@student.Id" data-student-name="@student.FirstName">
// 								<i class="fa fa-trash"></i>
// 							</button>
// 							<a asp-controller="Student" asp-action="Update" asp-route-id="@student.Id" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></a>
// 							<a asp-controller="Student" asp-action="Profile" asp-route-id="@student.Id" class="btn btn-sm btn-dark"><i class="fa fa-id-card"></i></a>
// 						</td>
// 					</tr>`});
// 		table +=`		
// 			</tbody>
// 		</table>
// 	</div>
// </div>
//     `;
//     return table;
// }

// function studentCard(student){
//     return `
//     <div class="card student-card">
//     <div class="card-body profile-card pt-4 d-flex flex-column align-items-center">
//         <img src="/img/avatar.png" alt="Profile" class="rounded-circle w-50">
//         <h6 class="fw-bold mt-2">
//             <a class="">${student.name}</a>
//         </h6>
//         <h6 class="fw-bold">${student.name}</h6>
//         <h6>${student.email}</h6>
//         <div class="social-links mt-2">
//             <a href="#" class="text-dark twitter"><i class="fa-brands fa-square-twitter"></i></a>
//             <a href="#" class="text-dark facebook"><i class="fa-brands fa-square-facebook"></i></a>
//             <a href="#" class="text-dark instagram"><i class="fa-brands fa-square-instagram"></i></a>
//             <a href="#" class="text-dark linkedin"><i class="fa-brands fa-linkedin"></i></a>
//         </div>
//     </div>
//     </div>`;
// }

// function addStudentToTable(student) {
//     $('#students-table tbody').append(`
//         <tr>
//             <td>${student._id}</td>
//             <td>${student.name}</td>
//             <td>${student.education ? student.education.name : ''}</td>
//             <td>${student.email}</td>
//             <td>${student.semester}</td>
//             <td>
//                 <button type="button" class="btn btn-sm btn-danger btn-delete-student" data-bs-toggle="modal" data-href="@(Url.Action("Delete", "Student", new { id = student.Id }))" data-bs-target="#modal-delete-student" data-student-id="@student.Id" data-student-name="@student.FirstName">
//                     <i class="fa fa-trash"></i>
//                 </button>
//                 <a asp-controller="Student" asp-action="Update" asp-route-id="@student.Id" class="btn btn-sm btn-primary"><i class="fa fa-edit"></i></a>
//                 <a asp-controller="Student" asp-action="Profile" asp-route-id="@student.Id" class="btn btn-sm btn-dark"><i class="fa fa-id-card"></i></a>
//             </td>
//         </tr>
//     `);
// }

// function showAddNewStudentForm(){
//     mainContent.html(addNewStudentForm());
// }