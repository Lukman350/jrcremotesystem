<div class="content">
	<div class="panel-header bg-primary-gradient">
		<div class="page-inner py-5">
			<div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
				<div>
					<h2 class="text-white pb-2 fw-bold">Radio Device Information</h2>
					
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
							<div class="card-title">VoIP Information</div>
						</div>
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-md-12 col-lg-12 text-left">
								<form action="#" method="post" id="form_voip">
									<div class="form-group form-inline">
										<label for="rxpacketinput" class="col-md-3 col-form-label">RX Packets</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="rxpacketinput" name="rxpacketinput" readonly>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="rxdelayinput" class="col-md-3 col-form-label">RX Delay Packets</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="rxdelayinput" name="rxdelayinput" readonly>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="rxlossinput" class="col-md-3 col-form-label">RX Loss Packets</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="rxlossinput" name="rxlossinput" readonly>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="fifooverflowinput" class="col-md-3 col-form-label">FIFO Overflow</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="fifooverflowinput" name="fifooverflowinput" readonly>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="fifounderflowinput" class="col-md-3 col-form-label">FIFO Underflow</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="fifounderflowinput" name="fifounderflowinput" readonly>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="jitterinput" class="col-md-3 col-form-label">Jitter</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="jitterinput" name="jitterinput" readonly>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="maxjitterinput" class="col-md-3 col-form-label">Max Jitter</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="maxjitterinput" name="maxjitterinput" readonly>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="skewinput" class="col-md-3 col-form-label">Skew</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="skewinput" name="skewinput" readonly>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="maxskewinput" class="col-md-3 col-form-label">Max Skew</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="maxskewinput" name="maxskewinput" readonly>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="jitterbufferinput" class="col-md-3 col-form-label">Jitter Buffer</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="jitterbufferinput" name="jitterbufferinput" readonly>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="samplingrateinput" class="col-md-3 col-form-label">Sampling Rate Error</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="samplingrateinput" name="samplingrateinput" readonly>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="ratecontrolinput" class="col-md-3 col-form-label">Rate Control</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="ratecontrolinput" name="ratecontrolinput" readonly>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="ratecountinput" class="col-md-3 col-form-label">Rate Controlled Count</label>
										<div class="col-md-6 p-0">
											<input type="text" class="form-control input-full border-primary" id="ratecountinput" name="ratecountinput" readonly>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="card-action">
						<button class="btn btn-primary" onclick="action('clear_voip_information')">Clear</button>
					</div>
				</div>
			</div>
			<div class="col-md-4">
				<div class="card">
					<div class="card-header">
						<div class="card-title">Version</div>
					</div>
					<div class="card-body">
						<div class="row mt-2">
							<div class="col-md-12 col-lg-12">
								<div class="form-group form-inline">
									<label for="maininput" class="col-md-3 col-form-label">Main</label>
									<div class="col-md-6 p-0">
										<input type="text" class="form-control input-full border-primary" id="maininput" name="maininput" readonly>
									</div>
								</div>
								<div class="form-group form-inline">
									<label for="mcdspinput" class="col-md-3 col-form-label">MCDSP</label>
									<div class="col-md-6 p-0">
										<input type="text" class="form-control input-full border-primary" id="mcdspinput" name="mcdspinput" readonly>
									</div>
								</div>
								<div class="form-group form-inline">
									<label for="vdspinput" class="col-md-3 col-form-label">VDSP</label>
									<div class="col-md-6 p-0">
										<input type="text" class="form-control input-full border-primary" id="vdspinput" name="vdspinput" readonly>
									</div>
								</div>
								<div class="form-group form-inline">
									<label for="fpgainput" class="col-md-3 col-form-label">FPGA</label>
									<div class="col-md-6 p-0">
										<input type="text" class="form-control input-full border-primary" id="fpgainput" name="fpgainput" readonly>
									</div>
								</div>
								<div class="form-group form-inline">
									<label for="cpuinput" class="col-md-3 col-form-label">CPU</label>
									<div class="col-md-6 p-0">
										<input type="text" class="form-control input-full border-primary" id="cpuinput" name="cpuinput" readonly>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="card">
					<div class="card-header">
						<div class="card-title">Mac Address</div>
					</div>
					<div class="card-body">
						<div class="row mt-2">
							<div class="col-md-12 col-lg-12">
								<div class="form-group form-inline">
									<label for="macinput" class="col-md-3 col-form-label">MAC</label>
									<div class="col-md-6 p-0">
										<input type="text" class="form-control input-full border-primary" id="macinput" name="macinput" readonly>
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