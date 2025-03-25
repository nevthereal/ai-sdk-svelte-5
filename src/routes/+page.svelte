<script>
	import { Chat } from '@ai-sdk/svelte';
	import { marked } from 'marked';

	const chat = new Chat();
</script>

<main class="rounded-2xl border-2 border-gray-400 p-8">
	<ul class="mb-4 h-[50dvh] overflow-y-auto rounded-lg border-2 border-gray-400 p-4">
		{#each chat.messages as message}
			<li class="flex flex-col gap-2">
				<span>{message.role}:</span>
				<span class="prose">{@html marked(message.content)}</span>
			</li>
		{/each}
	</ul>
	<form onsubmit={chat.handleSubmit} class="flex gap-4">
		<input class="flex-grow rounded-lg p-2 ring-2 ring-gray-400" bind:value={chat.input} />
		{#if chat.status === 'streaming'}
			<button class="rounded-lg bg-amber-300 px-4 py-2 font-bold" onclick={chat.stop}>Stop</button>
		{:else}
			<button class="rounded-lg bg-sky-300 px-4 py-2 font-bold" type="submit">Send</button>
		{/if}
	</form>
</main>
