var employees = [
        {
            name : "David",
            phone: "800-555-5555",
            address: "123 Main Street, Denver, CO 80200"
        },

        {
            name : "Bob",
            phone: "303-123-4567",
            address: "123 Main Street, Broomfield, CO 80200"

        }
    ];



/*
                       d8b
                       Y8P          
                                    
88888b.d88b.   8888b.  888 88888b.  
888 "888 "88b     "88b 888 888 "88b 
888  888  888 .d888888 888 888  888 
888  888  888 888  888 888 888  888 
888  888  888 "Y888888 888 888  888 

)
*/


$(document).ready(function(){
    render_employee_table(employees);
    
    $('#edit_box').hide();

    $("#add").click(function() {
         console.log('clicked!');
        $('#edit_box').slideDown(render_edit_box('add')).show();


    });



});


function delete_employee(index){
    console.log(index);

    employees.splice(index, 1);

    render_employee_table(employees)
   


}





function render_edit_box(type, employee, index){
    var pre_name = "";
    var pre_phone = "";
    var pre_address = "";

    if (type == "edit") { 
        console.log(employee);

        pre_name = employee.name;
        pre_phone = employee.phone;
        pre_address = employee.address;
    }


    var html = '<div class="input-group"><label for="whatever">Name<input type="text" class="form-control" placeholder="name" id="edit_name" value="' + pre_name + '"></label>' +
        '<div class="input-group"><label for="whatever">Phone<input type="text" class="form-control" placeholder="phone number" id="edit_phone" value="'+ pre_phone + '"></label></div>' +
        '<div class="input-group"><label for="whatever">Address<input type="text" class="form-control" placeholder="address"id="edit_address" value="'+ pre_address + '"></label>' +'<div>';
    //TODO make input box for address wider.
    //TODO

    var button_name = type == "add" ? "add it" : "update it"; 

    html += "<button id='saveit'>"+ button_name + "</button>";
    
    $('#edit_box').html(html);
        //slideIn('fast');


    $('#saveit').click(function(){
        var e = { 
            name : $("#edit_name").val(),
            phone: $("#edit_phone").val(),
            address: $("#edit_address").val()
        }
        if(type=="add") {
            add_employee(e);
        }
        else if (type=="edit") { 
            update_employee(e, index);
        }

         $("#edit_box").html('').slideUp();

    })

      
}
function update_employee(data, index){
    console.log("update Employee " + index);
    console.log(data);

    // employees[index].name = data.name;
    // employees[index].phone = data.phone; 


    employees[index] = data; 
    render_employee_table(employees);
}

function add_employee(data){

        
        employees.push(data);
        render_employee_table(employees)
         
       


}

//var data =
//    jQuery.parseJSON;
//
//    $.ajax({
//                type: "Get",
//                url: "http://69.164.197.6/employees",
//                data: { name: "John",: "Boston" }
//            })
//                .done(function( msg ) {
//                    console.log( "Data Saved: " + msg );
//            });
//            return

function render_employee_table(data){


    console.log('render employee table')
    var html;

    html = "<table><tr><th>Name</th><th>Phone</th><th>Address</th></tr>";


    data.forEach(function(employee, index){

        html += "<tr>";
        html += "<td>"+ employee.name +"</td>";
        html += "<td>"+ employee.phone +"</td>";
        html += "<td>"+ employee.address +"</td>";
        html += "<td><button type='button' class='btn btn-default btn-sm delete' index='"+index+"'>Del</button></td>";
        html += "<td><button type='button'' class='btn btn-default btn-sm' index='"+ index +" class='edit'>Edit</button></td>";

        html += "</tr>";
    })


    html += "</table>";

    $("#employee_list").html(html); 

    $(".delete").click(function(){
       console.log('delete clicked');
       delete_employee($(this).attr("index"));
    });

    $('.edit').click(function(){
        console.log('clicked to update existing');


         render_edit_box('edit', employees[$(this).attr("index")] , $(this).attr("index"));

    })

    


}