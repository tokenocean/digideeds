<script context="module">
  export async function load({ fetch }) {
    const props = await fetch(`/artworks/recent.json`).then((r) => r.json());

    return {
      props,
    };
  }
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  import { query } from "$lib/api";
  import { Summary } from "$comp";
  import { fade } from "svelte/transition";
  import { user } from "$lib/store";
  import { Activity, RecentActivityCard, LatestPiecesCard } from "$comp";
  import { err } from "$lib/utils";
  import branding from "$lib/branding";
  import { prefetch } from "$app/navigation";
  import { browser } from "$app/env";

  onMount(() => browser && prefetch("/market"));

  export let featured;
  export let recent;
  export let latest;

  let current = 0;
  $: artwork = featured && featured[current] && featured[current].artwork;

  let interval = setInterval(() => {
    if (!featured) return;
    current++;
    if (current >= featured.length) current = 0;
  }, 6000);

  onDestroy(() => clearInterval(interval));
</script>

<div
  class="bg-[#003049] pb-20 md:pb-[128px] flex header-container mx-auto justify-center"
>
  <div class="header text-center">
    <h1 class="text-center md:w-full text-[#EAE2B7]">
      <span class=" text-[#F77F00]">{branding.projectName}</span>
      <br />real estate
    </h1>
    <h5 class="md:max-w-lg mx-auto text-left md:text-center text-white">
      List your property as an NFT, buy a property with bitcoin.
    </h5>
    <div class="block md:flex justify-center mx-auto">
      <a class="primary-btn mb-6 mb:0 mx-0 md:mx-2" href={`/a/create`}>List</a>
      <a class="primary-btn mx-0 md:mx-2" href={`/market`}>Buy</a>
    </div>
  </div>
</div>

