<?php
defined('BASEPATH') or exit('No direct script access allowed');

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\RequestException;

class M_Radio extends CI_model
{
  public function getAllRadio()
  {
    $query = $this->db->query("SELECT * FROM radio");
    return $query->result_array();
  }

  public function getRadio($data = [])
  {
    $auth = [];
    $endpoint = '';

    $id = $data['id'];
    $type = $data['type'];
    $name = $data['name'];
    $ip = $data['ip_address'];

		if (str_contains($type, "VHF") || $type == "VHF") {
			$auth = ['root', '/admin/'];
      $endpoint = '/index_get.cgi';
		} else if (str_contains($type, "HF") || $type == "HF") {
			$auth = ['jrc', 'aaaa', 'digest'];
      $endpoint = '/status_get.cgi';
		} else if (str_contains($type, "NAVTEX") || $type == "NAVTEX") {
			$auth = ['jrc', 'aaaa', 'digest'];
      $endpoint = '/status_get.cgi';
		}

		$client = new Client([
			'base_uri'  => 'http://' . $ip,
			'auth'  	=> $auth,
		]);

		try {
			$request = $client->request('GET', $endpoint, ['connect_timeout' => 3.14]);
			$arrbar = array();
			$code = $request->getStatusCode();
			$body = explode(",", $request->getBody()->getContents());

			if ($body != null) {
				foreach ($body as $value) {
					$exp = explode(":", $value);
					array_push($arrbar, $exp);
				}
		
				$data = [];
        
        if (str_contains($type, "HF") && $type == "HF") {
          $data = [
            "id" => $id,
            "ip_address" => $ip,
            "type" =>  $type,
            "status" => true,
            "name" => $name,
            "rmt_sw" => str_replace("'", "", $arrbar[0][1]),
            "unit_no" => str_replace("'", "", $arrbar[1][1]),
            "sts_ch" => str_replace("'", "", $arrbar[2][1]),
            "sts_freq" => str_replace("'", "", $arrbar[3][1]),
            "sts_em" => str_replace("'", "", $arrbar[4][1]),
            "sts_swr" => str_replace("'", "", $arrbar[5][1]),
            "sts_po" => str_replace("'", "", $arrbar[6][1]),
            "sts_pf" => str_replace("'", "", $arrbar[7][1]),
            "sts_pr" => str_replace("'", "", $arrbar[8][1]),
            "sts_pow" => str_replace("'", "", $arrbar[9][1]),
            "sts_test" => str_replace("'", "", $arrbar[10][1]),
            "sts_pa" => str_replace("'", "", $arrbar[11][1]),
            "sts_tune" => str_replace("'", "", $arrbar[12][1]),
            "sts_cal" => str_replace("'", "", $arrbar[13][1]),
            "alm_AmuUnmatch" => str_replace("'", "", $arrbar[14][1]),
            "alm_LevelMax" => str_replace("'", "", $arrbar[15][1]),
            "alm_LevelMin" => str_replace("'", "", $arrbar[16][1]),
            "alm_PowerDown" => str_replace("'", "", $arrbar[17][1]),
            "alm_MuDetune" => str_replace("'", "", $arrbar[18][1]),
            "alm_PaCombine1" => str_replace("'", "", $arrbar[19][1]),
            "alm_SoftInterlock" => str_replace("'", "", $arrbar[20][1]),
            "alm_PaFail1" => str_replace("'", "", $arrbar[21][1]),
            "alm_MuManual" => str_replace("'", "", $arrbar[22][1]),
            "alm_KeyInterlock" => str_replace("'", "", $arrbar[23][1]),
            "alm_AmuBusy" => str_replace("'", "", $arrbar[24][1]),
            "alm_KeyTrip" => str_replace("'", "", $arrbar[25][1]),
            "alm_ExciterAlarm" => str_replace("'", "", $arrbar[26][1]),
            "alm_AmuFail" => str_replace("'", "", $arrbar[27][1]),
            "alm_PsOverVoltage" => str_replace("'", "", $arrbar[28][1]),
            "alm_PsOverCurrent" => str_replace("'", "", $arrbar[29][1]),
            "alm_FuseBlown" => str_replace("'", "", $arrbar[30][1]),
            "alm_PaCombine2" => str_replace("'", "", $arrbar[31][1]),
            "alm_DrvAmpFail" => str_replace("'", "", $arrbar[32][1]),
            "alm_PaFail2" => str_replace("'", "", $arrbar[33][1]),
            "alm_TuneFail" => str_replace("'", "", $arrbar[34][1]),
            "alm_AntVswr" => str_replace("'", "", $arrbar[35][1]),
            "alm_Local" => str_replace("'", "", $arrbar[36][1]),
            "alm_LineError" => str_replace("'", "", $arrbar[37][1]),
            "sts_tone" => str_replace("'", "", $arrbar[38][1]),
          ];
        } else if (str_contains($type, "NAVTEX") || $type == "NAVTEX") {
          $data = [
            "id" => $id,
            "ip_address" => $ip,
            "type" =>  $type,
            "status" => true,
            "name" => $name,
            "rmt_sw" => str_replace("'", "", $arrbar[0][1]),
            "unit_no" => str_replace("'", "", $arrbar[1][1]),
            "sts_ch" => str_replace("'", "", $arrbar[2][1]),
            "sts_freq" => str_replace("'", "", $arrbar[3][1]),
            "sts_em" => str_replace("'", "", $arrbar[4][1]),
            "sts_swr" => str_replace("'", "", $arrbar[5][1]),
            "sts_po" => str_replace("'", "", $arrbar[6][1]),
            "sts_pf" => str_replace("'", "", $arrbar[7][1]),
            "sts_pr" => str_replace("'", "", $arrbar[8][1]),
            "sts_pow" => str_replace("'", "", $arrbar[9][1]),
            "sts_test" => str_replace("'", "", $arrbar[10][1]),
            "sts_key" => str_replace("'", "", $arrbar[11][1]),
            "sts_pa" => str_replace("'", "", $arrbar[12][1]),
            "sts_tune" => str_replace("'", "", $arrbar[13][1]),
            "sts_cal" => str_replace("'", "", $arrbar[14][1]),
            "alm_AmuUnmatch" => str_replace("'", "", $arrbar[15][1]),
            "alm_LevelMax" => str_replace("'", "", $arrbar[16][1]),
            "alm_LevelMin" => str_replace("'", "", $arrbar[17][1]),
            "alm_PowerDown" => str_replace("'", "", $arrbar[18][1]),
            "alm_MuDetune" => str_replace("'", "", $arrbar[19][1]),
            "alm_PaCombine1" => str_replace("'", "", $arrbar[20][1]),
            "alm_SoftInterlock" => str_replace("'", "", $arrbar[21][1]),
            "alm_PaFail1" => str_replace("'", "", $arrbar[22][1]),
            "alm_KeyInterlock" => str_replace("'", "", $arrbar[23][1]),
            "alm_AmuBusy" => str_replace("'", "", $arrbar[24][1]),
            "alm_KeyTrip" => str_replace("'", "", $arrbar[25][1]),
            "alm_ExciterAlarm" => str_replace("'", "", $arrbar[26][1]),
            "alm_AmuFail" => str_replace("'", "", $arrbar[27][1]),
            "alm_PsOverVoltage" => str_replace("'", "", $arrbar[28][1]),
            "alm_PsOverCurrent" => str_replace("'", "", $arrbar[29][1]),
            "alm_FuseBlown" => str_replace("'", "", $arrbar[30][1]),
            "alm_PaCombine2" => str_replace("'", "", $arrbar[31][1]),
            "alm_DrvAmpFail" => str_replace("'", "", $arrbar[32][1]),
            "alm_PaFail2" => str_replace("'", "", $arrbar[33][1]),
            "alm_TuneFail" => str_replace("'", "", $arrbar[34][1]),
            "alm_AntVswr" => str_replace("'", "", $arrbar[35][1]),
            "alm_Local" => str_replace("'", "", $arrbar[36][1]),
            "alm_LineError" => str_replace("'", "", $arrbar[37][1]),
            "sts_tone" => str_replace("'", "", $arrbar[38][1]),
          ];
        } else if (str_contains($type, "VHF") || $type == "VHF") {
          $data = [
            "id" => $id,
            "ip_address" => $ip,
            "type" =>  $type,
            "status" => true,
            "name" => $name,
            "rmt_sw" => str_replace("'", "", $arrbar[0][1]),
            "unit_no" => str_replace("'", "", $arrbar[1][1]),
            "sts_ch" => str_replace("'", "", $arrbar[2][1]),
            "sts_txfreq" => str_replace("'", "", $arrbar[3][1]),
            "sts_rxfreq" => str_replace("'", "", $arrbar[4][1]),
            "sts_po" => str_replace("'", "", $arrbar[5][1]),
            "ch" => str_replace("'", "", $arrbar[6][1]),
            "sts_pow" => str_replace("'", "", $arrbar[7][1]),
            "sq_lvl" => str_replace("'", "", $arrbar[8][1]),
            "sq_uplim" => str_replace("'", "", $arrbar[9][1]),
            "alm_RxUnitPsFail" => str_replace("'", "", $arrbar[10][1]),
            "alm_TxUnitPsFail" => str_replace("'", "", $arrbar[11][1]),
            "alm_PaUnitPsFail" => str_replace("'", "", $arrbar[12][1]),
            "alm_CtrlUnitPsFail" => str_replace("'", "", $arrbar[13][1]),
            "alm_PsUnitFail" => str_replace("'", "", $arrbar[14][1]),
            "alm_TxOutputFail" => str_replace("'", "", $arrbar[15][1]),
            "alm_RxPllUnlock" => str_replace("'", "", $arrbar[16][1]),
            "alm_TxPllUnlock" => str_replace("'", "", $arrbar[17][1]),
            "alm_PaTempFail" => str_replace("'", "", $arrbar[18][1]),
            "alm_FanFail" => str_replace("'", "", $arrbar[19][1]),
            "alm_PfPowerFail" => str_replace("'", "", $arrbar[20][1]),
            "alm_PaPowerFial" => str_replace("'", "", $arrbar[21][1]),
            "sts_rx_pkt" => str_replace("'", "", $arrbar[22][1]),
            "sts_rx_delay_pkt" => str_replace("'", "", $arrbar[23][1]),
            "sts_rx_loss_pkt" => str_replace("'", "", $arrbar[24][1]),
            "sts_fifo_over" => str_replace("'", "", $arrbar[25][1]),
            "sts_fifo_under" => str_replace("'", "", $arrbar[26][1]),
            "sts_jitter" => str_replace("'", "", $arrbar[27][1]),
            "sts_max_jitter" => str_replace("'", "", $arrbar[28][1]),
            "sts_skew" => str_replace("'", "", $arrbar[29][1]),
            "sts_max_skew" => str_replace("'", "", $arrbar[30][1]),
            "sts_jit_usage" => str_replace("'", "", $arrbar[31][1]),
            "sts_frqerr" => str_replace("'", "", $arrbar[32][1]),
            "sts_rate_control" => str_replace("'", "", $arrbar[33][1]),
            "sts_rate_count" => str_replace("'", "", $arrbar[34][1]),
            "sts_main" => str_replace("'", "", $arrbar[35][1]),
            "sts_mcdsp" => str_replace("'", "", $arrbar[36][1]),
            "sts_vdsp" => str_replace("'", "", $arrbar[37][1]),
            "sts_fpga" => str_replace("'", "", $arrbar[38][1]),
            "sts_cpu" => str_replace("'", "", $arrbar[39][1]),
            "sts_mac" => $arrbar[40][1] . ':' . $arrbar[40][2] . ':' . $arrbar[40][3] . ':' . $arrbar[40][4] . ':' . $arrbar[40][5] . ':' . $arrbar[40][6],
            "sts_tone" => str_replace("'", "", $arrbar[41][1])
          ];
        }

				if ($code == 200) {
					$notif_data = [
						'status'  => TRUE,
						'message' => 'Radio data found',
						'data'    => $data,
					];
				} else {
					$notif_data = [
						'status'  => FALSE,
						'message' => 'Radio data not found',
						'data' => [
							"id" => $id,
							"ip_address" => $ip,
							"type" =>  $type,
              "status" => false,
              "name" => $name,
						]
					];
				}
			}
			
			return $notif_data;
		} catch (ConnectException $error) {
			$notif_data = [
				'status'  => FALSE,
				'message' => $error->getMessage(),
				'data' => [
					"id" => $id,
					"ip_address" => $ip,
					"type" =>  $type,
          "status" => false,
          "name" => $name,
				]
			];

			log_message('error', $error->getMessage());
			
			return $notif_data;
		} catch (RequestException $error) {
			$notif_data = [
				'status'  => FALSE,
				'message' => $error->getMessage(),
				'data' => [
					"id" => $id,
					"ip_address" => $ip,
					"type" =>  $type,
          "status" => false,
          "name" => $name,
				]
			];

			log_message('error', $error->getMessage());

			return $notif_data;
		}
  }

  public function getRadioByColumn($column)
  {
    $query = $this->db->query("SELECT $column FROM radio");
    return $query->result_array();
  }

  public function insertRadio($data)
  {
    $this->db->insert('radio', $data);
  }

  public function updateRadio($newData, $id, &$affectedRows)
  {
    $this->db->where('id', $id);
    $this->db->update('radio', $newData);

    $affectedRows = [
      'affected_rows' => $this->db->affected_rows()
    ];
  }
}
