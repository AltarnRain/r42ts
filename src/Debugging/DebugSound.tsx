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
            <div style={{ display: "flex", flexDirection: "column", width: "150px" }}>
                <button onClick={() => howl?.stop()} >Stop</button>
                {
                    Sounds.Whoping.map((src, index) =>
                        <SoundButton
                            key={index}
                            src={src}
                            text={"Whoping " + index.toString()}
                            onPlay={play}
                            sprite={SoundSprites.Whoping[index]}
                        />)
                }
                {
                    Sounds.Tjirping.map((src, index) =>
                        <SoundButton
                            key={index}
                            src={src}
                            text={"Tjirping " + index.toString()}
                            onPlay={play}
                            sprite={SoundSprites.Tjirping[index]}
                        />)
                }
            </div>
        </div>
    );
}