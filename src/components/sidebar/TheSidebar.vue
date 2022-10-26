<template>
  <div class="sidebar">
    <div class="sidebar__content">
      <h1 class="sidebar__header">мои задачи</h1>
      <nav class="sidebar__nav">
        <RouterLink to="/" class="sidebar__link">список задач</RouterLink>
        <RouterLink to="/kanban" class="sidebar__link">канбан-доска</RouterLink>
      </nav>
      <div class="sidebar__info">
        <div class="sidebar__tasks">
          <div class="sidebar__tasks-line sidebar__tasks-line-today">
            <p>На сегодня:</p>
            <span class="sidebar__tasks-line-today_amount">1</span>
          </div>
          <div class="sidebar__tasks-line sidebar__tasks-tomorrow">
            <p>На завтра:</p>
            <span class="sidebar__tasks-line-tomorrow_amount">2</span>
          </div>
        </div>
        <div class="sidebar__date">
          <time>{{ convertedDate }}</time>
          <time>{{ convertedtime }}</time>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "TheSidebar",
  components: {
    RouterLink,
  },
  computed: {
    currentDate() {
      return new Date();
    },
    convertedDate() {
      return `${this.currentDate.toLocaleString("ru", {
        month: "long",
        day: "numeric",
      })} ${this.currentDate.getFullYear()}`;
    },
    convertedtime() {
      return this.currentDate.toLocaleString("ru", {
        hour: "numeric",
        minute: "numeric",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/variables.scss";
@import "../../style/mixin.scss";

.sidebar {
  @include text-primary;

  position: relative;
  width: 20%;
  background-color: #f5f0ea;

  &__content {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
  }

  &__header {
    @include text-header;

    text-align: center;
    padding: 16px 0;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__link {
    @include text-primary;

    text-align: center;
    padding: 8px 0;
    background-color: $task-nav-background;
    opacity: 60%;
  }

  .router-link-active {
    opacity: 100%;
  }

  &__info {
    margin-top: 32px;
    text-align: center;
  }

  &__tasks {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &-line {
      display: flex;
      justify-content: space-between;
      width: 30%;
      margin: 0 auto;

      &-today_amount {
        color: #74c961;
      }

      &-tomorrow_amount {
        color: #5285c4;
      }
    }
  }

  &__date {
    position: absolute;
    text-align: left;
    left: 32px;
    bottom: 32px;

    time {
      display: block;
    }
  }
}
</style>
