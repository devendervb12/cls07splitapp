
sap.ui.core.UIComponent.extend("smax.cls07.proj1.Component",{
	metadata : {
		manifest : "json"
	},
	init : function(){
		sap.ui.core.UIComponent.prototype.init.apply(this);
		this.getRouter().initialize();
		
	}
});