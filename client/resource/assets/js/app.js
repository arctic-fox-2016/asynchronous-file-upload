window.$ = window.jQuery = require("jquery")

// dah pake jquery
$(function() {
    refreshAllHouse()
    $("#addlisting").hide()
      $("#listlisting").hide()

    $("#message").hide()
    $("#btn-addlisting").click(function() {
        $("#listlisting").hide()
        $("#addlisting").show()
    })
    $("#inputlisting").unbind().on("submit", function(event) {
        event.preventDefault()
        $.ajax({
            url: 'http://localhost:8080/api/listings',
            type: 'POST',
            data: {
                title: $("#title").val(),
                owner: $("#owner").val(),
                address: $("#address").val(),
                bedroom: $("#bedroom").val(),
                bathroom: $("#bathroom").val(),
                harga: $("#harga").val(),
                gallery: $("#gallery").val(),
                lat: marker.getPosition().lat(),
                long: marker.getPosition().lng()
            },
            success: function(result) {
                $("#title").val("");
                $("#owner").val("");
                $("#address").val("");
                $("#bedroom").val("");
                $("#bathroom").val("");
                $("#harga").val("");
                $("#gallery").val("");
                $("#message").show().html("Add is successful, feel free to add another")
                $("#gallery").val("");
                $("#addlisting").hide()
                refreshAllHouse()
                $("#listlisting").show()
            }
        })
    })
    $("#search-box").keyup(function() {
        if ($("#search-box").val().length > 2) {
            searchHouse($("#search-box").val())
        } else {
            $("#search-result").html("")
        }
    })

})

let refreshAllHouse = function() {
    $.ajax({
        url: 'http://localhost:8080/api/listings',
        type: "GET",
        success: function(result) {
            let allHouse = ""
            for (let i in result) {
                let component = ""
                component = component +
                    `
        <div class="col-xs-6 col-md-4">
            <div class="panel panel-default">
                <div class="panel-body">
                    <img class="" src="https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7Clabel:C%7C${result[i].gmaps[0].lat},${result[i].gmaps[0].long}&size=250x250&key=AIzaSyBjA9s2q4vk2TCvQ9O81qrqbv5rx4lqKj0">
                </div>
                <div class="panel-footer">
                    Title: ${result[i].title} <br>
                    Address: ${result[i].owner} <br>
                    Description: ${result[i].address} <br>
                    Price: ${result[i].bedroom} <br>
                    Phone_Number: ${result[i].bathroom} <br>
                    Email: ${result[i].harga} <br>
                </div>
            </div>
        </div>
        `
                allHouse = allHouse + component

            }

            $("#all-house").html(allHouse)
        }
    })
}

let searchHouse = function(query) {
    $.ajax({
        url: `http://localhost:8080/api/search/${query}`,
        type: "GET",
        success: function(result) {
            let allHouse = ""
            for (let i in result) {
                let component = ""
                component = component +
                    `Title: ${result[i].title} <br>
        Address: ${result[i].address} <br>
        Description: ${result[i].description} <br>
        Price: ${result[i].price} <br>
        Phone_Number: ${result[i].phone_number} <br>
        Email: ${result[i].email} <br>
        Picture: ${result[i].picture} <br>
        <img src="https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7Clabel:C%7C${result[i].gmaps[0].lat},${result[i].gmaps[0].long}&size=400x300&key=AIzaSyBjA9s2q4vk2TCvQ9O81qrqbv5rx4lqKj0"><br>
        `
        console.log(result);
                allHouse = allHouse + component
            }
            $("#search-result").html(allHouse)
        }
    })
}
