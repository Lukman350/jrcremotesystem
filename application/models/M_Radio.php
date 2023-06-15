<?php
defined('BASEPATH') or exit('No direct script access allowed');

class M_Radio extends CI_model
{
  public function getAllRadio()
  {
    $query = $this->db->query("SELECT * FROM radio");
    return $query->result_array();
  }

  public function getRadio($id)
  {
    $query = $this->db->query("SELECT * FROM radio WHERE id = '$id'");
    return $query->row_array();
  }

  public function getRadioByColumn($column)
  {
    $query = $this->db->query("SELECT $column FROM radio");
    return $query->result_array();
  }

  public function insertRadio($data)
  {
    $this->db->insert('radio', $data);
  }

  public function updateRadio($newData, $id, &$affectedRows)
  {
    $this->db->where('id', $id);
    $this->db->update('radio', $newData);

    $affectedRows = [
      'affected_rows' => $this->db->affected_rows()
    ];
  }
}
