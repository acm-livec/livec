// src/utils/logger
// Enhanced front-end logger for Vite/React (DEV-only behavior)

// Detect development mode (Vite) or fallback for other bundlers
const isDev =
    typeof import.meta !== 'undefined' &&
    import.meta.env &&
    import.meta.env.DEV;

// Correlation ID support
let correlationId = null;
export function setCorrelationId(id) {
    correlationId = id;
}
export function clearCorrelationId() {
    correlationId = null;
}

// Get Mountain Time formatted hh:mm:ss
function getTime() {
    try {
        return new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/Denver',
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(new Date());
    } catch {
        // fallback to local
        return new Date().toLocaleTimeString();
    }
}

// Core formatting: timestamp, level, optional correlation ID
function formatPrefix(level) {
    const time = getTime();
    const corr = correlationId ? `[ID:${correlationId}] ` : '';
    return `%c${corr}[${time}] [${level.toUpperCase()}]%c`;
}

// CSS styles per level
const levelStyles = {
    debug: 'color:rgb(148, 74, 233)',
    info: 'color:rgb(71, 184, 236)',
    success: 'color:rgb(58, 223, 107); font-weight: bold',
    warn: 'color: #e5c07b',
    error: 'color: #e06c75; font-weight: bold',
    fatal: 'color: #be5046; font-weight: bold',
    trace: 'color: #c678dd',
};

// Build styled console args
function buildArgs(level, args) {
    const prefix = formatPrefix(level);
    const style = levelStyles[level] || '';
    return [prefix, style, 'color: inherit', ...args];
}

// Base methods
const methods = {
    debug: (...args) => {
        if (!isDev) return;
        console.debug(...buildArgs('debug', args));
    },
    info: (...args) => {
        if (!isDev) return;
        console.info(...buildArgs('info', args));
    },
    success: (...args) => {
        if (!isDev) return;
        console.log(...buildArgs('success', args));
    },
    warn: (...args) => {
        if (!isDev) return;
        console.warn(...buildArgs('warn', args));
    },
    error: (err, ...args) => {
        if (!isDev) return;
        // err can be Error or message
        if (err instanceof Error) {
            console.error(...buildArgs('error', [err.message, ...args]));
            // print stack trace
            err.stack
                .split('\n')
                .forEach((line) => console.error('    ' + line));
        } else {
            console.error(...buildArgs('error', [err, ...args]));
        }
    },
    fatal: (...args) => {
        if (!isDev) return;
        console.error(...buildArgs('fatal', args));
    },
    trace: (...args) => {
        if (!isDev) return;
        console.trace(...buildArgs('trace', args));
    },

    // Tables & objects
    table: (...args) => {
        if (!isDev) return;
        console.groupCollapsed('📊 Table');
        console.table(...args);
        console.groupEnd();
    },

    // Counters & timers
    count: (label) => {
        if (!isDev) return;
        console.count(label);
    },
    time: (label) => {
        if (!isDev) return;
        console.time(label);
    },
    timeEnd: (label) => {
        if (!isDev) return;
        console.timeEnd(label);
    },

    // Structured JSON logging
    json: (obj) => {
        if (!isDev) return;
        console.log(buildArgs('info', [JSON.stringify(obj, null, 2)]));
    },

    // Grouping
    group: (label) => {
        if (!isDev) return;
        console.group(label);
    },
    groupCollapsed: (label) => {
        if (!isDev) return;
        console.groupCollapsed(label);
    },
    groupEnd: () => {
        if (!isDev) return;
        console.groupEnd();
    },

    startProcess: (id) => {
        if (!isDev) return;
        setCorrelationId(id);
        methods.group(`START ${correlationId}`);
    },
    endProcess: () => {
        if (!isDev) return;
        methods.groupEnd();
        clearCorrelationId();
    },
};

// Namespace support
function create(namespace) {
    const wrap =
        (fn) =>
        (...args) =>
            fn(`[${namespace}]`, ...args);
    return Object.fromEntries(
        Object.entries(methods).map(([name, fn]) => [name, wrap(fn)])
    );
}

export const logger = { ...methods, create };
