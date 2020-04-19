import BaseLevel from "../Base/BaseLevel";
import enemeyLevelRunner from "../Main/EnemeyLevelRunner";
import Level01 from "./Level01";
import Level02 from "./Level02";

export function levelFactory(level: number): BaseLevel | undefined {
    switch (level) {
        case 1:
            return new Level01(enemeyLevelRunner);
        case 2:
            return new Level02(enemeyLevelRunner);
    }
}