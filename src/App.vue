<template>
  <div class="wrapper">
    <div class="container">
      <!--      Input form-->
      <!-- Данный контейнер отображает форму для поиска пользователя, по условию если массив данных пуст, то отображается форма -->
      <div
        class="form-user"
        style="margin-top: 50px; text-align: center"
        v-if="userData.length === 0"
      >
        <!-- С помощью v-model данные динамически попадают в переменную -->
        <form text-align="center" id="form" method="post">
          ID:&nbsp;<input
            type="text"
            name="id"
            placeholder="id пользователя"
            v-model="id"
          />
          <br />
          <br />
          <input class="button-controller" id="button" type="submit" />

          <!-- @click.prevent="testResuetMethod" событие клика для отправки данных без обновления страницы -->
          <label
            tabindex="0"
            for="button"
            class="button"
            @click.prevent="testResuetMethod"
          >
            Начать
          </label>
          <div id="warn" style="display: block">
            <br />
            <br />
            <!-- Если возникает какая-то ошибка при загрузке данных, то выводится сообщение -->
            <div v-if="loading">
              Подождите немного пока данные загружаются!
              <br />Это может занять несколько минут
            </div>
            <div v-if="errorSearch">
              Ошибка загрузки данных, повторите попытку!
            </div>
          </div>
        </form>
      </div>
      <br />

      <!-- Если длинна массива данных не равна 0 то выводится вся информация о пользователе -->
      <template v-if="userData.length !== 0">
        <div class="row">
          <h1>Информация о человеке</h1>
        </div>
        <!-- Вывод всех основных данных -->
        <table>
          <tr>
            <td class="field">ID: {{ userData.userId }}</td>
            <td id="id"></td>
          </tr>
          <tr>
            <td class="field">
              Имя: {{ userData.first_name }} {{ userData.last_name }}
            </td>
            <td></td>
          </tr>
          <tr>
            <td class="field">
              Город: {{ cityTitle ? cityTitle : "Не указано" }}
            </td>
            <td></td>
          </tr>
          <tr>
            <td class="field">
              Работа: {{ occupation ? occupation : "Не указано" }}
            </td>
            <td></td>
          </tr>
          <tr>
            <!-- Тернарный оператор который обозначает, что если userData.university_name(или подобные данные) не пуст то выводим данные, иначе выводим "Не указано" -->
            <td class="field">
              Университет:
              {{
                userData.university_name
                  ? userData.university_name
                  : "Не указано"
              }}
            </td>
            <td></td>
          </tr>
          <tr>
            <td class="field">Школа: {{ school ? school : "Не указано" }}</td>
            <td></td>
          </tr>
          <!-- Условие по которому будет отображаться информация -->
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
          <input class="button-controller" id="button" type="checkbox" />

          <!-- Кнопка для обновлённого поиска пользователя -->
          <a
            href=""
            @click="newSearchUser"
            tabindex="0"
            for="button"
            class="button"
          >
            Обновить
          </a>
        </div>

        <ul id="menu">
          <li>
            <!-- Отображение всех групп пользователя -->
            <div @click="showGroups = !showGroups">
              Группы {{ userGroups.length }}
            </div>
            <ul v-if="showGroups">
              <!-- С помощью цикла идёт отображение данных из массива -->
              <li v-for="group in userGroups" :key="group.id">
                <div v-if="group.name">
                  <a
                    :href="'https://vk.com/' + group.screenName"
                    target="_blank"
                    >{{ group.name }}</a
                  >
                </div>
                <div v-else>
                  <a :href="'https://vk.com/id' + group.groupId" target="_blank"
                    >{{ group.firstName }} {{ group.lastName }}</a
                  >
                </div>
              </li>
            </ul>
          </li>
          <!-- По клику или наведению будут данные либо отобржааться либо нет -->
          <li>
            <div @click="showFriends = !showFriends">
              Друзья {{ userFriend.length }}
            </div>
            <ul v-if="showFriends">
              <li v-for="friend in userFriend" :key="friend.id">
                <a :href="'https://vk.com/id' + friend.friendId" target="_blank"
                  >{{ friend.firstName }} {{ friend.lastName }}</a
                >
              </li>
            </ul>
          </li>

          <li style="display: block">
            <div @click="coincidences = !coincidences" style="display: block">
              <a href="#">Совпадения</a>
            </div>
            <div v-if="coincidences">
              <!-- Совпадение друзей по городам -->
              <div>
                <p @click="coincidencesCity = !coincidencesCity">По городам</p>
                <!-- Если вывод не равен null то выводим данные циклом -->
                <template v-if="coincidencesCity">
                  <div v-for="friend in userFriend" :key="friend.id">
                    <!-- Совпадение друзей по городам -->
                    <!-- Если данные(в данном случае город) не равен null то выводим данные -->
                    <div v-if="friend.city">
                      <!-- Сравниваем если город пользователя равен городу друга то выводим этот город -->
                      <div v-if="userData.city.title === friend.city">
                        <a
                          :href="'https://vk.com/id' + friend.friendId"
                          target="_blank"
                        >
                          {{ friend.firstName }} {{ friend.lastName }} -
                          {{ friend.city }}
                        </a>
                      </div>
                    </div>
                    <!-- end -->
                  </div>
                </template>
              </div>
              <!-- end -->

              <!-- Совпадение друзей по учёбе -->
              <div v-if="school !== null">
                <p @click="coincidencesSchool = !coincidencesSchool">
                  По учёбе
                </p>
                <template v-if="coincidencesSchool">
                  <div v-for="friend in userFriend" :key="friend.id">
                    <div v-if="friend.schools">
                      <div
                        v-for="friendSchool in friend.schools"
                        :key="friendSchool.id"
                      >
                        <div v-if="school === friendSchool">
                          <a
                            :href="'https://vk.com/id' + friend.friendId"
                            target="_blank"
                          >
                            {{ friend.firstName }} {{ friend.lastName }} -
                            {{ school }}
                          </a>
                        </div>
                      </div>
                    </div>
                    <div v-if="userData.university_name === friend.education">
                      <a
                        :href="'https://vk.com/id' + friend.friendId"
                        target="_blank"
                      >
                        {{ friend.firstName }} {{ friend.lastName }} -{{
                          friend.education
                        }}
                      </a>
                    </div>
                  </div>
                </template>
              </div>

              <!-- Совпадение друзей по работе -->
              <div v-if="occupation !== null">
                <p @click="coincidencesWork = !coincidencesWork">По работе</p>
                <template v-if="coincidencesWork">
                  <div v-for="friend in userFriend" :key="friend.id">
                    <div v-if="friend.occupation">
                      <div v-if="occupation === friend.occupation">
                        <a
                          :href="'https://vk.com/id' + friend.friendId"
                          target="_blank"
                          >{{ friend.firstName }} {{ friend.lastName }} -
                          {{ friend.occupation }}</a
                        >
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <!-- Совпадения по группам -->
              <div v-if="friendGroups !== null">
                <p @click="coincidencesGroups = !coincidencesGroups">
                  По группам
                </p>
                <template v-if="coincidencesGroups">
                  <div v-for="groups in friendGroups" :key="groups.id">
                    <div v-if="groups.firstName !== null">
                      <a
                        :href="'https://vk.com/id' + groups.id"
                        target="_blank"
                      >
                        {{ groups.firstName }} {{ groups.lastName }} -
                        {{ groups.friendFirstName }} {{ groups.lastName }}
                      </a>
                    </div>
                    <div v-else>
                      <a
                        :href="'https://vk.com/' + groups.screenName"
                        target="_blank"
                      >
                        {{ groups.name }} - {{ groups.friendFirstName }}
                        {{ groups.lastName }}
                      </a>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
