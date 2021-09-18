const { exec } = require("child_process");
const SendMail = require("./sendMail")

class Backup {
    constructor(exportFileDir) {
        this.backupFilename = new Date(Date.now()).toDateString().replace(/\s/g,'_')
        this.exportFileDir = exportFileDir
    }
    async exportMongoDB (){
        const res = await exec(`mongodump -d coimex -o ./backup/${this.backupFilename}`,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
        res.on("close", async (code) => {
            if(code === 0) {
                await this.exportFile()
            }
        })
    }
    async exportFile() {
        const res = await exec(`cp -r ${this.exportFileDir} ./backup/${this.backupFilename}`,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        })
        res.on("close", async (code) => {
            if(code === 0) {
                await this.convertToZip()
            }
        })
    }
    async convertToZip() {
        const res = await exec(`tar -czvf ./backup/${this.backupFilename}.tar.gz ./backup/${this.backupFilename}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
        res.on("close", async(code) => {
            if(code === 0) {
                await this.removeAdditionFile()
                await SendMail(
                    MAIL_FROM,
                    MAIL_TO,
                    "ServerBackUp",
                    "",
                    `${this.backupFilename}.zip`,
                    `./backup/${this.backupFilename}.zip`
                )
                console.log("Send Backup Completed");
            }
        })
    }
    
    async removeAdditionFile() {
        return await exec(`rm -r ./backup/${this.backupFilename}`,(error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        })
    }
}

module.exports = Backup