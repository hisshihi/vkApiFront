<template>
  <div class="wrapper">
    <div class="container">
      <input-component/>
      <div class="row">
        <h1>Информация о человеке</h1>
      </div>

      <table>
        <tr>
          <td class="field">ID:</td>
          <td id="id"></td>
        </tr>
        <tr>
          <td class="field">Имя:</td>
          <td></td>
        </tr>
        <tr>
          <td class="field">Город:</td>
          <td></td>
        </tr>
        <tr>
          <td class="field">Работа:</td>
          <td></td>
        </tr>
        <tr>
          <td class="field">Университет:</td>
          <td></td>
        </tr>
        <tr>
          <td class="field">Школа:</td>
          <td></td>
        </tr>
        <tr>
          <td class="field">Тип профиля:</td>
          <td></td>
        </tr>
      </table>

      <div id="button">
        <input class="button-controller" id="button" type="checkbox" />

        <a href="app?action=update" tabindex="0" for="button" class="button">
          Обновить
        </a>
      </div>

      <ul id="menu">
        <li>
          <div><a href="#">Группы кол.</a></div>
          <ul></ul>
        </li>

        <li>
          <div><a href="#">Друзья кол.</a></div>
          <ul></ul>
        </li>

        <li>
          <div><a href="#">Совпадения кол.</a></div>
          <ul></ul>
        </li>
      </ul>
    </div>

    <div class="save-btn">
      <button class="btn_type2"></button>
      <div id="data" style="display: none">${data}</div>
    </div>
    <button @click.prevent="testResuetMethod">Test</button>
    <button @click.prevent="getUserDataFromBackend">Получить данные</button>
    <!--    <div class="container">-->
    <!--      &lt;!&ndash;      Првоеряем не пустой ли массив пользователя&ndash;&gt;-->
    <!--      <form v-if="userData.length <= 0">-->
    <!--        <div class="mb-3">-->
    <!--          <label for="exampleInputEmail1" class="form-label">ID пользователя</label>-->
    <!--          &lt;!&ndash;          v-model используется для динамического связываения переменной и тем, что хранится в input&ndash;&gt;-->
    <!--          <input minlength="8" maxlength="9" type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"-->
    <!--                 v-model="id">-->
    <!--        </div>-->
    <!--        <button type="submit" class="btn btn-primary" @click.prevent="testResuetMethod">Поиск</button>-->
    <!--      </form>-->
    <!--      <template v-else>-->
    <!--        &lt;!&ndash;        Карточка с данными пользователя&ndash;&gt;-->
    <!--        <div class="card">-->
    <!--          <h5 class="card-header">Данные</h5>-->
    <!--          <div class="card-body">-->
    <!--            <h5 class="card-title">{{ userData.first_name }}</h5>-->
    <!--            <h5 class="card-title">{{ userData.last_name ? userData.last_name : "Не указано" }}</h5>-->
    <!--            <p v-if="userData.city != null" class="card-text">Город - {{ userData.city.title ? userData.city.title : "Не указано" }}</p>-->
    <!--            <h5 class="card-subtitle">Образование</h5>-->
    <!--            <p class="card-text">Форма обучения - -->
    <!--              {{ userData.education_status ? userData.education_status : "Не указано" }}</p>-->
    <!--            <p class="card-text">Факультет - {{ userData.faculty_name ? userData.faculty_name : "Не указано" }}</p>-->
    <!--            <p class="card-text">Место получения образования - -->
    <!--              {{ userData.university_name ? userData.university_name : "Не указано" }}</p>-->
    <!--            <p v-if="userData.schools != null" class="card-text">Школа - {{ userData.schools.name ? userData.schools.name : "Не указано" }}</p>-->
    <!--            <h5 class="card-subtitle">Работа</h5>-->
    <!--            <p v-if="userData.occupation != null" class="card-text">Место работы - -->
    <!--              {{ userData.occupation.name ? userData.occupation.name : "Не указано" }}</p>-->
    <!--            <button class="btn btn-primary" @click="newSearch">Обновить</button>-->
    <!--          </div>-->
    <!--        </div>-->

    <!--        <div class="all-drop-down">-->
    <!--          &lt;!&ndash;          Выпадающие списки с друзьями и группами&ndash;&gt;-->
    <!--          <div class="dropdown">-->
    <!--            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"-->
    <!--               data-bs-toggle="dropdown" aria-expanded="false">-->
    <!--              Друзья-->
    <!--            </a>-->

    <!--            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">-->
    <!--              <li v-for="friend in userFriend" :key="friend.id"><a class="dropdown-item"-->
    <!--                                                                   target="_blank"-->
    <!--                                                                   :href="'https://vk.com/id' + friend.friendId"-->
    <!--              >{{ friend.firstName }} {{ friend.lastName }}</a>-->
    <!--              </li>-->
    <!--            </ul>-->
    <!--          </div>-->
    <!--          <div class="dropdown">-->
    <!--            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"-->
    <!--               data-bs-toggle="dropdown" aria-expanded="false">-->
    <!--              Группы-->
    <!--            </a>-->

    <!--            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">-->
    <!--              <li v-for="group in userGroups" :key="group.id">-->
    <!--                <a v-if="group.name != null" class="dropdown-item"-->
    <!--                   target="_blank"-->
    <!--                   :href="'https://vk.com/id' + group.groupId"-->
    <!--                >{{ group.name }}</a>-->
    <!--                <a v-else class="dropdown-item"-->
    <!--                   target="_blank"-->
    <!--                   :href="'https://vk.com/id' + group.groupId"-->
    <!--                >{{ group.firstName }} {{ group.lastName }}</a>-->
    <!--              </li>-->
    <!--            </ul>-->
    <!--          </div>-->
    <!--        </div>-->

    <!--      </template>-->
    <!--      <div v-if="loading">-->
    <!--        <h2>Пожалуйста подождите, ищем инфомрацию.</h2>-->
    <!--      </div>-->
    <!--      <div v-if="error">-->
    <!--        <h2 class="text-danger">Неверный ввод данных! Повторите попытку поиска</h2>-->
    <!--      </div>-->
    <!--      <div v-if="errorLoading">-->
    <!--        <h2 class="text-danger">Ошибка данных! Польлзователь не найден</h2>-->
    <!--      </div>-->
    <!--    </div>-->
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
    };
  },
  // Методы приложения
  methods: {
    // Метод для поиска пользователя, в качестве аргумента получает id пользователя из v-model
    // serchUser(id) {
    //   // При получении данных отображем загрузку и убираем ошибки если они были до этого
    //   this.loading = true
    //   this.error = false
    //   this.errorLoading = false
    //   // Для отправки http запросов используем бибилиотеку axios
    //   // тут создаём метод post для отправки данных на сервер, а именно отправляем id
    //   axios.post('https://joyful-language-production.up.railway.app/' + id, {
    //     id: id
    //   })
    //       .then(response => {
    //         console.log(response)
    //         // останавливаем отображение загрузки
    //         timport InputComponent from "./components/InputComponent.vue";
// his.loading = false
    //         this.id = null;
    //         // проверяем, правильный ли ответ пришёл от backend
    //         if (response.data == "OK") {
    //           // если ответ пришёл правильный, то отправляем запрос на получение данных
    //           axios.get("https://joyful-language-production.up.railway.app/" + id)
    //               // Проверяем, пришёл ли массив данных не пустым, если нет, то сохраняем все данные
    //               .then(response => {
    //                 this.userData = response.data.user != null ? this.userData = response.data.user : null
    //                 if (this.userData == null) {
    //                   return;
    //                 }
    //                 this.userGroups = response.data.groups != null ? this.userGroups = response.data.groups : null
    //                 this.userFriend = response.data.friends != null ? this.userFriend = response.data.friends : null
    //                 // this.cities = response.data.cities != null ? this.cities = response.data.cities : null
    //               })
    //               // обрабатываем ошибки в случае их возникновения
    //               .catch(error => {
    //                 this.loading = false;
    //                 this.errorLoading = true;
    //                 console.log(error)
    //               })
    //
    //         }
    //       })
    //       .catch(error => {
    //         this.loading = false;
    //         this.error = true;
    //         console.log(error)
    //       })
    //
    // },
    testResuetMethod() {
      axios
        .post("http://localhost:8080/user", {
          id: "88362341",
        })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    },
    getUserDataFromBackend() {
      axios
        .get("http://localhost:8080/user/88362341")
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    },
    // Метод который при нажатии  на кнопку "обновить" очищает массив данных пользователя
    // newSearch() {
    //   this.userData = []
    // },
    // метод, который проверяет, сколько символов было введено в input, если больше 9, то остальные урезаются
    // input() {
    //   const input = document.querySelector('input')
    //
    //   input.addEventListener('input', (e) => {
    //     if (e.target.value.length > 9) {
    //       e.target.value = e.target.value.slice(0, 8)
    //     }
    //   })
    // },
  },
  // mounted обозначает, что метод input загружается во время обновления/создания страницы
  // mounted() {
  //   this.input()
  // }
};
</script>

<style>
/* *, ::after, ::before {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.wrapper {
  width: 1200px;
  margin: 0 auto;
}

.card {
  margin-top: 50px;
}

.card-subtitle {
  margin-top: 20px;
}


.all-drop-down {
  display: flex !important;
  justify-content: space-between !important;
  margin-top: 50px !important;
}

.dropdown {
  position: relative;
}

.dropdown-toggle {
  width: 100%;
  padding: 10px 16px;
  font-size: 16px;
  color: #fff;
  background-color: #343a40;
  border: 1px solid #343a40;
  border-radius: 4px;
}

.dropdown-toggle:hover,
.dropdown-toggle:focus {
  color: #fff;
  background-color: #292d32;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 10rem;
  padding: 5px 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}

.dropdown-item:hover,
.dropdown-item:focus {
  color: #1e2125;
  background-color: #f8f9fa;
}

.dropdown-item.active,
.dropdown-item:active {
  color: #fff;
  background-color: #343a40;
} */

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

*html #menu li a:hover /* IE6 */ {
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
</style>
