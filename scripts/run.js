const child_process = require('child_process')
const exec = function(command, options){
	return child_process.execSync(command, {encoding: 'utf8', ...options})
}

const checkContainersAreRunning = function(){
	let webIsRunning = exec('docker ps --filter name=web -q').trim()
	let dbIsRunning = exec('docker ps --filter name=db -q').trim()
	return webIsRunning && dbIsRunning
}


const runServer = function(){
	try {
		exec('docker-compose exec web npm run dev', {stdio: 'inherit'})
	}
	catch(e){
		// This code runs when the user manually stops the server with ctrl-c
		console.log("\n\nShutting down.\n")
		process.exit(0)
	}
}

try {
	if ( checkContainersAreRunning() ) { runServer()  }
	else {
		console.log("One or more containers are not running. Let's try running init first, and then try starting the server once more.")
		exec('npm run down', {stdio: 'inherit'})
		exec('npm run init', {stdio: 'inherit'})
		if ( checkContainersAreRunning() ) { runServer() }
		else { throw 'Containers are still not running after running init.' }
	}
}
catch(e){
	console.log(`Run script failed:`)
	console.log(e)
	process.exit(1) // non-zero exit code indicades failure
}
