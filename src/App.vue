<template>
  <div class="wrapper">
    <div class="container">
      <!--      Првоеряем не пустой ли массив пользователя-->
      <form v-if="userData.length <= 0">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">ID пользователя</label>
          <!--          v-model используется для динамического связываения переменной и тем, что хранится в input-->
          <input minlength="8" maxlength="9" type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                 v-model="id">
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="serchUser(id)">Поиск</button>
      </form>
      <template v-else>
        <!--        Карточка с данными пользователя-->
        <div class="card">
          <h5 class="card-header">Данные</h5>
          <div class="card-body">
            <h5 class="card-title">{{ userData.first_name }}</h5>
            <h5 class="card-title">{{ userData.last_name ? userData.last_name : "Не указано" }}</h5>
            <p v-if="userData.city != null" class="card-text">Город - {{ userData.city.title ? userData.city.title : "Не указано" }}</p>
            <h5 class="card-subtitle">Образование</h5>
            <p class="card-text">Форма обучения -
              {{ userData.education_status ? userData.education_status : "Не указано" }}</p>
            <p class="card-text">Факультет - {{ userData.faculty_name ? userData.faculty_name : "Не указано" }}</p>
            <p class="card-text">Место получения образования -
              {{ userData.university_name ? userData.university_name : "Не указано" }}</p>
            <p v-if="userData.schools != null" class="card-text">Школа - {{ userData.schools.name ? userData.schools.name : "Не указано" }}</p>
            <h5 class="card-subtitle">Работа</h5>
            <p v-if="userData.occupation != null" class="card-text">Место работы -
              {{ userData.occupation.name ? userData.occupation.name : "Не указано" }}</p>
            <button class="btn btn-primary" @click="newSearch">Обновить</button>
          </div>
        </div>

        <div class="all-drop-down">
          <!--          Выпадающие списки с друзьями и группами-->
          <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
               data-bs-toggle="dropdown" aria-expanded="false">
              Друзья
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li v-for="friend in userFriend" :key="friend.id"><a class="dropdown-item"
                                                                   target="_blank"
                                                                   :href="'https://vk.com/id' + friend.friendId"
              >{{ friend.firstName }} {{ friend.lastName }}</a>
              </li>
            </ul>
          </div>
          <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
               data-bs-toggle="dropdown" aria-expanded="false">
              Группы
            </a>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li v-for="group in userGroups" :key="group.id">
                <a v-if="group.name != null" class="dropdown-item"
                   target="_blank"
                   :href="'https://vk.com/id' + group.groupId"
                >{{ group.name }}</a>
                <a v-else class="dropdown-item"
                   target="_blank"
                   :href="'https://vk.com/id' + group.groupId"
                >{{ group.firstName }} {{ group.lastName }}</a>
              </li>
            </ul>
          </div>
        </div>

      </template>
      <div v-if="loading">
        <h2>Пожалуйста подождите, ищем инфомрацию.</h2>
      </div>
      <div v-if="error">
        <h2 class="text-danger">Неверный ввод данных! Повторите попытку поиска</h2>
      </div>
      <div v-if="errorLoading">
        <h2 class="text-danger">Ошибка данных! Польлзователь не найден</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
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
      errorLoading: false
    }
  },
  // Методы приложения
  methods: {
    // Метод для поиска пользователя, в качестве аргумента получает id пользователя из v-model
    async serchUser(id) {
      // // При получении данных отображем загрузку и убираем ошибки если они были до этого
      // this.loading = true
      // this.error = false
      // this.errorLoading = false
      // // Для отправки http запросов используем бибилиотеку axios
      // // тут создаём метод post для отправки данных на сервер, а именно отправляем id
      // axios.post('https://vkapi-8fei.onrender.com/88362341', {
      //   id: id
      // }, {
      //     mode: "no-cors"
      // })
      //     .then(response => {
      //       console.log(response)
      //       // останавливаем отображение загрузки
      //       this.loading = false
      //       this.id = null;
      //       // проверяем, правильный ли ответ пришёл от backend
      //       if (response.data == "OK") {
      //         // если ответ пришёл правильный, то отправляем запрос на получение данных
      //         axios.get("https://vkapi-8fei.onrender.com/88362341")
      //             // Проверяем, пришёл ли массив данных не пустым, если нет, то сохраняем все данные
      //             .then(response => {
      //               this.userData = response.data.user != null ? this.userData = response.data.user : null
      //               if (this.userData == null) {
      //                 return;
      //               }
      //               this.userGroups = response.data.groups != null ? this.userGroups = response.data.groups : null
      //               this.userFriend = response.data.friends != null ? this.userFriend = response.data.friends : null
      //               // this.cities = response.data.cities != null ? this.cities = response.data.cities : null
      //             })
      //             // обрабатываем ошибки в случае их возникновения
      //             .catch(error => {
      //               this.loading = false;
      //               this.errorLoading = true;
      //               console.log(error)
      //             })
      //
      //       }
      //     })
      //     .catch(error => {
      //       this.loading = false;
      //       this.error = true;
      //       console.log(error)
      //     })

      const response = await fetch("http://localhost:8080/88362341", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   id: 123456789,
        // }),
      }).then(response => console.log(response));
    },
    // Метод который при нажатии  на кнопку "обновить" очищает массив данных пользователя
    newSearch() {
      this.userData = []
    },
    // метод, который проверяет, сколько символов было введено в input, если больше 9, то остальные урезаются
    input() {
      const input = document.querySelector('input')

      input.addEventListener('input', (e) => {
        if (e.target.value.length > 9) {
          e.target.value = e.target.value.slice(0, 8)
        }
      })
    },
  },
  // mounted обозначает, что метод input загружается во время обновления/создания страницы
  mounted() {
    this.input()
  }
}
</script>

<style>
*, ::after, ::before {
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
}

</style>
