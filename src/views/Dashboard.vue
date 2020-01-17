<template>
  <div class="dashboard">
    <btn class="create-btn" variant="primary" @click="onCreateCmdClick"
      >Create Command</btn
    >
    <h1>Commands</h1>
    <div class="commands">
      <div class="command" v-for="command of commands" :key="command._id">
        <h3 class="name">{{ command.name }}</h3>
        <div class="buttons">
          <btn @click="onModifyCmdClick(command)" variant="primary">Modify</btn>
          <btn @click="onDeleteCmdClick(command)" variant="danger">Delete</btn>
        </div>
      </div>
    </div>

    <popup
      id="createCmdPopup"
      :open="showCreatePopup"
      @close="onCreateChoiceClick(false)"
    >
      <h3>Creating New Command</h3>
      <hr />
      <div class="form" @keyup.enter="onCreateChoiceClick(true)">
        <div class="group">
          <span class="label">Name</span>
          <input
            class="input"
            v-model="selectedCommand.name"
            placeholder="The name of the command"
          />
        </div>

        <div class="group">
          <span class="label">Chat Command</span>
          <input
            class="input"
            v-model="selectedCommand.cmd"
            placeholder="The command in the chat"
          />
        </div>

        <div class="group">
          <span class="label">Command Type</span>
          <select class="input" v-model="selectedCommand.commandType">
            <template v-for="(val, name) in COMMAND_TYPE">
              <option v-if="isNaN(name)" :key="val" :value="val">{{
                name
              }}</option>
            </template>
          </select>
        </div>

        <div class="group">
          <span class="label">Content</span>
          <textarea
            class="input"
            v-model="selectedCommand.content"
            placeholder="The content of the command"
            @keyup.enter.stop
          ></textarea>
        </div>

        <div class="group">
          <span class="label">Reply Type</span>
          <select class="input" v-model="selectedCommand.replyType">
            <template v-for="(val, name) in REPLY_TYPE">
              <option v-if="isNaN(name)" :key="val" :value="val">{{
                name
              }}</option>
            </template>
          </select>
        </div>
      </div>

      <div class="buttons">
        <btn
          @click="onCreateChoiceClick(true)"
          class="btn"
          variant="primary"
          :busy="busyCreating"
          >SAVE</btn
        >
        <btn @click="onCreateChoiceClick(false)" class="btn">CANCEL</btn>
      </div>
    </popup>

    <popup
      id="modifyCmdPopup"
      :open="showModifyPopup"
      @close="onModifyChoiceClick(false)"
    >
      <h3>Editing "{{ selectedCommand.name }}"</h3>
      <hr />
      <div class="form" @keyup.enter="onModifyChoiceClick(true)">
        <div class="group">
          <span class="label">Name</span>
          <input
            class="input"
            v-model="selectedCommand.name"
            placeholder="The name of the command"
          />
        </div>

        <div class="group">
          <span class="label">Chat Command</span>
          <input
            class="input"
            v-model="selectedCommand.cmd"
            placeholder="The command in the chat"
          />
        </div>

        <div class="group">
          <span class="label">Command Type</span>
          <select class="input" v-model="selectedCommand.commandType">
            <template v-for="(val, name) in COMMAND_TYPE">
              <option v-if="isNaN(name)" :key="val" :value="val">{{
                name
              }}</option>
            </template>
          </select>
        </div>

        <div class="group">
          <span class="label">Content</span>
          <textarea
            class="input"
            v-model="selectedCommand.content"
            placeholder="The content of the command"
            @keyup.enter.stop
          ></textarea>
        </div>

        <div class="group">
          <span class="label">Reply Type</span>
          <select class="input" v-model="selectedCommand.replyType">
            <template v-for="(val, name) in REPLY_TYPE">
              <option v-if="isNaN(name)" :key="val" :value="val">{{
                name
              }}</option>
            </template>
          </select>
        </div>
      </div>

      <div class="buttons">
        <btn
          @click="onModifyChoiceClick(true)"
          class="btn"
          variant="primary"
          :busy="busyModifing"
          >SAVE</btn
        >
        <btn @click="onModifyChoiceClick(false)" class="btn">CANCEL</btn>
      </div>
    </popup>

    <popup
      id="deleteCmdPopup"
      :open="showDeletePopup"
      size="small"
      :backgroundCloses="false"
    >
      <h3>Are you sure you want to delete "{{ selectedCommand.name }}"?</h3>
      <hr />
      <div class="buttons">
        <btn
          @click="onDeleteChoiceClick(true)"
          class="btn"
          variant="danger"
          :busy="busyDeleting"
          >YES</btn
        >
        <btn @click="onDeleteChoiceClick(false)" class="btn">NO</btn>
      </div>
    </popup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Popup from "../components/popup.vue";

