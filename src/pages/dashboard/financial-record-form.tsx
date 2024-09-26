import { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { useFinancialRecords } from "../../contexts/financial-record-context"

export const FinancialRecordForm = () => {
    const [description, setDescription] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [paymentMethod, setPaymentMethod] = useState<string>("")
    const [sortType, setSortType] = useState<string>("income") // New state for radio button
    const { addRecord } = useFinancialRecords()
    const { user } = useUser()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Adjust the amount based on the sort type
        let adjustedAmount = parseFloat(amount)
        if (sortType === "income") {
            adjustedAmount = Math.abs(adjustedAmount) // Ensure it's positive
        } else if (sortType === "expenses") {
            adjustedAmount = -Math.abs(adjustedAmount) // Ensure it's negative
        }

        // Format the date before submission
        const currentDate = new Date().toISOString().split('T')[0] // gives YYYY-MM-DD format

        const newRecord = {
            userId: user?.id ?? "",
            date: currentDate,
            description: description,
            amount: adjustedAmount,
            category: category,
            paymentMethod: paymentMethod,
        }

        addRecord(newRecord)
        setDescription("")
        setAmount("")
        setCategory("")
        setPaymentMethod("")
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Description:</label>
                    <input
                        type="text"
                        required
                        className="input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label>Amount:</label>
                    <input
                        type="number"
                        required
                        className="input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <label>Category:</label>
                    <select
                        required
                        className="input"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a Category</option>
                        <option value="Food">Food</option>
                        <option value="Rent">Rent</option>
                        <option value="Salary">Salary</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Payment Method:</label>
                    <select
                        required
                        className="input"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="">Select a Payment Method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Sort By:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="sortType"
                                value="income"
                                checked={sortType === "income"}
                                onChange={() => setSortType("income")}
                                required
                            />
                            Income
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="sortType"
                                value="expenses"
                                checked={sortType === "expenses"}
                                onChange={() => setSortType("expenses")}
                                required
                            />
                            Expenses
                        </label>
                    </div>
                </div>
                <button type="submit" className="button">
                    Add Record
                </button>
            </form>
        </div>
    )
}
