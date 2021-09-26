class Timer extends HTMLElement {
    constructor() {
        super()

        this.attachShadow({ mode: "open" })

        this.shadowRoot.innerHTML = `
            <slot></slot>

            <p id="main-timer" part="time">00:00:00</p>
            <button id="pause-button" hidden part="button">Pause</button>
            <button id="start-button" part="button">Start</button>
            <button id="stop-button" part="button">Stop</button>
            <button id="reset-button" part="button">Reset</button>
            <p id="result" hidden part="result"></p>         
        `

        this._start_button = this.shadowRoot.getElementById("start-button")
        this._stop_button = this.shadowRoot.getElementById("stop-button")
        this._pause_button = this.shadowRoot.getElementById("pause-button")
        this._reset_button = this.shadowRoot.getElementById("reset-button")

        this._start_button.onclick = () => this.start()
        this._stop_button.onclick = () => this.stop()
        this._pause_button.onclick = () => this.pause()
        this._reset_button.onclick = () => this.reset()

        this._main_timer = this.shadowRoot.getElementById("main-timer")
        this._result = this.shadowRoot.getElementById("result")

        this._state = "stopped"
        this._sec = 0
        this._interval

        this._key = this.getAttribute("key")
        this._loadLocalStorage()

        window.addEventListener("beforeunload", (ev) => this._onUnload(ev))
    }

    _loadLocalStorage() {
        if (this._key) {
            const value = JSON.parse(window.localStorage.getItem(this._key))

            if (!value || !("sec" in value) || !("state" in value)) return

            if ((typeof value.sec === "number" || typeof value.sec === "bigint") && value.sec >= 0) {
                this._sec = value.sec
            }

            if (typeof value.state === "string" && ["stopped", "started", "paused", "reset"].includes(value.state)) {
                switch (value.state) {
                    case "stopped":
                        this.stop(true)
                        break

                    case "started":
                        this.start(true)
                        break

                    case "paused":
                        this.pause(true)
                        this._main_timer.innerText = this._formatTime(this._sec)
                        break

                    case "reset":
                        this.reset(true)
                        break
                }
            }
        }
    }

    _onUnload(ev) {
        ev.preventDefault()

        if (this._key) {
            window.localStorage.setItem(this._key, JSON.stringify({ sec: this._sec, state: this._state }))
        }

        return
    }

    _formatTime(sec) {
        const hour = Math.floor(sec / 3600)
        const minutes = Math.floor((sec / 60) % 60)
        const seconds = Math.floor(sec % 60)

        const formatted = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

        return formatted
    }

    start(force = false) {
        if (this._state !== "started" || force) {
            this._result.hidden = true
            this._sec = force || this._state === "paused" ? this._sec : 0
            this._min = force || this._state === "paused" ? this._min : 0
            this._hour = force || this._state === "paused" ? this._hour : 0

            this._interval = setInterval(() => {
                this._sec += 1

                this._main_timer.innerText = this._formatTime(this._sec)
            }, 1000)

            this._state = "started"

            this._pause_button.hidden = false
            this._start_button.hidden = true
        }
    }

    pause(force = false) {
        if (this._state !== "paused" || force) {
            clearInterval(this._interval)
            this._state = "paused"

            this._pause_button.hidden = true
            this._start_button.hidden = false
        }
    }

    stop(force = false) {
        if (this._state !== "stopped" || force) {
            const formattedTime = this._formatTime(this._sec).split(':')

            this._result.innerText = `Total waktu pengerjaan : ${formattedTime[0]} jam ${formattedTime[1]} menit ${formattedTime[2]} detik`
            this._result.hidden = false

            clearInterval(this._interval)
            this._state = "stopped"

            this._pause_button.hidden = true
            this._start_button.hidden = false

            this._main_timer.innerText = this._formatTime(0)
        }
    }

    reset(force = false) {
        if (this._state !== "reset" || force) {
            this._state = "reset"
            this._result.hidden = true

            this._main_timer.innerHTML = "00:00:00";
            this._stop = true;
            this._hour = 0;
            this._sec = 0;
            this._min = 0;
        }
    }
}

window.customElements.define("class-timer", Timer)