const child_process = require('child_process')
const exec = function(command){
	return child_process.execSync(command, {encoding: 'utf8'})
}

try {
	let webIsRunning = exec('docker ps --filter name=webs -q').trim()
	let dbIsRunning = exec('docker ps --filter name=webs -q').trim()
	if ( webIsRunning && dbIsRunning ) {
		exec('docker-compose exec -d web npm run dev')
	}
	else {
		console.log("One or more containers are not running. Let's try running init first, and then try starting the server once more.")
		exec('docker-compose exec -d web npm run init')
		exec('docker-compose exec -d web npm run dev')

	}
}
catch(e){
	console.log(`Run script failed: ${e}`)
	process.exit(1) // non-zero exit code indicades failure
}
