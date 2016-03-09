var ios_navWindow;

/**
 * Global Navigation Handler
 */
Alloy.Globals.Navigator = {
	open: function(controllerName, payload){
		var controller, win;

		Titanium.Analytics.navEvent('Somewhere', controllerName, 'nav.messageapp');
		controller = Alloy.createController(controllerName, payload || {});

		if(OS_IOS){
			win = Alloy.Globals.buildIOSWindow({
				controller: controller
			})

			ios_navWindow.openWindow(win);
		}
		else if (OS_ANDROID) {
			Alloy.Globals.open(controller, true)
		}
	},
	openWindow: function(win){
		if(OS_IOS){
			$.nav.openWindow(win);
		}
		else {
			win.open();
		}
	}
};


Alloy.Globals.setPageTitle = function(title) {

	if (OS_ANDROID) {
		var activity = $.index.getActivity();

		if (activity) {

			var actionBar = activity.getActionBar();

			if (actionBar) {
			  	actionBar.title = title;
			}
		};
	}
}

initDrawer();


function initDrawer() {
	// Set up navigation header
	if (OS_IOS) {
		Alloy.Globals.menu = Alloy.createController('menu', {});
		var dashboardWin = Alloy.Globals.buildIOSWindow({
			controller: Alloy.createController("dashboard")
		});
		ios_navWindow = Titanium.UI.iOS.createNavigationWindow({
		   window: dashboardWin
		});

		ios_navWindow.open();
		// $.dashboard.init();
	}
	else if (OS_ANDROID) {
	    
		// Load module
		var TiDrawerLayout = require('com.tripvi.drawerlayout');

		// define menu and main content view
		Alloy.Globals.menu = Alloy.createController('menu', {
		  parent : $.index
		});

		// this is just a wrapper
		// actual content views are add to this later
		Alloy.Globals.contentView = Ti.UI.createView({
		  width : Ti.UI.FILL,
		  height : Ti.UI.FILL
		});

		Alloy.Globals.drawer = TiDrawerLayout.createDrawer({
		  leftView: Alloy.Globals.menu.getView(),
		  centerView: Alloy.Globals.contentView,
		  leftDrawerWidth: "260"
		});

		$.index.add(Alloy.Globals.drawer);
	  
		$.index.open();

	}
}

/**
 * Android callback for {Ti.UI.Window} open event
 */
function onOpen() {
  
	var activity = $.index.getActivity();

	if (activity) {

		var actionBar = activity.getActionBar();

		if (actionBar) {
			actionBar.displayHomeAsUp = true;
			actionBar.title = "Point Insurance";
			actionBar.onHomeIconItemSelected = function() {
				Alloy.Globals.drawer.toggleLeftWindow();
			};
		}
	};

	Alloy.Globals.open(Alloy.createController("dashboard"), true);

  return true;
}



/**
 * callback for Android back button
 */
function onBack(){
	console.log("onBack");
  Alloy.Globals.back();
}

