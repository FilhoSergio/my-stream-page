<template>
  <v-app id="inspire">
    <v-app-bar
      app
      :class="{ night_mode_bg: night, white_mode_tool_bar: !night }"
      flat
    >
      <v-toolbar-title class="c-white">
        My stream Page
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-icon class="c-white" :dark="true"> mdi-brightness-5 </v-icon>
      <v-switch
        v-model="night"
        label=""
        color="indigo"
        value="primary"
        hide-details
      ></v-switch>
      <v-icon class="c-white" :dark="true"> mdi-brightness-2 </v-icon>

      <v-avatar
        style="margin-left:15px;"
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      >
        <img src="@/assets/images/profile.png" alt="profile_chanel" />
      </v-avatar>
    </v-app-bar>
    <div class=" lighten-3 background-header" style="max-height:208px; ">
      <v-img
        style="height: 100%"
        src="https://cdn.streamelements.com/uploads/3774e27a-6743-4758-865b-b5eeda3ac1ce.gif"
      >
      </v-img>
    </div>
    <v-avatar
      style="z-index:4; position: absolute;top: 40;left: 0;"
      class="hidden-sm-and-down"
      color="grey darken-1 shrink"
      size="150"
    >
      <img src="@/assets/images/profile.png" alt="profile_chanel" />
    </v-avatar>

    <v-main
      :class="{ night_mode_bg: night, 'gray lighten-3': !night }"
      style=" z-index:1"
    >
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <h2
              :class="{ 'c-white': night, 'c-black': !night }"
              style="margin-left: 5px;"
            >
              twitch.tv/{{ user_infos.display_name }}
            </h2>
          </v-col>

          <v-col cols="12" sm="8">
            <v-tabs :centered="true" background-color="transparent">
              <v-tab> Social </v-tab>
              <v-tab> Clipes </v-tab
              ><v-tab>
                Configurações
              </v-tab>
              <v-tab-item
                :class="{ night_mode_bg: night, 'gray lighten-3': !night }"
              >
                <VideoChat> </VideoChat>
              </v-tab-item>
              <v-tab-item>
                <v-row
                  v-if="!slug"
                  :class="{ night_mode_bg: night, 'gray lighten-3': !night }"
                >
                  <v-col
                    v-for="n in clips_list.clips"
                    :key="n.title"
                    class="d-flex child-flex"
                    cols="4"
                  >
                    <div>
                      <v-img
                        :src="n.thumbnails.medium"
                        aspect-ratio="1"
                        class="grey lighten-2 elevation-2 pointer"
                      >
                        <template v-slot:placeholder>
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                      <br />
                      <span
                        class=" text-center "
                        :class="{ 'c-white': night, 'c-black': !night }"
                      >
                        <a @click="GetClipBySlug(n.slug)"> {{ n.title }} </a>
                      </span>
                    </div>
                  </v-col>
                </v-row>

                <v-row v-if="slug" :class="{ night_mode_bg: night, 'gray lighten-3': !night }">
                  <a style="float: right !important;" @click="TurnBackToAllClips()">
                    Voltar para todos os clips >
                  </a>
                  <iframe
                    :src="
                      `https://clips.twitch.tv/embed?clip=${slug}&parent=localhost`
                    "
                    height="440"
                    width="100%"
                    frameborder="0"
                    scrolling="os"
                    allowfullscreen="true"
                  >
                  </iframe>
                </v-row>
               
              </v-tab-item>
              <v-tab-item>
                {{ chanel_infos }}
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>

        <v-card-text style="height: 80px; position: relative">
          <v-fab-transition style="margin-bottom: 50px !important;">
            <a href="https://discord.gg/AWN26ct" target="blank">
              <v-btn class="mx-2" color="indigo" dark absolute top right fab>
                <v-icon> mdi-discord </v-icon>
              </v-btn>
            </a>
          </v-fab-transition>
        </v-card-text>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import VideoChat from "@/components/VideoChat.vue";

export default {
  components: {
    VideoChat,
  },

  data: () => ({
    night: false,
    top_games: [],
    title: process.env.VUE_APP_TITLE,
    id: process.env.VUE_APP_Client_ID,
    user_infos: {},
    chanel_infos: {},
    clips_list: [],
    slug: null,
    profile_image: "src/assets/images/profile.png",
  }),
  async created() {
    const res = await axios.get(
      "https://api.twitch.tv/helix/games/top?first=16",
      {
        headers: {
          Authorization: "Bearer hpr6j1ngbfa68dfir6q374siiih884",
          "Client-ID": process.env.VUE_APP_Client_ID,
        },
      }
    );
    this.top_games = res;
    const user = await axios.get(
      "https://api.twitch.tv/kraken/users?login=filhosergio",
      {
        headers: {
          "Client-ID": process.env.VUE_APP_Client_ID,
          Accept: "Accept: application/vnd.twitchtv.v5+json",
        },
      }
    );
    this.user_infos = user.data.users[0];

    const chanel_name = await axios.get(
      "https://api.twitch.tv/kraken/channels/516195529",
      {
        headers: {
          "Client-ID": process.env.VUE_APP_Client_ID,
          Accept: "Accept: application/vnd.twitchtv.v5+json",
        },
      }
    );

    this.chanel_infos = chanel_name.data;
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
  computed: {},
  methods: {
    GetClipBySlug(slug) {
      console.log(slug);
      this.slug = slug;
    },

    TurnBackToAllClips() {
      this.slug = null;
    },
  },
};
</script>
<style lang="css" scope>
.background-header {
  width: 100%;
  min-height: 200px;
  max-height: 200px;
  background-image: url("https://cdn.streamelements.com/static/10352.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
  overflow: hidden;
}
.c-white {
  color: #fff;
}

.c-black {
  color: black !important;
}

.white_mode_tool_bar {
  background: #3f51b5 !important;
}
.night_mode_bg {
  background: #020923 !important;
}

.pointer {
  cursor: pointer;
}
</style>
