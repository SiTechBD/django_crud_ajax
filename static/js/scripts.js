$('document').ready(function(){
   
   //open modal
   $('#add_btn').click(function(){
      $('#addModal').modal('show');
   });

   // add data form validation
   $("#add_form").validate({
      rules:{
         name:'required',
         email:'required',
         image:'required'
      },
      messages:{
         name:'please fill name field',
         email:'please fill email field',
         image:'choose an image'
      },
      submitHandler: function(form) {
         var data = new FormData(form);
             data.append("image",$("#image")[0].files[0]);
             data.append("csrfmiddlewaretoken",$("input[name=csrfmiddlewaretoken]").val())
             $.ajax({
               type:'POST', url:'add_data', data:data, processData:false, contentType:false, 
               success:function(res){
                  $('#addModal').modal('hide');
                  $(form)[0].reset();
                  $("#flash").html(
                     '<div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">'+ res +'</div>'
                  );
                  setTimeout(function(){
                     $('#alert').slideUp();
                  },3000);
                  getData();
               }
             });
       }
    });


   
   //data view 
   getData()
   function getData(){
      $.ajax({
         type:'get',
         dataType:'json',
         url:'view_data',
         success:function(res){
               var html = "";
               var sn=1;
            for (var i in res.entry){
               html += '<tr>';
               html += '<td>'+ sn++ +'</td>';
               html += '<td>'+ res.entry[i].name +'</td>';
               html += '<td>'+ res.entry[i].email +'</td>';
               html += '<td><img src=media/'+ res.entry[i].image +' style="width:50px; height:30px"/></td>';
               html += '<td><button type="button" class="btn btn-sm btn-info" id="update_entry" value="'+ res.entry[i].id +'">Edit</button>'
               html += '   <button type="button" class="btn btn-sm btn-danger" id="delete_entry" value="'+ res.entry[i].id +'">Delete</button></td>'
               html += '</tr>';
            }
            $('#tableData').html(html);
         }
         
      });
   }




//update entry
$('body').on("click","#update_entry",function(){
   var upId = $(this).val();
   $.ajax({
      type:"GET",
      url:'edit_data/'+upId,
      success:function(res){
        $('#u_name').val(res.entry[0].name);
        $('#u_email').val(res.entry[0].email);
        $('#u_id').val(res.entry[0].id);
        $('#updateModal').modal('show');
      }
   });
});

$('#update_form').submit(function(e){
   e.preventDefault();
   var data = new FormData(this);
       data.append("image",$("#image")[0].files[0]);
       data.append("csrfmiddlewaretoken",$("input[name=csrfmiddlewaretoken]").val())
             $.ajax({
               type:'POST', url:'update_data', data:data, processData:false, contentType:false, 
               success:function(res){
                  $('#updateModal').modal('hide');
                  $('#update_form')[0].reset();
                  $("#flash").html(
                     '<div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">'+ res +'</div>'
                  );
                  setTimeout(function(){
                     $('#alert').slideUp();
                  },3000);
                  getData();
               }
             });
});




//delete entry
$('body').on("click","#delete_entry",function(){
   var delId = $(this).val();
   $("#delete_id").val(delId);
   $('#deleteModal').modal('show');
});

$('#delete_form').submit(function(e){
   e.preventDefault();
   var data = new FormData(this);
  
   $.ajax({
      type:'POST',
      url:'delete_data',
      data:data,
      processData:false,
      contentType:false,
      success:function(res){

         $('#deleteModal').modal('hide');
         $("#flash").html(
            '<div id="alert" class="alert alert-success alert-dismissible fade show" role="alert">'+ res +'</div>'
         );
         setTimeout(function(){
            $('#alert').slideUp();
         },3000);

          //data view 
         getData();
      }
   });

});


// data search
$('#search').keyup(function(){
   var keyword = $(this).val()
   
   $.ajax({
      url:'search_data',
      type:'get',
      data:{
         keyword:keyword,
         csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val(),
      },
      success:function(res){
         var html = "";
               var sn=1;
            for (var i in res.entry){
               html += '<tr>';
               html += '<td>'+ sn++ +'</td>';
               html += '<td>'+ res.entry[i].name +'</td>';
               html += '<td>'+ res.entry[i].email +'</td>';
               html += '<td><img src=media/'+ res.entry[i].image +' style="width:50px; height:30px"/></td>';
               html += '<td><button type="button" class="btn btn-sm btn-info" id="update_entry" value="'+ res.entry[i].id +'">Edit</button>'
               html += '   <button type="button" class="btn btn-sm btn-danger" id="delete_entry" value="'+ res.entry[i].id +'">Delete</button></td>'
               html += '</tr>';
            }
            $('#tableData').html(html);
      }
   });
});













});




