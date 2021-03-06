class Timer extends HTMLElement {
    constructor(props) {
        super(props)

        this.attachShadow({ mode: "open" })

        this.shadowRoot.innerHTML = `
            <slot></slot>

            <p id="main-timer" part="time">00:00:00</p>
            <button id="pause-button" hidden part="button">Pause</button>
            <button id="resume-button" part="button">Resume</button>
            <button id="start-button" part="button">Start</button>
            <button id="stop-button" part="button">Stop</button>
            <button id="reset-button" part="button">Reset</button>
            
            <p id="result" hidden part="result"></p>         
        `

        this._start_button = this.shadowRoot.getElementById("start-button")
        this._stop_button = this.shadowRoot.getElementById("stop-button")
        this._pause_button = this.shadowRoot.getElementById("pause-button")
        this._reset_button = this.shadowRoot.getElementById("reset-button")
        this._resume_button = this.shadowRoot.getElementById("resume-button")        

        this._start_button.onclick = () => this.start()
        this._stop_button.onclick = () => this.stop()
        this._pause_button.onclick = () => this.pause()
        this._reset_button.onclick = () => this.reset()
        this._resume_button.onclick = () => this.start()

        this._main_timer = this.shadowRoot.getElementById("main-timer")
        this._result = this.shadowRoot.getElementById("result")

        this._state = "stopped"
        this._sec = 0
        this._interval

        this._key = props.key
        this._loadLocalStorage()

        window.addEventListener("beforeunload", (ev) => this._onUnload(ev))
    }

    _loadLocalStorage() {
        this._resume_button.hidden = true

        if (this._key) {
            const value = JSON.parse(window.localStorage.getItem(this._key))

            if (!value || !("sec" in value) || !("state" in value) || !("last_on" in value)) return

            if ((typeof value.sec === "number" || typeof value.sec === "bigint") && value.sec >= 0) {
                this._sec = value.sec
            }

            if (typeof value.state === "string" && ["stopped", "started", "paused", "reset"].includes(value.state) && typeof value.last_on === "number") {
                switch (value.state) {
                    case "stopped":
                        this.stop(true)
                        break

                    case "started":
                        if (Date.now() > value.last_on)
                            this._sec += Math.floor((Date.now() - value.last_on) / 1000)

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
            window.localStorage.setItem(this._key, JSON.stringify({ sec: this._sec, state: this._state, last_on: Date.now() }))
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

            this._resume_button.hidden = true
            this._pause_button.hidden = false
            this._start_button.hidden = true
        }
    }

    pause(force = false) {
        if (this._state !== "paused" || force) {
            clearInterval(this._interval)
            this._state = "paused"

            this._pause_button.hidden = true
            this._resume_button.hidden = false
        }
    }

    stop(force = false) {
        if (this._state !== "stopped" || force) {
            const formattedTime = this._formatTime(this._sec).split(':')

            this._result.innerText = `Total waktu pengerjaan : ${formattedTime[0]} jam ${formattedTime[1]} menit ${formattedTime[2]} detik`
            this._result.hidden = false

            clearInterval(this._interval)
            this._state = "stopped"

            this._resume_button.hidden = true
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

function addTimer() {
	var old_timers_num = parseInt(localStorage.getItem("timers_num"))
	if (old_timers_num >= 15){
		alert("Maximal 15 timers!");
		return;
	}
	var timers_num = old_timers_num + 1;
	var node = new Timer({key: 'timer-kelas-' + timers_num});
	node.setAttribute('id', 'timer-kelas-' + timers_num);
	var headnode = document.createElement("h2");
	headnode.setAttribute("id", "head-timer-kelas-" + timers_num);
    var textnode = document.createTextNode("Timer " + timers_num);
    headnode.appendChild(textnode);
    document.getElementById("timers").appendChild(headnode); 
	document.getElementById("timers").appendChild(node);
	localStorage.setItem("timers_num", timers_num);
}

function removeTimer() {
	var timers_num = parseInt(localStorage.getItem("timers_num"))
	if (timers_num === 1) {
		alert("At least one timer!");
		return;
	}
	document.getElementById('timer-kelas-' + timers_num).remove();
	document.getElementById('head-timer-kelas-' + timers_num).remove();
    
    localStorage.removeItem('timer-kelas-' + timers_num)
	localStorage.setItem("timers_num", timers_num - 1)
}