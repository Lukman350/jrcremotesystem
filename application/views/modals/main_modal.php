<!-- Modal Reset Unit Master -->
<div class="modal fade" id="modal_main" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="title_modal_main">Change Operation Settings</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
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
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>