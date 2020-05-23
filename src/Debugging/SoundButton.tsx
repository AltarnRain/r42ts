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

export default function SoundButton(props: {
    text: string,
    src: string,
    onPlay: (
        src: string,
        begin: number,
        end: number) => void,
    sprite?: number[]
}): JSX.Element {

    const [begin, setBegin] = useState("0");
    const [end, setEnd] = useState("0");
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const h = new Howl({ src: props.src });

        // Convert duration to ms and round.
        const d = Math.round(h.duration() * 1000);
        setDuration(d);

        if (props.sprite && props.sprite[0] !== undefined) {
            setBegin(props.sprite[0].toString());
        } else {
            setBegin("0");
        }

        if (props.sprite && props.sprite[1] !== undefined) {
            setEnd(props.sprite[1].toString());
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
            <input style={{ width: "30px" }} value={begin} onChange={(e) => setBegin(e.target.value)}></input>
            <input style={{ width: "30px" }} value={end} onChange={(e) => setEnd(e.target.value)}></input>
            <input style={{ width: "30px" }} value={duration.toString()} readOnly={true} ></input>
        </div>
    );
}