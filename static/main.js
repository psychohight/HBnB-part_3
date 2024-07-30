$(document).ready(function(){
    $('#getDataBtn').click(function(){
        $.ajax({
            url: '/api/some_endpoint',
            type: 'GET',
            success: function(response) {
                $('#responseContainer').html('<p>' + response.message + '</p>');
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });
});
