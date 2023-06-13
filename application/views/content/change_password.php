<div class="content">
<div class="page-inner">
	<?= $breadcrumb; ?>
	<div class="row">
		<div class="col-md-6 mt-2">
			<div class="card">
				<div class="card-body">
					<form action="#" id="formChangePassword" method="POST">
						<div class="row">
							<div class="col-8">
								<div class="form-group">
									<input class="form-control form-control border-primary" type="hidden" name="id_user" id="id_user" value="<?= $id_user ?>">
									<label for="password_lama" class="text-primary font-weight-bold">Old Password <span class="text-danger">*</span></label>
									<input class="form-control form-control border-primary" type="text" name="password_lama" id="password_lama">
									<span class="text-danger help-block"></span>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-8">
								<div class="form-group">
									<label for="password_baru" class="text-primary font-weight-bold">New Password <span class="text-danger">*</span></label>
									<input class="form-control form-control border-primary" type="text" name="password_baru" id="password_baru">
									<span class="text-danger help-block"></span>

								</div>
							</div>
						</div>
					</form>
				</div>
				<div class="card-footer">
					<div class="row">
						<div class="col-4">
							<div class="form-group">
								<button type="button" class="btn btn-primary btn-round" onclick="save()">Change</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>