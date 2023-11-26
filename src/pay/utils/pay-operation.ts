export function debitOperation(balance, amount) {
    const checkBalance = balance - amount

    if (checkBalance > 0) {
        return balance - amount
    } else {
        throw new Error("You don't have enough money")
    }
}

export function refilOperation(balance, amount) {
    return balance + amount
}
