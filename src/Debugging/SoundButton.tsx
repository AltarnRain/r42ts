/**
 * @preserve Copyright 2019-2020 Onno Invernizzi.
 * This source code is subject to terms and conditions.
 * See LICENSE.MD.
 */

import React, { useEffect, useState } from "react";

/**
 * Module:          SoundButton
 * Responsibility:  Component that plays a howl using a sprite.
 */

type spriteArray = number | undefined;

export default function SoundButton(props: {
    text: string,
    src: string,
    onPlay: (
        src: string,
        begin: number,
        end: number) => void,
    sprite?: spriteArray[]
}): JSX.Element {

    const [begin, setBegin] = useState("0");
    const [end, setEnd] = useState("0");
    const [duration, setDuration] = useState(0);
    const [customBegin, setCustomBegin] = useState(false);
    const [customEnd, setCustomEnd] = useState(false);

    useEffect(() => {
        const h = new Howl({ src: props.src });

        // Convert duration to ms and round.
        const d = Math.round(h.duration() * 1000);
        setDuration(d);

        if (props.sprite && props.sprite[0] !== undefined) {
            setBegin(props.sprite[0].toString());
            setCustomBegin(true);
        } else {
            setBegin("0");
        }

        if (props.sprite && props.sprite[1] !== undefined) {
            setEnd(props.sprite[1].toString());
            setCustomEnd(true);
        } else {
            setEnd(d.toString());
        }

    }, []);

    function handleClick(): void {
        props.onPlay(props.src, parseInt(begin, 10), parseInt(end, 10));
    }

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <button style={{ width: "150px" }} onClick={handleClick}>{props.text}</button>
            <input style={{ width: "30px", backgroundColor: customBegin ? "yellow" : "white"  }} value={begin} onChange={(e) => setBegin(e.target.value)}></input>
            <input style={{ width: "30px", backgroundColor: customEnd ? "yellow" : "white" }} value={end} onChange={(e) => setEnd(e.target.value)}></input>
            <input style={{ width: "30px" }} value={duration.toString()} readOnly={true} ></input>
        </div>
    );
}