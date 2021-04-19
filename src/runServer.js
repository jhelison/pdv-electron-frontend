let output = ""

const appPath =
    "C:\\Users\\jheli\\Documents\\programming-projects\\PDV\\pdv-electron-frontend\\dist\\app\\app.exe"

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
