<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_auth extends CI_model
{
	public function checkaccount($username, $password)
	{
		$checkaccount = $this->db->query("SELECT id FROM auth_tb_user WHERE username = '$username' AND password = '$password' ");
		return $checkaccount->num_rows();
	}

	public function datauser($username)
	{
		$datauser = $this->db->query("SELECT * FROM auth_tb_user WHERE username = '$username'");
		return $datauser->row_array();
	}

	public function getUsername($email)
	{
		$username = $this->db->query("SELECT username FROM auth_tb_user WHERE email = '$email' ");
		return $username->row_array();
	}

	public function checkaccount_forgot($email)
	{
		$checkaccount = $this->db->query("SELECT id FROM auth_tb_user WHERE email = '$email'");
		return $checkaccount->num_rows();
	}

	public function getuserlogin($id_user)
	{
		$user = $this->db->query("SELECT * FROM auth_tb_user WHERE id = '$id_user' ");
		return $user->row_array();
	}
}
