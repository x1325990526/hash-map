export default class HashMap {

    constructor() {
        this.load = 0.75;
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }
    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    } 
}

class Node {

    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}