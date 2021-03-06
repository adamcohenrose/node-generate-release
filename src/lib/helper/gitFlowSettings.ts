/**
 * Generate Release
 * Written by Kevin Gravier <kevin@mrkmg.com>
 * MIT License 2018
 */

import {existsSync} from "fs";
import {parseSync} from "iniparser";
import {resolve} from "path";

const BRANCH_CONFIG = 'gitflow "branch"';
const PREFIX_CONFIG = 'gitflow "prefix"';

export interface IGitFlowSettings {
    develop: string;
    master: string;
}

export function gitFlowSettings(): IGitFlowSettings {
    const file = `${resolve(".")}/.git/config`;

    if (!existsSync(file)) {
        throw new Error(`Git Config File is missing: ${file}`);
    }

    const iniData = parseSync(file) as any;

    if (!iniData) {
        throw new Error("Failed to parse init file");
    }

    if (!iniData[BRANCH_CONFIG] || !iniData[BRANCH_CONFIG].master || !iniData[BRANCH_CONFIG].develop) {
        throw new Error("Git config missing git-flow branch configuration");
    }

    if (!iniData[PREFIX_CONFIG] || iniData[PREFIX_CONFIG].versiontag === undefined) {
        throw new Error("Git config missing git-flow prefix configuration");
    }

    return {
        develop: iniData[BRANCH_CONFIG].develop,
        master: iniData[BRANCH_CONFIG].master,
    };
}
