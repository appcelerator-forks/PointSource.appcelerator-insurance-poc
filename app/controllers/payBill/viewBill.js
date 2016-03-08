function goToPayBill (event) {
	Alloy.Globals.Navigator.open("payBill/paymentOptions", {currentPolicy: $model});
}

function init() {
	if ($model.getIsOverdue()) {
		$.payNowButton.color = Alloy.Globals.Colors.primary_accent;
		$.payNowButton.borderColor = Alloy.Globals.Colors.primary_accent;

		$.dueLabel.color =  Alloy.Globals.Colors.primary_accent;
	}
}

init();