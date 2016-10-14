let displayCustomers = function(customers){
  let display = ""
  for (let i in customers){
    display = display + `
    <tr>
      <td>Member_ID: ${customers[i].member_id}</td>
      <td>Name: ${customers[i].name} </td>
      <td>Address: ${customers[i].address} </td>
      <td>Zipcode: ${customers[i].zipcode} </td>
      <td>Phone: ${customers[i].phone} </td>
      // <td><form action="api/customers/delete/${customers[i]._id} %>" method="POST"><input type="submit" value="delete"></form></td>
      // <td><form action="/customers/edit/${customers[i]._id} %>" method="POST"><input type="submit" value="edit"></form></td>
    </tr>`
  }
  return display
}

$(document).ready(function(){
  $("#submitdeh").click(function(event){
    event.preventDefault()
    $.ajax({
      url: '/api/register/customer',
      type: 'POST',
      data: {member_id: $("input[name='member_id']").val(),name: $("input[name='name']").val(),address: $("input[name='address']").val(),zipcode: $("input[name='zipcode']").val(),phone: $("input[name='phone']").val()}}
    ).done(function(){
      $.getJSON("/api/display/customer", function(customers){
        let display = ""
        for (let i in customers){
          display = display + `
          <tr>
          <td>Member_ID: ${customers[i].member_id}</td>
          <td>Name: ${customers[i].name} </td>
          <td>Address: ${customers[i].address} </td>
          <td>Zipcode: ${customers[i].zipcode} </td>
          <td>Phone: ${customers[i].phone} </td>
          // <td><form action="api/customers/delete/${customers[i]._id} %>" method="POST"><input type="submit" value="delete"></form></td>
          // <td><form action="/customers/edit/${customers[i]._id} %>" method="POST"><input type="submit" value="edit"></form></td>
          </tr>`
        }
        $(".test").html(display)
      })
    })
  })
})
