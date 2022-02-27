<script>
  import html2canvas from 'html2canvas';
  import {
    fly,
    slide
  } from 'svelte/transition'
  import {
    tick
  } from "svelte";
  import logo from './assets/logo.svg'

  let is_editing = false;

  let title = 'Figma Thumbnail Generator ✨'
  let description = 'Welcome to Figma Thumbnail Generator.'
  let color = '#1B4332'
  
  async function capture() {
    await tick();

    html2canvas(document.querySelector('#capture'), {
      width: 1240,
      height: 640,
      backgroundColor: color
    }).then(function (canvas) {
      let image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')

      const download_button = document.querySelector('#save');
      download_button.setAttribute('href', image)
      download_button.setAttribute('download', `${title.split(" ").join("-")}.png`)
    });
  }

  capture()
</script>

<div
  class="p-10 fixed top-0 right-0 flex flex-col items-center justify-center lg:hidden bg-primary w-full h-screen z-50">
  <h2 class="font-bold text-2xl text-secondary">Oops, this website is not available in mobile view.</h2>
  <p class="mt-4 text-sm text-secondary/80">Well, if you want to enable it in mobile, check out my repository and help
    me 🙈</p>
</div>

<nav class="hidden lg:block w-full h-[80px] bg-white px-4">
  <div class="flex items-center justify-end container mx-auto bg-white w-full h-full">
    <img src={logo} class="mr-auto" alt="Figpeek logo">

    <div class="flex flex-row gap-4">
      <button class="button text-primary bg-secondary button-secondary" on:click={()=> {
        is_editing = !is_editing
        }}>Edit</button>
      <a id="save" href="#a" class="bg-primary text-secondary button button-primary" on:click={capture}>Save Image</a>
    </div>
  </div>
</nav>

{#if is_editing}
  <div transition:slide class="p-4 py-7 hidden lg:flex flex-col gap-4 px-4 bg-secondary w-full h-auto">

    <div class="container mx-auto grid grid-cols-3">
      <div class="py-5 flex flex-col gap-5">
          <div class="flex flex-row gap-4 items-center">
          <label class="label" for="color">Background Color</label>
          <input type="color" id="color" bind:value={color} on:change={capture}>
        </div>
        
        <div class="flex flex-col gap-2">
          <label class="label" for="title">Project Title</label>
          <span class="text-xs text-primary/80">Try to use emoji for more fanciness</span>
          <input placeholder="Write your project name here" maxlength="40" class="w-[300px] border rounded-md py-2 px-4 text-sm" type="text" id="title" bind:value={title} on:change={capture}>
        </div>
        
        <div class="flex flex-col gap-2">
          <label class="label" for="description">Project Description</label>
          <textarea placeholder="Write your project description here." maxlength="50" class="w-[300px] border rounded-md py-2 px-4 text-sm" id="description" bind:value={(description)} on:change={capture}></textarea>
          
        </div>
      </div>
      
    </div>
    
  </div>
{/if}


<div class="hidden w-full bg-white lg:flex items-center justify-center pointer-events-none select-none pb-10 pt-10 px-4">
  <div id="capture" class="rounded-xl overflow-hidden px-[100px] flex flex-col gap-4 items-start justify-center container mx-auto w-full max-w-[1300px] h-[640px] transform text-white" style:background-color={color}>
    <h2 class="wrap block font-bold text-7xl whitespace-normal text-left ml-24 w-[700px] leading-[90px]" on:change={capture}>{title || 'Figma Thumbnail Generator ✨'}</h2>
    <p class="wrap block mt-7 text-4xl whitespace-normal w-full text-left ml-24 leading-[60px]">{description || 'Welcome to Figma Thumbnail Generator'}</p>
  </div>
</div>

<footer class="flex items-center justify-end container mx-auto px-4 py-5">
  <div class="mr-auto h-auto">
    <form action="https://www.paypal.com/donate" method="post" target="_top" class="flex items-center">
      <input type="hidden" name="business" value="4U9NYK8C7JGGG" />
      <input type="hidden" name="no_recurring" value="0" />
      <input type="hidden" name="currency_code" value="PHP" />
      <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
      <img alt="" src="https://www.paypal.com/en_PH/i/scr/pixel.gif" width="1" height="1" />
    </form>
  </div>

  <p class="text-sm">Created by <b class="text-primary"><a href="https://heychrono.me" target="_blank" rel="noopenner noreferrer">Justin Pascual</a></b>. Licensed under the MIT License.</p>
</footer>

<style>
  .label {
    @apply text-sm text-primary font-semibold;
  }

  .button {
    @apply px-8 py-3 rounded-md w-fit text-sm font-semibold tracking-wide transform transition duration-[200ms] shadow-none;
  }

  .button-primary:hover {
    @apply bg-primary-hover;
  }

  .button-secondary:hover {
    @apply bg-secondary-hover;
  }

   .button:active {
    @apply scale-95;
  }

  .wrap {
    word-wrap: break-word
  }

  input, textarea {
    @apply border-0;
  }
  textarea {
    resize: none;
  }
</style>