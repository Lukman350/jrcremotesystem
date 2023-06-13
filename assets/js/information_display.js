function action(type)
{
    let api_url;

    switch (type) {
      case 'clear_voip_information':
        api_url    = 'voipinfo_set.cgi';
    }

    $.ajax({
        url: 'information/action',
        type: 'POST',
        data: {
                url: api_url
              },
        dataType: "JSON",
        success: function(result)
        {
            if(result.status){
                notifSuccess(result.message);
            }else{
                notifError();
            }
           
        },
        error: function (jqXHR, textStatus, errorThrown)
        { 
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