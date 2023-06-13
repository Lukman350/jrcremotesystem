<div class="content">
<div class="page-inner">
	<?= $breadcrumb; ?>
	<div class="row">
		<div class="col-md-12 mt-2">
			<div class="card">
				<div class="card-header">
					<div class="d-flex align-items-center">
						<button class="btn btn-primary btn-round ml-auto" onclick="openModalAdd()">
							<i class="fa fa-plus-circle"></i>
							Tambah
						</button>
					</div>
				</div>
				<div class="card-body">
					<?= $modal; ?>
					<div class="table-responsive">
						<table id="table-contents" class="display table table-striped table-hover" width="100%" cellspacing="0">
							<thead class="text-primary">
								<tr>
									<th>No</th>
									<th>Nama</th>
									<th>Username</th>
									<th>Email</th>
									<th>Role</th>
									<th>Status User</th>
									<th>Aksi</th>
								</tr>
							</thead>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>