import CommandService from "../services/CommandService";
import ICommand from "../types/ICommand";
import CommandType from "../types/CommandType";
import ReplyType from "../types/ReplyType";

@Component({
  components: {
    Popup
  }
})
export default class Dashboard extends Vue {
  COMMAND_TYPE = CommandType;
  REPLY_TYPE = ReplyType;

  commands: ICommand[] = [];
  selectedCommand: ICommand | object = {};
  showCreatePopup = false;
  busyCreating = false;
  showDeletePopup = false;
  busyDeleting = false;
  showModifyPopup = false;
  busyModifing = false;

  // Event Handlers

  onCreateCmdClick() {
    this.selectedCommand = {
      name: "",
      cmd: "",
      commandType: 0,
      content: "",
      replyType: 0
    };
    this.showCreatePopup = true;
  }

  onModifyCmdClick(cmd: ICommand) {
    this.selectedCommand = Object.assign({}, cmd);
    this.showModifyPopup = true;
  }

  onDeleteCmdClick(cmd: ICommand) {
    this.selectedCommand = Object.assign({}, cmd);
    this.showDeletePopup = true;
  }

  onCreateChoiceClick(choseSave: boolean) {
    if (choseSave) {
      this.busyCreating = true;
      this.doCreateCmd(this.selectedCommand as ICommand).finally(() => {
        this.busyCreating = false;
        this.showCreatePopup = false;
      });
    } else {
      this.showCreatePopup = false;
    }
  }

  onModifyChoiceClick(choseSave: boolean) {
    if (choseSave) {
      this.busyModifing = true;
      this.doSaveCmd(this.selectedCommand as ICommand).finally(() => {
        this.busyModifing = false;
        this.showModifyPopup = false;
      });
    } else {
      this.showModifyPopup = false;
    }
  }

  onDeleteChoiceClick(choseDelete: boolean) {
    if (choseDelete) {
      this.busyDeleting = true;
      this.doDeleteCmd(this.selectedCommand as ICommand).finally(() => {
        this.busyDeleting = false;
        this.showDeletePopup = false;
      });
    } else {
      this.showDeletePopup = false;
    }
  }

  // Services interaction

  fetchCmds() {
    CommandService.listCommands().then(resp => {
      if (resp.success) {
        this.commands = resp.data;
      } else {
        // console.log("Error fetching list of commands", resp.error);
      }
    });
  }

  doCreateCmd(cmd: ICommand) {
    return CommandService.createCommand(cmd).then(resp => {
      if (resp.success) {
        this.commands.push(resp.data);
      } else {
        // console.log("Error deleting", resp.error);
      }
    });
  }

  doSaveCmd(cmd: ICommand) {
    return CommandService.saveCommand(cmd).then(resp => {
      if (resp.success) {
        const index = this.commands.findIndex(
          command => command._id === cmd._id
        );
        this.$set(this.commands, index, resp.data);
      } else {
        // console.log("Error saving", resp.error);
      }
    });
  }

  doDeleteCmd(cmd: ICommand) {
    return CommandService.deleteCommand(cmd._id).then(resp => {
      if (resp.success) {
        const index = this.commands.findIndex(
          command => command._id === cmd._id
        );
        this.commands.splice(index, 1);
      } else {
        // console.log("Error deleting", resp.error);
      }
    });
  }

  // Lifecycle hooks

  mounted() {
    this.fetchCmds();
  }
}
</script>

<style scoped>
.dashboard {
  padding: 2.4rem 1.2rem 1.2rem 1.2rem;
}

h1 {
  margin-top: 0;
  font-size: 3.6rem;
}

.create-btn {
  float: right;
}

.commands {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
#createCmdPopup .buttons,
#modifyCmdPopup .buttons,
#deleteCmdPopup .buttons {
  display: flex;
  justify-content: center;
  margin-top: 1.2rem;
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
  color: #efefef;
  margin-bottom: 2px;
}

.popup .group .input {
  margin-bottom: 1.2rem;
  width: 100%;
  padding: 0.6rem;
  border-radius: 0;
  border: 0;
  background: #111;
  border-bottom: 1px solid #aaa;
  color: #efefef;

  appearance: none;
  box-sizing: border-box;
}

.popup .group input.input,
.popup .group textarea.input {
  font-family: inherit;
  font-size: 100%;
}
</style>
