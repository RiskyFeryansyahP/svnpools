export type PoolType = Pool[]

export type Pool = {
    id: number
    question: string
    answerA: string
    answerB: string
    votesA: number
    votesB: number
}