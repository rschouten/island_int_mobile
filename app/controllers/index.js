var todos = Alloy.Collections.todo;
var INDEXES = {
	'All': 0,
	'Active': 1,
	'Done': 2
};
var whereIndex = INDEXES['All'];
var activity;


// open the window
$.openWebApp.open();
$.openWebApp.NavBarHidden = true;


/*var popTest = Titanium.UI.createAlertDialog({
	message: 'Test Successful',
	ok: "Okay",
	title: "Test Successful",
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	top: 30,
	width: 300, height: 200
});*/

//$.dialog.show();

function doClick(e){
    Ti.API.info('e.text: ' + e.text);
};


$.openWebPage.addEventListener('load',function(e){
	  //alert("Clicked from Web");
	//fromWebview,evalJS
	//var file_Path = "/mnt/sdcard/ext_sd";
	var cookies = $.openWebPage.evalJS("document.cookie").split(";");
	//console.log(cookies);
	//var downloadingFileUrl = '';
	var fileSavingPath = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,"file_Path");
	
	if (cookies != "null"){
		var arry = [];
		arry = cookies[0].split("=");
		$.successCookie.message = arry[1];
		$.successCookie.show();
	}else{
		$.failCookie.show();
	}
	/*} else{
		Titanium.UI.createLabel({
			message: 'cookie were not created',
			ok: "Okay",
			title: 'Download Unsuccessful',
			textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
			top: 30,
			width: 300, height: 200
		});
	}*/
	
	if (arry[0] == "filename") {
		
		var downloadingFileUrl = arry[1];
		
	}
	
		
		/*if (downloadingFileUrl != cookies){
			var myHttpClient = Ti.Network.createHTTPClient();
			myHttpClient.open("GET", downloadingFileUrl);
			 if (myHttpOnload != "null"){
				 onload: function(){
					 fileSavingPath.write(myHttpClient.responseData);
				 };
			 }
			
			
		}*/
	});

// fetch existing todo items from storage
//todos && todos.fetch();

// Filter the fetched collection before rendering. Don't return the
// collection itself, but instead return an array of models
// that you would like to render.
/*function whereFunction(collection) {
	return !whereIndex ?
		collection.models :
		collection.where({ done: whereIndex === 1 ? 0 : 1 });
}

// Perform transformations on each model as it is processed. Since
// these are only transformations for UI representation, we don't
// actually want to change the model. Instead, return an object
// that contains the fields you want to use in your bindings. The
// easiest way to do that is to clone the model and return its
// attributes with the toJSON() function.
function transformFunction(model) {
	var transform = model.toJSON();
	transform.item = '[' + transform.item + ']';
	return transform;
}*/

// open the "add item" window
/*function addToDoItem() {
	Alloy.createController("add").getView().open();
}*/

// Show task list based on selected status type
/*function showTasks(e) {
	if (typeof e.index !== 'undefined' && e.index !== null) {
		whereIndex = e.index; // TabbedBar
	} else {
		whereIndex = INDEXES[e.source.title]; // Android menu
	}
	todos.fetch();
}*/


function viewWebPage() {
	
	/*var window = Titanium.UI.createWindow({ 
	exitOnClose: true, 
	navBarHidden: true });
var webview = Titanium.UI.createWebView({url:'http://mobile-directory.island-interactive.com/'});
window.add(webview);
window.open({modal:true});
var openwp = Alloy.createController("viewWebPage").getview();
openwp.open();
$.openWebApp.close();*/

	var activity = $.openWebApp.activity;

if (activity.actionBar) {
	//up window
	//http://docs.appcelerator.com/titanium/latest/#!/guide/Android_Action_Bar-section-36735509_AndroidActionBar-OtherActionBarFeatures
	
	
	activity.actionBar.displayHomeAsUp = false;
	activity.actionBar.onHomeIconItemSelected = function() {
		$.openWebApp.source.close();
	};

	var Home = 1, Exit = 2;
	var homePage = false;
	
	activity.onCreateOptionsMenu = function(e) {
		var menu = e.menu;
		var Home = menu.add({
			title : "Home",
			itemId : Home
		});
		//Home.setIcon("login.png");
		Home.addEventListener("click", function(e) {
			homePage = true;
			// In Android 3.0 and above we need to call invalidateOptionsMenu() for menu changes at runtime
			var window = Titanium.UI.createWindow({ 
				exitOnClose: true,
				layout : "horizontal",
				orientationModes : [],
				navBarHidden: true });
			var webview = Titanium.UI.createWebView({url:'http://mobile-directory.island-interactive.com/'});
		    window.add(webview);
		    window.open({modal:true});
		    
		    //download code begins below
		    /*$.openWebPage.setDownloadListener(new DownloadListener(){
		        public void onDownloadStart(String url, String userAgent, String contentDisposition, 
		        		String mimetype, long contentLength) {
		        Request request = new Request(Uri.parse(url));
		                request.allowScanningByMediaScanner();
		                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
		                request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "download"); 
		                DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
		                dm.enqueue(request);
		        }
		    });*/
		    

		    
		    //end of download area
		    $.openWebApp.close();
			$.openWebApp.activity.invalidateOptionsMenu();
			
		});
		var Exit = menu.add({
			title : "Exit",
			itemId : Exit
		});
		Exit.setIcon("logout.png");
		Exit.addEventListener("click", function(e) {
			homePage = false;
			var quitFunction = function quitFunction() {
			    var dialog = Ti.UI.createAlertDialog({
			        cancel : 1,
			        buttonNames : ['Accept', 'Cancel'],
			        message : 'Do you want exit?',
			        title : 'Quit App'
			    });
			    dialog.addEventListener('click', function(e) {
			        if (e.index === 0) {
			           Ti.Android.currentActivity.finish();
			        }
			        dialog.hide();
			        dialog = null;
			    });
			    dialog.show();
			};
			$.openWebApp.addEventListener('android:back', quitFunction);
			$.openWebApp.activity.invalidateOptionsMenu();
		});
	};

	/*activity.onPrepareOptionsMenu = function(e) {
		var menu = e.menu;
		menu.findItem(Home).setVisible(!loggedIn);
		menu.findItem(Exit).setVisible(loggedIn);
	};*/

	$.openWebApp.activity.invalidateOptionsMenu();
	
	}
}
/*function goHome(e) {  
	//controller name is 'sample'
	    var visitHome = Alloy.openController('viewWebPage').getView();
	    visitHome.open();
	    }
*/
function closeWindow(){
	//$.openWebApp.close();
	var quitFunction = function quitFunction() {
	    var dialog = Ti.UI.createAlertDialog({
	        cancel : 1,
	        buttonNames : ['Accept', 'Cancel'],
	        message : 'Do you want exit?',
	        title : 'Quit App'
	    });
	    dialog.addEventListener('click', function(e) {
	        if (e.index === 0) {
	           Ti.Android.currentActivity.finish();
	        }
	        dialog.hide();
	        dialog = null;
	    });
	    dialog.show();
	};
	$.openWebApp.addEventListener('android:back', quitFunction);
}