<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Login extends CI_Controller
{

	function __construct()
	{
		parent::__construct();
		date_default_timezone_set('Asia/Jakarta');

		$this->load->model('M_auth', 'auth');
	}

	public function index()
	{
		$data['title'] 	= 'JRC Remote System';
		$this->load->view('auth/login_2');
	}

	public function action_login()
	{
		$this->validation();

		$username 		= $this->input->post('username');
		$password 		= $this->input->post('password');
		$passwordMD5 	= md5($password);

		$checkaccount   = $this->auth->checkaccount($username, $passwordMD5);

		if ($checkaccount > 0) :

			//login
			$datauser = $this->auth->datauser($username);

			if($datauser['status_user'] == 1):
				$session  = [
					'id'       	  => $datauser['id'],
					'username'    => $datauser['username'],
					'nama'        => $datauser['nama_lengkap'],
					'role'    	  => $datauser['role']
				];

				$this->session->set_userdata($session);

				$datanotif = array(
					'status'  => TRUE,
					'title'   => 'Success!',
					'type'	  => 'success',
					'icon' 	  => 'flaticon-success',
					'message' => 'Login is successfully'
				);
				echo json_encode($datanotif);
			else:
				$datanotif = array(
					'status'  		=> FALSE,
					'title'   		=> 'Failed!',
					'type'	 		=> 'danger',
					'icon' 			=> 'flaticon-error',
					'message'	 	=> "Your account is not active. Please call administrator",
					'is_inputerror' => FALSE
				);
				echo json_encode($datanotif);
			endif;

		else :
			//Kasih notif password dan username tidak sama
			$datanotif = array(
				'status'  		=> FALSE,
				'title'   		=> 'Failed!',
				'type'	 		=> 'danger',
				'icon' 			=> 'flaticon-error',
				'message'	 	=> "Username and password didn't match",
				'is_inputerror' => FALSE
			);

			echo json_encode($datanotif);
		endif;
	}

	public function logout()
	{
		$this->session->sess_destroy();
		
		$datanotif = array(
					'status'  => TRUE,
					'title'   => 'Success!',
					'type'	  => 'success',
					'icon' 	  => 'flaticon-success',
					'message' => 'Logout is successfully'
				);
		echo json_encode($datanotif);
	}

	public function validation()
	{
		$username = $this->input->post('username');
		$password = $this->input->post('password');

		$data = array();
		$data['is_inputerror'] = TRUE;
		$data['inputerror'] = array();
		$data['texterror']  = array();
		$data['status']     = TRUE;

		if ($username == '') {
			$data['inputerror'][] = 'username';
			$data['texterror'][]  = 'The username field is required';
			$data['status']       = FALSE;
		}

		if ($password == '') {
			$data['inputerror'][] = 'password';
			$data['texterror'][]  = 'The password field is required';
			$data['status']       = FALSE;
		}

		$data['icon'] 	    = 'flaticon-error';
		$data['title'] 		= 'Failed!';
		$data['message']  	= 'All column cannot be empty';
		$data['type']       = 'danger';

		if ($data['status'] === FALSE) {
			echo json_encode($data);
			exit();
		}
	}
}
