<div class="content">
	<div class="panel-header bg-primary-gradient">
		<div class="page-inner py-5">
			<div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
				<div>
					<h2 class="text-white pb-2 fw-bold">Radio Device Testing</h2>
					
				</div>
				<div class="ml-md-auto py-2 py-md-0">
					<h5 class="text-white op-2 mt-2 text-right">JRC Monitor Web Application</h5>
				</div>
			</div>
		</div>
	</div>
	<div class="page-inner mt--5">
		<div class="row mt--2">
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">
						<div class="card-head-row">
							<div class="card-title">Test Tone Output</div>
						</div>
					</div>
					<div class="card-body">
						<div class="card-body">
						<div class="row">
							<div class="col-md-12 col-lg-12">
								<div class="form-group form-inline">
									<label for="statusinput" class="col-md-3 col-form-label">Status</label>
									<div class="col-md-6 p-0">
										<input type="text" class="form-control input-full border-primary" id="statusinput" name="statusinput" readonly>
									</div>
								</div>
								<form action="#" method="post" id="test_tone_form">
									<div class="form-group form-inline">
										<label for="hz_tone" class="col-md-3 col-form-label">Frequency</label>
										<div class="col-md-6 p-0">
											<select class="form-control border-primary" id="hz_tone" name="hz_tone" style="width: 100%;">
												<option value="">Select Frequency Value</option>
												<option value="1">300 Hz</option>
												<option value="2">500 Hz</option>
												<option value="3">1000 Hz</option>
												<option value="4">2000 Hz</option>
												<option value="5">3000 Hz</option>
											</select>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="type_tone" class="col-md-3 col-form-label">Tone Type</label>
										<div class="col-md-6 p-0">
											<select class="form-control border-primary" id="type_tone" name="type_tone" style="width: 100%;">
												<option value="">Select Tone Type Value</option>
												<option value="1">Tx</option>
												<option value="2">VoIP</option>
												<option value="3">Tx + VoIP</option>
											</select>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="lvl_tone" class="col-md-3 col-form-label">Tone Level</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="lvl_tone" name="lvl_tone" placeholder="Enter Tone Level">
										</div>
									</div>
								</form>
								
							</div>
						</div>
					</div>
					<div class="card-action">
						<button class="btn btn-success" onclick="action('test_tone_start')">Start</button>
						<button class="btn btn-danger" onclick="action('test_tone_stop')">Stop</button>
					</div>
					</div>
				</div>
			</div>
			
			<div class="col-md-4">
				<div class="card">
					<div class="card-header">
						<div class="card-title">VoIP Loop Back</div>
					</div>
					<div class="card-body">
						<div class="row mt-4">
							<div class="col-md-12 col-lg-12">
								<div class="form-group form-inline">
									<label for="loop_back" class="col-md-3 col-form-label">Loop Back</label>
									<div class="col-md-9 p-0">
										<select class="form-control border-primary" id="loop_back" name="loop_back" style="width: 100%;">
											<option value="">Select Loop Back Value</option>
											<option value="1">Normal Output</option>
											<option value="2">Loop Back</option>
											<option value="3">Normal + Loop Back</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="card-action">
						<button class="btn btn-success" onclick="action('voip_loop_start')">Start</button>
						<button class="btn btn-danger" onclick="action('voip_loop_stop')">Stop</button>
					</div>
				</div>
				<div class="card">
					<div class="card-header">
						<div class="card-title">Reset Unit</div>
					</div>
					<div class="card-action">
						<button class="btn btn-success" data-toggle="modal" data-target="#reset_unit_normal_modal">Normal</button>
						<button class="btn btn-warning" data-toggle="modal" data-target="#reset_unit_local_modal">Local</button>
						<button class="btn btn-primary" data-toggle="modal" data-target="#reset_unit_master_modal">Master</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Modal Reset Unit Normal -->
<div class="modal fade" id="reset_unit_normal_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Reset Unit Normal: Warning!</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				Are you sure want to reset transmitter?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" onclick="action('reset_unit_normal')">OK</button>
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<!-- Modal Reset Unit Local -->
<div class="modal fade" id="reset_unit_local_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Reset Unit Local: Warning!</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				Are you sure want to reset transmitter?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" onclick="action('reset_unit_local')">OK</button>
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<!-- Modal Reset Unit Master -->
<div class="modal fade" id="reset_unit_master_modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Reset Unit Master: Warning!</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				Are you sure want to reset transmitter?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" onclick="action('reset_unit_master')">OK</button>
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
