<template>
  <form
    text-align="center"
    id="form"
    method="post"
  >
    ID:&nbsp;<input
      type="text"
      name="id"
      placeholder="id пользователя"
    />
    <br />
    <br />
    <input
      class="button-controller"
      id="button"
      type="submit"
    />

    <label tabindex="0" for="button" class="button"> Начать </label>
    <div id="warn" style="display: none">
      <br />
      <br />
      Подождите немного пока данные загружаются!
      <br />Это может занять несколько минут
    </div>
  </form>
  <br />
  <!-- <form method="post" action="app?action=history">
    <div><button type="submit" class="btn_type2">История</button></div>
  </form> -->
</template>

<script></script>

<style scoped>
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
