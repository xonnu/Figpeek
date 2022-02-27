<script>
  import html2canvas from 'html2canvas';
  import {EmojiButton} from '@joeattardi/emoji-button';
  import * as animateScroll from "svelte-scrollto";
  import {slide} from 'svelte/transition'
  import {tick} from "svelte";
  import logo from './assets/logo.svg'

  let is_editing = false;

  // default values
  let emoji_icon = '🍃';
  let title = 'Figma Thumbnail Generator'
  let description = 'Welcome to Figma Thumbnail Generator.'
  let color = '#1B4332'
  let text_color = '#ffffff'

  function toggleEmoji() {
    const picker = new EmojiButton();
    picker.on('emoji', selection => {
      emoji_icon = selection.emoji;
    });

    picker.togglePicker(document.querySelector('#emoji-button'))
  }

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

<!-- disabled mobile view -->
<div class="p-10 fixed top-0 right-0 flex flex-col items-center justify-center lg:hidden bg-primary w-full h-screen z-50">
  <h2 class="font-bold text-2xl text-secondary">Oops, this website is not available in mobile view.</h2>
  <p class="mt-4 text-sm text-secondary/80">Sorry to say that this generator is not available in mobile at the moment. 😟</p>
</div>

<!-- navigation bar -->
<nav class="hidden lg:block w-full h-[80px] bg-white backdrop-filter backdrop-blur-lg bg-opacity-70 px-4 fixed top-0 left-0 z-40">
  <div class="flex items-center justify-between container mx-auto w-full h-full transition-all">
    <img src={logo} class="" alt="Figpeek logo">

    <div class="flex flex-row gap-4 items-center">
      <button class="mr-4 text-primary font-medium hover:underline hover:underline-offset-4 hover:decoration-secondary hover:decoration-2" on:click={() => animateScroll.scrollTo({element: '#usage', duration: 1000})}>How to use Figpeek?</button>

      <button class="button text-primary bg-secondary button-secondary" on:click={()=> {
        is_editing = !is_editing;
        if(is_editing) animateScroll.scrollTo({element: '#edit', duration: 1000})
        }}>{ !is_editing ? 'Edit ' : 'Close'}</button>
      <a id="save" href="#a" class="bg-primary text-white button button-primary" on:click={capture}>Save Image</a>
    </div>
  </div>
</nav>

<div class="mt-[80px]"></div>

{#if is_editing}
  <div transition:slide class="p-4 py-7 hidden lg:flex flex-col px-4 bg-secondary w-full h-auto"  id="edit">
    <div class="container mx-auto">
      <h2 class="py-2 text-primary font-bold text-2xl">Customize Thumbnail</h2>
    </div>

    <div class="container mx-auto grid grid-cols-3">
      <!-- col 1 -->
      <div class="py-5 flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label class="label" for="emoji_icon">Emoji Icon</label>
          
          <div class="flex flex-row items-center">
            <input id="emoji_icon" maxlength="1" class="bg-transparent outline-none pointer-events-none w-[50px] border rounded-md text-2xl" type="text" on:change={capture} bind:value={emoji_icon}>
            <button id="emoji-button" class="button bg-primary text-white button-primary" on:click={toggleEmoji}>Pick an Emoji</button>
          </div>
        </div>
        
        <div class="flex flex-col gap-2">
          <label class="label" for="title">Project Title</label>          
          <input placeholder="Write your project name here" maxlength="40" class="w-[300px] border rounded-md py-2 px-4 text-sm" type="text" id="title" bind:value={title} on:change={capture}>
          <span class="text-xs text-primary/80">{title.length}/40</span>
        </div>
        
        <div class="flex flex-col gap-2">
          <label class="label" for="description">Project Description</label>
          <textarea placeholder="Write your project description here." maxlength="50" class="w-[300px] border rounded-md py-2 px-4 text-sm" id="description" bind:value={(description)} on:change={capture}></textarea>
          <span class="text-xs text-primary/80">{description.length}/50</span>
        </div>
      </div>
      
      <!-- col 2 -->
      <div class="py-5 flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label class="label" for="color">Background Color</label>
          <input type="color" id="color" bind:value={color} on:change={capture} class="w-[300px]">
        </div>
        
        <div class="flex flex-col gap-2">
           <label class="label" for="color">Text Color</label>
           <input type="color" id="color" bind:value={text_color} on:change={capture} class="w-[300px]">
        </div>
      </div>

      <div class="py-5 flex flex-col gap-5 w-full h-auto">
        <h2 class=" text-primary font-bold text-2xl">Welcome to Figpeek! 🎉</h2>
        <p class="text-sm text-primary/80 font-medium">Organize your Figma projects by using Figpeek thumbnail generator. it's FREE!</p>
        <img src="assets/examples.png" class="w-full h-auto" alt="">
      </div>
    </div>

  </div>
{/if}

<!-- thumbnail output -->
<div class="hidden w-full bg-white lg:flex items-center justify-center pointer-events-none select-none pb-10 pt-10 px-4">
  <div id="capture" class="rounded-xl overflow-hidden px-[100px] flex flex-col gap-4 items-start justify-center container mx-auto w-full max-w-[1240px] h-[640px] transform text-white" style:background-color={color}>
    <span class="text-7xl block text-left w-[700px] ml-[80px] mb-4" on:change={capture}>{emoji_icon}</span>
    <h2 class="wrap block font-bold text-7xl whitespace-normal text-left ml-24 w-[700px] leading-[90px]" on:change={capture} style:color={text_color}> {title || 'Figma Thumbnail Generator'}</h2>
    <p class="wrap block text-4xl whitespace-normal w-full text-left ml-24 mb-20 leading-[60px] mt-5" style:color={text_color}>{description || 'Welcome to Figma Thumbnail Generator'}</p>
  </div>
</div>

<!-- usage -->
<div id="usage">

</div>

<!-- footer -->
<footer class="flex items-center justify-between container mx-auto px-4 py-5">
  <div class="h-auto">
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