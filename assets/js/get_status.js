$(document).ready(function () {

    // setInterval(
    //     function(){

    //         // get_status(); 

    //     }, 3000);

});

function get_status()
{
    $.ajax({
        url: 'main/action_get',
        type: 'POST',
        dataType: "JSON",
        success: function(result)
        {
            showCardValue(result)
            showAlarmNotif(result)
            showMainForm(result)
            showTestForm(result)
            showInformationForm(result)

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

function showCardValue(data)
{
    //Card Info -> Status
    $('#channel_info').text(data.sts_ch_value);
    $('#txfreq_info').text(data.sts_txfreq_value);
    $('#rxfreq_info').text(data.sts_rxfreq_value);
    $('#outputpower_info').text(data.power_output_value);
}

function showAlarmNotif(data)
{
    checkAlarmError(data.alm_RxUnitPsFail_value, 'alm_RxUnitPsFail');
    checkAlarmError(data.alm_TxUnitPsFail_value, 'alm_TxUnitPsFail');
    checkAlarmError(data.alm_PaUnitPsFail_value, 'alm_PaUnitPsFail');
    checkAlarmError(data.alm_CtrlUnitPsFail_value, 'alm_CtrlUnitPsFail');
    checkAlarmError(data.alm_PsUnitFail_value, 'alm_PsUnitFail');
    checkAlarmError(data.alm_TxOutputFail_value, 'alm_TxOutputFail');

    checkAlarmError(data.alm_RxPllUnlock_value, 'alm_RxPllUnlock');
    checkAlarmError(data.alm_TxPllUnlock_value, 'alm_TxPllUnlock');
    checkAlarmError(data.alm_PaTempFail_value, 'alm_PaTempFail');
    checkAlarmError(data.alm_FanFail_value, 'alm_FanFail');
    checkAlarmError(data.alm_PfPowerFail_value, 'alm_PfPowerFail');
    checkAlarmError(data.alm_PaPowerFail_value, 'alm_PaPowerFail');
}

function checkAlarmError(data_check, id_alarm)
{
    if(data_check == 1){
        $('#'+id_alarm).removeClass('btn-success');
        $('#'+id_alarm).addClass('btn-danger');
    }else{
        $('#'+id_alarm).removeClass('btn-danger');
        $('#'+id_alarm).addClass('btn-success');
    }
}

function showMainForm(data)
{
    // if(data.power_reduction_value === 'MED'){
    //     var powerreduction = 'M';
    // }else if(data.power_reduction_value === 'HI'){
    //     var powerreduction = 'H';
    // }

    // if(data.sts_sq_sel_value === 'Carrier'){
    //     var sqselect = 'N';
    // }else if(data.sts_sq_sel_value === 'Noise'){
    //     var sqselect = 'C';
    // }

    //Operation
    // $('#channelinput').val(data.sts_ch_value);
    // $('#powerselect').val(powerreduction);
    // $('#sqselect').val(sqselect);

    // $('#sqlevelinput').val(data.sts_ch_value);
    // $('#squplimitinput').val(data.sts_ch_value);
}

function showTestForm(data)
{
    //Test Tone Output
    $('#statusinput').val(data.sts_tone_value);
}

function showSettingsForm(data)
{

}

function showInformationForm(data)
{
    //Voip Information
    $('#rxpacketinput').val(data.sts_rx_pkt_value);
    $('#rxdelayinput').val(data.sts_rx_delay_pkt_value);
    $('#rxlossinput').val(data.sts_rx_loss_pkt_value);
    $('#fifooverflowinput').val(data.sts_fifo_over_value);
    $('#fifounderflowinput').val(data.sts_fifo_under_value);
    $('#jitterinput').val(data.sts_jitter_value);
    $('#maxjitterinput').val(data.sts_max_jitter_value);
    $('#skewinput').val(data.sts_skew_value);
    $('#maxskewinput').val(data.sts_max_skew_value);
    $('#jitterbufferinput').val(data.sts_jit_usage_value);
    $('#samplingrateinput').val(data.sts_frqerr_value);
    $('#ratecontrolinput').val(data.sts_rate_control_value);
    $('#ratecountinput').val(data.sts_rate_count_value);

    //Version
    $('#maininput').val(data.sts_main_value);
    $('#mcdspinput').val(data.sts_mcdsp_value);
    $('#vdspinput').val(data.sts_vdsp_value);
    $('#fpgainput').val(data.sts_fpga_value);
    $('#cpuinput').val(data.sts_cpu_value);
    
    //MAC Address
    $('#macinput').val(data.sts_mac_value);
}

