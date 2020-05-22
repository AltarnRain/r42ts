// window.onload = () => {
//     const canvas = document.getElementById("canvas") as HTMLCanvasElement;
//     if (canvas) {
//         // Initialize the dimentions of the canvas.
//         canvas.width = dimensionProvider().fullGameWidth;
//         canvas.height = dimensionProvider().fullGameHeight;

//         const queryKeyValuePairs = getURLQueryKVPs(window.location.search);

//         const showPlayGround = queryKeyValuePairs.some((kvp) => kvp.key === "playground");
//         const showCanvas = queryKeyValuePairs.some((kvp) => kvp.key === "canvas");
//         const sound = queryKeyValuePairs.some((kvp) => kvp.key === "sound");
//         let level = queryKeyValuePairs.find((kvp) => kvp.key === "level")?.value;
//         const drawGrid = queryKeyValuePairs.find((kvp) => kvp.key === "grid");
//         const showhitboxes = queryKeyValuePairs.find((kvp) => kvp.key === "hitboxes");
//         const immortal = queryKeyValuePairs.find((kvp) => kvp.key === "god");
//         const lives = queryKeyValuePairs.find((kvp) => kvp.key === "lives");
//         const phasers = queryKeyValuePairs.find((kvp) => kvp.key === "phasers");
//         const timelevelTimeLimit = queryKeyValuePairs.find((kvp) => kvp.key === "timelevelTimeLimit");

//         if (showPlayGround) {

//             const debuggingState: DebuggingState = {};

//             if (!level) {
//                 level = "0";
//             }

//             if (level) {
//                 dispatch(setLevel(parseInt(level, 10)));
//             }

//             GameLoop.start();

//             if (lives) {
//                 dispatch(setLives(parseInt(lives.value, 10)));
//             } else {
//                 dispatch(setLives(900));
//             }

//             if (phasers) {
//                 dispatch(setPhasers(parseInt(phasers.value, 10)));
//             } else {
//                 dispatch(setPhasers(900));
//             }

//             if (timelevelTimeLimit) {
//                 dispatch(setTimeLevelTimeLimit(parseInt(timelevelTimeLimit.value, 10)));
//             } else {
//                 dispatch(setTimeLevelTimeLimit(2000));
//             }

//             if (immortal) {
//                 debuggingState.playerIsImmortal = true;
//             }

//             if (drawGrid) {
//                 let gridDetail: number | undefined;
//                 if (drawGrid.value) {
//                     gridDetail = parseInt(drawGrid.value, 10);
//                 }

//                 debuggingState.drawGrid = true;
//                 debuggingState.gridDetail = gridDetail;
//             }

//             if (showhitboxes) {
//                 debuggingState.drawHitboxes = true;
//             }

//             dispatch(increaseScore(7400));

//             dispatch(setDebuggingState(debuggingState));

//             (window as any).r42 = {
//                 setLevel: (n: number) => dispatch(setLevel(n)),
//                 nextLevel: () => dispatch(nextLevel()),
//                 setPhasers: (n: number) => dispatch(setPhasers(n)),
//                 setLives: (n: number) => dispatch(setLives(n)),
//                 increaseScore: (n: number) => dispatch(increaseScore(n)),
//                 addPhaser: () => dispatch(addPhaser()),
//                 setWarpLevelComplexity: (n: WarpLevelComplexity) => dispatch(setWarpGamteComplexity(n)),
//                 setDebuggingState: (v: DebuggingState) => dispatch(setDebuggingState(v)),
//             };

//         } else if (showCanvas) {
//             // canvas testing
//             const ctx = ctxProvider();

//             // Green.
//             ctx.fillStyle = "#00AA00";

//             (window as any).r42 = ctx;
//         } else if (sound) {
//             // SoundProvider.playTravelingWarpGate();
//             // SoundPlayer.playWhop(20);
//             SoundPlayer.playTravelingWarpGate();
//         } else {
//             begin();
//         }
//     }
// };

// function begin(): void {
//     dispatch(gameStart());

//     if (showInstructions) {
//         alert(`
                // Press F1 to fire a bullet
                // Press F2 to fire a phaser.
                //   You only have limited charges so use them wisely.
                // Press Backspace to self destruct and ship a level.
                // Use the arrow keys to move.

                // A life and phaser is awared every 7500 points.
                // When you die you'll lose your phaser charges.
                // When you die you can hold Space to pause your formation
                // When there's enemies on the screen you can move
                // left and right while your ship is warping in.
//             `);

//         showInstructions = false;
//     }

//     GameLoop.start();
// }