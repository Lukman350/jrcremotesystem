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

  public function getRadio($id, $type, $ip)
  {
    $auth = [];

		if (str_contains($type, "VHF")) {
			$auth = ['root', '/admin/'];
		} else if (str_contains($type, "HF")) {
			$auth = ['jrc', 'aaaa', 'digest'];
		} else if (str_contains($type, "NAVTEX")) {
			$auth = ['jrc', 'aaaa'];
		}

		$client = new Client([
			'base_uri'  => 'http://' . $ip,
			'auth'  	=> $auth,
		]);

		try {
			$request = $client->request('GET', '/status_get.cgi', ['connect_timeout' => 3.14]);
			$arrbar = array();
			$code = $request->getStatusCode();
			$body = explode(",", $request->getBody()->getContents());

			if ($body != null) {
				foreach ($body as $value) {
					$exp = explode(":", $value);
					array_push($arrbar, $exp);
				}
		
				$data = array(
					"id" => $id,
					"ip_address" => $ip,
					"type" =>  $type,
          "status" => true,
					"rmt_sw" => str_replace("'", "", $arrbar[0][1]),
					"unit_no" => str_replace("'", "", $arrbar[1][1]),
					"sts_ch" => str_replace("'", "", $arrbar[2][1]),
					"sts_txfreq" => str_replace("'", "", $arrbar[3][1]),
					"sts_rxfreq" => str_replace("'", "", $arrbar[4][1]),
					"sts_po" => str_replace("'", "", $arrbar[5][1]),
					"sts_pow" => str_replace("'", "", $arrbar[6][1]),
					"alm_RxUnitPsFail" => str_replace("'", "", $arrbar[7][1]),
					"alm_TxUnitPsFail" => str_replace("'", "", $arrbar[8][1]),
					"alm_PaUnitPsFail" => str_replace("'", "", $arrbar[9][1]),
					"alm_CtrlUnitPsFail" => str_replace("'", "", $arrbar[10][1]),
					"alm_PsUnitFail" => str_replace("'", "", $arrbar[11][1]),
					"alm_TxOutputFail" => str_replace("'", "", $arrbar[12][1]),
					"alm_RxPllUnlock" => str_replace("'", "", $arrbar[13][1]),
					"alm_TxPllUnlock" => str_replace("'", "", $arrbar[14][1]),
					"alm_PaTempFail" => str_replace("'", "", $arrbar[15][1]),
					"alm_FanFail" => str_replace("'", "", $arrbar[16][1]),
					"alm_PfPowerFail" => str_replace("'", "", $arrbar[17][1]),
					"alm_PaPowerFial" => str_replace("'", "", $arrbar[18][1]),
					"sts_rx_pkt" => str_replace("'", "", $arrbar[19][1]),
					"sts_rx_delay_pkt" => str_replace("'", "", $arrbar[20][1]),
					"sts_rx_loss_pkt" => str_replace("'", "", $arrbar[21][1]),
					"sts_fifo_over" => str_replace("'", "", $arrbar[22][1]),
					"sts_fifo_under" => str_replace("'", "", $arrbar[23][1]),
					"sts_jitter" => str_replace("'", "", $arrbar[24][1]),
					"sts_max_jitter" => str_replace("'", "", $arrbar[25][1]),
					"sts_skew" => str_replace("'", "", $arrbar[26][1]),
					"sts_max_skew" => str_replace("'", "", $arrbar[27][1]),
					"sts_jit_usage" => str_replace("'", "", $arrbar[28][1]),
					"sts_frqerr" => str_replace("'", "", $arrbar[29][1]),
					"sts_rate_control" => str_replace("'", "", $arrbar[30][1]),
					"sts_rate_count" => str_replace("'", "", $arrbar[31][1]),
					"sts_main" => str_replace("'", "", $arrbar[32][1]),
					"sts_mcdsp" => str_replace("'", "", $arrbar[33][1]),
					"sts_vdsp" => str_replace("'", "", $arrbar[34][1]),
					"sts_fpga" => str_replace("'", "", $arrbar[35][1]),
					"sts_cpu" => str_replace("'", "", $arrbar[36][1]),
					"sts_mac" => $arrbar[37][1] . ':' . $arrbar[37][2] . ':' . $arrbar[37][3] . ':' . $arrbar[37][4] . ':' . $arrbar[37][5] . ':' . $arrbar[37][6],
					"sts_tone" => str_replace("'", "", $arrbar[38][1]),
				);

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
