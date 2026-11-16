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
    set(key, value) {
        let temp = this.buckets[this.hash(key)];
        if(temp === null){
            this.buckets[this.hash(key)] = new Node(key, value);
            return;
        }
        while (temp !== null) {
            if(temp.key === key) {
                temp.value = value;
                return;
            }
            temp = temp.next;
        }
        this.size++;
        if((this.size / this.capacity) > this.load) this.resize(); 
        
    }

    resize(){

    }

    get(key) {
        let temp = this.buckets[this.hash(key)];
        if(temp === null) return;
        while (temp !== null) {
            if(temp.key === key) return temp.value;
            temp = temp.next;
        }
        return;

    }
    has(key) {
        let temp = this.buckets[this.hash(key)];
        if(temp === null) return false;
        while (temp !== null) {
            if(temp.key === key) return true;
            temp = temp.next;
        }
        return false;     
    }
}

class Node {

    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}