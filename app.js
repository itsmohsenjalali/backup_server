const Backup = require("./getBackup")
const schedule = require('node-schedule');

schedule.scheduleJob('1 * * * * *', function () {
    const db_backup = new Backup(PATH_TO_YOUR_FILE_NEED_TO_BACKUP)
    db_backup.exportMongoDB()
});
