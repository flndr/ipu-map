import { MitarbeiterFromXls } from './MitarbeiterFromXls';

export interface MitarbeiterLocated extends MitarbeiterFromXls {
    lat : string,
    lon : string,
}
