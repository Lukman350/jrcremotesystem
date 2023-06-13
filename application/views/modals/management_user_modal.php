<div class="modal fade" id="modalAdd" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title font-weight-bold" id="title"></h4>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="#" method="post" id="formModalAdd">
                <div class="modal-body">
                    <div class="box-body">
                        <div class="form-group">
                            <input type="hidden" class="form-control form-control-sm border-primary" name="id_user" id="id_user">
                            <label for="nama_lengkap" class="text-primary font-weight-bold">Nama Lengkap <span class="text-danger">*</span></label>
                            <input type="text" class="form-control form-control-sm border-primary" name="nama_lengkap" id="nama_lengkap" maxlength="120" autocomplete="off">
                            <span class="help-block text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label for="username" class="text-primary font-weight-bold">Username <span class="text-danger">*</span></label>
                            <input type="text" class="form-control form-control-sm border-primary" name="username" id="username" maxlength="70" autocomplete="off">
                            <span class="help-block text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label for="email" class="text-primary font-weight-bold">Email <span class="text-danger">*</span></label>
                            <input type="text" class="form-control form-control-sm border-primary" name="email" id="email" maxlength="100" autocomplete="off">
                            <span class="help-block text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label for="role" class="text-primary font-weight-bold">Role <span class="text-danger">*</span></label>
                            <select class="form-control form-control-sm border-primary" name="role" id="role">
                                <option value="" selected disabled></option>
                                <option value="1">Supervisor</option>
                                <option value="2">Staff</option>
                            </select>                            
                            <span class="help-block text-danger"></span>
                        </div>
                        <div class="form-group">
                            <label for="status_user" class="text-primary font-weight-bold">Status User <span class="text-danger">*</span></label>
                            <select class="form-control form-control-sm border-primary" name="status_user" id="status_user">
                                <option value="" selected disabled></option>
                                <option value="1">Aktif</option>
                                <option value="2">Non Aktif</option>
                            </select>                            
                            <span class="help-block text-danger"></span>
                        </div>
                    </div>
                </div>
            </form>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="save()">Simpan</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Tutup</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title font-weight-bold">Konfirmasi Hapus Data</h4>
                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <input type="hidden" class="form-control form-control-sm border-primary" name="id_hapus" id="id_hapus">
            </div>
            <div class="modal-body">Apakah anda yakin ingin menghapus data ini?</div>
            <div class="modal-footer">
                <button class="btn btn-danger" type="button" onclick="hapus()">Hapus</button>
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Batal</button>
            </div>
        </div>
    </div>
</div>

<div id="loading" class="modal fade" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog loading" role="document">
        <i class="text-default fas fa-spinner fa-3x fa-pulse"></i>
    </div>
</div>