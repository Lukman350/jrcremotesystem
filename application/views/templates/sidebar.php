<!-- Sidebar -->
<div class="sidebar sidebar-style-2">
	<div class="sidebar-wrapper scrollbar scrollbar-inner">
		<div class="sidebar-content">
			<div class="user">
				<div class="avatar-sm float-left mr-2">
					<img src="<?php base_url() ?>vendor/atlantis-lite/assets/img/profile.jpg" alt="..." class="avatar-img rounded-circle">
				</div>
				<div class="info">
					<a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
						<span>
							<?= $this->session->userdata('nama'); ?>
							<span class="user-level"><?= $this->session->userdata('role') == 1 ? 'Admin / Supervisor' : 'Staff' ; ?></span>
							<span class="caret"></span>
						</span>
					</a>
					<div class="clearfix"></div>

					<div class="collapse in" id="collapseExample">
						<ul class="nav">
							<li>
								<a href="#profile">
									<span class="link-collapse">My Profile</span>
								</a>
							</li>
							<li>
								<a href="#edit">
									<span class="link-collapse">Edit Profile</span>
								</a>
							</li>
							<li>
								<a href="#settings">
									<span class="link-collapse">Settings</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<ul class="nav nav-primary">
				<li class="nav-section">
					<span class="sidebar-mini-icon">
						<i class="fa fa-ellipsis-h"></i>
					</span>
					<h4 class="text-section">Menu</h4>
				</li>
				<li class="nav-item active">
					<a href="<?= base_url() ?>main" class="collapsed" aria-expanded="false">
						<i class="fas fa-home"></i>
						<p>Main</p>
					</a>
				</li>
				<?php
					$role = $this->session->userdata('role'); 
					if($role == 1): ?>
						<li class="nav-item">
							<a href="<?= base_url() ?>test">
								<i class="fas fa-clipboard-check"></i>
								<p>Testing</p>
							</a>
						</li>
						<li class="nav-item">
							<a href="<?= base_url() ?>settings">
								<i class="fas fa-cogs"></i>
								<p>Settings</p>
							</a>
						</li>
						<li class="nav-item">
							<a href="<?= base_url() ?>information">
								<i class="fas fa-info-circle"></i>
								<p>Information</p>
							</a>
						</li>
						<li class="nav-item">
							<a href="<?= base_url() ?>managementuser">
								<i class="fas fa-users"></i>
								<p>Management User</p>
							</a>
						</li>
				<?php 
					endif; ?>
				<!-- <li class="nav-item">
					<a href="<?= base_url() ?>profile" class="collapsed" aria-expanded="false">
						<i class="fas fa-user"></i>
						<p>Profile</p>
					</a>
				</li> -->
				<li class="nav-item">
					<a href="<?= base_url() ?>changepassword" class="collapsed" aria-expanded="false">
						<i class="fas fa-key"></i>
						<p>Change Password</p>
					</a>
				</li>
				<hr class="text-center" style="width: 90%;">
				<li class="mx-4 mt-2">
					<img src="<?= base_url() ?>assets/img/jrc.png" alt="title" width="120" height="60" style="display: block; margin-left: auto; margin-right: auto;">
				</li>
			</ul>
		</div>
	</div>
</div>
<!-- End Sidebar -->