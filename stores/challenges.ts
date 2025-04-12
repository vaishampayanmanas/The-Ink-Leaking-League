import { defineStore } from 'pinia'

interface Challenge {
  id: number,
  title: string,
  description: string,
  deadline: string
}

interface ChallengeCreate {
  title: string,
  description: string,
  deadline: string
}

export const useChallengesStore = defineStore('Challenges', {
  state: () => ({
    allChallenges: [] as Challenge[],
    userChallenges: [],
    userJoinedChallenges: []
  }),
  actions: {
    async createChallenge(body: ChallengeCreate, authToken: string) {
      const data = await $fetch('/api/challenges', {
        method: 'POST',
        headers: {
          auth: authToken
        },
        body
      });
      console.log(data);
      await this.loadChallenges()
    },

    async loadChallenges(reload: boolean = false) {
      if (reload) {
        const challenges = await $fetch('/api/challenges', {
          method: 'GET'
        });
  
        this.allChallenges = challenges || [];
      } else {
        const { data: challenges } = await useFetch('/api/challenges', {
        method: 'GET'
      });

      this.allChallenges = challenges.value || [];
      }
    },

    async updateChallenge(id: number, body: any, accessToken: string) {
      const res = await $fetch(`/api/challenges/${id}`, {
        method: 'PATCH',
        body,
        headers: {
          auth: accessToken,
        }
      });

      if (res.status !== 'success') {
        throw new Error('invalid request');
      } else {
        await this.loadChallenges(true);
      }
    },

    async joinChallenge(id: number, accessToken: string) {
      const res = await $fetch(`/api/challenges/${id}/join`, {
        method: 'POST',
        headers: {
          auth: accessToken,
        }
      });

      if (res.status !== 'success') {
        throw new Error('invalid request');
      } else {
        await this.loadChallenges(true);
        await navigateTo('/challenges');
        console.log('success!!')
      }
    },

    async deleteChallenge(id: number, body: {password: string}, accessToken: string) {
      const res = await $fetch(`/api/challenges/${id}`, {
        method: 'DELETE',
        body,
        headers: {
          auth: accessToken,
        }
      });

      console.log(res);

      if (res) {
        throw new Error('invalid request');
      } else {
        await this.loadChallenges(true);
        navigateTo('/challenges')
      }
    }
  }
})
