<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>JRC Remote System</title>
    <meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
    <link rel="icon" href="<?= base_url('vendor/atlantis-lite/') ?>assets/img/icon.ico" type="image/x-icon" />

    <!-- Fonts and icons -->
    <script src="<?= base_url('vendor/atlantis-lite/') ?>assets/js/plugin/webfont/webfont.min.js"></script>
    <script>
        WebFont.load({
            google: {
                "families": ["Lato:300,400,700,900"]
            },
            custom: {
                "families": ["Flaticon", "Font Awesome 5 Solid", "Font Awesome 5 Regular", "Font Awesome 5 Brands", "simple-line-icons"],
                urls: ['<?= base_url('vendor/atlantis-lite/') ?>assets/css/fonts.min.css']
            },
            active: function() {
                sessionStorage.fonts = true;
            }
        });
    </script>

    <!-- CSS Files -->
    <link rel="stylesheet" href="<?= base_url('vendor/atlantis-lite/') ?>assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?= base_url('vendor/atlantis-lite/') ?>assets/css/atlantis.min.css">

    <style>
        /* .gambar{
            background-image: url(<?= base_url() ?>assets/img/unsplash/login-bg-4.jpg);
            background-repeat: no-repeat;
            background-attachment: fixed;  
            background-size: cover;
        } */

        #background_marine {
            /* width: 300px;
            height: 200px; */
            border: 1px solid black;
            background-image: url(<?= base_url() ?>assets/img/unsplash/login-bg-4.jpg);
            background-position: top bottom;
            animation: mymove 50s infinite;
        }

        @keyframes mymove {
            50% {
                background-position: center;
            }
        }
    </style>

</head>

<body>
    <div class="wrapper sidebar_minimize gambar" id="background_marine">
        <div class="main-panel">
            <div class="content">
                <div class="page-inner">
                    <div class="page-header">
                        <div class="row mx-auto">
                            <div class="col-md-2">
                                <img src="<?= base_url() ?>assets/img/logohubla.png" alt="logo" width="80" class="rounded-circle">
                            </div>
                            <div class="col-md-10 mt-3">
                                <h4 class="page-title text-dark">Direktorat Jenderal Perhubungan Laut</h4>
                                <h4 class="text-dark font-weight-bold">Kementerian Perhubungan Republik Indonesia</h4>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mx-auto">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12 col-lg-12 mb-3">
                                            <div class="card-title text-dark font-weight-bold text-center">JRC Remote System Application</div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 col-lg-12">
                                            <form action="#" id="formLogin" method="POST">
                                                <div class="form-group">
                                                    <label for="username">Username</label>
                                                    <input type="text" class="form-control form-login" name="username" id="username" placeholder="Enter Username">
                                                    <span class="help-block text-danger"></span>
                                                </div>
                                                <div class="form-group">
                                                    <label for="password">Password</label>
                                                    <input type="password" class="form-control form-login" name="password" id="password" placeholder="Enter Password">
                                                    <span class="help-block text-danger"></span>
                                                    <!-- <a href="<?= base_url('auth/forgot') ?>" class="text-primary pull-right mt-2">Forgot Password?</a> -->
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-action text-center">
                                    <button type="button" class="btn btn-secondary btn-block" onclick="login()">Sign In</button>
                                    <!-- <a href="<?= base_url('auth/register') ?>" class="btn btn-default btn-block">Create Account</a> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--   Core JS Files   -->
    <script src="<?= base_url('vendor/atlantis-lite/') ?>assets/js/core/jquery.3.2.1.min.js"></script>
    <script src="<?= base_url('vendor/atlantis-lite/') ?>assets/js/core/popper.min.js"></script>
    <script src="<?= base_url('vendor/atlantis-lite/') ?>assets/js/core/bootstrap.min.js"></script>
    <!-- jQuery UI -->
    <script src="<?= base_url('vendor/atlantis-lite/') ?>assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
    <script src="<?= base_url('vendor/atlantis-lite/') ?>assets/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"></script>

    <!-- jQuery Scrollbar -->
    <script src="<?= base_url('vendor/atlantis-lite/') ?>assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js"></script>

    <!-- Bootstrap Notify -->
    <script src="<?= base_url() ?>vendor/atlantis-lite/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js"></script>

    <!-- Atlantis JS -->
    <script src="<?= base_url('vendor/atlantis-lite/') ?>assets/js/atlantis.min.js"></script>

    <!-- Auth JS -->
    <script src="<?= base_url() ?>assets/js/auth.js"></script>

</body>

</html>