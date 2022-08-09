class Stack<T = any> {
	arr: T[];
	constructor(arr?: T[]) {
		this.arr = arr || [];
	}
	push<U extends T>(data: U) {
		this.arr.push(data);
	}
	pop() {
		return this.arr.pop();
	}
	peek() {
		return this.arr[this.arr.length - 1];
	}
	empty() {
		return this.arr.length === 0;
	}
}
export default Stack;
