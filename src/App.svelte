<script>
  import html2canvas from 'html2canvas';
  import { tick } from "svelte";

  let title = 'Figma Thumbnail Generator ✨'
  let description = 'Welcome to Figma Thumbnail Generator'
  let color = '#000'


  async function capture() {
    await tick();    

    html2canvas(document.querySelector('#capture'), {
      width: 1240,
      height: 640,
      backgroundColor: color
    }).then(function(canvas) {
      let image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')

      const download_button = document.querySelector('#save');
      download_button.setAttribute('href', image)
      download_button.setAttribute('download', 'untitled.png')
    });
  }

  capture()
</script>

<main class="main flex flex-col gap-4">
 
  <div class="flex flex-row gap-4 items-center">
    <label class="text-sm" for="color">Background Color</label>
    <input type="color" id="color" bind:value={color} on:change={capture}>
  </div>

  <div class="flex flex-col gap-2">
    <label class="text-sm" for="title">Project Title</label>
    <input maxlength="40" class="w-[300px] border rounded-md py-2 px-4 text-sm" type="text" id="title" bind:value={title} on:change={capture}>
  </div>

  <div class="flex flex-col gap-2">
    <label class="text-sm" for="description">Project description</label>
    <input maxlength="50" class="w-[300px] border rounded-md py-2 px-4 text-sm" type="text" id="description" bind:value={(description)} on:change={capture}>
  </div>
  
  <a id="save" href="#a" class="bg-black text-white px-8 py-2 rounded-md w-fit text-sm" on:click={capture}>Save</a>
</main>

<div class="w-full bg-white flex items-center justify-center pointer-events-none select-none pb-24 pt-10">
  <div id="capture" class="rounded-xl overflow-hidden px-[100px] flex flex-col gap-4 items-start justify-center w-[1240px] h-[640px] transform text-white" style:background-color={color}>
    <h2 class="block font-bold text-7xl whitespace-normal text-left ml-24 w-[700px] leading-[90px]" on:change={capture}>{title || 'Figma Thumbnail Generator ✨'}</h2>
    <p class="block mt-7 text-4xl whitespace-normal w-full text-left ml-24 leading-[60px]">{description || 'Welcome to Figma Thumbnail Generator'}</p>
  </div>
</div>

<style>
  .main {
    @apply bg-white p-4 w-full h-auto container mx-auto;
  }
</style>
