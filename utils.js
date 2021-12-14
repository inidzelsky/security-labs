module.exports = {
    splitByN(n, str) {
        const splitted = []
    
        for (let i = 1; i < str.length; i++) {
            if ((i + 1) % n === 0) {
                splitted.push(str.slice(i - (n - 1), i + 1))
            }
        }
    
        return splitted
    }
}