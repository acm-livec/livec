const { createLogger, format, transports, addColors } = require('winston');
const chalk = require('chalk');
const path = require('path');
const RED = chalk.hex('#e06c75');
const ORANGE = chalk.hex('#d19a66');
const YELLOW = chalk.hex('#e5c07b');
const GREEN = chalk.hex('#98c379');
const CYAN = chalk.hex('#56b6c2');
const BLUE = chalk.hex('#61afef');
const PURPLE = chalk.hex('#c678dd');
const WHITE = chalk.hex('#abb2bf'); // default foreground
const GRAY = chalk.hex('#5c6370'); // comments, etc.
const BG = chalk.hex('#282c34'); // background
const ERROR = chalk.hex('#a60f0f')
const RISK = chalk.bgRed.bold

const isProd = process.env.NODE_ENV === 'production' ? 'info' : 'debug'


const colorizeMessage = format(info => {
    switch (info.level) {
        case 'RISK':
            info.message = RISK('‼', info.message);
            break;
        case 'error':
            info.message = ERROR.bold(info.message);
            break;
        case 'warn':
            info.message = chalk.yellow('⚠️ ', info.message);
            break;
        case 'success':
            info.message = chalk.green('✓', info.message);
            break;
        case 'debug':
            info.message = PURPLE(info.message);;
            break;

        default:
            info.message = CYAN(info.message);
    }
    return info;
});

const customLevels = {
    levels: {
        RISK: 0,
        error: 1,
        warn: 2,
        success: 3,
        info: 4,
        debug: 5,
    },
    colors: {
        RISK: 'red bold',
        error: 'red',
        warn: 'yellow',
        success: 'green',
        info: 'cyan',
        debug: 'magenta',
    }
};

addColors(customLevels.colors);

function colorMetaInline(meta = {}) {
    if (!meta || typeof meta !== 'object') return '';

    return '{ ' + Object.entries(meta)
        .map(([key, value]) => {
            const coloredKey = chalk.hex('#FFA500')(key); // orange-ish
            let coloredVal;

            switch (typeof value) {
                case 'string':
                    coloredVal = chalk.green(`"${value}"`);
                    break;
                case 'number':
                    coloredVal = chalk.yellow(value);
                    break;
                case 'boolean':
                    coloredVal = chalk.magenta(value);
                    break;
                case 'object':
                    coloredVal = value === null
                        ? chalk.gray('null')
                        : chalk.cyan(JSON.stringify(value));
                    break;
                default:
                    coloredVal = chalk.white(String(value));
            }

            return `${coloredKey}: ${coloredVal}`;
        })
        .join(' ') + ' }';
}


const baseLogger = createLogger({
    levels: customLevels.levels,
    level: isProd ? 'debug' : 'debug',

    format: format.combine(

        colorizeMessage(),
        format.colorize({ all: false, level: true }), // only color the level
        format.errors({ stack: true }),

        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message, stack, source, ...meta }) => {
            // format source if present
            const src = source ? colorSource(source) + ' ' : '';
            let msg = `[${WHITE(timestamp)}] ${src}[${level}]: ${message}`;



            if (Object.keys(meta).length) {
                msg += ` ${colorMetaInline(meta)}`;
            }

            return msg;
        })
    ),
    transports: [
        new transports.Console(),
        ...(false
            ? [
                new transports.File({
                    dirname: path.join(__dirname, 'logs'),
                    filename: 'server.log',
                    maxsize: 5 * 1024 * 1024,
                    maxFiles: 5,
                }),
            ]
            : []),
    ],
});


function createSeparator(label = '', { width = 100, char = '─', space = true } = {}) {
    const labelStr = space ? ` [ ${label} ] ` : `[${label}]`;
    const totalPadding = Math.max(0, width - labelStr.length);
    const side = char.repeat(Math.floor(totalPadding / 2));
    const remainder = totalPadding % 2 ? char : '';
    return `${side}${labelStr}${side}${remainder}`;
}



baseLogger.addSeparator = function (label = '', options = {}) {
    console.log(createSeparator(label, options));
};

// Add `.addSource()` method that returns a scoped child logger
baseLogger.addSource = function (source, ini) {
    return this.child({ source }, ini);
};



baseLogger.start = function (processName = 'Process') {
    console.log('\n' + createSeparator(`Start ${processName}`) + '\n');
};

baseLogger.end = function (processName = 'Process') {
    console.log('\n' + createSeparator(`End ${processName}`) + '\n\n');
};

function colorSource({ file, method = "", params = [] } = {}) {
    params = params.map(item => RED(item)).join(', ');
    return `${YELLOW('@' + file)}:${BLUE(method)}${ORANGE('(' + RED(params) + ')')}`;
};



module.exports = baseLogger;
