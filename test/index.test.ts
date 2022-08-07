// index.test.ts

import { trim } from '../src'

describe('validate:', () => {
    /**
     * myFirstFunc
     */
    describe('myFirstFunc', () => {
        test('return hello rollup', () => {
            expect(trim(' rollup')).toEqual('rollup')
            expect(trim(' rollup')).not.toEqual('rollup1')
        })
    })
})
