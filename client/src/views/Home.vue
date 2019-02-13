<template>
  <div class="home">
    <div class="list-unstyled"  v-for="message in messages" :key="message._id">
      <li class="media">
        <img :src="message.imageURL" class="mr-3" :alt="message.subject">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{message.username}}</h4>
          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          {{message.message}}
          <br/>
          <small>{{message.created}}</small>
        </div>
      </li>
    </div>
    <hr/>
  </div>
</template>

<script>
const API_URL = "http://localhost:8081/messages";
export default {
  name: "home",
  data(){
    return {
      messages : []
    }
  },
  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        this.messages = result
      });
  }
};
</script>

<style lang="scss" scoped>
hr {
     border-top: 1px solid #8eaa59;
}
</style>
