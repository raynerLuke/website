//Luke Rayner
//R00131271

//variables used for custom t-shirt
var colour ="";
var size ="";
var text ="";
var graphic ="";
var total;
var discount = "false";
var contactNo; 

//form elements used to end information to database
var colourElm = document.createElement("input");
var sizeElm = document.createElement("input");
var textElm = document.createElement("input");
var graphicElm = document.createElement("input");
var totalElm = document.createElement("input");

calculateTotal();

//assigns price based on variables used
function calculateTotal()
{
    total = 0;
    switch(size)
	{
	    case "Small":
		    total += 12.99;
	        break;
		case "Medium":
		    total += 13.99;
			break;
		case "Large":
		    total += 14.99;
			break;
		case "Extra-large":
		    total += 15.99;
		    break;
	}
	if(discount == "true")
	{
		total -= 5;
	}
	if(text != "")
	{
	    total += 13.99;
	}
    if(graphic != "")
	{
	    total += 14.99;
	}
	displayTotal();
}

//event listener for customize options gets value of button clicked
var par = document.querySelector("#getValues");
par.addEventListener("click", getNewValues, false);

//event listener for submit button passes on value for validation
var sub = document.getElementById("submit");
sub.addEventListener("click", function(event){
    validateForm(event);
});

//gets email details after user input and checks it for discount options
var el = document.getElementById("email");
el.addEventListener("blur", checkEmail, false);

//when contact number is entered gets values and passes it on for validation
var el2 = document.getElementById("contactNo");
el2.addEventListener("blur", function(event){
	validateForm(event);
});

//clicked item value is assign to var then to main function handler
function getNewValues(e) 
{
    if (e.target !== e.currentTarget) 
	{
        var clickedItem = e.target;
		formOptions(clickedItem);
	}
    e.stopPropagation();
}

//main function handler for t-shirt design options
//accepts a value ass parameter switch statement sorts "colour, size, Text, graphic"
//assigns values to the appropriate variables and displays text & graphic on t-shirt0
//keeps error messages hidden if condition is met.
//sends values and names to updateForm function
function formOptions(newValue)
{
	var value;
	switch(newValue.name)
	{
	    case "colour":
		    colour = newValue.value;
			document.getElementById("tShirt").style.backgroundColor = colour;
			updateForm(colour, "colour", colourElm);
			document.getElementById("colourError").hidden="hidden";
		    break;
	    case "size":
	        size = newValue.value;
			updateForm(size, "size", sizeElm);
			document.getElementById("sizeError").hidden="hidden";
	        break;
		case "addText":
		    text = document.getElementById("customText").value;
		    document.getElementById("displayText").innerHTML = text;
			updateForm(text, "Custom text", textElm);
			break;
		case "textRemove":
		    document.getElementById("displayText").innerHTML = "";
			text = "";
		    document.getElementById("form").removeChild(textElm);
	        break;
		case "getGraphic":
		    document.getElementById("addGraphic").src = newValue.src;
		    document.getElementById("addGraphic").hidden = "";
			graphic = newValue.id;
			updateForm(graphic, "Graphic", graphicElm);
			break;
		case "removeGraphic":
		    graphic = "";
			value = "";
			document.getElementById("addGraphic").src = "";
			document.getElementById("addGraphic").hidden = "hidden";
			document.getElementById("form").removeChild(graphicElm);
	        break;
	}
	calculateTotal();  
}

//adds the total cost and fixes it to 2 decimal places
function displayTotal()
{
    var el = document.getElementById("total");
    el.innerHTML = "Total : $" + total.toFixed(2);
}

//accepts name and value then adds data to the form by setting each attributes
function updateForm(setValue, setName, x)
{    
    x.setAttribute("type", "text");
	x.setAttribute("value", setValue);
	x.setAttribute("name", setName);
	x.setAttribute("hidden", "hidden");
	document.getElementById("form").appendChild(x);
}

//accepts the event from listener on submit button
//if size & colour have not been selected stops form from submitting
function validateForm(event)
{
	var colourErrorMsg = document.getElementById("colourError");
	var sizeErrorMsg = document.getElementById("sizeError");
	
	if(colour == "")
    {
	    colourErrorMsg.hidden = "";
		event.preventDefault();
    }
	if(size == "")
	{
		sizeErrorMsg.hidden = "";
		event.preventDefault();
	}

	contactNo = document.getElementById("contactNo").value;
	if(contactNo.length != 10)
	{
	    document.getElementById("errorMessage").hidden ="";
		event.preventDefault();
	}
    else{
		document.getElementById("errorMessage").hidden="hidden";
		updateForm(total.toFixed(2), "total", totalElm);
	}
}

//checks email address for mycit.ie and adds discount if this condition is true 
function checkEmail()
{
    email = document.getElementById("email").value;
	var msg = document.getElementById("discountMessage");
	if(discount == "false" && email.includes("@mycit.ie"))
	{
		msg.value="mycit.ie Discount applied"
		msg.hidden ="";
		discount = "true";
	}
    else if(discount == "true" && !email.includes("@mycit.ie"))
	{
		msg.innerHTML ="discount Removed"
		discount = "false";
	}
    calculateTotal();
}
