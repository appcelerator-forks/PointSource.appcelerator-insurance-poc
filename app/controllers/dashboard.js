var args = arguments[0] || {};

function goToPayBill (event) {
	
	Alloy.Globals.Navigator.open("paybill", {});

}

function openSettings () {
	alert('menu openSettings');
}