// Импортируем axios для сообщений между стороной пользователя и сервера
import axios from "axios";

export default {
  // Переменные
  data() {
    return {
      // id пользователя
      id: null,
      // Данные пользователя
      userData: [],
      // Друзья
      userFriend: [],
      // Группы
      userGroups: [],
      // Города
      cities: [],
      // Загрузка
      loading: false,
      // Вывод ошибок
      errorSearch: false,
      errorLoading: false,
      // Заголовок города
      cityTitle: null,
      // Работа
      occupation: null,
      // Школа
      school: null,
      // Профиль
      profile: null,
      // Отображение друзей
      showFriends: false,
      // Отображение групп
      showGroups: false,
      // Переменные для отображения данных по клику
      coincidences: false,
      coincidencesCity: false,
      coincidencesSchool: false,
      coincidencesWork: false,
      // Массив групп друзей
      friendGroups: [],
      // Также переменная для отображения групп
      coincidencesGroups: false,
    };
  },
  // Методы приложения
  methods: {
    // Метод для отправки id пользователя
    testResuetMethod() {
      // Отображаем загрузку
      this.loading = true;
      // Убираем отображение ошибки
      this.errorSearch = false;
      // Метод для отправки данных на нужный url
      axios
        .post("https://vkapiback-production.up.railway.app/user?id=" + this.id)
        // Если всё отлично то отправляем OK и вызываем другой метод и передаём в качестве аргумента id
        .then((response) => {
          if (response.data == "OK") {
            this.getUserDataFromBackend(this.id);
          }
        })
        // Если что-то пошло не так, то отображаем ошибку
        .catch((error) => {
          this.errorSearch = true;
          this.loading = false;
        });
    },
    // Метод для принятия данных со стороны сервера
    getUserDataFromBackend(id) {
      // Отправляем get запрос на поиск пользователя по id
      axios
        .get("https://vkapiback-production.up.railway.app/user/" + id)
        .then((response) => {
          // Убираем индикатор загрузки
          this.loading = false;
          // Устанавливаем id в null чтобы очистить переменную
          this.id = null;
          // Заполняем массивы и переменные из ответа axios
          this.userData = response.data.user;
          this.friendGroups = response.data.friendGroups;
          this.userFriend = response.data.friends;
          this.userGroups = response.data.groups;
          this.cityTitle = this.userData.city.title;
          this.occupation = this.userData.occupation.name;
          this.school = this.userData.schools.name;
        })
        .catch((error) => console.log(error));
    },
    // При поиске нового пользователя очищаем массив данных пользователя
    newSearchUser() {
      this.userData.length = 0;
    },
  },
};
</script>

