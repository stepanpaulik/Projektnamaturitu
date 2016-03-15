$(document).ready(function(){
    $('#steamIDvalue').bind('input propertychange', function() {
         id = $('#steamIDvalue').val();
         if (isNaN(id)){
            splitId = id.split('/');
            $( this ).val(splitId[4])
         }
         
    });

})

