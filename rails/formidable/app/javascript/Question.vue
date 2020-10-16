<template>
  <v-card
  class="px-10 py-5 mb-10 mx-auto"
  color="white"
  width="80%"
  >

      <v-menu bottom offset-x left>
        <template v-slot:activator="{ on }">
          <v-btn
            absolute
            right
            icon
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="canDelete === true"><v-list-item-title>
            <v-btn
              text
              tile
              block
              color="red"
              @click="$emit('deleteQuestion', position)"
            >
            Delete
            </v-btn>
          </v-list-item-title></v-list-item>
          <v-list-item>
            <v-list-item-title
              @click="$emit('moveQuestionToTop', position)"
            >
              <v-icon>mdi-format-vertical-align-top</v-icon>
              Move to top
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title
              @click="$emit('moveQuestionUp', position)"
            >
              <v-icon>mdi-arrow-up</v-icon>
              Move up
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title
              @click="$emit('moveQuestionDown', position)"
            >
              <v-icon>mdi-arrow-down</v-icon>
              Move down
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title
              @click="$emit('moveQuestionToBottom', position)"
            >
              <v-icon>mdi-format-vertical-align-bottom</v-icon>
              Move to bottom
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    <v-text-field
      label="Type your question"
      v-model="label"
      @change="onChangeQuestion"
      required
    ></v-text-field>

    <v-select
      v-model="answerType"
      :items="answerTypeList"
      label="Type of answer"
      @change="onChangeQuestion"
      solo
    ></v-select>

    <v-card-text class="pa-0">
    Preview:
    </v-card-text>

    <v-text-field
      label="Answer"
      v-if="answerType === 0"
    ></v-text-field>

    <v-container align="center" class="pt-0" v-if="answerType === 1">
      <v-radio-group class="ma-0 pa-0">
        <v-row align="center" v-for="(n, index) in answerChoices" :key="n.value">
          <v-col cols="1" class="pa-0"><v-radio></v-radio></v-col>
          <v-col class="pa-0">
            <v-text-field
              :value="n.text"
              @change="onChangeChoice(index, $event)"
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="1" class="pa-0">
            <v-btn
              right
              icon
              @click="deleteChoice(index)"
            >
              <v-icon>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-radio-group>
    </v-container>

    <v-container align="center" class="pt-0" v-if="answerType === 2">
      <v-row align="center" v-for="(n, index) in answerChoices" :key="n.value">
        <v-col cols="1" class="pa-0">
          <v-checkbox class="ma-0"></v-checkbox>
        </v-col>
        <v-col class="pa-0">
          <v-text-field
            :value="n.text"
            @change="onChangeChoice(index, $event)"
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="1" class="pa-0">
          <v-btn
            right
            icon
            @click="deleteChoice(index)"
          >
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-btn
      color="success"
      class="mr-4"
      @click="addChoice"
      v-if="answerType !== 0"
    >
      Add choice
    </v-btn>

    <v-card-actions>
      <v-btn class="mx-2"
        fab dark small absolute bottom right
        color="green"
        @click="$emit('addQuestion', `${position}`)"
      >
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
  export default {
    props: {
      obj: Object,
      position: Number,
      answerTypeList: Array,
      canDelete: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      return {
        settings: [],
        dialog: false,
        maxAnswerId: 0,
        answerType: this.obj.answerType,
        label: this.obj.label,
        answerChoices: [
          { value: 0, text: 'Type your answer' },
        ]
      }
    },
    computed: {
    },
    methods: {
      addChoice() {
        var answerId = this.maxAnswerId + 1
        this.maxAnswerId = answerId
        this.answerChoices.push(
          { value: answerId, text: 'Type your answer' }
        )
        this.onChangeQuestion()
      },
      deleteChoice(position) {
        if (this.answerChoices.length > 1) {
          this.answerChoices.splice(position, 1)
          this.onChangeQuestion()
        }
      },
      onChangeQuestion() {
        this.$emit('updateQuestion', this.position, this)
      },
      onChangeChoice(choiceIndex, e) {
        this.answerChoices[choiceIndex].text = e
        this.onChangeQuestion()
      }
    }
  }
</script>
