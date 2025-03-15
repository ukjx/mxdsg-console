import {KeyUnit} from "@/types/keyUnit.ts";

export interface RoleConfig {
    hpKey: string;
    mpKey: string;
    fixedPoint: string;
    offset: string;
    attack: string;
    jump: string;
    upJumpMode: string;
    upJump: string;
    teleport: string;
    forwardMode: string;
    forwardCount: number;
    changeLine: string;
    jumpDelay: string;
    npc: string;
    boss: string;
    guide: string;
    guideStep: string;
    amulet: string;
    buffs: KeyUnit[];
    attacks: KeyUnit[];
}