<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Auth extends CI_Controller
{

	function __construct()
	{
		parent::__construct();
		date_default_timezone_set('Asia/Jakarta');

		$this->load->model('M_auth', 'auth');
	}

	public function register()
	{
		$data['title'] = 'JRC Remote System';
		$this->load->view('auth/register');
	}

	public function action_register()
	{
		$this->validation();

		$nama 			 = $this->input->post('fullname');
		$email 			 = $this->input->post('email');
		$username 		 = $this->input->post('username');
		$password 		 = $this->input->post('password');
		$passwordconfirm = $this->input->post('password2');

		$this->db->set('id', 'UUID()', FALSE);

		if ($password != $passwordconfirm) {
			// shownotification
			$notif = array(
				'status' 		=> FALSE,
				'title'   		=> 'Failed!',
				'type'	 		=> 'danger',
				'icon' 			=> 'flaticon-error',
				'message'	 	=> "Password and confirmation password didn't match",
				'is_inputerror' => FALSE
			);

			echo json_encode($notif);
		} else {
			$data = array(
				'nama'      	=> $nama,
				'username'  	=> $username,
				'password'  	=> md5($password),
				'email'  		=> $email,
				'created_date'  => date('Y-m-d H:i:s')
			);

			$this->db->insert('auth_tb_user', $data);
			$this->_sendEmail($email, 'auth/email_register', $data);

			$notif = array(
				'status'  => TRUE,
				'title'   => 'Success!',
				'type'	  => 'success',
				'icon' 	  => 'flaticon-success',
				'message' => 'Account created successfully'
			);
			echo json_encode($notif);
		}
	}

	public function forgot()
	{
		$data['title'] = 'JRC (Japan Radio Co) Remote System App';
		$this->load->view('auth/forgot');
	}

	public function action_forgot()
	{
		$this->validation_forgot();
		$email 			= $this->input->post('email');
		$username 		= $this->auth->getUsername($email);
		$password       = substr(hash('sha512', rand()), 0, 6);
		$password_md5   = md5($password);
		$check_account  = $this->auth->checkaccount_forgot($email);

		if ($check_account > 0) :
			$data = array(
				'username' => $username['username'],
				'password' => $password
			);

			$this->_sendEmail($email, 'auth/email_forgot', $data);

			$this->db->set('password', $password_md5);
			$this->db->set('created_date', date('Y-m-d H:i:s'));
			$this->db->where('email', $email);
			$this->db->update('auth_tb_user');

			$notif = array(
				'status' => TRUE,
				'title'   => 'Success!',
				'type'	  => 'success',
				'icon' 	  => 'flaticon-success',
				'message' => 'Reset password successfully. Please check your email to use new password.'
			);
			echo json_encode($notif);

		else :

			$notif = array(
				'status' 		=> FALSE,
				'title'   		=> 'Failed!',
				'type'	 		=> 'danger',
				'icon' 			=> 'flaticon-error',
				'message'	 	=> "Sorry, account not found",
				'is_inputerror' => FALSE
			);

			echo json_encode($notif);

		endif;
	}

	public function validation()
	{
		$fullname 	= $this->input->post('fullname');
		$email 		= $this->input->post('email');
		$username 	= $this->input->post('username');
		$password 	= $this->input->post('password');
		$password2 	= $this->input->post('password2');

		$data = array();
		$data['is_inputerror'] = TRUE;
		$data['inputerror'] = array();
		$data['texterror']  = array();
		$data['status']     = TRUE;

		if ($fullname == '') {
			$data['inputerror'][] = 'fullname';
			$data['texterror'][]  = 'The fullname field is required';
			$data['status']       = FALSE;
		}

		if ($email == '') {
			$data['inputerror'][] = 'email';
			$data['texterror'][]  = 'The email field is required';
			$data['status']       = FALSE;
		}

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

		if ($password2 == '') {
			$data['inputerror'][] = 'password2';
			$data['texterror'][]  = 'The confirmation password field is required';
			$data['status']       = FALSE;
		}

		$data['title'] 		= 'Failed!';
		$data['icon']  		= 'flaticon-error';
		$data['message']  	= 'All column cannot be empty';
		$data['type']       = 'danger';

		if ($data['status'] === FALSE) {
			echo json_encode($data);
			exit();
		}
	}

	public function validation_forgot()
	{
		$email 		= $this->input->post('email');

		$data = array();
		$data['is_inputerror'] = TRUE;
		$data['inputerror'] = array();
		$data['texterror']  = array();
		$data['status']     = TRUE;

		if ($email == '') {
			$data['inputerror'][] = 'email';
			$data['texterror'][]  = 'The email field is required';
			$data['status']       = FALSE;
		}

		$data['title'] 		= 'Failed!';
		$data['icon']  		= 'flaticon-error';
		$data['message']  	= 'Column email cannot be empty';
		$data['type']       = 'danger';
		$data['is_inputerror'] = TRUE;

		if ($data['status'] === FALSE) {
			echo json_encode($data);
			exit();
		}
	}

	private function _sendEmail($email, $view, $data)
	{
		if ($view === 'auth/email_register') {
			$subject = 'INFORMASI PENDAFTARAN AKUN JRC REMOTE SYSTEM';
		} elseif ($view === 'auth/email_forgot') {
			$subject = 'RESET PASSWORD AKUN JRC REMOTE SYSTEM';
		}

		$config = [
			'protocol'  => 'smtp',
			'smtp_host' => 'ssl://smtp.googlemail.com',
			'smtp_port' => 465,
			'smtp_user' => 'jrcremote.hubla@gmail.com',
			'smtp_pass' => 'jrcremote123',
			'mailtype'  => 'html',
			'newline'   => "\r\n",
			'crlf'      => "\r\n",
			'charset'   => 'iso-8859-1'
		];

		$this->load->library('email');
		$this->email
			->initialize($config)
			->from('jrcremote.hubla@gmail.com', 'no-reply')
			->to($email)
			->subject($subject)
			->message($this->load->view($view, $data, TRUE));

		return $this->email->send();
	}
}
