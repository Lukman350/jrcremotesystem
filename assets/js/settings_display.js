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
      case 'voip_set':
        data_input     = $('#form_voip_settings').serialize();
        api_url        = 'voip_set.cgi';
        controller_url = 'settings/action_post';
        type_ajax      = 'POST';
        kode_aksi      = 'voip_set';
        break;

      case 'voip_refresh':
        data_input     = '';
        api_url        = 'voip_get.cgi';
        controller_url = 'settings/action_get';
        type_ajax      = 'GET';
        kode_aksi      = 'voip_refresh';
        break;

      case 'tcpif_set':
        data_input     = $('#form_tcpif_settings').serialize();
        api_url        = 'tcpif_set.cgi';
        controller_url = 'settings/action_post';
        type_ajax      = 'POST';
        kode_aksi      = 'tcpif_set';
        break;

      case 'tcpif_refresh':
        data_input     = '';
        api_url        = 'tcpif_get.cgi';
        controller_url = 'settings/action_get';
        type_ajax      = 'GET';
        kode_aksi      = 'tcpif_refresh';
        break;

      case 'reset_unit':
        data_input     = '';
        api_url        = 'alm_set.cgi';
        controller_url = 'settings/action_post';
        type_ajax      = 'POST';
        kode_aksi      = 'reset_unit';
    }

    $.ajax({
        url: 'settings/action_post',
        type: 'POST',
        data: {
                data_send: data_input,
                url: api_url,
                kode: kode_aksi,
                type: type_ajax
              },
        
        dataType: "JSON",
        success: function(result)
        {
            if(result.status){
                $('#exampleModal').modal('hide');
                notifSuccess(result.message);
                
            }else{

                $('#exampleModal').modal('hide');
                notifError();

                // for(var i = 0; i < result.inputerror.length; i++)
                // {
                //     $('[name ="'+result.inputerror[i]+'" ]').addClass('is-invalid');
                //     $('[name="'+result.inputerror[i]+'"]').next().text(result.texterror[i]);
                // }
            }
           
        },
        error: function (jqXHR, textStatus, errorThrown)
        { 
            $('#exampleModal').modal('hide');
            notifError();
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