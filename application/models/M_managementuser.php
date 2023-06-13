<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_managementuser extends CI_model
{

	public function createDataTable($data)
    {
        $data = array(
            'order_col'         => $data['order_col'],
            'order_sort'        => $data['order_sort'],
            'order_name'        => $data['order_name'],
            'table'             => "auth_tb_user",
            'select'            => "id, nama_lengkap, username, email, role, status_user"
        );

        $this->_generateDataTable($data);
    }

    private function _generateDataTable($data)
    {
        #Load library datatables server-side
        $this->load->library('datatables');

        $this->datatables
            ->add_column('nomor', '$1', 'id')
            ->select($data['select'])
            ->from($data['table']);

        $this->db->order_by($data['order_name'], $data['order_sort']);

        print_r($this->datatables->generate());
    }

}
