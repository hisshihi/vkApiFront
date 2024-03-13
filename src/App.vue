<template>
  <div class="wrapper">
    <div class="container">
      <!--      Input form-->
      <div class="form-user" style="margin-top: 50px; text-align: center" v-if="userData.length === 0">
        <form
            text-align="center"
            id="form"
            method="post"
        >
          ID:&nbsp;<input
            type="text"
            name="id"
            placeholder="id пользователя"
            v-model="id"
        />
          <br/>
          <br/>
          <input
              class="button-controller"
              id="button"
              type="submit"
          />

          <label tabindex="0" for="button" class="button" @click.prevent="testResuetMethod"> Начать </label>
          <div id="warn" style="display: block">
            <br/>
            <br/>
            <div v-if="loading">
              Подождите немного пока данные загружаются!
              <br/>Это может занять несколько минут
            </div>
          </div>
        </form>
      </div>
      <br/>
      <!-- <form method="post" action="app?action=history">
        <div><button type="submit" class="btn_type2">История</button></div>
      </form> -->

      <template v-if="userData.length !== 0">
        <div class="row">
          <h1>Информация о человеке</h1>
        </div>

        <table>
          <tr>
            <td class="field">ID: {{ userData.userId }}</td>
            <td id="id"></td>
          </tr>
          <tr>
            <td class="field">Имя: {{ userData.first_name }} {{ userData.last_name }}</td>
            <td></td>
          </tr>
          <tr>
            <td class="field">Город: {{ cityTitle ? cityTitle : "Не указано" }}</td>
            <td></td>
          </tr>
          <tr>
            <td class="field">Работа: {{ occupation ? occupation : "Не указано" }}</td>
            <td></td>
          </tr>
          <tr>
            <td class="field">Университет: {{ userData.university_name ? userData.university_name : "Не указано" }}</td>
            <td></td>
          </tr>
          <tr>
            <td class="field">Школа: {{ school ? school : "Не указано" }}</td>
            <td></td>
          </tr>
          <tr v-if="userData._closed == false">
            <td class="field">Тип профиля: Открытый</td>
            <td></td>
          </tr>
          <tr v-if="userData._closed == true">
            <td class="field">Тип профиля: Закрытый</td>
            <td></td>
          </tr>
        </table>

        <div id="button">
          <input class="button-controller" id="button" type="checkbox"/>

          <a href="app?action=update" tabindex="0" for="button" class="button">
            Обновить
          </a>
        </div>

        <ul id="menu">
          <li>
            <div @click="showGroups = !showGroups">Группы {{ userGroups.length }}</div>
            <ul v-if="showGroups">
              <li v-for="group in userGroups" :key="group.id">
                  <a href="" target="_blank">{{ group.name }}</a>
              </li>
            </ul>
          </li>

          <li>
            <div @click="showFriends = !showFriends">Друзья {{ userFriend.length }}</div>
            <ul v-if="showFriends">
              <li v-for="friend in userFriend" :key="friend.id"><a
                  :href="'https://vk.com/id' + friend.friendId" target="_blank">{{ friend.firstName }} {{ friend.lastName }}</a></li>
            </ul>
          </li>

          <li style="display: block">
            <div style="display: block"><a href="#">Совпадения</a></div>
            <div v-for="friend in userFriend" :key="friend.id">
              <div v-if="friend"></div>
            </div>
          </li>
        </ul>
      </template>
    </div>
    <div v-for="friend in userFriend" :key="friend.id">
      <!-- Совпадение друзей по городам -->
      <!-- <div v-if="friend.city">
       <div v-if="userData.city.title === friend.city">{{ friend.firstName }} {{ friend.lastName }} - {{ friend.city }}</div>
      </div> -->
      <!-- end -->
      <!-- Совпадение друзей по учёбе -->
      <!-- <div v-if="friend.schools">
        <div v-for="friendSchool in friend.schools">
            <div v-if="school === friendSchool">
              {{ friend.firstName }} {{ friend.lastName }} - {{ school }}
            </div>
        </div>
      </div>
      <div v-if="userData.university_name === friend.education">
        {{ friend.firstName }} {{ friend.lastName }} - {{ friend.education }}
      </div> -->
      <!-- end -->
      
    </div>
  </div>
