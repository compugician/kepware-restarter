const sc = require('windows-service-controller');
const express = require('express');
const app = express();
const router = express.Router();
const port = 43830;

app.get('/', (request, response) => response.send('Rekep Server'));

app.use('/api', router);

router.get('/', (request, response) => {
	response.json({message: 'Rekep Server'});
});



router.get('/restart', (request, response) => {
	sc.stop('KEPServerEXV6').done(function() { 
		console.log('starting'); 
		sc.start('KEPServerEXV6').done(function() {
			response.json({message: 'Done'});
		}); 
	} );	
});


router.get('/stop', (request, response) => {
	sc.stop('KEPServerEXV6').done(function() { 
		response.json({message: 'Done'}); 
	} );	
});


router.get('/start', (request, response) => {
	sc.start('KEPServerEXV6').done(function() {
		response.json({message: 'Done'});
	}); 
});
	
console.log('Stopping');

app.listen(port, () => console.log(`Listening on port ${port}`));

sc.timeout(120);

sc.getDisplayName('KEPServerEXV6')
	.catch(function(error) {
		console.log(error.message);
	})
	.done(function(displayName) {
		console.log('Display name: ' + displayName);
	});
