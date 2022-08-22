# await-blockers
 A simple typescript promise of semaphore, mutex, timeout.

## Semaphore
Supports promise with semaphore.  
Simply create Semaphore instance, and put critical sections between acquire() and release().  
parameter of Semaphore's constructor is max number of concurrent tasks.  
Context will blocked if concurrent task of semaphore is over max number until release() called.

### Example
```ts
import { Semaphore } from 'await-blockers';
const semaphore = new Semaphore(2);
async semaphoreUsage(){
    await semaphore.acquire();
    try{
        ///... Some Critical Section
    } finally{
        await semaphore.release();
    }
}
```

## Mutex
Supports promise with mutex.  
It equals to Semaphore(1). Only allows one concurrent task.  
Context will blocked until release() called.

### Example
```ts
import { Mutex } from 'await-blockers';
const mutex = new Mutex();
async mutexUsage(){
    await mutex.acquire();
    try{
        ///... Some Critical Section
    } finally{
        await mutex.release();
    }
}
```

## Timeout
Supports promise with timeout.  
Context will blocked until timeout elapsed.

### Example
```ts
import { waitFor } from 'await-blockers';
async timeOutUsage(){
    console.log("Waiting 1 seconds...");
    await waitFor(1000); //Will block context for 1 seconds..
    //... A Method which called after 1 seconds..
    console.log("Done!");
}
```
