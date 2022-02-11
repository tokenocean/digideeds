<script>
  import { browser } from "$app/env";
  import { err } from "$lib/utils";
  import { query } from "$lib/api";
  import Fa from "svelte-fa";
  import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
  import { page } from "$app/stores";
  import { tick } from "svelte";
  import Select from "svelte-select";
  import { onMount } from "svelte";
  import { ToggleSwitch } from "$comp";

  export let artwork;
  export let title;

  let input, items, loading, timer;

  const debounce = (v) => {
    loading = true;
    artwork.title = v;
    artwork.ticker = "";
    clearTimeout(timer);
    timer = setTimeout(() => {
      title = v;
      loading = false;
    }, 550);
  };

  onMount(() => {
    if (artwork.title) input.value = artwork.title;
    query(`query { tags { tag } }`)
      .then(
        (res) =>
          (items = [...new Set(res.tags.map((t) => t.tag))].map((value) => ({
            value,
            label: value,
          })))
      )
      .catch(err);
  });

  $: focus($page);
  export let focus = (p) => browser && p && tick().then(() => input && input.select());

  $: value = artwork.tags.map(({ tag }) => ({
    value: tag,
    label: tag,
  }));

  let handle = ({ detail }) => {
    artwork.tags = detail.map(({ value: tag }) => ({ tag }));
  };
</script>

<form class="flex flex-col w-full mb-6 mt-20" on:submit autocomplete="off">
  <div class="flex flex-col mb-6">
    <input
      class="border-0 border-b-2"
      style="border-radius: 0 !important"
      placeholder="What's the propery title?"
      on:input={({ target: { value } }) => debounce(value)}
      bind:this={input}
    />
  </div>
  <div class="flex flex-col mb-6">
    <label for="description">Description</label>
    <textarea
      id="description"
      placeholder="How would you describe it?"
      bind:value={artwork.description}
    />
  </div>
  <div class="flex flex-col mb-6">
    <label for="property_address">Property Address</label>
    <input
      id="property_address"
      placeholder="What is the property address?"
      bind:value={artwork.metadata.property_address}
    />
  </div>
  <div class="flex flex-col mb-6">
    <label for="bedroom_number">Number of Bedrooms</label>
    <input
      id="bedroom_number"
      type="number"
      placeholder="How many bedrooms?"
      bind:value={artwork.metadata.bedroom_number}
    />
  </div>
  <div class="flex flex-col mb-6">
    <label for="bathroom_number">Number of Bathrooms</label>
    <input
      id="bathroom_number"
      type="number"
      placeholder="How many bathrooms?"
      bind:value={artwork.metadata.bathroom_number}
    />
  </div>
  <div class="flex flex-col mb-6">
    <h3>Property Summary</h3>
    <hr />
  </div>
  <!-- Maybe not needed since we have the artwork title -->
  <!-- <div class="flex flex-col mb-6">
    <label for="property_title">Property Title</label>
    <input
      id="property_title"
      placeholder="Strata? Leasehold?"
      bind:value={artwork.metadata.property_title}
    />
  </div> -->
  <div class="flex flex-col mb-6">
    <label for="building_type">Building Type</label>
    <input
      id="building_type"
      placeholder="What is building type?"
      bind:value={artwork.metadata.building_type}
    />
  </div>
  <div class="flex flex-col mb-6">
    <label for="annual_taxes">Annual Property Taxes</label>
    <input
      id="annual_taxes"
      type="number"
      placeholder="How much the property taxes are?"
      bind:value={artwork.metadata.annual_taxes}
    />
  </div>
  <div class="flex flex-col mb-6">
    <label for="maintenance_fee">Maintenance Fee</label>
    <input
      type="number"
      placeholder="What's the monthly maintenance fee?"
      bind:value={artwork.metadata.maintenance_fee_monthly}
    />
  </div>
  <div class="flex flex-col mb-4 mr-6">
    <label for="built_at">Built at</label>
    <input
      id="built_at"
      type="date"
      name="date"
      bind:value={artwork.metadata.built_at}
    />
  </div>
  <div class="flex flex-col mb-6">
    <h4>Interior Features</h4>
    <hr />
  </div>
  <div class="flex flex-col mb-6">
    <ToggleSwitch
      id="appliences_included"
      label="Appliences Included"
      checked={artwork.metadata.appliences_included}
      on:change={(e) =>
        (artwork.metadata.appliences_included = e.target.checked)}
    />
  </div>
  <div class="flex flex-col mb-6">
    <ToggleSwitch
      id="window_coverings"
      label="Window Coverings"
      checked={artwork.metadata.window_coverings}
      on:change={(e) =>
        (artwork.metadata.window_coverings = e.target.checked)}
    />
  </div>
  <div class="flex flex-col mb-6">
    <h4>Building Features</h4>
    <hr />
  </div>
  <div class="flex flex-col mb-6">
    <label for="floor_space">Floor Space</label>
    <input
      id="floor_space"
      type="number"
      placeholder="Floor space"
      bind:value={artwork.metadata.floor_space}
    />
  </div>
  <div class="flex flex-col mb-6">
    <label for="fire_protection">Fire Protection</label>
    <input
      id="fire_protection"
      placeholder="Fire protection"
      bind:value={artwork.metadata.fire_protection}
    />
  </div>
  <div class="flex flex-col mb-6">
    <label for="amenities_nearby">Amenities Nearby</label>
    <input
      id="amenities_nearby"
      placeholder="What are the amenities nearby?"
      bind:value={artwork.metadata.amenities_nearby}
    />
  </div>
  {#if !artwork.id}
    <div class="flex flex-col mb-6">
      <div class="mb-0">
        <label for="ticker" class="flex">
          <div class="mr-2">Ticker</div>
          <div class="mt-1 mb-0">
            <span class="tooltip">
              <i class="text-midblue text-xl">
                <Fa icon={faQuestionCircle} />
              </i>
              <span class="tooltip-text bg-gray-100 shadow ml-4 rounded"
                >The ticker is a short 3-5 character identifier for your asset
                that you'll see in other wallets and explorers.</span
              >
            </span>
          </div>
        </label>
      </div>
      <input
        id="ticker"
        class="w-1/2"
        bind:value={artwork.ticker}
        maxlength="5"
      />
    </div>
  {/if}
  <div class="flex flex-col mb-6">
    <label for="tags"
      >Tags
      <span class="text-gray-400">(e.g. Abstract, monochromatic, etc)</span
      ></label
    >
    <Select
      id="tags"
      {items}
      isMulti={true}
      placeholder="Tags"
      on:select={handle}
      {value}
      isCreatable={true}
    />
  </div>
  <div class="flex">
    <button type="submit" class="primary-btn">Submit</button>
  </div>
</form>

<style>
  .tooltip {
    cursor: pointer;
  }
  .tooltip .tooltip-text {
    display: none;
    padding: 15px;
    position: absolute;
    z-index: 100;
    width: 300px;
    font-style: normal;
  }
  .tooltip:hover .tooltip-text {
    display: block;
  }
  input[type="checkbox"]:checked {
    appearance: none;
    border: 5px solid #fff;
    outline: 2px solid #6ed8e0;
    background-color: #6ed8e0;
    padding: 2px;
    border-radius: 0;
  }

  input,
  textarea {
    @apply rounded-lg;
  }
</style>
