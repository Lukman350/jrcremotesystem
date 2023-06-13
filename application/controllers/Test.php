<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use GuzzleHttp\Client;

class Test extends CI_Controller {

	private $client;

	public function __construct()
	{
		parent::__construct();
		$this->_client = new Client([
			'base_uri'  => 'http://192.168.1.100/',
			'auth'  	=> ['root', '/admin/']
		]);

	}

	public function index()
	{
		$data['title'] 			= 'JRC Remote System';
		$data['JS'] 			= 'test_display.js';

		$page['sidebar'] 		= $this->load->view('templates/sidebar', $data, TRUE);
		$page['content'] 		= $this->load->view('content/test_display', $data, TRUE);

		$this->load->view('templates/layout', $page);
	}

	public function action_post()
	{
		$data_input = $this->input->post('data_send', true);
		$url_api 	= $this->input->post('url');
		$kode 	 	= $this->input->post('kode');

		switch ($kode) {
		  case "test_tone_start":
		    $text = 'Test tone output is started';
		    $data = str_replace("=", ":", str_replace("&", ";", $data_input)) . ';';
		    break;
		  case "test_tone_stop":
		    $text = 'Test tone output is stopped';
		    $data = $data_input;
		    break;
		  case "voip_loop_start":
		    $text = 'Test voip loop back is started';
		    $data = str_replace("=", ":", str_replace("&", ";", $data_input)) . ';';
		    break;
		  case "voip_loop_stop":
		    $text = 'Test voip loop back is stopped';
		    $data = $data_input;
		   	break;
		  case "reset_unit_normal":
		    $text = 'Normal unit type has successfully to reset';
		    $data = $data_input;
		   	break;
	   	  case "reset_unit_local":
		    $text = 'Local unit type has successfully to reset';
		    $data = $data_input;
		   	break;
	   	  case "reset_unit_master":
		    $text = 'Master unit type has successfully to reset';
		    $data = $data_input;
		   	break;
		  default:
		    $text = 'Reset alarm successfully';
		    $data = $data_input;
		}

		$response = $this->_client->request('POST', $url_api, [
			'headers' => ['Content-Type' => 'text/plain'],
			'body'    => $data
		]);

		$notif_data = [
		  'status'  => TRUE,
		  'message' => $text
		];
	
		echo json_encode($notif_data);

		// var_dump($response->getBody()->getContents());
		// $result = $response->getBody()->getContents();
		// return $result;
	}
}
