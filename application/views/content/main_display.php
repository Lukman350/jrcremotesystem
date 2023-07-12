<style>
	.content-wrapper {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(3, 1fr);
		grid-column-gap: 10px;
		grid-row-gap: 10px;
		overflow-wrap: break-word;
	}

	@media screen and (max-width: 600px) {
		.content-wrapper {
			display: grid;
			grid-template-columns: repeat(1, 1fr);
			grid-template-rows: repeat(10, 1fr);
			grid-column-gap: 10px;
			grid-row-gap: 10px;
		}
	}

	.radio-display {
		display: grid;
		padding: 1rem;
		border: 1px solid #4b4b4b;
		overflow: auto;
		position: relative;
	}

	.radio-display .title {
		font-size: 1.5rem;
		font-weight: bold;
		text-transform: uppercase;
	}

	.radio-display .section-title {
		font-size: 1.2rem;
		text-transform: uppercase;
		position: relative;
		top: 1.4rem;
		left: 1rem;
		background-color: #fff;
		width: fit-content;
	}

	.radio-display .section-container {
		position: relative;
	}

	.radio-display .section-1 {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(1, 1fr);
		grid-column-gap: 10px;
		grid-row-gap: 10px;
		border: 1px solid #4b4b4b;
		padding: 1rem;
	}

	.radio-display .section-2 {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-column-gap: 10px;
		grid-row-gap: 10px;
		border: 1px solid #4b4b4b;
		padding: 2rem 1rem;
	}

	.radio-display .section-3 {
		padding: 1.5rem;
		border: 1px solid #4b4b4b;
	}

	.radio-display .col-span-4 {
		grid-column: span 4;
	}

	.radio-display .section-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		column-gap: 5rem;
		min-height: 100px;
		border: 1px solid #4b4b4b;
		position: relative;
	}

	.radio-display .section-item .section-item-title {
		font-weight: bold;
		font-size: 4rem;
		text-transform: uppercase;
	}

	.radio-display .section-item .section-item-desc {
		font-size: 1rem;
		text-transform: uppercase;
		font-weight: semi-bold;
		text-align: center;
	}

	.radio-display .section-1 .section-item-desc {
		font-weight: bold;
	}

	.radio-display .section-2 .section-item-desc {
		position: absolute;
		top: -1rem;
		left: 10px;
		width: fit-content;
		background-color: #fff;
		height: fit-content;
	}

	.radio-display .p-9 {
		padding: 2.25rem;
	}

	.radio-display .bar-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		flex-wrap: nowrap;
		width: 3rem;
		height: 8rem;
		background-color: #e2e8f0;
		border-radius: 0.25rem;
		overflow: hidden;
	}

	.radio-display .progress-bar {
		width: 100%;
		height: 100%;
		text-align: center;
		overflow: hidden;
		transition: all 0.3s ease-in-out;
	}

	.radio-display .px-7 {
		padding-left: 1.75rem;
		padding-right: 1.75rem;
	}

	.bg-green {
		background-color: #B5C668;
		color: #00ff00;
	}

	/* make a loader */
	.loader {
		border: 16px solid #f3f3f3;
		border-radius: 50%;
		border-top: 16px solid #3498db;
		width: 60px;
		height: 60px;
		-webkit-animation: spin 2s linear infinite;
		/* Safari */
		animation: spin 2s linear infinite;
	}

	.loader-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

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
							// $count = 1;
							// foreach ($response as $data) :
							// 	if ($data['status'] == false) {
							// 		echo "<script>notifError();</script>";
							// 		break;
							// 	}
							// 	$data_radio = $data['data'];
							// 	$count = $count += 1;
							?>
							<!-- <div>
									<button type="button" id="btn-vhf" data-id="" data-radio-no="" class="w-100" data-toggle="modal" data-target="#radio_modal">
										<?= //$data_radio['username']
										var_dump($data_radio)
										?>
										<span class="d-block">
											<!-- < $data_radio['email'] ?> </span> -->
							<!-- </button> -->
							<!-- </div> -->
							<?php // endforeach; 
							?>

							<?php
							$countVHF = 0;
							$countHF = 0;
							foreach ($radio_data as $radio) :
								$type = "";
								if ($radio['type'] == "VHF") {
									$countVHF = $countVHF += 1;
									$type = "VHF " . $countVHF;
								} else if ($radio['type'] == "HF") {
									$countHF = $countHF += 1;
									$type = "HF " . $countHF;
								} else {
									$type = "NAVTEK 1";
								}
							?>

								<div>
									<button type="button" id="btn-vhf" data-id="<?= $radio['id'] ?>" data-radio-no="<?= $type ?>" class="w-100 <?= ($radio['status'] ? 'btn btn-block btn-success' : 'btn btn-block btn-danger') ?>" data-toggle="modal" data-target="#radio_modal">
										Radio <?= $type; ?>
										<span class="d-block">
											<?= ($radio['status'] ? 'Channel ' . $radio['channel'] : 'OFF') ?>
										</span>
									</button>
								</div>
							<?php endforeach; ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<?= $modal ?>
<?= $radio_modal ?>