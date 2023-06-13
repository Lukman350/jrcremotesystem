<div class="content">
	<div class="panel-header bg-primary-gradient">
		<div class="page-inner py-5">
			<div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
				<div>
					<h2 class="text-white pb-2 fw-bold">Main Dashboard</h2>

				</div>
				<div class="ml-md-auto py-2 py-md-0">
					<h5 class="text-white op-2 mt-2 text-right">JRC Monitor Web Application</h5>
				</div>
			</div>
		</div>
	</div>
	<div class="page-inner mt--5">
		<div class="row mt--2">
			<div class="col-md-12">
				<div class="card full-height">
					<div class="card-body">
						<div class="card-title">Status Information</div>
						<div class="card-category">Daily information about statistics in system</div>
						<div class="d-flex flex-wrap justify-content-around pb-2 pt-4">
							<div class="col-sm-6 col-md-3">
								<div class="card card-stats card-primary card-round">
									<div class="card-body">
										<div class="row">
											<div class="col-5">
												<div class="icon-big text-center">
													<i class="flaticon-interface-4"></i>
												</div>
											</div>
											<div class="col-7 col-stats">
												<div class="numbers">
													<p class="card-category">Channel</p>
													<h4 class="card-title" id="channel_info"></h4>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-6 col-md-3">
								<div class="card card-stats card-danger card-round">
									<div class="card-body">
										<div class="row">
											<div class="col-5">
												<div class="icon-big text-center">
													<i class="flaticon-interface-6"></i>
												</div>
											</div>
											<div class="col-7 col-stats">
												<div class="numbers">
													<p class="card-category">TX Frequency</p>
													<h4 class="card-title" id="txfreq_info"></h4>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-6 col-md-3">
								<div class="card card-stats card-success card-round">
									<div class="card-body ">
										<div class="row">
											<div class="col-5">
												<div class="icon-big text-center">
													<i class="flaticon-imac"></i>
												</div>
											</div>
											<div class="col-7 col-stats">
												<div class="numbers">
													<p class="card-category">RX Frequency</p>
													<h4 class="card-title" id="rxfreq_info"></h4>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-sm-6 col-md-3">
								<div class="card card-stats card-secondary card-round">
									<div class="card-body ">
										<div class="row">
											<div class="col-5">
												<div class="icon-big text-center">
													<i class="flaticon-power"></i>
												</div>
											</div>
											<div class="col-7 col-stats">
												<div class="numbers">
													<p class="card-category">Output Power</p>
													<h4 class="card-title" id="outputpower_info"></h4>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">
						<div class="card-head-row">
							<div class="card-title">Operation Settings</div>
							<button class="btn btn-primary mx-auto" data-toggle="modal" data-target="#modal_main">Change</button>
						</div>
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-md-12 col-lg-12">
								<div class="form-group form-inline">
									<label for="channelinput" class="col-md-3 col-form-label">Channel</label>
									<div class="col-md-6 p-0">
										<input type="text" class="form-control input-full border-primary" id="channelinput" name="channelinput" placeholder="Enter Channel">
									</div>
									<div class="col-md-3 pl-2">
										<button class="btn btn-primary" onclick="action('channel_set')">Set</button>
									</div>
								</div>
								<div class="form-group form-inline">
									<label for="powerselect" class="col-md-3 col-form-label">Power Reduction</label>
									<div class="col-md-6 p-0">
										<select class="form-control border-primary" id="powerselect" nama="powerselect" style="width: 100%;">
											<option value="">Select Power Reduction Value</option>
											<option value="M">Medium</option>
											<option value="H">High</option>
										</select>
									</div>
									<div class="col-md-3 pl-2">
										<button class="btn btn-primary" onclick="action('power_set')">Set</button>
									</div>
								</div>
								<div class="form-group form-inline">
									<label for="sqselect" class="col-md-3 col-form-label">SQ Select</label>
									<div class="col-md-6 p-0">
										<select class="form-control border-primary" id="sqselect" nama="sqselect" style="width: 100%;">
											<option value="">Select SQ Value</option>
											<option value="N">Noise</option>
											<option value="C">Carrier</option>
										</select>
									</div>
									<div class="col-md-3 pl-2">
										<button class="btn btn-primary" onclick="action('sq_set')">Set</button>
									</div>
								</div>
								<div class="form-group form-inline">
									<label for="sqlevelinput" class="col-md-3 col-form-label">Set SQ Level</label>
									<div class="col-md-6 p-0">
										<input type="text" class="form-control input-full border-primary" id="sqlevelinput" name="sqlevelinput" placeholder="Enter SQ Level">
									</div>
									<div class="col-md-3 pl-2">
										<button class="btn btn-primary" onclick="action('sqlevel_set')">Set</button>
									</div>
								</div>
								<div class="form-group form-inline">
									<label for="squplimitinput" class="col-md-3 col-form-label">Set SQ Up Limit</label>
									<div class="col-md-6 p-0">
										<input type="text" class="form-control input-full border-primary" id="squplimitinput" name="squplimitinput" placeholder="Enter SQ Up Limit">
									</div>
									<div class="col-md-3 pl-2">
										<button class="btn btn-primary" onclick="action('squplimit_set')">Set</button>
									</div>
								</div>
								<div class="form-group form-inline">
									<label class="col-md-3 col-form-label">Reset Alarm</label>
									<div class="col-md-9 pl-0">
										<button class="btn btn-primary" onclick="action('reset_alarm')">Reset</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="card-action mb-4">
					</div>
				</div>
			</div>

			<div class="col-md-4">
				<div class="card ">
					<div class="card-header">
						<div class="card-title">Alarms Information</div>
					</div>
					<div class="card-body pb-0">
						<!-- <?php date_default_timezone_set('Asia/Jakarta'); ?>
						<div class="card-category"><?= date('Y/m/d H:i:s') ?></div> -->

						<div class="row mt-2">
							<div class="col">
								<button class="btn btn-success btn-block mb-4" id="alm_RxUnitPsFail">RX UNIT PS FAIL</button>
								<button class="btn btn-success btn-block mb-5" id="alm_RxPllUnlock">RX PLL UNLOCK</button>
								<button class="btn btn-success btn-block mb-4" id="alm_TxUnitPsFail">TX UNIT PS FAIL</button>
								<button class="btn btn-success btn-block mb-5" id="alm_TxOutputFail">TX OUTPUT FAIL</button>
								<button class="btn btn-success btn-block mb-4" id="alm_TxPllUnlock">TX PLL UNLOCK</button>
								<button class="btn btn-success btn-block mb-5" id="alm_PfPowerFail">PF POWER FAIL</button>
							</div>
							<div class="col">
								<button class="btn btn-success btn-block mb-4" id="alm_PaUnitPsFail">PA UNIT PS FAIL</button>
								<button class="btn btn-success btn-block mb-5" id="alm_PaTempFail">PA TEMP FAIL</button>
								<button class="btn btn-success btn-block mb-4" id="alm_CtrlUnitPsFail">CTRL UNIT PS FAIL</button>
								<button class="btn btn-success btn-block mb-5" id="alm_PsUnitFail">PS UNIT FAIL</button>
								<button class="btn btn-success btn-block mb-4" id="alm_FanFail">FAN FAIL</button>
								<button class="btn btn-success btn-block mb-5" id="alm_PaPowerFail">PR POWER FAIL</button>

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- BAGONG -->
<?= $modal ?>