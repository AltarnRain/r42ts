
export function calcFPS(frame: (callback: () => void, n: number) => void, resultCallback: (fps: number) => void): void {
    function checker(): void {
        if (index--) {
            frame(checker, 0);
        } else {
            const result = count * 1000 / (performance.now() - start);
            resultCallback(result);
        }
    }

    const count = 60;
    let index = count;
    const start = performance.now();
    checker();
}