<div class="flex justify-center flex-wrap">
  <div
    class="max-w-lg bg-white rounded-lg border border-gray-200 shadow-md m-6"
  >
    <img
      class="w-full rounded-t-lg h-80 object-cover"
      src="/houses.jpg"
      alt="houses"
    />

    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        What is a DigiDeed?
      </h5>

      <p class="mb-3 font-normal text-gray-700">
        Owning a digital deed means minting and holding an <a
          href="https://wikiless.org/wiki/Non-fungible_token"
          target="_blank"
          rel="noreferrer"
          class="text-[#FCBF49] font-bold">NFT</a
        >
        for a property. You can then list your property for sale on the
        {branding.projectName} marketplace and choose to sell it if you find a suitable
        buyer. {branding.projectName} leverages
        <a
          href="https://bitcoin.org"
          target="_blank"
          rel="noreferrer"
          class="text-[#FCBF49] font-bold">bitcoin</a
        >
        and the
        <a
          href="https://blockstream.com/liquid/"
          target="_blank"
          rel="noreferrer"
          class="text-[#FCBF49] font-bold">Liquid Network</a
        > to mint and facilitate sales of properties between buyers and sellers.
      </p>
      <a
        href="/market"
        class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-black bg-[#FCBF49] rounded-lg hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300"
      >
        Explore properties
        <svg
          class="ml-2 -mr-1 w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          /></svg
        >
      </a>
    </div>
  </div>
  <div
    class="max-w-lg bg-white rounded-lg border border-gray-200 shadow-md m-6"
  >
    <img
      class="w-full rounded-t-lg h-80 object-cover"
      src="/bitcoin.jpg"
      alt="bitcoin"
    />

    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        Why should I sell my property for bitcoin?
      </h5>

      <p class="mb-3 font-normal text-gray-700">
        While you could sell your property for a fiat currency like USD or CAD,
        you would then want to immediately invest the money to combat inflation.
        By selling your property for bitcoin you can hold this digital asset and
        watch your wealth grow over time. While there is always downside risk to
        investments, bitcoin is proving itself to be a reliable store of value.
      </p>
      <a
        href="https://www.fidelitydigitalassets.com/bin-public/060_www_fidelity_com/documents/FDAS/bitcoin-first.pdf"
        target="_blank"
        rel="noreferrer"
        class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-black bg-[#FCBF49] rounded-lg hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300"
      >
        Read more
        <svg
          class="ml-2 -mr-1 w-4 h-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          ><path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          /></svg
        >
      </a>
    </div>
  </div>
</div>

{#if artwork}
  <div class="flex secondary-header marg-bottom">
    <div
      class="container flex mx-auto flex-col justify-end md:justify-center secondary-header-text m-10 pl-6 z-10"
    >
      <div class="blur-bg">
        <h2>{artwork.artist.username}</h2>
        <p>
          {artwork.title}
          <a href="/a/{artwork.slug}">
            <button
              class="button-transparent header-button border mt-10"
              style="border-color: white; color: white"
            >
              View Property</button
            ></a
          >
        </p>
      </div>
    </div>

    {#if artwork.filetype.includes("video")}
      <video
        in:fade
        out:fade
        class="lazy cover absolute secondary-header"
        autoplay
        muted
        playsinline
        loop
        src={`/api/public/${artwork.filename}.${
          artwork.filetype.split("/")[1]
        }`}
        :key={featured[current].id}
      />
    {:else}
      <img
        in:fade
        out:fade
        class="lazy cover absolute secondary-header"
        alt={artwork.title}
        src={`/api/public/${artwork.filename}.${
          artwork.filetype.split("/")[1]
        }`}
      />
    {/if}
  </div>
{/if}

<div class="bg-[#003049] py-[128px]">
  <div class="container mx-auto px-10">
    <h3 class="text-white">Latest Properties</h3>
  </div>
  <div class="container mx-auto flex pb-1 overflow-x-auto">
    {#each latest as transaction}
      <LatestPiecesCard {transaction} />
    {/each}
  </div>
  <div class="container more">
    <a class="secondary-btn" href={"/market"}>View listings</a>
  </div>
</div>

<style>
  .header {
    width: 90%;
    margin-top: 128px;
  }

  .header .primary-btn {
    width: 240px;
  }

  .header h5 {
    font-size: 22px;
    line-height: 36px;

    margin-top: 24px;
    margin-bottom: 34px;
  }

  .secondary-header {
    height: 600px !important;
    width: 100%;
    object-fit: cover;
  }

  .blur-bg {
    display: flex;
    padding: 60px;
    flex-direction: column;
    background: rgba(54, 58, 74, 0.45);
    backdrop-filter: blur(30px);
    box-shadow: 2px 2px 4px 0 rgb(0 0 0 / 10%);
    border-radius: 8px;
    color: white;
    width: 50%;
    width: fit-content;
  }

  .blur-bg h2 {
    color: white !important;
  }

  .blur-bg p {
    color: white !important;
    margin-top: 20px;
  }

  .container.more {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-top: 36px;
  }

  .more .secondary-btn {
    width: 180px;
  }

  .header-button {
    width: 200px;
    border: 1px solid;
    border-radius: 30px;
    padding: 0.7rem 1.5rem !important;
  }

  h3 {
    margin-bottom: 36px;
  }

  .marg-bottom {
    margin-bottom: 128px !important;
  }

  @media only screen and (max-width: 768px) {
    .header-container.marg-bottom {
      margin-bottom: 96px !important;
    }

    .header {
      margin-top: 64px;
    }

    h3 {
      margin-bottom: 32px;
    }

    .header h5 {
      margin-top: 24px;
      margin-bottom: 24px;
    }

    .header .primary-btn {
      width: 100%;
    }

    .secondary-header {
      height: 400px !important;
    }

    .container.more {
      margin-top: 48px;
    }

    .marg-bottom {
      margin-bottom: 96px !important;
    }

    .blur-bg {
      padding: 24px;
      width: 75%;
      width: fit-content;
    }
  }
</style>
