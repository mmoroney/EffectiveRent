/// <summary>
/// Calculates the sum of a geometric series
/// </summary>
/// <param name="a">The first term in the series.</param>
/// <param name="r">The common ratio between successive terms.</param>
/// <param name="n">The number of terms in the series.</param>
/// <returns></returns>
function Sum(a, r, n)
{
    if (r == 1.0)
        return a * n;

    return a * (Math.pow(r, n) - 1) / (r - 1);
}


/// <summary>
/// Calculates the payment for a mortgage.
/// </summary>
/// <param name="p">Initial principal of the loan.</param>
/// <param name="i">The interest rate per period.</param>
/// <param name="n">The number of periods.</param>
/// <returns></returns>
function Payment(p, i, n)
{
    return p * i / (1 - Math.pow(1 + i, -n));
}

/// <summary>
/// Calculates the future value of an asset.
/// </summary>
/// <param name="a">Initial value of the asset.</param>
/// <param name="i">The rate at which the asset increases per period.</param>
/// <param name="n">The number of periods.</param>
/// <returns></returns>
function FutureValue(a, i, n)
{
    return a * Math.pow(1 + i, n);
}

/// <summary>
/// Calculates the future value of a series of increasing payments
/// </summary>
/// <param name="a">Value of the initial payment.</param>
/// <param name="i">Rate at which the amount of the payment increases per period.</param>
/// <param name="r">Rate at which the value of all money paid increases per period.</param>
/// <param name="n">The number of periods.</param>
/// <returns></returns>
function ProgressiveFutureValue(a, i, r, n)
{
    return Sum(a * Math.pow(1.0 + r, n - 1), (1.0 + i) / (1.0 + r), n);
}

/// <summary>
/// Converts an annual interest rate to a monthly interest rate.
/// </summary>
/// <param name="annualRate">The annual interest rate.</param>
/// <returns></returns>
function ToMonthlyRate(annualRate)
{
    return Math.pow(annualRate + 1.0, 1.0 / 12) - 1.0;
}

/// <summary>
/// Calculates the effective monthly expense based on a total opportunity cost.
/// </summary>
/// <param name="inflationRate">The annual rate at which monthly expenses increase.</param>
/// <param name="returnOnInvestments">The annual rate at which investments increase.</param>
/// <param name="n">The number of payments to be made.</param>
/// <returns></returns>
function EffectiveMonthlyCostRatio(inflationRate, returnOnInvestments, n)
{
    return 1.0 / (ProgressiveFutureValue(1.0 + inflationRate, inflationRate, returnOnInvestments, n));
}