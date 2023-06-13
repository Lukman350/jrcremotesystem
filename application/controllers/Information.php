<?php
defined('BASEPATH') OR exit('No direct script access allowed');

use GuzzleHttp\Client;

class Information extends CI_Controller {

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
		$data['JS'] 			= 'information_display.js';

		$page['sidebar'] 		= $this->load->view('templates/sidebar', $data, TRUE);
		$page['content'] 		= $this->load->view('content/information_display', $data, TRUE);

		$this->load->view('templates/layout', $page);
	}

	public function action()
	{
		$url_api = $this->input->post('url');

		$response = $this->_client->request('POST', $url_api, [
			'headers' => ['Content-Type' => 'text/plain'],
		]);

		$notif_data = [
		  'status'   => TRUE,
		  'message'  => 'VoIP information has successfully to clear'
		];

		echo json_encode($notif_data);

		// var_dump($response->getBody()->getContents());
		$result = $response->getBody()->getContents();
		return $result;
	}
}
