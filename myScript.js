var colour ="";
var size ="";
var text ="";
var graphic ="";
var total;
var discount = "false";

var colourElm = document.createElement("input");
var sizeElm = document.createElement("input");
var textElm = document.createElement("input");
var graphicElm = document.createElement("input");

calculateTotal();

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

var par = document.querySelector("#getValues");
par.addEventListener("click", getNewValues, false);

var sub = document.getElementById("submit");
sub.addEventListener("click", function(event){
    validateForm(event);
});

//var el = document.getElementById("email");
//el.addEventListener("blur", checkEmail, false);

function getNewValues(e) 
{
    if (e.target !== e.currentTarget) 
	{
        var clickedItem = e.target;
		formOptions(clickedItem);
	}
    e.stopPropagation();
}

function formOptions(newValue)
{
	var value;
	switch(newValue.name)
	{
	    case "colour":
		    colour = newValue.value;
			document.getElementById("tShirt").style.backgroundColor = colour;
			updateForm(colour, "colour", colourElm);
		    break;
	    case "size":
	        size = newValue.value;
			updateForm(size, "size", sizeElm);
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

function displayTotal()
{
    var el = document.getElementById("total");
    el.innerHTML = "Total : $" + total;
}

//updates form values
function updateForm(setValue, setName, x)
{    
    x.setAttribute("type", "text");
	x.setAttribute("value", setValue);
	x.setAttribute("name", setName);
	x.setAttribute("hidden", "hidden");
	document.getElementById("form").appendChild(x);
}

//accepts the event from listner on submit button
//if size & colour have not been selected stops form from submiting
function validateForm(event)
{
    if(colour == "" || size == "")
    {
       window.alert("Please select Colour and Size!");
	   event.preventDefault();
    }
    checkEmail();
}

function checkEmail()
{
    email = document.getElementById("email").value;
	if(discount == "false" && email.includes("@mycit.ie"))
	{
	    total = total -5;
		window.alert("mycit.ie discount of $5 has been applied Total is now : $)" + total);
		discount = "true";
		displayTotal();
	}
}