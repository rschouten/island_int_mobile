function closeWindow(){
	$.openWebApp.close();
	
}

//This window is portrait only
var win = Ti.UI.createWindow({
    orientationModes: [Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT]
});
win.open();

function viewIslInt() {
	var window = Titanium.UI.createWindow();
	var webview = Titanium.UI.createWebView({url:'http://mobile-directory.island-interactive.com/'});
    window.add(webview);
    window.open({modal:true});
    $.openWebApp.close();
}
