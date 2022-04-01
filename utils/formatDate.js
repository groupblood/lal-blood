import moment from 'moment';

const formatDate = (date) => {
    return moment(date).format('DD-MM-YYYY');
};

const extractToArray = (date) => {
    const arr = date.split('-');
    const out = arr.map((dt) => Number(dt)).reverse();
    out[1] = out[1] === 12 ? out[1] - 1 : out[1];
    out[2] = out[2] === 31 ? out[2] - 1 : out[2];
    return out;
};

export const compareDate = (date) => {
    if (!date) {
        return true;
    }
    const today = moment(new Date()).format('DD-MM-YYYY');

    const [a, b] = [moment(extractToArray(date)), moment(extractToArray(today))];

    const diff = b.diff(a, 'months');

    if (diff >= 4) {
        return true;
    }
    return false;
};

export default formatDate;
