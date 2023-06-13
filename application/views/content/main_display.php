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
							<div class="card-title">Radio List</div>
							<!-- <button class="btn btn-primary mx-auto" data-toggle="modal" data-target="#modal_main">Change</button> -->
						</div>
					</div>
					<div class="card-body">
						<div class="container">
							<div class="row">
								<?php foreach ($radio_data as $list) : ?>
									<div class="col">
										<button class="<?= $list['status'] == 1 ? 'btn btn-success btn-block mb-4' : 'btn btn-danger btn-block mb-4' ?>">
											Radio VHF <?= $list['id'] ?>
											<?= $list['status'] == 1 ? $list['channel'] : 'OFF' ?>
										</button>
									</div>
								<?php endforeach; ?>
							</div>
						</div>
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