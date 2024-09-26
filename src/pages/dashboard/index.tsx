import { useMemo } from "react"
import { useUser } from '@clerk/clerk-react'
import { FinancialRecordForm } from './financial-record-form'
import { FinancialRecordList } from './financial-record-list'
import "./financial-record.css"
import { useFinancialRecords } from '../../contexts/financial-record-context'

export const Dashboard = () => {
    const { user } = useUser()
    const { records } = useFinancialRecords()

    // Calculate Total Monthly, Total Expenses, and Total Income
    const { totalMonthly, totalExpenses, totalIncome } = useMemo(() => {
        let totalAmount = 0
        let totalExpenses = 0
        let totalIncome = 0

        records.forEach((record) => {
            totalAmount += record.amount
            if (record.amount < 0) {
                totalExpenses += record.amount // Accumulate expenses (negative values)
            } else {
                totalIncome += record.amount // Accumulate income (positive values)
            }
        })

        return {
            totalMonthly: totalAmount,
            totalExpenses: totalExpenses,
            totalIncome: totalIncome,
        }
    }, [records])

    // Function to scroll to FinancialRecordList
    const handleViewFinances = () => {
        const financeSection = document.getElementById("financial-record-list")
        if (financeSection) {
            financeSection.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className="dashboard-container">
            <h1>
                Welcome {user?.firstName}! Here Are Your Finances:
            </h1>
            <div className="viewFin">
            <button onClick={handleViewFinances} className="financeBtn button">
                    View Finances
            </button>
            </div>
            <FinancialRecordForm />
            <div className="info1">
                <div className="btnMon" style={{backgroundColor: "blue"}}>
                    Total Monthly: ${totalMonthly}
                </div>
                <div className="btnIn" style={{backgroundColor: "green"}}>
                    Total Income: ${totalIncome}
                </div>
                <div className="btnEx" style={{backgroundColor: "red"}}>
                    Total Expenses: ${totalExpenses}
                </div>
            </div>
            <div id="financial-record-list">
                <FinancialRecordList />
            </div>
        </div>
    )
}
