const path = require('path');
const electron = require("electron");
const GTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');
const nodemailer = require('nodemailer');

const {app,ipcMain} = electron;

let mainWindow;
let tray;

app.on('ready',()=>{
	app.dock.hide();
	mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
	
	const iconName = process.platform ===  "win32" ? 'windows-icon.png' : 'iconTemplate.png';
	const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
	tray = new GTray(iconPath,mainWindow);
});

ipcMain.on('email:send',(event,value)=>{
	var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: value.email,
	    pass: value.password
	  }
	});
	var mailOptions = {
	  from: value.email,
	  to: value.recipient,
	  subject: value.subject,
	  text: value.body
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});

})