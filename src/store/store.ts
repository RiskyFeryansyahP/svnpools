import { writable, Writable } from 'svelte/store'

export const poolStore = writable([
    {
        id: 1,
        question: 'Golang or NodeJS',
        answerA: 'Golang',
        answerB: 'NodeJS',
        votesA: 9,
        votesB: 15,
    }
])