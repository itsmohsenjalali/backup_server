const Backup = require("./getBackup")
const schedule = require('node-schedule');

schedule.scheduleJob('1 * * * * *', function () {
    console.log("get back up");
    const db_backup = new Backup("/run/media/blue-day/0day/MyProject/Coimex/apps/repos")
    db_backup.exportMongoDB()
});
