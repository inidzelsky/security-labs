module.exports = {
    randomizer(min, max) {
        return Math.floor(min + Math.random() * (max - min))
    },
}
