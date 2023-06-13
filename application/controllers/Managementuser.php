<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Managementuser extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();

        $this->load->model('M_managementuser', 'model');
    }

    public function index()
    {
        #Title
        $data['title']                  = "Management User";
        $data['page_title']             = "Management User";

        #Breadcrumb
        $data['home_url']               = base_url('main');
        $data['nav_item_first_title']   = "";
        $data['nav_item_second_title']  = "Management User";
        $data['nav_item_second_url']    = base_url('managementuser');

        #Management Sidebar

        #Data Contents
        // $data['list_perusahaan']        = $this->model->getListPerusahaan();

        #Layouts
        $data['breadcrumb']             = $this->load->view('templates/breadcrumb', $data, TRUE);
        $data['modal']                  = $this->load->view('modals/management_user_modal', $data, TRUE);
        $page['sidebar']                = $this->load->view('templates/sidebar', $data, TRUE);

        #Contents
        $page['content']                = $this->load->view('content/management_user', $data, TRUE);
        $page['JS']                     = 'management_user.js';

        $this->load->view('templates/layout', $page);
    }

    public function getDataTable()
    {
        $order_col  = $this->input->post('order[0][column]');

        $data = array(
            'iduser'     => $this->session->userdata('id'),
            'order_col'  => $this->input->post('order[0][column]'),
            'order_sort' => $this->input->post('order[0][dir]'),
            'order_name' => $this->input->post("columns[$order_col][data]")
        );

        $this->model->createDataTable($data);
    }

    public function tampilFormData()
    {
        $id      = $this->input->post('id');
        $query   = $this->db->get_where('auth_tb_user', ['id' => $id]);
        $result  = $query->row_array();

        echo json_encode($result);
    }

    public function save()
    {
        $password = $this->generateRandomString();

        #Data Form
        $data = array(
            'nama_lengkap'   => $this->input->post('nama_lengkap'),
            'username'       => $this->input->post('username'),
            'email'          => $this->input->post('email'),
            'password'       => md5($password),
            'role'           => $this->input->post('role'),
            'status_user'    => $this->input->post('status_user'),
            'created_by'     => $this->session->userdata('id'),
            'created_date'   => date("Y-m-d H:i:s")
        );

        #Validasi Form
        $this->validation($data);

        #Aksi
        $id = $this->input->post('id_user');

        if ($id == '') :
            $status = 'ditambahkan';
            $query  = $this->db->insert('auth_tb_user', $data);
        else :
            $status = 'diubah';
            $query  = $this->db
                ->set($data)
                ->where('id', $id)
                ->update('auth_tb_user');
        endif;

        #Show Notification
        $type    = $query ? 'success' : 'error';
        $message = $query ? 'Data berhasil ' . $status : 'Data gagal ' . $status;
        $this->showNotification($type, $message);
    }

    public function hapus()
    {
        $id = $this->input->post('id');

        $query = $this->db->where('id', $id)
            ->delete('auth_tb_user');

        #Show Notification
        $type    = $query ? 'success' : 'error';
        $message = $query ? 'Data berhasil dihapus' : 'Data gagal dihapus';
        $this->showNotification($type, $message);
    }

    public function showNotification($type, $message)
    {
        if ($type == 'success') :
            $data = [
                'status'    => TRUE,
                'icon'      => 'flaticon-success',
                'title'     => 'Sukses!',
                'message'   => $message,
                'type'      => 'success'
            ];
        else :
            $data = [
                'status'    => FALSE,
                'icon'      => 'flaticon-error',
                'title'     => 'Gagal!',
                'message'   => $message,
                'type'      => 'error'
            ];
        endif;

        echo json_encode($data);
    }

    private function validation($form)
    {
        $data = array();
        $data['inputerror'] = array();
        $data['texterror']  = array();
        $data['status']     = TRUE;

        foreach ($form as $key => $val) :

            #Mengubah simbol _ menjadi format tertentu
            $check = strpos($key, '_');
            $text  = $check ? str_replace("_", " ", $key) : $key;

            #Memunculkan keterangan error form dan border merah
            if ($val == '') {
                $data['inputerror'][] = "$key";
                $data['texterror'][]  = 'Kolom ' . "$text" . ' wajib diisi';
                $data['status']       = FALSE;
            }

        endforeach;

        if ($data['status'] === FALSE) {
            echo json_encode($data);
            exit();
        }
    }

    private function generateRandomString() {
        $length             = 8;
        $characters         = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength   = strlen($characters);
        $randomString       = '';

        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }

        return $randomString;
    }
}
