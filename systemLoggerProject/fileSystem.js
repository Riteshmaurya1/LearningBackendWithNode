const os = require("os");
const fs = require("fs");

function getSystemInfo() {
  return `
    System Information Report

    Genetated at ${new Date().toLocaleString()}

    ===========================================
    OS Type: ${os.type()}
    OS Plateform: ${os.platform()}
    OS Arch: ${os.arch()}
    Hostname: ${os.hostname()}
    Home dir: ${os.homedir()}

    Total Memory: ${(os.totalmem() / 1024 / 1024).toFixed(2)}
    Free Memory: ${(os.freemem() / 1024 / 1024).toFixed(2)}
    System uptime: ${(os.uptime() / 60).toFixed(2)}

    CPU Info:${os.cpus().map((cpu, i) => {
      return `\n Core ${i + 1} " ${cpu.model}`;
    })}
    `;
}
let filePath = "./system-info.txt";
const data = getSystemInfo();
fs.appendFile(filePath, data, (err) => {
  console.log(err);
});
