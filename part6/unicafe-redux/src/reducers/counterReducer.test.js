import deepFreeze from 'deep-freeze'
import counterReducer from './counterReducer'

describe('unicafe reducer', () => {
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0
    }

    test('should return a proper initial state when called with undefined state', () => {
        const state = undefined
        const action = {
            type: 'DO_NOTHING'
        }

        const newState = counterReducer(state, action)
        expect(newState).toEqual(initialState)
    })

    test('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0
        })
    })

    test("always return a new state", () => {
        const state = initialState
        deepFreeze(state)

        const goodState = counterReducer(state, {type: "GOOD"})
        const badState = counterReducer(state, {type: "BAD"})
        const okState = counterReducer(state, {type: "OK"})

        expect(goodState).toEqual({
            good: 1,
            ok: 0,
            bad: 0
        })
        expect(badState).toEqual({
            good: 0,
            ok: 0,
            bad: 1
        })
        expect(okState).toEqual({
            good: 0,
            ok: 1,
            bad: 0
        })
    })

})