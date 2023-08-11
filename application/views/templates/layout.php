<!DOCTYPE html>
<html lang="en">

<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title><?= $title ?></title>
	<meta content='width=device-width, initial-scale=1.0, shrink-to-fit=no' name='viewport' />
	<link rel="icon" href="<?= base_url() ?>vendor/atlantis-lite/assets/img/icon.ico" type="image/x-icon" />

	<!-- Fonts and icons -->
	<script src="<?= base_url() ?>vendor/atlantis-lite/assets/js/plugin/webfont/webfont.min.js"></script>
	<script>
		WebFont.load({
			google: {
				"families": ["Lato:300,400,700,900"]
			},
			custom: {
				"families": ["Flaticon", "Font Awesome 5 Solid", "Font Awesome 5 Regular", "Font Awesome 5 Brands", "simple-line-icons"],
				urls: ['<?= base_url() ?>vendor/atlantis-lite/assets/css/fonts.min.css']
			},
			active: function() {
				sessionStorage.fonts = true;
			}
		});
	</script>

	<!-- CSS Files -->
	<link rel="stylesheet" href="<?= base_url() ?>vendor/atlantis-lite/assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="<?= base_url() ?>vendor/atlantis-lite/assets/css/atlantis.min.css">
	<link rel="stylesheet" href="<?= base_url() ?>assets/css/custom_css.css">
	<?php
	if (isset($CSS)) {
		if (is_array($CSS)) {
			foreach ($CSS as $css) {
				echo '<link rel="stylesheet" href="' . base_url() . 'assets/css/' . $css . '" />';
			}
		} else {
			echo '<link rel="stylesheet" href="' . base_url() . 'assets/css/' . $css . '" />';
		}
	}
	?>
</head>

<body>
	<div class="wrapper">
		<div class="main-header">
			<!-- Logo Header -->
			<div class="logo-header" data-background-color="blue">

				<a href="index.html" class="logo">
					<img src="<?= base_url() ?>vendor/atlantis-lite/assets/img/logo.svg" alt="navbar brand" class="navbar-brand">
				</a>
				<button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon">
						<i class="icon-menu"></i>
					</span>
				</button>
				<button class="topbar-toggler more"><i class="icon-options-vertical"></i></button>
				<div class="nav-toggle">
					<button class="btn btn-toggle toggle-sidebar">
						<i class="icon-menu"></i>
					</button>
				</div>
			</div>
			<!-- End Logo Header -->

			<!-- Navbar Header -->
			<nav class="navbar navbar-header navbar-expand-lg" data-background-color="blue2">

				<div class="container-fluid">
					<div class="collapse" id="search-nav">
						<h3 class="text-white">Direktorat Jenderal Perhubungan Laut</h3>
					</div>
					<ul class="navbar-nav topbar-nav ml-md-auto align-items-center">
						<li class="nav-item dropdown hidden-caret">
							<a class="dropdown-toggle profile-pic" data-toggle="dropdown" href="#" aria-expanded="false">
								<div class="avatar-sm">
									<img src="<?= base_url() ?>vendor/atlantis-lite/assets/img/profile.jpg" alt="..." class="avatar-img rounded-circle">
								</div>
							</a>
							<ul class="dropdown-menu dropdown-user animated fadeIn">
								<div class="dropdown-user-scroll scrollbar-outer">
									<li>
										<div class="user-box">
											<div class="avatar-lg"><img src="<?= base_url() ?>vendor/atlantis-lite/assets/img/profile.jpg" alt="image profile" class="avatar-img rounded"></div>
											<div class="u-text">
												<h4><?= $this->session->userdata('nama'); ?></h4>
												<p class="text-muted"><?= $this->session->userdata('username'); ?></p><a href="profile.html" class="btn btn-xs btn-secondary btn-sm">View Profile</a>
											</div>
										</div>
									</li>
									<li>
										<div class="dropdown-divider"></div>
										<a class="dropdown-item" href="#">My Profile</a>
										<a class="dropdown-item" href="#">My Balance</a>
										<a class="dropdown-item" href="#">Inbox</a>
										<div class="dropdown-divider"></div>
										<a class="dropdown-item" href="#">Account Setting</a>
										<div class="dropdown-divider"></div>
										<a class="dropdown-item" onclick="logout()">Logout</a>
									</li>
								</div>
							</ul>
						</li>
					</ul>
				</div>
			</nav>
			<!-- End Navbar -->
		</div>

		<?= $sidebar; ?>

		<div class="main-panel">
			<?= $content; ?>
			<footer class="footer">
				<div class="container-fluid">
					<div class="copyright ml-auto">
						Hak Cipta <i class="fas fa-copyright"></i> <?= date('Y') ?>. <a href="https://www.themekita.com"> Direktorat Jenderal Perhubungan Laut</a>
					</div>
				</div>
			</footer>
		</div>
	</div>
	<!--   Core JS Files   -->
	<script src="<?= base_url() ?>vendor/atlantis-lite/assets/js/core/jquery.3.2.1.min.js"></script>
	<script src="<?= base_url() ?>vendor/atlantis-lite/assets/js/core/popper.min.js"></script>
	<script src="<?= base_url() ?>vendor/atlantis-lite/assets/js/core/bootstrap.min.js"></script>

	<!-- jQuery UI -->
	<script src="<?= base_url() ?>vendor/atlantis-lite/assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
	<script src="<?= base_url() ?>vendor/atlantis-lite/assets/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js"></script>

	<!-- jQuery Scrollbar -->
	<script src="<?= base_url() ?>vendor/atlantis-lite/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js"></script>

	<!-- Bootstrap Notify -->
	<script src="<?= base_url() ?>vendor/atlantis-lite/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js"></script>

	<!-- Datatables -->
	<script src="<?= base_url() ?>vendor/atlantis-lite/assets/js/plugin/datatables/datatables.min.js"></script>

	<!-- Atlantis JS -->
	<script src="<?= base_url() ?>vendor/atlantis-lite/assets/js/atlantis.min.js"></script>

	<!-- Custom JS -->
	<?php
	if (isset($JS)) {
		if (is_array($JS)) {
			foreach ($JS as $js) {
				echo '<script src="' . base_url() . 'assets/js/' . $js . '"></script>';
			}
		} else {
			echo '<script src="' . base_url() . 'assets/js/' . $JS . '"></script>';
		}
	}
	?>
	<script src="<?= base_url() ?>assets/js/get_status.js"></script>

	<script>
		function logout() {
			$.ajax({
				url: 'login/logout',
				type: 'POST',
				dataType: "JSON",
				success: function(result) {
					notifSuccess(result.message);
					setTimeout(function() {
						window.location.href = 'login';
					}, 500);

				},
				error: function(jqXHR, textStatus, errorThrown) {
					notifError();
				}
			});
		}
	</script>
</body>

</html>