import React, { CSSProperties, useState } from "react";
import { Sounds } from "../Sound/Sounds";
import { SoundSprites } from "../Sound/SoundSprites";
import SoundButton from "./SoundButton";

const style: CSSProperties = {
    color: "white"
};

export default function DebugSound(): JSX.Element {

    const [howl, setHowl] = useState<Howl>();

    function play(src: string, begin: number, end: number): void {
        howl?.stop();
        const h = new Howl({
            src,
            sprite: {
                play: [begin, end],
            },
            loop: true
        });
        setHowl(h);
        h.play("play");
    }

    return (
        <div style={style} >
            <h1>Sound tester app</h1>
            <div style={{ display: "flex", flexDirection: "column", width: "250px" }}>
                <p>Wizzing used by Balloons</p>
                {
                    Sounds.Wizzing.map((src, index) =>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <SoundButton
                                key={index}
                                src={src}
                                text={"Wizzing " + index.toString()}
                                onPlay={play}
                                sprite={SoundSprites.Wizzing[index]}

                            />
                            <button onClick={() => howl?.stop()} >Stop</button>
                        </div>
                    )
                }
                <p>Whoping used by orbs</p>
                {
                    Sounds.Whoping.map((src, index) =>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <SoundButton
                                key={index}
                                src={src}
                                text={"Whoping " + index.toString()}
                                onPlay={play}
                                sprite={SoundSprites.Whoping[index]}

                            />
                            <button onClick={() => howl?.stop()} >Stop</button>
                        </div>
                    )
                }
                <p>Tjirping, used by birds</p>
                {
                    Sounds.Tjirping.map((src, index) =>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <SoundButton
                                key={index}
                                src={src}
                                text={"Tjirping " + index.toString()}
                                onPlay={play}
                                sprite={SoundSprites.Tjirping[index]}
                            />
                            <button onClick={() => howl?.stop()} >Stop</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}