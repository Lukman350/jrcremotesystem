$(document).ready(function () {

    $(".form-control").change(function() {
        $(this).removeClass('is-invalid');
        $(this).next().empty();
    });

});

function action(type)
{
    let data_input;
    let api_url;
    let kode_aksi;

    switch (type) {
      case 'test_tone_start':
        data_input = $('#test_tone_form').serialize();
        api_url    = 'test_tone_set.cgi';
        kode_aksi  = 'test_tone_start';
        break;

      case 'test_tone_stop':
        data_input = -1;
        api_url    = 'test_tone_set.cgi';
        kode_aksi  = 'test_tone_stop';
        break;

      case 'voip_loop_start':
        data_input = $('#loopbackselect').val();
        api_url    = 'loop_back_set.cgi';
        kode_aksi  = 'voip_loop_start';
        break;

      case 'voip_loop_stop':
        data_input = -1;
        api_url    = 'loop_back_set.cgi';
        kode_aksi  = 'voip_loop_stop';
        break;

      case 'reset_unit_normal':
        data_input = 'Normal';
        api_url    = 'reset.cgi';
        kode_aksi  = 'reset_unit_normal';
        break;

      case 'reset_unit_local':
        data_input = 'Local';
        api_url    = 'reset.cgi';
        kode_aksi  = 'reset_unit_local';
        break;

      case 'reset_unit_master':
        data_input = 'Master';
        api_url    = 'reset.cgi';
        kode_aksi  = 'reset_unit_master';
    }

    $.ajax({
        url: 'test/action_post',
        type: 'POST',
        data: {
                data_send: data_input,
                url: api_url,
                kode: kode_aksi
              },
        dataType: "JSON",
        success: function(result)
        {
            if(result.status){
                notifSuccess(result.message);
                $('#reset_unit_normal_modal').modal('hide');
                $('#reset_unit_local_modal').modal('hide');
                $('#reset_unit_master_modal').modal('hide');
            }else{
                notifError();
                $('#reset_unit_normal_modal').modal('hide');
                $('#reset_unit_local_modal').modal('hide');
                $('#reset_unit_master_modal').modal('hide');

                // for(var i = 0; i < result.inputerror.length; i++)
                // {
                //     $('[name ="'+result.inputerror[i]+'" ]').addClass('is-invalid');
                //     $('[name="'+result.inputerror[i]+'"]').next().text(result.texterror[i]);
                // }
            }
           
        },
        error: function (jqXHR, textStatus, errorThrown)
        { 
            notifError();
            $('#reset_unit_normal_modal').modal('hide');
            $('#reset_unit_local_modal').modal('hide');
            $('#reset_unit_master_modal').modal('hide');
        }
    });
}

function notifSuccess(text)
{
    $.notify({
    // options
    icon: 'flaticon-success',
    title: 'Success!',
    message: text
    },{
        // settings
        element: 'body',
        position: null,
        type: "success",
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

function notifError()
{
    $.notify({
        // options
        icon: 'flaticon-error',
        title: 'Error!',
        message: 'There are any trouble in processing data',
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