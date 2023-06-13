<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use GuzzleHttp\Client;

class Settings extends CI_Controller {
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
		$data['JS'] 			= 'settings_display.js';

		$page['sidebar'] 		= $this->load->view('templates/sidebar', $data, TRUE);
		$page['content'] 		= $this->load->view('content/settings_display', $data, TRUE);

		$this->load->view('templates/layout', $page);
	}

	public function action_post()
	{
		$data_input = $this->input->post('data_send', true);
		$url_api 	= $this->input->post('url');
		$kode 	 	= $this->input->post('kode');
		$type 	 	= $this->input->post('type'); //POST or GET

		switch ($kode) {
		  case "voip_set":
		    $text = 'Voip settings is succesfully changed';
		    $data = str_replace("=", ":", str_replace("&", ";", $data_input)) . ';';
		    break;
		  case "voip_refresh":
		    $text = 'Refresh Voip settings is succesfully';
		    $data = $data_input;
		    break;
		  case "tcpif_set":
		    $text = 'TCP I/F settings is succesfully changed';
		    $data = str_replace("=", ":", str_replace("&", ";", $data_input)) . ';';
		    break;
		  case "tcpif_refresh":
		    $text = 'Refresh TCP I/F settings is succesfully';
		    $data = $data_input;
		   	break;
		  case "reset_unit":
		    $text = 'Reset unit alarm is successfully';
		    $data = $data_input;
		   	break;
		  default:
		    $text = 'Reset alarm successfully';
		    $data = $data_input;
		}

		$response = $this->_client->request($type, $url_api, [
			'headers' => ['Content-Type' => 'text/plain'],
			'body'    => $data
		]);

		$notif_data = [
		  'status'   => TRUE,
		  'message'  => $text
		];
	
		echo json_encode($notif_data);

		// var_dump($response->getBody()->getContents());
		// $result = $response->getBody()->getContents();
		// return $result;
	}

	public function action_get()
	{
		$data     = $this->input->post('data_send', true);
		$url_api  = $this->input->post('url');
		
		$response = $this->_client->request('GET', $url_api);

		$expresponse = explode( ",", $response->getBody()->getContents() );
		var_dump($expresponse);
		die;

		// $result = json_decode($response->getBody()->getContents(), true);
		// var_dump($result);
	}
}
