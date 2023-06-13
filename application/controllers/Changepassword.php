<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Changepassword extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('M_auth', 'model');
    }

    public function index()
    {
        #Title
        $data['title']                  = "Change Password";
        $data['page_title']             = "Change Password";

        #Breadcrumb
        $data['home_url']               = base_url('main');
        $data['nav_item_first_title']   = "";
        $data['nav_item_second_title']  = "Change Password";
        $data['nav_item_second_url']    = base_url('changepassword');

        #Data Contents
        $data['id_user']                = $this->session->userdata('id');

        #Layouts
        $data['breadcrumb']             = $this->load->view('templates/breadcrumb', $data, TRUE);
        $page['sidebar']                = $this->load->view('templates/sidebar', $data, TRUE);

        #Contents
        $page['content']                = $this->load->view('content/change_password', $data, TRUE);
        $page['JS']                     = 'change_password.js';

        $this->load->view('templates/layout', $page);
    }

    public function save()
    {
        #Data Form
        $data = array(
            'password'       => md5($this->input->post('password_baru')),
            'created_by'     => $this->session->userdata('id'),
            'created_date'   => date("Y-m-d H:i:s")
        );

        #Validasi Form
        $this->validation($data);

        #Aksi
        $id = $this->input->post('id_user');

        $status = 'changed';
        $query  = $this->db
            ->set($data)
            ->where('id', $id)
            ->update('auth_tb_user');

        #Show Notification
        $type    = $query ? 'success' : 'error';
        $message = $query ? 'Password success to ' . $status : 'Password failed to ' . $status;
        $this->showNotification($type, $message);
    }

    public function showNotification($type, $message)
    {
        if ($type == 'success') :
            $data = [
                'status'    => TRUE,
                'icon'      => 'flaticon-success',
                'title'     => 'Success!',
                'message'   => $message,
                'type'      => 'success'
            ];
        else :
            $data = [
                'status'    => FALSE,
                'icon'      => 'flaticon-error',
                'title'     => 'Error!',
                'message'   => $message,
                'type'      => 'error'
            ];
        endif;

        echo json_encode($data);
    }

    private function validation($form)
    {
        $password_lama = $this->input->post('password_lama');
        $password_baru = $this->input->post('password_baru');
        $username      = $this->session->userdata('username');

        $data = array();
        $data['inputerror'] = array();
        $data['texterror']  = array();
        $data['status']     = TRUE;

        $getuser = $this->model->datauser($username);

        if($password_lama == ''){
            $data['inputerror'][] = "password_lama";
            $data['texterror'][]  = 'Old password required';
            $data['status']       = FALSE;
        }elseif(md5($password_lama) != $getuser['password']){
            $data['inputerror'][] = "password_lama";
            $data['texterror'][]  = 'Old password is wrong';
            $data['status']       = FALSE;
        }

        if($password_baru == ''){
            $data['inputerror'][] = "password_baru";
            $data['texterror'][]  = 'New password required';
            $data['status']       = FALSE;
        }

        if ($data['status'] === FALSE) {
            echo json_encode($data);
            exit();
        }
    }
}
