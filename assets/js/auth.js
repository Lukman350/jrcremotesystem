$(document).ready(function () {

    $(".form-login").change(function() {
        var name = $(this).attr("name");

        $('[for ="'+name+'" ]').removeClass('text-danger');
        $(this).removeClass('is-invalid');
        $(this).next().empty();
    });

    $(".form-registrasi").change(function() {
        var name = $(this).attr("name");

        $('[for ="'+name+'" ]').removeClass('text-danger');
        $(this).next().empty();
        $(this).removeClass('border-danger');
        $(this).addClass('border-primary');
    });
});

function login()
{
    $.ajax({
        url: 'login/action_login',
        type: 'POST',
        data: $('#formLogin').serialize(),
        dataType: "JSON",
        success: function(result)
        {
            console.log(result)
            if(result.status){

                notifSuccess(result);
                setTimeout(function(){
                    window.location.href = 'main';
                }, 500);

            }else{

                notifSuccess(result);
                if(result.inputerror.length > 0){
                    for(var i = 0; i < result.inputerror.length; i++)
                    {
                        $('[for ="'+result.inputerror[i]+'" ]').addClass('text-danger');
                        $('[name ="'+result.inputerror[i]+'" ]').addClass('is-invalid');
                        $('[name="'+result.inputerror[i]+'"]').next().text(result.texterror[i]);
                    }
                }
            }
        },
        error: function (jqXHR, textStatus, errorThrown)
        { 
            notifError(); 
        }
    });
}

function register()
{
    $.ajax({
        url: 'action_register',
        type: 'POST',
        data: $('#formRegister').serialize(),
        dataType: "JSON",
        success: function(result)
        {
            if(result.status){
                console.log('koko')
                
                notifSuccess(result);

                // setTimeout(function(){
                //     // $('#loading').modal('hide');
                // }, 500);
                
            }else{
                notifSuccess(result);

                if(result.inputerror){
                    for(var i = 0; i < result.inputerror.length; i++)
                    {
                        $('[for ="'+result.inputerror[i]+'" ]').addClass('text-danger');
                        $('[name ="'+result.inputerror[i]+'" ]').removeClass('border-primary');
                        $('[name ="'+result.inputerror[i]+'" ]').addClass('border-danger');
                        $('[name="'+result.inputerror[i]+'"]').next().text(result.texterror[i]);
                    }
                }

                // setTimeout(function(){
                //     // $('#loading').modal('hide');
                // }, 1000);
            }
           
        },
        error: function (jqXHR, textStatus, errorThrown)
        { 
            console.log('gagal')
            // notifError();
            // setTimeout(function(){
            //     $('#loading').modal('hide');
            // }, 1000);
             
        }
    });
}

function forgot()
{
    $.ajax({
        url: '../auth/action_forgot',
        type: 'POST',
        data: $('#formForgot').serialize(),
        dataType: "JSON",
        success: function(result)
        {
            if(result.status){
               
                notifSuccess(result);

                setTimeout(function(){
                    window.location.href = '../login';
                }, 2000);
                
            }else{

                if(!result.is_inputerror){
                    notifSuccess(result);
                }else{
                    notifSuccess(result);
                    for(var i = 0; i < result.inputerror.length; i++)
                    {
                        $('[for ="'+result.inputerror[i]+'" ]').addClass('text-danger');
                        $('[name ="'+result.inputerror[i]+'" ]').addClass('is-invalid');
                        $('[name="'+result.inputerror[i]+'"]').next().text(result.texterror[i]);
                    }
                } 
            }
           
        },
        error: function (jqXHR, textStatus, errorThrown)
        { 
            notifError();
            setTimeout(function(){
                window.location.href = '../login';
            }, 2000);
             
        }
    });
}

function notifSuccess(result)
{
    $.notify({
    // options
    icon: result.icon,
    title: result.title,
    message: result.message
    },{
        // settings
        element: 'body',
        position: null,
        type: result.type,
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