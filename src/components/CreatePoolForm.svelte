<script lang="ts">
    // importing
    import { createEventDispatcher } from 'svelte'
    import { poolStore } from '../store/store'
    import Button from '../shared/Button.svelte'

    let fields = {
        question: '',
        answerA: '',
        answerB: '',
    }
    let errors = {
        question: '',
        answerA: '',
        answerB: '',
    }
    let valid = false
    
    const dispatch = createEventDispatcher()

    const validationForm = (): boolean => {
        valid  = true

        if (fields.question.trim().length < 5) {
        errors.question = 'Field question length must greater than 5!'
        valid = false
        } else {
            errors.question = ''
        }

        if (fields.answerA.trim().length < 1) {
            errors.answerA = 'Field AnswerA cant not be empty!'
            valid = false
        } else {
            errors.answerA = ''
        }

        if (fields.answerB.trim().length < 1) {
            errors.answerB = 'Field AnswerB cant not be empty!'
            valid = false
        } else {
            errors.answerB = ''
        }

        return valid
    }

    const handleSubmitPool = () => {
        const valid = validationForm()

        if (valid) {
            console.log(fields)

            const pool = {
                id: Math.random(),
                votesA: 0,
                votesB: 0,
                ...fields,
            }

            // currentPools is pools data in store
            poolStore.update(currentPools => {
                return [...currentPools, pool]
            })

            dispatch('addNewPool')
        }
    }
</script>

<form on:submit|preventDefault={handleSubmitPool}>
    <div class="form-field">
        <label for="question">Pool Question:</label>
        <input type="text" id="question" bind:value={fields.question}>
        <div class="error"> {errors.question} </div>
    </div>
    <div class="form-field">
        <label for="answer-a">Answer A:</label>
        <input type="text" id="answer-a" bind:value={fields.answerA}>
        <div class="error"> {errors.answerA} </div>
    </div>
    <div class="form-field">
        <label for="answer-b">Answer B:</label>
        <input type="text" id="answer-b" bind:value={fields.answerB}>
        <div class="error"> {errors.answerB} </div>
    </div>
    <Button type="secondary" flat={true}>Add Pool</Button>
</form>

<style>
    form {
        width: 400px;
        margin: 0 auto;
        text-align: center;
    }

    .form-field {
        margin: 16px auto; 
    }

    input {
        width: 100%;
        border-radius: 6px;
    }

    label {
        margin: 10px auto;
        text-align: left;
    }

    .error {
        font-weight: bold;
        font-size: 12px;
        color: #d91b42;
    }
</style>