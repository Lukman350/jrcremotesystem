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
            value="${channel}"
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

          <button class="btn btn-custom" id="power-btn" type="button">
            ${power_level == "1" ? "ON" : "OFF"}
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
            ${tx_level > "0" ? "RATED" : "OFF"}
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
