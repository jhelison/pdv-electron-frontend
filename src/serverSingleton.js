import axios from "axios"

var consoleTextOutput = ""
var child = null
var serverStatus = null

const appPath = require('path').resolve(__dirname, "../assets/server/app") + "\\app.exe"

const createChildServer = () => {
    consoleTextOutput = "Inicializando... \n"

    child = require("child_process").execFile(appPath, null, (err) => {
        consoleTextOutput += err.message
    })
    consoleTextOutput += "Inicializado com sucesso! \n"
    
    child.stdout.on("data", (data) => {
        consoleTextOutput += data
    })
    child.stderr.on("data", (data) => {
        consoleTextOutput += data
    })

    getServerStatus()
}

const getServerStatus = async () => {
    setInterval(async () => {
        try {
            const t0 = performance.now()
            const res = await axios.get("http://localhost:5000/")
            const t1 = performance.now()
            serverStatus = (t1-t0).toFixed(0)
        } catch (error) {
            serverStatus = null
        }
    }, 2000);
}

createChildServer()

const resetServer = () => {
    console.log(child)
    if(child){
        child.kill()
        createChildServer()
    }
}

const lastOutput = () => {
    return consoleTextOutput
}

const lastServerStatus = () => {
    return serverStatus
}

export {lastOutput, resetServer, lastServerStatus}
