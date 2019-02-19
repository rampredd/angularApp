export function getShortDate(dateVal: Date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return monthNames[dateVal.getMonth()] + ' ' + dateVal.getFullYear();
}