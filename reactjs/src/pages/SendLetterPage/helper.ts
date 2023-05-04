// sleep function for testing with delay for loaders
export const sleep = (second: number) => new Promise(resolve => setTimeout(resolve, second * 1000))
