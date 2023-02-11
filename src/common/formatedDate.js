function formatedDate(date) {
    if (date.toString().length > 15) {
        return date.toLocaleDateString()
    } else {
        return date
    }

}

export default formatedDate