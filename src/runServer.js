let output = ""

const appPath = require('path').resolve(__dirname, "../assets/server/app") + "\\app.exe"

const child = require("child_process").execFile(appPath, null, (err) => {
    output += err.message
})

child.stdout.on("data", (data) => {
    output += data
})
child.stderr.on("data", (data) => {
    output += data
})

const getLastOutput = () => {
    return output
}

export default getLastOutput
