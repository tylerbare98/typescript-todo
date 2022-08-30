export default interface todoState {
    list: {
        label: string
        id: string
        isChecked: boolean
    }[],
    completionStatus: completionStatus
}

type completionStatus = "all" | "active" | "complete";