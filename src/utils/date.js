import moment from 'moment'

export function date(n = 0) {
    return moment(new Date()).add(n, 'days').format('YYYY-MM-DD')
}

export function datetime(n = 0) {
    return moment(new Date()).add(n, 'days').format('YYYY-MM-DD HH:mm:ss')
}

export function dateFormat(ts, format = 'YYYY-MM-DD') {
    if (String(ts).length == 10) {
        ts *= 1000
    }
    return moment(ts).format(format)
}

export function formatDateTime(ts, format = 'MM-DD HH:mm') {
    if (String(ts).length == 10) {
        ts *= 1000
    }
    return moment(ts).format(format)
}
