module.exports = {
    splitByN(n, str) {
        const splitted = []
    
        for (let i = 1; i < str.length; i++) {
            if ((i + 1) % n === 0) {
                splitted.push(str.slice(i - (n - 1), i + 1))
            }
        }
    
        return splitted
    },
    frequencyAnalysis(text, { fragmentLength } = { fragmentLength: 1 }) {
        const analysedFragmentsSet = new Set()
        const fragmentsFrequency = new Map()
    
        for (let i = 0; i <= text.length - fragmentLength; i++) {
            const fragment = text.slice(i, i + fragmentLength)
            if (!analysedFragmentsSet.has(fragment)) {
                fragmentsFrequency.set(fragment, text.split(fragment).length - 1)
                analysedFragmentsSet.add(fragment)
            }
        }
        return Array.from(fragmentsFrequency.entries()).sort((a, b) => b[1] - a[1])
    },
    calculateCoincidences(text1, text2) {
        return text1.split("").reduce((acc, value, index) => acc += value === text2[index] ? 1 : 0, 0)
    },
    slideText(charsCount, text) {
        const textLength = text.length
        return text.slice(textLength - charsCount, textLength) + text.slice(0, textLength - charsCount)
    }
}
