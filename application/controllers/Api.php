<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Api extends CI_Controller
{
  public function __construct()
  {
    parent::__construct();
    $this->load->model('M_Radio', 'radio');
  }

  public function sq_level()
  {
    $sq_level = $_POST['sq_level'];
    $radio_id = $_POST['radio_id'];
    $result = array();

    $this->radio->updateRadio(
      ['power_level' => $sq_level],
      $radio_id,
      $result
    );

    if ($result['affected_rows'] > 0) {
      array_push($result, ['sq_level' => $sq_level]);
      $notif_data = [
        'status'  => TRUE,
        'message' => 'Radio data updated',
        'data' => $result
      ];
    } else {
      $notif_data = [
        'status'  => FALSE,
        'message' => 'Radio data not updated'
      ];
    }

    echo json_encode($notif_data);
  }
}
