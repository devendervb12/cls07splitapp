sap.ui.controller("smax.cls07.proj1.controller.Page2", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Page2
*/
	onInit: function() {
       
		var oRouter = this.getOwnerComponent().getRouter();
		
		oRouter.getRoute("forPage2").attachPatternMatched(function(oEvent){
	        
			var prodId =   oEvent.getParameters().arguments.pId;
	        debugger;
	        
	        this.getView().bindElement("/Products("+prodId+")");
	// services.odata.org/Northwind/Northwind.svc/Customers('ALFKI')
		}, this)
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Page2
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Page2
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Page2
*/
//	onExit: function() {
//
//	}
	gotoPage1 : function(){
		this.getOwnerComponent().getRouter().navTo("home");
	},
	
	onCreate : function(){
		
		var oDialog = new sap.m.Dialog({
			title : "Provide Product Details",
			content : [
				new sap.m.Label({ text : "Product ID"}),
				new sap.m.Input({ type : sap.m.InputType.Number}),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "ReleaseDate"}),
				new sap.m.DatePicker(),
				new sap.m.Label({ text : "Rating"}),
				new sap.m.Input(),
				new sap.m.Label({ text : "Price"}),
				new sap.m.Input()
			],
			buttons : [
				new sap.m.Button({ text : "Save and Close", press : function(){
					// prepare data
					var data = {
							ID : parseInt(oDialog.getContent()[1].getValue()),
							Name : oDialog.getContent()[3].getValue(),
							ReleaseDate :  oDialog.getContent()[5].getDateValue(),
							Rating :  parseInt(oDialog.getContent()[7].getValue()),
							Price :  parseInt(oDialog.getContent()[9].getValue()).toFixed(2)
					}
					
					// save data to oModel
					var url = "proxy/https/services.odata.org/V2/(S(3ldyjbrrbr0rlbmphbs3fgoy))/OData/OData.svc/";
					var oModel = new sap.ui.model.odata.v2.ODataModel(url);
					
					oModel.create("/Products", data, {
						success : function(){
							sap.m.MessageToast.show("Data Created");
						},
						error : function(){
							sap.m.MessageToast.show("Data Not Created");
						}
					});
					//close the dialog
					oDialog.close();
					
				}
				})
				
				
			]	
		});
		
		oDialog.open();
	},
	
	onUpdate : function(){
		
		//this - controller
		var oController = this;
		// at 112 - this - dialog
		var oDialog = new sap.m.Dialog({
			title : "Update Product Name",
			content : [
				new sap.m.Label({ text : "ID"}),
				new sap.m.Input({ value :  oController.getView().byId("idId").getText(), editable : false}),
				new sap.m.Label({ text : "Name"}),
				new sap.m.Input({ value : oController.getView().byId("idName").getText()})
			],
			buttons : [
				new sap.m.Button({ text : "Update and Close", press : function(){
					//data
					var data = {
							Name : oDialog.getContent()[3].getValue()
					}
					//save to Model
					var url = "proxy/https/services.odata.org/V2/(S(3ldyjbrrbr0rlbmphbs3fgoy))/OData/OData.svc/";
					var oModel = new sap.ui.model.odata.v2.ODataModel(url);
					
					oModel.update("/Products("+parseInt(oDialog.getContent()[1].getValue())+")", data, {
						success : function(){
							sap.m.MessageToast.show("Data Updated");
						},
						error : function(){
							sap.m.MessageToast.show("Data Not Updated");
						}
					});
					//close
					oDialog.close();
				}})
			]
		});
		
		oDialog.open();
		
	},
	
	onDelete : function(){
		var url = "proxy/https/services.odata.org/V2/(S(3ldyjbrrbr0rlbmphbs3fgoy))/OData/OData.svc/";
		var oModel = new sap.ui.model.odata.v2.ODataModel(url);
	    
		var prodId = parseInt(this.getView().byId("idId").getText());
		
		oModel.remove("/Products("+prodId+")",  {
			success : function(){
				sap.m.MessageToast.show("Data Removed");
			},
			error : function(){
				sap.m.MessageToast.show("Data Not Removed");
			}
		});
	}
});













