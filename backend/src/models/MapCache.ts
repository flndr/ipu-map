import { MitarbeiterLocated } from './MitarbeiterLocated';

export interface MapCache {
    lastUpdated : string;
    mitarbeiter : MitarbeiterLocated[];
}