</template>

<script>
import axios from "axios";
import InputComponent from "@/components/InputComponent.vue";

export default {
  components: {
    InputComponent,
  },
  // Переменные
  data() {
    return {
      id: null,
      userData: [],
      userFriend: [],
      userGroups: [],
      cities: [],
      loading: false,
      error: false,
      errorLoading: false,
      cityTitle: null,
      occupation: null,
      school: null,
      profile: null,
      showFriends: false,
      showGroups: false,
      count: 0,
    };
  },
  // Методы приложения
  methods: {
    testResuetMethod() {
      this.loading = true;
      axios
          .post("http://localhost:8080/user", {
            id: this.id,
          })
          .then((response) => {
            if (response.data == "OK") {
              this.getUserDataFromBackend(this.id)
            }
          })
          .catch((error) => console.log(error));
    },
    getUserDataFromBackend(id) {
      axios
          .get("http://localhost:8080/user/" + id)
          .then((response) => {
            this.loading = false;
            this.id = null
            this.userData = response.data.user;
            this.userFriend = response.data.friends;
            // console.log(this.userFriend)
            this.userGroups = response.data.groups;
            // console.log(this.userData)
            this.cityTitle = this.userData.city.title
            this.occupation = this.userData.occupation.name
            this.school = this.userData.schools.name
            for (let i = 0; i <= this.userFriend.length; i++) {

              if (this.userFriend[i].occupation !== null) {
                this.count++;
              }
              console.log(this.count)
            }
          })
          .catch((error) => console.log(error));
    },

  },

};
</script>

<style>

@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css");

.button {
  color: #fff;
  cursor: pointer;
  padding: 1rem 3rem;
  user-select: none;
  position: relative;
  border-radius: 4px;
  background-color: #25365e;
}

.button:hover {
  background-color: #313c57;
}

.button:active,
.button:focus {
  background-color: #313c57;
}

.button::before {
  left: 0;
  z-index: 2;
  opacity: 0;
  width: 100%;
  visibility: hidden;
  text-align: center;
  position: absolute;
  content: "\f110";
  transition: opacity 1s;
  font-family: FontAwesome;
  animation: loading-animation 1s linear;
  animation-iteration-count: infinite;
  animation-delay: 1s;
}

.button::after {
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  content: "";
  width: 100%;
  height: 100%;
  visibility: hidden;
  position: absolute;
  transition: opacity 0.5s;
  border-radius: 4px;
  background-color: #25365e;
}

.button-controller {
  display: none;
}

.button-controller:checked ~ .button::before,
.button-controller:checked ~ .button::after {
  opacity: 1;
  visibility: visible;
}

@-moz-keyframes loading-animation {
  0% {
    opacity: 1;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: rotate(359deg);
  }
}

@-webkit-keyframes loading-animation {
  0% {
    opacity: 1;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: rotate(359deg);
  }
}

@-o-keyframes loading-animation {
  0% {
    opacity: 1;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: rotate(359deg);
  }
}

@keyframes loading-animation {
  0% {
    opacity: 1;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: rotate(359deg);
  }
}

.btn_type2 {
  color: #fff;
  cursor: pointer;
  padding: 0.4rem 2rem;
  user-select: none;
  position: relative;
  border-radius: 4px;
  border: 2px solid #313c57;
  background-color: #25365e;
}

.btn_type2:hover,
.btn_type2:active,
.btn_type2:focus {
  background-color: #313c57;
}

.save-btn {
  margin: 1rem 2rem;
}

body {
  color: #fff;
  display: flex;
  justify-content: center;
  background-color: #172135;
  font-family: sans-serif;
}

*, ::after, ::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  width: 1200px;
  margin: 0 auto;
  align-content: center;
}

