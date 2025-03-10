import {KeyUnit} from "@/types/keyUnit.ts";

export interface RoleConfig {
    fixedPoint: string;
    attack: string;
    jump: string;
    upJumpMode: string;
    upJump: string;
    teleport: string;
    forwardMode: string;
    changeLine: string;
    jumpDelay: string;
    npc: string;
    boss: string;
    guide: string;
    guideStep: string;
    buffs: KeyUnit[];
    attacks: KeyUnit[];
}