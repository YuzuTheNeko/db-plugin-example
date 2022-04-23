"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fns = [
    {
        name: '$setVar',
        description: "sets an variable value",
        fields: [
            {
                name: 'table',
                description: 'the table',
                type: 'STRING',
                required: true
            },
            {
                name: 'variable',
                description: 'the variable',
                type: 'STRING',
                required: true,
            },
            {
                name: 'value',
                description: 'the value for the variable',
                type: 'STRING',
                required: true
            },
            {
                name: 'id',
                description: 'id to use for the variable',
                type: 'STRING',
                required: true
            }
        ],
        brackets: true,
        execute: async function (fn) {
            return this.manage(await fn.resolveArray(this), async ([table, variable, value, id]) => {
                const db = this.bot.options.db;
                await db.set(table, `${variable}_${id}`, value);
                return this.ok();
            });
        }
    },
    {
        name: '$getVar',
        description: 'gets a variable value',
        fields: [
            {
                name: 'table',
                description: 'the table',
                type: 'STRING',
                required: true
            },
            {
                name: 'variable',
                description: 'the variable value',
                type: 'STRING',
                required: true,
            },
            {
                name: 'id',
                description: 'id to use for the variable',
                type: 'STRING',
                required: true
            }
        ],
        nullable: true,
        brackets: true,
        returns: 'STRING',
        execute: async function (fn) {
            return this.manage(await fn.resolveArray(this), async ([table, variable, id]) => {
                const db = this.bot.options.db;
                const got = await db.get(table, `${variable}_${id}`);
                return this.ok(got ? got.value : "");
            });
        }
    }
];
exports.default = fns;
