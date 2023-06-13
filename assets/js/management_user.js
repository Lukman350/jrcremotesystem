$(document).ready(function () {

    $(".form-control").change(function() {

        var namaField = $(this).attr("name");
        $('[for ="'+namaField+'" ]').removeClass('text-danger');
        $('[for ="'+namaField+'" ]').addClass('text-primary');

        $(this).removeClass('border-danger');
        $(this).addClass('border-primary');
        $(this).next().empty();
    });

    /* Datatables */
    $('#table-contents').DataTable();
    create_table();

    click_edit_button();
    click_delete_button();

});

function create_table()
{
    $('#table-contents').DataTable().destroy();

    /* Datatable */
    table = $('#table-contents').DataTable({
        "iDisplayLength": 10,
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "columnDefs":
        [
            { "targets": [0], "data": 'nomor', "searchable": false, "orderable": false, "width": "5%", "class": "number" },
            { "targets": [1], "data": 'nama_lengkap', "width": "25%" },
            { "targets": [2], "data": 'username', "width": "10%" },
            { "targets": [3], "data": 'email', "width": "15%" },
            {
                "targets": [4], "data": 'role', "width": "10%",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    sText = sData == 1 ? 'Supervisor' : 'Staff';
                    $(nTd).html(sText);
                }
            },
            {
                "targets": [5], "data": 'status_user', "width": "10%",
                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                    sText = sData == 1 ? 'Aktif' : 'Non Aktif';
                    $(nTd).html(sText);
                }
            },
            {
                "targets": [6],
                "className": "text-center",
                "width": "15%",
                "searchable": false,
                "orderable": false,
                "data": null,
                "defaultContent": assign_button_action(),
                "fnCreateCell": function (nTd, sData, oData, iRow, iCol) {
                    $(".tooltip-button", nTd).tooltip({
                        selector: "[data-toggle=tooltip]",
                        container: "body"
                    });
                }
            }
        ],
        "order": [[1, "asc"]],
        "oLanguage": { "sProcessing": loader },
        "processing": true,
        "serverSide": true,
        "autoWidth": true,
        "searching": true,
        "ajax": {
            "url": 'managementuser/getDataTable',
            "type": "POST",
        },
    });

    /* Untuk nomor urut di datatable */
    $("#table-contents").on('draw.dt', function(){
    let n = 1;
    $("td.number").each(function () {
            $(this).html(n++);
        })
    })
}

function loader() 
{
    var load = "<i class=\'fa fa-spinner fa-3x fa-spin\'></i>";
    return load;
}

function assign_button_action() 
{
    var btn = '<button type=\"button\" id=\"Edit\" class=\"btn btn-success btn-border btn-xs\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Ubah\"><i class=\"fa fa-edit\"></i></button>' 
    + '&nbsp;&nbsp;' + '<button type=\"button\" id=\"Delete\" class=\"btn btn-danger btn-border btn-xs\" data-toggle=\"tooltip\" data-placement=\"right\" title=\"Hapus\"><i class=\"fa fa-trash\"></i></button>';

    return btn;
}

function openModalAdd()
{
    $('#modalAdd').modal('show');
    $('#title').text('Tambah User');
    $('#formModalAdd')[0].reset();

    //Untuk Label
    $('#formModalAdd').find('label').removeClass('text-danger');
    $('#formModalAdd').find('label').addClass('text-primary');

    $('#formModalAdd').find('.form-control').removeClass('border-danger');
    $('#formModalAdd').find('.form-control').addClass('border-primary');

	$('.help-block').empty(); // clear error string
    $('#id_user').val('');
    $('#username').prop('readonly', false);

}

function openModalEdit(id)
{
    $('#modalAdd').modal('show');
    $('#title').text('Ubah User');
    $('.text-label').removeClass('text-danger');
   	$('.form-control').removeClass('is-invalid');
	$('.help-block').empty();
    $('#username').prop('readonly', true);

    $.ajax({
        url: 'managementuser/tampilFormData',
        data: {
            id: id,
        },
        method: "POST",
        dataType: "JSON",
        success: function (data) {
            //Menampilkan data dari db ke modal
            $("#id_user").val(data.id);
            $("#nama_lengkap").val(data.nama_lengkap);
            $("#username").val(data.username);
            $("#email").val(data.email);
            $("#role").val(data.role);
            $("#status_user").val(data.status_user);
        },
    });
}

function openModalDelete(id)
{
    $('#modalDelete').modal('show');
    $('#id_hapus').val(id);
}

function save()
{
    $.ajax({
        url: 'managementuser/save',
        type: 'POST',
        data: $('#formModalAdd').serialize(),
        dataType: "JSON",
        success: function(result)
        {
            if(result.status){
                $('#modalAdd').modal('hide');
                notifSuccess(result);

                setTimeout(function(){
                    window.location.href = 'managementuser';//Kembali ke controller mahasiswa/index
                }, 500);
                
            }else{

                for(var i = 0; i < result.inputerror.length; i++)
                {
                    //Untuk Label
                    $('[for ="'+result.inputerror[i]+'" ]').removeClass('text-primary');
                    $('[for ="'+result.inputerror[i]+'" ]').addClass('text-danger');

                    //Untuk Input text
                    $('[name ="'+result.inputerror[i]+'" ]').removeClass('border-primary');
                    $('[name ="'+result.inputerror[i]+'" ]').addClass('border-danger');

                    $('[name="'+result.inputerror[i]+'"]').next().text(result.texterror[i]);
                }
            }
           
        },
        error: function (jqXHR, textStatus, errorThrown)
        { 
            notifError();     
            $('#modalAdd').modal('hide');
        }
    });
}

function hapus()
{
    $.ajax({
        url: "managementuser/hapus",
        data: {
            id: $('#id_hapus').val(),
        },
        method: "POST",
        dataType: "JSON",
        beforeSend: function() {  
            $('#modalDelete').modal('hide');
        },
        success: function (data) {
            
            notifSuccess(data);

            setTimeout(function(){
                window.location.href = 'managementuser';//Kembali ke controller mahasiswa/index
            }, 500);

        },
    });
}

function notifSuccess(data)
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

function notifError()
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

function click_edit_button()
{
    $('#table-contents').on('click', '#Edit', function () {
        let data  = table.row($(this).parents('tr')).data();
        openModalEdit(data.id);
    });
}

function click_delete_button()
{
    $('#table-contents').on('click', '#Delete', function () {
        let data = table.row($(this).parents('tr')).data();
        openModalDelete(data.id);
    });
}