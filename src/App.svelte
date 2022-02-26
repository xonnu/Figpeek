<script>
  import Router from 'svelte-spa-router'
  import rick from './assets/rick-roll.gif'
  // Routes
  import About from './routes/About.svelte';
  import Contact from './routes/Contact.svelte';
import Home from './routes/Home.svelte';

  let routes =  {
    "/" : Home,
    "/about" : About,
    "/contact" : Contact
  }

</script>

<main class="main">
  
  <img src={rick} class="w-20 mb-10" alt="">
  <h2 class="font-sans text-white text-2xl">Chrono Svelte Template</h2>
  <nav>
    <ul class="flex flex-row gap-4">
      <li><a href="#/">Home</a></li>
      <li><a href="#/about">About</a></li>
      <li><a href="#/contact">Contact</a></li>
    </ul>
  </nav>

  <Router {routes}/>
</main>

<style>
  .main {
    @apply h-screen w-full bg-gray-400 flex flex-col items-center justify-center;
  }
</style>
