<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
  <style>
    * {
      font-family: 'Inter', sans-serif;
    }

    body {
      color: #000 !important;
    }

    h2 {
      font-size: 1.6rem;
      text-align: center;
      margin: 0;
    }

    p {
      font-weight: 500 !important;
      margin-top: 0;
    }

    .container {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      overflow: hidden;
      max-width: 576px !important;
      border: 2px solid #dee2e6;
      border-radius: 0.5rem;
    }

    .card-head,
    .card-body {
      padding: 1.6rem;
    }

    .card-head {
      background-color: #dee2e6;
    }

    .table {
      width: 100%;
      margin-bottom: 1rem;
    }

    .table,
    .table th,
    .table td {
      border: 2px solid #adb5bd;
      border-collapse: collapse;
    }

    .table th,
    .table td {
      padding: 0.6em;
    }

    .table th {
      width: 25%;
      background-color: #e9ecef;
    }

    .button {
      text-decoration: none;
      font-weight: 600 !important;
      color: #fff !important;
      text-align: center;

      display: block;
      border-radius: 0.5rem;
      padding: 1em 1.2em;
      background-color: #d00000;
      box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
    }

    .button:hover {
      background-color: #bf0603;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="card">
      <div class="card-head">
        <h2>Reset Password JRC Remote System</h2>
      </div>
      <div class="card-body">

        <p>Reset password akun anda berhasil.</p>
        <p>
          Silahkan melakukan login di aplikasi dengan menggunakan username dan password terbaru. <br>
          Berikut informasi username dan password akun terbaru anda :
        </p>
        <table class="table">
          <tbody>
            <tr>
              <th>Username</th>
              <td><?= $username ?></td>
            </tr>
            <tr>
              <th>Password</th>
              <td><?= $password ?></td>
            </tr>
          </tbody>
        </table>
        <!-- <a class="button" href="http://localhost:8080/jrc_project/auth/">Login Sekarang</a> -->
      </div>
    </div>
  </div>
</body>

</html>