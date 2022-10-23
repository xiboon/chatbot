export default class Util {
    static normalize(str: string) {
        return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").replaceAll('ł', '').toLowerCase();
    }
}
