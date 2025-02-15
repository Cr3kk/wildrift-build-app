import { writable } from 'svelte/store';

export const stats = writable({
    HP: 0,
    AD: 0,
    AP: 0,
    AR: 0,
    MR: 0,
    MPR: 0,
    APR: 0,
    PV: 0,
    AS: 0,
    CR: 0,
    AH: 0,
    MA: 0,
    MRE: 0,
    HR: 0,
    HSS: 0,
    MS: 0
});
