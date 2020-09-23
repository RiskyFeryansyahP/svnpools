<script lang="ts">
    export let type: string = 'primary'
    export let flat: boolean = false
    export let inverse: boolean = false
</script>

<button class={type} class:flat={flat} class:inverse={inverse}>
    <slot></slot>
</button>

<style>
    button {
        border: 0;
        cursor: pointer;
        border-radius: 6px;
        padding: 8px 12px;
        font-weight: bold;
        box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    }

    .primary {
        background: #d91b42;
        color: white;
    }

    .secondary {
        background: #45c496;
        color: white;
    }

    .flat {
        box-shadow: none;
    }

    .primary.inverse {
        background: white;
        color: #d91b42;
        border: 2px solid #d91b42;
    }

    .secondary.inverse {
        background: white;
        color: #45c496;
        border: 2px solid #45c496;
    }
</style>