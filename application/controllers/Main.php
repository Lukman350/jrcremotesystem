<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Main extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model('M_Radio', 'radio');
	}

	public function index()
	{
		$data['title'] 			= 'Radio Remote System';
		$data['JS'] 			= ['RadioTemplate.js', 'main_display.js'];
		$data['CSS'] 				= ['main_display.css'];
		$radio = $this->radio->getAllRadio();

		$radio_length = count($radio);

		$response = [];
		for ($i = 0; $i < $radio_length; $i++) {
			$response[$i] = $this->radio->getRadio([
				'id' => $radio[$i]['id'],
				'type' => $radio[$i]['type'],
				'name' => $radio[$i]['name'],
				'ip_address' => $radio[$i]['ip_address']
			]);
		}

		$data['response'] = $response;

		$data['modal'] 			= $this->load->view('modals/main_modal', $data, TRUE);
		$data['radio_modal'] = $this->load->view('modals/radio_modal', $data, TRUE);
		$page['sidebar'] 		= $this->load->view('templates/sidebar', $data, TRUE);
		$page['content'] 		= $this->load->view('content/main_display', $data, TRUE);

		$this->load->view('templates/layout', $page);
	}

	public function get_radio()
	{
		$notif_data = [];

		$radio_id = $_POST['id'];
		$ip_address = $_POST['ip_address'];
		$name = $_POST['name'];
		$type = $_POST['type'];

		$data = [
			'id' => $radio_id,
			'ip_address' => $ip_address,
			'type' => $type,
			'name' => $name
		];

		if (!isset($radio_id)) {
			$notif_data = [
				'status'  => FALSE,
				'message' => 'Radio ID not found'
			];

			echo json_encode($notif_data);
			die;
		}

		$radio_data = $this->radio->getRadio($data);

		if ($radio_data) {
			$notif_data = $radio_data;
		} else {
			$notif_data = $radio_data;
		}

		echo json_encode($notif_data);
	}

	public function action_post()
	{
		$data    = $this->input->post('data_send', true);
		$url_api = $this->input->post('url');
		$kode 	 = $this->input->post('kode');

		// var_dump($data);
		// die;

		$this->validation($data, $kode);

		switch ($kode) {
			case "channel":

				$this->update_data('channel', $data);
				$text = 'Channel changed successfully';
				break;
			case "powerreduction":

				$this->update_data('power_reduction', $data);
				$text = 'Power reduction changed successfully';
				break;
			case "sqselect":

				$this->update_data('sq_select', $data);
				$text = 'SQ value changed successfully';
				break;
			case "sqlevel":

				$this->update_data('sq_level', $data);
				$text = 'SQ level changed successfully';
				break;
			case "squplimit":

				$this->update_data('sq_up_limit', $data);
				$text = 'SQ up limit changed successfully';
				break;
			default:
				$text = 'Reset alarm successfully';
		}

		// $action = $this->_client->request('POST', $url_api, [

		// 	'headers' => ['Content-Type' => 'text/plain'],
		// 	'body'    => $data

		// ]);

		$notif_data = [
			'status'  => TRUE,
			'message' => $text
		];

		echo json_encode($notif_data);

		// var_dump($action->getBody()->getContents());
		// $result = $action->getBody()->getContents();
		// return $result;
	}

	public function update_data($keyword, $data)
	{
		$id_user = $this->session->userdata('id');

		$this->db->set($keyword, $data);
		$this->db->set('created_by', $id_user);
		$this->db->set('created_date', date('Y-m-d H:i:s'));
		$this->db->where('id', 1);
		$this->db->update('content_tb_main');
	}

	public function action_get()
	{
		$arrbar   = array();
		$response = $this->_client[1]->request('GET', 'status_get.cgi');

		$expresponse = explode(",", $response->getBody()->getContents());

		foreach ($expresponse as $value) {
			$exp = explode(":", $value);
			array_push($arrbar, $exp);
		}

		$data = array(
			'remote_value'  	 			=> str_replace("'", "", $arrbar[0][1]), //Remote
			'unit_no_value' 	 			=> str_replace("'", "", $arrbar[1][1]), //Unit No
			'sts_ch_value' 	 	 			=> str_replace("'", "", $arrbar[2][1]), //Channel
			'sts_txfreq_value'   			=> str_replace("'", "", $arrbar[3][1]), //TX Frequency
			'sts_rxfreq_value'   			=> str_replace("'", "", $arrbar[4][1]), //RX Frequency
			'power_output_value' 			=> str_replace("'", "", $arrbar[5][1]), //Output Power
			'power_reduction_value' 		=> str_replace("'", "", $arrbar[6][1]), //Power Reduction
			'sts_sq_sel_value'   			=> str_replace("'", "", $arrbar[7][1]), //SQ Select
			'alm_RxUnitPsFail_value' 		=> str_replace("'", "", $arrbar[8][1]), //Alarms RX UNIT PS FAIL
			'alm_TxUnitPsFail_value' 		=> str_replace("'", "", $arrbar[9][1]), //Alarms TX UNIT PS FAIL
			'alm_PaUnitPsFail_value' 		=> str_replace("'", "", $arrbar[10][1]), //Alarms PA UNIT PS FAIL
			'alm_CtrlUnitPsFail_value' 		=> str_replace("'", "", $arrbar[11][1]), //Alarms CTRL UNIT PS FAIL
			'alm_PsUnitFail_value' 			=> str_replace("'", "", $arrbar[12][1]), //Alarms PS UNIT FAIL
			'alm_TxOutputFail_value' 		=> str_replace("'", "", $arrbar[13][1]), //Alarms TX OUTPUT FAIL
			'alm_RxPllUnlock_value' 		=> str_replace("'", "", $arrbar[14][1]), //Alarms RX PLL UNLOCK
			'alm_TxPllUnlock_value' 		=> str_replace("'", "", $arrbar[15][1]), //Alarms TX PLL UNLOCK
			'alm_PaTempFail_value' 			=> str_replace("'", "", $arrbar[16][1]), //Alarms PA TEMP FAIL
			'alm_FanFail_value' 			=> str_replace("'", "", $arrbar[17][1]), //Alarms FAN FAIL
			'alm_PfPowerFail_value' 		=> str_replace("'", "", $arrbar[18][1]), //Alarms Pf Power FAIL
			'alm_PaPowerFail_value' 		=> str_replace("'", "", $arrbar[19][1]), //Alarms Pr Power FAIL
			'sts_rx_pkt_value' 				=> str_replace("'", "", $arrbar[20][1]), //RX Packets
			'sts_rx_delay_pkt_value' 		=> str_replace("'", "", $arrbar[21][1]), //RX Delay Packets
			'sts_rx_loss_pkt_value' 		=> str_replace("'", "", $arrbar[22][1]), //RX RX Loss Packets
			'sts_fifo_over_value' 			=> str_replace("'", "", $arrbar[23][1]), //FIFO Overflow
			'sts_fifo_under_value' 			=> str_replace("'", "", $arrbar[24][1]), //FIFO Underflow
			'sts_jitter_value' 				=> str_replace("'", "", $arrbar[25][1]), //Jitter
			'sts_max_jitter_value' 			=> str_replace("'", "", $arrbar[26][1]), //Max Jitter
			'sts_skew_value' 				=> str_replace("'", "", $arrbar[27][1]), //Skew
			'sts_max_skew_value' 			=> str_replace("'", "", $arrbar[28][1]), //Max Skew
			'sts_jit_usage_value' 			=> str_replace("'", "", $arrbar[29][1]), //Jitter Buffer
			'sts_frqerr_value' 				=> str_replace("'", "", $arrbar[30][1]), //Sampling Rate Error
			'sts_rate_control_value' 		=> str_replace("'", "", $arrbar[31][1]), //Rate Control
			'sts_rate_count_value' 			=> str_replace("'", "", $arrbar[32][1]), //Rate Controlled Count
			'sts_main_value' 				=> str_replace("'", "", $arrbar[33][1]), //Main Version
			'sts_mcdsp_value' 				=> str_replace("'", "", $arrbar[34][1]), //MCDSP
			'sts_vdsp_value' 				=> str_replace("'", "", $arrbar[35][1]), //VDSP
			'sts_fpga_value' 				=> str_replace("'", "", $arrbar[36][1]), //FPGA
			'sts_cpu_value' 				=> str_replace("'", "", $arrbar[37][1]), //CPU
			'sts_mac_value' 				=> $arrbar[38][1] . ':' . $arrbar[38][2] . ':' . $arrbar[38][3] . ':' . $arrbar[38][4] . ':' . $arrbar[38][5] . ':' . $arrbar[38][6], //MAC
			'sts_tone_value' 				=> str_replace("'", "", $arrbar[39][1]) //Test tone
		);

		echo json_encode($data);
	}

	public function validation($data_input, $kode)
	{
		$data = array();
		$data['inputerror'] = array();
		$data['texterror']  = array();
		$data['status']     = TRUE;

		if ($data_input == '') {

			switch ($kode) {
				case "channel":
					$data['inputerror'][] = 'channelinput';
					$data['texterror'][]  = 'Channel column is required';
					$data['status']       = FALSE;
					break;
				case "powerreduction":
					$text = 'Power reduction changed successfully';
					break;
				case "sqselect":
					$text = 'SQ value changed successfully';
					break;
				case "sqlevel":
					$text = 'SQ level changed successfully';
					break;
				case "squplimit":
					$text = 'SQ up limit changed successfully';
					break;
				default:
					$text = 'Reset alarm successfully';
			}
		}
	}

	private function _sendCurl($url, $method, $headers = [])
	{
		$curl = curl_init();

		curl_setopt_array($curl, [
			CURLOPT_URL => $url,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => "",
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 30,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => $method,
			CURLOPT_HTTPHEADER => $headers,
		]);

		$response = curl_exec($curl);
		$err = curl_error($curl);
		$httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

		curl_close($curl);

		$notif = array();

		if ($err) {
			$notif = [
				'status' => false,
				'message' => $err,
				'code' => $httpcode
			];
		} else {
			$notif = [
				'status' => true,
				'message' => 'Radio data found',
				'data' => $response,
				'code' => $httpcode
			];
		}

		return $notif;
	}
}
