const getRadioTemplates = (data) => {
	const {
    id,
    type,
    ip_address,
    status,
    rmt_sw,
    unit_no,
    sts_ch,
    sts_txfreq,
    sts_rxfreq,
    sts_po,
    sts_pow,
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
    sts_tone,
  } = data;

  const rx_level = parseInt(sts_rxfreq);
  const tx_level = parseInt(sts_txfreq);
  const power_level = parseInt(sts_po);

	return `
  
  <div class="radio-display">
    <h2 class="title">
      Radio ${type}
    </h2>
    
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
            ${status ? sts_ch : "0"}
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
          <div class="p-9 rounded ${
						status ? "bg-green" : "bg-danger"
					}" id="radio-status-div">
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
              <span class="text-dark" id="rx-level-value" style="bottom: calc(75px + ${status ? rx_level : 0}px)">
                ${status ? rx_level : 0}
              </span>
            </div>
          </div>
          <p
            class="section-item-desc"
          >
            RX Level
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
              style="height: ${status ? power_level : 0}%"
              aria-valuenow="${status ? power_level : 0}"
              aria-valuemin="0"
              aria-valuemax="100"
              id="power-level-bar"
            >
              <span class="text-dark" id="power-level-value" style="bottom: calc(75px + ${status ? power_level : 0}px)">${status ? power_level : 0}</span>
            </div>
          </div>
          <p
            class="section-item-desc"
          >
            Power Level
          </p>
        </div>
        <div
          class="section-item py-2"
        >
          <div>
            <p
              class="section-item-desc"
            >
              Power
            </p>

            <button
              class="btn btn-custom"
              type="button"
              id="power-squelch-1"
            >
              ON
            </button>
          </div>
          <div>
            <p
              class="section-item-desc"
            >
              Squelch
            </p>

            <button
              class="btn btn-custom"
              type="button"
              id="power-squelch-1"
            >
              ON
            </button>
          </div>
          <div>
            <p
              class="section-item-desc"
            >
              Remote
            </p>

            <button
              class="btn btn-custom"
              type="button"
            >
              remote
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

          <input
            type="number"
            class="form-control"
            id="channel-input"
            value="${status ? sts_ch : 0}"
            placeholder="Enter Channel Number"
            required
          />
        </div>
        <div
          class="section-item"
        >
          <p
            class="section-item-desc"
          >
            Power
          </p>

          <button class="btn ${
						status ? "btn-danger" : "btn-custom"
					}" id="power-btn">
            ${status ? "OFF" : "ON"}
          </button>
        </div>
        <div
          class="section-item"
        >
          <p
            class="section-item-desc"
          >
            TX Power
          </p>

          <button class="btn btn-custom" id="tx-power-btn">
            ${tx_level > 0 ? "RATED" : "OFF"}
          </button>
        </div>
        <div
          class="section-item"
        >
          <p
            class="section-item-desc"
          >
            Selt Test
          </p>
          
            <button class="btn btn-custom" id="selt-test-btn">
              OFF
            </button>
          </form>
        </div>
        <div
          class="section-item"
        >
          <p
            class="section-item-desc"
          >
            Squelch
          </p>
          
          <button class="btn btn-custom" id="sequelch-btn">
            ON
          </button>
        </div>
        <div class="col-span-4"></div>
        <div
          class="section-item my-2"
        >
          <p
            class="section-item-desc"
          >
            ptt
          </p>

          <button
            class="btn btn-custom"
            type="button"
            id="ptt-btn"
          >
            OFF
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
            <button class="btn btn-custom btn-block mb-4" id="alm_RxUnitPsFail">RX UNIT PS FAIL</button>
            <button class="btn btn-custom btn-block mb-5" id="alm_RxPllUnlock">RX PLL UNLOCK</button>
            <button class="btn btn-custom btn-block mb-4" id="alm_TxUnitPsFail">TX UNIT PS FAIL</button>
            <button class="btn btn-custom btn-block mb-5" id="alm_TxOutputFail">TX OUTPUT FAIL</button>
            <button class="btn btn-custom btn-block mb-4" id="alm_TxPllUnlock">TX PLL UNLOCK</button>
            <button class="btn btn-custom btn-block mb-5" id="alm_PfPowerFail">PF POWER FAIL</button>
          </div>
          <div class="col">
            <button class="btn btn-custom btn-block mb-4" id="alm_PaUnitPsFail">PA UNIT PS FAIL</button>
            <button class="btn btn-custom btn-block mb-5" id="alm_PaTempFail">PA TEMP FAIL</button>
            <button class="btn btn-custom btn-block mb-4" id="alm_CtrlUnitPsFail">CTRL UNIT PS FAIL</button>
            <button class="btn btn-custom btn-block mb-5" id="alm_PsUnitFail">PS UNIT FAIL</button>
            <button class="btn btn-custom btn-block mb-4" id="alm_FanFail">FAN FAIL</button>
            <button class="btn btn-custom btn-block mb-5" id="alm_PaPowerFail">PR POWER FAIL</button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;
};
