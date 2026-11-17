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
        this.insert(key, value);
        if (this.size / this.capacity > this.load) this.resize();
        
    }
     resize() {

    }
    insert(key, value) {
        const index = this.hash(key);
        let temp = this.buckets[index];

        if(temp === null){
            this.buckets[index] = new Node(key, value);
            this.size++;
            return;
        }
        while(true) {
            if(temp.key === key) {
                temp.value = value;
                return;
            }
            if(temp.next === null) break;
            temp = temp.next;
        }
        temp.next = new Node(key, value);
        this.size++;
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
    remove(key) {
        const index = this.hash(key);
        let prev = null;
        let cur = this.buckets[index];
        if(cur === null) return false;
        while (cur !== null) {
            if(cur.key === key) {
                if(prev === null) this.buckets[index] = null;
                else prev.next = cur.next;
                this.size--;
                return true;
            }
            prev = cur;
            cur = cur.next;
        }
        return false;
    }

    length() {return this.size;}

    clear() {
        this.capacity = 16;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    keys() {
        let allKeys = [];
        for (let index = 0; index < this.buckets.length; index++) {
            let temp = this.buckets[index];
            while(temp !== null) {
                allKeys.push(temp.key);
                temp = temp.next;
            }
            
        }

        return allKeys;
    }
}

class Node {

    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}