import { a } from '../src/a'

describe('validate:', () => {
    /**
     * myFirstFunc
     */
    describe('myFirstFunc', () => {
        test('return hello rollup', () => {
            expect(a(' rollup')).toEqual('hello rollup')
            expect(a(' rollup')).not.toEqual('hello rollup1')
        })
    })
})
