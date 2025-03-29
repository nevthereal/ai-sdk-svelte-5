<script>
	import { Chat } from '@ai-sdk/svelte';
	import { marked } from 'marked';

	const chat = new Chat();
</script>

<main class="flex h-screen flex-col rounded-2xl p-4">
	<h1
		class="mb-2 bg-gradient-to-bl from-cyan-500 to-purple-500 bg-clip-text text-4xl font-black text-transparent italic"
	>
		NevGPT
	</h1>
	<ul class="mb-4 flex-grow space-y-4 overflow-y-auto rounded-lg border-2 border-gray-400 p-4">
		{#each chat.messages as message}
			<li class="flex flex-col">
				<span class="text-xl font-bold capitalize">{message.role}:</span>
				<span class="prose">{@html marked(message.content)}</span>
			</li>
		{/each}
	</ul>
	<form onsubmit={chat.handleSubmit} class="flex gap-4">
		<input
			placeholder="What are you curious about?"
			class="flex-grow rounded-lg p-2 ring-2 ring-gray-400"
			bind:value={chat.input}
		/>
		{#if chat.status === 'streaming'}
			<button class="rounded-lg bg-rose-300 px-4 py-2 font-mono font-bold" onclick={chat.stop}
				>Stop</button
			>
		{:else}
			<button class="rounded-lg bg-sky-300 px-4 py-2 font-mono font-bold" type="submit">Send</button
			>
		{/if}
	</form>
</main>
