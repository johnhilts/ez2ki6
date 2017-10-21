export const searchByDateRange = (searchText, from, to, date) => {
    let fromDate = new Date(from.year, from.month, from.day);
    let toDate = new Date(to.year, to.month, to.day);
    let compareDate = new Date(date.year, date.month, date.day);
    return (
        date.dateInfo.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
            && fromDate <= compareDate
            && toDate >= compareDate
    );
}