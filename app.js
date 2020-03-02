// listen for submit 
document.getElementById("loan-form").addEventListener('submit', function(e){
    document.getElementById("results").style.display = "none";

    // show loader
    document.getElementById('loading').style.display = "block";
    
    // setTimeOut 
    setTimeout(calculateResults,1500);
    // settimeout take two parameters, 1st is the actual name of function/or entire funct and 2nd is amount of time in millisecond 
    // is delay the action like loading etc 
  e.preventDefault();
})

// calculate result 
function calculateResults(e){
    console.log("calculating....");
    
    // UI Variables - input 
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    // UI Variables - Output 
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest  = document.getElementById('total-interest');

    // calculation 
    const principal = parseFloat(amount.value); 
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayment= parseFloat(years.value)*12; 

    // comput monthly payments
    const x = Math.pow(1 + calculatedInterest,calculatedPayment);
    const monthly= (principal * x* calculatedInterest) / (x-1);
    
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2); 
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment)- principal).toFixed(2);

        // show the result 
        document.getElementById('results').style.display = "block";

        // hide loader 
        document.getElementById('loading').style.display = "none"; 
    } else {
        showError("please check your numbers");  
    }
    
    }

// }show error 
function showError(error) {
    // hide result 
    document.getElementById('results').style.display = "none"; 

    // hide loader 
    document.getElementById("loading").style.display = "none"; 

    // create a div 
    const errorDiv = document.createElement("div"); 

    // get elements 
    const card = document.querySelector(".card");
    const heading = document.querySelector('.heading');

    // Add class 
    errorDiv.className = 'alert alert-danger';

    // create text-node and append to div 
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading 
    card.insertBefore(errorDiv, heading); 

    // clear error after 3 seconds 
    setTimeout(clearError, 2500);

}

// clear error 
function clearError(){
    document.querySelector('.alert').remove();
}