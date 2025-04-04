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

export const useUsersStore = defineStore('users', {
  state: () => ({
    accessToken: '',
    user: null as User | null,
  }),
  actions: {
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
      }

      return res
    }
  }
});
