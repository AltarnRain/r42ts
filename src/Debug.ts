import GameLoop from "./GameLoop";
import ctxProvider from "./Render/CtxProvider";
import { setDebuggingState } from "./State/Debugging/DebuggingActions";
import DebuggingState from "./State/Debugging/DebuggingState";
import { addPhaser, increaseScore, nextLevel, setLevel, setLives, setPhasers, setTimeLevelTimeLimit, setWarpGamteComplexity as setWarpGateComplexity } from "./State/Game/GameActions";
import { WarpLevelComplexity } from "./State/Game/WarpLevelTypes";
import { dispatch } from "./State/Store";
import { getURLQueryKVPs } from "./Utility/Lib";

/**
 * Start the game. If the URL contains certain query query's it will
 * begin in the playground or show th canvas. If nothing is specified (default) the
 * game will just start
 */
export function start(): void {
    const queryKeyValuePairs = getURLQueryKVPs(window.location.search);

    const showPlayGround = queryKeyValuePairs.some((kvp) => kvp.key === "playground");
    const showCanvas = queryKeyValuePairs.some((kvp) => kvp.key === "canvas");
    let level = queryKeyValuePairs.find((kvp) => kvp.key === "level")?.value;
    const drawGrid = queryKeyValuePairs.find((kvp) => kvp.key === "grid");
    const showhitboxes = queryKeyValuePairs.find((kvp) => kvp.key === "hitboxes");
    const immortal = queryKeyValuePairs.find((kvp) => kvp.key === "god");
    const lives = queryKeyValuePairs.find((kvp) => kvp.key === "lives");
    const phasers = queryKeyValuePairs.find((kvp) => kvp.key === "phasers");
    const timelevelTimeLimit = queryKeyValuePairs.find((kvp) => kvp.key === "timelevelTimeLimit");

    if (showPlayGround) {

        const debuggingState: DebuggingState = {};

        GameLoop.start();

        if (!level) {
            level = "0";
        }

        if (level) {
            dispatch(setLevel(parseInt(level, 10)));
        }

        if (lives) {
            dispatch(setLives(parseInt(lives.value, 10)));
        } else {
            dispatch(setLives(900));
        }

        if (phasers) {
            dispatch(setPhasers(parseInt(phasers.value, 10)));
        } else {
            dispatch(setPhasers(900));
        }

        if (timelevelTimeLimit) {
            dispatch(setTimeLevelTimeLimit(parseInt(timelevelTimeLimit.value, 10)));
        } else {
            dispatch(setTimeLevelTimeLimit(2000));
        }

        if (immortal) {
            debuggingState.playerIsImmortal = true;
        }

        if (drawGrid) {
            let gridDetail: number | undefined;
            if (drawGrid.value) {
                gridDetail = parseInt(drawGrid.value, 10);
            }

            debuggingState.drawGrid = true;
            debuggingState.gridDetail = gridDetail;
        }

        if (showhitboxes) {
            debuggingState.drawHitboxes = true;
        }

        dispatch(increaseScore(7400));

        dispatch(setDebuggingState(debuggingState));

        (window as any).r42 = {
            setLevel: (n: number) => dispatch(setLevel(n)),
            nextLevel: () => dispatch(nextLevel()),
            setPhasers: (n: number) => dispatch(setPhasers(n)),
            setLives: (n: number) => dispatch(setLives(n)),
            increaseScore: (n: number) => dispatch(increaseScore(n)),
            addPhaser: () => dispatch(addPhaser()),
            setWarpLevelComplexity: (n: WarpLevelComplexity) => dispatch(setWarpGateComplexity(n)),
            setDebuggingState: (v: DebuggingState) => dispatch(setDebuggingState(v)),
        };

    } else if (showCanvas) {
        // canvas testing
        const ctx = ctxProvider();

        // Green.
        ctx.fillStyle = "#00AA00";

        (window as any).r42 = ctx;
    } else {
        throw new Error("No Debugging info given");
    }
}
