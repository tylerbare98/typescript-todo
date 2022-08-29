export default interface todoState {
    list: {
        label: string
        id: string
        isChecked: boolean
    }[],
}