<script>
  import html2canvas from 'html2canvas';
  import {EmojiButton} from '@joeattardi/emoji-button';
  
  import * as animateScroll from "svelte-scrollto";
  import {slide} from 'svelte/transition'
  
  import logo from './assets/logo.svg'
  
  let is_editing = false;

  // default values
  let emoji_icon = '🍃';
  let title = 'Figma Thumbnail Generator'
  let description = 'Welcome to Figma Thumbnail Generator.'
  let color = '#1B4332'
  let text_color = '#ffffff'

  let href_image = null;
  let download_filename = null

  function toggleEmoji() {
    const picker = new EmojiButton({
      position: 'right-end'
    }); 

    picker.on('emoji', selection => {
      emoji_icon = selection.emoji;
    });

    picker.togglePicker(document.querySelector('#emoji-button'))
  }
 
  function liveCapture() {
    // removing rounded when saving the thumbnail image.
    const capture = document.querySelector('#capture');
    capture.classList.remove('rounded-xl')
    
    html2canvas(document.querySelector('#capture'), {
      width: 1240,
      height: 640
    }).then(function (canvas) {
      const image = canvas.toDataURL('image/png')
      href_image = image
      download_filename = `${(title.length == 0 ? "Figma-Thumbnail-Generator" : title).split(" ").join("-")}.png`;
      capture.classList.add('rounded-xl')
    });
  }

  // change color option when not Windows
  let is_OS_windows = (navigator.platform.indexOf('Win') != -1) ? true : false;

</script>

<!-- disabled mobile view -->
<div class="p-10 fixed top-0 right-0 flex flex-col items-center justify-center lg:hidden bg-primary w-full h-screen z-50">
  <h2 class="font-bold text-2xl text-secondary">Oops, this website is not available in mobile view.</h2>
  <p class="mt-4 text-sm text-secondary/80">Sorry to say that this generator is not available in mobile at the moment. 😟</p>
</div>

<!-- navigation bar -->
<nav class="hidden lg:flex w-full h-[80px] bg-white backdrop-filter backdrop-blur-lg bg-opacity-70 px-4 fixed top-0 left-0 z-40">
  <div class="flex items-center justify-between container mx-auto w-full h-full transition-all">
    <img src={logo} class="" alt="Figpeek logo">

    <div class="flex flex-row gap-4 items-center">
      <button class="mr-4 text-primary font-medium hover:underline hover:underline-offset-4 hover:decoration-secondary hover:decoration-2" on:click={() => animateScroll.scrollTo({element: '#usage', duration: 1000})}>How to use Figpeek?</button>

      <button class="button text-primary bg-secondary button-secondary" on:click={()=> {
        is_editing = !is_editing;
        if(is_editing) animateScroll.scrollTo({element: '#edit', duration: 1000})
        }}>{ !is_editing ? 'Edit ' : 'Close'}</button>
      <a id="save" href={href_image} download={download_filename} class="bg-primary text-white button button-primary" on:mouseenter={liveCapture} on:click={liveCapture}>Save Image</a>
    </div>
  </div>
</nav>

<div class="mt-[80px]"></div>

