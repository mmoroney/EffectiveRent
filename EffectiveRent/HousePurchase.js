function DownpaymentOpportunityCost(downpayment, returnOnInvestments, timeHorizon) {
    return FutureValue(downpayment, returnOnInvestments, timeHorizon);
}

function ClosingOpportunityCost(closingCosts, returnOnInvestments, timeHorizon) {
    return FutureValue(closingCosts, returnOnInvestments, timeHorizon);
}

function MortagePaymentOpportunityCost(mortgagePayment, term, returnOnInvestments, timeHorizon) {
    mortgagePaymentOpportunityCost = Sum(mortgagePayment, ToMonthlyRate(returnOnInvestments) + 1.0, 12 * Math.min(term, timeHorizon));
    if (timeHorizon > term)
        mortgagePaymentOpportunityCost = FutureValue(mortgagePaymentOpportunityCost, returnOnInvestments, timeHorizon - term);

    return mortgagePaymentOpportunityCost;
}

function MonthlyExpensesOpportunityCost(monthlyExpenses, inflationRate, returnOnInvestments, timeHorizon) {
    return ProgressiveFutureValue(monthlyExpenses, ToMonthlyRate(inflationRate), ToMonthlyRate(returnOnInvestments), timeHorizon * 12);
}

function PropertyTaxOpportunityCost(purchasePrice, propertyTaxRate, appreciationRate, returnOnInvestments, timeHorizon) {
    return ProgressiveFutureValue(purchasePrice * propertyTaxRate * (1.0 + appreciationRate), appreciationRate, returnOnInvestments, timeHorizon);
}

function RemainingPrincipal(mortgagePayment, principal, interestRate, term, timeHorizon) {
    if (timeHorizon >= term)
        return 0;

    return FutureValue(principal, ToMonthlyRate(interestRate), 12 * timeHorizon) - Sum(mortgagePayment, 1.0 + ToMonthlyRate(interestRate), 12 * timeHorizon);
}

function HouseValue(purchasePrice, appreciationRate, timeHorizon) {
    return FutureValue(purchasePrice, appreciationRate, timeHorizon);
}

function TaxRefundValue(principal, mortgagePayment, interestRate, term, marginalTaxRate, returnOnInvestments, timeHorizon) {
    n = Math.min(term, timeHorizon);

    value = (Sum(12 * mortgagePayment, 1.0 + returnOnInvestments, n) + ProgressiveFutureValue((principal - mortgagePayment / ToMonthlyRate(interestRate)) * interestRate, interestRate, returnOnInvestments, n)) * marginalTaxRate;

    if (timeHorizon > term)
        value = FutureValue(value, returnOnInvestments, timeHorizon - term);

    return value;
}
