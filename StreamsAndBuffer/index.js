let value1 = "Ritesh";
let BufferValues1 = Buffer.from(value1);
console.log(BufferValues1);

let value2 = "Maurya";
let BufferValues2 = Buffer.from(value2);
console.log(BufferValues2);

let combinedBuffer = Buffer.concat([BufferValues1, BufferValues2]);
console.log(combinedBuffer);
