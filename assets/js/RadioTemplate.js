const getRadioTemplates = (data) => {
  let result;

  const type = data.type;
  
  if (type === "VHF") {
    const {
      id,
      type,
      ip_address,
      name,
      status,
      rmt_sw,
      unit_no,
      sts_ch,
      sts_txfreq,
      sts_rxfreq,
      sts_po,
      ch,
      sts_pow,
      sq_lvl,
      sq_uplim,
      alm_RxUnitPsFail,
      alm_TxUnitPsFail,
      alm_PaUnitPsFail,
      alm_CtrlUnitPsFail,
      alm_PsUnitFail,
      alm_TxOutputFail,
      alm_RxPllUnlock,
      alm_TxPllUnlock,
      alm_PaTempFail,
      alm_FanFail,
      alm_PfPowerFail,
      alm_PaPowerFial,
      sts_rx_pkt,
      sts_rx_delay_pkt,
      sts_rx_loss_pkt,
      sts_fifo_over,
      sts_fifo_under,
      sts_jitter,
      sts_max_jitter,
      sts_skew,
      sts_max_skew,
      sts_jit_usage,
      sts_frqerr,
      sts_rate_control,
      sts_rate_count,
      sts_main,
      sts_mcdsp,
      sts_vdsp,
      sts_fpga,
      sts_cpu,
      sts_mac,
      sts_tone
    } = data;

    const max_level = 200;

    const rx_level = parseInt(sts_rxfreq) / max_level * 100;
    const tx_level = parseInt(sts_txfreq) / max_level * 100;

    result = `
    <h2>${name}</h2>

    <div class="radio-display">
      <div class="section-container">
        <h3 class="section-title my-2">
          Radio Display
        </h3>
  
        <div class="section-1">
          <div
            class="section-item py-4"
          >
            <h1
              class="section-item-title"
              id="channel-number-1"
            >
              ${status ? sts_ch : "OFF"}
            </h1>
  
            <p
              class="section-item-desc"
            >
              Channel Number
            </p>
          </div>
          <div
            class="section-item py-4"
          >
            <div class="p-9 rounded ${status ? "bg-green" : "bg-danger"}" id="radio-status-div">
              <span id="radio-status" class="text-white">
                ${status ? "ON" : "OFF"}
              </span>
            </div>
            <p
              class="section-item-desc"
            >
              Radio Status
            </p>
          </div>
          <div
            class="section-item py-2"
          >
            <div class="line-wrapper">
              <div class="line-number"></div>
              <div class="line-number"></div>
              <div class="line-number"></div>
              <div class="line-number"></div>
              <div class="line-number"></div>
              <div class="line-number"></div>
            </div>
            <div
              class="bar-wrapper"
            >
              <div
                class="progress-bar bg-danger"
                role="progressbar"
                style="height: ${status ? rx_level : 0}%"
                aria-valuenow="${status ? rx_level : 0}"
                aria-valuemin="0"
                aria-valuemax="200"
                id="rx-level-bar"
              >
                <span class="text-dark" id="rx-level-value" style="bottom: 179px; left: 18px;">
                  ${status ? sts_rxfreq : 0}
                </span>
              </div>
            </div>
            <p
              class="section-item-desc"
            >
              RX Freq
            </p>
          </div>
          <div
            class="section-item py-2"
          >
            <div class="line-wrapper">
              <div class="line-number"></div>
              <div class="line-number"></div>
              <div class="line-number"></div>
              <div class="line-number"></div>
              <div class="line-number"></div>
              <div class="line-number"></div>
            </div>
            <div
              class="bar-wrapper"
            >
              <div
                class="progress-bar bg-danger"
                role="progressbar"
                style="height: ${status ? tx_level : 0}%"
                aria-valuenow="${status ? tx_level : 0}"
                aria-valuemin="0"
                aria-valuemax="100"
                id="power-level-bar"
              >
                <span class="text-dark" id="power-level-value" style="bottom: 179px; left: 18px;">${status ? sts_txfreq : 0}</span>
              </div>
            </div>
            <p
              class="section-item-desc"
            >
              Tx Freq
            </p>
          </div>
          <div
            class="section-item py-2 px-2"
          >
            <p class="section-item-desc" style="word-wrap: break-word;">Output Power</p>

            <button
              class="btn ${status ? "btn-custom" : "btn-danger"}"
              type="button"
              id="output-power-vhf"
              ${status ? "" : "disabled"}
            >
              ${status ? sts_po : "OFF"}
            </button>
          </div>
        </div>
      </div>
  
      <div class="section-container">
        <h3 class="section-title">
          Radio Control
        </h3>
  
        <div class="section-2" style="grid-template-rows: repeat(1, 1fr);">
          <div
            class="section-item px-2"
          >
            <p
              class="section-item-desc"
            >
              Channel No
            </p>
  
            <form method="POST" id="form-set-channel" class="d-flex flex-column" style="gap: 0.3rem">
              <input
                type="number"
                class="form-control"
                id="channel-input-vhf"
                value="${status ? sts_ch : 0}"
                ${status ? "" : "disabled"}
                placeholder="Enter Channel Number"
                required
              />

              <button type="submit" class="btn btn-sm ${status ? "btn-success" : "btn-danger"}" ${status ? "" : "disabled"}>SET</button>
            </form>
          </div>
          <div
            class="section-item px-2 py-2"
          >
            <p
              class="section-item-desc"
            >
              Power Reduction
            </p>
  
            <form id="power-reduction-form" method="POST" class="d-flex flex-column" style="gap: 0.3rem; padding-top: 2rem">
              <select id="power-reduction-vhf" class="form-control" ${status ? "" : "disabled"}>
                <option value="HI" ${sts_pow === "HI" ? "selected disabled" : ""}>HI</option>
                <option value="MED" ${sts_pow === "MED" ? "selected disabled" : ""}>MED</option>
              </select>

              <button type="submit" class="btn btn-sm ${status ? "btn-success" : "btn-danger"}" ${status ? "" : "disabled"}>SET</button>
            </form>
          </div>
          <div
            class="section-item px-2"
          >
            <p
              class="section-item-desc"
            >
              Set SQ Level
            </p>
  
            <form id="sq-level-form" method="POST" class="d-flex flex-column" style="gap: 0.3rem">
              <input
                type="number"
                class="form-control"
                id="sq-level-vhf"
                ${status ? "" : "disabled"}
                value="${status ? sq_lvl : 0}"
                placeholder="Enter SQ Level"
                required
              />

              <button type="submit" class="btn btn-sm ${status ? "btn-success" : "btn-danger"}" ${status ? "" : "disabled"}>SET</button>
            </form>
          </div>
          <div
            class="section-item px-2 py-2"
          >
            <p
              class="section-item-desc"
            >
              Set SQ Up Limit
            </p>

            <form id="sq-limit-form" class="d-flex flex-column" style="gap: 0.3rem; padding-top: 2.5rem">
              <input
                type="number"
                class="form-control"
                id="sq-limit-vhf"
                ${status ? "" : "disabled"}
                value="${status ? sq_uplim : 0}"
                placeholder="Enter SQ Limit"
                required
              />

              <button type="submit" class="btn btn-sm ${status ? "btn-success" : "btn-danger"}" ${status ? "" : "disabled"}>SET</button>
            </form>
          </div>
          <div
            class="section-item"
          >
            <p
              class="section-item-desc"
            >
              Reset Alarm
            </p>
            
            <button class="btn btn-custom" id="reset-btn" ${status ? "" : "disabled"}>
              Reset
            </button>
          </div>
        </div>
      </div>
  
      <div class="section-container">
        <h3 class="section-title">
          Radio Alarm Status
        </h3>

        <div class="section-3">
          <div class="row">
            <div class="col">
              <button class="btn ${alm_RxUnitPsFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_RxUnitPsFail" value="RX UNIT PS FAIL">RX UNIT PS FAIL</button>
              <button class="btn ${alm_TxUnitPsFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_TxUnitPsFail">TX UNIT PS FAIL</button>
              <button class="btn ${alm_PaUnitPsFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PaUnitPsFail">PA UNIT PS FAIL</button>
              <button class="btn ${alm_CtrlUnitPsFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_CtrlUnitPsFail">CTRL UNIT PS FAIL</button>
              <button class="btn ${alm_PsUnitFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PsUnitFail">PS UNIT FAIL</button>
              <button class="btn ${alm_TxOutputFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_TxOutputFail">TX OUTPUT FAIL</button>
            </div>
            <div class="col">
              <button class="btn ${alm_RxPllUnlock === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_RxPllUnlock">RX PLL UNLOCK</button>
              <button class="btn ${alm_TxPllUnlock === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_TxPllUnlock">TX PLL UNLOCK</button>
              <button class="btn ${alm_PaTempFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PaTempFail">PA TEMP FAIL</button>
              <button class="btn ${alm_FanFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_FanFail">FAN FAIL</button>
              <button class="btn ${alm_PfPowerFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PfPowerFail">Pf Power FAIL</button>
              <button class="btn ${alm_PaPowerFial === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PaPowerFial">Pr Power FAIL</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  } else if (type === "HF") {
    const {
      id,
      type,
      ip_address,
      name,
      status,
      rmt_sw,
      unit_no,
      sts_ch,
      sts_freq,
      sts_em,
      sts_swr,
      sts_po,
      sts_pf,
      sts_pr,
      sts_pow,
      sts_test,
      sts_pa,
      sts_tune,
      sts_cal,
      alm_AmuUnmatch,
      alm_LevelMax,
      alm_LevelMin,
      alm_PowerDown,
      alm_MuDetune,
      alm_PaCombine1,
      alm_SoftInterlock,
      alm_PaFail1,
      alm_MuManual,
      alm_KeyInterlock,
      alm_AmuBusy,
      alm_KeyTrip,
      alm_ExciterAlarm,
      alm_AmuFail,
      alm_PsOverVoltage,
      alm_PsOverCurrent,
      alm_FuseBlown,
      alm_PaCombine2,
      alm_DrvAmpFail,
      alm_PaFail2,
      alm_TuneFail,
      alm_AntVswr,
      alm_Local,
      alm_LineError,
      sts_tone,
    } = data;

    const emission_mode = ["CW", "SSB-F", "SSB-R", "SSB-S", "FSK"];

    result = `
    <h2>${name}</h2>

    <div class="radio-display">
      <div class="section-container">
        <h3 class="section-title my-2">
          Radio Display
        </h3>
  
        <div class="section-1">
          <div
            class="section-item py-4"
          >
            <h1
              class="section-item-title"
              id="channel-number-1"
            >
              ${status ? sts_ch : "OFF"}
            </h1>
  
            <p
              class="section-item-desc"
            >
              Channel Number
            </p>
          </div>
          <div
            class="section-item py-4"
          >
            <div class="p-9 rounded ${status ? "bg-green" : "bg-danger"}" id="radio-status-div">
              <span id="radio-status" class="text-white">
                ${status ? "ON" : "OFF"}
              </span>
            </div>
            <p
              class="section-item-desc"
            >
              Radio Status
            </p>
          </div>
          <div
            class="section-item py-2"
          >
            <h3>${status ? sts_freq : "0 kHz"}</h3>
            <p
              class="section-item-desc"
            >
              Frequency
            </p>
          </div>
          <div
            class="section-item px-2"
          >
            <h3>${status ? emission_mode[sts_em] : "OFF"}</h3>
            <p
              class="section-item-desc"
            >
              Emission Mode
            </p>
          </div>
          <div
            class="section-item py-2"
          >
            <div style="width: 80%; margin: 0 auto; display: flex; flex-direction: column; justify-content: center;">
              <p
                class="section-item-desc"
                style="word-wrap: break-word;"
              >
                Output Power
              </p>
  
              <button
                class="btn ${status ? "btn-custom" : "btn-danger"}"
                type="button"
                id="output-power-hf"
                ${status ? "" : "disabled"}
                style="margin: 0 auto;"
              >
                ${status ? sts_po : "OFF"}
              </button>
            </div>
            <div>
              <p
                class="section-item-desc"
              >
                Pf
              </p>
  
              <button
                class="btn ${status ? "btn-custom" : "btn-danger"}"
                type="button"
                id="pf-value"
                ${status ? "" : "disabled"}
              >
                ${status ? sts_pf : "OFF"}
              </button>
            </div>
            <div>
              <p
                class="section-item-desc"
              >
                Pr
              </p>
  
              <button
                class="btn ${status ? "btn-custom" : "btn-danger"}"
                type="button"
                id="pr-value"
                ${status ? "" : "disabled"}
              >
                ${status ? sts_pr : "OFF"}
              </button>
            </div>
            <div>
              <p
                class="section-item-desc"
              >
                SWR
              </p>
  
              <button
                class="btn ${status ? "btn-custom" : "btn-danger"}"
                type="button"
                id="pr-value"
                ${status ? "" : "disabled"}
              >
                ${status ? sts_swr : "OFF"}
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section-container">
        <h3 class="section-title">
          Radio Control
        </h3>
  
        <div class="section-2">
          <div
            class="section-item px-2"
          >
            <p
              class="section-item-desc"
            >
              Channel No
            </p>
  
            <form id="form-set-channel" method="POST" class="d-flex flex-column" style="gap: 0.3rem">
              <input
                type="number"
                class="form-control"
                id="channel-input-hf"
                value="${status ? sts_ch : 0}"
                ${status ? "" : "disabled"}
                placeholder="Enter Channel Number"
                required
              />

              <button type="submit" class="btn btn-sm ${status ? "btn-success" : "btn-danger"}" ${status ? "" : "disabled"}>SET</button>
            </form>
          </div>
          <div
            class="section-item"
          >
            <p
              class="section-item-desc"
            >
              PA
            </p>
  
            <button class="btn ${sts_pa === "ON" || status ? "btn-danger" : "btn-custom"}" ${status ? "" : "disabled"} id="power-btn">
              ${sts_pa === "ON" ? "OFF" : "ON"}
            </button>
          </div>
          <div
            class="section-item"
          >
            <p
              class="section-item-desc"
            >
              Power Reduction
            </p>
  
            <form id="power-reduction-form" method="POST" class="d-flex flex-column" style="gap: 0.3rem; padding: 2rem 0;">
              <select id="power-reduction" class="form-control" ${status ? "" : "disabled"}>
                <option value="LOW" ${sts_pow === "LOW" ? "selected disabled" : ""}>LOW</option>
                <option value="MED" ${sts_pow === "MED" ? "selected disabled" : ""}>MED</option>
                <option value="FULL" ${sts_pow === "FULL" ? "selected disabled" : ""}>FULL</option>
              </select>

              <button type="submit" class="btn btn-sm ${status ? "btn-success" : "btn-danger"}" ${status ? "" : "disabled"}>SET</button>
            </form>
          </div>
          <div
            class="section-item"
          >
            <p
              class="section-item-desc"
            >
              Test Output
            </p>
            
            <form id="test-output-form" method="POST" class="d-flex flex-column" style="gap: 0.3rem; padding: 2rem 0;">
              <select id="test-output" class="form-control" ${status ? "" : "disabled"}>
                <option value="OFF" ${sts_test === "OFF" ? "selected disabled" : ""}>OFF</option>
                <option value="400Hz" ${sts_test === "400Hz" ? "selected disabled" : ""}>400Hz</option>
                <option value="1kHz" ${sts_test === "1kHz" ? "selected disabled" : ""}>1kHz</option>
                <option value="2kHz" ${sts_test === "2kHz" ? "selected disabled" : ""}>2kHz</option>
              </select>

              <button type="submit" class="btn btn-sm ${status ? "btn-success" : "btn-danger"}" ${status ? "" : "disabled"}>SET</button>
            </form>
          </div>
          <div
            class="section-item"
          >
            <p
              class="section-item-desc"
            >
              Tune
            </p>
            
            <button class="btn ${sts_tune === "STOP" ? "btn-custom" : "btn-danger"}" ${status ? "" : "disabled"} id="tune-btn">
              ${sts_tune === "STOP" ? "START" : "STOP"}
            </button>
          </div>
          <div class="col-span-3"></div>
          <div
            class="section-item my-2"
          >
            <p
              class="section-item-desc"
            >
              Power Calibration
            </p>
  
            <div style="padding: 2rem 0;">
              <button
                class="btn ${sts_cal === "STOP" || status ? "btn-custom" : "btn-danger"}"
                ${status ? "" : "disabled"}
                type="button"
                id="pwr-cal-btn"
              >
                ${sts_cal === "STOP" ? "START" : "STOP"}
              </button>
            </div>
          </div>
          <div
            class="section-item my-2"
          >
            <p
              class="section-item-desc"
            >
              Reset Alarm
            </p>
  
            <button
              class="btn ${status ? "btn-custom" : "btn-danger"}"
              ${status ? "" : "disabled"}
              type="button"
              id="reset-btn"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
  
      <div class="section-container">
        <h3 class="section-title">
          Radio Alarm Status
        </h3>
  
        <div class="section-3">
          <div class="row">
            <div class="col">
              <button class="btn ${alm_ExciterAlarm === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_ExciterAlarm">EXCITER ALARM</button>
              <button class="btn ${alm_AmuFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_AmuFail">AMU FAIL</button>
              <button class="btn ${alm_PsOverVoltage === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PsOverVoltage">PS OVER VOLTAGE</button>
              <button class="btn ${alm_PsOverCurrent === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PsOverCurrent">PS OVER CURRENT</button>
              <button class="btn ${alm_FuseBlown === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_FuseBlown">FUSE BLOWN</button>
              <button class="btn ${alm_PaCombine2 === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PaCombine2">PA COMBINE</button>
            </div>
            <div class="col">
              <button class="btn ${alm_DrvAmpFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_DrvAmpFail">DRV AMP FAIL</button>
              <button class="btn ${alm_PaFail2 === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PaFail2">PA FAIL</button>
              <button class="btn ${alm_TuneFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_TuneFail">TUNE FAIL</button>
              <button class="btn ${alm_AntVswr === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_AntVswr">ANT VSWR</button>
              <button class="btn ${alm_Local === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_Local">LOCAL</button>
              <button class="btn ${alm_LineError === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_LineError">LINE ERROR</button>
            </div>
          </div>
        </div>

        <h3 class="section-title">
          Radio Warning Status
        </h3>
  
        <div class="section-3">
          <div class="row">
            <div class="col">
              <button class="btn ${alm_AmuUnmatch === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_AmuUnmatch">AMU UNMATCH</button>
              <button class="btn ${alm_LevelMax === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_LevelMax">LEVEL MAX</button>
              <button class="btn ${alm_LevelMin === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_LevelMin">LEVEL MIN</button>
              <button class="btn ${alm_PowerDown === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PowerDown">POWER DOWN</button>
              <button class="btn ${alm_MuDetune === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_MuDetune">MU DETUNE/button>
              <button class="btn ${alm_PaCombine1 === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PaCombine1">PA COMBINE</button>
            </div>
            <div class="col">
              <button class="btn ${alm_SoftInterlock === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_SoftInterlock">SOFT INTERLOCK</button>
              <button class="btn ${alm_PaFail1 === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PaFail1">PA FAIL</button>
              <button class="btn ${alm_MuManual === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_MuManual">MU MANUAL</button>
              <button class="btn ${alm_KeyInterlock === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_KeyInterlock">KEY INTERLOCK</button>
              <button class="btn ${alm_AmuBusy === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_AmuBusy">AMU BUSY</button>
              <button class="btn ${alm_KeyTrip === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_KeyTrip">KEY TRIP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  } else if (type === "NAVTEX") {
    const {
      id,
      type,
      ip_address,
      name,
      status,
      rmt_sw,
      unit_no,
      sts_ch,
      sts_freq,
      sts_em,
      sts_swr,
      sts_po,
      sts_pf,
      sts_pr,
      sts_pow,
      sts_test,
      sts_key,
      sts_pa,
      sts_tune,
      sts_cal,
      alm_AmuUnmatch,
      alm_LevelMax,
      alm_LevelMin,
      alm_PowerDown,
      alm_MuDetune,
      alm_PaCombine1,
      alm_SoftInterlock,
      alm_PaFail1,
      alm_KeyInterlock,
      alm_AmuBusy,
      alm_KeyTrip,
      alm_ExciterAlarm,
      alm_AmuFail,
      alm_PsOverVoltage,
      alm_PsOverCurrent,
      alm_FuseBlown,
      alm_PaCombine2,
      alm_DrvAmpFail,
      alm_PaFail2,
      alm_TuneFail,
      alm_AntVswr,
      alm_Local,
      alm_LineError,
      sts_tone,
    } = data;

    const emission_mode = ["CW", "SSB-F", "SSB-R", "SSB-S", "FSK"];

    result = `
    <h2>${name}</h2>
    
    <div class="radio-display">
      <div class="section-container">
        <h3 class="section-title my-2">
          Radio Display
        </h3>
  
        <div class="section-1">
          <div
            class="section-item py-4"
          >
            <h1
              class="section-item-title"
              id="channel-number-1"
            >
              ${status ? sts_ch : "OFF"}
            </h1>
  
            <p
              class="section-item-desc"
            >
              Channel Number
            </p>
          </div>
          <div
            class="section-item py-4"
          >
            <div class="p-9 rounded ${status ? "bg-green" : "bg-danger"}" id="radio-status-div">
              <span id="radio-status" class="text-white">
                ${status ? "ON" : "OFF"}
              </span>
            </div>
            <p
              class="section-item-desc"
            >
              Radio Status
            </p>
          </div>
          <div
            class="section-item py-2"
          >
            <h3>${status ? sts_freq : "0 kHz"}</h3>
            <p
              class="section-item-desc"
            >
              Frequency
            </p>
          </div>
          <div
            class="section-item px-2"
          >
            <h3>${status ? emission_mode[sts_em] : "OFF"}</h3>
            <p
              class="section-item-desc"
            >
              Emission Mode
            </p>
          </div>
          <div
            class="section-item py-2"
          >
            <div style="width: 80%; margin: 0 auto; display: flex; flex-direction: column; justify-content: center;">
              <p
                class="section-item-desc"
                style="word-wrap: break-word;"
              >
                Output Power
              </p>
  
              <button
                class="btn ${status ? "btn-custom" : "btn-danger"}"
                type="button"
                id="output-power-hf"
                ${status ? "" : "disabled"}
                style="margin: 0 auto;"
              >
                ${status ? sts_po : "OFF"}
              </button>
            </div>
            <div>
              <p
                class="section-item-desc"
              >
                Pf
              </p>
  
              <button
                class="btn ${status ? "btn-custom" : "btn-danger"}"
                type="button"
                id="pf-value"
                ${status ? "" : "disabled"}
              >
                ${status ? sts_pf : "OFF"}
              </button>
            </div>
            <div>
              <p
                class="section-item-desc"
              >
                Pr
              </p>
  
              <button
                class="btn ${status ? "btn-custom" : "btn-danger"}"
                type="button"
                id="pr-value"
                ${status ? "" : "disabled"}
              >
                ${status ? sts_pr : "OFF"}
              </button>
            </div>
            <div>
              <p
                class="section-item-desc"
              >
                SWR
              </p>
  
              <button
                class="btn ${status ? "btn-custom" : "btn-danger"}"
                type="button"
                id="pr-value"
                ${status ? "" : "disabled"}
              >
                ${status ? sts_swr : "OFF"}
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="section-container">
        <h3 class="section-title">
          Radio Control
        </h3>
  
        <div class="section-2">
          <div
            class="section-item px-2"
          >
            <p
              class="section-item-desc"
            >
              Channel No
            </p>
  
            <form id="form-set-channel" method="POST" class="d-flex flex-column" style="gap: 0.3rem">
              <input
                type="number"
                class="form-control"
                id="channel-input-hf"
                value="${status ? sts_ch : 0}"
                ${status ? "" : "disabled"}
                placeholder="Enter Channel Number"
                required
              />

              <button type="submit" class="btn btn-sm ${status ? "btn-success" : "btn-danger"}" ${status ? "" : "disabled"}>SET</button>
            </form>
          </div>
          <div
            class="section-item"
          >
            <p
              class="section-item-desc"
            >
              key
            </p>
  
            <button class="btn ${sts_key === "ON" || status ? "btn-danger" : "btn-custom"}" ${status ? "" : "disabled"} id="power-btn">
              ${sts_key === "ON" ? "OFF" : "ON"}
            </button>
          </div>
          <div
            class="section-item"
          >
            <p
              class="section-item-desc"
            >
              Power Reduction
            </p>
  
            <form id="power-reduction-form" method="POST" class="d-flex flex-column" style="gap: 0.3rem; padding: 2rem 0;">
              <select id="power-reduction" class="form-control" ${status ? "" : "disabled"}>
                <option value="LOW" ${sts_pow === "LOW" ? "selected disabled" : ""}>LOW</option>
                <option value="MED" ${sts_pow === "MED" ? "selected disabled" : ""}>MED</option>
                <option value="FULL" ${sts_pow === "FULL" ? "selected disabled" : ""}>FULL</option>
              </select>

              <button type="submit" class="btn btn-sm ${status ? "btn-success" : "btn-danger"}" ${status ? "" : "disabled"}>SET</button>
            </form>
          </div>
          <div
            class="section-item"
          >
            <p
              class="section-item-desc"
            >
              Test Output
            </p>
            
            <form id="test-output-form" method="POST" class="d-flex flex-column" style="gap: 0.3rem; padding: 2rem 0;">
              <select id="test-output" class="form-control" ${status ? "" : "disabled"}>
                <option value="OFF" ${sts_test === "OFF" ? "selected disabled" : ""}>OFF</option>
                <option value="400Hz" ${sts_test === "400Hz" ? "selected disabled" : ""}>400Hz</option>
                <option value="1kHz" ${sts_test === "1kHz" ? "selected disabled" : ""}>1kHz</option>
                <option value="2kHz" ${sts_test === "2kHz" ? "selected disabled" : ""}>2kHz</option>
              </select>

              <button type="submit" class="btn btn-sm ${status ? "btn-success" : "btn-danger"}" ${status ? "" : "disabled"}>SET</button>
            </form>
          </div>
          <div
            class="section-item"
          >
            <p
              class="section-item-desc"
            >
              Tune
            </p>
            
            <button class="btn ${sts_tune === "STOP" ? "btn-custom" : "btn-danger"}" ${status ? "" : "disabled"} id="tune-btn">
              ${sts_tune === "STOP" ? "START" : "STOP"}
            </button>
          </div>
          <div class="col-span-3"></div>
          <div
            class="section-item my-2"
          >
            <p
              class="section-item-desc"
            >
              Power Calibration
            </p>
  
            <div style="padding: 2rem 0;">
              <button
                class="btn ${sts_cal === "STOP" || status ? "btn-custom" : "btn-danger"}"
                ${status ? "" : "disabled"}
                type="button"
                id="pwr-cal-btn"
              >
                ${sts_cal === "STOP" ? "START" : "STOP"}
              </button>
            </div>
          </div>
          <div
            class="section-item my-2"
          >
            <p
              class="section-item-desc"
            >
              Reset Alarm
            </p>
  
            <button
              class="btn ${status ? "btn-custom" : "btn-danger"}"
              ${status ? "" : "disabled"}
              type="button"
              id="reset-btn"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
  
      <div class="section-container">
        <h3 class="section-title">
          Radio Alarm Status
        </h3>
  
        <div class="section-3">
          <div class="row">
            <div class="col">
              <button class="btn ${alm_ExciterAlarm === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_ExciterAlarm" value="EXCITER ALARM">EXCITER ALARM</button>
              <button class="btn ${alm_AmuFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_AmuFail">AMU FAIL</button>
              <button class="btn ${alm_PsOverVoltage === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PsOverVoltage">PS OVER VOLTAGE</button>
              <button class="btn ${alm_PsOverCurrent === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PsOverCurrent">PS OVER CURRENT</button>
              <button class="btn ${alm_FuseBlown === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_FuseBlown">FUSE BLOWN</button>
              <button class="btn ${alm_PaCombine2 === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PaCombine2">PA COMBINE</button>
            </div>
            <div class="col">
              <button class="btn ${alm_PaFail2 === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PaFail2">PA FAIL</button>
              <button class="btn ${alm_TuneFail === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_TuneFail">TUNE FAIL</button>
              <button class="btn ${alm_AntVswr === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_AntVswr">ANT VSWR</button>
              <button class="btn ${alm_Local === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_Local">LOCAL</button>
              <button class="btn ${alm_LineError === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_LineError">LINE ERROR</button>
            </div>
          </div>
        </div>

        <h3 class="section-title">
          Radio Warning Status
        </h3>

        <div class="section-3">
          <div class="row">
            <div class="col">
              <button class="btn ${alm_LevelMax === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_LevelMax">LEVEL MAX</button>
              <button class="btn ${alm_PowerDown === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PowerDown">POWER DOWN</button>
              <button class="btn ${alm_MuDetune === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_MuDetune">MU DETUNE</button>
              <button class="btn ${alm_PaCombine1 === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PaCombine1">PA COMBINE</button>
            </div>
            <div class="col">
              <button class="btn ${alm_SoftInterlock === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_SoftInterlock">SOFT INTERLOCK</button>
              <button class="btn ${alm_PaFail1 === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_PaFail1">PA FAIL</button>
              <button class="btn ${alm_KeyInterlock === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_KeyInterlock">KEY INTERLOCK</button>
              <button class="btn ${alm_KeyTrip === "0" ? "btn-custom" : "btn-danger"} btn-block" disabled id="alm_KeyTrip">KEY TRIP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }

  return result;
};
