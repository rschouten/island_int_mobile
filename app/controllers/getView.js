function getView(){
	var window = Titanium.UI.createWindow();
	var webview = Titanium.UI.createWebView({url:'http://mobile-directory.island-interactive.com/'});
    window.add(webview);
    window.open({modal:true});
}