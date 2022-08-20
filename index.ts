export class Semaphore{
    constructor(private count: number){}
    private readonly _queue : Array<(value: (void | PromiseLike<void>)) => void> = [];
    async acquire(): Promise<void>{
        return new Promise((resolve) => {
            this.count--;
            if(this.count < 0){
                this._queue.push(resolve);
                return;
            }
            resolve();
        });
    }
    async resolve(): Promise<void>{
        this.count++;
        if(this.count <= 0){
            const resolve = this._queue.shift();
            if(resolve) resolve();
        }
    }
}

export class Mutex extends Semaphore{
    constructor(){
        super(1);
    }
}

export async function waitFor(milliseconds: number): Promise<void>{
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}
