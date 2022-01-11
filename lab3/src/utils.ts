export const mod = (x: bigint, y: bigint): bigint => {
    const res: bigint = x % y
    return res >= BigInt(0) ? res : res + y
}