<style>
/* Импорт шрифта */
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css");

/* Стили для кнопки */
.button {
  color: #fff;
  cursor: pointer;
  padding: 1rem 3rem;
  user-select: none;
  position: relative;
  border-radius: 4px;
  background-color: #25365e;
}

/* Стиль кнопки при наведении */
.button:hover {
  background-color: #313c57;
}

/* Стиль кнопки при нажатии */
.button:active,
.button:focus {
  background-color: #313c57;
}

/* .button::before и .button::after - это псевдоэлементы, которые используются для добавления специальных эффектов к кнопкам. */
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

/* @-moz-keyframes, @-webkit-keyframes, @-o-keyframes, @keyframes - Эти правила определяют анимацию loading-animation, которая используется для создания эффекта загрузки.
 Разные версии правил предназначены для обеспечения совместимости с различными браузерами. */
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

/* Стили для body сайта */
body {
  color: #fff;
  display: flex;
  justify-content: center;
  background-color: #172135;
  font-family: sans-serif;
}

/* Убирает у всех компонентов внутренние и внешние отступы а также на ширину блока не влияет padding и border. */
*,
::after,
::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  width: 1200px;
  margin: 0 auto;
  align-content: center;
}
/* Заголовок */
h1 {
  text-align: center;
  border-radius: 6px;
  font-size: 24px; /**/
  line-height: 48px;
  background: #25365e;
}

/* Стили для таблицы */
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

/* Стили для тега меню */
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

* html #menu li a:hover /* IE6 */ {
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

/* Стили для формы */
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
