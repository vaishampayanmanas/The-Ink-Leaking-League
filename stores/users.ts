import { defineStore } from 'pinia'
import { useQuery } from '@pinia/colada'

interface Body {
  username: string,
  password: string,
  email: string,
}

interface User {
  username: string,
  email: string,
  role: 'Member' | 'Admin' | 'Owner',
}

interface UserExtended extends User {
  followers: string[],
  following: string[],
  points: {
    points: number,
  }[],
  challenges: {
    title: string,
    description: string,
  }[],
  responses: {
    title: string,
  }[],
  recievedMessages: {
    title: string,
  }[]
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    accessToken: '',
    user: null as User | null,
    loaded: false,
    userExtended: null as UserExtended | null,
  }),
  getters: {
    totalPoints: (state) => {
      if (!state.userExtended) return 0
      return state.userExtended.points.reduce((acc, point) => acc + point.points, 0)
    } 
  },

  actions: {
    save() {
      if (!localStorage) return;
      localStorage.setItem('accessToken', this.accessToken)
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    load() {
      if (!localStorage) return;
      this.accessToken = localStorage.getItem('accessToken') || ''
      this.user = JSON.parse(localStorage.getItem('user') || 'null');
      this.loaded = true
    },

    async refreshAccessToken() {
      const res = await $fetch('/api/auth/refresh', {
        method: 'GET',
        headers: {
          auth: this.accessToken
        }
      });
      if ('accessToken' in res && res.accessToken) {
        this.accessToken = res.accessToken
        this.user = res.user
        this.save()
      } else {
        throw new Error('Invalid refresh token');
      }
      return res
    },

    async login(username: string, password: string) {
      const res = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          username,
          password
        }
      });
      console.log(res);
      if ('accessToken' in res && res.accessToken) {
        this.accessToken = res.accessToken
        this.user = res.user
        this.save()
      }
      return res
    },

    async register(body: Body) {
      const res = await $fetch('/api/auth/users', {
        method: 'POST',
        body
      });
      if ('accessToken' in res && res.accessToken) {
        this.accessToken = res.accessToken
        this.user = res.user
        this.save()
      }

      return res
    }
  }
});