h1 {
  text-align: center;
  border-radius: 6px;
  font-size: 24px; /**/
  line-height: 48px;
  background: #25365e;
}

table,
td {
  border-bottom: 2px solid #313c57;
  border-collapse: collapse;
}

tr {
  line-height: 32px;
}

table {
  width: 100%;
}

.field {
  width: 25%;
}

.button {
  text-decoration: none;
}

#button {
  margin: 32px 0px;
}

ul {
  padding-inline-start: 0;
}

#menu {
  list-style-type: none;
  background: #25365e;
  display: flex;
}

#menu > li {
  margin: 0;
  width: 100%;
  position: relative;
  line-height: 32px;
  border: 1px solid #313c57;
}

#menu a {
  height: 25px;
  color: #fff;
  text-decoration: none;
  text-shadow: 0 1px 0 #000;
}

/*all categories text color when hover*/
#menu li:hover > a {
  color: #999;
}

* html #menu li a:hover /* IE6 */
{
  color: #313c57;
}

#menu li:hover > ul {
  display: block;
}

/* Sub-menu (second categories)*/
#menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: none;
  position: absolute;
  top: calc(32px + 1px); /*#menu>li line-height:32px + 1px - border*/
  left: 0;
  width: 100%;
}

#menu ul > li {
  overflow: auto;
  float: none;
  margin: 0;
  padding: 0;
  display: block;
}

.sub2:nth-child(odd),
.sub3:nth-child(odd) {
  background: #25365e;
}

.sub2:nth-child(even),
.sub3:nth-child(even) {
  background: #313c57;
}

#menu ul a {
  padding: 10px;
  height: auto;
  line-height: 1;
  display: block;
}

#menu ul ul {
  width: 100%;
  top: 0;
  left: -100%;
}

/* .wrapper {
  color: #fff;
  display: flex;
  justify-content: center;
  background-color: #172135;
  font-family: sans-serif;
} */


// Стили для формы
.form-user {
  margin-top: 50px;
}

input[type="number"] {
  background-color: #313c57;
  color: white;
}

@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css");
.button {
  color: #fff;
  cursor: pointer;
  padding: 1rem 3rem;
  user-select: none;
  position: relative;
  border-radius: 4px;
  background-color: #25365e;
}

.button:hover,
.button:active,
.button:focus {
  background-color: #313c57;
}

.button::before {
  left: 0;
  z-index: 2;
  opacity: 0;
  width: 100%;
  visibility: hidden;
  text-align: center;
  position: absolute;
  content: "\f110";
  transition: opacity 1s;
  font-family: FontAwesome;
  animation: loading-animation 1s linear;
  animation-iteration-count: infinite;
  animation-delay: 1s;
}

.button::after {
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  content: "";
  width: 100%;
  height: 100%;
  visibility: hidden;
  position: absolute;
  transition: opacity 0.5s;
  border-radius: 4px;
  background-color: #25365e;
}

.button-controller {
  display: none;
}

.button-controller:checked ~ .button::before,
.button-controller:checked ~ .button::after {
  opacity: 1;
  visibility: visible;
}

@-moz-keyframes loading-animation {
  0% {
    opacity: 1;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: rotate(359deg);
  }
}

@-webkit-keyframes loading-animation {
  0% {
    opacity: 1;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: rotate(359deg);
  }
}

@-o-keyframes loading-animation {
  0% {
    opacity: 1;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: rotate(359deg);
  }
}

@keyframes loading-animation {
  0% {
    opacity: 1;
    transform: rotate(0deg);
  }
  50% {
    opacity: 0.1;
  }
  80% {
    opacity: 1;
  }
  100% {
    transform: rotate(359deg);
  }
}

.btn_type2 {
  color: #fff;
  cursor: pointer;
  padding: 0.4rem 2rem;
  user-select: none;
  position: relative;
  border-radius: 4px;
  border: 2px solid #313c57;
  background-color: #25365e;
}

.btn_type2:hover,
.btn_type2:active,
.btn_type2:focus {
  background-color: #313c57;
}
</style>
