<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Profile extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();

        $this->load->model('M_auth', 'model');
    }

    public function index()
    {
        #Title
        $data['title']                  = "User Profile";
        $data['page_title']             = "User Profile";

        #Breadcrumb
        $data['home_url']               = base_url('main');
        $data['nav_item_first_title']   = "";
        $data['nav_item_second_title']  = "User Profile";
        $data['nav_item_second_url']    = base_url('profile');

        #Data Contents
        $id_user                        = $this->session->userdata('id');
        $getuser                        =  $this->model->getuserlogin($id_user);


        $data['contents']               = array(
            'id'            => $id_user,
            'nama'          => $getuser['nama_lengkap'],
            'username'      => $getuser['username'],
            'email'         => $getuser['email'],
            'role'          => $getuser['role'],
            'status_user'   => $getuser['status_user']
        );

        #Layouts
        $data['breadcrumb']             = $this->load->view('templates/breadcrumb', $data, TRUE);
        $page['sidebar']                = $this->load->view('templates/sidebar', $data, TRUE);

        #Contents
        $page['content']                = $this->load->view('content/profile', $data, TRUE);
        $page['JS']                     = 'profile.js';

        $this->load->view('templates/layout', $page);
    }

    public function save()
    {
        #Data Form
        $data = array(
            'nama_lengkap'   => $this->input->post('nama_lengkap'),
            'role'           => $this->input->post('role'),
            'email'          => $this->input->post('email'),
            'status_user'    => $this->input->post('status_user'),
            'created_by'     => $this->session->userdata('id'),
            'created_date'   => date("Y-m-d H:i:s")
        );

        #Validasi Form
        $this->validation($data);

        #Aksi
        $id = $this->input->post('id_user');

        $status = 'updated';
        $query  = $this->db
            ->set($data)
            ->where('id', $id)
            ->update('auth_tb_user');

        #Show Notification
        $type    = $query ? 'success' : 'error';
        $message = $query ? 'Profile success to ' . $status : 'Profile failed to' . $status;
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

        $getuser = $this->model->datauser($password_lama, $username);

        if ($password_lama == '') {
            $data['inputerror'][] = "password_lama";
            $data['texterror'][]  = 'Old password required';
            $data['status']       = FALSE;
        } elseif ($password_lama != $getuser['password']) {
            $data['inputerror'][] = "password_lama";
            $data['texterror'][]  = 'Old password is wrong';
            $data['status']       = FALSE;
        }

        if ($password_baru == '') {
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
