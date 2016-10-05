let reader = new FileReader()
$(document).ready(function(){
  $("#gambar").change(function(){
    console.log($("gambar"))
    reader.readAsDataURL($("#gambar")[0].files[0])
    reader.onloadend = function (e) {
      $("img").attr('src', reader.result);
    }
  })
})
