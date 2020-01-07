<template>
  <div class="dashboard">
    <h1>Commands</h1>
    <div class="commands">
      <div class="command" v-for="command of commands" :key="command.id">
        <h3 class="name">{{ command.name }}</h3>
        <div class="buttons">
          <a @click="onModifyCmdClick(command)" class="btn">Modify</a>
          <a @click="onDeleteCmdClick(command)" class="btn">Delete</a>
        </div>
      </div>
    </div>

    <popup
      id="modifyCmdPopup"
      :open="showModifyPopup"
      @close="showModifyPopup = false"
      size="small"
    >
      <h3>Editing {{ selectedCommand.name}}</h3>
      <hr />
      <div class="form">
        <div class="group">
          <span class="label">Name</span>
          <input class="input" v-model="selectedCommand.name" placeholder="The name of the command" />
        </div>

        <div class="group">
          <span class="label">Command Type</span>
          <select class="input" v-model="selectedCommand.commandType">
            <template v-for="(val, name) in COMMAND_TYPE">
              <option v-if="isNaN(name)" :key="val" :value="val">{{name}}</option>
            </template>
          </select>
        </div>

        <div class="group">
          <span class="label">Content</span>
          <textarea
            class="input"
            v-model="selectedCommand.content"
            placeholder="The content of the command"
          ></textarea>
        </div>

        <div class="group">
          <span class="label">Reply Type</span>
          <select class="input" v-model="selectedCommand.replyType">
            <template v-for="(val, name) in REPLY_TYPE">
              <option v-if="isNaN(name)" :key="val" :value="val">{{name}}</option>
            </template>
          </select>
        </div>
      </div>

      <div class="buttons">
        <a @click="onModifyChoiceClick(true)" class="btn">SAVE</a>
        <a @click="onModifyChoiceClick(false)" class="btn">CANCEL</a>
      </div>
    </popup>

    <popup
      id="deleteCmdPopup"
      :open="showDeletePopup"
      @close="showDeletePopup = false"
      size="small"
      :backgroundCloses="false"
    >
      <h3>Are you sure you want to delete {{ selectedCommand.name}}?</h3>
      <hr />
      <div class="buttons">
        <a @click="onDeleteChoiceClick(true)" class="btn">YES</a>
        <a @click="onDeleteChoiceClick(false)" class="btn">NO</a>
      </div>
    </popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Popup from "../components/popup.vue";

import ICommand from "../types/ICommand";
import CommandType from "../types/CommandType";
import ReplyType from "../types/ReplyType";

@Component({
  components: {
    Popup
  }
})
export default class Dashboard extends Vue {
  commands: ICommand[] = [
    {
      id: "123",
      name: "AAA",
      commandType: CommandType.RANDOM_CHOICE,
      content: "AAA\nAAAAA\nAAAAAAAAAAA\na",
      replyType: ReplyType.NORMAL
    },
    {
      id: "456",
      name: "Twitch Prime",
      commandType: CommandType.NORMAL,
      content: "Did you know about Twitch Prime? ...",
      replyType: ReplyType.NORMAL
    }
  ];
  COMMAND_TYPE = CommandType;
  REPLY_TYPE = ReplyType;

  selectedCommand: ICommand | object = {};
  showDeletePopup = false;
  showModifyPopup = false;

  onModifyCmdClick(cmd: ICommand) {
    this.selectedCommand = Object.assign({}, cmd);
    this.showModifyPopup = true;
  }

  onDeleteCmdClick(cmd: ICommand) {
    this.selectedCommand = Object.assign({}, cmd);
    this.showDeletePopup = true;
  }

  onDeleteChoiceClick(choseDelete: boolean) {
    if (choseDelete) {
      this.doDeleteCmd(this.selectedCommand as ICommand);
    }

    this.showDeletePopup = false;
  }

  onModifyChoiceClick(choseSave: boolean) {
    if (choseSave) {
      this.doSaveCmd(this.selectedCommand as ICommand);
    }

    this.showModifyPopup = false;
  }

  doSaveCmd(cmd: ICommand) {
    console.log("saving cmd", cmd.id);
  }

  doDeleteCmd(cmd: ICommand) {
    console.log("deleting cmd", cmd.id);
  }
}
</script>

<style scoped>
.dashboard {
  padding: 2.4rem 1.2rem 1.2rem 1.2rem;
}

h1 {
  margin: 0;
  font-size: 3.6rem;
}

.commands {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 1rem;
}

.command {
  background: #0f4c75;
  padding: 1.2rem;
  padding-top: 2.4rem;
}

.command h3 {
  margin: 0;
  border: 0;
  text-align: center;
  font-size: 1.5rem;
}

.command .buttons,
#deleteCmdPopup .buttons,
#modifyCmdPopup .buttons {
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
}

.btn {
  display: inline-block;
  border-radius: 0;
  background: #efefef;
  color: black;
  padding: 0.6rem 1.2rem;
  cursor: pointer;

  margin: 0 0.6rem;
}

.btn:hover {
  background: #afafaf;
}

.popup h3 {
  text-align: center;
}

.popup .form {
  width: 75%;
  margin: 0 auto;
  padding: 1.2rem 0;
}

.popup .group {
  display: block;
}

.popup .group .label {
  display: block;
  text-transform: uppercase;
  font-size: 0.6rem;
  color: #333;
}

.popup .group .input {
  margin-bottom: 1.2rem;
  width: 100%;
  padding: 0.6rem;
  border-radius: 0;
  border: 0;
  border-bottom: 1px solid #aaa;

  appearance: none;
  box-sizing: border-box;
}

.popup .group input.input,
.popup .group textarea.input {
  font-family: inherit;
  font-size: 100%;
}
</style>
