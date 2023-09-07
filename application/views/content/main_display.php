<div class="content">
	<div class="panel-header bg-primary-gradient">
		<div class="page-inner py-5">
			<div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
				<div>
					<h2 class="text-white pb-2 fw-bold">Main Dashboard</h2>

				</div>
				<div class="ml-md-auto py-2 py-md-0">
					<h5 class="text-white op-2 mt-2 text-right">Radio Monitor Web Application</h5>
				</div>
			</div>
		</div>
	</div>
	<div class="page-inner mt--5">
		<div class="row">
			<div class="col">
				<div class="card">
					<div class="card-header">
						<div class="card-head-row">
							<div class="card-title">Radio List</div>
							<!-- <button class="btn btn-primary mx-auto" data-toggle="modal" data-target="#modal_main">Change</button> -->
						</div>
					</div>
					<div class="card-body w-100">
						<div class="content-wrapper">
							<?php
							$countVHF = 0;
							$countHF = 0;

							foreach ($response as $data) :
								$type = "";

								$data_radio = $data['data'];

								if ($data_radio['type'] == "VHF") {
									$countVHF = $countVHF += 1;
									$type = "VHF " . $countVHF;
								} else if ($data_radio['type'] == "HF") {
									$countHF = $countHF += 1;
									$type = "HF " . $countHF;
								} else {
									$type = "NAVTEX 1";
								}

								$radio_name = $data_radio['name'] . " " . $type;

								if ($data['status'] == false) :
							?>
									<button type="button" id="btn-vhf" data-id="<?= $data_radio['id'] ?>" data-type="<?= $data_radio['type'] ?>" class="w-100 btn btn-danger d-flex justify-content-center align-items-center" style="gap: 0.8rem;" data-toggle="modal" data-target="#radio_modal" data-ip="<?= $data_radio['ip_address'] ?>" data-name="<?= $radio_name; ?>">
										<span>
											<i class="fas fa-broadcast-tower" style="font-size: 24px;"></i>
										</span>

										<div>
											<span class="d-block"><?= $data_radio['ip_address'] ?></span>
											<span class="d-block">Radio <?= $radio_name ?></span>
											<span class="d-block">
												Status: OFF
											</span>
										</div>
									</button>
								<?php
								else :
								?>
									<button type="button" id="btn-vhf" data-id="<?= $data_radio['id'] ?>" data-type="<?= $data_radio['type'] ?>" class="w-100 btn btn-success d-flex justify-content-center align-items-center" style="gap: 0.8rem;" data-toggle="modal" data-target="#radio_modal" data-ip="<?= $data_radio['ip_address'] ?>" data-name="<?= $radio_name; ?>">
										<span>
											<i class="fas fa-broadcast-tower" style="font-size: 24px;"></i>
										</span>

										<div>
											<span class="d-block"><?= $data_radio['ip_address'] ?></span>
											<span class="d-block">Radio <?= $radio_name; ?></span>
											<span class="d-block">
												CH <?= $data_radio['sts_ch'] ?>

												<?php if ($data_radio['type'] == "HF" || $data_radio['type'] == "NAVTEX") {
													echo "Freq: " . $data_radio['sts_freq'];
												} ?>
											</span>
										</div>
									</button>
							<?php endif;
							endforeach; ?>

							<?php
							// $countVHF = 0;
							// $countHF = 0;

							// foreach ($radio_data as $radio) :
							// 	$type = "";
							// 	if ($radio['type'] == "VHF") {
							// 		$countVHF = $countVHF += 1;
							// 		$type = "VHF " . $countVHF;
							// 	} else if ($radio['type'] == "HF") {
							// 		$countHF = $countHF += 1;
							// 		$type = "HF " . $countHF;
							// 	} else {
							// 		$type = "NAVTEK 1";
							// 	}
							?>

							<!-- <div>
									<button type="button" id="btn-vhf" data-id="< //$radio['id'] " data-radio-no=" $type " class="w-100 //($radio['status'] ? 'btn btn-block btn-success' : 'btn btn-block btn-danger') " data-toggle="modal" data-target="#radio_modal">
										Radio //$type; 
										//<span class="d-block">
											// ($radio['status'] ? 'Channel ' . $radio['channel'] : 'OFF') 
										</span>
									</button>
								</div> -->
							<?php //endforeach; 
							?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<?= $modal ?>
<?= $radio_modal ?>