import {find} from "unit-manip"

export default ({maxLength}) => {
    const cache = [maxLength]
    return {
        put: (key, value) => {
            cache.push({key, value})
            if (maxLength && cache.length > maxLength) {
                cache.shift()
            }
            return value
        },
        get: key => {
            const found = find(cache,"key",key)
            return found && found.value
        }
    }
}