'use strict';
const cluster = require('cluster');
async function main() {
    try {
        if (cluster.isMaster) {
            console.log(`MASTER - ${process.pid}`);
            cluster.fork()
            cluster.on('exit', function(deadWorker, code, signal) {

                var worker = cluster.fork();

                var newPID = worker.process.pid;
                var oldPID = deadWorker.process.pid;

                // Log the event
                console.log('worker '+oldPID+' died.');
                console.log('worker '+newPID+' born.');

            });
        } else if(cluster.isWorker) {
            console.log(`WORKER - ${process.pid}`);

            const  child_process = require('child_process');
            const listen = child_process.spawn("./example/example");

            listen.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });
            listen.stderr.on('data', (data) => {
              console.log(`stderr: ${data}`);
            });
            listen.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
                process.exit(0);
            });
        }
    } catch(e) {
        console.error("init cannot be executed", e);
    }
}
main()