{#if is_editing}
  <div transition:slide class="p-4 py-7 hidden lg:flex flex-col px-4 bg-secondary w-full h-auto"  id="edit">
    <div class="container mx-auto xl:px-24">
      <h2 class="py-2 text-primary font-bold text-2xl">Customize Thumbnail</h2>
    </div>

    <div class="container mx-auto grid grid-cols-3 xl:px-24">
      <!-- col 1 -->
      <div class="py-5 flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label class="label" for="emoji_icon">Emoji Icon</label>
          
          <div class="flex flex-row items-center">
            <input id="emoji_icon" maxlength="1" class="bg-transparent outline-none pointer-events-none w-[50px] border rounded-md text-2xl" type="text" on:change={liveCapture} bind:value={emoji_icon}>
            <button id="emoji-button" class="button bg-primary text-white button-primary" on:change={liveCapture} on:click={toggleEmoji}>Pick an Emoji</button>
          </div>
        </div>
        
        <div class="flex flex-col gap-2">
          <label class="label" for="title">Project Title</label>          
          <input placeholder="Write your project name here" maxlength="40" class="w-[300px] border rounded-md py-2 px-4 text-sm" type="text" id="title" bind:value={title} on:change={liveCapture}>
          <span class="text-xs text-primary/80">{title.length}/40</span>
        </div>
        
        <div class="flex flex-col gap-2">
          <label class="label" for="description">Project Description</label>
          <textarea placeholder="Write your project description here." maxlength="50" class="w-[300px] border rounded-md py-2 px-4 text-sm" id="description" bind:value={(description)} on:change={liveCapture}></textarea>
          <span class="text-xs text-primary/80">{description.length}/50</span>
        </div>

        <button class="bg-primary text-white button button-primary" on:click={liveCapture}>Save Changes</button>
        <span class="text-xs text-primary/80 mt-[-10px]">When changes is not reflected in small preview click "Save changes" button.</span>
      </div>
      
      <!-- col 2 -->
      <div class="py-5 flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label class="label" for="color">Background Color</label>
          {#if is_OS_windows}
             <label for="color" class="block w-[30px] h-[30px] rounded-full cursor-pointer  shadow-md transition-colors duration-300" style:background-color={color}></label>
             <input type="color" id="color" bind:value={color} on:change={liveCapture} class="invisible h-0">
          {:else}
             <input type="color" id="color" bind:value={color} on:change={liveCapture}>
          {/if}
        </div>
        
        <div class="flex flex-col gap-2">
           <label class="label" for="text-color">Text Color</label>
           {#if is_OS_windows}
              <label for="text-color" class="block w-[30px] h-[30px] rounded-full cursor-pointer outline-2 shadow-md transition-colors duration-300" style:background-color={text_color}></label>
              <input type="color" id="text-color" bind:value={text_color} on:change={liveCapture} class="invisible h-0">
           {:else}
               <input type="color" id="text-color" bind:value={text_color} on:change={liveCapture}>
           {/if}
        </div>

        <div class="flex flex-col gap-2">
          <label class="label" for="preview">Small Preview</label>
          {#if href_image == null}
             <div class="bg-primary w-[80%] h-[160px] rounded-md"></div>
          {:else}
            <img src={href_image} class="bg-primary w-[80%] h-[160px] rounded-md object-cover" id="preview" alt="thumbnail preview">
          {/if}
        </div>
      </div>

      <div class="py-5 flex flex-col gap-5 w-full h-auto">
        <h2 class=" text-primary font-bold text-xl">Welcome to Figpeek! 🎉</h2>
        <p class="text-sm text-primary/80 font-medium">Organize your <a href="http://figma.com" target="_blank" rel="noopener noreferrer">Figma</a> projects and GitHub Repositories by using Figpeek thumbnail generator. it's FREE!</p>
        <img src="assets/examples.png" class="w-full h-auto" alt="">
      </div>
    </div>

  </div>
{/if}

<!-- thumbnail output -->
<div class="hidden w-full bg-white lg:flex items-center justify-center pointer-events-none select-none pb-10 pt-10 px-4">
  <div id="capture" class="rounded-xl overflow-hidden px-[100px] flex flex-col gap-4 items-start justify-center container mx-auto w-full max-w-[1240px] h-[640px] transform text-white drop-shadow-md" on:change={liveCapture} style:background-color={color}>
    <span class="text-7xl block text-left w-[700px] ml-[80px] mb-4" on:change={liveCapture}>{emoji_icon}</span>
    <h2 class="wrap block font-bold text-7xl whitespace-normal text-left ml-24 w-[700px] leading-[90px]" on:change={liveCapture} style:color={text_color}> {title || 'Figma Thumbnail Generator'}</h2>
    <p class="wrap block text-4xl whitespace-normal text-left ml-24 mb-20 leading-[60px] w-[800px] mt-5" on:change={liveCapture} style:color={text_color}>{description || 'Welcome to Figma Thumbnail Generator'}</p>
  </div>
</div>

<!-- about -->
<div id="usage"class="container mx-auto bg-white w-full h-auto py-20 flex items-center justify-center flex-col rounded-2xl">
  <img src={logo} class="mb-7 w-[200px] h-auto" alt="Figpeek logo">
  <p class="text-primary/60 text-xl tracking-wide max-w-[900px] block text-center leading-[35px]">Figpeek is a Figma and GitHub thumbnail generator. With Figpeek you can create and experiment your thumbnail with ease, save it, then use it in your projects.</p>
</div>

<!-- usage -->
<div>

</div>

<!-- footer -->
<footer class="flex items-center justify-center container mx-auto px-4 py-5 pb-10">
  <div class="flex flex-col gap-2 w-full items-center justify-center">
    <p class="text-sm text-primary/60 font-medium">Created by <b class="text-primary"><a href="https://heychrono.me" target="_blank" rel="noopenner noreferrer">Justin Pascual 🧪</a></b> Licensed under the MIT License.</p>
    <p class="text-xs text-primary/50">Hey there, did you like it? follow me for more design stuffs</p>
    <div class="flex flex-row gap-3 items-center">
      <a href="https://twitter.com/heeeychrono" target="_blank" rel="noopener noreferrer"><img src="assets/icons/icons8-twitter-24.png" class="w-6 h-6 transition opacity-40 hover:opacity-100" alt="Twitter logo icon"></a>
      <a href="https://github.com/heychrono" target="_blank" rel="noopener noreferrer"><img src="assets/icons/icons8-github-24.png" class="w-6 h-6 transition opacity-40 hover:opacity-100" alt="GitHub logo icon"></a>
    </div>
  </div>
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

  .disable-button {
    @apply opacity-50 pointer-events-none;
  }

</style>