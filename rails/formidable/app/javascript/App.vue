<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <form v-on:submit.prevent="onSubmit">
              <question
                :answerTypeList="answerTypes"
                :obj="q"
                :key="q.id"
                :position="questions.indexOf(q)"
                :canDelete="questions.length > 1"
                @updateQuestion="onUpdateQuestion"
                @addQuestion="onAddQuestion"
                @deleteQuestion="onDeleteQuestion"
                @moveQuestionToTop="onMoveQuestionToTop"
                @moveQuestionUp="onMoveQuestionUp"
                @moveQuestionDown="onMoveQuestionDown"
                @moveQuestionToBottom="onMoveQuestionToBottom"
                v-for="q in questions"
              >
              </question>
              <div class="my-2">
                <v-btn color="primary" type="submit">Submit</v-btn>
              </div>
            </form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Question from 'Question.vue'
  const axios = require('axios').default

  export default {
    components: {
      Question
    },
    props: {

    },
    data: () => ({
      questions: [
        { id: 0, label: 'foo bar', answerType: 1, answerChoices: [] },
      ],
      maxQuestionId: 0,
      drawer: null,
      answerTypes: [
        { value: 0, text: 'Text' },
        { value: 1, text: 'Single choice' },
        { value: 2, text: 'Multiple choices' }
      ]
    }),
    computed: {
    },
    methods: {
      onSubmit(form) {
        console.log(this.questions)
        axios.post('/questions', { questions: this.questions })
          .then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      },
      onAddQuestion(position) {
        this.maxQuestionId = this.maxQuestionId + 1
        var atIndex = position + 1
        var q = { id: this.maxQuestionId, label: 'foo bar', answerType: 1, answerChoices: [] }
        this.questions.splice(atIndex, 0, q)
      },
      onDeleteQuestion(position) {
        if (this.questions.length > 1) {
          this.questions.splice(position, 1)
        }
      },
      onMoveQuestionToTop(position) {
        var element = this.questions[position]
        this.questions.splice(position, 1)
        this.questions.splice(0, 0, element)
      },
      onMoveQuestionUp(position) {
        if (this.questions.length > 1 && position > 0) {
          var element = this.questions[position]
          this.questions[position] = this.questions[position - 1]
          this.questions[position - 1] = element
          // We just need to do it
          this.$forceUpdate()
        }

      },
      onMoveQuestionDown(position) {
        if (this.questions.length > 1 && position != this.questions.length - 1) {
          var element = this.questions[position]
          this.questions[position] = this.questions[position + 1]
          this.questions[position + 1] = element
          // We just need to do it
          this.$forceUpdate()
        }
      },
      onMoveQuestionToBottom(position) {
        var element = this.questions[position]
        this.questions.splice(position, 1)
        this.questions.push(element)
      },
      onUpdateQuestion(position, q) {
        var element = this.questions[position]
        element.label = q.label
        element.answerType = q.answerType
        element.answerChoices = []
        for(var i = 0; i < q.answerChoices.length; i++) {
          var newChoice = {
            text: q.answerChoices[i].text,
            value: q.answerChoices[i].value
          }
          element.answerChoices.push(newChoice)
        }
      }
    }
  }
</script>
