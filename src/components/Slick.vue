<template>
  <div>
    <VueSlickCarousel v-bind="settings">
        <div><h3>1</h3></div>
          <div><h3>1</h3></div>
            <div><h3>1</h3></div>
              <div><h3>1</h3></div>
                <div><h3>1</h3></div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import axios from "axios";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

export default {
  name: "Slick",
  components: { VueSlickCarousel },
  props: [],
  data: () => ({
    settings: {
        "dots": true,
  "focusOnSelect": true,
  "infinite": true,
  "speed": 500,
  "slidesToShow": 3,
  "slidesToScroll": 3,
  "touchThreshold": 5
    },
    clips_list: [],
  }),
  async created() {
    const clips_chanel = await axios.get(
      "https://api.twitch.tv/kraken/clips/top?channel=filhosergio&limit=16&trending=false&period=all",
      {
        headers: {
          "Client-ID": process.env.VUE_APP_Client_ID,
          Accept: "Accept: application/vnd.twitchtv.v5+json",
        },
      }
    );

    this.clips_list = clips_chanel.data;
  },
};
</script>
