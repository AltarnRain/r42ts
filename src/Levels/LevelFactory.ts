import BaseLevel from "../Base/BaseLevel";
import { Runner } from "../Modules";
import Level01 from "./Level01";
import Level02 from "./Level02";

export function levelFactory(level: number): BaseLevel | undefined {
    switch (level) {
        case 1:
            return new Level01(Runner.run);
        case 2:
            return new Level02(Runner.run);
    }
}