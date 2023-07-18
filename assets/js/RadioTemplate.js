const getRadioTemplates = (data) => {
	const {
		id,
		radioNo,
		channel,
		ip_address,
		status,
		rx_level,
		tx_level,
		power_level,
	} = data;

	return `
  <div class="radio-display">
    <h2 class="title">
      Radio ${radioNo}
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
            ${channel}
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
          <div class="p-9 rounded ${status == "1" ? "bg-green" : "bg-danger"}">
            <span id="radio-status" class="text-white">
              ${status == "1" ? "ON" : "OFF"}
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
              style="height: ${rx_level}%"
              aria-valuenow="${rx_level}"
              aria-valuemin="0"
              aria-valuemax="100"
              id="rx-level-bar"
            >
              <span class="text-dark" id="rx-level-value" style="bottom: calc(75px + ${rx_level}px)">
                ${rx_level}
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
              style="height: ${tx_level}%"
              aria-valuenow="${tx_level}"
              aria-valuemin="0"
              aria-valuemax="100"
              id="tx-level-bar"
            >
              <span class="text-dark" id="tx-level-value" style="bottom: calc(75px + ${tx_level}px)">${tx_level}</span>
            </div>
          </div>
          <p
            class="section-item-desc"
          >
            TX Level
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
              style="height: ${power_level}%"
              aria-valuenow="${power_level}"
              aria-valuemin="0"
              aria-valuemax="100"
              id="power-level-bar"
            >
              <span class="text-dark" id="power-level-value" style="bottom: calc(75px + ${power_level}px)">${power_level}</span>
            </div>
          </div>
          <p
            class="section-item-desc"
          >
            Power Level
          </p>
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

          <form id="channel-form" class="d-flex flex-column w-100" style="gap: 0.5rem;">
            <input
              type="number"
              class="form-control"
              id="channel-input"
              value="${channel}"
              placeholder="Enter Channel Number"
              required
            />
            <button class="btn btn-sm btn-primary" type="submit">
              SET
            </button>
          </form>
        </div>
        <div
          class="section-item px-2"
        >
          <p
            class="section-item-desc"
          >
            Power
          </p>

          <form id="power-reduction-form" class="d-flex flex-column w-100" style="gap: 0.5rem;">
            <select
              class="form-control"
              id="power-reduction-input"
              placeholder="Select Power Reduction Value"
              required
            >
              <option value="0">0%</option>
              <option value="25">25%</option>
              <option value="50">50%</option>
              <option value="75">75%</option>
              <option value="100">100%</option>
            </select>
            <button class="btn btn-sm btn-primary" type="submit">
              SET
            </button>
          </form>
        </div>
        <div
          class="section-item px-2"
        >
          <p
            class="section-item-desc"
          >
            RX Power
          </p>

          <form id="rx-power-form" class="d-flex flex-column w-100" style="gap: 0.5rem;">
            <input type="number" class="form-control" id="rx-power-input" required />
            <button class="btn btn-sm btn-primary" type="submit">
              SET
            </button>
          </form>
        </div>
        <div
          class="section-item px-2"
        >
          <p
            class="section-item-desc"
          >
            TX Power
          </p>
          
          <form id="tx-power-form" class="d-flex flex-column w-100" style="gap: 0.5rem;">
            <input
              type="number"
              class="form-control"
              id="tx-power-input"
              required
            />
            <button class="btn btn-sm btn-primary" type="submit">
              SET
            </button>
          </form>
        </div>
        <div
          class="section-item px-2"
        >
          <p
            class="section-item-desc"
          >
            Squelch
          </p>
          
          <form id="sq-up-limit-form" class="d-flex flex-column w-100" style="gap: 0.5rem;">
            <input
              type="number"
              class="form-control"
              id="sq-up-limit-input"
              placeholder="Enter SQ Up Limit"
            />
            <button class="btn btn-sm btn-primary" type="submit">
              SET
            </button>
          </form>
        </div>
        <div class="col-span-4"></div>
        <div
          class="section-item px-2 my-2"
        >
          <p
            class="section-item-desc"
          >
            ptt
          </p>

          <button
            class="btn btn-sm btn-block btn-primary"
            type="button"
            id="btn-reset-alarm"
          >
            RESET
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
`;
};
