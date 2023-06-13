$(document).ready(function() {
	/* Clear error border and text in input field */
	change_form_control();
});


function save()
{
	$.ajax({
		url: 'changepassword/save',
		type: 'POST',
		data: $('#formChangePassword').serialize(),
		dataType: "JSON",
		beforeSend: function() {  $('#loading').modal('show'); },
		success: function(result)
		{
			if(result.status){

				$('#loading').modal('hide');
				show_notif(result);
				setTimeout(function(){
					window.location.href = 'main';
				}, 2000);
				
			}else{

				show_error_form_validation(result);
				setTimeout(function(){
					$('#loading').modal('hide');
				}, 2000);
			}
		},
		error: function (jqXHR, textStatus, errorThrown)
		{ 
			setTimeout(function(){
				$('#loading').modal('hide');
				notif_error_ajax();
			}, 2000);	
		}
	});
}

function show_error_form_validation(data)
{
	for(var i = 0; i < data.inputerror.length; i++)
	{
		$('[for ="'+data.inputerror[i]+'" ]').removeClass('text-primary');
	    $('[for ="'+data.inputerror[i]+'" ]').addClass('text-danger');

	    $('[name ="'+data.inputerror[i]+'" ]').removeClass('border-primary');
	    $('[name ="'+data.inputerror[i]+'" ]').addClass('border-danger');

        $('[name="'+data.inputerror[i]+'"]').next().text(data.texterror[i]);
	}
}

function change_form_control()
{
    $(".form-control").change(function(){
		var namaField = $(this).attr("name");
		$('[for ="'+namaField+'" ]').removeClass('text-danger');
	    $('[for ="'+namaField+'" ]').addClass('text-primary');

	    //Untuk Input text
	    $('[name ="'+namaField+'" ]').removeClass('border-danger');
	    $('[name ="'+namaField+'" ]').addClass('border-primary');

        $('[name="'+namaField+'"]').next().text('');

	})
}

function show_notif(data)
{
    $.notify({
    // options
    icon: data.icon,
    title: data.title,
    message: data.message
    },{
        // settings
        element: 'body',
        position: null,
        type: data.type,
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 2000,
        timer: 800,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated bounceIn',
            exit: 'animated bounceOut',
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        
    });
}

function notif_error_ajax()
{
    $.notify({
        // options
        icon: 'flaticon-error',
        title: 'Gagal!',
        message: 'Terjadi masalah dalam pengiriman data',
    },{
        // settings
        element: 'body',
        position: null,
        type: "danger",
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: false,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated bounceIn',
            exit: 'animated bounceOut',
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
    });
}