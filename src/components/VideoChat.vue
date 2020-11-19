<template>
  <v-row>
    <v-col cols="12" sm="8">
      <span min-height="70vh" rounded="lg">
        <iframe
          src="https://player.twitch.tv/?channel=filhosergio&parent=localhost"
          frameborder="0"
          allowfullscreen="true"
          scrolling="no"
          height="440"
          width="100%"
        ></iframe>
      </span>
    </v-col>

    <v-col cols="12" sm="4">
      <span rounded="lg" min-height="268">
        <iframe
          id="chat_embed"
          src="https://www.twitch.tv/embed/filhosergio/chat?parent=localhost&darkpopout"
          height="440"
          width="100%"
          darkmode
          frameborder="0"
        >
        </iframe>
      </span>
    </v-col>
  </v-row>
</template>
