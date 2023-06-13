<div class="content">
	<div class="panel-header bg-primary-gradient">
		<div class="page-inner py-5">
			<div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
				<div>
					<h2 class="text-white pb-2 fw-bold">Radio Device Settings</h2>
					
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
				<div class="card">
					<div class="card-header">
						<div class="card-head-row">
							<div class="card-title">VoIP Settings</div>
						</div>
					</div>
					<div class="card-body">
						<form action="#" method="post" id="form_voip_settings">
							<div class="row">
								<div class="col-md-6 col-lg-6">
									<div class="form-group form-inline">
										<label for="rtp_out" class="col-md-3 col-form-label">VoIP Output</label>
										<div class="col-md-8">
											<select class="form-control border-primary" id="rtp_out" name="rtp_out" style="width: 100%;">
												<option value="">Select VoIP Output</option>
												<option value="0">Disabled</option>
												<option value="1">Enabled</option>
											</select>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="snd_mode" class="col-md-3 col-form-label">VoIP Send Mode</label>
										<div class="col-md-8">
											<select class="form-control border-primary" id="snd_mode" name="snd_mode" style="width: 100%;">
												<option value="">Select VoIP Send Mode</option>
												<option value="1">Always</option>
												<option value="2">Receive Signal</option>
												<option value="3">Stop</option>
											</select>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="src_voip1" class="col-md-3 col-form-label">SRC IP Address</label>
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="src_voip1" name="src_voip1" placeholder="Input">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="src_voip2" name="src_voip2" placeholder="Input">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="src_voip3" name="src_voip3" placeholder="Input">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="src_voip4" name="src_voip4" placeholder="Input">
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="dst_voip1" class="col-md-3 col-form-label">DST IP Address</label>
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="dst_voip1" name="dst_voip1" placeholder="Input">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="dst_voip2" name="dst_voip2" placeholder="Input">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="dst_voip3" name="dst_voip3" placeholder="Input">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="dst_voip4" name="dst_voip4" placeholder="Input">
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="src_udp_port" class="col-md-3 col-form-label">SRC Port</label>
										<div class="col-md-8">
											<input type="text" class="form-control input-full border-primary" id="src_udp_port" name="src_udp_port" placeholder="Enter SRC Port">
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="dst_udp_port" class="col-md-3 col-form-label">DST Port</label>
										<div class="col-md-8">
											<input type="text" class="form-control input-full border-primary" id="dst_udp_port" name="dst_udp_port" placeholder="Enter DST Port">
										</div>
									</div>
								</div>
								<div class="col-md-6 col-lg-6">
									<div class="form-group form-inline">
										<label for="jit_buf" class="col-md-3 col-form-label">Jitter Buffer Size</label>
										<div class="col-md-8">
											<input type="text" class="form-control input-full border-primary" id="jit_buf" name="jit_buf" placeholder="Enter Jitter Buffer Size">
										</div> ms
									</div>
									<div class="form-group form-inline">
										<label for="snd_int" class="col-md-3 col-form-label">Send Interval</label>
										<div class="col-md-8">
											<input type="text" class="form-control input-full border-primary" id="snd_int" name="snd_int" placeholder="Enter Send Interval">
										</div> ms
									</div>
									<div class="form-group form-inline">
										<label for="key_src" class="col-md-3 col-form-label">Key Source</label>
										<div class="col-md-8">
											<select class="form-control border-primary" id="key_src" name="key_src" style="width: 100%;">
												<option value="">Select Key Source</option>
												<option value="1">Marker Bit</option>
												<option value="2">Payload</option>
											</select>
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="mcast_ttl" class="col-md-3 col-form-label">TTL</label>
										<div class="col-md-8">
											<input type="text" class="form-control input-full border-primary" id="mcast_ttl" name="mcast_ttl" placeholder="Enter TTL">
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="mcast_tos" class="col-md-3 col-form-label">TOS</label>
										<div class="col-md-8">
											<input type="text" class="form-control input-full border-primary" id="mcast_tos" name="mcast_tos" placeholder="Enter TOS">
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div class="card-action">
						<button class="btn btn-success" onclick="action('voip_set')">Set</button>
						<button class="btn btn-info" onclick="action('voip_refresh')">Refresh</button>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-8">
				<div class="card">
					<div class="card-header">
						<div class="card-head-row">
							<div class="card-title">TCP I/F Settings</div>
						</div>
					</div>
					<div class="card-body">
						<div class="row">
							<div class="col-md-12 col-lg-12">
								<form action="#" method="post" id="form_tcpif_settings">
									<div class="form-group form-inline">
										<label for="ip1" class="col-md-3 col-form-label">IP Address</label>
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="ip1" name="ip1" placeholder="Enter Value">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="ip2" name="ip2" placeholder="Enter Value">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="ip3" name="ip3" placeholder="Enter Value">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="ip4" name="ip4" placeholder="Enter Value">
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="nm1" class="col-md-3 col-form-label">Network Mask</label>
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="nm1" name="nm1" placeholder="Enter Value">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="nm2" name="nm2" placeholder="Enter Value">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="nm3" name="nm3" placeholder="Enter Value">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="nm4" name="nm4" placeholder="Enter Value">
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="gw1" class="col-md-3 col-form-label">Default Gateway</label>
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="gw1" name="gw1" placeholder="Enter Value">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="gw2" name="gw2" placeholder="Enter Value">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="gw3" name="gw3" placeholder="Enter Value">
										</div>.
										<div class="col-md-2">
											<input type="text" class="form-control input-full border-primary" id="gw4" name="gw4" placeholder="Enter Value">
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="tcp_port" class="col-md-3 col-form-label">TCP Port</label>
										<div class="col-md-8">
											<input type="text" class="form-control input-full border-primary" id="tcp_port" name="tcp_port" placeholder="Enter TCP Port">
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="unit_addr" class="col-md-3 col-form-label">Unit Address</label>
										<div class="col-md-8">
											<input type="text" class="form-control input-full border-primary" id="unit_addr" name="unit_addr" placeholder="Enter Unit Address">
										</div>
									</div>
									<div class="form-group form-inline">
										<label for="dsc_addr" class="col-md-3 col-form-label">DSC Unit Address</label>
										<div class="col-md-8">
											<input type="text" class="form-control input-full border-primary" id="dsc_addr" name="dsc_addr" placeholder="Enter DSC Unit Address">
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div class="card-action">
						<button class="btn btn-success" onclick="action('tcpif_set')">Set</button>
						<button class="btn btn-info" onclick="action('tcpif_refresh')">Refresh</button>
					</div>
				</div>
			</div>	
			<div class="col-md-4">
				<div class="card">
					<div class="card-header">
						<div class="card-title">Reset Unit</div>
					</div>
					<div class="card-action">
						<button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Reset</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Warning!</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				Are you sure want to reset transmitter?
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" onclick="action('reset_unit')">OK</button>
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

