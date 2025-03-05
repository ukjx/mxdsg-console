import {KeyUnit} from "@/types/keyUnit.ts";

export interface RoleConfig {
    fixedPoint: string;
    attack: string;
    jump: string;
    upJumpMode: string;
    upJump: string;
    forwardMode: string;
    changeLine: string;
    jumpDelay: string;
    npc: string;
    boss: string;
    buffs: KeyUnit[];
    attacks: KeyUnit[];
}