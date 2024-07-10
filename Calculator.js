const display = document.getElementById("display");

function appendToDisplay(input) {
    if (display.value == "Error") {
        display.value = "";
    }
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value);
    }
    catch (error) {
        display.value = "Error";
    }
}

function checkInput(e){
    if (e.keyCode >= 45 && e.keyCode <= 57) {
        if (display.value == "Error") {
            display.value = "";
        }
        display.value += String.fromCharCode(e.keyCode);
    }

    else if (e.keyCode == 42 || e.keyCode == 43) {
        if (display.value == "Error") {
            display.value = "";
        }
        display.value += String.fromCharCode(e.keyCode);
    }

    else if (e.keyCode == 61 || e.keyCode == 13) {
        try {
            display.value = eval(display.value);
        }
        catch (error) {
            display.value = "Error";
        }
    }
    //alert(e.keyCode);
}
window.addEventListener("keypress", checkInput);