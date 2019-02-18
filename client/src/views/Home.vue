<template>
  <div class="home">
    <!-- form -->
    <button
      @click="ToggleForm = !ToggleForm"
      type="button"
      class="btn btn-outline-warning mt-4"
    >Toggle Message Form</button>
    <form v-if="ToggleForm" @submit.prevent="addMessage" class="mt-3">
      <!-- alert -->
      <div v-if="error" class="alert alert-dismissible alert-warning">
        <button @click="closeError" type="button" class="close" data-dismiss="alert">&times;</button>
        <h4 class="alert-heading">Error!</h4>
        <p class="mb-0">{{error}}</p>
      </div>
      <!-- alert -->
      <div class="form-group">
        <label for="username">UserName</label>
        <input type="text" class="form-control" id="username" required v-model="message.username">
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input
          type="text"
          class="form-control"
          id="subject"
          placeholder="Enter Subject for your message"
          required
          v-model="message.subject"
        >
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea class="form-control" id="Message" rows="3" v-model="message.message"></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Image URL</label>
        <input
          type="url"
          class="form-control"
          id="imageURL"
          placeholder="Enter an Image URL"
          v-model="message.imageURL"
        >
      </div>
      <button type="submit" class="btn btn-outline-success">Add Message</button>
    </form>
    <!-- form -->
    <hr>

    <div class="list-unstyled" v-for="message in  OrderedMessages" :key="message._id">
      <li class="media">
        <img :src="message.imageURL" class="mr-3" :alt="message.subject">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{message.username}}</h4>
          <h5 class="mt-0 mb-1">{{message.subject}}</h5>
          {{message.message}}
          <br>
          <small>{{message.created}}</small>
        </div>
      </li>
      <hr>
    </div>
  </div>
</template>

<script>
const API_URL = "https://fullstack-message-forum.herokuapp.com/messages"

export default {
  name: "home",
  data() {
    return {
      ToggleForm: false,
      error: "",
      messages: [],
      message: {
        username: "Anonymous",
        subject: "",
        message: "",
        imageURL: ""
      }
    };
  },
  mounted() {
    fetch(API_URL)
      .then(response => response.json())
      .then(result => {
        this.messages = result;
      });
  },

  computed: {
    OrderedMessages() {
      if(this.messages == true){ // check if this.messages is empty, it will throw error at slice if its empty
      return this.messages.slice().reverse();
      } else return this.messages // we return this.messages without slice here 
    }
  },

  methods: {
    closeError() {
      this.error = "";
    },
    addMessage() {
      console.log(this.message);
      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(this.message),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(result => {
          if (result.details) {
            //if error
            const error = result.details
              .map(detail => detail.message)
              .join(". ");
            this.error = error;
          } else {
            this.error = "";
            this.ToggleForm = false;
            this.messages.push(result);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  max-width: 600px;
  margin: auto;
}
hr {
  border-top: 1px solid #8eaa59;
}

img {
  max-width: 300px;
  max-height: auto;
}
</style>
